import { NextRequest, NextResponse } from 'next/server';
import { CANARY, SYSTEM_PROMPT } from '@/lib/chat/prompt';
import {
  MAX_BODY_BYTES,
  MAX_OUTPUT_TOKENS,
  MESSAGES,
  checkAndCount,
  clientIp,
  isBlocked,
  isSameSite,
  looksLeaked,
  parseBody,
  type Lang,
} from '@/lib/chat/guard';

// Public demo endpoint. It calls the model with a fixed prompt and the visitor's messages only:
// no tools, no file/database/API access. The only environment variables it reads are
// CHAT_ENABLED and ANTHROPIC_API_KEY. Conversations are not stored and message text is never logged.

export const runtime = 'nodejs';

const MODEL = 'claude-haiku-5-5';

function reply(status: number, lang: Lang, key: keyof (typeof MESSAGES)['en'], retryAfter?: string) {
  const headers: Record<string, string> = { 'Cache-Control': 'no-store' };
  if (retryAfter) headers['Retry-After'] = retryAfter;
  return NextResponse.json({ error: key, message: MESSAGES[lang][key] }, { status, headers });
}

export async function POST(request: NextRequest) {
  let lang: Lang = 'en';
  try {
    // Feature flag and key: unavailable if either is missing.
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (process.env.CHAT_ENABLED !== 'true' || !apiKey) {
      return reply(503, lang, 'unavailable');
    }

    // Same-site only.
    if (!isSameSite(request.headers.get('origin'), request.headers.get('host'))) {
      return reply(403, lang, 'invalid');
    }

    // Size and shape.
    const len = Number(request.headers.get('content-length') ?? '0');
    if (len > MAX_BODY_BYTES) return reply(413, lang, 'invalid');
    const text = await request.text();
    if (text.length > MAX_BODY_BYTES) return reply(413, lang, 'invalid');
    let raw: unknown;
    try {
      raw = JSON.parse(text);
    } catch {
      return reply(400, lang, 'invalid');
    }
    const parsed = parseBody(raw);
    if (!parsed.ok) return reply(400, lang, 'invalid');
    lang = parsed.lang;

    // Rate limits (per IP and global daily cap).
    const limit = checkAndCount(clientIp(request.headers));
    if (limit !== 'ok') {
      return reply(429, lang, 'limited', limit === 'ip' ? '60' : undefined);
    }

    // Obvious extraction or injection attempts are refused without calling the model.
    const lastUser = parsed.messages[parsed.messages.length - 1].content;
    if (isBlocked(lastUser)) {
      return NextResponse.json(
        { message: MESSAGES[lang].refusal },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        system: SYSTEM_PROMPT,
        messages: parsed.messages,
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) {
      // Covers invalid key, provider rate limits and quota. Nothing from the provider is exposed.
      console.warn('[chat] upstream_status', response.status);
      return reply(503, lang, 'unavailable');
    }

    const data = (await response.json()) as { content?: { type?: string; text?: string }[] };
    const answer = (data.content ?? [])
      .filter((b) => b.type === 'text' && typeof b.text === 'string')
      .map((b) => b.text)
      .join('')
      .trim();

    if (!answer || looksLeaked(answer, CANARY)) {
      return NextResponse.json(
        { message: MESSAGES[lang].refusal },
        { headers: { 'Cache-Control': 'no-store' } },
      );
    }

    return NextResponse.json(
      { message: answer.slice(0, 2000) },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch {
    console.warn('[chat] error');
    return reply(503, lang, 'unavailable');
  }
}

export function GET() {
  return NextResponse.json({ error: 'method_not_allowed' }, { status: 405 });
}

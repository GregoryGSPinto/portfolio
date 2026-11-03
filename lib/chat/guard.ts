// Guards for the public chat endpoint: validation, rate limiting and cheap pre-filtering.
// Everything is in memory per server instance (best effort). The provider-side spend limit
// on the API key is the hard backstop.

export const MAX_MESSAGE_CHARS = 500;
export const MAX_HISTORY_EXCHANGES = 6; // 6 user/assistant pairs, plus the new user message
export const MAX_OUTPUT_TOKENS = 400;
export const MAX_BODY_BYTES = 20_000;
export const PER_MINUTE = 8;
export const PER_DAY = 40;
export const GLOBAL_PER_DAY = 1500;

export type Lang = 'pt' | 'en';
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type Parsed =
  | { ok: true; messages: ChatMessage[]; lang: Lang }
  | { ok: false };

/** Schema validation without trusting the client: only the fields we expect, strict types. */
export function parseBody(raw: unknown): Parsed {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return { ok: false };
  const body = raw as Record<string, unknown>;
  const msgs = body.messages;
  if (!Array.isArray(msgs) || msgs.length === 0 || msgs.length > MAX_HISTORY_EXCHANGES * 2 + 1) {
    return { ok: false };
  }
  const out: ChatMessage[] = [];
  for (const m of msgs) {
    if (typeof m !== 'object' || m === null) return { ok: false };
    const { role, content } = m as Record<string, unknown>;
    if (role !== 'user' && role !== 'assistant') return { ok: false };
    if (typeof content !== 'string') return { ok: false };
    const text = content.trim();
    if (!text) return { ok: false };
    // Earlier assistant turns are bounded too, so history cannot be used to inflate input cost.
    const limit = role === 'user' ? MAX_MESSAGE_CHARS : 1200;
    if (text.length > limit) return { ok: false };
    out.push({ role, content: text });
  }
  // Must start and end with a user turn and strictly alternate.
  if (out[0].role !== 'user' || out[out.length - 1].role !== 'user') return { ok: false };
  for (let i = 1; i < out.length; i++) if (out[i].role === out[i - 1].role) return { ok: false };
  const lang: Lang = body.language === 'pt' ? 'pt' : 'en';
  return { ok: true, messages: out, lang };
}

/** Same-site check: the browser Origin must match the host that served the request. */
export function isSameSite(origin: string | null, host: string | null): boolean {
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function clientIp(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim() || 'unknown';
  return headers.get('x-real-ip') ?? 'unknown';
}

// ---- rate limiting (in memory) -------------------------------------------------------
const minuteHits = new Map<string, number[]>();
const dayHits = new Map<string, { day: string; n: number }>();
const globalDay = { day: '', n: 0 };

const today = () => new Date().toISOString().slice(0, 10);

export type Limit = 'ok' | 'ip' | 'global';

export function checkAndCount(ip: string, now = Date.now()): Limit {
  const day = today();
  if (globalDay.day !== day) {
    globalDay.day = day;
    globalDay.n = 0;
    dayHits.clear();
  }
  if (globalDay.n >= GLOBAL_PER_DAY) return 'global';

  const recent = (minuteHits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= PER_MINUTE) {
    minuteHits.set(ip, recent);
    return 'ip';
  }
  const d = dayHits.get(ip);
  const count = d && d.day === day ? d.n : 0;
  if (count >= PER_DAY) return 'ip';

  recent.push(now);
  minuteHits.set(ip, recent);
  dayHits.set(ip, { day, n: count + 1 });
  globalDay.n += 1;
  if (minuteHits.size > 5000) {
    for (const [k, v] of minuteHits) if (!v.some((t) => now - t < 60_000)) minuteHits.delete(k);
  }
  return 'ok';
}

/** Test helper: reset counters. */
export function resetLimits() {
  minuteHits.clear();
  dayHits.clear();
  globalDay.day = '';
  globalDay.n = 0;
}

// ---- cheap pre-filter: obvious extraction / injection attempts never reach the model -----
const BLOCKED: RegExp[] = [
  /(ignore|disregard|forget|override)\s+(all\s+|any\s+|the\s+|your\s+)?(previous|prior|above|earlier|system)?\s*(instructions?|rules?|prompts?)/i,
  /(ignor[ea]|esque[çc]a|desconsidere)\s+(todas?\s+)?(as\s+)?(instru[çc][õo]es|regras)/i,
  /(system|developer|hidden|initial|original)\s*(prompt|message|instructions?)/i,
  /(prompt|instru[çc][õo]es)\s+(do\s+)?(sistema|inicial|original)/i,
  /(reveal|show|print|repeat|translate|leak|dump)\b.{0,40}\b(prompt|instructions|rules)/i,
  /\b(developer|debug|admin|god|dan|jailbreak)\s+mode\b/i,
  /modo\s+(desenvolvedor|debug|admin)/i,
  /(env(ironment)?[\s_-]*var(iable)?s?|vari[áa]veis?\s+de\s+ambiente|api[\s_-]?keys?|secrets?|credentials?|\bsenhas?\b|passwords?|\btokens?\b)/i,
  /(\.env\b|anthropic|supabase|service[_\s-]?role)/i,
  /\b(cpf|cnpj|rg|passport|passaporte)\b/i,
  /\b(home\s+address|endere[çc]o|telefone|phone\s+number|whatsapp|salary|sal[áa]rio)\b/i,
  /\b(wife|husband|esposa|marido|filh[oa]s?|fam[ií]lia|family|girlfriend|namorad[ao])\b/i,
  /\b(execute|run|eval)\b.{0,30}\b(code|script|command|shell|bash)\b/i,
  /\b(rm\s+-rf|sudo|curl\s|wget\s|<script)/i,
  /\b(private\s+repos?|reposit[óo]rios?\s+privados?|database\s+tables?|tabelas?\s+do\s+banco|list\s+(the\s+)?tables)\b/i,
  /\b(mudar|mudan[çc]a|moving|move|relocat\w*|emigrar|emigrate)\b.{0,30}\b(pa[ií]s|country|canad[áa]|usa|eua|europe|europa)\b/i,
  /(sou|i\s+am|i'm)\s+(o\s+)?(dono|owner|gregory|creator|criador)\b/i,
];

export function isBlocked(text: string): boolean {
  return BLOCKED.some((re) => re.test(text));
}

/** Last-line output filter: drop replies that look like prompt or secret leaks. */
export function looksLeaked(reply: string, canary: string): boolean {
  return (
    reply.includes(canary) ||
    /sk-ant-[A-Za-z0-9_-]{8,}/.test(reply) ||
    /ANTHROPIC_API_KEY|SUPABASE_|SERVICE_ROLE/i.test(reply)
  );
}

export const MESSAGES = {
  pt: {
    unavailable: 'O chat está indisponível agora. Fale comigo pelos contatos do portfólio.',
    limited: 'Muitas mensagens em pouco tempo. Tente novamente mais tarde ou fale comigo pelos contatos do portfólio.',
    invalid: 'Não consegui processar essa mensagem. Use até 500 caracteres e tente de novo.',
    refusal:
      'Só posso falar sobre a trajetória profissional do Gregory em tecnologia, a stack e os projetos PrimalWOD, Blackbelts e Aura. Para outros assuntos, use os contatos do portfólio.',
  },
  en: {
    unavailable: 'The chat is unavailable right now. Reach me through the portfolio contacts.',
    limited: 'Too many messages in a short time. Please try again later or reach me through the portfolio contacts.',
    invalid: "I couldn't process that message. Use up to 500 characters and try again.",
    refusal:
      "I can only talk about Gregory's professional background in technology, his stack, and the PrimalWOD, Blackbelts and Aura projects. For anything else, please use the portfolio contacts.",
  },
} as const;

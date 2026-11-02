export interface ExperienceEntry {
  year: string;
  highlight: boolean;
  role: { pt: string; en: string };
  company: { pt: string; en: string };
  period: { pt: string; en: string };
  location: { pt: string; en: string };
  desc: { pt: string; en: string };
  tags: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    year: '2026',
    highlight: true,
    role: { pt: 'Founder & Solution Architect', en: 'Founder & Solution Architect' },
    company: { pt: 'Verdor', en: 'Verdor' },
    period: { pt: 'Fev 2026 - Presente', en: 'Feb 2026 - Present' },
    location: { pt: 'Minas Gerais, Brasil · Remoto', en: 'Minas Gerais, Brazil · Remote' },
    desc: {
      pt: 'Fundei a Verdor, empresa de SaaS vertical em que a IA é o motor de cada produto. Como CTO, CPO e CEO, cuido de estratégia de produto, arquitetura e entrega, orquestrando agentes de IA em design, implementação, revisão e release. Projetei e publiquei duas plataformas SaaS multi-tenant (PrimalWOD e Blackbelts) em monorepos TypeScript com Next.js, Supabase e Vercel, cada uma com app Capacitor para iOS e Android, integração com Asaas para PIX e boleto, e estou construindo a Aura, um agente pessoal de IA com autonomia em níveis (em desenvolvimento).',
      en: 'Founded Verdor, a vertical SaaS company where AI is the engine under every product. Acting as CTO, CPO and CEO, I own product strategy, architecture and delivery, orchestrating AI agents across design, implementation, review and release. Designed and shipped two multi-tenant SaaS platforms (PrimalWOD and Blackbelts) as TypeScript monorepos on Next.js, Supabase and Vercel, each with a Capacitor iOS/Android app and an Asaas integration for PIX and boleto, and building Aura, a personal AI agent with tiered autonomy (in development).',
    },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Capacitor', 'Asaas', 'FastAPI', 'AI Agents'],
  },
];

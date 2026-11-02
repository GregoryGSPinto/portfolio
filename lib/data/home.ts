/**
 * Copy for the single-page home (design v2). PT is the source of truth; EN is typed
 * against it so a missing key fails the typecheck.
 *
 * REVIEW: the `adr` texts (context / decision / consequence) are drafts pending the
 * author's approval, and so are the figures taken from the design file
 * ("117 sessions", "Clinics, in construction") and the About timeline.
 */

const pt = {
  nav: {
    label: 'Principal',
    sectionsLabel: 'Seções',
    cta: 'Falar comigo',
    home: 'Gregory Guimarães, início',
    links: [
      { id: 'arquitetura', label: 'Arquitetura' },
      { id: 'decisoes', label: 'Decisões' },
      { id: 'projetos', label: 'Projetos' },
      { id: 'sobre', label: 'Sobre' },
    ],
    switchLang: 'Mudar para inglês',
    langShort: 'EN',
    themeToDark: 'Ativar tema escuro',
    themeToLight: 'Ativar tema claro',
  },
  hero: {
    name: 'Gregory Guimarães',
    role: 'Arquiteto de soluções sênior',
    title: 'Sistemas de IA e SaaS que sabem onde parar.',
    lead: 'Sou Gregory, arquiteto de soluções sênior. Projeto produtos de IA e SaaS vertical com dados protegidos, pagamentos embutidos e agentes que respeitam limites claros.',
    primary: 'Ver a arquitetura',
    secondary: 'Ver projetos',
    facts: [
      { label: 'Foco', value: 'IA e SaaS vertical' },
      { label: 'Fundador solo', value: 'Verdor' },
      { label: 'Base', value: 'Minas Gerais, Brasil' },
    ],
  },
  stage: {
    aria: 'Ilustração do Blackbelts: biblioteca de vídeos com upload em andamento e o módulo Kids no celular',
    side: ['Biblioteca', 'Financeiro', 'Loja'],
    soon: 'em breve',
    tabs: ['Adulto', 'Kids', 'Teen'],
    upload: 'Enviar vídeo',
    uploading: 'Enviando vídeo',
    step: 'Etapa 3 de 4',
    tus: 'Upload retomável (TUS)',
    mascot: 'Escolha seu mascote',
    color: 'Sua cor',
  },
  capabilities: {
    heading: 'Capacidades',
    items: [
      { title: 'Dados e segurança', text: 'Supabase, Postgres e RLS como fronteira de acesso aos dados.' },
      { title: 'Pagamentos embutidos', text: 'Asaas BaaS com subcontas no Blackbelts e no PrimalWOD.' },
      { title: 'Web e mobile', text: 'Next.js, TypeScript e Capacitor, com pacotes completos para as lojas.' },
      { title: 'Agentes de IA', text: 'Autonomia em níveis, memória semântica e parada controlada.' },
    ],
  },
  architecture: {
    title: 'Arquitetura de referência',
    lead: 'O Blackbelts visto de cima. Os componentes com borda dourada têm decisão registrada mais abaixo.',
    diagramLabel: 'Diagrama da arquitetura de referência do Blackbelts',
    groups: {
      clients: 'Clientes',
      app: 'Aplicação',
      data: 'Dados e identidade',
      external: 'Serviços externos',
    },
    nodes: {
      web: { name: 'Web', sub: 'Next.js e TypeScript' },
      mobile: { name: 'App iOS e Android', sub: 'Capacitor' },
      app: { name: 'Aplicação', sub: 'Next.js na Vercel' },
      auth: { name: 'Autenticação', sub: 'Supabase' },
      db: { name: 'Postgres com RLS', sub: 'fronteira de acesso' },
      video: { name: 'Bunny Stream', sub: 'vídeo e upload TUS' },
      pay: { name: 'Asaas BaaS', sub: 'pagamentos e subcontas' },
    },
    edgeUpload: 'upload retomável (TUS)',
    edgeCharges: 'cobranças',
  },
  adr: {
    title: 'Registros de decisão',
    lead: 'O que decidi, em que contexto e o que isso custa. Curto, no formato de ADR.',
    labels: { context: 'Contexto', decision: 'Decisão', consequence: 'Consequência' },
    levelsLabel: 'Níveis de autonomia da Aura',
    levels: [
      { id: 'L1', name: 'autônomo', scope: 'pesquisar, organizar' },
      { id: 'L2', name: 'com aprovação', scope: 'comunicações' },
      { id: 'L3', name: 'nunca autônomo', scope: 'financeiro, jurídico, reputação' },
    ],
    items: [
      {
        id: 'ADR-01',
        title: 'RLS como fronteira de acesso aos dados',
        context: 'Dados de academias e alunos atrás de uma aplicação web e mobile.',
        decision: 'Row Level Security no Postgres do Supabase como fronteira de acesso aos dados.',
        consequence:
          'A segurança passa a depender de políticas por tabela, que exigem revisão. No Blackbelts, vulnerabilidades de RLS e uma falha de autenticação por navegação direta (tokens perdidos da memória) foram encontradas e corrigidas.',
      },
      {
        id: 'ADR-02',
        title: 'Pagamentos embutidos com Asaas BaaS',
        context: 'Os produtos precisam cobrar dentro da própria plataforma.',
        decision: 'Pagamentos embutidos via Asaas, com infraestrutura de subcontas (BaaS) no Blackbelts e no PrimalWOD.',
        consequence:
          'Painel financeiro para o administrador da academia e base para vender produtos no site de cada academia, funcionalidade planejada.',
      },
      {
        id: 'ADR-03',
        title: 'Vídeo delegado ao Bunny Stream',
        context: 'A biblioteca de aulas em vídeo exige envio de arquivos grandes.',
        decision: 'Armazenar e entregar vídeo no Bunny Stream, com upload retomável pelo protocolo TUS em um fluxo de 4 etapas.',
        consequence: 'Fluxo de upload dedicado na interface e infraestrutura paralela para envio de PDFs.',
      },
      {
        id: 'ADR-04',
        title: 'Autonomia em três níveis na Aura',
        context: 'Um agente que age em nome do usuário precisa de limites explícitos.',
        decision: 'Três níveis, do mais livre ao mais restrito:',
        consequence:
          'O limite vive na arquitetura, não em configuração: ações de maior risco exigem um humano, e o agente tem parada escalonada de processos (SIGTERM e, se preciso, SIGKILL).',
      },
      {
        id: 'ADR-05',
        title: 'Atuação física sempre manual',
        context: 'Câmeras com detecção por IA convivem com portões e fechaduras.',
        decision:
          'Modelo de ameaças primeiro. Detecção com Frigate NVR e câmeras PTZ integrada à Aura, e atuação física sempre manual (L3).',
        consequence: 'A IA observa e alerta; quem aciona é uma pessoa.',
      },
    ],
  },
  gallery: {
    title: 'Os produtos por dentro',
    lead: 'Capturas de tela de cada produto. Passam sozinhas; pause ou navegue quando quiser.',
    region: 'Telas de',
    prev: 'Slide anterior',
    next: 'Próximo slide',
    pause: 'Pausar apresentação',
    play: 'Retomar apresentação',
    slideOf: 'Slide {n} de {total}: {label}',
    demo: 'Dados de demonstração',
    products: {
      blackbelts: {
        tagline: 'SaaS para academias de artes marciais',
        footnote: 'Next.js, TypeScript, Supabase com RLS, Asaas, Bunny Stream',
      },
      primalwod: {
        tagline: 'SaaS para boxes de CrossFit',
        footnote: 'Next.js, Supabase, Asaas',
      },
      aura: {
        tagline: 'Agente de IA pessoal, local-first',
        footnote: 'React, TypeScript, execução local',
      },
    },
  },
  projects: {
    title: 'Projetos',
    blackbelts: {
      description:
        'SaaS da Verdor para academias de artes marciais. Nasceu da visão de um “Netflix do jiu-jitsu” (Coliseu BJJ) e virou um sistema de biblioteca de vídeos, financeiro e comunidade.',
      tags: ['Next.js', 'Supabase', 'Bunny Stream', 'Asaas'],
      rows: [
        { k: 'Escopo', v: 'Biblioteca em múltiplas ondas de redesign (adulto, kids e teen, em temas claro e escuro), upload em 4 etapas e envio de PDFs.' },
        { k: 'Kids', v: 'Design system próprio com 8 mascotes de animais e 4 paletas de cor, escolhidas livremente pela criança.' },
        { k: 'Financeiro', v: 'Subcontas Asaas BaaS e painel financeiro para o administrador da academia.' },
        { k: 'Entrega', v: 'Pacotes completos de assets para App Store e Google Play e material de marketing em PDF.' },
      ],
    },
    primalwod: {
      description:
        'SaaS da Verdor para boxes de CrossFit e treinamento funcional, sobre a mesma base de produto e pagamentos do Blackbelts, com subcontas Asaas BaaS, assets completos para as lojas e material de marketing.',
      tags: ['Next.js', 'Supabase', 'Asaas'],
    },
    aura: {
      description:
        'Agente pessoal controlado por voz, para prospecção e gestão de tarefas. Memória semântica com ciclo de vida completo (V7), alimentada por 117 sessões de conversa mineradas. Roadmap: app web com voz (v0.1), app mobile, servidor dedicado e ecossistema de hardware.',
      tags: ['Agentes', 'Memória semântica', 'Voz'],
      aria: 'Ilustração do painel da Aura com três níveis de autonomia e o botão Parar',
      stop: 'Parar',
      levels: [
        { id: 'L1', title: 'Pesquisar e organizar', sub: 'Faz sozinha', badge: 'Autônomo' },
        { id: 'L2', title: 'Enviar comunicações', sub: 'Espera a sua aprovação', badge: 'Com aprovação' },
        { id: 'L3', title: 'Dinheiro, lei e reputação', sub: 'Sempre com você', badge: 'Só humano' },
      ],
    },
    house: {
      title: 'Casa segura',
      description:
        'Sistema de segurança residencial projetado a partir do modelo de ameaças, e não do catálogo de câmeras. Frigate NVR, câmeras PTZ e detecção integrada à Aura, com atuação física sempre manual.',
      tags: ['Frigate NVR', 'PTZ', 'Aura'],
      aria: 'Ilustração do painel de câmeras com uma detecção destacada e o aviso de acionamento manual',
      detection: 'detecção',
      cameras: ['Câmera 1', 'Câmera PTZ', 'Câmera 3', 'Câmera 4'],
      notice: 'Portão e fechaduras: acionamento sempre manual',
    },
    clinics: {
      title: 'Clínicas',
      description:
        'O próximo produto vertical da Verdor, em construção. Mesmo método dos anteriores: um nicho, o vocabulário dele e pagamentos embutidos desde o primeiro dia.',
    },
  },
  writing: {
    title: 'Escrita',
    lead: 'Um artigo técnico sobre o que está por trás do Blackbelts.',
    read: 'Ler o artigo',
    all: 'Todos os artigos',
    minRead: 'min de leitura',
  },
  about: {
    title: 'Autoridade técnica sem teatro',
    p1: 'Sou fundador solo da Verdor, uma empresa de software vertical com IA. Projeto, construo e opero os produtos de ponta a ponta, do modelo de dados à loja de aplicativos, com decisões registradas e limites claros.',
    p2: 'Sou meu próprio CTO, CPO e CEO: oriento o Claude Code na implementação e uso o Claude para estratégia e arquitetura. Projeto com procedimento, margem de segurança e limites claros, e é isso que levo para cada sistema.',
    photoAlt: 'Gregory Guimarães',
    timeline: [
      { name: 'Verdor', role: 'Fundador solo', note: 'Atual' },
      { name: 'Blackbelts e PrimalWOD', role: 'SaaS vertical', note: '' },
      { name: 'Aura', role: 'Agente de IA pessoal', note: '' },
    ],
  },
  contact: {
    title: 'Vamos projetar o próximo sistema.',
    whatsappText: 'Oi Gregory, vi seu portfólio e gostaria de conversar',
  },
  footer: {
    left: '© 2026 Gregory Guimarães. Verdor.',
    place: 'Minas Gerais, Brasil',
    source: 'Código-fonte',
  },
};

export type HomeCopy = typeof pt;

const en: HomeCopy = {
  nav: {
    label: 'Main',
    sectionsLabel: 'Sections',
    cta: 'Get in touch',
    home: 'Gregory Guimarães, home',
    links: [
      { id: 'arquitetura', label: 'Architecture' },
      { id: 'decisoes', label: 'Decisions' },
      { id: 'projetos', label: 'Projects' },
      { id: 'sobre', label: 'About' },
    ],
    switchLang: 'Switch to Portuguese',
    langShort: 'PT',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
  },
  hero: {
    name: 'Gregory Guimarães',
    role: 'Senior solutions architect',
    title: 'AI and SaaS systems that know where to stop.',
    lead: 'I am Gregory, a senior solutions architect. I design AI products and vertical SaaS with protected data, embedded payments and agents that respect clear limits.',
    primary: 'See the architecture',
    secondary: 'See projects',
    facts: [
      { label: 'Focus', value: 'AI and vertical SaaS' },
      { label: 'Solo founder', value: 'Verdor' },
      { label: 'Based in', value: 'Minas Gerais, Brazil' },
    ],
  },
  stage: {
    aria: 'Illustration of Blackbelts: a video library with an upload in progress and the Kids module on a phone',
    side: ['Library', 'Finance', 'Store'],
    soon: 'soon',
    tabs: ['Adult', 'Kids', 'Teen'],
    upload: 'Upload video',
    uploading: 'Uploading video',
    step: 'Step 3 of 4',
    tus: 'Resumable upload (TUS)',
    mascot: 'Pick your mascot',
    color: 'Your color',
  },
  capabilities: {
    heading: 'Capabilities',
    items: [
      { title: 'Data and security', text: 'Supabase, Postgres and RLS as the data access boundary.' },
      { title: 'Embedded payments', text: 'Asaas BaaS with sub-accounts in Blackbelts and PrimalWOD.' },
      { title: 'Web and mobile', text: 'Next.js, TypeScript and Capacitor, with complete store-ready packages.' },
      { title: 'AI agents', text: 'Tiered autonomy, semantic memory and controlled stop.' },
    ],
  },
  architecture: {
    title: 'Reference architecture',
    lead: 'Blackbelts seen from above. Components with a gold border have a decision record further down.',
    diagramLabel: 'Reference architecture diagram of Blackbelts',
    groups: {
      clients: 'Clients',
      app: 'Application',
      data: 'Data and identity',
      external: 'External services',
    },
    nodes: {
      web: { name: 'Web', sub: 'Next.js and TypeScript' },
      mobile: { name: 'iOS and Android app', sub: 'Capacitor' },
      app: { name: 'Application', sub: 'Next.js on Vercel' },
      auth: { name: 'Authentication', sub: 'Supabase' },
      db: { name: 'Postgres with RLS', sub: 'access boundary' },
      video: { name: 'Bunny Stream', sub: 'video and TUS upload' },
      pay: { name: 'Asaas BaaS', sub: 'payments and sub-accounts' },
    },
    edgeUpload: 'resumable upload (TUS)',
    edgeCharges: 'charges',
  },
  adr: {
    title: 'Decision records',
    lead: 'What I decided, in what context, and what it costs. Short, in ADR format.',
    labels: { context: 'Context', decision: 'Decision', consequence: 'Consequence' },
    levelsLabel: 'Aura autonomy levels',
    levels: [
      { id: 'L1', name: 'autonomous', scope: 'research, organize' },
      { id: 'L2', name: 'needs approval', scope: 'communications' },
      { id: 'L3', name: 'never autonomous', scope: 'financial, legal, reputation' },
    ],
    items: [
      {
        id: 'ADR-01',
        title: 'RLS as the data access boundary',
        context: 'Gym and student data behind a web and mobile application.',
        decision: 'Row Level Security in Supabase Postgres as the data access boundary.',
        consequence:
          'Security now depends on per-table policies, which need review. In Blackbelts, RLS vulnerabilities and an authentication flaw on direct navigation (tokens lost from memory) were found and fixed.',
      },
      {
        id: 'ADR-02',
        title: 'Embedded payments with Asaas BaaS',
        context: 'The products need to charge inside the platform itself.',
        decision: 'Embedded payments through Asaas, with sub-account infrastructure (BaaS) in Blackbelts and PrimalWOD.',
        consequence:
          'A finance dashboard for the gym administrator and a foundation for selling products on each gym’s site, a planned feature.',
      },
      {
        id: 'ADR-03',
        title: 'Video delegated to Bunny Stream',
        context: 'The video lesson library requires large file uploads.',
        decision: 'Store and deliver video on Bunny Stream, with resumable upload over the TUS protocol in a 4-step flow.',
        consequence: 'A dedicated upload flow in the interface and parallel infrastructure for sending PDFs.',
      },
      {
        id: 'ADR-04',
        title: 'Three levels of autonomy in Aura',
        context: 'An agent that acts on the user’s behalf needs explicit limits.',
        decision: 'Three levels, from most free to most restricted:',
        consequence:
          'The limit lives in the architecture, not in configuration: higher-risk actions require a human, and the agent has a staged process stop (SIGTERM and, if needed, SIGKILL).',
      },
      {
        id: 'ADR-05',
        title: 'Physical actuation always manual',
        context: 'Cameras with AI detection coexist with gates and locks.',
        decision:
          'Threat model first. Detection with Frigate NVR and PTZ cameras integrated with Aura, and physical actuation always manual (L3).',
        consequence: 'The AI observes and alerts; a person triggers.',
      },
    ],
  },
  gallery: {
    title: 'The products from the inside',
    lead: 'Screenshots of each product. They advance on their own; pause or navigate whenever you like.',
    region: 'Screens of',
    prev: 'Previous slide',
    next: 'Next slide',
    pause: 'Pause slideshow',
    play: 'Resume slideshow',
    slideOf: 'Slide {n} of {total}: {label}',
    demo: 'Demo data',
    products: {
      blackbelts: {
        tagline: 'SaaS for martial arts gyms',
        footnote: 'Next.js, TypeScript, Supabase with RLS, Asaas, Bunny Stream',
      },
      primalwod: {
        tagline: 'SaaS for CrossFit boxes',
        footnote: 'Next.js, Supabase, Asaas',
      },
      aura: {
        tagline: 'Personal AI agent, local-first',
        footnote: 'React, TypeScript, local execution',
      },
    },
  },
  projects: {
    title: 'Projects',
    blackbelts: {
      description:
        'Verdor’s SaaS for martial arts gyms. It started from the vision of a “Netflix of jiu-jitsu” (Coliseu BJJ) and became a system for video library, finance and community.',
      tags: ['Next.js', 'Supabase', 'Bunny Stream', 'Asaas'],
      rows: [
        { k: 'Scope', v: 'Library across several redesign waves (adult, kids and teen, in light and dark themes), 4-step upload and PDF delivery.' },
        { k: 'Kids', v: 'A dedicated design system with 8 animal mascots and 4 color palettes, freely chosen by the child.' },
        { k: 'Finance', v: 'Asaas BaaS sub-accounts and a finance dashboard for the gym administrator.' },
        { k: 'Delivery', v: 'Complete asset packages for the App Store and Google Play, and marketing material in PDF.' },
      ],
    },
    primalwod: {
      description:
        'Verdor’s SaaS for CrossFit and functional training boxes, built on the same product and payments base as Blackbelts, with Asaas BaaS sub-accounts, complete store assets and marketing material.',
      tags: ['Next.js', 'Supabase', 'Asaas'],
    },
    aura: {
      description:
        'A voice-controlled personal agent for prospecting and task management. Semantic memory with a full lifecycle (V7), fed by 117 mined conversation sessions. Roadmap: web app with voice (v0.1), mobile app, dedicated server and a hardware ecosystem.',
      tags: ['Agents', 'Semantic memory', 'Voice'],
      aria: 'Illustration of the Aura panel with three autonomy levels and the Stop button',
      stop: 'Stop',
      levels: [
        { id: 'L1', title: 'Research and organize', sub: 'Does it alone', badge: 'Autonomous' },
        { id: 'L2', title: 'Send communications', sub: 'Waits for your approval', badge: 'Needs approval' },
        { id: 'L3', title: 'Money, law and reputation', sub: 'Always with you', badge: 'Human only' },
      ],
    },
    house: {
      title: 'Secure home',
      description:
        'A home security system designed from the threat model, not from a camera catalog. Frigate NVR, PTZ cameras and detection integrated with Aura, with physical actuation always manual.',
      tags: ['Frigate NVR', 'PTZ', 'Aura'],
      aria: 'Illustration of the camera panel with one highlighted detection and the manual actuation notice',
      detection: 'detection',
      cameras: ['Camera 1', 'PTZ camera', 'Camera 3', 'Camera 4'],
      notice: 'Gate and locks: always manually operated',
    },
    clinics: {
      title: 'Clinics',
      description:
        'Verdor’s next vertical product, under construction. Same method as the previous ones: one niche, its vocabulary, and embedded payments from day one.',
    },
  },
  writing: {
    title: 'Writing',
    lead: 'A technical article about what sits behind Blackbelts.',
    read: 'Read the article',
    all: 'All articles',
    minRead: 'min read',
  },
  about: {
    title: 'Technical authority without theater',
    p1: 'I am the solo founder of Verdor, a vertical software company with AI. I design, build and run the products end to end, from the data model to the app store, with recorded decisions and clear limits.',
    p2: 'I am my own CTO, CPO and CEO: I direct Claude Code on implementation and use Claude for strategy and architecture. I design with procedure, safety margin and clear limits, and that is what I bring to every system.',
    photoAlt: 'Gregory Guimarães',
    timeline: [
      { name: 'Verdor', role: 'Solo founder', note: 'Current' },
      { name: 'Blackbelts and PrimalWOD', role: 'Vertical SaaS', note: '' },
      { name: 'Aura', role: 'Personal AI agent', note: '' },
    ],
  },
  contact: {
    title: 'Let’s design the next system.',
    whatsappText: 'Hi Gregory, I saw your portfolio and would like to chat',
  },
  footer: {
    left: '© 2026 Gregory Guimarães. Verdor.',
    place: 'Minas Gerais, Brazil',
    source: 'Source code',
  },
};

export const homeCopy = { pt, en } as const;

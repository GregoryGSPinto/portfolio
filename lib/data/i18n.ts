export const translations = {
  pt: {
    skipLink: 'Pular para o conteúdo principal',
    chatbot: {
      welcome: 'Olá! Sou o assistente IA do Gregory. Posso responder sobre seus projetos, stack técnico, experiência e disponibilidade. O que gostaria de saber?',
      suggestions: ['Quais seus projetos?', 'Stack tecnico?', 'Experiência com IA?', 'Disponibilidade?'],
      placeholder: 'Pergunte sobre meus projetos...',
      errorProcess: 'Desculpe, não consegui processar sua pergunta. Tente novamente ou entre em contato por email: gregoryguimaraes12@outlook.com',
      errorConnection: 'Erro de conexão. Tente novamente em alguns segundos.',
      open: 'Abrir chat IA',
      close: 'Fechar chat',
    },
  },
  en: {
    skipLink: 'Skip to main content',
    chatbot: {
      welcome: "Hi! I'm Gregory's AI assistant. I can answer questions about his projects, tech stack, experience and availability. What would you like to know?",
      suggestions: ['Your projects?', 'Tech stack?', 'AI experience?', 'Availability?'],
      placeholder: 'Ask about my projects...',
      errorProcess: 'Sorry, I could not process your question. Please try again or contact via email: gregoryguimaraes12@outlook.com',
      errorConnection: 'Connection error. Please try again in a few seconds.',
      open: 'Open AI chat',
      close: 'Close chat',
    },
  },
};

export type Lang = 'pt' | 'en';
export type Translations = typeof translations;
export type TranslationTree = (typeof translations)['pt'];

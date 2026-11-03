export const siteConfig = {
  name: 'Gregory Guimarães',
  legalName: 'Gregory Guimarães',
  title: 'Gregory Guimarães | Senior AI Solution Architect, Founder @ Verdor',
  shortTitle: 'Gregory Guimarães',
  description:
    'Portfolio of Gregory Guimarães, a senior AI solution architect and founder of Verdor, building AI products and vertical SaaS with protected data, embedded payments and agents with clear limits.',
  url: 'https://portfolio-gregory-tau.vercel.app',
  locale: 'en_US',
  alternateLocale: 'pt_BR',
  ogImage:
    '/api/og?title=Gregory%20Guimar%C3%A3es&subtitle=Senior%20AI%20Solution%20Architect',
  email: 'gregoryguimaraes12@outlook.com',
  contactEmail: 'gregoryguimaraes12@gmail.com',
  links: {
    whatsapp: 'https://wa.me/5531983574530',
    github: 'https://github.com/GregoryGSPinto',
    linkedin: 'https://www.linkedin.com/in/mqt-gregory/',
    repository: 'https://github.com/GregoryGSPinto/portfolio',
    verdor: 'https://verdor-landing.vercel.app',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

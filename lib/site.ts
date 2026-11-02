export const siteConfig = {
  name: 'Gregory Guimarães',
  legalName: 'Gregory Guimarães',
  title: 'Gregory Guimarães | Senior Solutions Architect, AI and SaaS',
  shortTitle: 'Gregory Guimarães',
  description:
    'Portfolio of Gregory Guimarães, a senior solutions architect building AI products and vertical SaaS with protected data, embedded payments and agents with clear limits.',
  url: 'https://portfolio-gregory-tau.vercel.app',
  locale: 'en_US',
  alternateLocale: 'pt_BR',
  ogImage:
    '/api/og?title=Gregory%20Guimar%C3%A3es&subtitle=Senior%20Solutions%20Architect',
  email: 'gregoryguimaraes12@outlook.com',
  contactEmail: 'gregoryguimaraes12@gmail.com',
  links: {
    whatsapp: 'https://wa.me/5531983574530',
    github: 'https://github.com/GregoryGSPinto',
    linkedin: 'https://www.linkedin.com/in/mqt-gregory/',
    repository: 'https://github.com/GregoryGSPinto/portifolio',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}

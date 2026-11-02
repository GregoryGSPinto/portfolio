/**
 * Slideshows de "Os produtos por dentro". Imagens em public/images/produtos/<produto>/<perfil>-<desktop|mobile>.webp.
 * `demo: true` = a tela mostra dados de demonstração (fictícios) e recebe a legenda "Dados de demonstração".
 * Largura/altura são as dimensões reais dos arquivos (next/image).
 */

type Lang = 'pt' | 'en';

export interface ShotImage {
  src: string;
  width: number;
  height: number;
}

interface SlideText {
  label: string;
  caption: string;
  altDesktop?: string;
  altMobile?: string;
}

export interface ProductSlide {
  id: string;
  demo: boolean;
  desktop?: ShotImage;
  mobile?: ShotImage;
  text: Record<Lang, SlideText>;
}

export interface ProductShow {
  id: 'blackbelts' | 'primalwod' | 'aura';
  name: string;
  slides: ProductSlide[];
}

const img = (product: string, name: string, width: number, height: number): ShotImage => ({
  src: `/images/produtos/${product}/${name}.webp`,
  width,
  height,
});

export const productShows: ProductShow[] = [
  {
    id: 'blackbelts',
    name: 'Blackbelts',
    slides: [
      {
        id: 'site',
        demo: false,
        desktop: img('blackbelts', 'site-desktop', 1440, 900),
        mobile: img('blackbelts', 'site-mobile', 780, 1688),
        text: {
          pt: {
            label: 'Site público',
            caption: 'Página de entrada do Blackbelts: cobrança automática, chamada por QR Code e graduações.',
            altDesktop: 'Site do Blackbelts no computador: título Volta pro tatame e botão Testar grátis por 7 dias',
            altMobile: 'Site do Blackbelts no celular: título Volta pro tatame e botão Testar grátis por 7 dias',
          },
          en: {
            label: 'Public site',
            caption: 'Blackbelts landing page: automatic billing, QR Code attendance and belt promotions.',
            altDesktop: 'Blackbelts website on desktop: headline Back to the mat and a Try free for 7 days button',
            altMobile: 'Blackbelts website on mobile: headline Back to the mat and a Try free for 7 days button',
          },
        },
      },
      {
        id: 'professor',
        demo: true,
        desktop: img('blackbelts', 'professor-desktop', 1440, 900),
        mobile: img('blackbelts', 'professor-mobile', 780, 1688),
        text: {
          pt: {
            label: 'Professor',
            caption: 'Painel do professor: próxima aula, agenda do dia e alunos sob a sua tutoria.',
            altDesktop: 'Painel do professor no Blackbelts no computador: próxima aula, agenda do dia e pendências',
            altMobile: 'Painel do professor no Blackbelts no celular: próxima aula e agenda do dia',
          },
          en: {
            label: 'Instructor',
            caption: 'Instructor dashboard: next class, today’s schedule and the students under their guidance.',
            altDesktop: 'Blackbelts instructor dashboard on desktop: next class, today’s schedule and pending items',
            altMobile: 'Blackbelts instructor dashboard on mobile: next class and today’s schedule',
          },
        },
      },
      {
        id: 'aluno',
        demo: true,
        mobile: img('blackbelts', 'aluno-mobile', 340, 556),
        text: {
          pt: {
            label: 'Aluno adulto',
            caption: 'Tela Meu treino do app do aluno: continue a treinar, faixa atual e próxima aula.',
            altMobile: 'App do aluno do Blackbelts: Continue a treinar, faixa azul e próxima aula',
          },
          en: {
            label: 'Adult student',
            caption: 'My training screen in the student app: keep training, current belt and next class.',
            altMobile: 'Blackbelts student app: Keep training, blue belt and next class',
          },
        },
      },
      {
        id: 'kids',
        demo: true,
        desktop: img('blackbelts', 'kids-desktop', 1440, 900),
        mobile: img('blackbelts', 'kids-mobile', 780, 1688),
        text: {
          pt: {
            label: 'Aluno Kids',
            caption: 'Início do módulo Kids: aula do dia, faixa, figurinhas e conquistas.',
            altDesktop: 'Início do módulo Kids do Blackbelts no computador, com mascote de panda, aula do dia e conquistas',
            altMobile: 'Início do módulo Kids do Blackbelts no celular, com mascote de panda e aula do dia',
          },
          en: {
            label: 'Kids student',
            caption: 'Kids module home: today’s class, belt, stickers and achievements.',
            altDesktop: 'Blackbelts Kids module home on desktop, with a panda mascot, today’s class and achievements',
            altMobile: 'Blackbelts Kids module home on mobile, with a panda mascot and today’s class',
          },
        },
      },
    ],
  },
  {
    id: 'primalwod',
    name: 'PrimalWOD',
    slides: [
      {
        id: 'site',
        demo: true,
        desktop: img('primalwod', 'site-desktop', 1440, 680),
        mobile: img('primalwod', 'site-mobile', 780, 1688),
        text: {
          pt: {
            label: 'Site público',
            caption: 'Página de entrada do PrimalWOD, com um exemplo ilustrativo de aula e WOD.',
            altDesktop: 'Site do PrimalWOD no computador: Você abriu um box, não uma planilha, com exemplo de aula',
            altMobile: 'Site do PrimalWOD no celular: Você abriu um box, não uma planilha, com exemplo de aula',
          },
          en: {
            label: 'Public site',
            caption: 'PrimalWOD landing page, with an illustrative example of a class and WOD.',
            altDesktop: 'PrimalWOD website on desktop: You opened a box, not a spreadsheet, with a class example',
            altMobile: 'PrimalWOD website on mobile: You opened a box, not a spreadsheet, with a class example',
          },
        },
      },
      {
        id: 'admin',
        demo: true,
        desktop: img('primalwod', 'admin-desktop', 1408, 801),
        mobile: img('primalwod', 'admin-mobile', 716, 1550),
        text: {
          pt: {
            label: 'Administrador',
            caption: 'Início do painel do dono do box: atletas ativos, receita, inadimplência e check-ins do dia.',
            altDesktop: 'Painel do administrador do PrimalWOD no computador: atletas ativos, receita, frequência e turmas de hoje',
            altMobile: 'Painel do administrador do PrimalWOD no celular: receita, inadimplência e check-ins',
          },
          en: {
            label: 'Administrator',
            caption: 'Box owner dashboard home: active athletes, revenue, delinquency and today’s check-ins.',
            altDesktop: 'PrimalWOD administrator dashboard on desktop: active athletes, revenue, attendance and today’s classes',
            altMobile: 'PrimalWOD administrator dashboard on mobile: revenue, delinquency and check-ins',
          },
        },
      },
      {
        id: 'atleta',
        demo: true,
        desktop: img('primalwod', 'atleta-desktop', 1408, 801),
        mobile: img('primalwod', 'atleta-mobile', 780, 1630),
        text: {
          pt: {
            label: 'Aluno (atleta)',
            caption: 'Tela Hoje do atleta: WOD do dia, aula reservada e semana de treinos.',
            altDesktop: 'Tela Hoje do atleta no PrimalWOD no computador: WOD do dia, aula reservada e recordes',
            altMobile: 'Tela Hoje do atleta no PrimalWOD no celular: WOD do dia e aula reservada',
          },
          en: {
            label: 'Student (athlete)',
            caption: 'Athlete Today screen: workout of the day, booked class and training week.',
            altDesktop: 'PrimalWOD athlete Today screen on desktop: workout of the day, booked class and records',
            altMobile: 'PrimalWOD athlete Today screen on mobile: workout of the day and booked class',
          },
        },
      },
    ],
  },
  {
    id: 'aura',
    name: 'Aura',
    slides: [
      {
        id: 'chat',
        demo: true,
        desktop: img('aura', 'chat-desktop', 1440, 677),
        mobile: img('aura', 'chat-mobile', 700, 1034),
        text: {
          pt: {
            label: 'Conversa',
            caption: 'Conversa de exemplo do site da Aura: ela prepara um rascunho e pergunta antes de enviar.',
            altDesktop: 'Site da Aura no computador, com uma conversa de exemplo em que a Aura prepara um rascunho e pede confirmação',
            altMobile: 'Conversa de exemplo da Aura no celular: rascunho pronto com os botões Enviar e Ajustar',
          },
          en: {
            label: 'Chat',
            caption: 'Example conversation from the Aura site: it drafts a message and asks before sending.',
            altDesktop: 'Aura site on desktop, with an example conversation where Aura drafts a message and asks for confirmation',
            altMobile: 'Aura example conversation on mobile: a ready draft with Send and Adjust buttons',
          },
        },
      },
      {
        id: 'autonomia',
        demo: false,
        desktop: img('aura', 'autonomia-desktop', 1440, 628),
        mobile: img('aura', 'autonomia-mobile', 780, 1518),
        text: {
          pt: {
            label: 'Autonomia',
            caption: 'Três níveis de autonomia: faz sozinha, pede o seu toque e nunca age sem você.',
            altDesktop: 'Seção Confiança do site da Aura no computador: três níveis de autonomia',
            altMobile: 'Seção Confiança do site da Aura no celular: três níveis de autonomia',
          },
          en: {
            label: 'Autonomy',
            caption: 'Three autonomy levels: acts alone, asks for your touch, and never acts without you.',
            altDesktop: 'Trust section of the Aura site on desktop: three autonomy levels',
            altMobile: 'Trust section of the Aura site on mobile: three autonomy levels',
          },
        },
      },
    ],
  },
];

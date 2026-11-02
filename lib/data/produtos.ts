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
        id: 'administrador',
        demo: true,
        desktop: img('blackbelts', 'administrador-desktop', 1440, 900),
        text: {
          pt: {
            label: 'Administrador',
            caption: 'Gestão de turmas da academia: turmas ativas, matriculados por turma e horários da semana.',
            altDesktop: 'Tela Gestão de turmas do administrador no Blackbelts no computador: seis turmas ativas e matriculados por turma',
          },
          en: {
            label: 'Administrator',
            caption: 'Gym class management: active classes, enrolled students per class and the weekly schedule.',
            altDesktop: 'Blackbelts administrator Class management screen on desktop: six active classes and enrolled students per class',
          },
        },
      },
      {
        id: 'professor',
        demo: true,
        desktop: img('blackbelts', 'professor-desktop', 1440, 900),
        text: {
          pt: {
            label: 'Professor',
            caption: 'Minhas turmas: matriculados por turma, próxima aula do dia e horários da semana.',
            altDesktop: 'Tela Minhas turmas do professor no Blackbelts no computador: duas turmas de Jiu-Jitsu, matriculados e próxima aula',
          },
          en: {
            label: 'Instructor',
            caption: 'My classes: enrolled students per class, today’s next class and the weekly schedule.',
            altDesktop: 'Blackbelts instructor My classes screen on desktop: two Jiu-Jitsu classes, enrolled students and next class',
          },
        },
      },
      {
        id: 'biblioteca',
        demo: true,
        desktop: img('blackbelts', 'biblioteca-desktop', 1440, 900),
        text: {
          pt: {
            label: 'Biblioteca de vídeos',
            caption: 'Biblioteca de aulas em vídeo da academia, com filtros por situação e busca.',
            altDesktop: 'Biblioteca de vídeos do Blackbelts no computador: lista de aulas de Jiu-Jitsu com filtros por situação',
          },
          en: {
            label: 'Video library',
            caption: 'The gym’s video lesson library, with status filters and search.',
            altDesktop: 'Blackbelts video library on desktop: a list of Jiu-Jitsu lessons with status filters',
          },
        },
      },
      {
        id: 'aluno',
        demo: true,
        desktop: img('blackbelts', 'aluno-desktop', 1440, 900),
        mobile: img('blackbelts', 'aluno-mobile', 1170, 2532),
        text: {
          pt: {
            label: 'Aluno adulto',
            caption: 'Início do app do aluno: próxima aula, sequência, frequência, graduação e a semana de treinos.',
            altDesktop: 'Início do aluno adulto no Blackbelts no computador: próxima aula, sequência de aulas, frequência e graduação',
            altMobile: 'Início do aluno adulto no Blackbelts no celular: próxima aula, sequência e frequência',
          },
          en: {
            label: 'Adult student',
            caption: 'Student app home: next class, streak, attendance, belt progress and the training week.',
            altDesktop: 'Blackbelts adult student home on desktop: next class, class streak, attendance and belt progress',
            altMobile: 'Blackbelts adult student home on mobile: next class, streak and attendance',
          },
        },
      },
      {
        id: 'teen',
        demo: true,
        desktop: img('blackbelts', 'teen-desktop', 1440, 900),
        mobile: img('blackbelts', 'teen-mobile', 1170, 2532),
        text: {
          pt: {
            label: 'Teen',
            caption: 'Início do módulo Teen: nível, XP, faixa e conquistas desbloqueadas, com responsável vinculado.',
            altDesktop: 'Início do módulo Teen do Blackbelts no computador: nível, XP, faixa e conquistas',
            altMobile: 'Início do módulo Teen do Blackbelts no celular: nível, XP e conquistas',
          },
          en: {
            label: 'Teen',
            caption: 'Teen module home: level, XP, belt and unlocked achievements, with a linked guardian.',
            altDesktop: 'Blackbelts Teen module home on desktop: level, XP, belt and achievements',
            altMobile: 'Blackbelts Teen module home on mobile: level, XP and achievements',
          },
        },
      },
      {
        id: 'kids',
        demo: true,
        desktop: img('blackbelts', 'kids-desktop', 1440, 900),
        mobile: img('blackbelts', 'kids-mobile', 1170, 2532),
        text: {
          pt: {
            label: 'Aluno Kids',
            caption: 'Tela Minha Faixa do módulo Kids: faixa atual, próxima faixa e a caminhada do aluno, com mascote de panda.',
            altDesktop: 'Tela Minha Faixa do módulo Kids do Blackbelts no computador, com mascote de panda, faixa atual e caminhada',
            altMobile: 'Tela Minha Faixa do módulo Kids do Blackbelts no celular, com mascote de panda e faixa atual',
          },
          en: {
            label: 'Kids student',
            caption: 'Kids module My Belt screen: current belt, next belt and the student’s journey, with a panda mascot.',
            altDesktop: 'Blackbelts Kids module My Belt screen on desktop, with a panda mascot, current belt and journey',
            altMobile: 'Blackbelts Kids module My Belt screen on mobile, with a panda mascot and current belt',
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
        desktop: img('primalwod', 'admin-desktop', 1440, 900),
        text: {
          pt: {
            label: 'Administrador',
            caption: 'Início do painel do dono do box: atletas ativos, receita, inadimplência, check-ins e turmas do dia.',
            altDesktop: 'Painel do administrador do PrimalWOD no computador: atletas, receita, inadimplência, frequência e turmas de hoje',
          },
          en: {
            label: 'Administrator',
            caption: 'Box owner dashboard home: active athletes, revenue, delinquency, check-ins and today’s classes.',
            altDesktop: 'PrimalWOD administrator dashboard on desktop: athletes, revenue, delinquency, attendance and today’s classes',
          },
        },
      },
      {
        id: 'coach',
        demo: true,
        desktop: img('primalwod', 'coach-desktop', 1440, 900),
        mobile: img('primalwod', 'coach-mobile', 780, 1688),
        text: {
          pt: {
            label: 'Coach',
            caption: 'Tela Hoje do coach: próxima aula, WOD do dia, aulas e PRs recentes dos atletas.',
            altDesktop: 'Tela Hoje do coach no PrimalWOD no computador: próxima aula, WOD do dia, aulas de hoje e PRs recentes',
            altMobile: 'Tela Hoje do coach no PrimalWOD no celular: próxima aula, aulas de hoje e WOD do dia',
          },
          en: {
            label: 'Coach',
            caption: 'Coach Today screen: next class, workout of the day, classes and athletes’ recent PRs.',
            altDesktop: 'PrimalWOD coach Today screen on desktop: next class, workout of the day, today’s classes and recent PRs',
            altMobile: 'PrimalWOD coach Today screen on mobile: next class, today’s classes and workout of the day',
          },
        },
      },
      {
        id: 'atleta',
        demo: true,
        desktop: img('primalwod', 'atleta-desktop', 1440, 900),
        mobile: img('primalwod', 'atleta-mobile', 780, 1688),
        text: {
          pt: {
            label: 'Aluno (atleta)',
            caption: 'Tela Hoje do atleta: WOD do dia, último resultado, semana de treinos e PRs.',
            altDesktop: 'Tela Hoje do atleta no PrimalWOD no computador: WOD do dia, último resultado, semana e PRs',
            altMobile: 'Tela Hoje do atleta no PrimalWOD no celular: WOD do dia, último resultado e PRs',
          },
          en: {
            label: 'Student (athlete)',
            caption: 'Athlete Today screen: workout of the day, latest result, training week and PRs.',
            altDesktop: 'PrimalWOD athlete Today screen on desktop: workout of the day, latest result, week and PRs',
            altMobile: 'PrimalWOD athlete Today screen on mobile: workout of the day, latest result and PRs',
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
      {
        id: 'demo',
        demo: true,
        desktop: img('aura', 'demo-desktop', 1440, 900),
        mobile: img('aura', 'demo-mobile', 1170, 2532),
        text: {
          pt: {
            label: 'Demonstração',
            caption: 'Tela de demonstração com dados fictícios: conversa, níveis de autonomia e lista de tarefas.',
            altDesktop: 'Tela de demonstração da Aura no computador: conversa com rascunho de e-mail, três níveis de autonomia e tarefas de hoje',
            altMobile: 'Tela de demonstração da Aura no celular: conversa com rascunho de e-mail e botões Enviar e Ajustar',
          },
          en: {
            label: 'Demo',
            caption: 'Demo screen with fictional data: conversation, autonomy levels and a task list.',
            altDesktop: 'Aura demo screen on desktop: a conversation with an email draft, three autonomy levels and today’s tasks',
            altMobile: 'Aura demo screen on mobile: a conversation with an email draft and Send and Adjust buttons',
          },
        },
      },
    ],
  },
];

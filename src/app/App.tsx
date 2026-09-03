import { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import emailjs from '@emailjs/browser';
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import imgAthlete from "@/imports/LandingPagePlaymaker/84e0169ded5d607f95c1fb7fbf396bc142fb1d8b.png";
import imgTeam from "@/imports/LandingPagePlaymaker/3fae4689d465d7bc1342dc8d3791d935bbeff0a0.png";
import imgLogo from "@/imports/LandingPagePlaymaker/f038cc64538778a2884126d4e4dd6a92967de404.png";
import imgPlaymakerLogo from "@/imports/image-1.png";
import imgFavicon from "@/imports/Playmaker_Logo_Preta_Fundo_Branca.png";
import svgPaths from "@/imports/LandingPagePlaymaker/svg-kvntwkfud6";

const LIME = "#c8f135";

// ─── Translations ─────────────────────────────────────────────────────────────
const translations = {
  en: {
    nav: {
      services: "Services",
      about: "About",
      contact: "Contact",
      faq: "FAQ",
      cta: "Schedule Meeting",
      ariaTop: "Go to top",
    },
    hero: {
      tag: "PLAYMAKER: Sports Marketing Agency",
      heading1: "You deliver.",
      heading2: "Your brand",
      headingHighlight: "doesn't",
      heading3: "show.",
      sub: "We transform gyms, arenas and sports businesses into recognised, trusted brands. The kind the market pays more for.",
      cta1: "Schedule Meeting",
      cta2: "Our Services",
    },
    proof: {
      stats: [
        { value: "+300K", label: "Views generated" },
        { value: "$200K", label: "Raised with pitch decks & rebranding" },
        { value: "65K", label: "Accounts reached — avg. 5× follower base" },
        { value: "+200", label: "Event participants" },
      ],
      stageLabel: "On the CONJEF stage",
    },
    pains: {
      tag: "Recognise Any of These?",
      heading: ["THE PROBLEMS", "THAT", "BLOCK YOUR GROWTH."],
      headingHighlight: "BLOCK",
      sub: "We've mapped the most common bottlenecks in local sports businesses and built specific solutions for each one.",
      cards: [
        {
          title: "Good structure, amateur brand",
          desc: "Operations run well, but the visual identity and communication still feel improvised. That costs credibility when negotiating price.",
        },
        {
          title: "Students stay, new ones don't arrive",
          desc: "Without strong positioning, the decision between you and a competitor comes down to price — stopping you from charging more.",
        },
        {
          title: "Events that don't sell out",
          desc: "Everything is ready for game day, competition or championship. What's missing is the crowd's engagement.",
        },
        {
          title: "Content identical to the competition",
          desc: "Generic posts that don't show what makes your business different — so people just scroll past.",
        },
      ],
      bannerBold: "PLAYMAKER solves exactly this.",
      bannerText: " Our methodology turns these obstacles into real competitive advantages for your business.",
      bannerCta: "I Want to Solve This",
    },
    services: {
      tag: "What We Do",
      heading: ["SOLUTIONS THAT", "TRANSFORM", "YOUR BRAND"],
      headingHighlight: "TRANSFORM",
      sub: "From strategic planning to creative execution, we offer complete solutions for the entire sports ecosystem.",
      badge: "MOST CHOSEN",
      items: [
        {
          num: "01",
          title: "Brand Strategy",
          desc: "Positioning and identity that make your gym, academy or arena a reference — not just another option in the area.",
          tags: ["Branding", "Positioning", "Visual Identity"],
          featured: true,
        },
        {
          num: "02",
          title: "Sports Marketing",
          desc: "Specific strategies to attract and retain students, clients and partnerships — designed for the reality of local sports operators.",
          tags: ["Acquisition", "Retention", "Partnerships & Sponsorships"],
        },
        {
          num: "03",
          title: "Event Activation",
          desc: "Planning and promotion to ensure game days, internal tournaments or season openings are packed — and create the habit of coming back.",
          tags: ["Events", "Experience", "B2B & B2C"],
        },
        {
          num: "04",
          title: "Digital Campaigns",
          desc: "Content that stops the scroll of people who live or train in your area — putting your business at the top of local awareness.",
          tags: ["Social Media", "Performance", "Influencers"],
        },
        {
          num: "05",
          title: "Community & Belonging",
          desc: "Rituals, content and actions that make students and clients feel part of something — not just consumers of a service.",
          tags: ["Community", "Engagement"],
        },
        {
          num: "06",
          title: "Content Production",
          desc: "Photos, videos and assets that showcase the routine, structure and behind-the-scenes of your business with professional quality.",
          tags: ["Media", "Storytelling"],
        },
      ],
    },
    steps: {
      tag: "Playmaker Methodology",
      heading: ["STAGES OF", "OUR PROCESS."],
      sub: "The same process that already turned 1,500 views into 275,000. Work based on Study and Strategy. No guesswork.",
      cta: "Start Diagnosis",
      items: [
        {
          num: "01",
          title: "Diagnosis",
          desc: "We dive deep into your context: business goals, audience, competitive landscape and opportunities in the sports ecosystem.",
        },
        {
          num: "02",
          title: "Strategy",
          desc: "We develop a tailored plan with clear goals, priority channels, estimated investment and success indicators.",
        },
        {
          num: "03",
          title: "Execution",
          desc: "We put the plan into action — from creation to relationships with local partners and your community.",
        },
        {
          num: "04",
          title: "Measurement & Realignment",
          desc: "We evaluate results and realign the plan accordingly. This cycle repeats every month — always coming back sharper for the next diagnosis.",
        },
      ],
    },
    about: {
      tag: "About PLAYMAKER",
      heading: ["STRATEGY", "IS OUR", "SPORT."],
      stats: [
        { val: "2026", label: "Founded" },
        { val: "+10", label: "Projects" },
        { val: "5", label: "Services" },
      ],
      paras: [
        "Playmaker was born in 2026, in Rio de Janeiro, from the belief that sport is the world's greatest engagement platform — and that local sports businesses deserve the same level of brand strategy already used by major clubs and brands.",
        "Before Playmaker, we had already built brand, community and real results in projects like GDO Fantasy Game, CONJEF and Sports Hub — turning small numbers into genuine growth, without needing a big club's budget.",
        "Today we apply that same methodology to gyms, academies, arenas and local sports businesses that are ready to grow with positioning, not just effort.",
      ],
      features: [
        "Background in communications",
        "Sold-out event (CONJEF)",
        "Tailored diagnosis",
        "Ongoing support",
      ],
      cta: "START DIAGNOSIS",
    },
    booking: {
      tag: "Let's Play Together",
      heading: ["SCHEDULE", "YOUR 1ST MEETING", "FOR FREE"],
      headingHighlight: "FOR FREE",
      sub: "A 40-minute conversation can completely change the trajectory of your brand in sport. No sales script, no fluff — just strategy, straight from whoever will handle your project.",
      features: [
        "40-minute free diagnosis",
        "Meeting with our Head of Strategy",
        "Personalised action plan at the end",
        "Available Mon–Fri, 7am–10pm",
      ],
      form: {
        name: "Name *",
        namePlaceholder: "Your full name",
        email: "E-mail *",
        emailPlaceholder: "your@email.com",
        org: "Organisation",
        orgPlaceholder: "Organisation name",
        service: "Service of Interest *",
        servicePlaceholder: "Select a service",
        serviceOptions: [
          "Brand Strategy",
          "Sports Marketing",
          "Event Activation",
          "Digital Campaigns",
          "Community & Belonging",
          "Content Production",
        ],
        date: "Preferred Date",
        context: "Project Context",
        contextPlaceholder: "Briefly describe your goal...",
        submit: "Request Meeting",
        submitting: "Sending...",
        confirm: "We will confirm within 12h to the e-mail provided.",
        success: "✓ Meeting successfully scheduled! We will confirm within 12h.",
        error: "✗ Error sending. Please try again or contact us by email.",
      },
    },
    faq: {
      tag: "Frequently Asked Questions",
      heading: ["QUESTIONS", "EVERY CLIENT", "ASKS."],
      sub: "Didn't find what you're looking for? Talk directly to our team.",
      cta: "ASK A QUESTION",
      items: [
        {
          question: "Does Playmaker work with small and local sports businesses?",
          answer: "Yes. Our main focus is precisely gyms, academies, arenas and local sports businesses — not only big clubs. We apply the same brand methodology used by larger organisations, adapted to the reality and budget of someone building a sports business in their area.",
        },
        {
          question: "How do I measure the return on marketing for my gym or academy?",
          answer: "We track indicators such as new students, retention, social media engagement and brand perception in the area. Each report shows what has changed since the initial diagnosis — no guesswork, with data that justifies every action.",
        },
        {
          question: "What is the minimum contract period with Playmaker?",
          answer: "We work with monthly cycles, without long mandatory commitments. The method is designed to show results and justify continuation — not to lock clients into a contract.",
        },
        {
          question: "Does Playmaker operate outside Rio de Janeiro?",
          answer: "Yes. We serve sports businesses across Brazil remotely. In Rio de Janeiro and the surrounding area, we also hold in-person meetings and visits when the project calls for it.",
        },
        {
          question: "Do I need to have a defined brand to hire Playmaker?",
          answer: "No. Many of our projects start precisely at this point — with no clear identity yet. The initial diagnosis is for exactly that: understanding where your business stands today and building positioning from scratch if needed.",
        },
      ],
    },
    footer: {
      links: ["Services", "About", "Contact", "FAQ"],
      copy: "© 2026 PLAYMAKER. All rights reserved.",
    },
  },

  pt: {
    nav: {
      services: "Serviços",
      about: "Sobre",
      contact: "Contacto",
      faq: "FAQ",
      cta: "Marcar Reunião",
      ariaTop: "Ir para o topo",
    },
    hero: {
      tag: "PLAYMAKER: Agência de Marketing Desportivo",
      heading1: "Tu entregas.",
      heading2: "A tua marca",
      headingHighlight: "não",
      heading3: "mostra.",
      sub: "Transformamos ginásios, arenas e negócios desportivos em marcas reconhecidas e confiáveis. Daquelas pelas quais o mercado paga mais.",
      cta1: "Marcar Reunião",
      cta2: "Os Nossos Serviços",
    },
    proof: {
      stats: [
        { value: "+300 MIL", label: "Visualizações geradas" },
        { value: "R$200 MIL", label: "Captados com pitch decks e rebranding" },
        { value: "65 MIL", label: "Contas alcançadas — média 5× a base de seguidores" },
        { value: "+200", label: "Participantes em eventos" },
      ],
      stageLabel: "No palco do CONJEF",
    },
    pains: {
      tag: "Reconheces Algum Destes?",
      heading: ["OS PROBLEMAS", "QUE", "TRAVAM O TEU CRESCIMENTO."],
      headingHighlight: "TRAVAM",
      sub: "Mapeámos as travagens mais comuns em negócios desportivos locais e construímos soluções específicas para cada uma delas.",
      cards: [
        {
          title: "Boa estrutura, marca amadora",
          desc: "A operação funciona, mas a identidade visual e a comunicação ainda parecem improvisadas. Isso custa credibilidade ao negociar o preço.",
        },
        {
          title: "Alunos ficam, novos não chegam",
          desc: "Sem um posicionamento forte, quem decide entre ti e o concorrente é o preço. Isso impede-te de cobrar mais.",
        },
        {
          title: "Eventos que não esgotam",
          desc: "Tudo pronto para o dia do jogo, da prova ou do campeonato. Só falta o envolvimento do público.",
        },
        {
          title: "Conteúdo igual ao do concorrente",
          desc: "Publicações genéricas que não mostram o que torna o teu negócio diferente — e por isso ninguém pára para ver.",
        },
      ],
      bannerBold: "A PLAYMAKER resolve exactamente isto.",
      bannerText: " A nossa metodologia transforma estes obstáculos em vantagens competitivas reais para o teu negócio.",
      bannerCta: "Quero Resolver",
    },
    services: {
      tag: "O Que Fazemos",
      heading: ["SOLUÇÕES QUE", "TRANSFORMAM", "A TUA MARCA"],
      headingHighlight: "TRANSFORMAM",
      sub: "Do planeamento estratégico à execução criativa, oferecemos soluções completas para todo o ecossistema desportivo.",
      badge: "MAIS ESCOLHIDO",
      items: [
        {
          num: "01",
          title: "Estratégia de Marca",
          desc: "Posicionamento e identidade que fazem o teu ginásio, academia ou arena ser referência — e não só mais uma opção na região.",
          tags: ["Branding", "Posicionamento", "Identidade Visual"],
          featured: true,
        },
        {
          num: "02",
          title: "Marketing Desportivo",
          desc: "Estratégias específicas para atrair e reter alunos, clientes e parcerias — pensadas para a realidade de quem opera no desporto local.",
          tags: ["Aquisição", "Retenção", "Parcerias e Patrocínios"],
        },
        {
          num: "03",
          title: "Activação de Eventos",
          desc: "Planeamento e divulgação para que dias de jogo, torneios internos ou aberturas de temporada esgotem — e criem o hábito de voltar.",
          tags: ["Eventos", "Experiência", "B2B & B2C"],
        },
        {
          num: "04",
          title: "Campanhas Digitais",
          desc: "Conteúdo que para o scroll de quem mora ou treina na tua região — e coloca o teu negócio no topo da memória local.",
          tags: ["Social Media", "Performance", "Influenciadores"],
        },
        {
          num: "05",
          title: "Comunidade e Pertença",
          desc: "Rituais, conteúdo e acções que fazem alunos e clientes sentirem-se parte de algo — não apenas consumidores de um serviço.",
          tags: ["Comunidade", "Envolvimento"],
        },
        {
          num: "06",
          title: "Produção de Conteúdo",
          desc: "Fotos, vídeos e peças que mostram a rotina, a estrutura e os bastidores do teu negócio com qualidade profissional.",
          tags: ["Média", "Storytelling"],
        },
      ],
    },
    steps: {
      tag: "Metodologia Playmaker",
      heading: ["ETAPAS DO", "NOSSO PROCESSO."],
      sub: "O mesmo processo que já transformou 1.500 visualizações em 275 mil. Trabalho baseado em Estudo e Estratégia. Sem achismos.",
      cta: "Iniciar Diagnóstico",
      items: [
        {
          num: "01",
          title: "Diagnóstico",
          desc: "Mergulhamos fundo no teu contexto: objectivos de negócio, público, cenário competitivo e oportunidades no ecossistema desportivo.",
        },
        {
          num: "02",
          title: "Estratégia",
          desc: "Desenvolvemos um plano à medida com metas claras, canais prioritários, investimento estimado e indicadores de sucesso.",
        },
        {
          num: "03",
          title: "Execução",
          desc: "Colocamos o plano em campo — da criação ao relacionamento com parceiros locais e a tua comunidade.",
        },
        {
          num: "04",
          title: "Mensuração e Reajuste",
          desc: "Avaliamos os resultados e reajustamos o plano com base neles. Este ciclo repete-se todos os meses — sempre mais afinado para o diagnóstico seguinte.",
        },
      ],
    },
    about: {
      tag: "Sobre a PLAYMAKER",
      heading: ["ESTRATÉGIA", "É O NOSSO", "DESPORTO."],
      stats: [
        { val: "2026", label: "Fundação" },
        { val: "+10", label: "Projectos" },
        { val: "5", label: "Serviços" },
      ],
      paras: [
        "A Playmaker nasceu em 2026, no Rio de Janeiro, da crença de que o desporto é a maior plataforma de envolvimento do mundo — e que os negócios desportivos locais merecem o mesmo nível de estratégia de marca que clubes e marcas grandes já utilizam.",
        "Antes da Playmaker, já construímos marca, comunidade e resultados reais em projectos como o GDO Fantasy Game, o CONJEF e o Sports Hub — transformando números pequenos em crescimento verdadeiro, sem depender do orçamento de um grande clube.",
        "Hoje aplicamos essa mesma metodologia a ginásios, academias, arenas e negócios desportivos locais que estão prontos para crescer com posicionamento, não apenas com esforço.",
      ],
      features: [
        "Formação em comunicação",
        "Evento com lotação esgotada (CONJEF)",
        "Diagnóstico à medida",
        "Suporte contínuo",
      ],
      cta: "INICIAR DIAGNÓSTICO",
    },
    booking: {
      tag: "Vamos Jogar Juntos",
      heading: ["MARCA", "A 1.ª REUNIÃO", "DE GRAÇA"],
      headingHighlight: "DE GRAÇA",
      sub: "Uma conversa de 40 minutos pode mudar completamente a trajectória da tua marca no desporto. Sem guião de vendas, sem rodeios — só estratégia directa com quem vai tratar do teu projecto.",
      features: [
        "40 minutos de diagnóstico gratuito",
        "Reunião com o nosso Head de Estratégia",
        "Plano de acção personalizado no final",
        "Horários disponíveis de seg a sex, 7h–22h",
      ],
      form: {
        name: "Nome *",
        namePlaceholder: "O teu nome completo",
        email: "E-mail *",
        emailPlaceholder: "o.teu@email.com",
        org: "Organização",
        orgPlaceholder: "Nome da organização",
        service: "Serviço de Interesse *",
        servicePlaceholder: "Selecciona um serviço",
        serviceOptions: [
          "Estratégia de Marca",
          "Marketing Desportivo",
          "Activação de Eventos",
          "Campanhas Digitais",
          "Comunidade e Pertença",
          "Produção de Conteúdo",
        ],
        date: "Data Preferida",
        context: "Contexto do Projecto",
        contextPlaceholder: "Descreve brevemente o teu objectivo...",
        submit: "Solicitar Reunião",
        submitting: "A enviar...",
        confirm: "Confirmaremos em até 12h no e-mail indicado.",
        success: "✓ Reunião marcada com sucesso! Confirmaremos em até 12h.",
        error: "✗ Erro ao enviar. Tenta novamente ou entra em contacto por e-mail.",
      },
    },
    faq: {
      tag: "Dúvidas Frequentes",
      heading: ["PERGUNTAS", "QUE TODO", "CLIENTE FAZ."],
      sub: "Não encontraste o que procuras? Fala directamente com a nossa equipa.",
      cta: "TIRAR DÚVIDAS",
      items: [
        {
          question: "A Playmaker trabalha com negócios desportivos pequenos e locais?",
          answer: "Sim. O nosso foco principal é precisamente ginásios, academias, arenas e negócios desportivos locais — não apenas grandes clubes. Aplicamos a mesma metodologia de marca usada por organizações maiores, adaptada à realidade e ao orçamento de quem está a construir um negócio desportivo na sua região.",
        },
        {
          question: "Como medir o retorno do marketing para o meu ginásio ou academia?",
          answer: "Acompanhamos indicadores como novos alunos, retenção, envolvimento nas redes sociais e percepção de marca na região. Cada relatório mostra o que mudou desde o diagnóstico inicial — sem achismos, com dados que justificam cada acção.",
        },
        {
          question: "Qual é o prazo mínimo de contrato com a Playmaker?",
          answer: "Trabalhamos com ciclos mensais, sem fidelização longa obrigatória. O método está pensado para mostrar resultados e justificar a continuidade — não para prender o cliente num contrato.",
        },
        {
          question: "A Playmaker trabalha fora do Rio de Janeiro?",
          answer: "Sim. Trabalhamos com negócios desportivos em todo o Brasil de forma remota. No Rio de Janeiro e região, também fazemos reuniões e visitas presenciais quando o projecto assim o exige.",
        },
        {
          question: "Preciso de ter uma marca definida para contratar a Playmaker?",
          answer: "Não. Boa parte dos nossos projectos começa exactamente nesse ponto — sem identidade clara ainda. O diagnóstico inicial serve para isso: perceber onde o teu negócio está hoje e construir o posicionamento do zero, se for o caso.",
        },
      ],
    },
    footer: {
      links: ["Serviços", "Sobre", "Contacto", "FAQ"],
      copy: "© 2026 PLAYMAKER. Todos os direitos reservados.",
    },
  },
} as const;

type Lang = keyof typeof translations;
type T = typeof translations[Lang];

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const staggerContainer = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

function IconBrand({ paths }: { paths: readonly string[] }) {
  return (
    <svg width="36" height="36" viewBox="0 0 42.2268 42.2268" fill="none" className="shrink-0">
      {paths.map((d, i) => (
        <path key={i} d={d} stroke={LIME} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5189" />
      ))}
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ heroVisible, t }: { heroVisible: boolean; t: T }) {
  const [open, setOpen] = useState(false);
  const n = t.nav;

  const ctaBase = "hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase px-6 py-3 transition-colors duration-300";
  const ctaStyle = heroVisible
    ? "border border-white/25 text-white hover:border-white/50"
    : "bg-[#c8f135] text-black hover:bg-[#d8ff40]";

  return (
    <header className="bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <a href="#" aria-label={n.ariaTop}>
          <img src={imgLogo} alt="Playmaker" className="h-9 sm:h-12 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-10">
          {[
            { label: n.services, href: "#servicos" },
            { label: n.about, href: "#sobre" },
            { label: n.contact, href: "#agendar" },
            { label: n.faq, href: "#faq" },
          ].map((l) => (
            <a key={l.label} href={l.href} className="text-white/60 hover:text-white text-sm font-medium tracking-widest uppercase transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#agendar" className={`${ctaBase} ${ctaStyle}`}>
          {n.cta} <ArrowRight size={16} />
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 px-5 py-6 flex flex-col gap-5">
          {[
            { label: n.services, href: "#servicos" },
            { label: n.about, href: "#sobre" },
            { label: n.contact, href: "#agendar" },
            { label: n.faq, href: "#faq" },
          ].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-white/60 text-base font-medium tracking-widest uppercase">
              {l.label}
            </a>
          ))}
          <a href="#agendar" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-6 py-3 w-fit">
            {n.cta} <ArrowRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero({ sectionRef, t }: { sectionRef: React.RefObject<HTMLElement>; t: T }) {
  const h = t.hero;
  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] min-h-[85vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgAthlete} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
      </div>
      <div className="absolute right-0 top-1/3 h-1.5 w-2 bg-[#c8f135] hidden sm:block" />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 pb-12 sm:pb-20 pt-24 w-full">
        <p className="text-[#c8f135] text-xs sm:text-sm font-bold tracking-[0.4em] uppercase mb-4 sm:mb-6">
          {h.tag}
        </p>
        <h1 className="font-['Barlow_Condensed'] font-black uppercase leading-[0.92] text-white mb-6 sm:mb-8" style={{ fontSize: "clamp(3rem, 11vw, 8rem)" }}>
          {h.heading1}<br />
          {h.heading2}{" "}
          <span className="text-[#c8f135]">{h.headingHighlight}</span>{" "}
          {h.heading3}
        </h1>
        <p className="text-white/55 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10">
          {h.sub}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="#agendar" className="inline-flex items-center justify-center gap-2 bg-[#c8f135] text-black text-sm sm:text-base font-bold tracking-widest uppercase px-6 sm:px-10 py-4 hover:bg-[#d8ff40] transition-colors">
            {h.cta1} <ArrowRight size={18} />
          </a>
          <a href="#servicos" className="inline-flex items-center justify-center border border-white/25 text-white text-sm sm:text-base font-bold tracking-widest uppercase px-6 sm:px-10 py-4 hover:border-white/50 transition-colors">
            {h.cta2}
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof ─────────────────────────────────────────────────────────────
function SocialProof({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const p = t.proof;

  return (
    <section ref={ref} className="bg-[#c8f135]">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/15" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {p.stats.map((s, i) => (
            <motion.div key={i} className="bg-[#c8f135] p-6 sm:p-8 flex flex-col gap-2" variants={fadeInUp}>
              <span className="font-['Barlow_Condensed'] font-black text-black leading-none" style={{ fontSize: "clamp(2.2rem, 8vw, 5rem)", letterSpacing: "0" }}>
                {s.value}
              </span>
              <span className="text-black/50 text-xs sm:text-sm font-bold tracking-widest uppercase leading-snug">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 border-t border-black/15 pt-5 overflow-x-auto">
          <div className="flex gap-8 sm:gap-12 items-center whitespace-nowrap min-w-0">
            <p className="text-black/60 text-xs font-bold tracking-widest uppercase shrink-0">{p.stageLabel}</p>
            {["Marcelo Barreto", "Eric Faria", "Cahê Mota", "Charla Podcast", "Karine Alves", "Bruno Cantarelli"].map((n) => (
              <span key={n} className="font-['Barlow_Condensed'] font-black text-black/35 text-lg shrink-0">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Client Pains ─────────────────────────────────────────────────────────────
function ClientPains({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const p = t.pains;

  const icons = [
    [svgPaths.p1aa6a600, svgPaths.p1798300],
    [svgPaths.p25e5d580, svgPaths.p3a193a00, svgPaths.p2d6ca400, svgPaths.p3174ec00],
    ["M31.67 35.1886V17.5941", "M21.1133 35.1886V7.03739", "M10.5566 35.1895V24.6328"],
    [svgPaths.p3f4fab00, svgPaths.pd4a1400, svgPaths.p2df02c00],
  ];

  return (
    <section ref={ref} id="problemas" className="bg-[#0f0f0f] py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
          <div>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase mb-3">{p.tag}</p>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none" style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}>
              {p.heading[0]}<br />
              {p.heading[1]} <span className="text-[#c8f135]">{p.headingHighlight}</span><br />
              {p.heading[2].replace(p.headingHighlight, "").trim()}
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-sm md:max-w-xs shrink-0">{p.sub}</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {p.cards.map((c, i) => (
            <motion.div key={i} className="bg-[#0f0f0f] p-8 sm:p-10 flex flex-col gap-6" variants={fadeInUp}>
              <div className="opacity-75"><IconBrand paths={icons[i]} /></div>
              <h3 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-tight" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "-0.025em" }}>
                {c.title}
              </h3>
              <p className="text-white/45 text-base sm:text-lg leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="mt-10 sm:mt-12 border border-[#c8f135]/30 bg-[#c8f135]/5 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 0.6 }}>
          <p className="text-white text-base sm:text-xl leading-snug flex-1">
            <span className="font-semibold">{p.bannerBold}</span>
            <span className="text-white/80">{p.bannerText}</span>
          </p>
          <a href="#agendar" className="inline-flex items-center gap-2 bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-6 py-4 shrink-0 hover:bg-[#d8ff40] transition-colors">
            {p.bannerCta} <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const s = t.services;

  return (
    <section ref={ref} id="servicos" className="bg-[#0a0a0a] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
          <div>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase mb-3">{s.tag}</p>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none" style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}>
              {s.heading[0]}<br />
              <span className="text-[#c8f135]">{s.heading[1]}</span><br />
              {s.heading[2]}
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-sm md:max-w-xs shrink-0">{s.sub}</p>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {s.items.map((item) => (
            <motion.div key={item.num} className="bg-[#0a0a0a] p-6 sm:p-8 flex flex-col gap-4" variants={fadeInUp}>
              <div className="flex items-start justify-between">
                <span className="text-[#c8f135]/55 text-sm font-mono font-bold tracking-widest">{item.num}</span>
                {"featured" in item && item.featured && (
                  <span className="border border-[#c8f135] text-[#c8f135] text-[10px] font-bold tracking-widest uppercase px-3 py-1">{s.badge}</span>
                )}
              </div>
              <h3 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-tight" style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", letterSpacing: "-0.025em" }}>
                {item.title}
              </h3>
              <p className="text-white/45 text-sm sm:text-base leading-relaxed flex-1">{item.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="border border-white/15 text-white/40 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Work Steps ───────────────────────────────────────────────────────────────
function WorkSteps({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const st = t.steps;

  return (
    <section ref={ref} className="bg-[#c8f135] py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
          <div>
            <p className="text-black/40 text-xs font-bold tracking-[0.4em] uppercase mb-3">{st.tag}</p>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase text-black leading-none" style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)", letterSpacing: "-0.05em" }}>
              {st.heading[0]}<br />{st.heading[1]}
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="text-black/55 text-base sm:text-lg leading-relaxed">{st.sub}</p>
            <a href="#agendar" className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold tracking-widest uppercase px-6 py-4 w-fit hover:bg-[#111] transition-colors">
              {st.cta} <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/15" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          {st.items.map((s) => (
            <motion.div key={s.num} className="bg-[#c8f135] p-6 sm:p-8 flex flex-col gap-3" variants={fadeInUp}>
              <span className="font-['Barlow_Condensed'] font-black text-black/10 leading-none select-none" style={{ fontSize: "clamp(4rem, 12vw, 8rem)", letterSpacing: "-0.05em" }}>
                {s.num}
              </span>
              <h3 className="font-['Barlow_Condensed'] font-black uppercase text-black leading-tight -mt-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "-0.025em" }}>
                {s.title}
              </h3>
              <p className="text-black/55 text-sm sm:text-base leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const a = t.about;

  return (
    <section ref={ref} id="sobre" className="bg-[#0a0a0a] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div className="relative" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
            <div className="relative overflow-hidden rounded-sm" style={{ paddingTop: "110%" }}>
              <img src={imgTeam} alt="Equipe Playmaker em ação" className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[16px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img src={imgPlaymakerLogo} alt="Playmaker Logo" className="object-contain drop-shadow-2xl" style={{ width: "200%", height: "200%" }} />
              </div>
            </div>
            <div className="mt-4 bg-[#c8f135] grid grid-cols-3">
              {a.stats.map((stat, i) => (
                <div key={i} className={`p-5 flex flex-col gap-1 ${i > 0 ? "border-l border-black/15" : ""}`}>
                  <span className="font-['Barlow_Condensed'] font-black text-black text-3xl sm:text-4xl leading-none">{stat.val}</span>
                  <span className="text-black/50 text-[10px] font-bold tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className="flex flex-col gap-6" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 0.2 }}>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase">{a.tag}</p>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none" style={{ fontSize: "clamp(2.4rem, 8vw, 5.5rem)", letterSpacing: "-0.03em" }}>
              {a.heading[0]}<br />{a.heading[1]}<br />{a.heading[2]}
            </h2>
            <div className="flex flex-col gap-5 text-white/50 text-base sm:text-lg leading-relaxed">
              {a.paras.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 border-y border-white/10 py-6">
              {a.features.map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M20 6L9 17L4 12" stroke={LIME} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
            <a href="#agendar" className="inline-flex items-center gap-2 bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-8 py-4 w-fit hover:bg-[#d8ff40] transition-colors">
              {a.cta} <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Booking ──────────────────────────────────────────────────────────────────
function Booking({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const b = t.booking;
  const f = b.form;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await emailjs.sendForm('service_5m366v9', 'template_27p9c6k', e.currentTarget, 'yL5w4mmVv94Ocl0Tc');
      setSubmitStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Erro ao enviar:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="agendar" className="bg-[#0a0a0a] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <motion.div className="flex flex-col gap-6" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase">{b.tag}</p>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none" style={{ fontSize: "clamp(2.4rem, 8vw, 5.5rem)", letterSpacing: "-0.03em" }}>
              {b.heading[0]}<br />{b.heading[1]}<br />
              <span className="text-[#c8f135]">{b.heading[2]}</span>.
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md">{b.sub}</p>
            <div className="flex flex-col gap-4 mt-2">
              {b.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                  <svg width="22" height="22" viewBox="0 0 26 26" fill="none" className="shrink-0">
                    <circle cx="13" cy="13" r="11" stroke={LIME} strokeWidth="2" />
                    <path d="M13 8v5l3 3" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  {feat}
                </div>
              ))}
            </div>
          </motion.div>
          <motion.form onSubmit={handleSubmit} className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-10 flex flex-col gap-6" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp} transition={{ delay: 0.2 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs font-bold tracking-widest uppercase">{f.name}</label>
                <input type="text" name="user_name" required placeholder={f.namePlaceholder} className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs font-bold tracking-widest uppercase">{f.email}</label>
                <input type="email" name="user_email" required placeholder={f.emailPlaceholder} className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">{f.org}</label>
              <input type="text" name="organization" placeholder={f.orgPlaceholder} className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">{f.service}</label>
              <select name="service" required className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full outline-none focus:border-[#c8f135]/40 transition-colors appearance-none">
                <option value="">{f.servicePlaceholder}</option>
                {f.serviceOptions.map((o) => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">{f.date}</label>
              <input type="date" name="preferred_date" className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full outline-none focus:border-[#c8f135]/40 transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">{f.context}</label>
              <textarea name="message" rows={4} placeholder={f.contextPlaceholder} className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors resize-none" />
            </div>
            {submitStatus === 'success' && (
              <div className="bg-[#c8f135]/10 border border-[#c8f135]/30 text-[#c8f135] text-sm px-5 py-3 text-center">{f.success}</div>
            )}
            {submitStatus === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-5 py-3 text-center">{f.error}</div>
            )}
            <button type="submit" disabled={isSubmitting} className="bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-6 py-5 w-full flex items-center justify-center gap-2 hover:bg-[#d8ff40] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? f.submitting : f.submit} <ArrowRight size={18} />
            </button>
            {submitStatus === 'idle' && (
              <p className="text-white/20 text-xs text-center">{f.confirm}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ({ t }: { t: T }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);
  const fq = t.faq;

  return (
    <section ref={ref} id="faq" className="bg-[#0f0f0f] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <motion.div className="flex flex-col gap-6" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={fadeInUp}>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase">{fq.tag}</p>
            <h2 className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none" style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", letterSpacing: "-0.03em" }}>
              {fq.heading[0]}<br />{fq.heading[1]}<br />{fq.heading[2]}
            </h2>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed">{fq.sub}</p>
            <a href="#agendar" className="inline-flex items-center gap-2 border border-white/25 text-white text-sm font-bold tracking-widest uppercase px-6 py-4 w-fit hover:border-white/50 transition-colors">
              {fq.cta} <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.div className="flex flex-col gap-0.5" variants={staggerContainer} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            {fq.items.map((item, i) => (
              <motion.div key={i} className="bg-[#0a0a0a] border border-white/10" variants={fadeInUp}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-6 text-left">
                  <span className="text-white/80 font-semibold text-sm sm:text-base leading-snug">{item.question}</span>
                  {open === i ? <ChevronUp size={22} className="text-[#c8f135] shrink-0" /> : <ChevronDown size={22} className="text-[#c8f135] shrink-0" />}
                </button>
                {open === i && (
                  <div className="px-5 sm:px-8 pb-5 sm:pb-6 text-white/40 text-sm sm:text-base leading-relaxed border-t border-white/10 pt-4">
                    {item.answer}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ t }: { t: T }) {
  const ft = t.footer;
  const hrefs = ["#servicos", "#sobre", "#agendar", "#faq"];

  return (
    <footer className="bg-[#050505] border-t border-white/10">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <span className="font-['Barlow_Condensed'] font-black text-white text-2xl tracking-tight uppercase">PLAYMAKER</span>
          <nav className="flex flex-wrap gap-6 sm:gap-10">
            {ft.links.map((l, i) => (
              <a key={l} href={hrefs[i]} className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors">{l}</a>
            ))}
          </nav>
          <div className="flex flex-col items-end gap-1">
            <p className="text-white/20 text-xs whitespace-nowrap">{ft.copy}</p>
            <a href="mailto:marketingplaymaker1@gmail.com" className="text-white/30 text-xs hover:text-[#c8f135] transition-colors">
              marketingplaymaker1@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);
  const [lang, setLang] = useState<Lang>('en');

  // Detect language by IP geolocation — PT → European Portuguese, everywhere else → English
  useEffect(() => {
    fetch("https://ipapi.co/country/")
      .then((r) => r.text())
      .then((country) => {
        if (country.trim() === "PT") setLang("pt");
      })
      .catch(() => {
        // Fallback: use browser locale
        if (navigator.language.startsWith("pt-PT")) setLang("pt");
      });
  }, []);

  // Hero visibility for navbar CTA style
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Google Analytics
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-ERLZ1DH2V0";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-ERLZ1DH2V0');
    `;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  // Favicon
  useEffect(() => {
    const setFavicon = (rel: string, href: string) => {
      const existing = document.querySelector(`link[rel='${rel}']`);
      const link = existing || document.createElement('link');
      (link as HTMLLinkElement).type = 'image/png';
      (link as HTMLLinkElement).rel = rel;
      (link as HTMLLinkElement).href = href;
      if (!existing) document.head.appendChild(link);
    };
    setFavicon('icon', imgFavicon);
    setFavicon('shortcut icon', imgFavicon);
    setFavicon('apple-touch-icon', imgFavicon);
  }, []);

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Inter',sans-serif]">
      <Navbar heroVisible={heroVisible} t={t} />
      <Hero sectionRef={heroRef} t={t} />
      <SocialProof t={t} />
      <ClientPains t={t} />
      <Services t={t} />
      <WorkSteps t={t} />
      <About t={t} />
      <Booking t={t} />
      <FAQ t={t} />
      <Footer t={t} />
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import emailjs from '@emailjs/browser';
import { motion, useInView } from "motion/react";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import imgAthlete from "@/imports/LandingPagePlaymaker/84e0169ded5d607f95c1fb7fbf396bc142fb1d8b.png";
import imgTeam from "@/imports/LandingPagePlaymaker/3fae4689d465d7bc1342dc8d3791d935bbeff0a0.png";
import imgLogo from "@/imports/LandingPagePlaymaker/f038cc64538778a2884126d4e4dd6a92967de404.png";
import imgPlaymakerLogo from "@/imports/image-1.png";
import svgPaths from "@/imports/LandingPagePlaymaker/svg-kvntwkfud6";

const LIME = "#c8f135";

// Variantes de animação reutilizáveis
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

function IconBrand({ paths }: { paths: string[] }) {
  return (
    <svg width="36" height="36" viewBox="0 0 42.2268 42.2268" fill="none" className="shrink-0">
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={LIME}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.5189"
        />
      ))}
    </svg>
  );
}

function Navbar({ heroVisible }: { heroVisible: boolean }) {
  const [open, setOpen] = useState(false);

  const ctaBase = "hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase px-6 py-3 transition-colors duration-300";
  const ctaStyle = heroVisible
    ? "border border-white/25 text-white hover:border-white/50"
    : "bg-[#c8f135] text-black hover:bg-[#d8ff40]";

  return (
    <header className="bg-[#0a0a0a]/90 backdrop-blur-sm sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        <a href="#" aria-label="Ir ao topo">
          <img src={imgLogo} alt="Playmaker" className="h-9 sm:h-12 w-auto object-contain" />
        </a>
        <nav className="flex flex-wrap gap-6 sm:gap-10">
          <a href="#servicos" className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors">
            Serviços
          </a>
          <a href="#sobre" className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors">
            Sobre
          </a>
          <a href="#agendar" className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors">
            Contato
          </a>
          <a href="#faq" className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors">
            FAQ
          </a>
        </nav>
        <a href="#agendar" className={`${ctaBase} ${ctaStyle}`}>
          Agendar Reunião <ArrowRight size={16} />
        </a>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10 px-5 py-6 flex flex-col gap-5">
          <a href="#servicos" onClick={() => setOpen(false)} className="text-white/60 text-base font-medium tracking-widest uppercase">
            Serviços
          </a>
          <a href="#sobre" onClick={() => setOpen(false)} className="text-white/60 text-base font-medium tracking-widest uppercase">
            Sobre
          </a>
          <a href="#agendar" onClick={() => setOpen(false)} className="text-white/60 text-base font-medium tracking-widest uppercase">
            Contato
          </a>
          <a href="#faq" onClick={() => setOpen(false)} className="text-white/60 text-base font-medium tracking-widest uppercase">
            FAQ
          </a>
          <a href="#agendar" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-6 py-3 w-fit">
            Agendar Reunião <ArrowRight size={16} />
          </a>
        </div>
      )}
    </header>
  );
}

function Hero({ sectionRef }: { sectionRef: React.RefObject<HTMLElement> }) {
  return (
    <section ref={sectionRef} className="relative bg-[#0a0a0a] min-h-[85vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img src={imgAthlete} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
      </div>
      <div className="absolute right-0 top-1/3 h-1.5 w-2 bg-[#c8f135] hidden sm:block" />
      <div className="relative z-10 max-w-screen-xl mx-auto px-5 sm:px-8 pb-12 sm:pb-20 pt-24 w-full">
        <p className="text-[#c8f135] text-xs sm:text-sm font-bold tracking-[0.4em] uppercase mb-4 sm:mb-6">
          PLAYMAKER: Agência de Marketing Esportivo
        </p>
        <h1
          className="font-['Barlow_Condensed'] font-black uppercase leading-[0.92] text-white mb-6 sm:mb-8"
          style={{ fontSize: "clamp(3rem, 11vw, 8rem)" }}
        >
          Você entrega.<br />
          Sua marca{" "}
          <span className="text-[#c8f135]">não</span>{" "}
          mostra.
        </h1>
        <p className="text-white/55 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-8 sm:mb-10">
          Transformamos academias, arenas e negócios esportivos em marcas reconhecidas e confiáveis. Daquelas pelas quais o mercado paga mais.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="#agendar" className="inline-flex items-center justify-center gap-2 bg-[#c8f135] text-black text-sm sm:text-base font-bold tracking-widest uppercase px-6 sm:px-10 py-4 hover:bg-[#d8ff40] transition-colors">
            Agendar Reunião <ArrowRight size={18} />
          </a>
          <a href="#servicos" className="inline-flex items-center justify-center border border-white/25 text-white text-sm sm:text-base font-bold tracking-widest uppercase px-6 sm:px-10 py-4 hover:border-white/50 transition-colors">
            Nossos Serviços
          </a>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "+300 MIL", label: "Visualizações geradas" },
    { value: "R$200 MIL", label: "Captados com pitch decks e rebranding" },
    { value: "65 MIL", label: "Contas alcançadas — em média 5x a base de seguidores" },
    { value: "+200", label: "Participantes em eventos" },
  ];
  
  return (
    <section ref={ref} className="bg-[#c8f135]">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/15"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((s, i) => (
            <motion.div 
              key={i} 
              className="bg-[#c8f135] p-6 sm:p-8 flex flex-col gap-2"
              variants={fadeInUp}
            >
              <span
                className="font-['Barlow_Condensed'] font-black text-black leading-none"
                style={{ fontSize: "clamp(2.2rem, 8vw, 5rem)", letterSpacing: "0" }}
              >
                {s.value}
              </span>
              <span className="text-black/50 text-xs sm:text-sm font-bold tracking-widest uppercase leading-snug">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 border-t border-black/15 pt-5 overflow-x-auto">
          <div className="flex gap-8 sm:gap-12 items-center whitespace-nowrap min-w-0">
            <p className="text-black/60 text-xs font-bold tracking-widest uppercase shrink-0">No palco do CONJEF</p>
            {["Marcelo Barreto", "Eric Faria", "Cahê Mota", "Charla Podcast", "Karine Alves", "Bruno Cantarelli"].map((n) => (
              <span key={n} className="font-['Barlow_Condensed'] font-black text-black/35 text-lg shrink-0">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientPains() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: [svgPaths.p1aa6a600, svgPaths.p1798300],
      title: "Boa estrutura, marca amadora",
      desc: "A operação funciona, mas a identidade visual e a comunicação ainda parecem improvisadas. Isso custa credibilidade ao negociar o preço.",
    },
    {
      icon: [svgPaths.p25e5d580, svgPaths.p3a193a00, svgPaths.p2d6ca400, svgPaths.p3174ec00],
      title: "Alunos ficam, novos não chegam",
      desc: "Sem um posicionamento forte, quem decide entre você e o concorrente é o preço. Isso te impede de cobrar mais.",
    },
    {
      icon: [
        "M31.67 35.1886V17.5941",
        "M21.1133 35.1886V7.03739",
        "M10.5566 35.1895V24.6328",
      ],
      title: "Eventos que não lotam",
      desc: "Tudo pronto pro dia do jogo, da prova ou do campeonato. Só falta o engajamento da galera.",
    },
    {
      icon: [svgPaths.p3f4fab00, svgPaths.pd4a1400, svgPaths.p2df02c00],
      title: "Conteúdo igual ao do concorrente",
      desc: "Postagens genéricas que não mostram o que faz seu negócio diferente e por isso não param pra ver.",
    },
  ];

  return (
    <section ref={ref} id="problemas" className="bg-[#0f0f0f] py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase mb-3">Reconhece Algum Desses?</p>
            <h2
              className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none"
              style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
            >
              OS PROBLEMAS<br />
              QUE <span className="text-[#c8f135]">TRAVAM</span><br />
              SEU CRESCIMENTO.
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-sm md:max-w-xs shrink-0">
            Mapeamos as travas mais comuns em negócios esportivos locais e construímos soluções específicas para cada uma delas.
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {cards.map((c, i) => (
            <motion.div 
              key={i} 
              className="bg-[#0f0f0f] p-8 sm:p-10 flex flex-col gap-6"
              variants={fadeInUp}
            >
              <div className="opacity-75">
                <IconBrand paths={c.icon} />
              </div>
              <h3
                className="font-['Barlow_Condensed'] font-black uppercase text-white leading-tight"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "-0.025em" }}
              >
                {c.title}
              </h3>
              <p className="text-white/45 text-base sm:text-lg leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          className="mt-10 sm:mt-12 border border-[#c8f135]/30 bg-[#c8f135]/5 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <p className="text-white text-base sm:text-xl leading-snug flex-1">
            <span className="font-semibold">A PLAYMAKER resolve exatamente isso.</span>{" "}
            <span className="text-white/80">Nossa metodologia transforma esses obstáculos em vantagens competitivas reais pro seu negócio.</span>
          </p>
          <a href="#agendar" className="inline-flex items-center gap-2 bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-6 py-4 shrink-0 hover:bg-[#d8ff40] transition-colors">
            Quero Resolver <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      num: "01",
      badge: "MAIS ESCOLHIDO",
      title: "Estratégia de Marca",
      desc: "Posicionamento e identidade que fazem sua academia, escolinha ou arena ser referência — e não só mais uma opção na região.",
      tags: ["Branding", "Posicionamento", "Identidade Visual"],
      featured: true,
    },
    {
      num: "02",
      title: "Marketing esportivo",
      desc: "Estratégias específicas pra atrair e reter aluno, cliente e parcerias — pensadas pra realidade de quem opera no esporte local.",
      tags: ["Aquisição", "Retenção", "Parcerias e patrocínios"],
    },
    {
      num: "03",
      title: "Ativação de Eventos",
      desc: "Planejamento e divulgação pra dia de jogo, torneio interno ou abertura de temporada lotarem — e criarem o hábito de voltar.",
      tags: ["Eventos", "Experiência", "B2B & B2C"],
    },
    {
      num: "04",
      title: "Campanhas Digitais",
      desc: "Conteúdo que para o scroll de quem mora ou treina na sua região — e leva seu negócio pro topo da lembrança local.",
      tags: ["Social Media", "Performance", "Influencers"],
    },
    {
      num: "05",
      title: "Comunidade e pertencimento",
      desc: "Rituais, conteúdo e ações que fazem aluno e cliente se sentirem parte de algo — não só consumidores de um serviço.",
      tags: ["Comunidade", "Engajamento"],
    },
    {
      num: "06",
      title: "Produção de Conteúdo",
      desc: "Fotos, vídeos e peças que mostram a rotina, a estrutura e os bastidores do seu negócio com qualidade profissional.",
      tags: ["Mídia", "Storytelling"],
    },
  ];

  return (
    <section ref={ref} id="servicos" className="bg-[#0a0a0a] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div>
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase mb-3">O Que Fazemos</p>
            <h2
              className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none"
              style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)", letterSpacing: "-0.04em" }}
            >
              SOLUÇÕES QUE<br />
              <span className="text-[#c8f135]">TRANSFORMAM</span><br />
              SUA MARCA
            </h2>
          </div>
          <p className="text-white/40 text-base sm:text-lg leading-relaxed max-w-sm md:max-w-xs shrink-0">
            Do planejamento estratégico à execução criativa, oferecemos soluções completas para todo o ecossistema esportivo.
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((s) => (
            <motion.div 
              key={s.num} 
              className="bg-[#0a0a0a] p-6 sm:p-8 flex flex-col gap-4"
              variants={fadeInUp}
            >
              <div className="flex items-start justify-between">
                <span className="text-[#c8f135]/55 text-sm font-mono font-bold tracking-widest">{s.num}</span>
                {s.badge && (
                  <span className="border border-[#c8f135] text-[#c8f135] text-[10px] font-bold tracking-widest uppercase px-3 py-1">
                    {s.badge}
                  </span>
                )}
              </div>
              <h3
                className="font-['Barlow_Condensed'] font-black uppercase text-white leading-tight"
                style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", letterSpacing: "-0.025em" }}
              >
                {s.title}
              </h3>
              <p className="text-white/45 text-sm sm:text-base leading-relaxed flex-1">{s.desc}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {s.tags.map((t) => (
                  <span key={t} className="border border-white/15 text-white/40 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WorkSteps() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      num: "01",
      title: "Diagnóstico",
      desc: "Mergulhamos fundo no seu contexto: objetivos de negócio, público, cenário competitivo e oportunidades no ecossistema esportivo.",
    },
    {
      num: "02",
      title: "Estratégia",
      desc: "Desenvolvemos um plano sob medida com metas claras, canais prioritários, investimento estimado e indicadores de sucesso.",
    },
    {
      num: "03",
      title: "Execução",
      desc: "Colocamos o plano em campo — da criação ao relacionamento com parceiros locais e sua comunidade.",
    },
    {
      num: "04",
      title: "Mensuração e reorganização",
      desc: "Avaliamos o resultado e reorganizamos o plano com base nele. Esse ciclo se repete todo mês — sempre voltando mais afiado pro diagnóstico seguinte.",
    },
  ];

  return (
    <section ref={ref} className="bg-[#c8f135] py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <div>
            <p className="text-black/40 text-xs font-bold tracking-[0.4em] uppercase mb-3">Metodologia Playmaker</p>
            <h2
              className="font-['Barlow_Condensed'] font-black uppercase text-black leading-none"
              style={{ fontSize: "clamp(2.4rem, 8vw, 6rem)", letterSpacing: "-0.05em" }}
            >
              ETAPAS DO<br />NOSSO PROCESSO.
            </h2>
          </div>
          <div className="flex flex-col gap-4 max-w-sm">
            <p className="text-black/55 text-base sm:text-lg leading-relaxed">
              O mesmo processo que já transformou 1.500 visualizações em 275 mil. Trabalho baseado em Estudo e Estratégia. Nada de achismo.
            </p>
            <a href="#agendar" className="inline-flex items-center gap-2 bg-black text-white text-sm font-bold tracking-widest uppercase px-6 py-4 w-fit hover:bg-[#111] transition-colors">
              Iniciar Diagnóstico <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-black/15"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {steps.map((s) => (
            <motion.div 
              key={s.num} 
              className="bg-[#c8f135] p-6 sm:p-8 flex flex-col gap-3"
              variants={fadeInUp}
            >
              <span
                className="font-['Barlow_Condensed'] font-black text-black/10 leading-none select-none"
                style={{ fontSize: "clamp(4rem, 12vw, 8rem)", letterSpacing: "-0.05em" }}
              >
                {s.num}
              </span>
              <h3
                className="font-['Barlow_Condensed'] font-black uppercase text-black leading-tight -mt-4"
                style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", letterSpacing: "-0.025em" }}
              >
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

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="sobre" className="bg-[#0a0a0a] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: image + stats */}
          <motion.div 
            className="relative"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <div className="relative overflow-hidden rounded-sm" style={{ paddingTop: "110%" }}>
              <img
                src={imgTeam}
                alt="Equipe Playmaker em ação"
                className="absolute inset-0 w-full h-full object-cover opacity-50 blur-[16px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src={imgPlaymakerLogo} 
                  alt="Playmaker Logo" 
                  className="object-contain drop-shadow-2xl" 
                  style={{ maxWidth: "60%", maxHeight: "60%" }} 
                />
              </div>
            </div>
            <div className="mt-4 bg-[#c8f135] grid grid-cols-3">
              {[
                { val: "2026", label: "Fundação" },
                { val: "+10", label: "Projetos" },
                { val: "5", label: "Serviços" },
              ].map((stat, i) => (
                <div key={i} className={`p-5 flex flex-col gap-1 ${i > 0 ? "border-l border-black/15" : ""}`}>
                  <span className="font-['Barlow_Condensed'] font-black text-black text-3xl sm:text-4xl leading-none">{stat.val}</span>
                  <span className="text-black/50 text-[10px] font-bold tracking-widest uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          {/* Right: text */}
          <motion.div 
            className="flex flex-col gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase">Sobre a PLAYMAKER</p>
            <h2
              className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none"
              style={{ fontSize: "clamp(2.4rem, 8vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              ESTRATÉGIA<br />É O NOSSO<br />ESPORTE.
            </h2>
            <div className="flex flex-col gap-5 text-white/50 text-base sm:text-lg leading-relaxed">
              <p>
                A Playmaker nasceu em 2026, no Rio de Janeiro, da crença de que esporte é a maior plataforma de engajamento do mundo — e que negócios esportivos locais merecem o mesmo nível de estratégia de marca que clubes e marcas grandes já usam.
              </p>
              <p>
                Antes da Playmaker, já construímos marca, comunidade e resultado real em projetos como o GDO Fantasy Game, o CONJEF e o Sports Hub — transformando números pequenos em crescimento de verdade.
              </p>
              <p>
                Hoje aplicamos essa mesma metodologia pra academias, escolinhas, arenas e negócios esportivos locais que estão prontos pra crescer com posicionamento, não só com esforço.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 border-y border-white/10 py-6">
              {[
                "Formação em comunicação",
                "Evento com lotação máxima (CONJEF)",
                "Diagnóstico sob medida",
                "Suporte contínuo",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M20 6L9 17L4 12" stroke={LIME} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
            <a href="#agendar" className="inline-flex items-center gap-2 bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-8 py-4 w-fit hover:bg-[#d8ff40] transition-colors">
              INICIAR DIAGNÓSTICO <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await emailjs.sendForm(
        'service_5m366v9',
        'template_27p9c6k',
        e.currentTarget,
        'yL5w4mmVv94Ocl0Tc'
      );
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
          {/* Left: description */}
          <motion.div 
            className="flex flex-col gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase">Vamos Jogar Juntos</p>
            <h2
              className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none"
              style={{ fontSize: "clamp(2.4rem, 8vw, 5.5rem)", letterSpacing: "-0.03em" }}
            >
              AGENDE<br />
              A 1° REUNIÃO<br />
              <span className="text-[#c8f135]">DE GRAÇA</span>.
            </h2>
            <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-md">
              Uma conversa de 40 minutos pode mudar completamente a trajetória da sua marca no esporte. Sem roteiro de venda, sem enrolação — só estratégia direto com quem vai tocar o seu projeto.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                <svg width="22" height="22" viewBox="0 0 26 26" fill="none" className="shrink-0">
                  <circle cx="13" cy="13" r="11" stroke={LIME} strokeWidth="2" />
                  <path d="M13 8v5l3 3" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
                </svg>
                40 minutos de diagnóstico gratuito
              </div>
              <div className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                <svg width="22" height="22" viewBox="0 0 26 26" fill="none" className="shrink-0">
                  <circle cx="13" cy="13" r="11" stroke={LIME} strokeWidth="2" />
                  <path d="M13 7c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM7 21c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
                </svg>
                Reunião com nosso Head de Estratégia
              </div>
              <div className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                <svg width="22" height="22" viewBox="0 0 26 26" fill="none" className="shrink-0">
                  <circle cx="13" cy="13" r="11" stroke={LIME} strokeWidth="2" />
                  <circle cx="13" cy="13" r="3" stroke={LIME} strokeWidth="2" />
                  <path d="M13 2v4M13 20v4M24 13h-4M6 13H2M20.5 5.5l-2.8 2.8M8.3 17.7l-2.8 2.8M20.5 20.5l-2.8-2.8M8.3 8.3L5.5 5.5" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
                </svg>
                Plano de ação personalizado ao final
              </div>
              <div className="flex items-center gap-3 text-white/55 text-sm sm:text-base">
                <svg width="22" height="22" viewBox="0 0 26 26" fill="none" className="shrink-0">
                  <rect x="4" y="6" width="18" height="16" rx="2" stroke={LIME} strokeWidth="2" />
                  <path d="M4 11h18M9 3v6M17 3v6" stroke={LIME} strokeWidth="2" strokeLinecap="round" />
                </svg>
                Horários disponíveis de seg a sex, 7h–22h
              </div>
            </div>
          </motion.div>
          {/* Right: form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-10 flex flex-col gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs font-bold tracking-widest uppercase">Nome *</label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Seu nome completo"
                  className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-white/35 text-xs font-bold tracking-widest uppercase">E-mail *</label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="seu@email.com"
                  className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">Organização</label>
              <input
                type="text"
                name="organization"
                placeholder="Nome da organização"
                className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">Serviço de Interesse *</label>
              <select 
                name="service" 
                required
                className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full outline-none focus:border-[#c8f135]/40 transition-colors appearance-none"
              >
                <option value="">Selecione um serviço</option>
                <option>Estratégia de Marca</option>
                <option>Marketing Esportivo</option>
                <option>Ativação de Eventos</option>
                <option>Campanhas Digitais</option>
                <option>Comunidade e Pertencimento</option>
                <option>Produção de Conteúdo</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">Data Preferida</label>
              <input
                type="date"
                name="preferred_date"
                className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full outline-none focus:border-[#c8f135]/40 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/35 text-xs font-bold tracking-widest uppercase">Contexto do Projeto</label>
              <textarea
                name="message"
                rows={4}
                placeholder="Descreva brevemente seu objetivo..."
                className="bg-[#0a0a0a] border border-white/10 text-white text-base px-5 py-4 w-full placeholder-white/20 outline-none focus:border-[#c8f135]/40 transition-colors resize-none"
              />
            </div>
            
            {submitStatus === 'success' && (
              <div className="bg-[#c8f135]/10 border border-[#c8f135]/30 text-[#c8f135] text-sm px-5 py-3 text-center">
                ✓ Reunião agendada com sucesso! Confirmaremos em até 12h.
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-5 py-3 text-center">
                ✗ Erro ao enviar. Tente novamente ou entre em contato por email.
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[#c8f135] text-black text-sm font-bold tracking-widest uppercase px-6 py-5 w-full flex items-center justify-center gap-2 hover:bg-[#d8ff40] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Solicitar Reunião'} <ArrowRight size={18} />
            </button>
            
            {submitStatus === 'idle' && (
              <p className="text-white/20 text-xs text-center">Confirmaremos em até 12h no e-mail informado.</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);
  
  const items = [
    {
      question: "A Playmaker atende negócios esportivos pequenos e locais?",
      answer: "Sim. Nosso foco principal é justamente academias, escolinhas, arenas e negócios esportivos locais — não só clubes grandes. Aplicamos a mesma metodologia de marca usada por organizações maiores, adaptada à realidade e ao orçamento de quem está construindo um negócio esportivo na sua região."
    },
    {
      question: "Como medir o retorno do marketing pra minha academia ou escolinha?",
      answer: "Acompanhamos indicadores como novos alunos, retenção, engajamento nas redes e percepção de marca na região. Cada relatório mostra o que mudou desde o diagnóstico inicial — sem achismo, com dados que justificam cada ação."
    },
    {
      question: "Qual é o prazo mínimo de contrato com a Playmaker?",
      answer: "Trabalhamos com ciclos mensais, sem fidelidade longa obrigatória. O método é pensado pra mostrar resultado e justificar a continuidade — não pra prender o cliente num contrato."
    },
    {
      question: "A Playmaker atende fora do Rio de Janeiro?",
      answer: "Sim. Atendemos negócios esportivos em todo o Brasil de forma remota. No Rio de Janeiro e região, também fazemos reuniões e visitas presenciais quando o projeto pede."
    },
    {
      question: "Preciso já ter uma marca definida pra contratar a Playmaker?",
      answer: "Não. Boa parte dos nossos projetos começa exatamente nesse ponto — sem identidade clara ainda. O diagnóstico inicial serve pra isso: entender onde seu negócio está hoje e construir o posicionamento do zero, se for o caso."
    },
  ];

  return (
    <section ref={ref} id="faq" className="bg-[#0f0f0f] border-t border-white/10 py-16 sm:py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          <motion.div 
            className="flex flex-col gap-6"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
          >
            <p className="text-[#c8f135] text-xs font-bold tracking-[0.4em] uppercase">Dúvidas Frequentes</p>
            <h2
              className="font-['Barlow_Condensed'] font-black uppercase text-white leading-none"
              style={{ fontSize: "clamp(2.4rem, 8vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              PERGUNTAS<br />QUE TODO<br />CLIENTE FAZ.
            </h2>
            <p className="text-white/40 text-base sm:text-lg leading-relaxed">
              Não encontrou o que procura? Fale diretamente com a nossa equipe.
            </p>
            <a href="#agendar" className="inline-flex items-center gap-2 border border-white/25 text-white text-sm font-bold tracking-widest uppercase px-6 py-4 w-fit hover:border-white/50 transition-colors">
              TIRAR DÚVIDAS <ArrowRight size={16} />
            </a>
          </motion.div>
          <motion.div 
            className="flex flex-col gap-0.5"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {items.map((item, i) => (
              <motion.div 
                key={i} 
                className="bg-[#0a0a0a] border border-white/10"
                variants={fadeInUp}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-6 text-left"
                >
                  <span className="text-white/80 font-semibold text-sm sm:text-base leading-snug">{item.question}</span>
                  {open === i ? (
                    <ChevronUp size={22} className="text-[#c8f135] shrink-0" />
                  ) : (
                    <ChevronDown size={22} className="text-[#c8f135] shrink-0" />
                  )}
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

function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10">
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <span className="font-['Barlow_Condensed'] font-black text-white text-2xl tracking-tight uppercase">
            PLAYMAKER
          </span>
          <nav className="flex flex-wrap gap-6 sm:gap-10">
            {["Serviços", "Sobre", "Contato", "FAQ"].map((l) => (
              <a key={l} href="#" className="text-white/30 text-sm tracking-widest uppercase hover:text-white/60 transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex flex-col items-end gap-1">
            <p className="text-white/20 text-xs whitespace-nowrap">© 2026 PLAYMAKER. Todos os direitos reservados.</p>
            <a href="mailto:marketingplaymaker1@gmail.com" className="text-white/30 text-xs hover:text-[#c8f135] transition-colors">
              marketingplaymaker1@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

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

  // Add favicon
  useEffect(() => {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'icon';
    link.href = imgPlaymakerLogo;
    document.head.appendChild(link);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-['Inter',sans-serif]">
      <Navbar heroVisible={heroVisible} />
      <Hero sectionRef={heroRef} />
      <SocialProof />
      <ClientPains />
      <Services />
      <WorkSteps />
      <About />
      <Booking />
      <FAQ />
      <Footer />
    </div>
  );
}

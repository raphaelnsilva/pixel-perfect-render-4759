import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AirVent, ShieldCheck, Wrench, Sparkles, ClipboardList, Snowflake, Factory, Cpu, Zap,
  Menu, X, Check, MessageCircle, Phone, Mail, Instagram, MapPin, ArrowRight, Quote, Plus,
} from "lucide-react";
import {
  images, contact, whatsappUrl, stats, projects, testimonials, faqs, type Category,
} from "@/lib/site-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ARC | Automação, Climatização e Refrigeração em São Paulo" },
      { name: "description", content: "Soluções em climatização, refrigeração, automação, instalação e manutenção para empresas comerciais e industriais em São Paulo." },
      { property: "og:title", content: "ARC | Automação, Climatização e Refrigeração em São Paulo" },
      { property: "og:description", content: "Soluções em climatização, refrigeração, automação, instalação e manutenção para empresas comerciais e industriais em São Paulo." },
    ],
  }),
  component: Index,
});

const nav = [
  ["Início", "#inicio"], ["Serviços", "#servicos"], ["Projetos", "#projetos"],
  ["Sobre nós", "#sobre"], ["FAQ", "#faq"], ["Contato", "#contato"],
] as const;

const services = [
  { icon: AirVent, t: "Instalação de Ar-Condicionado", d: "Instalação profissional de sistemas de climatização para ambientes comerciais e industriais." },
  { icon: ShieldCheck, t: "Manutenção Preventiva", d: "Planos de manutenção para aumentar a vida útil dos equipamentos e reduzir falhas." },
  { icon: Wrench, t: "Manutenção Corretiva", d: "Diagnóstico e correção de problemas em sistemas de climatização e refrigeração." },
  { icon: Sparkles, t: "Higienização", d: "Limpeza e higienização de equipamentos para melhorar desempenho e qualidade do ar." },
  { icon: ClipboardList, t: "PMOC", d: "Planejamento e acompanhamento da manutenção, operação e controle dos sistemas de climatização." },
  { icon: Snowflake, t: "Refrigeração Comercial", d: "Soluções para ambientes comerciais que dependem de controle adequado de temperatura." },
  { icon: Factory, t: "Refrigeração Industrial", d: "Sistemas e manutenção para aplicações industriais e ambientes de maior demanda." },
  { icon: Cpu, t: "Automação", d: "Automação e controle de sistemas de climatização e infraestrutura." },
  { icon: Zap, t: "Elétrica", d: "Serviços elétricos relacionados aos sistemas de climatização, refrigeração e automação." },
];

const benefits = ["Atendimento especializado", "Soluções comerciais e industriais", "Manutenção preventiva e corretiva", "Diagnóstico técnico", "Atendimento em São Paulo", "Foco em segurança e eficiência", "Projetos personalizados"];

const steps = [
  ["01", "Contato", "O cliente entra em contato com a ARC."],
  ["02", "Avaliação", "Entendemos a necessidade e avaliamos o ambiente/equipamento."],
  ["03", "Solução", "Apresentamos a solução técnica adequada."],
  ["04", "Execução", "Nossa equipe realiza o serviço com acompanhamento profissional."],
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, prefix = "" }: { to: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{n}</span>;
}

function Logo({ light }: { light?: boolean }) {
  return (
    <a href="#inicio" className="flex items-center gap-3">
      <span className="grid h-10 w-10 place-items-center rounded bg-gradient-brand font-display text-sm font-extrabold text-primary-foreground">ARC</span>
      <span className="leading-tight">
        <span className={`block font-display text-lg font-extrabold tracking-wide ${light ? "text-navy-foreground" : "text-foreground"}`}>ARC</span>
        <span className={`block text-[10px] uppercase tracking-[0.18em] ${light ? "text-navy-foreground/60" : "text-muted-foreground"}`}>Automação • Climatização • Refrigeração</span>
      </span>
    </a>
  );
}

const ctaBtn = "inline-flex items-center justify-center gap-2 rounded bg-gradient-brand px-6 py-3.5 font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:brightness-110";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary"><span className="h-px w-8 bg-gradient-brand" />{children}</p>;
}

function Index() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<"Todos" | Category>("Todos");
  const [active, setActive] = useState<(typeof projects)[number] | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const shown = filter === "Todos" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="font-sans">
      {/* HEADER */}
      <header className={`fixed inset-x-0 top-0 z-40 transition-all ${scrolled || open ? "bg-navy/95 py-3 shadow-lg backdrop-blur" : "py-5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5">
          <Logo light />
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([l, h]) => <a key={h} href={h} className="text-sm font-medium text-navy-foreground/80 transition hover:text-cyan">{l}</a>)}
          </nav>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${ctaBtn} hidden !px-5 !py-2.5 text-sm lg:inline-flex`}>Solicitar orçamento</a>
          <button aria-label="Abrir menu" onClick={() => setOpen(!open)} className="p-2 text-navy-foreground lg:hidden">{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="mx-5 mt-3 flex flex-col gap-1 border-t border-navy-foreground/10 pt-3 pb-4 lg:hidden">
            {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 text-lg font-medium text-navy-foreground">{l}</a>)}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${ctaBtn} mt-2`}>Solicitar orçamento</a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="inicio" className="relative flex min-h-[100svh] items-end overflow-hidden bg-navy pb-16 pt-32 md:items-center">
        <img src={images.hero} alt="Condensadoras e chillers industriais instalados em cobertura em São Paulo" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute inset-0 grid-lines" />
        <div className="relative mx-auto w-full max-w-7xl px-5">
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan" /> Engenharia em climatização
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-foreground sm:text-5xl lg:text-7xl">
              Climatização, Refrigeração e Automação para ambientes que <span className="bg-gradient-brand bg-clip-text text-transparent">exigem desempenho.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-navy-foreground/75">Soluções técnicas para empresas comerciais e industriais em São Paulo, com instalação, manutenção, automação e suporte especializado.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={ctaBtn}><MessageCircle className="h-5 w-5" /> Solicitar orçamento pelo WhatsApp</a>
              <a href="#projetos" className="inline-flex items-center justify-center gap-2 rounded border border-navy-foreground/25 px-6 py-3.5 font-semibold text-navy-foreground transition hover:border-cyan hover:text-cyan">Conheça nossos projetos <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded border border-navy-foreground/10 bg-navy-foreground/10 sm:grid-cols-3">
            {[[MapPin, "Atendimento em São Paulo"], [Factory, "Soluções comerciais e industriais"], [ShieldCheck, "Equipe especializada"]].map(([I, t]) => {
              const Icon = I as typeof MapPin;
              return <div key={t as string} className="flex items-center gap-3 bg-navy/70 px-5 py-4 backdrop-blur"><Icon className="h-5 w-5 text-cyan" /><span className="text-sm font-medium text-navy-foreground">{t as string}</span></div>;
            })}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="reveal grid gap-6 md:grid-cols-2 md:items-end">
            <div><Eyebrow>Serviços</Eyebrow><h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Soluções completas em climatização e infraestrutura</h2></div>
            <p className="text-lg text-muted-foreground">Da instalação à manutenção e automação dos sistemas, a ARC acompanha todo o ciclo de vida da sua infraestrutura de climatização e refrigeração.</p>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, t, d }, i) => (
              <article key={t} style={{ transitionDelay: `${(i % 3) * 80}ms` }} className="reveal group relative overflow-hidden rounded-lg border bg-card p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-brand transition-transform duration-500 group-hover:scale-x-100" />
                <div className="grid h-12 w-12 place-items-center rounded bg-secondary text-primary transition group-hover:bg-gradient-brand group-hover:text-primary-foreground"><Icon className="h-6 w-6" /></div>
                <h3 className="mt-6 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div className="reveal relative">
            <img src={images.tecnico} alt="Técnico HVAC medindo pressões em condensadora comercial" loading="lazy" width={1200} height={1408} className="aspect-[4/5] w-full rounded-lg object-cover" />
            <div className="absolute -bottom-6 right-4 max-w-xs rounded-lg bg-navy p-6 text-navy-foreground shadow-glow md:-right-6">
              <p className="font-display text-lg font-bold leading-snug">Seu sistema funcionando corretamente não é apenas conforto. <span className="text-cyan">É produtividade.</span></p>
            </div>
          </div>
          <div className="reveal">
            <Eyebrow>Por que a ARC</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Engenharia, eficiência e confiança.</h2>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-brand text-primary-foreground"><Check className="h-3.5 w-3.5" /></span><span className="font-medium">{b}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section id="projetos" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="reveal max-w-2xl"><Eyebrow>Portfólio</Eyebrow><h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Projetos e serviços realizados</h2>
            <p className="mt-4 text-lg text-muted-foreground">Conheça alguns dos trabalhos realizados pela ARC em climatização, refrigeração, automação e infraestrutura.</p></div>
          <div className="reveal mt-10 flex gap-2 overflow-x-auto pb-2">
            {(["Todos", "Climatização", "Refrigeração", "Automação", "Manutenção"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition ${filter === f ? "border-transparent bg-navy text-navy-foreground" : "hover:border-primary hover:text-primary"}`}>{f}</button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p, i) => (
              <button key={p.title} onClick={() => setActive(p)} className={`group relative overflow-hidden rounded-lg text-left animate-in fade-in zoom-in-95 duration-500 ${i === 0 && filter === "Todos" ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                <img src={p.image} alt={`${p.title} – ${p.location}`} loading="lazy" className="aspect-[4/3] h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-cyan">{p.category}</span>
                  <h3 className="mt-1 font-display text-xl font-bold text-navy-foreground">{p.title}</h3>
                  <p className="text-sm text-navy-foreground/70">{p.location}</p>
                </div>
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-navy-foreground/15 text-navy-foreground opacity-0 backdrop-blur transition group-hover:opacity-100"><Plus className="h-5 w-5" /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {active && (
        <div role="dialog" aria-modal="true" onClick={() => setActive(null)} className="fixed inset-0 z-50 grid place-items-center bg-navy/90 p-4 backdrop-blur animate-in fade-in">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl overflow-hidden rounded-lg bg-card animate-in zoom-in-95">
            <div className="relative"><img src={active.image} alt={active.title} className="max-h-[65vh] w-full object-cover" />
              <button aria-label="Fechar" onClick={() => setActive(null)} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-navy/70 text-navy-foreground"><X className="h-5 w-5" /></button></div>
            <div className="p-6"><span className="text-xs font-semibold uppercase tracking-widest text-primary">{active.category}</span>
              <h3 className="mt-1 font-display text-2xl font-bold">{active.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{active.location}</p>
              <p className="mt-3">{active.description}</p></div>
          </div>
        </div>
      )}

      {/* NÚMEROS */}
      <section className="relative overflow-hidden bg-navy py-20">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-10 px-5 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="reveal border-l border-cyan/30 pl-6">
              <p className="bg-gradient-brand bg-clip-text font-display text-5xl font-extrabold text-transparent md:text-6xl">{"value" in s && s.value !== undefined ? <Counter to={s.value} prefix={s.prefix} /> : s.text}</p>
              <p className="mt-2 text-navy-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2">
          <div className="reveal order-2 lg:order-1">
            <Eyebrow>Sobre a ARC</Eyebrow>
            <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Tecnologia e experiência para manter sua operação funcionando.</h2>
            <p className="mt-6 text-lg text-muted-foreground">A ARC atua com soluções em automação, climatização e refrigeração para empresas comerciais e industriais. Nosso trabalho combina conhecimento técnico, manutenção especializada e soluções personalizadas para cada necessidade.</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[["Precisão", "Diagnóstico e execução técnica."], ["Eficiência", "Soluções pensadas para desempenho e economia."], ["Confiabilidade", "Manutenção e suporte para manter sua operação funcionando."]].map(([t, d]) => (
                <div key={t} className="rounded-lg border bg-card p-5"><h3 className="font-display font-bold text-primary">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
              ))}
            </div>
          </div>
          <img src={images.salaTecnica} alt="Sala técnica com chillers, bombas e painel de automação" loading="lazy" width={1408} height={1008} className="reveal order-1 aspect-[4/3] w-full rounded-lg object-cover lg:order-2" />
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="reveal text-center"><h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Como funciona</h2></div>
          <ol className="relative mt-14 grid gap-8 md:grid-cols-4">
            <span className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-brand md:block" />
            {steps.map(([n, t, d], i) => (
              <li key={n} style={{ transitionDelay: `${i * 120}ms` }} className="reveal relative">
                <span className="relative grid h-14 w-14 place-items-center rounded-full border-2 border-primary bg-background font-display text-lg font-extrabold text-primary">{n}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5">
          <div className="reveal"><Eyebrow>Depoimentos</Eyebrow><h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">O que nossos clientes dizem</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.quote} className="reveal rounded-lg border bg-card p-7">
                <Quote className="h-8 w-8 text-accent" />
                <blockquote className="mt-4 text-lg">“{t.quote}”</blockquote>
                <figcaption className="mt-6 text-sm font-semibold text-muted-foreground">— {t.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5">
          <div className="reveal text-center"><h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">Perguntas frequentes</h2></div>
          <div className="mt-12 divide-y rounded-lg border bg-card">
            {faqs.map((f, i) => (
              <div key={f.q}>
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} aria-expanded={faqOpen === i} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display font-bold">
                  {f.q}<Plus className={`h-5 w-5 shrink-0 text-primary transition-transform ${faqOpen === i ? "rotate-45" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${faqOpen === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden px-6 text-muted-foreground"><span className="block pb-5">{f.a}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-navy py-24 md:py-32">
        <img src={images.refrigeracao} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 grid-lines" />
        <div className="reveal relative mx-auto max-w-4xl px-5 text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-foreground md:text-5xl">Precisa de uma solução para climatização, refrigeração ou automação?</h2>
          <p className="mt-5 text-lg text-navy-foreground/75">Fale com a ARC e solicite uma avaliação para sua empresa.</p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${ctaBtn} mt-10 !px-8 !py-5 text-lg`}><MessageCircle className="h-6 w-6" /> Solicitar orçamento pelo WhatsApp</a>
          <p className="mt-5 text-sm text-navy-foreground/60">Atendimento comercial e industrial em São Paulo.</p>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="reveal"><Eyebrow>Contato</Eyebrow><h2 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Fale com a ARC</h2></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              [MessageCircle, "WhatsApp", contact.whatsappLabel, whatsappUrl],
              [Phone, "Telefone", contact.phone, `tel:${contact.phone.replace(/\D/g, "")}`],
              [Mail, "E-mail", contact.email, `mailto:${contact.email}`],
              [Instagram, "Instagram", contact.instagram, `https://instagram.com/${contact.instagram.slice(1)}`],
              [MapPin, "Localização", contact.city, undefined],
            ].map(([I, l, v, h]) => {
              const Icon = I as typeof Phone;
              return (
                <a key={l as string} href={h as string | undefined} target={h ? "_blank" : undefined} rel="noopener noreferrer" className="reveal rounded-lg border bg-card p-5 transition hover:border-primary/40">
                  <Icon className="h-5 w-5 text-primary" /><p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">{l as string}</p><p className="mt-1 break-words font-semibold">{v as string}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy py-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between">
          <Logo light />
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.map(([l, h]) => <a key={h} href={h} className="text-sm text-navy-foreground/70 hover:text-cyan">{l === "Sobre nós" ? "Sobre" : l}</a>)}
          </nav>
        </div>
        <p className="mx-auto mt-8 max-w-7xl border-t border-navy-foreground/10 px-5 pt-6 text-sm text-navy-foreground/50">© 2026 ARC. Todos os direitos reservados.</p>
      </footer>

      {/* WHATSAPP FLUTUANTE */}
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Conversar no WhatsApp" className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition hover:scale-110">
        <MessageCircle className="h-7 w-7" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-cyan/40" />
      </a>
    </div>
  );
}

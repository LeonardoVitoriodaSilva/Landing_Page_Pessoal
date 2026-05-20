'use client';
import { useEffect, useRef, useState } from "react";

const foto3 = '/foto3.jpeg';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg: #0a0a0f; --bg2: #111118; --bg3: #1a1a24;
    --accent: #00e5ff; --accent2: #7c6cfa;
    --text: #f0f0f8; --muted: #8888aa; --border: rgba(255,255,255,0.07);
  }
  html, body { width: 100%; scroll-behavior: smooth; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; margin: 0; padding: 0; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.2rem 6vw;
    background: rgba(10,10,15,0.85); backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.1rem; letter-spacing: 0.05em; color: var(--text); }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { color: var(--muted); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .nav-links a:hover { color: var(--text); }
  .nav-cta {
    background: transparent; border: 1px solid var(--accent); color: var(--accent);
    padding: 0.5rem 1.2rem; border-radius: 6px; font-size: 0.85rem; cursor: pointer;
    font-family: 'DM Sans', sans-serif; transition: all 0.2s;
  }
  .nav-cta:hover { background: var(--accent); color: #000; }
  .nav-hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
  .nav-hamburger span { display: block; width: 22px; height: 2px; background: var(--text); border-radius: 2px; transition: all 0.3s; }

  /* HERO */
  .hero-section {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 6rem 6vw 3rem; position: relative; overflow: hidden; width: 100%;
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 60px 60px; opacity: 0.4;
  }
  .hero-glow {
    position: absolute; top: -20%; left: -10%; width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow2 {
    position: absolute; bottom: -20%; right: -10%; width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(124,108,250,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-inner {
    position: relative; z-index: 1;
    display: grid; grid-template-columns: 1fr auto;
    gap: 4rem; align-items: center; width: 100%;
  }
  .hero-content { max-width: 520px; text-align: left; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);
    color: var(--accent); font-size: 0.78rem; padding: 0.35rem 0.9rem;
    border-radius: 100px; margin-bottom: 1.8rem; font-weight: 500;
  }
  .hero-dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s infinite; flex-shrink: 0; }
  @keyframes pulse { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:0.5; transform:scale(0.8); } }
  .hero-name { font-family: 'Syne', sans-serif; font-size: 3.8rem; font-weight: 800; line-height: 1.05; margin-bottom: 0.5rem; letter-spacing: -0.02em; }
  .hero-name .accent { color: var(--accent); }
  .hero-role { font-weight: 400; color: var(--muted); margin-bottom: 1.2rem; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.85rem; }
  .hero-desc { font-size: 0.97rem; color: var(--muted); margin-bottom: 2rem; line-height: 1.8; }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-primary {
    background: var(--accent); color: #000; padding: 0.75rem 1.8rem;
    border-radius: 8px; font-weight: 500; border: none; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; transition: all 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-primary:hover { background: #33eaff; transform: translateY(-2px); }
  .btn-secondary {
    background: transparent; color: var(--text); padding: 0.75rem 1.8rem;
    border-radius: 8px; font-weight: 400; border: 1px solid var(--border); cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; transition: all 0.2s;
    text-decoration: none; display: inline-block;
  }
  .btn-secondary:hover { border-color: rgba(255,255,255,0.3); transform: translateY(-2px); }
  .hero-socials { display: flex; gap: 0.8rem; margin-top: 2.5rem; }
  .social-link {
    width: 38px; height: 38px; border: 1px solid var(--border); border-radius: 8px;
    display: flex; align-items: center; justify-content: center; color: var(--muted);
    text-decoration: none; font-size: 0.8rem; transition: all 0.2s; font-weight: 500;
  }
  .social-link:hover { border-color: var(--accent); color: var(--accent); }
  .hero-photo-wrap { position: relative; flex-shrink: 0; }
  .hero-photo-wrap::before {
    content: ''; position: absolute; inset: -2px; border-radius: 22px;
    background: linear-gradient(135deg, rgba(0,229,255,0.25), rgba(124,108,250,0.15), transparent);
    z-index: 0; pointer-events: none;
  }
  .hero-photo { width: 400px; height: 520px; object-fit: cover; object-position: top center; border-radius: 20px; display: block; position: relative; z-index: 1; overflow: hidden; }
  .hero-photo-badge {
    position: absolute; bottom: -18px; left: 50%; transform: translateX(-50%); z-index: 2;
    background: rgba(17,17,24,0.95); border: 1px solid rgba(0,229,255,0.2); border-radius: 10px; padding: 10px 18px;
    display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text); white-space: nowrap; backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.4);
  }
  .badge-dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; flex-shrink: 0; }

  /* SECTIONS */
  .section { padding: 6rem 6vw; width: 100%; }
  .section--alt { background: var(--bg2); }
  .section-label { display: inline-block; font-size: 0.72rem; font-weight: 500; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 0.8rem; }
  .section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.8rem,3.5vw,2.5rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.2; }
  .section-desc { color: var(--muted); max-width: 500px; line-height: 1.8; font-size: 0.95rem; }

  /* SOBRE */
  .sobre-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-top: 3rem; }
  .sobre-text p { color: var(--muted); line-height: 1.9; margin-bottom: 1rem; font-size: 0.95rem; }
  .sobre-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .stat-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; text-align: center; }
  .stat-num { font-family: 'Syne', sans-serif; font-size: 2rem; font-weight: 800; color: var(--accent); display: block; }
  .stat-label { font-size: 0.78rem; color: var(--muted); margin-top: 4px; display: block; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1.5rem; margin-top: 3rem; }
  .skill-group { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; }
  .skill-group-title { font-family: 'Syne', sans-serif; font-size: 0.8rem; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1rem; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .skill-tag { background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.15); color: var(--text); font-size: 0.8rem; padding: 4px 11px; border-radius: 6px; }
  .skill-tag--purple { background: rgba(124,108,250,0.08); border-color: rgba(124,108,250,0.2); }
  .skill-tag--neutral { background: var(--bg3); border-color: var(--border); }

  /* PROJETOS */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px,1fr)); gap: 1.5rem; margin-top: 3rem; }
  .project-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 16px; padding: 1.8rem; transition: all 0.3s; position: relative; overflow: hidden; }
  .project-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent), var(--accent2)); opacity: 0; transition: opacity 0.3s; }
  .project-card:hover { border-color: rgba(0,229,255,0.2); transform: translateY(-4px); }
  .project-card:hover::before { opacity: 1; }
  .project-icon { width: 42px; height: 42px; background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.15); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.2rem; font-size: 1.1rem; }
  .project-title { font-family: 'Syne', sans-serif; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text); }
  .project-desc { color: var(--muted); font-size: 0.85rem; line-height: 1.7; margin-bottom: 1.2rem; }
  .project-techs { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 1.2rem; }
  .project-tech { background: var(--bg2); border: 1px solid var(--border); color: var(--muted); font-size: 0.72rem; padding: 3px 9px; border-radius: 4px; }
  .project-links { display: flex; gap: 10px; }
  .proj-btn { font-size: 0.78rem; padding: 6px 14px; border-radius: 6px; border: 1px solid var(--border); background: transparent; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; text-decoration: none; display: inline-block; }
  .proj-btn:hover { color: var(--accent); border-color: var(--accent); }
  .proj-btn--primary { background: rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.2); color: var(--accent); }
  .proj-btn--primary:hover { background: var(--accent); color: #000; }

  /* CONTATO */
  .contact-inner { max-width: 560px; margin: 0 auto; text-align: center; }
  .contact-form { display: flex; flex-direction: column; gap: 1rem; text-align: left; margin-top: 2.5rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  input, textarea { background: var(--bg2); border: 1px solid var(--border); color: var(--text); padding: 0.85rem 1rem; border-radius: 8px; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; width: 100%; transition: border-color 0.2s; outline: none; }
  input::placeholder, textarea::placeholder { color: var(--muted); }
  input:focus, textarea:focus { border-color: rgba(0,229,255,0.4); }
  textarea { resize: none; height: 130px; }
  .contact-links { display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap; }
  .contact-chip { display: flex; align-items: center; gap: 8px; background: var(--bg2); border: 1px solid var(--border); color: var(--muted); padding: 0.6rem 1.2rem; border-radius: 8px; font-size: 0.85rem; text-decoration: none; transition: all 0.2s; }
  .contact-chip:hover { border-color: var(--accent); color: var(--accent); }

  /* FOOTER */
  footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 2rem 6vw; display: flex; align-items: center; justify-content: space-between; width: 100%; }
  .footer-copy { color: var(--muted); font-size: 0.82rem; }
  .footer-logo { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 0.95rem; }
  .footer-logo span { color: var(--accent); }

  /* ANIMATIONS */
  .fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
  .fade-up.visible { opacity: 1; transform: translateY(0); }

  /* ===================== RESPONSIVE ===================== */

  /* Tablet (768px - 1024px) */
  @media (max-width: 1024px) {
    nav { padding: 1.2rem 2rem; }
    .hero-section { padding: 6rem 2rem 3rem; }
    .hero-inner { gap: 2rem; }
    .hero-name { font-size: 3rem; }
    .hero-photo { width: 280px; height: 370px; }
    .section { padding: 5rem 2rem; }
    .sobre-grid { gap: 2.5rem; }
    .skills-grid { grid-template-columns: repeat(2, 1fr); }
    footer { padding: 2rem; }
  }

  /* Mobile (max 768px) */
  @media (max-width: 768px) {
    /* Nav mobile */
    nav { padding: 1rem 1.5rem; }
    .nav-links { display: none; }
    .nav-links.open {
      display: flex; flex-direction: column; gap: 0;
      position: fixed; top: 60px; left: 0; right: 0;
      background: rgba(10,10,15,0.97); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border); padding: 1rem 0;
    }
    .nav-links.open li a { display: block; padding: 0.9rem 1.5rem; font-size: 1rem; border-bottom: 1px solid var(--border); }
    .nav-hamburger { display: flex; }
    .nav-cta { display: none; }

    /* Hero mobile — foto acima, texto abaixo */
    .hero-section { padding: 5rem 1.5rem 3rem; min-height: auto; }
    .hero-inner { grid-template-columns: 1fr; gap: 2rem; }
    .hero-photo-wrap { order: -1; display: flex; justify-content: center; }
    .hero-photo { width: 200px; height: 260px; }
    .hero-photo-badge { display: none; }
    .hero-content { max-width: 100%; text-align: center; }
    .hero-tag { margin-bottom: 1.2rem; }
    .hero-name { font-size: 2.6rem; }
    .hero-btns { justify-content: center; }
    .hero-socials { justify-content: center; }

    /* Sections */
    .section { padding: 4rem 1.5rem; }
    .sobre-grid { grid-template-columns: 1fr; gap: 2rem; }
    .sobre-stats { grid-template-columns: 1fr 1fr; }
    .skills-grid { grid-template-columns: 1fr; }
    .projects-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    footer { padding: 1.5rem; flex-direction: column; gap: 0.5rem; text-align: center; }
  }

  /* Very small (max 480px) */
  @media (max-width: 480px) {
    .hero-name { font-size: 2.1rem; }
    .hero-photo { width: 170px; height: 220px; }
    .btn-primary, .btn-secondary { width: 100%; text-align: center; }
    .hero-btns { flex-direction: column; align-items: center; }
    .sobre-stats { grid-template-columns: 1fr; }
  }
`;

const projects = [
  {
    icon: "⚡",
    title: "PROJETOFASTAPI",
    desc: "API REST robusta construída com FastAPI, com endpoints documentados automaticamente e integração com banco de dados PostgreSQL.",
    techs: ["Python", "FastAPI", "PostgreSQL"],
    github: "https://github.com/LeonardoVitoriodaSilva/PROJETOFASTAPI",
  },
  {
    icon: "🍽️",
    title: "Sistema de Culinária",
    desc: "Sistema de gerenciamento culinário com banco de dados relacional, procedures e triggers escritos em PLpgSQL.",
    techs: ["PLpgSQL", "PostgreSQL", "SQL"],
    github: "https://github.com/LeonardoVitoriodaSilva/Sistema-de-culinaria.sql",
  },
  {
    icon: "🔄",
    title: "Event Flow Hub",
    desc: "Hub para gerenciamento e orquestração de fluxo de eventos, facilitando a comunicação entre diferentes serviços.",
    techs: ["JavaScript", "Node.js", "Scripts"],
    github: "https://github.com/LeonardoVitoriodaSilva/event-flow-hub",
  },
];

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeUp({ children, style }) {
  const ref = useFadeUp();
  return <div ref={ref} className="fade-up" style={style}>{children}</div>;
}

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const numero = '5586998037163';
    const texto = `Olá Leonardo! Me chamo *${nome}* (${email}).\n\n*Assunto:* ${assunto}\n\n*Mensagem:* ${mensagem}`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    setNome(''); setEmail(''); setAssunto(''); setMensagem('');
    setTimeout(() => setSubmitted(false), 3000);
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <div className="nav-logo">LV<span>.</span></div>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {["sobre","skills","projetos","contato"].map(s => (
            <li key={s}>
              <a href={`#${s}`} onClick={() => setMenuOpen(false)}>
                {s.charAt(0).toUpperCase()+s.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className="nav-cta" onClick={() => scrollTo("contato")}>Contato</button>
        <div className="nav-hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={menuOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {}} />
          <span style={menuOpen ? {opacity:0} : {}} />
          <span style={menuOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {}} />
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-tag"><div className="hero-dot" />Aberto a oportunidades</div>
            <h1 className="hero-name">Leonardo<br /><span className="accent">Vitório.</span></h1>
            <p className="hero-role">Full Stack Developer</p>
            <p className="hero-desc">Transformo ideias em experiências digitais com React, TypeScript e Node.js. Baseado em Teresina, PI — aberto a trabalho remoto.</p>
            <div className="hero-btns">
              <a href="#projetos" className="btn-primary">Ver projetos</a>
              <a href="#contato" className="btn-secondary">Entrar em contato</a>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/LeonardoVitoriodaSilva" className="social-link" target="_blank" rel="noreferrer">GH</a>
              <a href="https://www.linkedin.com/in/leonardo-vitorio-989a7b341/" className="social-link" target="_blank" rel="noreferrer">IN</a>
              <a href="mailto:Leonardovitorio007@gmail.com" className="social-link">@</a>
            </div>
          </div>
          <div className="hero-photo-wrap">
            <img src={foto3} alt="Leonardo Vitório" className="hero-photo" />

          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className="section section--alt">
        <FadeUp><span className="section-label">Sobre mim</span></FadeUp>
        <FadeUp><h2 className="section-title">Quem sou eu</h2></FadeUp>
        <div className="sobre-grid">
          <FadeUp>
            <div className="sobre-text">
              <p>Olá! Sou Leonardo Vitório da Silva, desenvolvedor full stack em formação pelo Instituto Federal do Piauí (IFPI). Desde que escrevi meu primeiro código, me apaixonei pela capacidade de criar soluções que resolvem problemas reais.</p>
              <p>Trabalho principalmente com React e TypeScript no front-end, Node.js no back-end, e tenho experiência com Python e FastAPI para APIs robustas. Também venho explorando Flutter para mobile.</p>
              <p>Acredito que bom código é aquele que funciona, é legível e resolve o problema certo. Estou sempre buscando aprender e evoluir como desenvolvedor.</p>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="sobre-stats">
              {[["23+","Repositórios públicos"],["84+","Contribuições no último ano"],["5+","Tecnologias dominadas"],["100%","Dedicação aos projetos"]].map(([n,l]) => (
                <div key={l} className="stat-card"><span className="stat-num">{n}</span><span className="stat-label">{l}</span></div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="section">
        <FadeUp><span className="section-label">Habilidades</span></FadeUp>
        <FadeUp><h2 className="section-title">O que eu uso</h2></FadeUp>
        <FadeUp><p className="section-desc">Ferramentas e tecnologias com as quais trabalho no dia a dia.</p></FadeUp>
        <div className="skills-grid">
          <FadeUp>
            <div className="skill-group">
              <div className="skill-group-title">Front-end</div>
              <div className="skill-tags">
                {["React","TypeScript","JavaScript","HTML & CSS","Flutter"].map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="skill-group">
              <div className="skill-group-title">Back-end</div>
              <div className="skill-tags">
                {["Node.js","Python","FastAPI","Java","PostgreSQL","PLpgSQL"].map(t => <span key={t} className="skill-tag skill-tag--purple">{t}</span>)}
              </div>
            </div>
          </FadeUp>
          <FadeUp>
            <div className="skill-group">
              <div className="skill-group-title">Ferramentas</div>
              <div className="skill-tags">
                {["Git","GitHub","VS Code","Figma","Linux"].map(t => <span key={t} className="skill-tag skill-tag--neutral">{t}</span>)}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* PROJETOS */}
      <section id="projetos" className="section section--alt">
        <FadeUp><span className="section-label">Portfólio</span></FadeUp>
        <FadeUp><h2 className="section-title">Projetos em destaque</h2></FadeUp>
        <FadeUp><p className="section-desc">Alguns dos projetos que desenvolvi e que demonstram minhas habilidades.</p></FadeUp>
        <div className="projects-grid">
          {projects.map((p) => (
            <FadeUp key={p.title}>
              <div className="project-card">
                <div className="project-icon">{p.icon}</div>
                <div className="project-title">{p.title}</div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-techs">{p.techs.map(t => <span key={t} className="project-tech">{t}</span>)}</div>
                <div className="project-links">
                  <a href={p.github} className="proj-btn proj-btn--primary" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="section">
        <div className="contact-inner">
          <FadeUp><span className="section-label">Contato</span></FadeUp>
          <FadeUp><h2 className="section-title">Vamos construir algo juntos?</h2></FadeUp>
          <FadeUp><p className="section-desc" style={{margin:"0 auto"}}>Estou disponível para oportunidades freelance, CLT ou estágio.</p></FadeUp>
          <FadeUp>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <input type="text" placeholder="Seu nome" value={nome} onChange={e => setNome(e.target.value)} required />
                <input type="email" placeholder="Seu email" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <input type="text" placeholder="Assunto" value={assunto} onChange={e => setAssunto(e.target.value)} />
              <textarea placeholder="Sua mensagem..." value={mensagem} onChange={e => setMensagem(e.target.value)} />
              <button type="submit" className="btn-primary" style={{ width:"100%", textAlign:"center", background: submitted ? "#1d9e75" : undefined }}>
                {submitted ? "✓ Abrindo WhatsApp..." : "Enviar mensagem via WhatsApp"}
              </button>
            </form>
          </FadeUp>
          <FadeUp>
            <div className="contact-links">
              <a href="https://github.com/LeonardoVitoriodaSilva" className="contact-chip" target="_blank" rel="noreferrer">⬡ GitHub</a>
              <a href="https://www.linkedin.com/in/leonardo-vitorio-989a7b341/" className="contact-chip" target="_blank" rel="noreferrer">in LinkedIn</a>
              <a href="mailto:Leonardovitorio007@gmail.com" className="contact-chip">@ Email</a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span className="footer-copy">© {new Date().getFullYear()} Leonardo Vitório da Silva</span>
        <div className="footer-logo">LV<span>.</span></div>
      </footer>
    </>
  );
}
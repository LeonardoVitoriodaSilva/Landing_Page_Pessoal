"use client";

import { useEffect, useRef, useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
  :root {
    --bg: #0a0a0f; --bg2: #111118; --bg3: #1a1a24;
    --accent: #00e5ff; --accent2: #7c6cfa;
    --text: #f0f0f8; --muted: #8888aa; --border: rgba(255,255,255,0.07);
  }
  html { scroll-behavior: smooth; }
  html, body { width: 100%; min-height: 100vh; }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  #root { width: 100%; }
  a { text-decoration: none; }

  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: center; gap: 4rem;
    padding: 1.1rem 6vw;
    background: rgba(10,10,15,0.88); backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:1.1rem; color:var(--text); letter-spacing:.05em; }
  .nav-logo span { color:var(--accent); }
  .nav-links { display:flex; gap:2rem; list-style:none; }
  .nav-links a { color:var(--muted); font-size:.88rem; transition:color .2s; }
  .nav-links a:hover { color:var(--text); }
  .nav-hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:4px; background:none; border:none; }
  .nav-hamburger span { display:block; width:22px; height:2px; background:var(--text); border-radius:2px; transition:all .3s; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }

  .hero { min-height:100vh; display:flex; align-items:center; padding:7rem 6vw 4rem; position:relative; overflow:hidden; }
  .hero-bg-grid { position:absolute; inset:0; background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:60px 60px; opacity:.35; }
  .hero-glow1 { position:absolute; top:-15%; left:-5%; width:700px; height:700px; background:radial-gradient(circle,rgba(0,229,255,.06) 0%,transparent 70%); pointer-events:none; }
  .hero-glow2 { position:absolute; bottom:-20%; right:-5%; width:600px; height:600px; background:radial-gradient(circle,rgba(124,108,250,.07) 0%,transparent 70%); pointer-events:none; }
  .hero-inner { position:relative; z-index:1; display:grid; grid-template-columns:1fr 1fr; gap:4rem; align-items:center; width:100%; }
  .hero-content { max-width:540px; }
  .hero-photo-wrap { position:relative; }
  .hero-photo-wrap::before { content:''; position:absolute; inset:-2px; border-radius:22px; background:linear-gradient(135deg,rgba(0,229,255,.25),rgba(124,108,250,.15),transparent); z-index:0; pointer-events:none; }
  .hero-photo { width:100%; height:85vh; object-fit:cover; object-position:top center; border-radius:20px; display:block; position:relative; z-index:1; }
  .hero-tag { display:inline-flex; align-items:center; gap:8px; background:rgba(0,229,255,.08); border:1px solid rgba(0,229,255,.2); color:var(--accent); font-size:.75rem; padding:.35rem .9rem; border-radius:100px; margin-bottom:1.8rem; font-weight:500; }
  .hero-tag-dot { width:6px; height:6px; background:var(--accent); border-radius:50%; animation:pulse 2s infinite; }
  .hero-name { font-family:'Syne',sans-serif; font-size:clamp(2.8rem,4.5vw,4.2rem); font-weight:800; line-height:1.05; margin-bottom:.4rem; letter-spacing:-.02em; }
  .hero-name .accent { color:var(--accent); }
  .hero-role { font-size:.85rem; color:var(--muted); text-transform:uppercase; letter-spacing:.1em; margin-bottom:1.4rem; }
  .hero-desc { font-size:.97rem; color:var(--muted); line-height:1.85; margin-bottom:2rem; }
  .hero-btns { display:flex; gap:1rem; flex-wrap:wrap; }
  .btn-primary { background:var(--accent); color:#000; padding:.75rem 1.8rem; border-radius:8px; font-weight:600; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.9rem; transition:all .2s; display:inline-block; }
  .btn-primary:hover { background:#33eaff; transform:translateY(-2px); }
  .btn-secondary { background:transparent; color:var(--text); padding:.75rem 1.8rem; border-radius:8px; border:1px solid var(--border); cursor:pointer; font-family:'DM Sans',sans-serif; font-size:.9rem; transition:all .2s; display:inline-block; }
  .btn-secondary:hover { border-color:rgba(255,255,255,.3); transform:translateY(-2px); }
  .hero-socials { display:flex; gap:.8rem; margin-top:2.5rem; }
  .social-link { width:38px; height:38px; border:1px solid var(--border); border-radius:8px; display:flex; align-items:center; justify-content:center; color:var(--muted); font-size:.8rem; font-weight:500; transition:all .2s; }
  .social-link:hover { border-color:var(--accent); color:var(--accent); }

  .metrics { background:var(--bg2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); padding:2.5rem 6vw; display:flex; justify-content:center; }
  .metric-item { flex:1; max-width:220px; text-align:center; padding:0 2rem; border-right:1px solid var(--border); }
  .metric-item:last-child { border-right:none; }
  .metric-num { font-family:'Syne',sans-serif; font-size:2.2rem; font-weight:800; color:var(--accent); display:block; }
  .metric-label { font-size:.8rem; color:var(--muted); margin-top:4px; display:block; }

  .section { padding:6rem 6vw; width:100%; }
  .section--alt { background:var(--bg2); }
  .section-label { display:inline-block; font-size:.72rem; font-weight:500; color:var(--accent); letter-spacing:.15em; text-transform:uppercase; margin-bottom:.8rem; }
  .section-title { font-family:'Syne',sans-serif; font-size:clamp(1.8rem,3.5vw,2.5rem); font-weight:700; margin-bottom:1rem; line-height:1.2; }
  .section-desc { color:var(--muted); max-width:540px; line-height:1.85; font-size:.95rem; }

  .services-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1.5rem; margin-top:3rem; }
  .service-card { background:var(--bg3); border:1px solid var(--border); border-radius:16px; padding:2rem; transition:all .3s; position:relative; overflow:hidden; }
  .service-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--accent),var(--accent2)); opacity:0; transition:opacity .3s; }
  .service-card:hover { border-color:rgba(0,229,255,.2); transform:translateY(-4px); }
  .service-card:hover::before { opacity:1; }
  .service-icon { font-size:1.8rem; margin-bottom:1rem; display:block; }
  .service-title { font-family:'Syne',sans-serif; font-size:1.05rem; font-weight:700; margin-bottom:.6rem; color:var(--text); }
  .service-desc { color:var(--muted); font-size:.87rem; line-height:1.75; }

  .process-steps { display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem; margin-top:3rem; position:relative; }
  .process-steps::before { content:''; position:absolute; top:28px; left:10%; right:10%; height:1px; background:linear-gradient(90deg,transparent,var(--accent),var(--accent2),transparent); opacity:.3; }
  .process-step { text-align:center; padding:2rem 1rem; background:var(--bg3); border:1px solid var(--border); border-radius:16px; }
  .step-num { width:48px; height:48px; border-radius:50%; background:rgba(0,229,255,.08); border:1px solid rgba(0,229,255,.2); color:var(--accent); font-family:'Syne',sans-serif; font-weight:800; font-size:1rem; display:flex; align-items:center; justify-content:center; margin:0 auto 1rem; }
  .step-period { font-size:.7rem; color:var(--accent); font-weight:500; margin-bottom:.5rem; display:block; text-transform:uppercase; letter-spacing:.1em; }
  .step-title { font-family:'Syne',sans-serif; font-size:.95rem; font-weight:700; margin-bottom:.5rem; }
  .step-desc { font-size:.82rem; color:var(--muted); line-height:1.7; }

  .sobre-grid { display:grid; grid-template-columns:auto 1fr; gap:5rem; align-items:center; margin-top:3rem; }
  .sobre-photo-wrap { position:relative; flex-shrink:0; }
  .sobre-photo-wrap::before { content:''; position:absolute; inset:-2px; border-radius:22px; background:linear-gradient(135deg,rgba(0,229,255,.25),rgba(124,108,250,.15),transparent); z-index:0; pointer-events:none; }
  .sobre-photo { width:340px; height:520px; object-fit:cover; object-position:top center; border-radius:20px; display:block; position:relative; z-index:1; }
  .sobre-content p { color:var(--muted); line-height:1.9; margin-bottom:1rem; font-size:.95rem; }
  .sobre-pillars { display:flex; flex-direction:column; gap:1.5rem; margin-top:2rem; }
  .sobre-pillar { display:flex; flex-direction:column; gap:.3rem; }
  .pillar-title { font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; color:var(--text); }
  .pillar-desc { font-size:.87rem; color:var(--muted); line-height:1.7; }

  .skills-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-top:3rem; }
  .skill-group { background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:1.5rem; }
  .skill-group-title { font-family:'Syne',sans-serif; font-size:.8rem; font-weight:600; color:var(--muted); text-transform:uppercase; letter-spacing:.1em; margin-bottom:1rem; }
  .skill-tags { display:flex; flex-wrap:wrap; gap:8px; }
  .skill-tag { background:rgba(0,229,255,.06); border:1px solid rgba(0,229,255,.15); color:var(--text); font-size:.8rem; padding:4px 11px; border-radius:6px; }
  .skill-tag--purple { background:rgba(124,108,250,.08); border-color:rgba(124,108,250,.2); }
  .skill-tag--neutral { background:var(--bg3); border-color:var(--border); }

  .paraquem-grid { display:grid; grid-template-columns:1fr 1fr; gap:3rem; align-items:center; margin-top:3rem; }
  .paraquem-list { display:flex; flex-direction:column; gap:1rem; margin-top:1.5rem; }
  .paraquem-item { display:flex; align-items:center; gap:12px; color:var(--muted); font-size:.95rem; }
  .paraquem-check { width:22px; height:22px; border-radius:50%; border:1px solid rgba(0,229,255,.3); background:rgba(0,229,255,.08); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--accent); font-size:.7rem; }
  .paraquem-results { background:var(--bg3); border:1px solid var(--border); border-radius:16px; padding:2rem; display:flex; flex-direction:column; gap:1.5rem; }
  .paraquem-results-title { font-size:.72rem; font-weight:500; color:var(--muted); letter-spacing:.15em; text-transform:uppercase; margin-bottom:.5rem; }
  .result-item { display:flex; align-items:center; gap:1rem; }
  .result-icon { width:44px; height:44px; border-radius:10px; background:rgba(0,229,255,.08); border:1px solid rgba(0,229,255,.15); display:flex; align-items:center; justify-content:center; font-size:1.1rem; flex-shrink:0; }
  .result-num { font-family:'Syne',sans-serif; font-size:1.8rem; font-weight:800; color:var(--accent); line-height:1; display:block; }
  .result-label { font-size:.82rem; color:var(--muted); margin-top:2px; display:block; }

  .planos-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem; margin-top:3rem; }
  .plano-card { background:var(--bg3); border:1px solid var(--border); border-radius:16px; padding:2rem; display:flex; flex-direction:column; gap:1rem; transition:all .3s; position:relative; }
  .plano-card:hover { border-color:rgba(0,229,255,.2); transform:translateY(-4px); }
  .plano-card--popular { border-color:rgba(0,229,255,.3); background:linear-gradient(135deg,rgba(0,229,255,.05),var(--bg3)); }
  .plano-badge { position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:var(--accent); color:#000; font-size:.72rem; font-weight:700; padding:4px 14px; border-radius:100px; white-space:nowrap; }
  .plano-title { font-family:'Syne',sans-serif; font-size:1.2rem; font-weight:700; color:var(--text); }
  .plano-subtitle { font-size:.82rem; color:var(--muted); margin-top:-.5rem; }
  .plano-desc { font-size:.87rem; color:var(--muted); line-height:1.7; }
  .plano-features { display:flex; flex-direction:column; gap:.7rem; flex:1; }
  .plano-feature { display:flex; align-items:center; gap:10px; font-size:.85rem; color:var(--muted); }
  .plano-feature-check { color:var(--accent); flex-shrink:0; }
  .plano-result { background:var(--bg2); border:1px solid var(--border); border-radius:10px; padding:1rem; }
  .plano-result-label { font-size:.7rem; color:var(--muted); text-transform:uppercase; letter-spacing:.1em; margin-bottom:.3rem; }
  .plano-result-text { font-size:.88rem; color:var(--text); font-weight:500; }
  .plano-btn { background:transparent; border:1px solid var(--border); color:var(--muted); padding:.8rem; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:.88rem; cursor:pointer; transition:all .2s; display:flex; align-items:center; justify-content:center; gap:8px; }
  .plano-btn:hover { border-color:var(--accent); color:var(--accent); }
  .plano-btn--primary { background:var(--accent); border-color:var(--accent); color:#000; font-weight:600; }
  .plano-btn--primary:hover { background:#33eaff; }
  .planos-cta { background:var(--bg3); border:1px solid var(--border); border-radius:16px; padding:2.5rem; text-align:center; margin-top:1.5rem; }
  .planos-cta-title { font-family:'Syne',sans-serif; font-size:1.3rem; font-weight:700; margin-bottom:.5rem; }
  .planos-cta-desc { color:var(--muted); font-size:.9rem; margin-bottom:1.5rem; }

  .projects-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:1.5rem; margin-top:3rem; }
  .project-card { background:var(--bg3); border:1px solid var(--border); border-radius:16px; padding:1.8rem; transition:all .3s; position:relative; overflow:hidden; }
  .project-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,var(--accent),var(--accent2)); opacity:0; transition:opacity .3s; }
  .project-card:hover { border-color:rgba(0,229,255,.2); transform:translateY(-4px); }
  .project-card:hover::before { opacity:1; }
  .project-icon { width:42px; height:42px; background:rgba(0,229,255,.08); border:1px solid rgba(0,229,255,.15); border-radius:10px; display:flex; align-items:center; justify-content:center; margin-bottom:1.2rem; font-size:1.1rem; }
  .project-title { font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; margin-bottom:.5rem; color:var(--text); }
  .project-desc { color:var(--muted); font-size:.85rem; line-height:1.7; margin-bottom:1.2rem; }
  .project-techs { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:1.2rem; }
  .project-tech { background:var(--bg2); border:1px solid var(--border); color:var(--muted); font-size:.72rem; padding:3px 9px; border-radius:4px; }
  .proj-btn { font-size:.78rem; padding:6px 14px; border-radius:6px; border:1px solid rgba(0,229,255,.2); background:rgba(0,229,255,.08); color:var(--accent); cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; display:inline-block; }
  .proj-btn:hover { background:var(--accent); color:#000; }

  .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; margin-top:3rem; }
  .contact-form { display:flex; flex-direction:column; gap:1rem; }
  .form-row { display:grid; grid-template-columns:1fr 1fr; gap:1rem; }
  input, textarea { background:var(--bg3); border:1px solid var(--border); color:var(--text); padding:.85rem 1rem; border-radius:8px; font-family:'DM Sans',sans-serif; font-size:.9rem; width:100%; transition:border-color .2s; outline:none; }
  input::placeholder, textarea::placeholder { color:var(--muted); }
  input:focus, textarea:focus { border-color:rgba(0,229,255,.4); }
  textarea { resize:none; height:130px; }
  .contact-info { display:flex; flex-direction:column; gap:1rem; }
  .contact-section-title { font-size:.72rem; font-weight:600; color:var(--muted); letter-spacing:.15em; text-transform:uppercase; margin-bottom:.3rem; }
  .contact-card { background:var(--bg3); border:1px solid var(--border); border-radius:12px; padding:1.2rem 1.5rem; display:flex; align-items:center; gap:16px; }
  .contact-card-icon { width:42px; height:42px; border-radius:10px; background:rgba(0,229,255,.08); border:1px solid rgba(0,229,255,.12); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0; }
  .contact-card-label { font-size:.75rem; color:var(--muted); display:block; margin-bottom:2px; }
  .contact-card-value { font-size:.92rem; color:var(--text); font-weight:500; display:block; }
  .contact-social-btns { display:flex; gap:.8rem; flex-wrap:wrap; }
  .contact-social-btn { display:flex; align-items:center; gap:8px; background:var(--bg3); border:1px solid var(--border); color:var(--muted); padding:.7rem 1.2rem; border-radius:10px; font-size:.85rem; transition:all .2s; }
  .contact-social-btn:hover { border-color:var(--accent); color:var(--accent); }
  .contact-avail-card { background:var(--bg3); border:1px solid var(--border); border-radius:12px; padding:1.4rem 1.5rem; display:flex; align-items:flex-start; gap:14px; }
  .contact-avail-dot { width:10px; height:10px; background:var(--accent); border-radius:50%; flex-shrink:0; margin-top:5px; animation:pulse 2s infinite; }
  .contact-avail-title { font-family:'Syne',sans-serif; font-size:1rem; font-weight:700; color:var(--text); margin-bottom:.3rem; }
  .contact-avail-desc { font-size:.84rem; color:var(--muted); line-height:1.6; }

  footer { background:var(--bg2); border-top:1px solid var(--border); padding:2rem 6vw; display:flex; align-items:center; justify-content:space-between; width:100%; }
  .footer-copy { color:var(--muted); font-size:.82rem; }
  .footer-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:.95rem; }
  .footer-logo span { color:var(--accent); }

  .fade-up { opacity:0; transform:translateY(24px); transition:opacity .7s ease,transform .7s ease; }
  .fade-up.visible { opacity:1; transform:translateY(0); }

  @media (max-width:1024px) {
    .hero-inner { grid-template-columns:1fr; gap:2rem; }
    .hero-photo-wrap { order:-1; }
    .hero-photo { height:50vw; }
    .process-steps { grid-template-columns:repeat(2,1fr); }
    .process-steps::before { display:none; }
    .sobre-grid { grid-template-columns:1fr; }
    .sobre-photo-wrap { display:flex; justify-content:center; }
    .contact-grid { grid-template-columns:1fr; gap:3rem; }
    .services-grid { grid-template-columns:1fr; }
    .paraquem-grid { grid-template-columns:1fr; }
    .planos-grid { grid-template-columns:1fr; }
  }
  @media (max-width:768px) {
    nav { padding:1rem 1.5rem; }
    .nav-links { display:none; }
    .nav-links.open { display:flex; flex-direction:column; gap:0; position:fixed; top:60px; left:0; right:0; background:rgba(10,10,15,.97); backdrop-filter:blur(16px); border-bottom:1px solid var(--border); padding:1rem 0; }
    .nav-links.open li a { display:block; padding:.9rem 1.5rem; font-size:1rem; border-bottom:1px solid var(--border); }
    .nav-hamburger { display:flex; }
    .nav-badge { display:none; }
    .hero { padding:5rem 1.5rem 3rem; min-height:auto; }
    .hero-inner { grid-template-columns:1fr; gap:2rem; }
    .hero-photo-wrap { order:-1; width:100%; }
    .hero-photo { width:100%; height:70vw; max-height:420px; border-radius:0; }
    .hero-photo-wrap::before { border-radius:0; }
    .hero-content { text-align:center; max-width:100%; }
    .hero-btns { justify-content:center; }
    .hero-socials { justify-content:center; }
    .section { padding:4rem 1.5rem; }
    .metrics { flex-wrap:wrap; gap:1rem; padding:2rem 1.5rem; }
    .metric-item { border-right:none; border-bottom:1px solid var(--border); padding-bottom:1rem; min-width:140px; }
    .metric-item:last-child { border-bottom:none; }
    .skills-grid { grid-template-columns:1fr; }
    .projects-grid { grid-template-columns:1fr; }
    .form-row { grid-template-columns:1fr; }
    footer { padding:1.5rem; flex-direction:column; gap:.5rem; text-align:center; }
  }
  @media (max-width:480px) {
    .hero-name { font-size:2.2rem; }
    .btn-primary,.btn-secondary { width:100%; text-align:center; }
    .hero-btns { flex-direction:column; align-items:center; }
    .process-steps { grid-template-columns:1fr; }
  }
`;

const projects = [
  { icon:"⚡", title:"PROJETOFASTAPI", desc:"API REST robusta com FastAPI, endpoints documentados automaticamente e integração com PostgreSQL.", techs:["Python","FastAPI","PostgreSQL"], github:"https://github.com/LeonardoVitoriodaSilva/PROJETOFASTAPI" },
  { icon:"🍽️", title:"Sistema de Culinária", desc:"Sistema de gerenciamento culinário com banco de dados relacional, procedures e triggers em PLpgSQL.", techs:["PLpgSQL","PostgreSQL","SQL"], github:"https://github.com/LeonardoVitoriodaSilva/Sistema-de-culinaria.sql" },
  { icon:"🔄", title:"Event Flow Hub", desc:"Hub para gerenciamento e orquestração de fluxo de eventos entre diferentes serviços.", techs:["JavaScript","Node.js","Scripts"], github:"https://github.com/LeonardoVitoriodaSilva/event-flow-hub" },
];

const services = [
  { icon:"⚛️", title:"Desenvolvimento Front-end", desc:"Interfaces rápidas, responsivas e bem estruturadas com React e TypeScript. Código componentizado, acessível e pronto para escalar." },
  { icon:"🖥️", title:"Desenvolvimento Back-end", desc:"APIs REST sólidas com Node.js e FastAPI. Arquitetura limpa, autenticação, documentação e performance — tudo que um back-end profissional precisa." },
  { icon:"🗄️", title:"Banco de Dados", desc:"Modelagem relacional eficiente, queries otimizadas e stored procedures com PostgreSQL. Banco de dados que sustenta o crescimento da aplicação." },
  { icon:"📱", title:"Desenvolvimento Mobile", desc:"Apps multiplataforma com Flutter que entregam experiência nativa em iOS e Android, com uma única base de código." },
];

const steps = [
  { num:"01", period:"Dia 1", title:"Entendimento", desc:"Escuto o que você precisa, mapeio o escopo e defino a stack ideal. Sem achismo — decisões baseadas no problema real." },
  { num:"02", period:"Dias 1–3", title:"Proposta", desc:"Apresento a solução técnica, prazo e custo. Você aprova tudo antes de começarmos — nada é feito sem seu aval." },
  { num:"03", period:"Semanas 1–4", title:"Desenvolvimento", desc:"Desenvolvimento com boas práticas, testes e entregas incrementais. Você acompanha o progresso em tempo real." },
  { num:"04", period:"Contínuo", title:"Entrega & Suporte", desc:"Entrego o projeto em produção, documento tudo e fico disponível para ajustes — porque lançar é só o começo." },
];

const planos = [
  { title:'Landing Page', subtitle:'Site & Presença Digital', popular:false, desc:'Ideal para quem precisa de uma presença profissional na web, rápida e bem construída.', features:['Design responsivo e moderno','Otimizado para SEO','Formulário de contato','Deploy incluído','Entrega em até 7 dias'], result:'Site no ar, pronto para gerar contatos' },
  { title:'Aplicação Web', subtitle:'Sistema Completo', popular:true, desc:'Para quem precisa de uma aplicação funcional com front-end, back-end e banco de dados.', features:['Front-end com React + TypeScript','API REST com Node.js ou FastAPI','Banco de dados PostgreSQL','Autenticação e segurança','Documentação completa'], result:'Sistema em produção, escalável e documentado' },
  { title:'Consultoria', subtitle:'Revisão & Arquitetura', popular:false, desc:'Para times que precisam de uma segunda opinião técnica ou ajuda para escalar o projeto.', features:['Revisão de código e arquitetura','Identificação de gargalos','Sugestões de melhoria','Pair programming','Relatório técnico detalhado'], result:'Código mais limpo e time mais produtivo' },
];

function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting){el.classList.add("visible");obs.disconnect();} },{threshold:.1});
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const texto = `Olá Leonardo! Me chamo *${nome}* (${email}).\n\n*Assunto:* ${assunto}\n\n*Mensagem:* ${mensagem}`;
    window.open(`https://wa.me/5586998037163?text=${encodeURIComponent(texto)}`,'_blank');
    setSubmitted(true);
    setNome('');setEmail('');setAssunto('');setMensagem('');
    setTimeout(()=>setSubmitted(false),3000);
  }

  function go(id){ document.getElementById(id)?.scrollIntoView({behavior:'smooth'}); setMenuOpen(false); }

  return (<>
    <style>{styles}</style>

    <nav>
      <div className="nav-logo">LV<span>.</span></div>
      <ul className={`nav-links${menuOpen?' open':''}`}>
        {[['servicos','Serviços'],['processo','Como funciona'],['sobre','Sobre'],['planos','Planos'],['projetos','Projetos'],['contato','Contato']].map(([id,label])=>(
          <li key={id}><a href={`#${id}`} onClick={()=>setMenuOpen(false)}>{label}</a></li>
        ))}
      </ul>
      <div className="nav-hamburger" onClick={()=>setMenuOpen(o=>!o)}>
        <span style={menuOpen?{transform:'rotate(45deg) translate(5px,5px)'}:{}}/>
        <span style={menuOpen?{opacity:0}:{}}/>
        <span style={menuOpen?{transform:'rotate(-45deg) translate(5px,-5px)'}:{}}/>
      </div>
    </nav>

    <section className="hero">
      <div className="hero-bg-grid"/>
      <div className="hero-glow1"/><div className="hero-glow2"/>
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-tag"><div className="hero-tag-dot"/>Aberto a oportunidades</div>
          <h1 className="hero-name">Leonardo<br/><span className="accent">Vitório.</span></h1>
          <p className="hero-role">Desenvolvedor Full Stack · React · Node.js · TypeScript</p>
          <p className="hero-desc">Desenvolvo produtos digitais completos — do back-end à interface — com React, TypeScript e Node.js. Entrego código de qualidade, no prazo, com comunicação clara.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={()=>go('contato')}>Falar comigo</button>
            <button className="btn-secondary" onClick={()=>go('projetos')}>Ver projetos</button>
          </div>
          <div className="hero-socials">
            <a href="https://github.com/LeonardoVitoriodaSilva" className="social-link" target="_blank" rel="noreferrer">GH</a>
            <a href="https://www.linkedin.com/in/leonardo-vitorio-989a7b341/" className="social-link" target="_blank" rel="noreferrer">IN</a>
            <a href="mailto:Leonardovitorio007@gmail.com" className="social-link">@</a>
          </div>
        </div>
        <div className="hero-photo-wrap">
          <img src="/foto3.jpeg" alt="Leonardo Vitório" className="hero-photo"/>
        </div>
      </div>
    </section>

    <div className="metrics">
      {[['5+','Tecnologias','dominadas'],['23+','Repositórios','públicos'],['84+','Contribuições','no último ano'],['100%','Dedicação','em cada projeto']].map(([n,l1,l2])=>(
        <div key={l1} className="metric-item">
          <span className="metric-num">{n}</span>
          <span className="metric-label">{l1}<br/>{l2}</span>
        </div>
      ))}
    </div>

    <section id="servicos" className="section">
      <FadeUp><span className="section-label">O que faço</span></FadeUp>
      <FadeUp><h2 className="section-title">Soluções que entrego</h2></FadeUp>
      <FadeUp><p className="section-desc">Desenvolvimento de ponta a ponta — do design ao deploy — com foco em qualidade e resultado.</p></FadeUp>
      <div className="services-grid">
        {services.map(s=>(<FadeUp key={s.title}><div className="service-card"><span className="service-icon">{s.icon}</span><div className="service-title">{s.title}</div><p className="service-desc">{s.desc}</p></div></FadeUp>))}
      </div>
    </section>

    <section id="processo" className="section section--alt">
      <FadeUp><span className="section-label">Como funciona</span></FadeUp>
      <FadeUp><h2 className="section-title">Do briefing ao deploy</h2></FadeUp>
      <FadeUp><p className="section-desc">Um processo claro e transparente, sem surpresas.</p></FadeUp>
      <div className="process-steps">
        {steps.map(s=>(<FadeUp key={s.num}><div className="process-step"><div className="step-num">{s.num}</div><span className="step-period">{s.period}</span><div className="step-title">{s.title}</div><p className="step-desc">{s.desc}</p></div></FadeUp>))}
      </div>
    </section>

    <section id="sobre" className="section">
      <FadeUp><span className="section-label">Sobre mim</span></FadeUp>
      <FadeUp><h2 className="section-title">Quem sou eu</h2></FadeUp>
      <div className="sobre-grid">
        <FadeUp><div className="sobre-photo-wrap"><img src="/foto2.jpeg" alt="Leonardo Vitório" className="sobre-photo"/></div></FadeUp>
        <FadeUp>
          <div className="sobre-content">
            <p>Sou Leonardo Vitório da Silva, desenvolvedor full stack com foco em React, TypeScript e Node.js. Estudo Análise e Desenvolvimento de Sistemas no IFPI e atuo com desenvolvimento web desde 2023, construindo projetos reais que unem boa arquitetura e experiência de usuário.</p>
            <p>Tenho experiência prática em criar aplicações completas: APIs REST com Node.js e FastAPI, interfaces modernas com React e TypeScript, e banco de dados com PostgreSQL. Também desenvolvo apps mobile com Flutter.</p>
            <div className="sobre-pillars">
              {[['Foco no que importa','Antes de escrever qualquer código, entendo o problema, o usuário e o resultado esperado.'],['Transparência total','Mantenho o cliente atualizado em cada etapa. Sem surpresas, sem achismos.'],['Resultado desde o primeiro dia','Trabalho em entregas incrementais para que cada fase já gere valor real.']].map(([title,desc])=>(<div key={title} className="sobre-pillar"><div className="pillar-title">{title}</div><div className="pillar-desc">{desc}</div></div>))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>

    <section className="section section--alt">
      <FadeUp><span className="section-label">Para quem</span></FadeUp>
      <FadeUp><h2 className="section-title">Quem se beneficia do meu trabalho</h2></FadeUp>
      <div className="paraquem-grid">
        <FadeUp>
          <div>
            <p className="section-desc">Atendo desde profissionais autônomos e startups até empresas que precisam de soluções web robustas.</p>
            <div className="paraquem-list">
              {['Empresas que precisam de um sistema web do zero','Times que precisam de uma API confiável e escalável','Negócios que querem modernizar sua presença digital','Projetos que exigem código limpo e bem documentado'].map(item=>(<div key={item} className="paraquem-item"><div className="paraquem-check">✓</div><span>{item}</span></div>))}
            </div>
          </div>
        </FadeUp>
        <FadeUp>
          <div className="paraquem-results">
            <div className="paraquem-results-title">Resultado típico dos meus projetos</div>
            {[['⚡','100%','das entregas com documentação'],['🎯','Zero','retrabalho por falta de alinhamento'],['🚀','Dias','não semanas — para ver o primeiro resultado']].map(([icon,num,label])=>(<div key={label} className="result-item"><div className="result-icon">{icon}</div><div><span className="result-num">{num}</span><span className="result-label">{label}</span></div></div>))}
          </div>
        </FadeUp>
      </div>
    </section>

    <section id="planos" className="section">
      <FadeUp><span className="section-label">Planos</span></FadeUp>
      <FadeUp><h2 className="section-title" style={{textAlign:'center'}}>Como podemos trabalhar juntos</h2></FadeUp>
      <FadeUp><p className="section-desc" style={{margin:'0 auto',textAlign:'center'}}>Escolha o formato que faz mais sentido para o seu projeto.</p></FadeUp>
      <div className="planos-grid">
        {planos.map(p=>(<FadeUp key={p.title}><div className={`plano-card${p.popular?' plano-card--popular':''}`}>{p.popular&&<div className="plano-badge">Mais Solicitado</div>}<div><div className="plano-title">{p.title}</div><div className="plano-subtitle">{p.subtitle}</div></div><p className="plano-desc">{p.desc}</p><div className="plano-features">{p.features.map(f=>(<div key={f} className="plano-feature"><span className="plano-feature-check">✓</span><span>{f}</span></div>))}</div><div className="plano-result"><div className="plano-result-label">Resultado esperado:</div><div className="plano-result-text">{p.result}</div></div><button className={`plano-btn${p.popular?' plano-btn--primary':''}`} onClick={()=>go('contato')}>Solicitar este plano →</button></div></FadeUp>))}
      </div>
      <FadeUp><div className="planos-cta"><div className="planos-cta-title">Precisa de algo personalizado?</div><p className="planos-cta-desc">Me conte sobre o seu projeto e encontramos juntos a melhor solução.</p><button className="btn-primary" onClick={()=>go('contato')}>Fale comigo →</button></div></FadeUp>
    </section>

    <section id="skills" className="section section--alt">
      <FadeUp><span className="section-label">Habilidades</span></FadeUp>
      <FadeUp><h2 className="section-title">O que eu uso</h2></FadeUp>
      <div className="skills-grid">
        <FadeUp><div className="skill-group"><div className="skill-group-title">Front-end</div><div className="skill-tags">{["React","TypeScript","JavaScript","HTML & CSS","Flutter"].map(t=><span key={t} className="skill-tag">{t}</span>)}</div></div></FadeUp>
        <FadeUp><div className="skill-group"><div className="skill-group-title">Back-end</div><div className="skill-tags">{["Node.js","Python","FastAPI","Java","PostgreSQL","PLpgSQL"].map(t=><span key={t} className="skill-tag skill-tag--purple">{t}</span>)}</div></div></FadeUp>
        <FadeUp><div className="skill-group"><div className="skill-group-title">Ferramentas</div><div className="skill-tags">{["Git","GitHub","VS Code","Figma","Linux"].map(t=><span key={t} className="skill-tag skill-tag--neutral">{t}</span>)}</div></div></FadeUp>
      </div>
    </section>

    <section id="projetos" className="section">
      <FadeUp><span className="section-label">Portfólio</span></FadeUp>
      <FadeUp><h2 className="section-title">Projetos em destaque</h2></FadeUp>
      <div className="projects-grid">
        {projects.map(p=>(<FadeUp key={p.title}><div className="project-card"><div className="project-icon">{p.icon}</div><div className="project-title">{p.title}</div><p className="project-desc">{p.desc}</p><div className="project-techs">{p.techs.map(t=><span key={t} className="project-tech">{t}</span>)}</div><a href={p.github} className="proj-btn" target="_blank" rel="noreferrer">Ver no GitHub</a></div></FadeUp>))}
      </div>
    </section>

    <section id="contato" className="section section--alt">
      <FadeUp><span className="section-label">Contato</span></FadeUp>
      <FadeUp><h2 className="section-title">Vamos construir algo juntos?</h2></FadeUp>
      <div className="contact-grid">
        <FadeUp>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" placeholder="Seu nome" value={nome} onChange={e=>setNome(e.target.value)} required/>
              <input type="email" placeholder="Seu email" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <input type="text" placeholder="Assunto" value={assunto} onChange={e=>setAssunto(e.target.value)}/>
            <textarea placeholder="Sua mensagem..." value={mensagem} onChange={e=>setMensagem(e.target.value)}/>
            <button type="submit" className="btn-primary" style={{textAlign:'center',background:submitted?'#1d9e75':undefined}}>
              {submitted?'✓ Abrindo WhatsApp...':'Enviar via WhatsApp'}
            </button>
          </form>
        </FadeUp>
        <FadeUp>
          <div className="contact-info">
            <div className="contact-section-title">Informações de Contato</div>
            {[['📧','E-mail','Leonardovitorio007@gmail.com'],['📍','Localização','Teresina — PI'],['⏰','Disponibilidade','Seg–Sex, 8h às 20h']].map(([icon,label,val])=>(
              <div key={label} className="contact-card">
                <div className="contact-card-icon">{icon}</div>
                <div><span className="contact-card-label">{label}</span><span className="contact-card-value">{val}</span></div>
              </div>
            ))}
            <div className="contact-section-title" style={{marginTop:'.5rem'}}>Redes Sociais</div>
            <div className="contact-social-btns">
              <a href="https://wa.me/5586998037163" className="contact-social-btn" target="_blank" rel="noreferrer">💬 WhatsApp</a>
              <a href="https://www.linkedin.com/in/leonardo-vitorio-989a7b341/" className="contact-social-btn" target="_blank" rel="noreferrer">💼 LinkedIn</a>
              <a href="https://github.com/LeonardoVitoriodaSilva" className="contact-social-btn" target="_blank" rel="noreferrer">⬡ GitHub</a>
            </div>
            <div className="contact-avail-card">
              <div className="contact-avail-dot"/>
              <div>
                <div className="contact-avail-title">Disponível para novos projetos</div>
                <div className="contact-avail-desc">Aceitando projetos freelance e CLT. Resposta em até 24h úteis.</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>

    <footer>
      <span className="footer-copy">© {new Date().getFullYear()} Leonardo Vitório da Silva. Todos os direitos reservados.</span>
      <div className="footer-logo">LV<span>.</span></div>
    </footer>
  </>);
}
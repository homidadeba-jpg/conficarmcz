import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRightIcon, ArrowDownIcon, ArrowRightIcon, ArrowLeftIcon, WhatsappLogoIcon, InstagramLogoIcon, MapPinIcon, PhoneIcon, ListIcon, XIcon, BatteryChargingIcon, DropIcon, DiscIcon, WrenchIcon, SteeringWheelIcon, LightningIcon, ShieldCheckIcon, CheckIcon, StarIcon, PlusIcon, EngineIcon, ThermometerIcon, TireIcon } from '@phosphor-icons/react';
import '@fontsource/anton/latin-400.css';
import '@fontsource-variable/montserrat';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const MAPS = 'https://www.google.com/maps/search/?api=1&query=Conficar+Centro+Automotivo&query_place_id=ChIJl0JrdQxJAQcRzfCwrK0YBrI';
const GOOGLE = 'https://share.google/WiTZ9rvyteZCBBxar';
const INSTAGRAM = 'https://www.instagram.com/conficarmcz/';
const whatsapp = (message = 'Olá! Vim pelo site da Conficar e gostaria de solicitar um orçamento.') => `https://wa.me/5582981050053?text=${encodeURIComponent(message)}`;

const services = [
  { title: 'Óleo e filtros', text: 'A especificação certa para o seu motor. Troca de óleo e filtros com produtos de marcas reconhecidas.', image: 'lubrificantes', alt: 'Prateleiras de lubrificantes e filtros disponíveis na Conficar', icon: DropIcon, label: 'Consultar troca de óleo' },
  { title: 'Freios e suspensão', text: 'Pastilhas, discos, amortecedores e componentes de suspensão. Cuidado com o que mantém você seguro.', image: 'rodas', alt: 'Profissional da Conficar trabalhando na roda de um veículo', icon: DiscIcon, label: 'Consultar freios e suspensão' },
  { title: 'Alinhamento 3D', text: 'Precisão no alinhamento e no balanceamento para cuidar da estabilidade e dos pneus do seu carro.', image: 'diagnostico', alt: 'Técnico operando o equipamento de alinhamento computadorizado', icon: SteeringWheelIcon, label: 'Consultar alinhamento' },
];
const extras = [
  [BatteryChargingIcon, 'Baterias', 'Teste e substituição'],
  [EngineIcon, 'Injeção eletrônica', 'Diagnóstico do sistema'],
  [ThermometerIcon, 'Arrefecimento', 'Cuidado com a temperatura'],
  [LightningIcon, 'Elétrica automotiva', 'Diagnóstico e reparos'],
  [TireIcon, 'Pneus', 'Avaliação e substituição'],
  [WrenchIcon, 'Mecânica geral', 'Manutenção e revisão'],
];
const gallery = [
  { src: 'oficina-ampla', alt: 'Vista ampla da oficina Conficar com veículos nos elevadores', caption: 'Espaço para cuidar do seu carro.' },
  { src: 'oficina-equipe', alt: 'Equipe em atendimento no interior do centro automotivo', caption: 'Gente que entende do que faz.' },
  { src: 'oficina-elevadores', alt: 'Veículos em manutenção nos elevadores da Conficar', caption: 'O cuidado acontece aqui.' },
];
const reviews = [
  { text: 'Não levo meu carro mais para nenhuma outro lugar com toda certeza!', id: '116125035468979730548' },
  { text: 'Ótimos serviços, produtos de ótima qualidade', id: '117478487417225389265' },
  { text: 'O resultado superou minhas expectativas.', id: '105211351053269353306' },
];

function Brand({ footer = false }) {
  return <a className={`brand ${footer ? 'brand-footer' : ''}`} href="#inicio" aria-label="Conficar, início">
    <img src="/images/simbolo.webp" width="52" height="52" alt="" />
    <span><strong>CONFICAR</strong><small>CENTRO AUTOMOTIVO</small></span>
  </a>;
}

function WhatsAppButton({ children = 'Falar no WhatsApp', className = '', message, ...props }) {
  return <a href={whatsapp(message)} className={`button button-yellow ${className}`} target="_blank" rel="noopener noreferrer" {...props}>
    <WhatsappLogoIcon size={23} weight="bold" /><span>{children}</span><ArrowUpRightIcon size={20} weight="bold" />
  </a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef(null);
  const toggle = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event) => { if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    const onOutside = (event) => { if (!menu.current?.contains(event.target) && !toggle.current?.contains(event.target)) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onOutside); };
  }, [open]);
  return <header className="header">
    <div className="container header-inner">
      <Brand />
      <nav id="navigation" ref={menu} className={`navigation ${open ? 'is-open' : ''}`} aria-label="Navegação principal">
        {[['#servicos', 'Serviços'], ['#oficina', 'A Conficar'], ['#avaliacoes', 'Avaliações'], ['#localizacao', 'Onde estamos']].map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-mobile-contact" href={whatsapp()} target="_blank" rel="noopener noreferrer">Falar com a equipe <ArrowUpRightIcon /></a>
      </nav>
      <a className="header-contact" href={whatsapp()} target="_blank" rel="noopener noreferrer"><WhatsappLogoIcon size={19} weight="bold" /> Fazer orçamento <ArrowUpRightIcon size={17} /></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigation" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>{open ? <XIcon size={26} /> : <ListIcon size={26} />}</button>
    </div>
  </header>;
}

function Hero() {
  const root = useRef(null);
  const canvas = useRef(null);
  useLayoutEffect(() => {
    const element = root.current;
    const surface = canvas.current;
    const context = surface.getContext('2d', { alpha: false });
    let cancelled = false;
    let current = 0;
    let lastDrawn = -1;
    const frames = [];
    let frameCount = 72;
    const state = { frame: 0 };
    const media = gsap.matchMedia();
    const showStatic = () => {
      element.classList.remove('is-sequence');
      element.classList.add('is-static');
      element.querySelector('.hero-poster').src = '/frames/071.webp';
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) {
      showStatic();
      return;
    }
    element.classList.add('is-sequence');

    const draw = () => {
      current = Math.min(frameCount - 1, Math.max(0, Math.round(state.frame)));
      // When a fast scroll outruns decoding, draw the nearest decoded frame.
      let ready = current;
      if (!frames[ready]?.complete || !frames[ready]?.naturalWidth) {
        ready = frames.reduce((closest, frame, index) => frame?.complete && frame?.naturalWidth && Math.abs(index - current) < Math.abs(closest - current) ? index : closest, frames.findIndex(frame => frame?.complete && frame?.naturalWidth));
      }
      if (ready < 0 || ready === lastDrawn) return;
      const frame = frames[ready];
      if (!frame?.naturalWidth) return;
      context.drawImage(frame, 0, 0, surface.width, surface.height);
      surface.classList.add('is-ready');
      lastDrawn = ready;
    };

    const setup = async () => {
      let manifest;
      try {
        const response = await fetch('/frames/manifest.json');
        if (!response.ok) throw new Error('Sequence unavailable');
        manifest = await response.json();
      } catch { showStatic(); return; }
      if (cancelled) return;
      frameCount = manifest.count;
      surface.width = manifest.width;
      surface.height = manifest.height;
      const load = index => new Promise(resolve => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => { if (!cancelled) draw(); resolve(); };
        img.onerror = resolve;
        frames[index] = img;
        img.src = `/frames/${String(index).padStart(3, '0')}.webp`;
      });
      // Decode a coarse pass across the whole video before filling adjacent frames.
      // Fast swipes can then use a nearby frame instead of jumping to the ending.
      await Promise.all([load(0), load(frameCount - 1)]);
      if (cancelled) return;
      const remaining = Array.from({ length: frameCount - 2 }, (_, index) => index + 1);
      const queue = [...remaining.filter(index => index % 4 === 0), ...remaining.filter(index => index % 4 !== 0)];
      let next = 0;
      const worker = async () => { while (next < queue.length && !cancelled) await load(queue[next++]); };
      Promise.all(Array.from({ length: 6 }, worker));

      media.add({ motion: '(prefers-reduced-motion: no-preference)', reduced: '(prefers-reduced-motion: reduce)' }, ({ conditions }) => {
        if (conditions.reduced || navigator.connection?.saveData) {
          state.frame = frameCount - 1;
          draw();
          return;
        }
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: element, start: 'top top', end: () => `+=${Math.round(element.offsetHeight * 0.95)}`, pin: true, scrub: 0.14, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 100 },
        });
        // Keep the same canvas, crop and decoded frame through the text reveal
        // and pin release. Reversing the timeline resumes this exact sequence.
        timeline.fromTo(state, { frame: 0 }, { frame: frameCount - 1, duration: 0.78, ease: 'none', onUpdate: draw }, 0);
        timeline.to('.hero-scroll-cue', { autoAlpha: 0, y: -8, duration: 0.12 }, 0.04);
        timeline.fromTo('.hero-copy', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.15, ease: 'power2.out' }, 0.68);
        timeline.fromTo('.hero-actions', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.76);
        timeline.to({}, { duration: 0.12 }, 0.88);
        return () => { state.frame = frameCount - 1; draw(); };
      }, element);
      if (!cancelled) ScrollTrigger.refresh();
    };
    setup();
    return () => { cancelled = true; media.revert(); element.classList.remove('is-sequence'); frames.forEach(frame => { if (frame) frame.onload = null; }); };
  }, []);

  const skip = () => {
    const pin = ScrollTrigger.getAll().find(trigger => trigger.trigger === root.current);
    if (pin) { window.scrollTo({ top: pin.start + (pin.end - pin.start) * 0.82, behavior: 'instant' }); }
    else document.querySelector('#servicos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return <section className="hero" id="inicio" ref={root} aria-label="Conficar. Sempre ao seu lado.">
    <div className="hero-visual" aria-hidden="true">
      <img className="hero-poster" src="/images/hero-inicio.webp" width="720" height="1280" fetchPriority="high" alt="" />
      <canvas ref={canvas} className="hero-canvas" />
    </div>
    <div className="hero-shade" />
    <div className="container hero-inner">
      <button className="hero-scroll-cue" onClick={skip}><span>Role para conhecer</span><ArrowDownIcon size={22} weight="light" /></button>
      <div className="hero-copy"><p className="eyebrow">ENERGIA E CONFIANÇA</p><h1>SEMPRE<br /><span>AO SEU LADO</span></h1><p className="hero-description">Baterias, troca de óleo, freios, suspensão<br className="desktop-break" /> e muito mais. <strong>Seu carro em boas mãos.</strong></p></div>
      <div className="hero-actions">
        <div className="hero-services">
          {[[BatteryChargingIcon, 'Baterias', 'Qualidade e durabilidade'], [DropIcon, 'Troca de óleo', 'Cuidado com o motor'], [DiscIcon, 'Freios', 'Mais segurança'], [WrenchIcon, 'Suspensão', 'Dirija com tranquilidade']].map(([Icon, title, text]) => <a key={title} href={whatsapp(`Olá! Vim pelo site e gostaria de um orçamento para ${title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer"><Icon size={33} weight="light" /><strong>{title}</strong><small>{text}</small></a>)}
        </div>
        <div className="hero-buttons"><WhatsAppButton /><a href="#localizacao" className="button button-outline"><MapPinIcon size={22} weight="fill" /><span>Nossa loja</span><ArrowUpRightIcon size={19} /></a></div>
      </div>
    </div>
  </section>;
}

function Services() {
  return <section className="section services" id="servicos">
    <div className="container">
      <div className="section-heading" data-reveal><p className="eyebrow">CUIDADO DE VERDADE</p><h2>SEU CARRO PRECISA.<br /><span>A CONFICAR RESOLVE.</span></h2><p>Da manutenção do dia a dia à revisão completa.<br className="desktop-break" /> Encontre o serviço e fale com quem entende.</p></div>
      <div className="service-grid">
        {services.map(service => <article className="service-card" key={service.title} data-reveal><div className="service-photo"><img src={`/images/${service.image}.webp`} alt={service.alt} width="720" height="780" loading="lazy" /></div><div className="service-body"><service.icon size={30} weight="light" /><h3>{service.title}</h3><p>{service.text}</p><a className="text-link" href={whatsapp(`Olá! Gostaria de um orçamento para ${service.title.toLowerCase()}. Meu carro é `)} aria-label={service.label} target="_blank" rel="noopener noreferrer">Pedir orçamento <ArrowUpRightIcon size={20} /></a></div></article>)}
      </div>
      <div className="other-services" data-reveal><h3>E muito mais<br />{' '}para o seu carro.</h3><div className="extra-grid">{extras.map(([Icon, title, text]) => <a className="extra-service" key={title} href={whatsapp(`Olá! Quero saber mais sobre ${title.toLowerCase()}.`)} target="_blank" rel="noopener noreferrer"><Icon size={29} weight="light" /><span><strong>{title}</strong><small>{text}</small></span><ArrowUpRightIcon size={18} /></a>)}</div></div>
    </div>
  </section>;
}

function Workshop() {
  const [active, setActive] = useState(0);
  const lightbox = useRef(null);
  const openImage = (index) => { setActive(index); lightbox.current.showModal(); };
  const next = (direction) => setActive(previous => (previous + direction + gallery.length) % gallery.length);
  return <section className="section workshop" id="oficina"><div className="container">
    <div className="workshop-heading" data-reveal><h2>PODE ENTRAR.<br /><span>A CASA É SUA.</span></h2><div><p>A Conficar é a sua oficina no Tabuleiro do Martins, em Maceió. Um espaço completo para a manutenção do seu carro, com equipe, equipamentos e atenção em cada serviço.</p><a className="text-link" href={MAPS} target="_blank" rel="noopener noreferrer">Venha conhecer <ArrowUpRightIcon size={21} /></a></div></div>
    <div className="gallery">{gallery.map((image, index) => <figure key={image.src} className={`gallery-item gallery-item-${index}`} data-reveal><button onClick={() => openImage(index)} aria-label={`Ampliar foto: ${image.alt}`}><img src={`/images/${image.src}.webp`} alt={image.alt} width="720" height="1280" loading="lazy" /><span className="photo-expand" aria-hidden="true"><PlusIcon size={24} /></span></button><figcaption>{image.caption}</figcaption></figure>)}</div>
    <dialog className="lightbox" ref={lightbox} onClick={event => { if (event.target === lightbox.current) lightbox.current.close(); }} onKeyDown={event => { if (event.key === 'ArrowRight') next(1); if (event.key === 'ArrowLeft') next(-1); }} aria-label="Fotos da oficina"><button className="dialog-close" aria-label="Fechar fotos" onClick={() => lightbox.current.close()}><XIcon size={26} /></button><div className="lightbox-content"><img src={`/images/${gallery[active].src}.webp`} alt={gallery[active].alt} /><div className="lightbox-controls"><button onClick={() => next(-1)} aria-label="Foto anterior"><ArrowLeftIcon size={24} /></button><p>{gallery[active].caption}</p><button onClick={() => next(1)} aria-label="Próxima foto"><ArrowRightIcon size={24} /></button></div></div></dialog>
  </div></section>;
}

function Products() {
  return <section className="section products"><div className="container products-grid">
    <div className="products-image" data-reveal><img src="/images/autopecas.webp" alt="Balcão de autopeças e lubrificantes da Conficar" width="720" height="1280" loading="lazy" /></div>
    <div className="products-copy" data-reveal><p className="eyebrow">PEÇAS E LUBRIFICANTES</p><h2>O PRODUTO CERTO.<br /><span>O CUIDADO TAMBÉM.</span></h2><p>Cada carro tem sua especificação. Aqui você encontra lubrificantes, filtros, baterias e autopeças, com orientação para escolher os produtos de que seu veículo precisa.</p><ul className="checks"><li><CheckIcon size={20} /> Lubrificantes de marcas reconhecidas</li><li><CheckIcon size={20} /> Peças para a manutenção do seu carro</li><li><CheckIcon size={20} /> Produtos e serviço no mesmo lugar</li></ul><WhatsAppButton message="Olá! Gostaria de consultar a disponibilidade de uma peça ou lubrificante para meu carro.">Consultar um produto</WhatsAppButton></div>
  </div></section>;
}

function Warranty() {
  return <section className="warranty"><div className="container warranty-inner" data-reveal><ShieldCheckIcon className="warranty-icon" size={100} weight="light" /><div><h2>CONFIANÇA QUE<br />VEM COM GARANTIA.</h2><p>Serviços com garantia de 90 dias.<br />Mais tranquilidade para seguir o seu caminho.</p></div><div className="warranty-number"><strong>90</strong><span>DIAS DE GARANTIA<br />NOS SERVIÇOS</span></div></div></section>;
}

function Reviews() {
  return <section className="section reviews" id="avaliacoes"><div className="container">
    <div className="review-heading" data-reveal><div><h2>QUEM CONHECE,<br /><span>CONFIA.</span></h2><p>A experiência de quem já passou pela Conficar.</p></div><a className="google-rating" href={GOOGLE} target="_blank" rel="noopener noreferrer" aria-label="Ver no Google: nota 5 de 5, 23 avaliações"><span className="google-word">Google</span><div><strong>5,0</strong><span><span className="stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <StarIcon key={index} size={17} weight="fill" />)}</span><small>23 avaliações</small></span></div></a></div>
    <div className="review-grid">{reviews.map(review => <article className="review-card" data-reveal key={review.id}><div className="stars" aria-label="5 de 5 estrelas">{Array.from({ length: 5 }, (_, index) => <StarIcon key={index} size={17} weight="fill" />)}</div><blockquote>“{review.text}”</blockquote><a href={`https://www.google.com/maps/contrib/${review.id}/reviews?hl=pt-BR`} target="_blank" rel="noopener noreferrer"><span>Avaliação no Google<small>Trecho de relato de cliente</small></span><ArrowUpRightIcon size={20} /></a></article>)}</div>
    <div className="reviews-footer"><small>Nota e trechos consultados em outubro de 2026.</small><a className="text-link" href={GOOGLE} target="_blank" rel="noopener noreferrer">Ver todas as avaliações <ArrowUpRightIcon size={19} /></a></div>
  </div></section>;
}

function Contact() {
  return <section className="section contact" id="localizacao"><div className="container">
    <div className="contact-top" data-reveal><p className="eyebrow">A AMARELINHA DO POVO</p><h2>SEU PRÓXIMO DESTINO?<br /><span>A CONFICAR.</span></h2></div>
    <div className="contact-grid"><div className="contact-details" data-reveal><h3>Estamos no Tabuleiro do Martins.</h3><address>Av. Vereador Dário Marsiglia, 542<br />Conjunto Cleto Marques Luz<br />Tabuleiro do Martins, Maceió - AL<br /><span>CEP 57081-015</span></address><a className="text-link" href={MAPS} target="_blank" rel="noopener noreferrer"><MapPinIcon size={22} /> Traçar rota no Google Maps <ArrowUpRightIcon size={19} /></a><dl className="opening-hours"><div><dt>Segunda a sexta</dt><dd>8h às 18h</dd></div><div><dt>Sábado</dt><dd>8h às 13h</dd></div><div><dt>Domingo</dt><dd>Fechado</dd></div></dl><div className="contact-direct"><a href="tel:+5582981050053"><PhoneIcon size={22} /><span><small>TELEFONE E WHATSAPP</small>(82) 98105-0053</span></a><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><InstagramLogoIcon size={22} /><span><small>ACOMPANHE A OFICINA</small>@conficarmcz</span></a></div><WhatsAppButton>Falar com a equipe</WhatsAppButton></div>
    <div className="map-frame" data-reveal><iframe title="Localização da Conficar Centro Automotivo em Maceió" src="https://maps.google.com/maps?q=Conficar%20Centro%20Automotivo%20Av.%20Ver.%20D%C3%A1rio%20Mars%C3%ADglia%20542%20Macei%C3%B3&t=&z=16&ie=UTF8&iwloc=&output=embed" width="800" height="560" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /><a href={MAPS} target="_blank" rel="noopener noreferrer">Abrir mapa e iniciar rota <ArrowUpRightIcon size={20} /></a></div></div>
    <div className="questions" data-reveal><h3>Antes de trazer<br />{' '}o seu carro.</h3><div>{[
      ['Como peço um orçamento?', 'Envie uma mensagem pelo WhatsApp com o modelo e o ano do carro e o serviço que você procura. A equipe orienta sobre a avaliação e o orçamento.'],
      ['Posso combinar um horário?', 'Fale com a equipe pelo WhatsApp para consultar os horários de atendimento e a disponibilidade para o serviço que você precisa.'],
      ['Os serviços têm garantia?', 'Sim. A Conficar informa garantia de 90 dias nos serviços. Consulte a equipe sobre as condições e a cobertura do serviço realizado.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<PlusIcon size={21} /></summary><p>{answer}</p></details>)}</div></div>
  </div></section>;
}

function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><Brand footer /><p>Energia e confiança.<br /><strong>Sempre ao seu lado.</strong></p><a className="instagram-link" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Conficar"><InstagramLogoIcon size={25} /></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Conficar Centro Automotivo Ltda.</p><span>Maceió, Alagoas</span><a href="#inicio">Voltar ao início <ArrowUpRightIcon size={17} /></a></div></div></footer>;
}

function MobileDock() {
  const dock = useRef(null);
  useEffect(() => {
    const trigger = ScrollTrigger.create({ trigger: '#servicos', start: 'top 60%', onToggle: self => dock.current?.classList.toggle('is-visible', self.isActive || self.progress === 1), end: 'max' });
    return () => trigger.kill();
  }, []);
  return <div className="mobile-dock" ref={dock}><a href={whatsapp()} target="_blank" rel="noopener noreferrer"><WhatsappLogoIcon size={23} weight="bold" /><span>Falar no WhatsApp</span><ArrowUpRightIcon size={20} /></a><a href={MAPS} target="_blank" rel="noopener noreferrer" aria-label="Como chegar à Conficar"><MapPinIcon size={24} /></a></div>;
}

function App() {
  const root = useRef(null);
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray('[data-reveal]', root.current).forEach(element => {
        gsap.fromTo(element, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 94%', toggleActions: 'play none none reverse' } });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    return () => media.revert();
  }, []);
  return <div ref={root}><a className="skip-link" href="#servicos">Pular para o conteúdo</a><Header /><main><Hero /><Services /><Workshop /><Products /><Warranty /><Reviews /><Contact /></main><Footer /><MobileDock /></div>;
}

createRoot(document.getElementById('root')).render(<App />);

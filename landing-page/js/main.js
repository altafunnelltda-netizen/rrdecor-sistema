// RR Decor — Landing Page interactions

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- hero staggered reveal on load ---------- */
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const delay = parseInt(el.dataset.d || 0, 10) * 110;
    setTimeout(() => el.classList.add('play'), 150 + delay);
  });
});

/* ---------- nav scroll state ---------- */
const nav = document.getElementById('siteNav');
const waFloat = document.getElementById('waFloat');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  waFloat.classList.toggle('show', y > window.innerHeight * 0.6);
}, { passive: true });

/* ---------- mobile menu ---------- */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  burger.classList.toggle('open', open);
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ---------- scroll reveal for sections ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const group = entry.target.closest('.sobre-inner, .cards, .swatches, .timeline, .contato-inner') || document;
      const siblings = group.querySelectorAll ? group.querySelectorAll('.reveal-up') : [entry.target];
      const delay = parseInt(entry.target.dataset.d || 0, 10) * 110;
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => io.observe(el));

/* ---------- custom cursor ring (fine pointers) ---------- */
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const ring = document.getElementById('cursorRing');
  let rx = 0, ry = 0, tx = 0, ty = 0;
  window.addEventListener('mousemove', e => { tx = e.clientX; ty = e.clientY; });
  (function loop() {
    rx += (tx - rx) * 0.18;
    ry += (ty - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a, button, .swatch, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('grow'));
    el.addEventListener('mouseleave', () => ring.classList.remove('grow'));
  });
}

/* ---------- contact form -> WhatsApp ---------- */
const form = document.getElementById('contatoForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('fNome').value.trim();
  const telefone = document.getElementById('fTelefone').value.trim();
  const mensagem = document.getElementById('fMensagem').value.trim();

  const texto =
    `Olá! Meu nome é ${nome}.\n` +
    `Telefone: ${telefone}\n` +
    (mensagem ? `Sobre o projeto: ${mensagem}` : 'Gostaria de um orçamento de piso.');

  const url = `https://wa.me/5513982195854?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank', 'noopener');
});

// Elementos usados pela navegação entre as quatro telas.
const header = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main > section[id]')];
const navigationLinks = [...document.querySelectorAll('.nav-list a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const scrollDuration = 420;

let animationFrame = null;

// Destaca apenas o link da seção atual.
function markActive(id) {
  navigationLinks.forEach((link) => {
    const active = link.hash === `#${id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

// Durante a rolagem manual, a seção próxima ao topo define o link ativo.
function updateActiveFromScroll() {
  const probe = window.scrollY + header.offsetHeight + Math.min(150, window.innerHeight * .2);
  const current = [...sections].reverse().find((section) => section.offsetTop <= probe) || sections[0];
  markActive(current.id);
}

function cancelNavigation() {
  if (animationFrame === null) return;
  cancelAnimationFrame(animationFrame);
  animationFrame = null;
}

// A animação tem duração fixa e mantém o link escolhido ativo até terminar.
function goToSection(section, updateHistory = true) {
  cancelNavigation();
  markActive(section.id);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const target = Math.max(0, Math.min(section.offsetTop - header.offsetHeight, maxScroll));
  const start = window.scrollY;
  const distance = target - start;

  if (updateHistory && location.hash !== `#${section.id}`) {
    history.pushState(null, '', `#${section.id}`);
  }

  if (reducedMotion.matches || Math.abs(distance) < 2) {
    window.scrollTo(0, target);
    updateActiveFromScroll();
    return;
  }

  const startedAt = performance.now();

  function step(now) {
    const progress = Math.min((now - startedAt) / scrollDuration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);
    if (progress < 1) {
      animationFrame = requestAnimationFrame(step);
    } else {
      animationFrame = null;
      markActive(section.id);
    }
  }

  animationFrame = requestAnimationFrame(step);
}

// Todos os links internos (menu, marca e botões) usam a mesma navegação.
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  const section = sections.find((item) => `#${item.id}` === link.getAttribute('href'));
  if (!section) return;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    goToSection(section);
  });
});

// Fora da animação, o menu acompanha a rolagem feita pelo visitante.
window.addEventListener('scroll', () => {
  if (animationFrame === null) updateActiveFromScroll();
}, { passive: true });

// Uma ação manual interrompe a animação em andamento.
for (const type of ['wheel', 'touchstart']) {
  window.addEventListener(type, () => {
    if (animationFrame === null) return;
    cancelNavigation();
    updateActiveFromScroll();
  }, { passive: true });
}

window.addEventListener('keydown', (event) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
    cancelNavigation();
  }
});

// O botão Voltar também restaura a posição da seção anterior.
window.addEventListener('popstate', () => {
  const section = sections.find((item) => `#${item.id}` === location.hash) || sections[0];
  goToSection(section, false);
});

// Abre links diretos como /#projetos na seção correta.
const initialSection = sections.find((item) => `#${item.id}` === location.hash);
if (initialSection) {
  requestAnimationFrame(() => goToSection(initialSection, false));
} else {
  updateActiveFromScroll();
}

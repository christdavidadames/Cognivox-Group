// ====== Dropdown "Servicios" (hover en desktop + click accesible) ======
document.addEventListener('DOMContentLoaded', () => {
  const services = document.querySelector('#services');
  const menu = document.querySelector('#servicesMenu');
  const toggle = document.querySelector('#servicesToggle');

  if (services && menu && toggle) {
    const closeMenu = () => {
      menu.classList.add('hidden');
      toggle.setAttribute('aria-expanded', 'false');
    };

    const openMenu = () => {
      menu.classList.remove('hidden');
      toggle.setAttribute('aria-expanded', 'true');
    };

    // Hover (desktop)
    services.addEventListener('mouseenter', () => openMenu());
    services.addEventListener('mouseleave', () => closeMenu());

    // Click (fallback / accesible)
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = menu.classList.toggle('hidden');
      toggle.setAttribute('aria-expanded', String(!isHidden));
    });

    // Cerrar al hacer click en un enlace del menú
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });

    // ✅ Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!services.contains(e.target)) closeMenu();
    });

    // ✅ Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
});

// ====== Menú móvil (botón ☰) ======
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('menuBtn');
  const panel = document.getElementById('mobilePanel');

  if (!btn || !panel) return;

  const openPanel = () => {
    panel.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
  };

  const closePanel = () => {
    panel.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', () => {
    const isHidden = panel.classList.contains('hidden');
    isHidden ? openPanel() : closePanel();
  });

  // Cerrar al hacer click en un link del panel
  panel.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => closePanel());
  });

  // Cerrar al hacer click fuera
  document.addEventListener('click', (e) => {
    const clickedInside = panel.contains(e.target) || btn.contains(e.target);
    if (!clickedInside) closePanel();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  // ✅ Si cambias a desktop (resize), cerramos el panel para evitar estados raros
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) closePanel();
  });
});

// ====== Hero: rotar imágenes + frases centradas ======
document.addEventListener('DOMContentLoaded', () => {
  const imgEl = document.getElementById('heroSlide');
  const capEl = document.getElementById('heroCaption');
  if (!imgEl || !capEl) return;

  // Rutas de tus imágenes (en ./images/inicio/)
  const slides = [
    './images/inicio/logopedia-inicio-1.jpg',
    './images/inicio/psicologia-inicio-1.jpg',
    './images/inicio/logopedia-inicio-2.jpg',
    './images/inicio/psicologia-inicio-2.jpg'
  ];

  // Frases (mismo orden y cantidad que las imágenes)
  const captions = ['La vida', 'Paz', 'El amor', 'La salud'];
  const alts     = ['Logopedia inicio 1', 'Psicología inicio 1', 'Logopedia inicio 2', 'Psicología inicio 2'];

  // Pre-cargar imágenes
  slides.forEach(src => { const im = new Image(); im.src = src; });

  let i = 0;
  const DURATION = 5000; // ms entre cambios

  // helper para reiniciar animación
  function animateOnce(el, className) {
    el.classList.remove(className);
    void el.offsetWidth; // fuerza reflow
    el.classList.add(className);
  }

function nextSlide() {
  i = (i + 1) % slides.length;
  imgEl.src = slides[i];
  imgEl.alt = alts[i];
  capEl.textContent = captions[i];
  capEl.setAttribute('aria-label', captions[i]);

  // Re-lanzar animaciones
  const wrap = imgEl.closest('.hero-visual');
  if (wrap) animateOnce(wrap, 'is-animating');
  animateOnce(capEl, 'is-animating');
}

// ✅ Si una imagen no carga, pasa al siguiente slide
imgEl.addEventListener('error', () => {
  nextSlide();
});

  // Inicial coherente al cargar
  imgEl.src = slides[0];
  imgEl.alt = alts[0];
  capEl.textContent = captions[0];
  capEl.setAttribute('aria-label', captions[0]);

  // Primera animación al cargar
  // Primera animación al cargar
const wrap = imgEl.closest('.hero-visual');
if (wrap) animateOnce(wrap, 'is-animating');
animateOnce(capEl, 'is-animating');

  // Cambio automático
  setInterval(nextSlide, DURATION);
});



/**
 * Galleria Vittorio Emanuele II — Interactive Sales Deck
 * Main Application Entry Point
 * 
 * Technologies: Vanilla JS + GSAP ScrollTrigger + Canvas Particles
 */

import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// LOADER
// ============================================================
const loader = document.getElementById('loader');
const loaderProgress = document.getElementById('loader-progress');
const loaderCanvas = document.getElementById('loader-canvas');

function initLoaderCanvas() {
  const ctx = loaderCanvas.getContext('2d');
  loaderCanvas.width = window.innerWidth;
  loaderCanvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * loaderCanvas.width,
    y: Math.random() * loaderCanvas.height,
    r: Math.random() * 1.5 + 0.5,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    a: Math.random()
  }));

  function drawLoader() {
    ctx.clearRect(0, 0, loaderCanvas.width, loaderCanvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 168, 76, ${p.a * 0.4})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > loaderCanvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > loaderCanvas.height) p.vy *= -1;
    });
    if (!loader.classList.contains('hidden')) {
      requestAnimationFrame(drawLoader);
    }
  }
  drawLoader();
}

function animateLoader() {
  const circumference = 283;
  let progress = 0;
  const duration = 1800;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    progress = Math.min(elapsed / duration, 1);
    const offset = circumference - progress * circumference;
    loaderProgress.style.strokeDashoffset = offset;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initHeroAnimations();
        initGSAPAnimations();
      }, 400);
    }
  }
  requestAnimationFrame(step);
}

// Block scroll during load
document.body.style.overflow = 'hidden';
initLoaderCanvas();
window.addEventListener('load', animateLoader);

// ============================================================
// GOLD PARTICLE CANVAS (Hero)
// ============================================================
const particleCanvas = document.getElementById('particle-canvas');
let particleCtx, heroParticles = [];

function initParticles() {
  particleCtx = particleCanvas.getContext('2d');
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;

  heroParticles = Array.from({ length: 80 }, () => createParticle());

  function animate() {
    particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    heroParticles.forEach((p, i) => {
      p.y -= p.vy;
      p.x += Math.sin(p.phase + Date.now() * 0.001) * 0.3;
      p.a -= 0.002;
      p.phase += 0.02;

      if (p.a <= 0 || p.y < -10) {
        heroParticles[i] = createParticle();
      }

      particleCtx.beginPath();
      particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      particleCtx.fillStyle = `rgba(201, 168, 76, ${p.a})`;
      particleCtx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function createParticle() {
  return {
    x: Math.random() * particleCanvas.width,
    y: particleCanvas.height + 10,
    r: Math.random() * 1.2 + 0.3,
    vy: Math.random() * 0.5 + 0.2,
    a: Math.random() * 0.6 + 0.1,
    phase: Math.random() * Math.PI * 2
  };
}

window.addEventListener('resize', () => {
  if (particleCtx) {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
  }
});

// ============================================================
// HERO ANIMATIONS (GSAP-powered)
// ============================================================
function initHeroAnimations() {
  initParticles();

  // Trigger hero image zoom
  const heroImg = document.getElementById('hero-img');
  if (heroImg) {
    heroImg.classList.add('loaded');
  }

  // GSAP staggered text reveal
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.1)
    .to('.hero-line-1', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 0.3)
    .to('.hero-line-2', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 0.5)
    .to('.hero-line-3', { opacity: 1, y: 0, duration: 1, ease: 'power4.out' }, 0.7)
    .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, 0.9)
    .to('.hero-divider', { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, 1.1)
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, 1.2)
    .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8 }, 1.4);
}

// ============================================================
// GSAP SCROLL-DRIVEN ANIMATIONS
// ============================================================
function initGSAPAnimations() {
  // --- Hero Parallax ---
  gsap.to('.hero-img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });

  // --- Stats Counter Animation ---
  const statsBar = document.getElementById('stats-bar');
  if (statsBar) {
    ScrollTrigger.create({
      trigger: statsBar,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        document.querySelectorAll('.stat-number').forEach(el => {
          const target = parseInt(el.dataset.target, 10);
          gsap.fromTo(el, { textContent: 0 }, {
            textContent: target,
            duration: 2,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
              el.textContent = Math.round(gsap.getProperty(el, 'textContent') || 0);
            }
          });
        });

        // Stagger stat items entrance
        gsap.from('.stat-item', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out'
        });
      }
    });
  }

  // --- Why Section ---
  gsap.from('.why-text-col .section-eyebrow', {
    scrollTrigger: { trigger: '.why-grid', start: 'top 80%', once: true },
    opacity: 0, y: 30, duration: 0.7
  });
  gsap.from('.why-text-col .section-title', {
    scrollTrigger: { trigger: '.why-grid', start: 'top 75%', once: true },
    opacity: 0, y: 40, duration: 0.9, delay: 0.15
  });
  gsap.from('.why-text-col .section-body', {
    scrollTrigger: { trigger: '.why-grid', start: 'top 70%', once: true },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.1, delay: 0.3
  });
  gsap.from('.badge', {
    scrollTrigger: { trigger: '.why-badges', start: 'top 85%', once: true },
    opacity: 0, scale: 0.8, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)'
  });
  gsap.from('.why-image-frame', {
    scrollTrigger: { trigger: '.why-image-frame', start: 'top 85%', once: true },
    opacity: 0, x: 60, duration: 1, ease: 'power3.out'
  });
  gsap.from('.why-image-frame .reveal-img', {
    scrollTrigger: { trigger: '.why-image-frame', start: 'top 85%', once: true },
    opacity: 0, scale: 1.05, duration: 1.2, ease: 'power2.out'
  });

  // --- Location Bar ---
  gsap.from('.location-item', {
    scrollTrigger: { trigger: '.location-bar', start: 'top 90%', once: true },
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out'
  });

  // --- Retail Section ---
  gsap.from('.retail-section .section-eyebrow', {
    scrollTrigger: { trigger: '.retail-section', start: 'top 85%', once: true },
    opacity: 0, y: 30, duration: 0.7
  });
  gsap.from('.retail-section .section-title', {
    scrollTrigger: { trigger: '.retail-section', start: 'top 80%', once: true },
    opacity: 0, y: 40, duration: 0.9, delay: 0.1
  });
  gsap.from('.retail-section .section-body', {
    scrollTrigger: { trigger: '.retail-section', start: 'top 75%', once: true },
    opacity: 0, y: 25, duration: 0.7, delay: 0.2
  });
  gsap.from('.tenant-card', {
    scrollTrigger: { trigger: '.tenant-scroll-wrapper', start: 'top 90%', once: true },
    opacity: 0, y: 40, scale: 0.95, duration: 0.7, stagger: 0.12, ease: 'power3.out',
    clearProps: 'all'
  });
  gsap.from('.metric-box', {
    scrollTrigger: { trigger: '.retail-metrics', start: 'top 95%', once: true },
    opacity: 0, y: 30, duration: 0.7, stagger: 0.15, ease: 'power2.out',
    clearProps: 'all'
  });

  // --- Luxury Section ---
  gsap.from('.luxury-content > *', {
    scrollTrigger: { trigger: '.luxury-section', start: 'top 80%', once: true },
    opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power2.out'
  });



  gsap.from('.luxury-quote', {
    scrollTrigger: { trigger: '.luxury-quote-block', start: 'top 85%', once: true },
    opacity: 0, y: 50, duration: 1.2, ease: 'power3.out'
  });
  gsap.from('.quote-mark', {
    scrollTrigger: { trigger: '.luxury-quote-block', start: 'top 90%', once: true },
    opacity: 0, scale: 0.5, duration: 1, ease: 'power2.out'
  });
  gsap.from('blockquote cite', {
    scrollTrigger: { trigger: '.luxury-quote-block', start: 'top 80%', once: true },
    opacity: 0, y: 20, duration: 0.7, delay: 0.4
  });
  gsap.from('.pillar-card', {
    scrollTrigger: { trigger: '.luxury-pillars', start: 'top 90%', once: true },
    opacity: 0, y: 50, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    clearProps: 'all'
  });
  gsap.from('.compare-header', {
    scrollTrigger: { trigger: '.comparison-table', start: 'top 90%', once: true },
    opacity: 0, y: 20, duration: 0.6
  });
  gsap.from('.compare-row', {
    scrollTrigger: { trigger: '.comparison-table', start: 'top 85%', once: true },
    opacity: 0, x: -30, duration: 0.5, stagger: 0.08, delay: 0.2, ease: 'power2.out'
  });

  // --- Luxury BG Parallax ---
  gsap.to('.luxury-bg-img', {
    yPercent: 15,
    ease: 'none',
    scrollTrigger: {
      trigger: '.luxury-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  // --- Dining Section ---
  gsap.from('.dining-image-frame', {
    scrollTrigger: { trigger: '.dining-grid', start: 'top 85%', once: true },
    opacity: 0, x: -60, duration: 1, ease: 'power3.out'
  });
  gsap.from('.dining-image-frame .reveal-img', {
    scrollTrigger: { trigger: '.dining-grid', start: 'top 85%', once: true },
    opacity: 0, scale: 1.05, duration: 1.2, ease: 'power2.out'
  });
  gsap.from('.dining-text-col .section-eyebrow', {
    scrollTrigger: { trigger: '.dining-text-col', start: 'top 85%', once: true },
    opacity: 0, y: 25, duration: 0.7
  });
  gsap.from('.dining-text-col .section-title', {
    scrollTrigger: { trigger: '.dining-text-col', start: 'top 80%', once: true },
    opacity: 0, y: 35, duration: 0.9, delay: 0.1
  });
  gsap.from('.dining-text-col .section-body', {
    scrollTrigger: { trigger: '.dining-text-col', start: 'top 75%', once: true },
    opacity: 0, y: 25, duration: 0.7, delay: 0.2
  });
  // Removed .venue-item GSAP animation to prevent them getting stuck hidden

  // --- Attractions Section ---
  gsap.from('.attractions-section .section-eyebrow', {
    scrollTrigger: { trigger: '.attractions-section', start: 'top 85%', once: true },
    opacity: 0, y: 25, duration: 0.7
  });
  gsap.from('.attractions-section .section-title', {
    scrollTrigger: { trigger: '.attractions-section', start: 'top 80%', once: true },
    opacity: 0, y: 35, duration: 0.9, delay: 0.1
  });
  gsap.from('.attraction-card', {
    scrollTrigger: { trigger: '.attractions-grid', start: 'top 90%', once: true },
    opacity: 0, y: 50, scale: 0.95, duration: 0.8, stagger: 0.12, ease: 'power3.out'
  });

  // --- Platform Section ---
  gsap.from('.platform-inner .section-eyebrow', {
    scrollTrigger: { trigger: '.platform-section', start: 'top 85%', once: true },
    opacity: 0, y: 25, duration: 0.7
  });
  gsap.from('.platform-inner .section-title', {
    scrollTrigger: { trigger: '.platform-section', start: 'top 80%', once: true },
    opacity: 0, y: 35, duration: 0.9, delay: 0.1
  });
  gsap.from('.platform-inner .section-body', {
    scrollTrigger: { trigger: '.platform-section', start: 'top 75%', once: true },
    opacity: 0, y: 25, duration: 0.7, delay: 0.2
  });
  gsap.from('.module-card', {
    scrollTrigger: { trigger: '.platform-modules', start: 'top 90%', once: true },
    opacity: 0, y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  // --- Platform BG Parallax ---
  gsap.to('.platform-bg img', {
    yPercent: 10,
    ease: 'none',
    scrollTrigger: {
      trigger: '.platform-section',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    }
  });

  // --- Contact Section ---
  // Removed GSAP triggers for contact section to guarantee visibility at bottom of page

  // --- Footer ---
  gsap.from('.footer-inner > *', {
    scrollTrigger: { trigger: '.site-footer', start: 'top 95%', once: true },
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power2.out'
  });

  // Refresh ScrollTrigger after all images load to ensure correct positions
  setTimeout(() => ScrollTrigger.refresh(), 500);
  setTimeout(() => ScrollTrigger.refresh(), 2000);
}

// ============================================================
// NAVIGATION
// ============================================================
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

// Scroll-based nav style
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  updateActiveNav();
}, { passive: true });

// Active nav link highlighting
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionBottom = sectionTop + section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionBottom) {
      const id = section.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Mobile menu
hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  mobileMenu.removeAttribute('hidden');
});

mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ============================================================
// TENANT CAROUSEL
// ============================================================
const tenantTrack = document.getElementById('tenant-track');
const tenantPrev = document.getElementById('tenant-prev');
const tenantNext = document.getElementById('tenant-next');

let tenantIndex = 0;
const CARD_WIDTH = 340 + 24; // width + gap

function getMaxIndex() {
  if (!tenantTrack) return 0;
  const cards = tenantTrack.querySelectorAll('.tenant-card');
  const visibleCards = Math.floor(tenantTrack.parentElement.offsetWidth / CARD_WIDTH);
  return Math.max(0, cards.length - visibleCards);
}

function moveTenant() {
  if (!tenantTrack) return;
  gsap.to(tenantTrack, {
    x: -tenantIndex * CARD_WIDTH,
    duration: 0.6,
    ease: 'power2.inOut'
  });
}

if (tenantNext) {
  tenantNext.addEventListener('click', () => {
    tenantIndex = Math.min(tenantIndex + 1, getMaxIndex());
    moveTenant();
  });
}

if (tenantPrev) {
  tenantPrev.addEventListener('click', () => {
    tenantIndex = Math.max(tenantIndex - 1, 0);
    moveTenant();
  });
}

// Touch/swipe support for tenant carousel
let touchStartX = 0;
if (tenantTrack) {
  tenantTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  tenantTrack.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        tenantIndex = Math.min(tenantIndex + 1, getMaxIndex());
      } else {
        tenantIndex = Math.max(tenantIndex - 1, 0);
      }
      moveTenant();
    }
  }, { passive: true });
}

// ============================================================
// PLATFORM MODULES (Accordion) with GSAP
// ============================================================
const moduleCards = document.querySelectorAll('.module-card');

moduleCards.forEach(card => {
  card.addEventListener('click', (e) => {
    // Don't close if clicking inside module-detail links/buttons
    if (e.target.closest('.module-cta') || e.target.closest('a') || e.target.closest('button')) return;

    const isActive = card.classList.contains('active');
    const detail = card.querySelector('.module-detail');

    // Close all
    moduleCards.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('aria-expanded', 'false');
      const d = c.querySelector('.module-detail');
      if (d && c !== card) {
        gsap.to(d, { maxHeight: 0, duration: 0.4, ease: 'power2.inOut' });
      }
    });

    // Toggle clicked
    if (!isActive) {
      card.classList.add('active');
      card.setAttribute('aria-expanded', 'true');
      if (detail) {
        gsap.to(detail, { maxHeight: 700, duration: 0.5, ease: 'power2.out' });
      }
    } else {
      if (detail) {
        gsap.to(detail, { maxHeight: 0, duration: 0.4, ease: 'power2.inOut' });
      }
    }
  });

  // Keyboard support
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// ============================================================
// CONTACT MODAL
// ============================================================
const contactModal = document.getElementById('contact-modal');
const modalClose = document.getElementById('modal-close');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const formType = document.getElementById('form-type');

const enquiryLabels = {
  leasing: 'Retail Leasing Enquiry',
  sponsorship: 'Brand Sponsorship Enquiry',
  events: 'Event Booking Enquiry'
};

window.openContactForm = function(type) {
  if (!contactModal) return;
  contactModal.removeAttribute('hidden');
  if (modalTitle) modalTitle.textContent = enquiryLabels[type] || 'Get in Touch';
  if (formType) formType.value = type || '';
  document.body.style.overflow = 'hidden';

  // GSAP modal entrance
  gsap.fromTo('.modal-content', 
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }
  );

  // Focus management
  setTimeout(() => {
    const firstInput = contactModal.querySelector('input, select, textarea');
    if (firstInput) firstInput.focus();
  }, 100);
};

function closeModal() {
  if (!contactModal) return;
  gsap.to('.modal-content', {
    opacity: 0, y: 20, scale: 0.97,
    duration: 0.25, ease: 'power2.in',
    onComplete: () => {
      contactModal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  });
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && contactModal && !contactModal.hidden) {
    closeModal();
  }
});

// Form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('form-submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = 'Enquiry Sent ✓';
      submitBtn.style.background = '#2A8A4A';
      setTimeout(() => {
        closeModal();
        contactForm.reset();
        submitBtn.textContent = 'Send Enquiry';
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 2000);
    }, 1000);
  });
}

// ============================================================
// CURSOR GLOW EFFECT (Desktop only)
// ============================================================
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

function updateCursorGlow() {
  glowX += (mouseX - glowX) * 0.12;
  glowY += (mouseY - glowY) * 0.12;
  cursorGlow.style.transform = `translate(${glowX - 200}px, ${glowY - 200}px)`;
  requestAnimationFrame(updateCursorGlow);
}
updateCursorGlow();

// ============================================================
// HASH SCROLL ON LOAD
// ============================================================
window.addEventListener('load', () => {
  if (window.location.hash) {
    setTimeout(() => {
      const target = document.querySelector(window.location.hash);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 2200);
  }
});

console.log(
  '%cGalleria GVE\n%cInteractive Sales Deck · Where Luxury Was Born',
  'font-family:Georgia,serif;font-size:20px;color:#C9A84C;font-weight:300;',
  'font-family:system-ui;font-size:12px;color:#8A7F6A;'
);

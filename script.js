// ============ TOAST ============
const toastEl = document.getElementById('toast');
let toastTimer;
function showToast(msg){
  clearTimeout(toastTimer);
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

document.querySelectorAll('[data-toast]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast(btn.getAttribute('data-toast'));
  });
});

// ============ MOBILE NAV ============
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('mobile-open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('mobile-open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ RESERVATION MODAL ============
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const reserveForm = document.getElementById('reserveForm');

function openModal(){
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', openModal);
});
modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape'){
    closeModal();
    closeLightbox();
  }
});

reserveForm.addEventListener('submit', (e) => {
  e.preventDefault();
  closeModal();
  reserveForm.reset();
  showToast('Thanks! This is a demo reservation form — no request was actually sent.');
});

// ============ MENU FILTERING ============
const menuTabs = document.querySelectorAll('.menu-tab');
const menuItems = document.querySelectorAll('.menu-item');

function filterMenu(cat){
  menuItems.forEach(item => {
    item.classList.toggle('show', item.dataset.cat === cat);
  });
}

menuTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    menuTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    filterMenu(tab.dataset.cat);
  });
});

filterMenu('starters'); // initial state

document.getElementById('fullMenuBtn').addEventListener('click', () => {
  showToast('This is a demo — the full menu page would link here on a real site.');
});

// ============ GALLERY LIGHTBOX ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('#galleryGrid img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// ============ SCROLL REVEAL ============
const revealTargets = document.querySelectorAll(
  '.feature-card, .menu, .feature-dish, .gallery-grid img, .event-card, .testimonial-card, .contact-inner'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    if (targetId.length > 1){
      const target = document.querySelector(targetId);
      if (target){
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// AOS Init
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

// Header Scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.5)' : 'none';
});

// Mobile Menu
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (toggle) toggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));

// Full Height Hero
function setHeroHeight() {
  const hero = document.querySelector('.hero');
  if (hero && window.innerWidth > 768) hero.style.minHeight = window.innerHeight + 'px';
}
window.addEventListener('load', setHeroHeight);
window.addEventListener('resize', setHeroHeight);
setHeroHeight();

// FAQ Accordion - SMOOTH ANIMATION
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', function() {
    const faqItem = this.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
    
    // Toggle current FAQ item
    if (!isActive) {
      faqItem.classList.add('active');
    } else {
      faqItem.classList.remove('active');
    }
  });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      mobileMenu?.classList.remove('active');
    }
  });
});

// Floating CTA
document.getElementById('floatingCta')?.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#faq')?.scrollIntoView({ behavior: 'smooth' });
});

// Order Now Button
document.querySelector('.btn-cta')?.addEventListener('click', (e) => {
  e.preventDefault();
  // Ganti dengan halaman pricing/order
  window.location.href = 'pricing_store.html';
});

console.log('%c☁️ PALKIA STORE — Cloud Gaming Revolution', 'font-size: 16px; font-weight: bold; color: #8b5cf6;');
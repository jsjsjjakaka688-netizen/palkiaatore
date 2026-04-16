// ==================== AOS INIT ====================
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

// ==================== HEADER SCROLL ====================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 50 ? '0 4px 20px rgba(0,0,0,0.5)' : 'none';
});

// ==================== MOBILE MENU ====================
const toggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (toggle) toggle.addEventListener('click', () => mobileMenu.classList.toggle('active'));
document.querySelectorAll('.mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.remove('active')));

// ==================== MODAL ELEMENTS ====================
const paymentModal = document.getElementById('paymentModal');
const adminModal = document.getElementById('adminModal');
const closeModal = document.getElementById('closeModal');
const closeAdminModal = document.getElementById('closeAdminModal');
const continueBtn = document.getElementById('continueBtn');
const selectedPaketName = document.getElementById('selectedPaketName');
const selectedPaketPrice = document.getElementById('selectedPaketPrice');

// ==================== STATE ====================
let selectedPaket = '';
let selectedHarga = '';
let selectedMethod = '';
let selectedPhone = '';
let currentOrderId = '';

// ==================== GENERATE ORDER ID ====================
function generateOrderId() {
  const prefix = 'PALKIA';
  const date = new Date();
  const dateStr = date.getFullYear().toString().slice(2) +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${dateStr}-${random}`;
}

// ==================== FORMAT TANGGAL ====================
function formatTanggal() {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

// ==================== OPEN PAYMENT MODAL ====================
function openPaymentModal(paket, harga) {
  selectedPaket = paket;
  selectedHarga = harga;
  selectedMethod = '';
  currentOrderId = generateOrderId();
  
  selectedPaketName.textContent = paket;
  selectedPaketPrice.textContent = harga;
  
  document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('selected'));
  continueBtn.disabled = true;
  
  paymentModal.classList.add('active');
}

// ==================== OPEN ADMIN MODAL ====================
function openAdminModal() {
  paymentModal.classList.remove('active');
  adminModal.classList.add('active');
  document.querySelectorAll('.admin-option').forEach(opt => opt.classList.remove('selected'));
}

// ==================== CLOSE ALL MODALS ====================
function closeAllModals() {
  paymentModal.classList.remove('active');
  adminModal.classList.remove('active');
  selectedMethod = '';
}

// ==================== ORDER BUTTONS ====================
document.querySelectorAll('.btn-order').forEach(btn => {
  btn.addEventListener('click', function() {
    const paket = this.getAttribute('data-paket');
    const harga = this.getAttribute('data-harga');
    openPaymentModal(paket, harga);
  });
});

// ==================== PAYMENT METHOD SELECTION ====================
document.querySelectorAll('.payment-option').forEach(opt => {
  opt.addEventListener('click', function() {
    document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
    selectedMethod = this.getAttribute('data-method');
    continueBtn.disabled = false;
  });
});

// ==================== ADMIN SELECTION ====================
document.querySelectorAll('.admin-option').forEach(opt => {
  opt.addEventListener('click', function() {
    document.querySelectorAll('.admin-option').forEach(o => o.classList.remove('selected'));
    this.classList.add('selected');
    selectedPhone = this.getAttribute('data-phone');
    
    // Langsung lanjut ke WhatsApp setelah pilih admin
    setTimeout(() => {
      continueToWhatsApp();
    }, 300);
  });
});

// ==================== CONTINUE TO WHATSAPP ====================
function continueToWhatsApp() {
  if (!selectedMethod) {
    alert('Silakan pilih metode pembayaran terlebih dahulu!');
    return;
  }
  
  if (!selectedPhone) {
    alert('Silakan pilih admin terlebih dahulu!');
    return;
  }
  
  const tanggal = formatTanggal();
  
  // PESAN TANPA NAMA ADMIN
  const message = `*ORDER DETAIL - PALKIA STORE*%0A%0A` +
    `📋 ORDER ID: *${currentOrderId}*%0A` +
    `📅 TANGGAL: *${tanggal}*%0A` +
    `💳 METODE: *${selectedMethod}*%0A` +
    `📦 PAKET: *${selectedPaket}*%0A` +
    `💰 HARGA: *${selectedHarga}*%0A%0A` +
    `Mohon diproses ya kak! 🙏`;
  
  window.open(`https://wa.me/${selectedPhone}?text=${message}`, '_blank');
  closeAllModals();
}

// ==================== CONTINUE BUTTON ====================
if (continueBtn) {
  continueBtn.addEventListener('click', function() {
    if (!selectedMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu!');
      return;
    }
    openAdminModal();
  });
}

// ==================== CLOSE MODAL EVENTS ====================
if (closeModal) closeModal.addEventListener('click', closeAllModals);
if (closeAdminModal) closeAdminModal.addEventListener('click', closeAllModals);

// Close modals when clicking outside
paymentModal.addEventListener('click', function(e) {
  if (e.target === paymentModal) closeAllModals();
});

adminModal.addEventListener('click', function(e) {
  if (e.target === adminModal) closeAllModals();
});

// Close modals with ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeAllModals();
  }
});

// ==================== CONSOLE ====================
console.log('%c☁️ PALKIA STORE — Pricing Page', 'font-size: 16px; font-weight: bold; color: #8b5cf6');
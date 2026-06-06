// ============================================
// MATERIALIZE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Sidenav
  const sidenav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenav);

  // Initialize Collapsible (FAQ)
  const collapsible = document.querySelectorAll('.collapsible');
  M.Collapsible.init(collapsible);

  // Initialize Materialbox (if used for images)
  const materialbox = document.querySelectorAll('.materialboxed');
  M.Materialbox.init(materialbox);

  // Initialize Tooltips
  const tooltips = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(tooltips);

  // Close sidenav when clicking on a link
  const sidenavLinks = document.querySelectorAll('.sidenav a');
  sidenavLinks.forEach(link => {
    link.addEventListener('click', function() {
      const sidenav = M.Sidenav.getInstance(document.getElementById('mobile-menu'));
      sidenav.close();
    });
  });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip smooth scroll for sidenav links
    if (href === '#' || href === '') {
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================

const revealElements = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveal.classList.add('active');
    }
  });
};

// Add reveal class to elements
const addRevealClass = () => {
  const sections = document.querySelectorAll('.section');
  const cards = document.querySelectorAll('.practice-card, .testimonial-card, .why-us-item');
  
  [...sections, ...cards].forEach(el => {
    el.classList.add('reveal');
  });
};

// Initialize reveal animations
window.addEventListener('load', addRevealClass);
window.addEventListener('scroll', revealElements);

// Initial check on load
window.addEventListener('load', revealElements);

// ============================================
// CONTACT FORM - WHATSAPP INTEGRATION
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Validate form
    if (!name || !phone || !email || !message) {
      M.toast({html: 'Por favor, preencha todos os campos!'});
      return;
    }

    // Format phone number (remove non-digits)
    const phoneDigits = phone.replace(/\D/g, '');
    
    // Create WhatsApp message
    const whatsappMessage = `Olá, Dr. Daniel!\n\nMeu nome é: ${name}\nMeu email: ${email}\nMeu telefone: ${phone}\n\nMensagem:\n${message}\n\nAguardo retorno!`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp URL - Updated with correct phone number
    const whatsappURL = `https://wa.me/5581997078843?text=${encodedMessage}`;

    // Show success toast
    M.toast({html: 'Redirecionando para WhatsApp...'});

    // Open WhatsApp
    setTimeout(() => {
      window.open(whatsappURL, '_blank');
      
      // Reset form
      contactForm.reset();
      
      // Reinitialize labels for Materialize
      M.updateTextFields();
    }, 500);
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

// ============================================
// MATERIALIZE TEXT FIELD ENHANCEMENT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  M.updateTextFields();
});

// Update text fields when form is reset
const observer = new MutationObserver(function() {
  M.updateTextFields();
});

const config = { attributes: true, subtree: true };
const textFields = document.querySelectorAll('.input-field');
textFields.forEach(field => {
  observer.observe(field, config);
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL REVEAL
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements
window.addEventListener('load', function() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    scrollObserver.observe(el);
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
  let current = '';
  
  // Get all sections
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });

  // Update active link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format phone number to Brazilian standard
 */
function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  
  return phone;
}

/**
 * Validate email
 */
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Validate Brazilian phone
 */
function validateBrazilianPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Add keyboard navigation for buttons
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    if (document.activeElement.classList.contains('btn')) {
      document.activeElement.click();
    }
  }
});

// ============================================
// WHATSAPP BUTTON CLICK TRACKER (Analytics ready)
// ============================================

const whatsappButtons = document.querySelectorAll('[href*="wa.me"]');

whatsappButtons.forEach(button => {
  button.addEventListener('click', function() {
    // Here you can add analytics tracking
    console.log('WhatsApp button clicked');
    
    // Example: Send to analytics
    // gtag('event', 'whatsapp_click', {
    //   'event_category': 'engagement',
    //   'event_label': 'whatsapp_cta'
    // });
  });
});

// ============================================
// FORM AUTO-FILL FROM URL PARAMS
// ============================================

const urlParams = new URLSearchParams(window.location.search);
const formFields = {
  'name': 'form-name',
  'phone': 'form-phone',
  'email': 'form-email',
  'message': 'form-message'
};

Object.entries(formFields).forEach(([param, fieldId]) => {
  const value = urlParams.get(param);
  if (value) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.value = decodeURIComponent(value);
      M.updateTextFields();
    }
  }
});

// ============================================
// PAGE LOAD COMPLETE
// ============================================

console.log('Legal website script loaded successfully!');

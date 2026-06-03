/* ========================
   THEME TOGGLE
======================== */
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Remember preference on reload
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light');
  themeToggle.textContent = '☀️';
} else {
  themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  const isLight = body.classList.contains('light');
  themeToggle.textContent = isLight ? '☀️' : '🌙';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


/* ========================
   MOBILE MENU TOGGLE
======================== */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  menuBtn.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
  }
});


/* ========================
   STICKY NAVBAR ON SCROLL
======================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


/* ========================
   ACTIVE NAV LINK ON SCROLL
======================== */
const sections = document.querySelectorAll('section');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


/* ========================
   SCROLL FADE-IN ANIMATION
======================== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});


/* ========================
   SKILL BAR ANIMATION
======================== */
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.transition = 'width 1s ease';
          bar.style.width = width;
        }, 200);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-group').forEach(group => {
  skillObserver.observe(group);
});


/* ========================
   TYPING EFFECT — HERO
======================== */
const typingElement = document.getElementById('typingText');

if (typingElement) {
  const roles = [
    'WordPress Developer',
    'LearnDash LMS Expert',
    'Backend Developer',
    'Django REST API Developer',
    'E-Commerce Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      speed = 1800; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400; // pause before next word
    }

    setTimeout(type, speed);
  }

  type();
}


/* ========================
   EMAILJS SETUP
   Replace with your real IDs from emailjs.com
======================== */
const EMAILJS_SERVICE_ID  = 'service_73c1zfv';
const EMAILJS_TEMPLATE_ID = 'template_3m811hm';
const EMAILJS_PUBLIC_KEY  = 'sDvU57mJJBZLAotfV';

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}


/* ========================
   CONTACT FORM
======================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput    = document.getElementById('from_name');
    const emailInput   = document.getElementById('from_email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn    = document.getElementById('submitBtn');
    const formMessage  = document.getElementById('formMessage');

    // Clear previous states
    clearErrors();
    formMessage.textContent = '';
    formMessage.className = '';

    // Validate
    let hasError = false;

    if (!nameInput.value.trim()) {
      showError('from_name', 'nameError');
      hasError = true;
    }

    if (!isValidEmail(emailInput.value.trim())) {
      showError('from_email', 'emailError');
      hasError = true;
    }

    if (!subjectInput.value.trim()) {
      showError('subject', 'subjectError');
      hasError = true;
    }

    if (!messageInput.value.trim()) {
      showError('message', 'messageError');
      hasError = true;
    }

    if (hasError) return;

    // Send
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        contactForm
      );

      // Success
      formMessage.textContent = '✓ Message sent! I will get back to you soon.';
      formMessage.className = 'success';
      contactForm.reset();
      clearSuccessStates();

    } catch (error) {
      // Error
      formMessage.textContent = '✗ Something went wrong. Please try again or email me directly.';
      formMessage.className = 'error';
      console.error('EmailJS error:', error);

    } finally {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;

      // Auto clear message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = '';
      }, 5000);
    }
  });

  // Real-time validation on blur
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.value.trim()) {
        input.classList.remove('error');
        input.classList.add('success');
      }
    });
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorEl = document.getElementById(input.id + 'Error') ||
                      document.getElementById(
                        input.name.replace('from_', '') + 'Error'
                      );
      if (errorEl) errorEl.classList.remove('visible');
    });
  });
}

function showError(inputId, errorId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (input) input.classList.add('error');
  if (error) error.classList.add('visible');
}

function clearErrors() {
  document.querySelectorAll('.form-error').forEach(e => {
    e.classList.remove('visible');
  });
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(i => {
    i.classList.remove('error');
  });
}

function clearSuccessStates() {
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(i => {
    i.classList.remove('success');
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ========================
   SMOOTH SCROLL FOR BUTTONS
======================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ========================
   BACK TO TOP BUTTON
======================== */
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.id = 'backToTop';
backToTop.style.cssText = `
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #E24B4A;
  color: #fff;
  border: none;
  width: 42px;
  height: 42px;
  font-size: 18px;
  cursor: pointer;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 998;
`;
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
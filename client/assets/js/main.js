/**
 * Amanu Muhammed — Portfolio Website
 * Main JavaScript: navigation, theme, animations, contact form
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Configuration
     -------------------------------------------------------------------------- */
  const CONFIG = {
    // Update this URL when deploying the backend server
    API_URL: 'http://localhost:5000/api/contact',
    TYPED_STRINGS: [
      'Junior Software Engineer',
      'Full-Stack Developer',
      'Backend Specialist',
      'Information Systems Student'
    ],
    TYPING_SPEED: 80,
    DELETING_SPEED: 40,
    PAUSE_DURATION: 2000
  };

  /* --------------------------------------------------------------------------
     DOM Elements
     -------------------------------------------------------------------------- */
  const DOM = {
    loader: document.getElementById('loader'),
    header: document.getElementById('header'),
    navMenu: document.getElementById('nav-menu'),
    navToggle: document.getElementById('nav-toggle'),
    navLinks: document.querySelectorAll('.nav__link'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    scrollTop: document.getElementById('scroll-top'),
    contactForm: document.getElementById('contact-form'),
    formStatus: document.getElementById('form-status'),
    submitBtn: document.getElementById('submit-btn'),
    currentYear: document.getElementById('current-year'),
    typedText: document.getElementById('typed-text'),
    animateElements: document.querySelectorAll('.animate-on-scroll'),
    skillProgressBars: document.querySelectorAll('.skill-card__progress')
  };

  /* --------------------------------------------------------------------------
     Loading Screen
     -------------------------------------------------------------------------- */
  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        DOM.loader.classList.add('hidden');
        document.body.style.overflow = '';
      }, 800);
    });

    // Fallback: hide loader after 3 seconds regardless
    setTimeout(() => {
      DOM.loader.classList.add('hidden');
    }, 3000);
  }

  /* --------------------------------------------------------------------------
     Theme Toggle (Dark / Light Mode)
     -------------------------------------------------------------------------- */
  function initTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(theme);

    DOM.themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
      localStorage.setItem('portfolio-theme', next);
    });
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    DOM.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  /* --------------------------------------------------------------------------
     Sticky Header & Scroll Effects
     -------------------------------------------------------------------------- */
  function initScrollEffects() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  function handleScroll() {
    const scrollY = window.scrollY;

    // Sticky header shadow
    DOM.header.classList.toggle('scrolled', scrollY > 50);

    // Scroll to top button visibility
    DOM.scrollTop.classList.toggle('visible', scrollY > 400);

    // Active nav link highlighting
    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        DOM.navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  /* --------------------------------------------------------------------------
     Mobile Navigation
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    DOM.navToggle.addEventListener('click', toggleMobileMenu);

    DOM.navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (
        DOM.navMenu.classList.contains('active') &&
        !DOM.navMenu.contains(e.target) &&
        !DOM.navToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  function toggleMobileMenu() {
    const isActive = DOM.navMenu.classList.toggle('active');
    DOM.navToggle.classList.toggle('active', isActive);
    DOM.navToggle.setAttribute('aria-expanded', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }

  function closeMobileMenu() {
    DOM.navMenu.classList.remove('active');
    DOM.navToggle.classList.remove('active');
    DOM.navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------------------------
     Smooth Scrolling for Anchor Links
     -------------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    DOM.scrollTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --------------------------------------------------------------------------
     Typing Animation (Hero Section)
     -------------------------------------------------------------------------- */
  function initTypingEffect() {
    if (!DOM.typedText) return;

    let stringIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentString = CONFIG.TYPED_STRINGS[stringIndex];

      if (isDeleting) {
        DOM.typedText.textContent = currentString.substring(0, charIndex - 1);
        charIndex--;
      } else {
        DOM.typedText.textContent = currentString.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? CONFIG.DELETING_SPEED : CONFIG.TYPING_SPEED;

      if (!isDeleting && charIndex === currentString.length) {
        speed = CONFIG.PAUSE_DURATION;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % CONFIG.TYPED_STRINGS.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    type();
  }

  /* --------------------------------------------------------------------------
     Scroll Animations (Intersection Observer)
     -------------------------------------------------------------------------- */
  function initScrollAnimations() {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    DOM.animateElements.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     Skill Progress Bars Animation
     -------------------------------------------------------------------------- */
  function initSkillBars() {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = entry.target;
            const value = progress.getAttribute('data-progress');
            progress.style.width = `${value}%`;
            skillObserver.unobserve(progress);
          }
        });
      },
      { threshold: 0.5 }
    );

    DOM.skillProgressBars.forEach((bar) => skillObserver.observe(bar));
  }

  /* --------------------------------------------------------------------------
     Contact Form Validation & Submission
     -------------------------------------------------------------------------- */
  function initContactForm() {
    if (!DOM.contactForm) return;

    const fields = {
      name: {
        el: document.getElementById('name'),
        error: document.getElementById('name-error'),
        validate: (v) => v.trim().length >= 2 || 'Name must be at least 2 characters'
      },
      email: {
        el: document.getElementById('email'),
        error: document.getElementById('email-error'),
        validate: (v) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Please enter a valid email address'
      },
      subject: {
        el: document.getElementById('subject'),
        error: document.getElementById('subject-error'),
        validate: (v) => v.trim().length >= 3 || 'Subject must be at least 3 characters'
      },
      message: {
        el: document.getElementById('message'),
        error: document.getElementById('message-error'),
        validate: (v) => v.trim().length >= 10 || 'Message must be at least 10 characters'
      }
    };

    // Real-time validation on blur
    Object.values(fields).forEach(({ el, error, validate }) => {
      el.addEventListener('blur', () => validateField(el, error, validate));
      el.addEventListener('input', () => {
        if (el.classList.contains('error')) {
          validateField(el, error, validate);
        }
      });
    });

    DOM.contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearFormStatus();

      let isValid = true;
      const formData = {};

      Object.entries(fields).forEach(([key, { el, error, validate }]) => {
        const result = validateField(el, error, validate);
        if (!result.valid) isValid = false;
        formData[key] = el.value.trim();
      });

      if (!isValid) return;

      await submitForm(formData);
    });
  }

  function validateField(el, errorEl, validateFn) {
    const result = validateFn(el.value);
    const valid = result === true;

    el.classList.toggle('error', !valid);
    errorEl.textContent = valid ? '' : result;

    return { valid };
  }

  function clearFormStatus() {
    DOM.formStatus.className = 'form__status';
    DOM.formStatus.textContent = '';
  }

  function showFormStatus(message, type) {
    DOM.formStatus.className = `form__status ${type}`;
    DOM.formStatus.textContent = message;
  }

  async function submitForm(data) {
    DOM.submitBtn.disabled = true;
    const btnText = DOM.submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    btnText.textContent = 'Sending...';

    try {
      const response = await fetch(CONFIG.API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        showFormStatus('Thank you! Your message has been sent successfully.', 'success');
        DOM.contactForm.reset();
      } else {
        showFormStatus(result.message || 'Something went wrong. Please try again.', 'error');
      }
    } catch {
      // Fallback: show success for demo when backend is unavailable
      showFormStatus(
        'Message received! (Demo mode — start the backend server to save messages to the database.)',
        'success'
      );
      DOM.contactForm.reset();
    } finally {
      DOM.submitBtn.disabled = false;
      btnText.textContent = originalText;
    }
  }

  /* --------------------------------------------------------------------------
     Footer Current Year
     -------------------------------------------------------------------------- */
  function initFooter() {
    if (DOM.currentYear) {
      DOM.currentYear.textContent = new Date().getFullYear();
    }
  }

  /* --------------------------------------------------------------------------
     Initialize All Modules
     -------------------------------------------------------------------------- */
  function init() {
    initLoader();
    initTheme();
    initScrollEffects();
    initMobileNav();
    initSmoothScroll();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initFooter();
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

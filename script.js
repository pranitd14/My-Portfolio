/**
 * PRANIT BUILDS - PORTFOLIO INTERACTION LOGIC
 * Pure Vanilla JavaScript - No Frameworks or Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoadAnimation();
  initCustomCursor();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initExternalLinks();
  initActiveNavHighlight();
  initProjectFilters();
  initBackToTop();
  initScrollReveal();
  initCopyEmailButton();
});

/**
 * 1. Navbar Scroll Appearance
 */
function initNavbar() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 2. Mobile Menu Toggle
 */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle-btn');
  const mobileMenu = document.querySelector('.mobile-nav-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen.toString());
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 3. Smooth Scrolling with Header Offset
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.offsetHeight : 72;

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * 4. Open external links in a new tab while leaving in-page anchors alone.
 */
function initExternalLinks() {
  const links = document.querySelectorAll('a[href]');

  links.forEach((link) => {
    const href = link.getAttribute('href') || '';

    if (
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('javascript:')
    ) {
      return;
    }

    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
}

/**
 * 5. Active Navigation Link Highlighting
 */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-menu .mobile-nav-link');

  if (!sections.length) return;

  const updateActiveLink = () => {
    const scrollY = window.pageYOffset;
    const headerOffset = 120;

    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerOffset;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    // Default to home if near the top
    if (scrollY < 200 && sections[0]) {
      currentSectionId = sections[0].getAttribute('id');
    }

    // Update desktop links
    desktopLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });

    // Update mobile links
    mobileLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();
}

/**
 * 5. Project Filtering
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * 6. Back-to-Top Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  const handleScroll = () => {
    if (window.pageYOffset > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  };

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * 8. Scroll Reveal Animations (Subtle Fade-in via IntersectionObserver)
 */
function initScrollReveal() {
  // Query all key structural sections, project cards, and content elements
  const targetSelectors = [
    'section.section',
    '.section-header',
    '.project-card',
    '.skill-category-card',
    '.about-card',
    '.about-details-card',
    '.degree-card',
    '.school-card',
    '.contact-info-card',
    '.reveal-on-scroll'
  ];

  const elementsSet = new Set();
  targetSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      elementsSet.add(el);
    });
  });

  const revealElements = Array.from(elementsSet);
  if (!revealElements.length) return;

  // Add the base animation class to all targeted elements
  revealElements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
  });

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('revealed'));
    return;
  }

  // Intersection Observer configuration for smooth, subtle reveals
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -35px 0px',
    threshold: 0.08
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;

        // Apply subtle staggered delay for siblings inside grids (project cards, skill categories)
        const parent = target.parentElement;
        if (
          parent &&
          (parent.classList.contains('projects-grid') ||
            parent.classList.contains('skills-grid') ||
            parent.classList.contains('schooling-grid'))
        ) {
          const siblings = Array.from(parent.children).filter((item) =>
            item.classList.contains('reveal-on-scroll')
          );
          const index = siblings.indexOf(target);
          if (index > 0) {
            target.style.transitionDelay = `${Math.min(index * 0.09, 0.36)}s`;
          }
        }

        target.classList.add('revealed');
        obs.unobserve(target);
      }
    });
  }, observerOptions);

  // Observe each element or reveal smoothly if already in the initial viewport
  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(() => {
        el.classList.add('revealed');
      });
    } else {
      observer.observe(el);
    }
  });
}

/**
 * 9. Page Load Animation
 * Smoothly fades the entire main content container in once the document is fully ready.
 */
function initPageLoadAnimation() {
  const mainContent = document.getElementById('main-content');
  if (!mainContent) return;

  const triggerReveal = () => {
    requestAnimationFrame(() => {
      mainContent.classList.add('page-loaded');
    });
  };

  // If already loaded or interactive, reveal smoothly
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    triggerReveal();
  } else {
    window.addEventListener('load', triggerReveal);
  }
}

/**
 * 10. Copy Email to Clipboard
 */
function initCopyEmailButton() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('contact-email-val');
  if (!copyBtn || !emailTextEl) return;

  const emailToCopy = emailTextEl.textContent ? emailTextEl.textContent.trim() : 'pranitdeshmukh2153@gmail.com';
  const copyIcon = copyBtn.querySelector('.copy-icon');
  const checkIcon = copyBtn.querySelector('.check-icon');
  const textLabel = copyBtn.querySelector('.copy-text');

  let resetTimeout = null;

  copyBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(emailToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = emailToCopy;
        textarea.style.position = 'fixed';
        textarea.style.left = '-999999px';
        textarea.style.top = '-999999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Visual feedback
      copyBtn.classList.add('copied');
      if (copyIcon) copyIcon.style.display = 'none';
      if (checkIcon) checkIcon.style.display = 'inline-block';
      if (textLabel) textLabel.textContent = 'Copied!';
      copyBtn.setAttribute('aria-label', 'Email address copied to clipboard');

      if (resetTimeout) clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        copyBtn.classList.remove('copied');
        if (copyIcon) copyIcon.style.display = 'inline-block';
        if (checkIcon) checkIcon.style.display = 'none';
        if (textLabel) textLabel.textContent = 'Copy';
        copyBtn.setAttribute('aria-label', 'Copy email address to clipboard');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
      if (textLabel) textLabel.textContent = 'Error';
      setTimeout(() => {
        if (textLabel) textLabel.textContent = 'Copy';
      }, 1500);
    }
  });
}

/**
 * 11. Custom Interactive Cursor
 * Smoothly follows pointer with geometric trail, enters with a subtle bloom,
 * and morphs when hovering over interactive elements.
 */
function initCustomCursor() {
  // Respect touch devices and users preferring reduced motion
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!isFinePointer || prefersReducedMotion) {
    return;
  }

  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  if (!cursorDot || !cursorRing) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isVisible = false;
  let bloomTimeout = null;

  // Bring cursor to active state when it enters or moves on the screen
  const activateCursor = (x, y) => {
    mouseX = x;
    mouseY = y;

    if (!isVisible) {
      isVisible = true;
      ringX = mouseX;
      ringY = mouseY;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      cursorDot.classList.remove('cursor-hidden');
      cursorRing.classList.remove('cursor-hidden');
      cursorDot.classList.add('cursor-active');
      cursorRing.classList.add('cursor-active');

      // Entrance bloom effect when cursor comes onto the screen
      cursorRing.classList.remove('cursor-entering');
      void cursorRing.offsetWidth;
      cursorRing.classList.add('cursor-entering');

      if (bloomTimeout) clearTimeout(bloomTimeout);
      bloomTimeout = setTimeout(() => {
        cursorRing.classList.remove('cursor-entering');
      }, 450);
    }
  };

  const deactivateCursor = () => {
    isVisible = false;
    cursorDot.classList.remove('cursor-active', 'cursor-hover', 'cursor-card-hover', 'cursor-clicking');
    cursorRing.classList.remove('cursor-active', 'cursor-hover', 'cursor-card-hover', 'cursor-clicking', 'cursor-entering');
    cursorDot.classList.add('cursor-hidden');
    cursorRing.classList.add('cursor-hidden');
  };

  window.addEventListener('mousemove', (e) => {
    activateCursor(e.clientX, e.clientY);
  }, { passive: true });

  document.addEventListener('mouseenter', (e) => {
    activateCursor(e.clientX, e.clientY);
  });

  document.addEventListener('mouseleave', () => {
    deactivateCursor();
  });

  window.addEventListener('blur', () => {
    deactivateCursor();
  });

  // Clicking effect
  window.addEventListener('mousedown', () => {
    if (!isVisible) return;
    cursorDot.classList.add('cursor-clicking');
    cursorRing.classList.add('cursor-clicking');
  });

  window.addEventListener('mouseup', () => {
    cursorDot.classList.remove('cursor-clicking');
    cursorRing.classList.remove('cursor-clicking');
  });

  // Morph cursor when hovering over interactive elements
  const interactiveSelector = [
    'a',
    'button',
    '[role="button"]',
    'input',
    'textarea',
    'select',
    '.btn',
    '.nav-link',
    '.nav-resume-btn',
    '.filter-btn',
    '.project-card',
    '.contact-channel-item',
    '.copy-channel-btn',
    '.brand-logo',
    '.back-to-top-btn'
  ].join(', ');

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(interactiveSelector);
    if (!target) return;

    if (target.classList.contains('project-card')) {
      cursorRing.classList.add('cursor-card-hover');
    } else {
      cursorRing.classList.add('cursor-hover');
    }
    cursorDot.classList.add('cursor-hover');
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(interactiveSelector);
    if (!target) return;

    const related = e.relatedTarget ? e.relatedTarget.closest(interactiveSelector) : null;
    if (!related) {
      cursorRing.classList.remove('cursor-hover', 'cursor-card-hover');
      cursorDot.classList.remove('cursor-hover');
    } else if (related.classList.contains('project-card')) {
      cursorRing.classList.remove('cursor-hover');
      cursorRing.classList.add('cursor-card-hover');
    } else {
      cursorRing.classList.remove('cursor-card-hover');
      cursorRing.classList.add('cursor-hover');
    }
  });

  // High-performance smooth animation loop (Linear interpolation)
  const render = () => {
    if (isVisible) {
      const ease = 0.22;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
      cursorRing.style.left = `${ringX.toFixed(2)}px`;
      cursorRing.style.top = `${ringY.toFixed(2)}px`;
    }
    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}


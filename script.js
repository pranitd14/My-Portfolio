// Initialize particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        color: { value: "#00fff7" },
        shape: { 
            type: "circle",
            stroke: { width: 0, color: "#000000" }
        },
        opacity: { 
            value: 0.4,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: { 
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#00fff7",
            opacity: 0.2,
            width: 1
        },
        move: { 
            enable: true, 
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: { 
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: { 
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    let loaderTimer = null;

    function hideLoader() {
        if (!loadingScreen) return;
        loadingScreen.classList.add('hidden');
    }

    // Hide on full load
    window.addEventListener('load', function() {
        loaderTimer = setTimeout(hideLoader, 1500);
    });

    // Safety: hide if load is delayed/blocked
    setTimeout(() => {
        hideLoader();
    }, 6000);

    // Navigation functionality
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animated counters for stats
    function animateCounters() {
        // Auto-count skills
        const skillItems = document.querySelectorAll('.skill-item');
        const skillsCountElement = document.getElementById('skills-count');
        const skillsCount = skillItems.length;
        skillsCountElement.setAttribute('data-target', skillsCount);
        
        // Auto-count projects
        const projectCards = document.querySelectorAll('.project-card');
        const projectsCountElement = document.getElementById('projects-count');
        const projectsCount = projectCards.length;
        projectsCountElement.setAttribute('data-target', projectsCount);
        
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Skill bars animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger specific animations based on section
                if (entry.target.id === 'about') {
                    setTimeout(animateCounters, 500);
                }
                
                if (entry.target.id === 'skills') {
                    setTimeout(animateSkillBars, 500);
                }
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
        observer.observe(section);
    });

    // Form submission
    const contactForm = document.querySelector('.form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state to button
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#28a745';
                
                // Reset form
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 2000);
            }, 2000);
        });
    }

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation after loading
    setTimeout(() => {
        const nameElement = document.querySelector('.name');
        if (nameElement) {
            const originalText = nameElement.textContent;
            typeWriter(nameElement, originalText, 150);
        }
    }, 2000);

    // Parallax effect for blobs
    // (kept only once; later in the file it is conditionally re-applied for non-mobile)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.blob');

        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });


    // Project UI: filter + modal + neon timeline + tilt
    const projectCards = document.querySelectorAll('.project-card');

    function getProjectFromCard(card) {
        return {
            id: card.getAttribute('data-project-id'),
            category: card.getAttribute('data-category'),
            title: card.querySelector('.project-title')?.textContent?.trim() || 'Project',
            description: card.querySelector('.project-description')?.textContent?.trim() || '',
            tags: Array.from(card.querySelectorAll('.tech-tag')).map(t => t.textContent.trim()),
            github: card.getAttribute('data-github') || '#',
            live: card.getAttribute('data-live') || '#'
        };
    }

    // Filters
    const filtersRoot = document.querySelector('.projects-filters');
    if (filtersRoot) {
        const filterChips = Array.from(filtersRoot.querySelectorAll('.filter-chip'));

        filterChips.forEach(chip => {
            chip.addEventListener('click', function() {
                filterChips.forEach(c => c.classList.remove('active'));
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    const show = filter === 'All' || category === filter;
                    card.style.display = show ? '' : 'none';
                });
            });
        });
    }

    // Modal
    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.querySelector('[data-close-modal]');
    const modalCategoryEl = document.getElementById('project-modal-category');
    const modalTitleEl = document.getElementById('project-modal-title');
    const modalDescEl = document.getElementById('project-modal-description');
    const modalTechEl = document.getElementById('project-modal-tech');
    const modalGithubEl = document.getElementById('project-modal-github');
    const modalLiveEl = document.getElementById('project-modal-live');

    let lastFocusedEl = null;

    function openModalForCard(card) {
        if (!modalOverlay || !card) return;
        lastFocusedEl = document.activeElement;

        const project = getProjectFromCard(card);

        modalCategoryEl.textContent = project.category || 'Project';
        modalTitleEl.textContent = project.title;
        modalDescEl.textContent = project.description;

        modalTechEl.innerHTML = project.tags
            .map(t => `<span class="tech-tag">${t}</span>`)
            .join('');

        modalGithubEl.href = project.github;
        modalLiveEl.href = project.live;

        // Set accent bar color per project
        const accentBar = document.getElementById('modal-accent-bar');
        if (accentBar) {
            const banner = card.querySelector('.project-banner');
            const bannerClass = banner ? [...banner.classList].find(c => c.startsWith('banner-') && c !== 'banner-glow') : null;
            const gradients = {
                'banner-anime':   'linear-gradient(90deg, #6b0fa8, #00fff7)',
                'banner-news':    'linear-gradient(90deg, #0d7a3e, #00e5ff)',
                'banner-android': 'linear-gradient(90deg, #0055a5, #3ddc84)'
            };
            accentBar.style.background = gradients[bannerClass] || 'linear-gradient(135deg, #00fff7, #0044ff)';
        }

        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        modalCloseBtn?.focus();

        projectCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        projectCards.forEach(c => c.classList.remove('active'));
        if (lastFocusedEl && lastFocusedEl.focus) lastFocusedEl.focus();
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', closeModal);
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Open modal from card/button
    projectCards.forEach(card => {
        // click on details button
        const btn = card.querySelector('[data-open-modal]');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModalForCard(card);
            });
        }

        // keyboard activation
        card.addEventListener('click', () => openModalForCard(card));
    });


    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const px = (x / rect.width) * 100;
                const py = (y / rect.height) * 100;

                card.style.setProperty('--mx', `${px}%`);
                card.style.setProperty('--my', `${py}%`);

                const rotateY = ((x - rect.width / 2) / rect.width) * 10;
                const rotateX = -((y - rect.height / 2) / rect.height) * 10;

                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--mx');
                card.style.removeProperty('--my');
                card.style.transform = '';
            });
        });
    }


    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple effect CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 600ms linear;
            background-color: rgba(255, 255, 255, 0.6);
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Apply ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
    });

    // Cursor trail effect
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    document.body.appendChild(cursor);

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-trail {
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #00fff7, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.6;
            transition: transform 0.1s ease;
        }
    `;
    document.head.appendChild(cursorStyle);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });

    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }

    // Hide cursor trail on mobile
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }

    // Initialize ScrollReveal for additional animations (disabled on mobile for performance)
    if (typeof ScrollReveal !== 'undefined' && window.innerWidth > 768) {
        ScrollReveal().reveal('.feature-item', {
            delay: 200,
            distance: '50px',
            origin: 'bottom',
            interval: 100
        });

        ScrollReveal().reveal('.skill-item', {
            delay: 100,
            distance: '30px',
            origin: 'left',
            interval: 50
        });

        ScrollReveal().reveal('.project-card', {
            delay: 200,
            distance: '50px',
            origin: 'bottom',
            interval: 150
        });

        ScrollReveal().reveal('.contact-item', {
            delay: 100,
            distance: '30px',
            origin: 'right',
            interval: 100
        });
    }

    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply throttling to scroll events
    const throttledScroll = throttle(function() {
        // Scroll-dependent animations here
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScroll);

    console.log('🚀 Portfolio loaded successfully!');
});
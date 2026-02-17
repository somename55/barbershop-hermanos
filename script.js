// ===== NAVIGATION FUNCTIONALITY =====
class Navigation {
  constructor() {
    this.nav = document.getElementById('nav');
    this.navToggle = document.getElementById('navToggle');
    this.navLinks = document.getElementById('navLinks');
    this.navLinksItems = document.querySelectorAll('.nav-links a');
    
    this.init();
  }
  
  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScroll();
    
    // Event listeners
    window.addEventListener('scroll', () => this.handleScroll());
    this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Close mobile menu when clicking on links
    this.navLinksItems.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.navLinks?.classList.contains('open')) {
        this.closeMobileMenu();
      }
    });
  }
  
  handleScroll() {
    if (!this.nav) return;
    
    const scrolled = window.scrollY > 50;
    this.nav.classList.toggle('scrolled', scrolled);
  }
  
  toggleMobileMenu() {
    if (!this.navLinks || !this.navToggle) return;
    
    this.navLinks.classList.toggle('open');
    this.navToggle.classList.toggle('open');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = this.navLinks.classList.contains('open') ? 'hidden' : '';
  }
  
  closeMobileMenu() {
    if (!this.navLinks || !this.navToggle) return;
    
    this.navLinks.classList.remove('open');
    this.navToggle.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  handleSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.init();
  }
  
  init() {
    // Add animation classes to elements that should animate
    this.addAnimationClasses();
    
    // Create intersection observer
    this.createObserver();
    
    // Observe elements
    this.observeElements();
  }
  
  addAnimationClasses() {
    // Add fade-in class to various elements
    const fadeInElements = [
      '.section-header',
      '.about-content',
      '.service-item',
      '.gallery-item',
      '.testimonial-content',
      '.hours-table',
      '.location-info',
      '.cta-content'
    ];
    
    fadeInElements.forEach(selector => {
      document.querySelectorAll(selector).forEach((el, index) => {
        el.classList.add('fade-in');
        // Add staggered delays for similar elements
        if (selector === '.service-item' || selector === '.gallery-item') {
          el.style.transitionDelay = `${index * 100}ms`;
        }
      });
    });
    
    // Add side animations for specific elements
    document.querySelectorAll('.about-content').forEach(el => {
      el.classList.remove('fade-in');
      el.classList.add('fade-in-left');
    });
    
    document.querySelectorAll('.about-image').forEach(el => {
      el.classList.add('fade-in-right');
    });
  }
  
  createObserver() {
    const options = {
      root: null,
      rootMargin: '-100px 0px',
      threshold: 0.1
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve after animation to improve performance
          this.observer.unobserve(entry.target);
        }
      });
    }, options);
  }
  
  observeElements() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
      this.observer.observe(el);
    });
  }
}

// ===== ENHANCED USER INTERACTIONS =====
class EnhancedInteractions {
  constructor() {
    this.init();
  }
  
  init() {
    this.handleServiceHovers();
    this.handleGalleryInteractions();
    this.handleButtonHovers();
    this.handleParallaxEffects();
    this.handleHeroAnimations();
  }
  
  handleServiceHovers() {
    const serviceItems = document.querySelectorAll('.service-item');
    
    serviceItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Add subtle glow effect
        item.style.boxShadow = '0 8px 32px rgba(201, 168, 76, 0.15)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.boxShadow = '';
      });
    });
  }
  
  handleGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('mouseenter', () => {
        // Dim other gallery items slightly
        galleryItems.forEach(other => {
          if (other !== item) {
            other.style.opacity = '0.7';
          }
        });
      });
      
      item.addEventListener('mouseleave', () => {
        // Restore opacity to all items
        galleryItems.forEach(other => {
          other.style.opacity = '';
        });
      });
    });
  }
  
  handleButtonHovers() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
      // Add ripple effect on click
      button.addEventListener('click', (e) => {
        if (button.href && button.href.includes('#')) return; // Skip for anchor links
        
        const ripple = document.createElement('div');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
          z-index: 1;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add CSS for ripple animation
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  handleParallaxEffects() {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
      let ticking = false;
      
      const updateParallax = () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        heroContent.style.transform = `translateY(${rate}px)`;
        ticking = false;
      };
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      });
    }
  }
  
  handleHeroAnimations() {
    const heroStar = document.querySelector('.hero-star');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Hide scroll indicator after user starts scrolling
    if (scrollIndicator) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          scrollIndicator.style.opacity = '0';
        } else {
          scrollIndicator.style.opacity = '0.6';
        }
      });
    }
    
    // Add subtle rotation to hero star on hover
    if (heroStar) {
      heroStar.addEventListener('mouseenter', () => {
        heroStar.style.transform = 'rotate(180deg) scale(1.05)';
        heroStar.style.transition = 'transform 0.8s ease-out';
      });
      
      heroStar.addEventListener('mouseleave', () => {
        heroStar.style.transform = 'rotate(0deg) scale(1)';
      });
    }
  }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.debounceScrollEvents();
  }
  
  lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            // Create a new image element to preload
            const newImg = new Image();
            newImg.onload = () => {
              img.src = newImg.src;
              img.classList.add('loaded');
            };
            newImg.src = img.dataset.src || img.src;
            
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    }
  }
  
  preloadCriticalResources() {
    // Preload hero background image
    const heroImg = new Image();
    heroImg.src = 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80';
    
    // Preload critical fonts
    const fontLinks = [
      'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&display=swap',
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap',
      'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap'
    ];
    
    fontLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      document.head.appendChild(link);
    });
  }
  
  debounceScrollEvents() {
    let scrollTimer;
    const originalScroll = window.onscroll;
    
    window.onscroll = () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      scrollTimer = setTimeout(() => {
        if (originalScroll) {
          originalScroll();
        }
      }, 10);
    };
  }
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
class AccessibilityEnhancements {
  constructor() {
    this.init();
  }
  
  init() {
    this.addKeyboardNavigation();
    this.addFocusIndicators();
    this.addARIALabels();
    this.addReducedMotionSupport();
  }
  
  addKeyboardNavigation() {
    // Allow keyboard navigation for gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          item.click();
        }
      });
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navLinks = document.getElementById('navLinks');
        if (navLinks?.classList.contains('open')) {
          new Navigation().closeMobileMenu();
        }
      }
    });
  }
  
  addFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
      .btn:focus-visible,
      .nav-links a:focus-visible,
      .gallery-item:focus-visible {
        outline: 2px solid var(--gold-primary);
        outline-offset: 4px;
      }
      
      .nav-toggle:focus-visible {
        outline: 2px solid var(--gold-primary);
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);
  }
  
  addARIALabels() {
    // Add ARIA labels to interactive elements
    document.querySelectorAll('.gallery-item').forEach((item, index) => {
      const img = item.querySelector('img');
      const alt = img?.alt || `Gallery image ${index + 1}`;
      item.setAttribute('aria-label', `View ${alt}`);
    });
    
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    const skipStyle = document.createElement('style');
    skipStyle.textContent = `
      .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--gold-primary);
        color: var(--black);
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
        transition: top 0.3s;
      }
      
      .skip-link:focus {
        top: 6px;
      }
    `;
    
    document.head.appendChild(skipStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.setAttribute('id', 'main-content');
      heroSection.setAttribute('role', 'main');
    }
  }
  
  addReducedMotionSupport() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        .hero-star {
          animation: none !important;
        }
        
        .scroll-line {
          animation: none !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
}

// ===== CONTACT FUNCTIONALITY =====
class ContactFunctionality {
  constructor() {
    this.init();
  }
  
  init() {
    this.enhanceContactButtons();
    this.addAnalytics();
  }
  
  enhanceContactButtons() {
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
    
    // Add click tracking for WhatsApp buttons
    whatsappButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Track WhatsApp clicks
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: 'contact',
            event_label: 'whatsapp'
          });
        }
      });
    });
    
    // Add click tracking for phone buttons
    phoneButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Track phone clicks
        if (typeof gtag !== 'undefined') {
          gtag('event', 'click', {
            event_category: 'contact',
            event_label: 'phone'
          });
        }
      });
    });
  }
  
  addAnalytics() {
    // Track scroll depth
    const scrollDepths = [25, 50, 75, 100];
    const trackedDepths = new Set();
    
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      scrollDepths.forEach(depth => {
        if (scrollPercent >= depth && !trackedDepths.has(depth)) {
          trackedDepths.add(depth);
          
          if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
              event_category: 'engagement',
              event_label: `${depth}%`
            });
          }
        }
      });
    });
  }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new Navigation();
  new ScrollAnimations();
  new EnhancedInteractions();
  new PerformanceOptimizer();
  new AccessibilityEnhancements();
  new ContactFunctionality();
  
  console.log('🌟 A Star Barber website loaded successfully');
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
  console.warn('Script error:', e.error);
  
  // Fallback for critical functionality
  if (!document.querySelector('.nav.scrolled')) {
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('nav');
      if (nav) {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      }
    });
  }
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navigation,
    ScrollAnimations,
    EnhancedInteractions,
    PerformanceOptimizer,
    AccessibilityEnhancements,
    ContactFunctionality
  };
}
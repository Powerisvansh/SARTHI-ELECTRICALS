// ===== PAGE TRANSITION =====
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease-out';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);
});

// ===== ENHANCED BUTTON INTERACTIONS =====
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });

  btn.addEventListener('mousedown', function() {
    this.style.transform = 'translateY(-1px) scale(0.98)';
  });

  btn.addEventListener('mouseup', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
  });
});

// ===== SCROLL PROGRESS =====
const progressBar = document.querySelector('.scroll-progress');

if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.setProperty('--progress', progress + '%');
  });
}

// ===== MOBILE MENU WITH SMOOTH ANIMATION =====
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.style.transform = isOpen ? 'rotate(90deg)' : 'rotate(0deg)';
    
    menuToggle.innerHTML = isOpen
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
  });

  mobileMenu.querySelectorAll('a').forEach((link, index) => {
    link.style.opacity = '0';
    link.style.animation = `slideInLeft 0.3s ease-out ${0.05 * index}s forwards`;
    
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.style.transform = 'rotate(0deg)';
      menuToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
    });
  });
}

// Add animation keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);

// ===== HEADER SCROLL EFFECT WITH BLUR =====
const header = document.querySelector('.header');
let lastScroll = 0;

if (header) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
}

// ===== ENHANCED SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `slideInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.1}s forwards`;
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, suffix = '') {
  const duration = 2000;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * target);

    if (target % 1 !== 0) {
      element.textContent = (easeOut * target).toFixed(1) + suffix;
    } else {
      element.textContent = current + suffix;
    }

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  }

  requestAnimationFrame(update);
}

const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const num = parseFloat(text) || 0;
        const suffix = text.replace(/[\d.]/g, '');
        animateCounter(el, num, suffix);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach(el => counterObserver.observe(el));

// ===== CUSTOM SMOOTH SCROLL =====
function smoothScrollTo(targetY, duration = 800) {
  const startY = window.pageYOffset;
  const diff = targetY - startY;
  const startTime = performance.now();

  function ease(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function step(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + diff * ease(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

document.addEventListener('click', e => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  e.preventDefault();
  smoothScrollTo(target.getBoundingClientRect().top + window.pageYOffset - 80);
});

// ===== ENHANCED BACK TO TOP =====
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    smoothScrollTo(0);
  });
  
  // Add hover glow effect
  backToTop.addEventListener('mouseenter', function() {
    this.style.boxShadow = '0 12px 40px rgba(37, 99, 235, 0.5), 0 0 0 0 rgba(37, 99, 235, 0.7)';
  });
  
  backToTop.addEventListener('mouseleave', function() {
    this.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
  });
}

// ===== ACTIVE NAV LINK =====
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === 'index.html' && href === '/')) {
    link.classList.add('active');
  }
});

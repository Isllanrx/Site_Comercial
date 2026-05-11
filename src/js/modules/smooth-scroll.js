import { getElements, addEventListenerSafe, log } from '../utils/helpers.js';

class SmoothScrollManager {
  constructor() {
    this.isInitialized = false;
    this.scrollOffset = 70;
  }

  async init() {
    try {
      log('Inicializando smooth scroll...');
      this.setupSmoothScrollLinks();
      this.setupCustomScrollBehavior();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar smooth scroll:', error);
    }
  }

  setupSmoothScrollLinks() {
    const anchorLinks = getElements('a[href^="#"]');
    anchorLinks.forEach(link => {
      addEventListenerSafe(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          this.scrollToElement(targetElement);
        }
      });
    });
  }

  setupCustomScrollBehavior() {
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      this.polyfillSmoothScroll();
    }
  }

  scrollToElement(element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - this.scrollOffset;
    this.smoothScrollTo(offsetPosition);
  }

  smoothScrollTo(targetPosition) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) * 0.5, 1000);
    let start = null;

    const animation = (currentTime) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    requestAnimationFrame(animation);
  }

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  polyfillSmoothScroll() {
    const links = getElements('a[href^="#"]');
    links.forEach(link => {
      addEventListenerSafe(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - this.scrollOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  scrollToTop() {
    this.smoothScrollTo(0);
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      this.scrollToElement(element);
    }
  }

  destroy() {
    this.isInitialized = false;
    log('Smooth scroll destruído');
  }
}

export default new SmoothScrollManager();

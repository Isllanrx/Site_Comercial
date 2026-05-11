import { SELECTORS, TIMING } from '../utils/constants.js';
import { 
  getElements, 
  isInViewport,
  log
} from '../utils/helpers.js';

class CountersManager {
  constructor() {
    this.counters = [];
    this.isInitialized = false;
    this.hasAnimated = false;
  }

  async init() {
    try {
      log('Inicializando modulo Counters...');
      this.counters = getElements(SELECTORS.statNumbers) || 
                     document.querySelectorAll('.stat__number');
      
      if (!this.counters.length) return;

      this.setupScrollTrigger();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar contadores:', error);
    }
  }

  setupScrollTrigger() {
    const checkCounters = () => {
      if (this.hasAnimated) return;
      if (this.counters[0] && isInViewport(this.counters[0])) {
        this.animateCounters();
        this.hasAnimated = true;
      }
    };
    window.addEventListener('scroll', checkCounters);
    checkCounters();
    setTimeout(() => {
      if (!this.hasAnimated) {
        this.animateCounters();
        this.hasAnimated = true;
      }
    }, 2000);
  }

  animateCounters() {
    this.counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (isNaN(target) || target <= 0) return;
      
      counter.textContent = '0';
      const duration = TIMING.counterAnimationDuration;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      let step = 0;
      
      const updateCounter = () => {
        if (step < steps) {
          current += increment;
          counter.textContent = Math.floor(current);
          step++;
          setTimeout(updateCounter, duration / steps);
        } else {
          counter.textContent = target;
        }
      };
      setTimeout(updateCounter, 100);
    });
  }

  destroy() {
    this.isInitialized = false;
    log('Modulo Counters destruido');
  }
}

export default new CountersManager();

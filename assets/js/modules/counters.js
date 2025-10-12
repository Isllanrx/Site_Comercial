// ===== COUNTERS MODULE =====
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
      log('Inicializando módulo Counters...');
      
      // Try multiple selectors to find counters
      this.counters = getElements(SELECTORS.statNumbers) || 
                     document.querySelectorAll('.stat__number') ||
                     document.querySelectorAll('[data-target]');
      
      if (!this.counters.length) {
        console.error('Contadores não encontrados, tentando novamente...');
        // Try again after a delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.counters = getElements(SELECTORS.statNumbers) || 
                       document.querySelectorAll('.stat__number') ||
                       document.querySelectorAll('[data-target]');
        
        if (!this.counters.length) {
          console.error('Contadores ainda não encontrados após retry');
          return;
        }
      }

      log(`Encontrados ${this.counters.length} contadores:`, this.counters);
      this.setupScrollTrigger();
      
      this.isInitialized = true;
      log(`${this.counters.length} contadores inicializados`);
      
    } catch (error) {
      console.error('Erro ao inicializar contadores:', error);
    }
  }

  setupScrollTrigger() {
    const checkCounters = () => {
      if (this.hasAnimated) return;
      
      const firstCounter = this.counters[0];
      if (firstCounter && isInViewport(firstCounter)) {
        this.animateCounters();
        this.hasAnimated = true;
      }
    };

    // Check on scroll
    window.addEventListener('scroll', checkCounters);
    
    // Check immediately
    checkCounters();
    
    // Force animation after 500ms regardless of scroll
    setTimeout(() => {
      if (!this.hasAnimated) {
        log('Forçando animação dos contadores após timeout');
        this.animateCounters();
        this.hasAnimated = true;
      }
    }, 500);
    
    // Also force animation after 2 seconds as backup
    setTimeout(() => {
      if (!this.hasAnimated) {
        log('Forçando animação dos contadores - backup');
        this.animateCounters();
        this.hasAnimated = true;
      }
    }, 2000);
  }

  animateCounters() {
    log('Iniciando animação dos contadores...');
    
    this.counters.forEach((counter, index) => {
      const target = parseInt(counter.getAttribute('data-target'));
      
      if (isNaN(target) || target <= 0) {
        log(`Contador ${index} tem target inválido:`, target);
        return;
      }
      
      // Reset counter to 0 first
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
          log(`Contador ${index} finalizado com valor:`, target);
        }
      };
      
      // Start animation with delay
      setTimeout(updateCounter, 100 + (index * 50));
    });
  }

  reset() {
    this.hasAnimated = false;
    this.counters.forEach(counter => {
      counter.textContent = '0';
    });
    log('Contadores resetados');
  }

  destroy() {
    this.isInitialized = false;
    log('Módulo Counters destruído');
  }
}

// Export singleton instance
export default new CountersManager();

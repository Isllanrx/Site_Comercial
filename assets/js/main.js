// ===== MAIN APPLICATION =====
import { TIMING } from './utils/constants.js';
import { log, wait } from './utils/helpers.js';
import heroManager from './modules/hero.js';
import navigationManager from './modules/navigation.js';
import testimonialsManager from './modules/testimonials.js';
import countersManager from './modules/counters.js';
import instagramManager from './modules/instagram.js';
import countdownManager from './modules/countdown.js';
import scrollEffectsManager from './modules/scroll-effects.js';
import imageFallbackManager from './modules/image-fallback.js';
import onlineCounterManager from './modules/online-counter.js';
import smoothScrollManager from './modules/smooth-scroll.js';

class PauloVeiculosApp {
  constructor() {
    this.isInitialized = false;
    this.modules = {
      hero: heroManager,
      navigation: navigationManager,
      testimonials: testimonialsManager,
      counters: countersManager,
      instagram: instagramManager,
      countdown: countdownManager,
      scrollEffects: scrollEffectsManager,
      imageFallback: imageFallbackManager,
      onlineCounter: onlineCounterManager,
      smoothScroll: smoothScrollManager
    };
  }

  async init() {
    try {
      log('🚗 Iniciando Paulo Veículos App...');
      
      // Wait for DOM to be fully ready
      await wait(TIMING.initDelay);
      
      // Initialize all modules
      await this.initializeModules();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      this.isInitialized = true;
      log('✅ Paulo Veículos App inicializado com sucesso!');
      
    } catch (error) {
      console.error('❌ Erro na inicialização:', error);
    }
  }

  async initializeModules() {
    try {
      log('Inicializando módulos...');
      
      // Initialize all modules in order
      await this.modules.imageFallback.init();
      await this.modules.smoothScroll.init();
      await this.modules.navigation.init();
      await this.modules.hero.init();
      
      
      await this.modules.instagram.init();
      await this.modules.testimonials.init();
      await this.modules.counters.init();
      await this.modules.countdown.init();
      await this.modules.onlineCounter.init();
      await this.modules.scrollEffects.init();
      
      log('Todos os módulos inicializados');
    } catch (error) {
      console.error('Erro ao inicializar módulos:', error);
    }
  }

  setupGlobalEvents() {
    // Handle page visibility changes - only pause testimonials, keep hero running
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        if (this.modules.testimonials.isInitialized) {
          this.modules.testimonials.stopAutoPlay();
        }
      } else {
        // Resume testimonials when page becomes visible
        if (this.modules.testimonials.isInitialized) {
          this.modules.testimonials.startAutoPlay();
        }
      }
    });

    // Handle window resize
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    log('Event listeners globais configurados');
  }


  handleResize() {
    // Handle responsive adjustments if needed
    log('Window resized');
  }

  debounce(func, wait) {
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

  destroy() {
    // Cleanup all modules
    Object.values(this.modules).forEach(module => {
      if (module.destroy) {
        module.destroy();
      }
    });
    
    this.isInitialized = false;
    log('App destruído');
  }
}

// Initialize app when DOM is ready
const app = new PauloVeiculosApp();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => app.init());
} else {
  app.init();
}

// Export for global access if needed
window.PauloVeiculosApp = app;

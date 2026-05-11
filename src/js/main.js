// ===== MAIN APPLICATION =====
import { TIMING } from './utils/constants.js';
import { log, wait } from './utils/helpers.js';
import { initPolyfills } from './utils/polyfills.js';
import { registerSW } from './utils/sw-register.js';
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
import simulatorManager from './modules/simulator.js';

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
      smoothScroll: smoothScrollManager,
      simulator: simulatorManager
    };
  }

  async init() {
    try {
      log('Iniciando Paulo Veiculos App...');
      
      initPolyfills();
      registerSW();
      
      await wait(TIMING.initDelay);
      
      await this.initializeModules();
      this.setupGlobalEvents();
      
      this.isInitialized = true;
      log('Paulo Veiculos App inicializado com sucesso!');
      
    } catch (error) {
      console.error('Erro na inicializacao:', error);
    }
  }

  async initializeModules() {
    try {
      log('Inicializando módulos...');
      
      // Force initialization with immediate fallback
      await this.forceInitializeModules();
      
      log('Todos os módulos inicializados');
    } catch (error) {
      console.error('Erro ao inicializar módulos:', error);
      // Continue even if some modules fail
      this.initializeFallbackContent();
    }
  }

  async forceInitializeModules() {
    // Initialize basic modules first
    try {
      await this.modules.imageFallback.init();
    } catch (e) { console.warn('ImageFallback falhou:', e); }
    
    try {
      await this.modules.smoothScroll.init();
    } catch (e) { console.warn('SmoothScroll falhou:', e); }
    
    try {
      await this.modules.navigation.init();
    } catch (e) { console.warn('Navigation falhou:', e); }
    
    try {
      await this.modules.hero.init();
    } catch (e) { console.warn('Hero falhou:', e); }
    
    // Initialize counters first to ensure they work
    try {
      await this.modules.counters.init();
    } catch (e) { console.warn('Counters falhou:', e); }
    
    // Force Instagram and Testimonials with immediate fallback
    try {
      await this.modules.instagram.init();
    } catch (error) {
      console.error('Instagram falhou, usando fallback:', error);
      this.modules.instagram.forceFallbackContent();
    }
    
    try {
      await this.modules.testimonials.init();
    } catch (error) {
      console.error('Testimonials falhou, usando fallback:', error);
      this.modules.testimonials.forceFallbackContent();
    }
    
    // Initialize remaining modules
    try {
      await this.modules.countdown.init();
    } catch (e) { console.warn('Countdown falhou:', e); }
    
    try {
      await this.modules.onlineCounter.init();
    } catch (e) { console.warn('OnlineCounter falhou:', e); }
    
    try {
      await this.modules.scrollEffects.init();
    } catch (e) { console.warn('ScrollEffects falhou:', e); }

    try {
      await this.modules.simulator.init();
    } catch (e) { console.warn('Simulator falhou:', e); }
  }

  async initializeModulesSequence() {
    // Initialize all modules in order
    await this.modules.imageFallback.init();
    await this.modules.smoothScroll.init();
    await this.modules.navigation.init();
    await this.modules.hero.init();
    
    // Initialize Instagram and Testimonials with individual error handling
    try {
      await this.modules.instagram.init();
    } catch (error) {
      console.error('Erro ao inicializar Instagram:', error);
    }
    
    try {
      await this.modules.testimonials.init();
    } catch (error) {
      console.error('Erro ao inicializar depoimentos:', error);
    }
    
    await this.modules.counters.init();
    await this.modules.countdown.init();
    await this.modules.onlineCounter.init();
    await this.modules.scrollEffects.init();
  }

  initializeFallbackContent() {
    // Ensure basic functionality works even if modules fail
    log('Inicializando conteúdo de fallback...');
    
    // Try to hide loading states
    const instagramLoading = document.querySelector('#instagram-grid .instagram__loading');
    if (instagramLoading) {
      instagramLoading.style.display = 'none';
    }
    
    const testimonialsLoading = document.querySelector('#testimonials-carousel .testimonials__loading');
    if (testimonialsLoading) {
      testimonialsLoading.style.display = 'none';
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

    // Handle external resource failures
    window.addEventListener('error', (e) => {
      if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'IFRAME') {
        console.warn('⚠️ Recurso externo falhou:', e.target.href || e.target.src);
        this.handleResourceFailure(e.target);
      }
    }, true);

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.warn('⚠️ Promise rejeitada:', e.reason);
      // Prevent the default browser behavior
      e.preventDefault();
    });

    log('Event listeners globais configurados');
  }


  handleResize() {
    // Handle responsive adjustments if needed
    log('Window resized');
  }

  handleResourceFailure(element) {
    // Handle different types of resource failures
    if (element.tagName === 'LINK') {
      // Font or CSS failure
      if (element.href.includes('fonts.googleapis.com')) {
        console.warn('Google Fonts falhou, usando fallback');
        // The onerror handler in HTML will handle the fallback
      } else if (element.href.includes('font-awesome')) {
        console.warn('Font Awesome falhou, usando fallback');
        // The onerror handler in HTML will handle the fallback
      }
    } else if (element.tagName === 'IFRAME') {
      // Google Maps failure
      console.warn('Google Maps falhou, mostrando fallback');
      // The onerror handler in HTML will handle the fallback
    }
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

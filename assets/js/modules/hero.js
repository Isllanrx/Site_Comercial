// ===== HERO CAROUSEL MODULE =====
import { SELECTORS, CLASSES, TIMING } from '../utils/constants.js';
import { 
  getElement, 
  getElements, 
  addEventListenerSafe, 
  removeClassFromAll, 
  addClassSafe,
  log
} from '../utils/helpers.js';

class HeroManager {
  constructor() {
    this.carousel = null;
    this.slides = [];
    this.indicators = [];
    this.currentIndex = 0;
    this.interval = null;
    this.isInitialized = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  async init() {
    try {
      log('Inicializando módulo Hero...');
      
      this.carousel = getElement(SELECTORS.heroCarousel);
      this.slides = getElements(SELECTORS.heroSlides);
      this.indicators = getElements(SELECTORS.heroIndicators);
      
      if (!this.carousel || !this.slides.length) {
        log('Hero carousel não encontrado');
        return;
      }

      this.setupEventListeners();
      this.setupTouchEvents();
      this.show(0);
      
      // Aguardar um pouco antes de iniciar o auto-play
      setTimeout(() => {
        this.startAutoPlay();
      }, 1000);
      
      this.isInitialized = true;
      log(`Hero inicializado com ${this.slides.length} slides`);
      
    } catch (error) {
      console.error('Erro ao inicializar hero:', error);
    }
  }

  setupEventListeners() {
    const prevBtn = getElement(SELECTORS.heroPrev);
    const nextBtn = getElement(SELECTORS.heroNext);
    
    if (prevBtn) {
      addEventListenerSafe(prevBtn, 'click', (e) => {
        e.preventDefault();
        this.prev();
      });
    }
    
    if (nextBtn) {
      addEventListenerSafe(nextBtn, 'click', (e) => {
        e.preventDefault();
        this.next();
      });
    }

    // Indicator clicks
    this.indicators.forEach((indicator, index) => {
      addEventListenerSafe(indicator, 'click', () => {
        this.show(index);
        this.resetAutoPlay();
      });
    });

    // Pause on hover
    if (this.carousel) {
      addEventListenerSafe(this.carousel, 'mouseenter', () => {
        this.stopAutoPlay();
      });
      
      addEventListenerSafe(this.carousel, 'mouseleave', () => {
        this.startAutoPlay();
      });
    }
  }

  setupTouchEvents() {
    // Touch events for mobile swipe
    if (!this.carousel) return;
    
    addEventListenerSafe(this.carousel, 'touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    addEventListenerSafe(this.carousel, 'touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.next();
      } else {
        this.prev();
      }
    }
  }

  show(index) {
    if (!this.slides.length || index < 0 || index >= this.slides.length) {
      log(`Erro: índice ${index} inválido. Slides disponíveis: ${this.slides.length}`);
      return;
    }
    
    log(`Tentando mostrar slide ${index + 1} de ${this.slides.length}`);
    
    removeClassFromAll(this.slides, CLASSES.active);
    removeClassFromAll(this.indicators, CLASSES.active);
    
    // Add active class to current slide
    addClassSafe(this.slides[index], CLASSES.active);
    if (this.indicators[index]) {
      addClassSafe(this.indicators[index], CLASSES.active);
    }
    
    this.currentIndex = index;
    log(`Slide ${index + 1} ativado com sucesso`);
  }

  next() {
    if (!this.slides.length) return;
    
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.show(nextIndex);
  }

  prev() {
    if (!this.slides.length) return;
    
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.show(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    log(`Iniciando auto-play com intervalo de ${TIMING.heroCarouselInterval}ms`);
    log(`Slides disponíveis: ${this.slides.length}`);
    log(`Índice atual: ${this.currentIndex}`);
    
    this.interval = setInterval(() => {
      log(`Auto-play: mudando do slide ${this.currentIndex} para o próximo`);
      this.next();
    }, TIMING.heroCarouselInterval);
    
    log('Auto-play do hero iniciado');
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // Método para teste manual
  testCarousel() {
    log('=== TESTE DO CARROSSEL ===');
    log(`Slides encontrados: ${this.slides.length}`);
    log(`Indicadores encontrados: ${this.indicators.length}`);
    log(`Índice atual: ${this.currentIndex}`);
    log(`Auto-play ativo: ${this.interval ? 'SIM' : 'NÃO'}`);
    
    // Testar mudança manual
    this.next();
    log('Teste de mudança manual executado');
  }

  destroy() {
    this.stopAutoPlay();
    this.isInitialized = false;
    log('Módulo Hero destruído');
  }
}

// Export singleton instance
export default new HeroManager();

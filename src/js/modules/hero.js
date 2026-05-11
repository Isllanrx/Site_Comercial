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
      log('Inicializando modulo Hero...');
      this.carousel = getElement(SELECTORS.heroCarousel);
      this.slides = getElements(SELECTORS.heroSlides);
      this.indicators = getElements(SELECTORS.heroIndicators);
      
      if (!this.carousel || !this.slides.length) return;

      this.setupEventListeners();
      this.setupTouchEvents();
      this.show(0);
      
      setTimeout(() => {
        this.startAutoPlay();
      }, 1000);
      
      this.isInitialized = true;
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
    this.indicators.forEach((indicator, index) => {
      addEventListenerSafe(indicator, 'click', () => {
        this.show(index);
        this.resetAutoPlay();
      });
    });
    if (this.carousel) {
      addEventListenerSafe(this.carousel, 'mouseenter', () => this.stopAutoPlay());
      addEventListenerSafe(this.carousel, 'mouseleave', () => this.startAutoPlay());
    }
  }

  setupTouchEvents() {
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
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? this.next() : this.prev();
    }
  }

  show(index) {
    if (!this.slides.length || index < 0 || index >= this.slides.length) return;
    removeClassFromAll(this.slides, CLASSES.active);
    removeClassFromAll(this.indicators, CLASSES.active);
    addClassSafe(this.slides[index], CLASSES.active);
    if (this.indicators[index]) addClassSafe(this.indicators[index], CLASSES.active);
    this.currentIndex = index;
  }

  next() {
    const nextIndex = (this.currentIndex + 1) % this.slides.length;
    this.show(nextIndex);
  }

  prev() {
    const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
    this.show(prevIndex);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.interval = setInterval(() => this.next(), TIMING.heroCarouselInterval);
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

  destroy() {
    this.stopAutoPlay();
    this.isInitialized = false;
    log('Modulo Hero destruido');
  }
}

export default new HeroManager();

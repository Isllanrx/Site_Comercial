import { SELECTORS, TIMING } from '../utils/constants.js';
import { 
  getElements, 
  isInViewport,
  addClassSafe,
  debounce,
  log
} from '../utils/helpers.js';

class ScrollEffectsManager {
  constructor() {
    this.revealElements = [];
    this.isInitialized = false;
  }

  async init() {
    try {
      log('Inicializando modulo Scroll Effects...');
      this.revealElements = getElements(SELECTORS.scrollRevealElements);
      if (!this.revealElements.length) {
        log('Elementos de scroll reveal nao encontrados');
        return;
      }
      this.setupScrollListener();
      this.checkElements();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar scroll effects:', error);
    }
  }

  setupScrollListener() {
    const debouncedCheck = debounce(() => {
      this.checkElements();
    }, TIMING.scrollDebounceDelay);
    window.addEventListener('scroll', debouncedCheck);
    window.addEventListener('resize', debouncedCheck);
  }

  checkElements() {
    this.revealElements.forEach(element => {
      if (isInViewport(element)) {
        addClassSafe(element, 'revealed');
      }
    });
  }

  destroy() {
    this.isInitialized = false;
    log('Modulo Scroll Effects destruido');
  }
}

export default new ScrollEffectsManager();

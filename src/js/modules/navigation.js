import { SELECTORS, CLASSES } from '../utils/constants.js';
import { 
  getElement, 
  getElements, 
  addEventListenerSafe, 
  toggleClassSafe,
  removeClassSafe,
  addClassSafe,
  smoothScrollTo,
  log
} from '../utils/helpers.js';

class NavigationManager {
  constructor() {
    this.nav = null;
    this.navToggle = null;
    this.navClose = null;
    this.navMenu = null;
    this.navLinks = [];
    this.isInitialized = false;
  }

  async init() {
    try {
      log('Inicializando modulo Navigation...');
      this.nav = getElement(SELECTORS.nav);
      this.navToggle = getElement(SELECTORS.navToggle);
      this.navClose = getElement(SELECTORS.navClose);
      this.navMenu = getElement(SELECTORS.navMenu);
      this.navLinks = getElements(SELECTORS.navLinks);
      
      if (!this.nav) return;

      this.setupEventListeners();
      this.setupScrollEffect();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar navegacao:', error);
    }
  }

  setupEventListeners() {
    if (this.navToggle) {
      addEventListenerSafe(this.navToggle, 'click', (e) => {
        e.preventDefault();
        this.toggleMenu();
      });
    }
    if (this.navClose) {
      addEventListenerSafe(this.navClose, 'click', (e) => {
        e.preventDefault();
        this.closeMenu();
      });
    }
    this.navLinks.forEach(link => {
      addEventListenerSafe(link, 'click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScrollTo(href);
          this.closeMenu();
        }
      });
    });
    addEventListenerSafe(document, 'click', (e) => {
      if (this.navMenu && !this.navMenu.contains(e.target) && this.navToggle && !this.navToggle.contains(e.target)) {
        this.closeMenu();
      }
    });
    addEventListenerSafe(document, 'keydown', (e) => {
      if (e.key === 'Escape') this.closeMenu();
    });
  }

  setupScrollEffect() {
    let lastScrollY = window.scrollY;
    addEventListenerSafe(window, 'scroll', () => {
      const currentScrollY = window.scrollY;
      if (this.nav) {
        if (currentScrollY > 100) {
          addClassSafe(this.nav, 'nav--scrolled');
        } else {
          removeClassSafe(this.nav, 'nav--scrolled');
        }
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          addClassSafe(this.nav, 'nav--hidden');
        } else {
          removeClassSafe(this.nav, 'nav--hidden');
        }
      }
      lastScrollY = currentScrollY;
    });
  }

  toggleMenu() {
    if (this.navMenu) toggleClassSafe(this.navMenu, CLASSES.active);
  }

  closeMenu() {
    if (this.navMenu) removeClassSafe(this.navMenu, CLASSES.active);
  }

  destroy() {
    this.isInitialized = false;
    log('Modulo Navigation destruido');
  }
}

export default new NavigationManager();

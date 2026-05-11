import { log } from '../utils/helpers.js';

class ImageFallbackManager {
  constructor() {
    this.isInitialized = false;
    this.fallbackImages = {
      car: '/assets/img/logo.webp',
      avatar: '/assets/img/logo.webp',
      placeholder: '/assets/img/logo.webp'
    };
  }

  async init() {
    try {
      log('Inicializando modulo Image Fallback...');
      this.setupGlobalImageErrorHandler();
      this.setupExistingImages();
      this.isInitialized = true;
    } catch (error) {
      console.error('Erro ao inicializar image fallback:', error);
    }
  }

  setupGlobalImageErrorHandler() {
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        this.handleImageError(e.target);
      }
    }, true);
  }

  setupExistingImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.hasAttribute('data-fallback-handled')) {
        img.addEventListener('error', () => this.handleImageError(img));
        img.setAttribute('data-fallback-handled', 'true');
      }
    });
  }

  handleImageError(img) {
    const src = img.src;
    const alt = img.alt || '';
    log(`Erro ao carregar imagem: ${src}`);
    let fallback = this.fallbackImages.placeholder;
    if (alt.toLowerCase().includes('avatar') || img.classList.contains('testimonial__avatar')) {
      fallback = this.fallbackImages.avatar;
    } else if (alt.toLowerCase().includes('carro') || alt.toLowerCase().includes('car') || img.classList.contains('offer__img')) {
      fallback = this.fallbackImages.car;
    }
    if (src !== fallback) {
      img.src = fallback;
      img.style.opacity = '0.7';
      img.title = 'Imagem não disponível';
    }
  }

  destroy() {
    this.isInitialized = false;
    log('Modulo Image Fallback destruido');
  }
}

export default new ImageFallbackManager();

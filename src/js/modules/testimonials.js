// ===== TESTIMONIALS MODULE =====
import { SELECTORS, CLASSES, TIMING } from '../utils/constants.js';
import { 
  getElement, 
  addEventListenerSafe, 
  removeClassFromAll, 
  addClassSafe,
  log,
  wait
} from '../utils/helpers.js';

class TestimonialsManager {
  constructor() {
    this.carousel = null;
    this.cards = [];
    this.currentIndex = 0;
    this.interval = null;
    this.isInitialized = false;
    this.reviews = [];
  }

  async init() {
    try {
      log('Inicializando modulo de depoimentos...');
      this.carousel = getElement(SELECTORS.testimonialsCarousel) || document.querySelector('#testimonials-carousel');
      
      if (!this.carousel) return;

      await this.fetchReviews();
      this.renderReviews();
      this.setupEventListeners();
      this.startAutoPlay();
      
      this.isInitialized = true;
      log('Depoimentos inicializados');
    } catch (error) {
      console.error('Erro ao inicializar depoimentos:', error);
      this.forceFallbackContent();
    }
  }

  async fetchReviews() {
    try {
      const response = await fetch('/src/data/testimonials.json');
      this.reviews = await response.json();
    } catch (error) {
      log('Falha ao buscar depoimentos, usando fallback');
      throw error;
    }
  }

  renderReviews() {
    if (!this.reviews.length) return;
    
    this.carousel.innerHTML = this.reviews.map((review, index) => `
      <div class="testimonial__card ${index === 0 ? CLASSES.active : ''}" data-review-id="${index}">
        <div class="testimonial__rating">
          ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
        </div>
        <p class="testimonial__text">"${review.text}"</p>
        <div class="testimonial__author">
          <img src="${review.avatar}" alt="${review.name}" class="testimonial__avatar" loading="lazy">
          <div class="testimonial__info">
            <h4 class="testimonial__name">${review.name}</h4>
            <span class="testimonial__date">${review.date}</span>
          </div>
        </div>
      </div>
    `).join('');
    
    this.cards = this.carousel.querySelectorAll('.testimonial__card');
  }

  setupEventListeners() {
    const prevBtn = document.querySelector('#testimonials-prev') || document.querySelector('.testimonials__prev');
    const nextBtn = document.querySelector('#testimonials-next') || document.querySelector('.testimonials__next');
    
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());
    
    // Touch support
    let startX = 0;
    this.carousel.addEventListener('touchstart', (e) => startX = e.touches[0].clientX, { passive: true });
    this.carousel.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });
  }

  show(index) {
    if (!this.cards.length) return;
    this.currentIndex = (index + this.cards.length) % this.cards.length;
    removeClassFromAll(this.cards, CLASSES.active);
    addClassSafe(this.cards[this.currentIndex], CLASSES.active);
  }

  next() { this.show(this.currentIndex + 1); this.resetAutoPlay(); }
  prev() { this.show(this.currentIndex - 1); this.resetAutoPlay(); }

  startAutoPlay() {
    this.stopAutoPlay();
    this.interval = setInterval(() => this.next(), TIMING.testimonialCarouselInterval || 5000);
  }

  stopAutoPlay() {
    if (this.interval) clearInterval(this.interval);
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  forceFallbackContent() {
    if (this.carousel) {
      this.carousel.innerHTML = '<p class="testimonial__text">Depoimentos temporariamente indisponíveis.</p>';
    }
  }
}

export default new TestimonialsManager();

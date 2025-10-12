// ===== CONSTANTS =====
export const SELECTORS = {
  // Navigation
  nav: '.nav',
  navToggle: '#nav-toggle',
  navClose: '#nav-close',
  navMenu: '#nav-menu',
  navLinks: '.nav__link',
  
  // Hero
  heroCarousel: '#hero-carousel',
  heroSlides: '.hero__slide',
  heroIndicators: '.hero__indicator',
  heroPrev: '#hero-prev',
  heroNext: '#hero-next',
  
  // Testimonials
  testimonialsCarousel: '#testimonials-carousel',
  testimonialCards: '.testimonial__card',
  testimonialsPrev: '#testimonials-prev',
  testimonialsNext: '#testimonials-next',
  
  // Instagram
  instagramGrid: '#instagram-grid',
  
  // Counters
  statNumbers: '.stat__number',
  
  // Countdown
  countdownElements: '.offer__countdown',
  
  // Scroll reveal
  scrollRevealElements: '.scroll-reveal'
};

export const CLASSES = {
  active: 'active',
  hidden: 'hidden',
  revealed: 'revealed',
  loading: 'loading'
};

export const TIMING = {
  heroCarouselInterval: 3000, // Reduzido para 3 segundos para teste
  testimonialCarouselInterval: 8000, // Aumentado para 8 segundos para ver melhor os atores
  counterAnimationDuration: 2000,
  scrollDebounceDelay: 100,
  initDelay: 100,
  controlsInitDelay: 1000,
  animationDelay: 500
};

export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
  desktop: 1024
};

export const INSTAGRAM_CONFIG = {
  username: 'pauloveiculos027',
  baseUrl: 'https://www.instagram.com/pauloveiculos027/',
  postsCount: 6
};

export const CONTACT_INFO = {
  whatsapp: '5527997356397',
  address: 'R. Jucati - Alvorada, Vila Velha - ES, 29117-390'
};

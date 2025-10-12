const CACHE_NAME = 'paulo-veiculos-v1.0.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/variables.css',
  '/assets/css/base.css',
  '/assets/css/components.css',
  '/assets/css/layout.css',
  '/assets/css/responsive.css',
  '/assets/js/main.js',
  '/assets/js/utils/constants.js',
  '/assets/js/utils/helpers.js',
  '/assets/js/modules/hero.js',
  '/assets/js/modules/navigation.js',
  '/assets/js/modules/testimonials.js',
  '/assets/js/modules/counters.js',
  '/assets/js/modules/instagram.js',
  '/assets/js/modules/countdown.js',
  '/assets/js/modules/scroll-effects.js',
  '/assets/js/modules/image-fallback.js',
  '/assets/js/modules/online-counter.js',
  '/assets/js/modules/smooth-scroll.js',
  '/Imagens/logo.webp',
  '/Imagens/carros-esportivos-cor-e-unidade.webp',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Skip caching for external resources and API calls
  if (event.request.url.includes('fonts.googleapis.com') || 
      event.request.url.includes('cdnjs.cloudflare.com') ||
      event.request.url.includes('api.') ||
      event.request.url.includes('instagram.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        
        // Try to fetch from network
        return fetch(event.request).catch(error => {
          console.warn('Network request failed:', event.request.url, error);
          
          // For navigation requests, return a fallback page
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          // For other requests, return a basic response
          return new Response('Recurso não disponível offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain; charset=utf-8'
            })
          });
        });
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

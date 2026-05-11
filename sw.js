const CACHE_NAME = 'paulo-veiculos-v1.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/css/variables.css',
  '/src/css/base.css',
  '/src/css/components.css',
  '/src/css/layout.css',
  '/src/css/responsive.css',
  '/src/js/main.js',
  '/src/js/utils/constants.js',
  '/src/js/utils/helpers.js',
  '/src/js/modules/hero.js',
  '/src/js/modules/navigation.js',
  '/src/js/modules/testimonials.js',
  '/src/js/modules/counters.js',
  '/src/js/modules/instagram.js',
  '/src/js/modules/countdown.js',
  '/src/js/modules/scroll-effects.js',
  '/src/js/modules/image-fallback.js',
  '/src/js/modules/online-counter.js',
  '/src/js/modules/smooth-scroll.js',
  '/src/js/modules/simulator.js',
  '/src/js/utils/polyfills.js',
  '/src/js/utils/sw-register.js',
  '/src/data/testimonials.json',
  '/src/data/inventory.json',
  '/src/data/bank-configs.json',
  '/src/css/pages/simulator.css',
  '/assets/img/logo.webp',
  '/assets/img/carros-esportivos-cor-e-unidade.webp',
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
        
        return fetch(event.request).catch(error => {
          console.warn('Network request failed:', event.request.url, error);
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
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

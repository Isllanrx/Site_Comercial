const CACHE_NAME = 'paulo-veiculos-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/variables.min.css',
  '/assets/css/base.min.css',
  '/assets/css/components.min.css',
  '/assets/css/layout.min.css',
  '/assets/css/responsive.min.css',
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
  '/robots.txt',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css'
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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
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

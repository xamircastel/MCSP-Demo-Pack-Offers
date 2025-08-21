// Service Worker básico para cachear recursos
const CACHE_NAME = 'kokoro-kids-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/images/kokoro-kids.svg',
  '/images/24symbols.svg',
  '/images/tv-shows.svg',
  '/images/supergame.svg',
  '/favicon.svg'
];

// Instalar Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Devolver desde cache si está disponible
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activar Service Worker y limpiar cache viejo
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

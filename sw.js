// ─── Vendas Dompsa - Service Worker ──────────────────────────────────────────
const CACHE_NAME = 'vendas-dompsa-v2';
const CACHE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  './icons/apple-touch-icon.png'
];

// ─── INSTALL: pré-cacheia os assets essenciais ────────────────────────────────
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets...');
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// ─── ACTIVATE: limpa caches antigos ──────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ─── FETCH: Estratégia Cache-First com Network-Fallback ───────────────────────
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  
  // Ignorar extensões e requisições externas desnecessárias
  if (event.request.url.startsWith('chrome-extension://')) return;
  if (event.request.url.includes('whatsapp') || event.request.url.includes('api.whatsapp')) return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Se estiver no cache, retorna imediatamente
      if (cachedResponse) {
        return cachedResponse;
      }

      // Caso contrário, busca na rede
      return fetch(event.request)
        .then(networkResponse => {
          // Se a resposta for válida, cacheia para uso futuro
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Se falhar a rede (offline) e for um documento, retorna o index.html
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
        });
    })
  );
});

// AMKSTUDY — minimal offline app-shell cache.
// Bump this version string any time index.html changes, so returning
// visitors get the update instead of a stale cached copy.
var CACHE_NAME = 'amkstudy-v1';
var SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache){ return cache.addAll(SHELL); }).catch(function(){})
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k !== CACHE_NAME; }).map(function(k){ return caches.delete(k); }));
    })
  );
  self.clients.claim();
});

// Cache-first for the app shell, network-first (with cache fallback) for everything else
// (fonts, etc.) so the app still opens with no signal, and picks up updates when online.
self.addEventListener('fetch', function(event){
  if(event.request.method !== 'GET') return;
  var url = event.request.url;
  var isShellRequest = SHELL.some(function(p){ return url.indexOf(p.replace('./','')) !== -1; }) || event.request.mode === 'navigate';

  if(isShellRequest){
    event.respondWith(
      caches.match(event.request).then(function(cached){
        var network = fetch(event.request).then(function(resp){
          if(resp && resp.ok){ caches.open(CACHE_NAME).then(function(c){ c.put(event.request, resp.clone()); }); }
          return resp;
        }).catch(function(){ return cached; });
        return cached || network;
      })
    );
    return;
  }

  event.respondWith(
    fetch(event.request).then(function(resp){
      if(resp && resp.ok){ caches.open(CACHE_NAME).then(function(c){ c.put(event.request, resp.clone()); }); }
      return resp;
    }).catch(function(){ return caches.match(event.request); })
  );
});

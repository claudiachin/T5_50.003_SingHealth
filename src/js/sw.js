self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app')
      .then(function(cache) {
        cache.addAll([
          '../html/index.html',
          '../html/info.html',
          '../html/home.html',
          '../html/directory.html',
          '../html/announcements.html',
          '../html/trends.html',
          '../css/style.css',
          '../css/index.css',
          '../js/app.js',
          '../resources/SingHealth_Logo.png',
          'https://kit.fontawesome.com/215800797e.js',
        ])
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
 });
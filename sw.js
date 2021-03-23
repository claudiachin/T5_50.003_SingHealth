self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('first-app')
      .then(function(cache) {
        cache.addAll([
          './',
          './index.html',
          './src/html/info.html',
          './src/html/home.html',
          './src/html/directory.html',
          './src/html/announcements.html',
          './src/html/trends.html',
          './src/css/style.css',
          './src/css/index.css',
          './src/js/app.js',
          './src/resources/SingHealth_Logo.png',
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
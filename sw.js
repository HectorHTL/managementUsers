

const STATIC_CACHE_NAME = 'static-cache-v1.4';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1';
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1';

const cleanCache = (cacheName, limitItems) => {
  caches.open(cacheName).then((cache) => {
    return cache.keys().then((keys) => {
      if (keys.length > limitItems) {
        cache.delete(keys[0]).then(cleanCache(cacheName, limitItems));
      }
    });
  });
};

self.addEventListener('install', (event) => {
  const respCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
    return cache.addAll([
      '/',
      'index.html',
      'images/icons/android-launchericon-48-48.png',
      'images/icons/android-launchericon-72-72.png',
      'images/icons/android-launchericon-96-96.png',
      'images/icons/android-launchericon-144-144.png',
      'images/icons/android-launchericon-192-192.png',
      'images/icons/android-launchericon-512-512.png',
      'manifest.json',
      'pages/offline.html',
      'images/conexion.png'
    ]);
  });
  const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
    return cache.addAll([
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/webfonts/fa-solid-900.woff2',
    ]);
  });

  event.waitUntil(Promise.all([respCache, respCacheInmutable]));
});

self.addEventListener('activate',(event) =>{

    console.log('activado');
    const proDelete = caches.keys().then((cahesItems) =>{
        cahesItems.forEach(element => {
            if(element !== STATIC_CACHE_NAME && element.includes('static')){
               return caches.delete(element)
            }
        });
    })

    event.waitUntil(proDelete)
    
})

// self.addEventListener('fetch',(event)=>{
//     const resp = caches.match(event.request)
//     event.respondWith(resp)
// })

self.addEventListener('fetch', (event) => {
  const resp = caches.match(event.request).then((respCache) => {
    if (respCache) {
      return respCache;
    }
    return fetch(event.request).then((respWeb) => {
      caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
        cache.put(event.request, respWeb);
        cleanCache(DYNAMIC_CACHE_NAME, 10);
      });
      return respWeb.clone();
    });
  }).catch((err)=>{
   
    if(event.request.headers.get('accept').includes('html')){
        return caches.match('pages/offline.html')
    }
    if(event.request.headers.get('accept').includes('image')){
        return caches.match('images/conexion.png')
    }
  });
  event.respondWith(resp);
});
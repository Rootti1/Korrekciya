var CACHE='korr-v1';
var FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==CACHE}).map(function(x){return caches.delete(x)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(function(hit){
    var net=fetch(e.request).then(function(r){if(r&&r.ok){var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp)})}return r}).catch(function(){return hit});
    return hit||net;
  }));
});

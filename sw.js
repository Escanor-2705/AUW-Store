// Réseau d'abord : les prix et pages sont toujours à jour, le cache sert uniquement hors connexion.
const CACHE = "auw-v2";
const FICHIERS = ["AUWstore.html","AUWFAQ.html","AUW_contact.html","AUWstore.css","AUWstore.js","icon-192.png","logo-auw.png"];
self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS)));
    self.skipWaiting();
});
self.addEventListener("activate", e => {
    e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
    self.clients.claim();
});
self.addEventListener("fetch", e => {
    if (e.request.method !== "GET") return;
    e.respondWith(
        fetch(e.request).then(r => {
            const copie = r.clone();
            caches.open(CACHE).then(c => c.put(e.request, copie));
            return r;
        }).catch(() => caches.match(e.request))
    );
});

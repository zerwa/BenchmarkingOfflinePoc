workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(
    /https:\/\/api\.exchangeratesapi\.io\/latest/,
    new workbox.strategies.NetworkFirst({
        cacheName: "cases",
        plugins: [
            new workbox.expiration.Plugin({
                maxAgeSeconds: 10 * 60 // 10 minutes
            })
    ]
  })
);
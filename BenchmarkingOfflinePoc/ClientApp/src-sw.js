workbox.precaching.precacheAndRoute(self.__precacheManifest);
workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(
    new RegExp("/api/cases"),
    new workbox.strategies.NetworkFirst({
        cacheName: "cases"
    ]
  })
);
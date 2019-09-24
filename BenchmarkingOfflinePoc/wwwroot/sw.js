importScripts("/dist/precache-manifest.ce4f15fded6236dde4680587a590f7c6.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

﻿const FILES_TO_CACHE = [
    '/offline',
    '/'
];

workbox.setConfig({
    debug: true
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.precaching.precacheAndRoute(FILES_TO_CACHE);

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerNavigationRoute('/');

workbox.routing.registerRoute(
    new RegExp("/api/cases"),
    new workbox.strategies.NetworkFirst({
        cacheName: "cases"
  })
);

workbox.routing.registerRoute(
    new RegExp("/api/survey-template"),
    new workbox.strategies.NetworkFirst({
        cacheName: "templates"
    })
);

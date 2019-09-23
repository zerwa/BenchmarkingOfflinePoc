importScripts("/dist/precache-manifest.352eaa27f7dbfd5b8e663f11baf5b95c.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

﻿workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
workbox.precaching.cleanupOutdatedCaches();

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

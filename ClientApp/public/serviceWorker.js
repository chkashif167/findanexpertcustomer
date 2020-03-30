// service worker files
importScripts('../serviceworker-cache-polyfill.js');

var urlsToPrefetch = [
    '/assets/css/main.css',
    '/assets/css/responsive.css',
   '/favicon.ico'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    self.skipWaiting();
    console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);
    console.log('Installed', event);});

self.addEventListener('fetch', function (event) {
    console.log('Fetched', event);
});

self.addEventListener('activate', function (event) {
    console.log('Activated', event);
});
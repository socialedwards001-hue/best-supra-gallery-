self.addEventListener('notificationclick', function(event) {
    const urlToOpen = event.notification.data.url;
    event.notification.close(); 

    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker Active');
});

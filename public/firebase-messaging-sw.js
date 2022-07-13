importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyCBFln3YtKH_EruTFHeQN2iSE686DJWsT8",
  authDomain: "tnr-notification-service-853e0.firebaseapp.com",
  projectId: "tnr-notification-service-853e0",
  storageBucket: "tnr-notification-service-853e0.appspot.com",
  messagingSenderId: "1001041679463",
  appId: "1:1001041679463:web:d0fdd2fc178aa51d85f0c2",
  measurementId: "G-CVN2TGF3VM",
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

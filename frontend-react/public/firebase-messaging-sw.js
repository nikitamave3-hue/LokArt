importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC7eGirZUFyd59HPP3UGynPiOFr_3hkVk",
  authDomain: "lokaart-81450.firebaseapp.com",
  projectId: "lokaart-81450",
  storageBucket: "lokaart-81450.firebasestorage.app",
  messagingSenderId: "970721826235",
  appId: "1:970721826235:web:ad7b4d15ecb39f0451290e",
  measurementId: "G-M6FV0VTBN5"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);

  const notificationTitle =
    payload.notification?.title || "LokArt Notification";

  const notificationOptions = {
    body: payload.notification?.body || "LokArt par naya notification hai.",
    icon: "/logo.png"
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

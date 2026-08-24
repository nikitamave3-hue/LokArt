import { getToken, onMessage } from "firebase/messaging";
import { messaging, vapidKey } from "./firebase";

export const requestNotificationPermission = async () => {
  try {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications.");
      return null;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied.");
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey,
      serviceWorkerRegistration: await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      ),
    });

    console.log("FCM TOKEN:", token);

    return token;
  } catch (error) {
    console.error("FCM notification setup failed:", error);
    return null;
  }
};

export const listenForForegroundMessages = (callback) => {
  return onMessage(messaging, (payload) => {
    console.log("Foreground notification:", payload);

    if (callback) {
      callback(payload);
    }
  });
};


import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "lokaart-81450.firebaseapp.com",
  projectId: "lokaart-81450",
  storageBucket: "lokaart-81450.firebasestorage.app",
  messagingSenderId: "970721826235",
  appId: "1:970721826235:web:ad7b4d15ecb39f0451290e",
  measurementId: "G-M6FV0VTBN5"
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
export const vapidKey = "BBEE8JYA8xRQZB4Ae6npXWqakomhQkk6kQnfOUnwYlVGp34za1qMR9K1Hxr5HZuG7Gz-Evxr8G9RlM4Gk-6K8kM";

export default app;

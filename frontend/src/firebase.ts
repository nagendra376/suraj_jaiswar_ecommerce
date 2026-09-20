import { getApps, initializeApp, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_KEY ||
    process.env.VITE_FIREBASE_KEY,
  authDomain:
    process.env.NEXT_PUBLIC_AUTH_DOMAIN ||
    process.env.VITE_AUTH_DOMAIN,
  projectId:
    process.env.NEXT_PUBLIC_PROJECT_ID ||
    process.env.VITE_PROJECT_ID,
  storageBucket:
    process.env.NEXT_PUBLIC_STORAGE_BUCKET ||
    process.env.VITE_STORAGE_BUCKET,
  messagingSenderId:
    process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID ||
    process.env.VITE_MESSAGING_SENDER_ID,
  appId:
    process.env.NEXT_PUBLIC_APP_ID ||
    process.env.VITE_APP_ID,
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

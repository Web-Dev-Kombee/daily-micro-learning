import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyCISSZjgGWxlmNMjY-QE2dwXwHTNn7bT9s",
  authDomain:
    process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ||
    "daily-micro-learning.firebaseapp.com",
  projectId:
    process.env.REACT_APP_FIREBASE_PROJECT_ID || "daily-micro-learning",
  storageBucket:
    process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ||
    "daily-micro-learning.firebasestorage.app",
  messagingSenderId:
    process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "247123349878",
  appId:
    process.env.REACT_APP_FIREBASE_APP_ID ||
    "1:247123349878:web:40235681e4c7ef6bd22a57",
  measurementId:
    process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-52PGP7Z4NQ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-bcf04.firebaseapp.com",
  projectId: "realestate-bcf04",
  storageBucket: "realestate-bcf04.firebasestorage.app",
  messagingSenderId: "308251898715",
  appId: "1:308251898715:web:10e48c1d6256b0f2f4a07e",
  measurementId: "G-2D6VE3E4PS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

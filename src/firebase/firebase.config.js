// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaMO7sSUoFqfKv9X7PCMRQH-7pLxTv1Cc",
  authDomain: "e-commerce-21c7a.firebaseapp.com",
  projectId: "e-commerce-21c7a",
  storageBucket: "e-commerce-21c7a.firebasestorage.app",
  messagingSenderId: "534316694225",
  appId: "1:534316694225:web:f51f4158e172cc388c63f0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
// const analytics = getAnalytics(app);
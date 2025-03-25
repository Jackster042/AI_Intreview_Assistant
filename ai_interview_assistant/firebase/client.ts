// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoihbRUsxuu97aid6vymATKCSlhQ2ZQKc",
  authDomain: "ask-guru-e7ea7.firebaseapp.com",
  projectId: "ask-guru-e7ea7",
  storageBucket: "ask-guru-e7ea7.firebasestorage.app",
  messagingSenderId: "1036775846760",
  appId: "1:1036775846760:web:c38143b51989645a02dcdd",
  measurementId: "G-R0B873KM6L",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

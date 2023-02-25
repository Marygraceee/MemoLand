// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA4f6kDYGDS2srrLhz7s7i61iUQz-6_zQ",
  authDomain: "you-have-to.firebaseapp.com",
  projectId: "you-have-to",
  storageBucket: "you-have-to.appspot.com",
  messagingSenderId: "175747929994",
  appId: "1:175747929994:web:59803813819f17e4b25a73",
  measurementId: "G-0EXHYW7XQ1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

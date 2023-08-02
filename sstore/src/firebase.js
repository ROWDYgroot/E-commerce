import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: "AIzaSyCnWkusY5vBdfTqp1g6X-dLqGIxvBBvyEs",
//   authDomain: "fir-app-80832.firebaseapp.com",
//   projectId: "fir-app-80832",
//   storageBucket: "fir-app-80832.appspot.com",
//   messagingSenderId: "14777662859",
//   appId: "1:14777662859:web:2d90592b5f67b1064e838e",
//   measurementId: "G-6X9EGG25YB"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCcl0EeSNtFlrJ8UuCYtJCku56pyBfSHL0",
  authDomain: "fir-ee665.firebaseapp.com",
  projectId: "fir-ee665",
  storageBucket: "fir-ee665.appspot.com",
  messagingSenderId: "240007666871",
  appId: "1:240007666871:web:a8054b5db0068e45d28132",
  measurementId: "G-WC55CQ4LV8"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const firestore = getFirestore();

const storage = getStorage();

export { app, auth, firestore, storage };
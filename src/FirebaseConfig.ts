// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBt3z2-FYGekTabCrXZW7u3rhFqcsi1GmI",
  authDomain: "store-4ad0c.firebaseapp.com",
  projectId: "store-4ad0c",
  storageBucket: "store-4ad0c.appspot.com",
  messagingSenderId: "1091728970389",
  appId: "1:1091728970389:web:3947ac08b190d49f7a819c",
  measurementId: "G-4G16DLJX3W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);

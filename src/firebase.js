// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOXGiSzw2q9vqbzQQcQw1Ah9JNhFIr-4U",
  authDomain: "fir-auth-ae1b3.firebaseapp.com",
  projectId: "fir-auth-ae1b3",
  storageBucket: "fir-auth-ae1b3.appspot.com",
  messagingSenderId: "482976368667",
  appId: "1:482976368667:web:d71ced9a01a3d2d8c550be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvDGOeDMlc-phT291-alxRqIVMWgWAQKE",
  authDomain: "adopt-a-meow.firebaseapp.com",
  projectId: "adopt-a-meow",
  storageBucket: "adopt-a-meow.appspot.com",
  messagingSenderId: "813285627452",
  appId: "1:813285627452:web:0560082b05003d84ae1539",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const database: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);
export const googleProvider: GoogleAuthProvider = new GoogleAuthProvider();

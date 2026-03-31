
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-f0e71.firebaseapp.com",
  projectId: "authexamnotes-f0e71",
  storageBucket: "authexamnotes-f0e71.firebasestorage.app",
  messagingSenderId: "701385304628",
  appId: "1:701385304628:web:5409c6e91813a94f4c7861"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export { auth , provider }
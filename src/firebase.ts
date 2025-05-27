import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDFnqbpVdMyMsuNRyeUuzxTSb3fl-R7D4w",
  authDomain: "web-forge-builder.firebaseapp.com",
  projectId: "web-forge-builder",
  storageBucket: "web-forge-builder.firebasestorage.app",
  messagingSenderId: "42227241590",
  appId: "1:42227241590:web:c7c4ee40a9c9c8a475c557",
  measurementId: "G-57Q35ZLX4T"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
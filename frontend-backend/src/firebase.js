import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzPm3oHvaRsfS3ZZADxscVY42iubsl6n0",
  authDomain: "notes-app-6f9ea.firebaseapp.com",
  projectId: "notes-app-6f9ea",
  storageBucket: "notes-app-6f9ea.firebasestorage.app",
  messagingSenderId: "52825671843",
  appId: "1:52825671843:web:0f61ad60a4e08d314bd716"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATxPmY12SavkvwQCeeuKVy_141rwOqeV0",
  authDomain: "open-slide.firebaseapp.com",
  projectId: "open-slide",
  storageBucket: "open-slide.appspot.com",
  messagingSenderId: "779340866439",
  appId: "1:779340866439:web:5161a329aa40ff9fa36922"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

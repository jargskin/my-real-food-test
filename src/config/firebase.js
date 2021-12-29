import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA736Y8gzzQM_vzdbb7rTyJFG9i4TTFJ6k",
  authDomain: "myrealfood-decff.firebaseapp.com",
  projectId: "myrealfood-decff",
  storageBucket: "myrealfood-decff.appspot.com",
  messagingSenderId: "857197993053",
  appId: "1:857197993053:web:6fd89e5990a6291452c1b4",
  measurementId: "G-GG91W4LTFQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();


export { auth, db };
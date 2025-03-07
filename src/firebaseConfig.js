import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyD3IGYhYsiM_Wj5jyrxmpUF5JyEDWA98CQ",
   authDomain: "hepsy-dummy.firebaseapp.com",
   projectId: "hepsy-dummy",
   storageBucket: "hepsy-dummy.firebasestorage.app",
   messagingSenderId: "659305004983",
   appId: "1:659305004983:web:55de97ed0fd9407c03b232"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

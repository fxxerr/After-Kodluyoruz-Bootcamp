import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAXnnoR0CsOiU8gYMeg_YS0w1ea_tyDmv0",
  authDomain: "bakkal-45c38.firebaseapp.com",
  projectId: "bakkal-45c38",
  storageBucket: "bakkal-45c38.appspot.com",
  messagingSenderId: "703506129166",
  appId: "1:703506129166:web:68ca595667a4f5fd05775f",
  measurementId: "G-Q4ZF4QXTJ2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();

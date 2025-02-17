// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANG5yZXYbYsoO3m97yNFSQvHRICh7zEkU",
  authDomain: "qr-it-23bf7.firebaseapp.com",
  projectId: "qr-it-23bf7",
  storageBucket: "qr-it-23bf7.appspot.com",
  messagingSenderId: "186009231644",
  appId: "1:186009231644:web:6e5bf02e19c2b25f2e9ad9",
  measurementId: "G-LHQKRZS45R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

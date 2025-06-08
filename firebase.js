// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe5SAo3AkI6pFasiMcxvANWqmTMBSALX8",
  authDomain: "laptrinhweb-c56bb.firebaseapp.com",
  projectId: "laptrinhweb-c56bb",
  storageBucket: "laptrinhweb-c56bb.firebasestorage.app",
  messagingSenderId: "125819690029",
  appId: "1:125819690029:web:b34d3a547076d43703aca4",
  measurementId: "G-WNDXNFFFC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
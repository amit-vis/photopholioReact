// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwhSE_pM1AbramQtUxg8HtMPDAHPq2a7c",
  authDomain: "photopholio-951a5.firebaseapp.com",
  projectId: "photopholio-951a5",
  storageBucket: "photopholio-951a5.appspot.com",
  messagingSenderId: "784716390669",
  appId: "1:784716390669:web:3fd443073bbd43faa59044"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
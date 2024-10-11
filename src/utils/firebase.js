// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "workject-ee0e8.firebaseapp.com",
  projectId: "workject-ee0e8",
  storageBucket: "workject-ee0e8.appspot.com",
  messagingSenderId: "448886151693",
  appId: "1:448886151693:web:a6f2a8cbe13b79acb19344"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
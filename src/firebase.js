// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApN4zcQnzllBCkOcCcl9G-LHhoC54MJao",
  authDomain: "airboard-bff5a.firebaseapp.com",
  projectId: "airboard-bff5a",
  storageBucket: "airboard-bff5a.appspot.com",
  messagingSenderId: "362728892676",
  appId: "1:362728892676:web:e356571ebea269f427c851",
  measurementId: "G-KZS4TJ2RV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// export { auth };
export const auth = getAuth(app);
export const db = getFirestore(app);
// console.log("in firebase", auth);

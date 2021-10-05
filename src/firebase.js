// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAibzMWvNbqd7QmY1oi3E49Lbso2fbFHLE",
    authDomain: "sol-marketplace.firebaseapp.com",
    projectId: "sol-marketplace",
    storageBucket: "sol-marketplace.appspot.com",
    messagingSenderId: "61946389726",
    appId: "1:61946389726:web:0fa90b2d9b5944739e4e4f",
    measurementId: "G-BZWN6F2364"
  };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig);
export default firebase;
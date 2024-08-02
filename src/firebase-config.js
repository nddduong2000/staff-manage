// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6hN2LhaZu1DVpvG6I3LKLbAfwVpaPNo0",
  authDomain: "staff-manage-d12b1.firebaseapp.com",
  databaseUrl: "https://staff-manage-d12b1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "staff-manage-d12b1",
  storageBucket: "staff-manage-d12b1.appspot.com",
  messagingSenderId: "862326677015",
  appId: "1:862326677015:web:f6bdcd72b3c2d9a083c652",
  measurementId: "G-D1ZJ8NE7LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
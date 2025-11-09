import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBYY2LrXMpJNunXHyH7ET6Jj4xoqsUaBfg",
  authDomain: "grocery-tracker-b556e.firebaseapp.com",
  projectId: "grocery-tracker-b556e",
  storageBucket: "grocery-tracker-b556e.firebasestorage.app",
  messagingSenderId: "652413943748",
  appId: "1:652413943748:web:f605cb9a820dba4b026e91"
};

//public firebase app object for other scripts to reference and use
export const firebaseApp = initializeApp(firebaseConfig);
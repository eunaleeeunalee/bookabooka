import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGINGSENDER_ID,
    // appId: process.env.REACT_APP_APP_ID
    apiKey: "AIzaSyCmtXGzxBtwDipc44P6UikkUUEWAieqpW0",
    authDomain: "eunwitter-57cb8.firebaseapp.com",
    projectId: "eunwitter-57cb8",
    storageBucket: "eunwitter-57cb8.appspot.com",
    messagingSenderId: "377664147855",
    appId: "1:377664147855:web:79fa78ae7718ce60fdfbfa"
  };

  // export default firebase.initializeApp(firebaseConfig);

  initializeApp(firebaseConfig);

  export const authService = getAuth();
  export const dbService = getFirestore();
  export const storageService = getStorage();
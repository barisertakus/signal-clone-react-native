// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt25sn9Zp8hSTPFIIPYYy2lTAizOxqDwk",
  authDomain: "signal-clone-fea9f.firebaseapp.com",
  projectId: "signal-clone-fea9f",
  storageBucket: "signal-clone-fea9f.appspot.com",
  messagingSenderId: "190949424630",
  appId: "1:190949424630:web:494e121e3cf8dc3c799bd7"
};

  let app;

  if(getApps().length === 0){
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  const db = getFirestore();
  const auth = getAuth();

export {db, auth}

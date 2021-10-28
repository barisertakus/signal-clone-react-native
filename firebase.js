// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
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

  if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

export {db, auth}

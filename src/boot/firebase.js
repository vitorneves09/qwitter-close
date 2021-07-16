import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbnJ2UH0pu4EqozYZnlmAvB0vkSq34Rck",
  authDomain: "qwitter-40b2c.firebaseapp.com",
  projectId: "qwitter-40b2c",
  storageBucket: "qwitter-40b2c.appspot.com",
  messagingSenderId: "1044893329286",
  appId: "1:1044893329286:web:474a7e6a37415c4d362e07"
}

firebase.initializeApp(firebaseConfig)

let db = firebase.firestore()


export default db

// import firebase from "firebase";
import firebase from 'firebase/app';
import 'firebase/auth';  
import 'firebase/firestore';   
import 'firebase/storage';  

const firebaseConfig = {
  apiKey: "AIzaSyDaOYmy0uu0z_sRqJOC2DGbEUaFGFKlem4",
  authDomain: "drive-clone-b0327.firebaseapp.com",
  projectId: "drive-clone-b0327",
  storageBucket: "drive-clone-b0327.appspot.com",
  messagingSenderId: "382520694859",
  appId: "1:382520694859:web:ea4e566f82ef983d3655ce",
  measurementId: "G-EZL05X6140",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); // this is fo database to store the data
const storage = firebase.storage(); //this is for storaing data inb firebase
const getAuth = firebase.auth(); //this is for authentication purpose
const provider = new firebase.auth.GoogleAuthProvider(); //this is for authentication purpose with google

export { db, storage, provider, getAuth };

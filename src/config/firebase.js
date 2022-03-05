import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';
const firebaseConfig = {
  apiKey: "AIzaSyBIXkB3d6axmxtSVN--H5HQYYzfyQS2i_I",
  authDomain: "ct466-10249.firebaseapp.com",
  projectId: "ct466-10249",
  storageBucket: "ct466-10249.appspot.com",
  messagingSenderId: "607311586685",
  appId: "1:607311586685:web:2d265f79a5fc14f03b9814",
  measurementId: "G-LPSRTEKTER"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};

export default firebase;


import { initializeApp } from "firebase/app";
import {Firestore, getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcAJyKiIV0UyO9GFAu3_2ysRkWD_hKcNs",
  authDomain: "crud-react-35805.firebaseapp.com",
  projectId: "crud-react-35805",
  storageBucket: "crud-react-35805.appspot.com",
  messagingSenderId: "942450316546",
  appId: "1:942450316546:web:7956895e77d2c490cd5e1b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
export {db}
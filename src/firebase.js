import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnwZIJZD5SHYz6VcLfBLo23WaNQv0_wd0",
  authDomain: "new-project-bb30f.firebaseapp.com",
  databaseURL: "https://new-project-bb30f-default-rtdb.firebaseio.com",
  projectId: "new-project-bb30f",
  storageBucket: "new-project-bb30f.appspot.com",
  messagingSenderId: "808340205806",
  appId: "1:808340205806:web:7df8e2a4a155ab6b8543ff",
  measurementId: "G-VLL8FL0YRX",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

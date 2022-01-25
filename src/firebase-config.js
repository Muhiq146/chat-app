import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC2HA9Is-ISUq2aATGyQFDnqycBUIOzYeI",
  authDomain: "chat-app-34a54.firebaseapp.com",
  databaseURL: "http://chat-app-34a54.firebaseio.com",
  projectId: "chat-app-34a54",
  storageBucket: "chat-app-34a54.appspot.com",
  messagingSenderId: "418776581141",
  appId: "1:418776581141:web:530576e90776712b23fa1c",
  measurementId: "G-RYPBJZPBM0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dataBase = getFirestore(app);
const storage = getStorage(app);

export { auth, dataBase, storage };

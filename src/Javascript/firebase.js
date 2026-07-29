import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDBUWzaDkp36gKtux6LuaT46rgPfD56kc",
  authDomain: "daeground.firebaseapp.com",
  projectId: "daeground",
  storageBucket: "daeground.firebasestorage.app",
  messagingSenderId: "928441393163",
  appId: "1:928441393163:web:4b16c846875b927b91a70e",
  measurementId: "G-P5E16CGX79"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);


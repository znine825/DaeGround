import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
const analytics = getAnalytics(app);


// 회원가입
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("가입 완료:", userCredential.user.uid);
  } catch (error) {
    console.error(error.code, error.message);
  }
}


// 로그인
import { signInWithEmailAndPassword } from "firebase/auth";

async function logIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("로그인 성공:", userCredential.user.uid);
  } catch (error) {
    console.error(error.code);
  }
}

// 로그아웃
/*
import { signOut } from "firebase/auth";
signOut(auth);
*/
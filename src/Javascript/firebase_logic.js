// 회원가입
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function signUp(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("가입 완료:", userCredential.user.uid);
  } catch (error) {
    console.error(error.code, error.message);
  }
}


// 로그인
import { signInWithEmailAndPassword } from "firebase/auth";

export async function logIn(email, password) {
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
import { createUserWithEmailAndPassword, sendEmailVerification, signOut  } from "firebase/auth";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

// 회원가입
export async function signUp(email, password, name) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const uid = userCredential.user.uid;
        await setDoc(doc(db, 'users', uid), {
          email: email,
          name: name,
          createdAt: new Date(),
        });

        await sendEmailVerification(userCredential.user);
        await signOut(auth);
    } catch (error) {
        console.log(error.message);
    }
}


// 로그인
export async function logIn(email, password) {
    try { 
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const user = userCredential.user;

        if (!user.emailVerified) {
        await signOut(auth);
        alert('이메일 인증을 먼저 완료해주세요.');
        return false;
        }

    } catch (error) {
        alert('아이디 또는 비밀번호가 틀렸습니다');
        return false;
    }

    return true;
}

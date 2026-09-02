import { signOut, deleteUser } from "firebase/auth";
import { auth, db } from "./firebase";
import { signInWithEmailAndPassword, sendEmailVerification, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, collection, setDoc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { collectionGroup, serverTimestamp, runTransaction, increment, query, orderBy, where, writeBatch, getFirestore } from 'firebase/firestore';

// 회원가입
export async function signUp(email, password, name) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        const uid = userCredential.user.uid;
        // 계정 정보
        await setDoc(doc(db, 'users', uid), {
            info: {
                email: email,
                name: name,
                createdAt: serverTimestamp(),
                realname: '미등록',
                phonenumber: '미등록',
                residentialarea: '미등록',
                gender: '미등록',
                icon: 'profile',
                co2: 0
            }
        });

        const today = new Date().toLocaleDateString('sv-SE', {
            timeZone: 'Asia/Seoul'
        });

        const userRef = doc(db, "statistics", "user");
        await updateDoc(userRef, {
            [today]: increment(1)
        });

        // 활동 정보
        
        await signOut(auth);
        await sendEmailVerification(userCredential.user);
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

// 게시글 작성
export async function createPost(title, content, text, name) {
    const user = auth.currentUser;

    const docRef = await addDoc(collection(db, "posts"), {
        title,
        text,
        content : JSON.stringify(content),
        authorUid: user.uid,
        authorName: name || '익명',
        createdAt: serverTimestamp(),
        likeCount: 0,
        view: 0
    });

    return docRef.id;
}

// 댓글 작성
export async function addComment(postId, content) {
    const db = getFirestore();
    const user = auth.currentUser;
    
    const userinfo = await getUserInfo(user.uid);

    await addDoc(collection(db, "posts", postId, "comments"), {
        content,
        authorUid: user.uid,
        authorName: userinfo.info.name,
        authorIcon: userinfo.info.icon,
        createdAt: serverTimestamp()
    });
}

// 조회수 추가
export async function addview(postId) {
    const db = getFirestore();
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, { view: increment(1) });
    
}

// 좋아요 추가
export async function toggleLike(postId) {
    const db = getFirestore();
    const user = auth.currentUser;
    const likeId = `${postId}_${user.uid}`;
    const likeRef = doc(db, "likes", likeId);
    const postRef = doc(db, "posts", postId);

    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
        await deleteDoc(likeRef);
        await updateDoc(postRef, { likeCount: increment(-1) });
        return true;
    } else {
        await setDoc(likeRef, { postId, uid: user.uid, createdAt: serverTimestamp() });
        await updateDoc(postRef, { likeCount: increment(1) });
        return false;
    }
}
// 좋아요 확인
export async function checkLike(postId) {
    const db = getFirestore();
    const user = auth.currentUser;
    const likeId = `${postId}_${user.uid}`;
    const likeRef = doc(db, "likes", likeId);

    const likeSnap = await getDoc(likeRef);

    if (likeSnap.exists()) {
        return true;
    } else {
        return false;
    }
}


// 회원 탈퇴
export async function withdrawAccount() {
    const db = getFirestore();
    const user = auth.currentUser;
    const uid = user.uid;

    try {
        const postsQuery = query(collection(db, "posts"), where("authorUid", "==", uid));
        const postsSnap = await getDocs(postsQuery);

        const batch = writeBatch(db);

        for (const postDoc of postsSnap.docs) {
            const commentsSnap = await getDocs(collection(db, "posts", postDoc.id, "comments"));
            commentsSnap.forEach(commentDoc => batch.delete(commentDoc.ref));
            batch.delete(postDoc.ref);
        }

        const likesQuery = query(collection(db, "likes"), where("uid", "==", uid));
        const likesSnap = await getDocs(likesQuery);
        likesSnap.forEach(likeDoc => batch.delete(likeDoc.ref));

        batch.delete(doc(db, "users", uid));
        await batch.commit();
        await deleteUser(user);
        navigate('/');

    } catch (error) {
        console.error("탈퇴 처리 중 오류:", error);
    }
}

// 전체 게시글 불러오기
export async function getAllPosts(showType = 'createdAt', sortStandard = 0) {
    const q = query(collection(db, "posts"), orderBy(showType, (sortStandard ? 'desc' : 'asc')));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 게시글 댓글 불러오기
export async function getComments(postId) {
    const q = query(collection(db, "posts", postId, "comments"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 유저 게시글 불러오기
export async function getPostsByUid(uid) {
    const q = query(collection(db, "posts"), where("authorUid", "==", uid), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// 유저 댓글 불러오기
export async function getCommentsByUid(uid) {
    const q = query(collectionGroup(db, "comments"), where("authorUid", "==", uid), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        postId: doc.ref.parent.parent.id,
        ...doc.data()
    }));
}

// 게시글 불러오기
export async function getPost(postId) {
    try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);

        if (!postSnap.exists()) {
            console.log("게시글이 존재하지 않음");
            return null;
        }

        return {
            id: postSnap.id,
            ...postSnap.data()
        };

    } catch (error) {
        console.error("게시글 불러오기 실패:", error);
        return null;
    }
}

// 유저 정보 불러오기
export async function getUserInfo(uid) {
    try {
        const docSnap = await getDoc(
            doc(db, "users", uid)
        );
        if (!docSnap.exists()) {
            console.log("유저가 존재하지 않음");
            return null;
        }

        return docSnap.data();

    } catch (error) {
        console.error("유저정보 불러오기 실패:", error);
        return null;
    }
}
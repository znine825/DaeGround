import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, auth } from "./../../../Javascript/firebase.js";
import { getPostsByUid, getCommentsByUid, addComment } from "./../../../Javascript/firebase_logic.js";
import { Info, InfoHeader } from "./../../../Components/Common/Common.jsx"

import './MyInfo.css'



function MyInfo() {

    const [userData, setUserData] = useState(null);
    const [postCount, setPostCount] = useState([]);
    const [commentCount, setCommentCount] = useState([]);

    useEffect(() => {
        const uid = auth.currentUser?.uid;

        if (!uid) return;

        async function fetchData() {
            const db = getFirestore();
            try {
                const docSnap = await getDoc(
                    doc(db, "users", uid)
                );
            
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }

                const posts = await getPostsByUid(uid);
                setPostCount(posts.length);


                const comments = await getCommentsByUid(uid);
                setCommentCount(comments.length);
            } catch (error) {
                console.error("유저 정보 가져오기 실패:", error);
            }
        }

        fetchData();
    }, []);
    
    if (!userData) {
        return <div>로딩중...</div>;
    }





    return (
        <div className = 'myinfo'>
            
            <div>
                <Info title = '아이디' subtitle = {userData.info.name} icon = 'profile'/>
                <Info title = '이름' subtitle = {userData.info.realname} icon = 'profile'/>
                <Info title = '이메일' subtitle = {userData.info.email} icon = 'profile'/>
                <Info title = '전화번호' subtitle = {userData.info.phonenumber} icon = 'profile'/>
                <Info title = '거주지역' subtitle = {userData.info.residentialarea} icon = 'profile'/>
                <Info title = '성별' subtitle = {userData.info.gender} icon = 'profile'/>
            </div>
        </div>
    )
}

export default MyInfo
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
        const uid = auth.currentUser.uid;   // 안전하게 바로 사용 가능

        async function fetchData() {
            const db = getFirestore();
            const docSnap = await getDoc(doc(db, "users", uid));

            if (docSnap.exists()) {
                setUserData(docSnap.data());
            }

            const [posts, comments] = await Promise.all([
                getPostsByUid(uid),
                getCommentsByUid(uid)
            ]);

            setPostCount(posts.length);
            setCommentCount(comments.length);
        }
        fetchData();
    }, []);

    
    if (!userData) {
        return <div>로딩중...</div>;
    }


    const headerInfo = {
        icon: userData.info.icon,
        name: userData.info.name,
        date: userData.info.createdAt,
        postCount: postCount,
        commentCount: commentCount
    }


    return (
        <div className = 'myinfo'>
            <InfoHeader contents = {headerInfo}/>
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
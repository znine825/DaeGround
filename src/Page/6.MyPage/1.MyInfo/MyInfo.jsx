import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, auth } from "./../../../Javascript/firebase.js";
import { Info } from "./../../../Components/Common/Common.jsx"

import './MyInfo.css'

async function getUserData(uid) {
    const docRef = doc(db, "users", uid);  
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();   
    } else {
        console.log("문서가 존재하지 않습니다.");
        return null;
    }
}

function MyInfo() {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const uid = auth.currentUser.uid;   // 안전하게 바로 사용 가능

        async function fetchData() {
            const db = getFirestore();
            const docSnap = await getDoc(doc(db, "users", uid));

            if (docSnap.exists()) {
                setUserData(docSnap.data());
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
                <div>
                    <div>
                        <div></div>
                        <div></div>
                    </div>
                    <div>
                        <p></p>
                        <p></p>
                    </div>

                </div>
                <div></div>
                <div></div>
            </div>
            <div></div>
            <div>
                <Info title = '아이디' subtitle = {userData.name} icon = 'profile'/>
                <Info title = '이름' subtitle = {userData.realname} icon = 'profile'/>
                <Info title = '이메일' subtitle = {userData.email} icon = 'profile'/>
                <Info title = '전화번호' subtitle = {userData.phonenumber} icon = 'profile'/>
                <Info title = '거주지역' subtitle = {userData.residentialarea} icon = 'profile'/>
                <Info title = '성별' subtitle = {userData.gender} icon = 'profile'/>
            </div>
        </div>
    )
}

export default MyInfo
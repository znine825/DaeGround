import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app, auth, db } from "./../../../Javascript/firebase.js";
import { getPostsByUid, getCommentsByUid, addComment, withdrawAccount } from "./../../../Javascript/firebase_logic.js";
import { Link, useNavigate } from 'react-router-dom';
import { Info, InfoHeader, Button, Input } from "./../../../Components/Common/Common.jsx"

import './MyInfo.css'

function MyInfo() {

    const [userData, setUserData] = useState(null);
    const [postCount, setPostCount] = useState([]);
    const [commentCount, setCommentCount] = useState([]);
    const [userUid, setUserUid] = useState(null);

    const [setting, setSetting] = useState(false);
    const [name, setName] = useState('');
    const [realname, setRealname] = useState('');
    const [number, setNumber] = useState('');
    const [area, setArea] = useState('');
    const [gender, setGender] = useState('');
    const [signCheck, setSignCheck] = useState([true, true]);

    let tempCheck = [true, true];
    let lastCheck = true;

    const navigate = useNavigate();

    useEffect(() => {
        const uid = auth.currentUser?.uid;

        if (!uid) return;
        setUserUid(uid);
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

    const checkInfo = () => {
        const checkName = /^[a-zA-Z0-9가-힣]{2,8}$/;
        if (!checkName.test(name)) {
            tempCheck[0] = false;
            setName('');
            lastCheck = false;
        }

        const checkNumber = /^\d{11}$/;
        if (!checkNumber.test(number)) {
            tempCheck[1] = false;
            setNumber('');
            lastCheck = false;
        }

        if(lastCheck) {
            async function temp() {
                const userRef = doc(db, "users", userUid);
                await updateDoc(userRef, {
                    "info.name": name,
                    "info.realname": realname,
                    "info.phonenumber": number,
                    "info.residentialarea": area,
                    "info.gender": gender
                });
                alert('정보 수정이 완료 되었습니다.');
    
                console.log(name);
                navigate(0);
            }
            temp();

        } else {
            lastCheck = true;
            setSignCheck(tempCheck);
            alert('잘못된 정보가 있습니다.');
        }
    }

    
    useEffect(() => {
        if (!userData) return;

        setName(userData.info.name);
        setRealname(userData.info.realname);
        setNumber(userData.info.phonenumber);
        setArea(userData.info.residentialarea);
        setGender(userData.info.gender);
    }, [userData])


    if (!userData) {
        return <div>로딩중...</div>;
    }





    return (
        <div className = 'myinfo'>
            <div>
                <Info title = '닉네임' subtitle = {userData.info.name} warning = '한글/영문/숫자, 2 ~ 8자' icon = 'profile' set = {setting} value = {name} setValue = {setName}/>
                <Info title = '이름' subtitle = {userData.info.realname} icon = 'profile' set = {setting} value = {realname} setValue = {setRealname}/>
                <Info title = '이메일' subtitle = {userData.info.email} icon = 'mail' set = {false}/>
                <Info title = '전화번호' subtitle = {userData.info.phonenumber} warning = '숫자 11자' icon = 'profile' set = {setting} value = {number} setValue = {setNumber}/>
                <Info title = '거주지역' subtitle = {userData.info.residentialarea} icon = 'profile' set = {setting} value = {area} setValue = {setArea}/>
                <Info title = '성별' subtitle = {userData.info.gender} warning = '자신의 성별을 입력해주세요' icon = 'profile' set = {setting} value = {gender} setValue = {setGender}/>
            </div>
            {!setting && 
            <div>
                <div onClick = {() => setSetting(true)}>
                    <Button width = '150' height = '50' text = '정보수정' fsize = '16' fweight = '500' />
                </div>
                <div onClick = {() => withdrawAccount()}>
                    <Button width = '150' height = '50' text = '회원탈퇴' fsize = '16' fweight = '500' />
                </div>
            </div>}
            {setting && 
            <div>
                <div onClick = {() => setSetting(false)}>
                    <Button width = '150' height = '50' text = '취소' fsize = '16' fweight = '500' />
                </div>
                <div onClick = {() =>{checkInfo(); setSetting(false)}}>
                    <Button width = '150' height = '50' text = '저장하기' fsize = '16' fweight = '500' />
                </div>
            </div>}
        </div>
    )
}

export default MyInfo
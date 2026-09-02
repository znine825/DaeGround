import { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app, auth } from "./../../Javascript/firebase.js";
import { getPostsByUid, getCommentsByUid, addComment } from "./../../Javascript/firebase_logic.js";
import { Outlet, Link } from 'react-router-dom';
import { Title, InfoHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './MyPage.css'

function MyPage() {
    const [userInfo, setUserInfo] = useState(null);
    const [menu, setMenu] = useState(['Myon', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff'])

    function changeMenu(num) {
        let tempMenu = ['Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff'];
        tempMenu[num] = 'Myon';
        setMenu(tempMenu);
    }

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
            setUserInfo([userData, postCount, commentCount]);
        }

        fetchData();
    }, []);
    
    if (!userData) {
        return <div>로딩중...</div>;
    }
    
    const headerInfo = {
        icon: userData.info.icon,
        name: userData.info.name,
        date: userData.info.createdAt.toDate().toLocaleDateString(),
        postCount: postCount,
        commentCount: commentCount,
        co2: userData.info.co2
    }


    return (
        <div className = 'MyPage'>
            <div className = 'MyPageheader'>
                <Title 
                    icon = 'flag' 
                    text = '마이페이지' 
                    title = '나의 에코 여행기록' 
                    subtitle = '나의 정보와 기록을 한눈에 확인하세요' 
                    locate = 'left'/>
                <div>
                    <p>회원정보</p>
                    <Link className = {`menu ${menu[0]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(0)}><Icon name = 'profile' color = {(menu[0] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>회원 정보</p></Link>
                    <p>나의 활동</p>
                    <Link className = {`menu ${menu[3]}`}
                        to = "MyPlan"
                        onClick = {() => changeMenu(3)}><Icon name = 'file' color = {(menu[3] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>게시글</p></Link>
                    <Link className = {`menu ${menu[4]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(4)}><Icon name = 'comment' color = {(menu[4] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>댓글</p></Link>
                    <Link className = {`menu ${menu[5]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(5)}><Icon name = 'heart' color = {(menu[5] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>좋아요</p></Link>
                    <Link className = {`menu ${menu[6]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(6)}><Icon name = 'star' color = {(menu[6] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>즐겨찾기</p></Link>
                </div>
            </div>
            <div>
                <InfoHeader contents = {headerInfo}/>
                <div className = 'outlet'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MyPage
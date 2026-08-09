import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./../../Javascript/firebase.js";
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './../Icons/Icons.jsx'
import './Header.css'

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const logOutButton = () => {
        navigate('/');
        signOut(auth);
    };


    return (
        <header className = 'header'>
            <div>
                <div>
                    <div></div>
                    <p>대그라운드</p>
                </div>
                <div>
                    <div>
                        <Link to = '/'><p>홈</p></Link>
                    </div>
                    <div>
                        <Link to = '/MakePlan'><p>나만의 여행 만들기</p></Link>
                    </div>
                    <div>
                        <Link to = '/NoticeBoard'><p>여행 게시판</p></Link>
                    </div>
                    <div>
                        <Link to = '/Contact'><p>문의하기</p></Link>
                    </div>
                </div>
                <div>
                    {user ? (
                        // 로그인 상태
                        <div className = 'state_login' onClick = {logOutButton}>
                            <p>로그아웃</p>
                        </div>
                    ) : (
                        // 로그아웃 상태
                        <div className = 'state_logout'>
                            <Link to = '/Login'>
                                <p>로그인</p>
                            </Link>
                            <div></div>
                            <Link to = '/Signup'>
                                <p>회원가입</p>
                            </Link>
                        </div>
                    )}
                    <div>
                        <Link to = '/Mypage/MyInfo'>
                            <Icon name = 'profile' color = '#6D6D6D' />
                        </Link>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 11V16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21ZM12.0498 8V8.1L11.9502 8.1002V8H12.0498Z" stroke="#6D6D6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 12H8M3 12C3 16.9706 7.02944 21 12 21M3 12C3 7.02944 7.02944 3 12 3M8 12H16M8 12C8 16.9706 9.79086 21 12 21M8 12C8 7.02944 9.79086 3 12 3M16 12H21M16 12C16 7.02944 14.2091 3 12 3M16 12C16 16.9706 14.2091 21 12 21M21 12C21 7.02944 16.9706 3 12 3M21 12C21 16.9706 16.9706 21 12 21" stroke="#6D6D6D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>KO</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header
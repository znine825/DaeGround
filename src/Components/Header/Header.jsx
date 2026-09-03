import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./../../Javascript/firebase.js";
import { getUserInfo } from "./../../Javascript/firebase_logic.js"
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './../Icons/Icons.jsx'
import './Header.css'

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        async function lodding() {
            const name = await getUserInfo(uid);
            setUserName(name.info.name);
        }
        lodding()
    })

    const logOutButton = () => {
        navigate('/');
        signOut(auth);
    };

    const [mobileMenu, setMobileMenu] = useState(false);


    return (
        <header className = 'header'>
            <div className = 'pcHeader'>
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
                            <p>{userName} | 로그아웃</p>
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
                    </div>
                </div>
            </div>
            <div className="mobileHeader">
                {mobileMenu && <div className = "HeaderMenu">
                    <div>
                    </div>
                    <div className = "HeaderMenuRight">
                        <div>
                            <div>
                                <Link to = '/Mypage/MyInfo'>
                                    <Icon name = 'profile' color = 'black' width = {50} height = {50} />
                                </Link>
                            </div>
                            {user ? (
                                // 로그인 상태
                                <div className = 'state_login' onClick = {logOutButton}>
                                    <p>{userName} | 로그아웃</p>
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
                            <div onClick = {() => {setMobileMenu(!mobileMenu)}}>
                                <Icon name = 'close' color = 'black' />
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <Icon name = 'house' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/'><p>홈</p></Link>
                        </div>
                        <div>
                            <Icon name = 'map' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/MakePlan'><p>나만의 여행 만들기</p></Link>
                        </div>
                        <div>
                            <Icon name = 'calendarCheck' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/NoticeBoard'><p>여행 게시판</p></Link>
                        </div>
                        <div>
                            <Icon name = 'comment' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/Contact'><p>문의하기</p></Link>
                        </div>
                    </div>
                </div>}
                
                <div className = 'HeaderTitle'>
                    <div></div>
                    <p>대그라운드</p>
                </div>
                <div className = 'HeaderMenuIcon' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                    <Icon name = 'menu' color = 'var(--LM-mainouttext-color)'/>
                </div>
            </div>
        </header>
    );
}

export default Header
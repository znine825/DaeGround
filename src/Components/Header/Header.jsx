import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./../../Javascript/firebase.js";
import { getUserInfo } from "./../../Javascript/firebase_logic.js"
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from './../Icons/Icons.jsx'
import { Logo } from './../Common/Common.jsx'
import { motion } from "motion/react";
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

    const scrollreset = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    const [mobileMenu, setMobileMenu] = useState(false);
    const [onhover, setOnhover] = useState(1);


    return (
        <header className = 'header'>
            <div className = 'pcHeader'>
                <div>
                    <Logo />
                    <p>대그라운드</p>
                </div>
                <div>
                    <div className = { onhover == 1 ? 'HoverHeader' : '' } onClick = {() => {setOnhover(1); scrollreset()}}>
                        <Link to = '/'>
                            <div></div>
                            <p>홈</p>
                        </Link>
                    </div>
                    <div className = { onhover == 2 ? 'HoverHeader' : '' } onClick = {() => {setOnhover(2); scrollreset()}}>
                        <Link to = '/MakePlan'>
                            <div></div>
                            <p>나만의 여행 만들기</p>
                        </Link>
                    </div>
                    <div className = { onhover == 3 ? 'HoverHeader' : '' } onClick = {() => {setOnhover(3); scrollreset()}}>
                        <Link to = '/NoticeBoard'>
                            <div></div>
                            <p>여행 게시판</p>
                        </Link>
                    </div>
                    <div className = { onhover == 4 ? 'HoverHeader' : '' } onClick = {() => {setOnhover(4)}}>
                        <Link to = '/Contact'>
                            <div></div>
                            <p>공지사항</p>
                        </Link>
                    </div>
                </div>
                <div>
                    {user ? (
                        // 로그인 상태
                        <div className = 'state_login'>
                            <p>{`${userName}`}</p>
                            <div className = 'logoutbutton' onClick = {logOutButton}>
                                <p> | 로그아웃</p>
                            </div>
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
            <motion.div 
                className="mobileHeader"
                initial={{ x: '100%'}}
                whileInView={{ x: 0}}>
                {mobileMenu && <div className = "HeaderMenu">
                    <motion.div
                    initial={{ opacity: 0}}
                    whileInView={{ opacity: 1}}
                    transition={{
                        duration: 0.3
                    }}>
                    </motion.div>
                    <motion.div 
                        className = "HeaderMenuRight"
                        initial={{ x: '100%'}}
                        whileInView={{ x: 0}}
                        transition={{
                            duration: 0.3,
                            ease: "in"
                        }}>
                        <div>
                            <div>
                                <Link to = '/Mypage/MyInfo'>
                                    <div className  = 'HMprofile'>
                                        <Icon name = 'profile' color = 'var(--LM-line-color)' strc = {1.5} width = {45} height = {45} />
                                    </div>
                                </Link>
                            </div>
                            {user ? (
                                // 로그인 상태
                                <div className = 'state_login'>
                                    <p>{`${userName}`}</p>
                                </div>
                            ) : (
                                // 로그아웃 상태
                                <div className = 'state_logout'>
                                    <Link to = '/Login'>
                                        <p onClick = {() => {setMobileMenu(!mobileMenu)}}>로그인</p>
                                    </Link>
                                    <div></div>
                                    <Link to = '/Signup'>
                                        <p onClick = {() => {setMobileMenu(!mobileMenu)}}>회원가입</p>
                                    </Link>
                                </div>
                            )}
                            <div onClick = {() => {setMobileMenu(!mobileMenu)}}>
                                <Icon name = 'close' color = 'black' />
                            </div>
                        </div>
                        <div className = 'HMline'>
                            <p>서비스</p>
                            <div></div>
                        </div>
                        <div className = 'MHmenu' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                            <Icon name = 'house' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/'><p>홈</p></Link>
                        </div>
                        <div className = 'MHmenu' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                            <Icon name = 'map' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/MakePlan'><p>나만의 여행 만들기</p></Link>
                        </div>
                        <div className = 'MHmenu' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                            <Icon name = 'calendarCheck' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/NoticeBoard'><p>여행 게시판</p></Link>
                        </div>
                        <div className = 'MHmenu' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                            <Icon name = 'comment' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/Contact'><p>공지사항</p></Link>
                        </div>
                        <div className = 'HMline'>
                            <p>기타</p>
                            <div></div>
                        </div>
                        <div className = 'MHmenu' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                            <Icon name = 'profile' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link to = '/Mypage/MyInfo'><p>마이페이지</p></Link>
                        </div>
                        { user && <div className = 'MHmenu' onClick = {() => {setMobileMenu(!mobileMenu); logOutButton()}}>
                            <Icon name = 'logout' color = 'var(--LM-main-color)' width = {30} height = {30}/>
                            <Link><p>로그아웃</p></Link>
                        </div>}
                    </motion.div>
                </div>}
                
                <div className = 'HeaderTitle'>
                    <div></div>
                    <p>대그라운드</p>
                </div>
                <div className = 'HeaderMenuIcon' onClick = {() => {setMobileMenu(!mobileMenu)}}>
                    <Icon name = 'menu' color = 'var(--LM-mainouttext-color)'/>
                </div>
            </motion.div>
        </header>
    );
}

export default Header




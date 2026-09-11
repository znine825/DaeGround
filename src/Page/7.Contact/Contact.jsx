import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPost, getAllPosts, getUserInfo, addview, toggleLike, checkLike, getComments, addComment } from "./../../Javascript/firebase_logic"
import { PageHeader, Post, Comment, Button } from './../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './Contact.css'
function Contact() {
    
    const navigate = useNavigate();
    const ph = {
        image: './Image/bagic/PageHeader.png',
        icon: 'file',
        iconText: '공지',
        title: '공지사항',
        subtitle: '사이트 소식, 공지 등을 확인할 수 있어요',

        heigth: 200
    };

    return (
        <div className = 'Contact'>
            <PageHeader contents = {ph}/>
            <div>
                <div className = 'ContactTitle'>
                    <p>제목</p>
                    <p>작성자</p>
                    <p>작성일</p>
                </div>
                <div className = 'ContactContent'>
                    <div>
                        <div>
                            <p>공지</p>
                        </div>
                        <p onClick={() => navigate(`/Contact/HowToUse`)}>대그라운드 이용방법</p>
                    </div>
                    <p>대그라운드</p>
                    <p>2026-09-12</p>
                </div>
                <div className = 'ContactContent'>
                    <div>
                        <div>
                            <p>중요</p>
                        </div>
                        <p onClick={() => navigate(`/Contact/TermsOfUse`)}>이용약관 1.0.0</p>
                    </div>
                    <p>대그라운드</p>
                    <p>2026-09-03</p>
                </div>
                <div className = 'ContactContent'>
                    <div>
                        <div>
                            <p>중요</p>
                        </div>
                        <p onClick={() => navigate(`/Contact/PrivacyPolicy`)}>개인정보 처리방침 1.0.0</p>
                    </div>
                    <p>대그라운드</p>
                    <p>2026-08-07</p>
                </div>
            </div>
        </div>
    )
}

export default Contact
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PrivacyPage from '../../Components/Files/PrivacyPolicy/PrivacyPolicy.jsx'
import TermsOfUse from '../../Components/Files/TermsOfUse/TermsOfUse.jsx'
import './Footer.css'

function Footer() {
    const [showprivate, setShowprivate] = useState(false);
    const [showTermsOfUse, setShowTermsOfUse] = useState(false);

    return (
        <footer className = 'footer'>
            <div>
                <div className = 'ftcontent'>
                    {/* 좌 */}
                    <div>
                        <div>
                            <div></div>
                            <p>대그라운드</p>
                        </div>
                        <p>탄소절감을 확인할 수 있는 <br/> 친환경 여행 경로 추천 서비스</p>
                    </div>
                    {/* 중 */}
                    <div>
                        <p>서비스</p>
                        <Link to = '/'><p>홈</p></Link>
                        <Link to = '/MakePlan'><p>나만의 여행 만들기</p></Link>
                        <Link to = '/NoticeBoard'><p>여행 게시판</p></Link>
                        <Link to = '/Contact'><p>문의하기</p></Link>
                    </div>
                    {/* 우 */}
                    <div>
                        <p>소개</p>
                        <p onClick = {() => setShowTermsOfUse(true)}>이용약관</p>
                        <p onClick = {() => setShowprivate(true)}>개인정보 처리방침</p>
                    </div>
                </div>
                <div></div>
                <p>© 2026 DETAILED. ALL Rights Reserved.</p>
            </div>
            {showprivate && <PrivacyPage setShowprivate = { setShowprivate }/>}
            {showTermsOfUse && <TermsOfUse setShowTermsOfUse = { setShowTermsOfUse }/>}
        </footer>
    );
}

export default Footer
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx'
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { signUp } from '../../Javascript/firebase_logic.js'
import PrivacyPage from '../../Components/Files/PrivacyPolicy/PrivacyPolicy.jsx'
import TermsOfUse from '../../Components/Files/TermsOfUse/TermsOfUse.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'

import './Signup.css'

const inputText = {
    email: {
        basic: '이메일을 입력해 주세요.',
        wrong: '옮바른 이메일을 입력해 주세요.'
    },
    name: {
        basic: '닉네임을 입력해 주세요.',
        wrong: '옮바른 닉네임을 입력해 주세요.'
    },
    password: {
        basic: '비밀번호을 입력해 주세요.',
        wrong: '옮바른 비밀번호을을 입력해 주세요.'
    },
    check: {
        basic: '비밀번호를 한번 더 입력해 주세요.',
        wrong: '비밀번호가 일치하지 않습니다.'
    }

}

const loadMapText = [
    {
        icon: 'mapPin',
        title: '회원가입 완료',
        subtitle: '가입을 완료하면\n대기 상태가 됩니다',
        line: true
    },
    {
        icon: 'calendarCheck',
        title: '이메일함 확인',
        subtitle: '가입한 이메일 주소로\n메일이 도착해요',
        line: true
    },
    {
        icon: 'terminal',
        title: '인증 링크 클릭',
        subtitle: '메일의 링크를 누르면\n인증이 완료됩니다',
        line: true
    },
    {
        icon: 'map',
        title: '로그인 완료',
        subtitle: '인증 완료 후 로그인을\n통해 모든 기능을\n이용할 수 있습니다',
        line: false
    }
]
function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    
    const [signCheck, setSignCheck] = useState([true, true, true, true]);
    const [privacyCheck, setPrivacyCheck] = useState(false);
    const [termsofservice, setTermsofservice] = useState(false);
    let tempCheck = [true, true, true, true];
    let lastCheck = true;
    
    const navigate = useNavigate();

    // 비밀번호 양식
    function isValidPassword(pw) {
        if (pw.length < 8 || pw.length > 16) {
            return false;
        }
        const hasEnglish = /[a-zA-Z]/.test(pw);
        const hasNumber = /[0-9]/.test(pw);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw);
        const count = [hasEnglish, hasNumber, hasSpecial].filter(Boolean).length;

        return count >= 3;
    }
    

    function signButton() {
        // 이메일 확인
        const checkMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!checkMail.test(email)) {
            tempCheck[0] = false;
            setEmail('');
            lastCheck = false;
        }
        // 닉네임 확인
        const checkName = /^[a-zA-Z0-9가-힣]{2,8}$/;
        if (!checkName.test(name)) {
            tempCheck[1] = false;
            setName('');
            lastCheck = false;
        }
        // 비밀번호 확인
        if(!isValidPassword(password)) {
            tempCheck[2] = false;
            setPassword('');
            lastCheck = false;
        }
        //비밀번호 재확인
        if (password !== check) {
            tempCheck[3] = false;
            setCheck('');
            lastCheck = false;
        }
        // 개인정보 확인
        if (!privacyCheck) {
            lastCheck = false;
        }
        // 이용약관 확인
        if (!termsofservice) {
            lastCheck = false;
        }

        if(lastCheck) {
            signUp(email, password, name);
            alert('회원가입이 완료되었습니다!');
            navigate('/Login');
        } else {
            lastCheck = true;
            setSignCheck(tempCheck);
            alert('잘못된 정보가 있습니다.');
        }
    }

    const [showprivate, setShowprivate] = useState(false);
    const [showTermsOfUse, setShowTermsOfUse] = useState(false);

    return (
        <div className = 'signup'>
            <Title 
                icon = 'flag' 
                text = '회원가입' 
                title = '대그라운드 시작하기' 
                subtitle = '회원가입을 통해 서비스를 이용해보세요' 
                locate = 'middle'/>
            <LoadMap contents = {loadMapText}/>
            <div className = 'signinputGrid'>
                <Input  value = { email } setValue = { setEmail } showPassword = { true } errch = {signCheck[0]}
                        title = '이메일' warning = { signCheck[0] ? inputText['email']['basic'] : inputText['email']['wrong'] }
                        condition = ''/>
                <Input  value = { name } setValue = { setName } showPassword = { true } errch = {signCheck[1]}
                        title = '닉네임' warning = { signCheck[1] ? inputText['name']['basic'] : inputText['name']['wrong'] }
                        condition = '한글/영문/숫자, 2 ~ 8자'/>
                <Input  value = { password } setValue = { setPassword } showPassword = { false } errch = {signCheck[2]}
                        title = '비밀번호' warning = { signCheck[2] ? inputText['password']['basic'] : inputText['password']['wrong'] }
                        condition = '영문/숫자/특수문자 중 3가지 이상 조합, 8자 ~ 16자'/>
                <Input  value = { check } setValue = { setCheck } showPassword = { false } errch = {signCheck[3]}
                        title = '비밀번호 확인' warning = { signCheck[3] ? inputText['check']['basic'] : inputText['check']['wrong'] }
                        condition = ''/>
            </div>
            <div>
                <div><input type="checkbox" checked = {privacyCheck} onChange = {(e) => setPrivacyCheck(e.target.checked)}/>[ 필수 ] 개인정보 처리방침<p onClick = {() => setShowprivate(true)}>자세히</p></div>
                <div><input type="checkbox" checked = {termsofservice} onChange = {(e) => setTermsofservice(e.target.checked)}/>[ 필수 ] 이용약관<p onClick = {() => setShowTermsOfUse(true)}>자세히</p></div>
                <p style = {{display: (privacyCheck && termsofservice) ? 'none' : 'block'}}>필수항목에 동의해주세요.</p>
            </div>
            <div className = 'signButton' onClick = {() => signButton()}>
                <Button width = '360' height = '50' text = '회원가입' fsize = '16' fweight = '500'/>
            </div>

            

            {/* 문서 */}
            {showprivate && <PrivacyPage setShowprivate = { setShowprivate }/>}
            {showTermsOfUse && <TermsOfUse setShowTermsOfUse = { setShowTermsOfUse }/>}
        </div>
    ) 
}
export default Signup
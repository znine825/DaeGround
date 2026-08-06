import { useState, useEffect } from "react";
import Header from '../../Components/Header/Header.jsx'
import { Title, Input, Button } from '../../Components/Common/Common.jsx'
import { signUp } from '../../Javascript/firebase_logic.js'
import PrivacyPage from '../../Components/Files/PrivacyPolicy/PrivacyPolicy.jsx'

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

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    
    const [signCheck, setSignCheck] = useState([true, true, true, true]);

    let tempCheck = [true, true, true, true];
    let lastCheck = true;

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
        
        if(lastCheck) {
            signUp(email, password, name);
        } else {
            setSignCheck(tempCheck);
        }

    }

    const [showprivate, setShowprivate] = useState(false);

    return (
        <div className = 'signup'>
            <Title 
                icon = 'flag' 
                text = '회원가입' 
                title = '대그라운드 시작하기' 
                subtitle = '회원가입을 통해 서비스를 이용해보세요' 
                locate = 'middle'/>
            
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
                <div><input type="checkbox" />[ 필수 ] 개인정보 처리방침<p onClick = {() => setShowprivate(true)}>자세히</p></div>
                <div><input type="checkbox" />[ 필수 ] 이용약관<p>자세히</p></div>
            </div>
            <div className = 'signButton' onClick = {() => signButton()}>
                <Button width = '360' height = '50' text = '회원가입' fsize = '16' fweight = '500'/>
            </div>

            {/* 문서 */}
            {showprivate && <PrivacyPage setShowprivate = { setShowprivate }/>}
        </div>
    ) 
}
export default Signup
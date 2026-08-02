import { useState, useEffect } from "react";
import Header from '../../Components/Header/Header.jsx'
import { Title, Input } from '../../Components/Common/Common.jsx'
import { signUp } from '../../Javascript/firebase_logic.js'

import './Signup.css'



function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');
    const [nickname, setNickname] = useState('');
    const [phonenumber, setPhonenumber] = useState('');

    const signButton = () => {
        signUp(email, password, name, nickname, phonenumber);
    };

   

    return (
        <div className = 'signup'>
            <Header />
            <Title 
                icon = 'flag' 
                text = '회원가입' 
                title = '데그라운드 시작하기' 
                subtitle = '회원가입을 통해 서비스를 이용해보세요' 
                locate = 'middle'/>
            
            <div className = 'signinputGrid'>
                <Input  value = { email } setValue = { setEmail }
                        title = '이메일' warning = '이메일을 입력해 주세요.'
                        condition = '예) example@email.com'/>
                <Input  value = { name } setValue = { setName }
                        title = '이름' warning = '이름을 입력해 주세요.'
                        condition = ''/>
                <Input  value = { password } setValue = { setPassword }
                        title = '비밀번호' warning = '비밀번호를 입력해 주세요.'
                        condition = '영문/숫자/특수문자 중 3가지 이상 조합, 8자 ~ 16자'/>
                <Input  value = { check } setValue = { setCheck }
                        title = '비밀번호 확인' warning = '비밀번호를 한번 더 입력해 주세요.'
                        condition = ''/>
                <Input  value = { nickname } setValue = { setNickname }
                        title = '닉네임' warning = '닉네임을 입력해 주세요.'
                        condition = '한글/영문/숫자, 2 ~ 8자'/>
                <Input  value = { phonenumber } setValue = { setPhonenumber }
                        title = '전화번호' warning = '전화번호를 입력해 주세요.'
                        condition = '숫자 11자 ( 00000000000 )'/>
                
            </div>
            <div className = 'signButton' onClick = {signButton}>
                <p>회원가입</p>
            </div>
        </div>
    )
}
export default Signup
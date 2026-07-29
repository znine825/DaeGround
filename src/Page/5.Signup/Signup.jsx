import { useState, useEffect } from "react";
import Header from '../../Components/Header/Header.jsx'
import { Title, Input } from '../../Components/Common/Common.jsx'
import { signUp } from '../../Javascript/firebase_logic.js'
import './Signup.css'



function Signup() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck] = useState('');

    const signButton = () => {
        signUp(id, password)
    };

    

    return (
        <div>
            <Header />
            <Title 
                icon = 'flag' 
                text = '회원가입' 
                title = '데그라운드 시작하기' 
                subtitle = '회원가입을 통해 서비스를 이용해보세요' 
                locate = 'middle'/>
            
            <div className = 'inputGrid'>
                <Input  className = 'id'
                        value = { id } setValue = { setId }
                        title = '아이디' warning = '아이디를 입력해 주세요.'
                        condition = '영문소문자/숫자, 4 ~ 16자'/>
                <Input  className = 'name'
                        value = { name } setValue = { setName }
                        title = '이름' warning = '이름을 입력해 주세요.'
                        condition = ''/>
                <Input  className = 'password'
                        value = { password } setValue = { setPassword }
                        title = '비밀번호' warning = '비밀번호를 입력해 주세요.'
                        condition = '영문/숫자/특수문자 중 3가지 이상 조합, 8자 ~ 16자'/>
                <Input  className = 'check '
                        value = { check } setValue = { setCheck }
                        title = '비밀번호 확인' warning = '비밀번호를 한번 더 입력해 주세요.'
                        condition = ''/>
            </div>
            <div className = 'signButton' onClick = {signButton}>
                <p>회원가입</p>
            </div>
        </div>
    )
}
export default Signup
import { useState, useEffect } from "react";
import Header from '../../Components/Header/Header.jsx'
import { Title, Input } from '../../Components/Common/Common.jsx'
import { logIn } from '../../Javascript/firebase_logic.js'
import './Login.css'

function Login() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const LoginButton = () => {
        logIn(id, password)
    };

    return (
        <div className = 'login'>
            <Header />
            <Title 
                icon = 'flag' 
                text = '로그인' 
                title = '로그인 하기' 
                subtitle = '데그라운드에 다시오신걸 환영합니다' 
                locate = 'middle'/>
            <div className = 'loginputGrid'>
                <Input  className = 'id'
                        value = { id } setValue = { setId }
                        title = '이메일' warning = '이메일을 입력해 주세요.'
                        condition = ''/>
                <Input  className = 'name'
                        value = { password } setValue = { setPassword }
                        title = '비밀번호' warning = '비밀번호를 입력해 주세요.'
                        condition = ''/>
                <div className = 'loginButton' onClick = {LoginButton}>
                    <p>로그인</p>
                </div>
            </div>
        </div>
    )
}
export default Login
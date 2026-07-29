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
        <div>
            <Header />
            <Title 
                icon = 'flag' 
                text = '로그인' 
                title = '로그인 하기' 
                subtitle = '데그라운드에 다시오신걸 환영합니다' 
                locate = 'middle'/>
            <div className = 'inputGrid'>
                <Input  className = 'id'
                        value = { id } setValue = { setId }
                        title = '아이디' warning = '아이디를 입력해 주세요.'
                        condition = ''/>
                <Input  className = 'name'
                        value = { password } setValue = { setPassword }
                        title = '이름' warning = '이름을 입력해 주세요.'
                        condition = ''/>
            </div>
            <div className = 'loginButton' onClick = {LoginButton}>
                <p>로그인</p>
            </div>
        </div>
    )
}
export default Login
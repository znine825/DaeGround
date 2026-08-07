import { useState, useEffect } from "react";
import { Title, Input, Button } from '../../Components/Common/Common.jsx'
import { logIn } from '../../Javascript/firebase_logic.js'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const LoginButton = () => {
        if (logIn(id, password)) {
            navigate('/');
        } 
    };

    return (
        <div className = 'login'>
            <Title 
                icon = 'flag' 
                text = '로그인' 
                title = '로그인 하기' 
                subtitle = '대그라운드에 다시오신걸 환영합니다' 
                locate = 'middle'/>
            <div className = 'loginputGrid'>
                <Input  className = 'id'
                        value = { id } setValue = { setId } showPassword = { true } errch = {1}
                        title = '이메일' warning = '이메일을 입력해 주세요.'
                        condition = ''/>
                <Input  className = 'name'
                        value = { password } setValue = { setPassword } showPassword = { false } errch = {1}
                        title = '비밀번호' warning = '비밀번호를 입력해 주세요.'
                        condition = ''/>
                <div onClick = {() => LoginButton()}>
                    <Button width = '360' height = '50' text = '로그인' fsize = '16' fweight = '500'/>
                </div>
            </div>
        </div>
    )
}
export default Login
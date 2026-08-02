import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import { Title } from '../../Components/Common/Common.jsx'
import { iconMap } from './../../Components/Icons/Icons.jsx'

import Header from '../../Components/Header/Header.jsx'
import './MyPage.css'

function MyPage() {

    const ProfileIcon = iconMap['profile'];
    const PlanIcon = iconMap['plan'];
    const EchoIcon = iconMap['echo'];


    const [menu, setMenu] = useState(['Myon', 'Myoff', 'Myoff'])
    const changeMenu0 = () => {
        setMenu(['Myon', 'Myoff', 'Myoff'])
    }
    const changeMenu1 = () => {
        setMenu(['Myoff', 'Myon', 'Myoff'])
    }
    const changeMenu2 = () => {
        setMenu(['Myoff', 'Myoff', 'Myon'])
    }


    return (
        <div className = 'MyPage'>
            <Header />
            <div>
                <Title 
                    icon = 'flag' 
                    text = '마이페이지' 
                    title = '나의 에코 여행기록' 
                    subtitle = '나의 정보와 기록을 한눈에 확인하세요' 
                    locate = 'left'/>
                <div>
                    <Link className = {`menu ${menu[0]}`}
                          to = "MyInfo"
                          onClick = {changeMenu0}><ProfileIcon color = {(menu[0] == 'Myon') ? '#FFFFFF' : '#6D6D6D50' } /><p>회원정보</p></Link>
                    <Link className = {`menu ${menu[1]}`}
                          to = "MyPlan"
                          onClick = {changeMenu1}><PlanIcon color = {(menu[1] == 'Myon') ? '#FFFFFF' : '#6D6D6D50' } /><p>내 여행계획</p></Link>
                    <Link className = {`menu ${menu[2]}`}
                          to = "MySaving"
                          onClick = {changeMenu2}><EchoIcon color = {(menu[2] == 'Myon') ? '#FFFFFF' : '#6D6D6D50' } /><p>내 탄소절감 내역</p></Link>
                </div>
            </div>
            <div></div>
            <div className = 'outlet'>
                <Outlet />
            </div>
        </div>
    )
}

export default MyPage
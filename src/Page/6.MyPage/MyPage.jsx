import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Header from '../../Components/Header/Header.jsx'
import './MyPage.css'

function MyPage() {
    return (
        <div className = 'MyPage'>
            <Header />
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <Link to = "MyInfo"><p>회원정보</p></Link>
                    <Link to = "MyPlan"><p>내 여행계획</p></Link>
                    <Link to = "MySaving"><p>내 탄소절감 내역</p></Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default MyPage
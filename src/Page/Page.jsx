import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import Home from './1.Home/Home.jsx'
import MakePlan from './2.MakePlan/MakePlan.jsx'
import NoticeBoard from './3.NoticeBoard/NoticeBoard.jsx'
import Contact from './7.Contact/Contact.jsx'
import Login from './4.Login/Login.jsx'
import Signup from './5.Signup/Signup.jsx'
import MyPage from './6.MyPage/MyPage.jsx'

import MyInfo from './6.MyPage/1.MyInfo/MyInfo.jsx'
import MyPlan from './6.MyPage/2.MyPlan/MyPlan.jsx'
import MySaving from './6.MyPage/3.MySaving/MySaving.jsx'

import Header from './../Components/Header/Header.jsx'
import Footer from './../Components/Footer/Footer.jsx'
import Lodding from './../Components/Lodding/Lodding.jsx';

import './Page.css'
createRoot(document.getElementById('root')).render(
    <div className = 'pages'>
        <BrowserRouter >
            <Header />
            <main className = 'main'>
                <Routes >
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/MakePlan" element={<MakePlan />}></Route>
                    <Route path="/NoticeBoard" element={<NoticeBoard />}></Route>
                    <Route path="/Contact" element={<Contact />}></Route>
                    <Route path="/Login" element={<Login />}></Route>
                    <Route path="/Signup" element={<Signup />}></Route>
                    <Route path="/MyPage" element={<Lodding><MyPage /></Lodding>}>
                        <Route path="MyInfo" element={<MyInfo />} />
                        <Route path="MyPlan" element={<MyPlan />} />
                        <Route path="MySaving" element={<MySaving />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </BrowserRouter>
  </div>
)

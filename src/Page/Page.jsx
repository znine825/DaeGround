import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import Home from './1.Home/Home.jsx'
import MakePlan from './2.MakePlan/MakePlan.jsx'
import NoticeBoard from './3.NoticeBoard/NoticeBoard.jsx'
import Login from './4.Login/Login.jsx'
import Signup from './5.Signup/Signup.jsx'
import './Page.css'

createRoot(document.getElementById('root')).render(
    <div className='App'>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/Product" element={<MakePlan />}></Route>
            <Route path="/NoticeBoard" element={<NoticeBoard />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            </Routes>
        </BrowserRouter>
  </div>
)

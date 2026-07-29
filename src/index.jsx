import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Page/1.Home/Home.jsx'
import MakePlan from './Page/2.MakePlan/MakePlan.jsx'
import NoticeBoard from './Page/3.NoticeBoard/NoticeBoard.jsx'
import Login from './Page/4.Login/Login.jsx'
import Signup from './Page/5.Signup/Signup.jsx'

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

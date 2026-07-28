import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Page/1.Home/Home.jsx'
import MakePlan from './Page/2.MakePlan/MakePlan.jsx'
import NoticeBoard from './Page/3.NoticeBoard/NoticeBoard.jsx'

createRoot(document.getElementById('root')).render(
  <div className='App'>
    <BrowserRouter>
			<Route path="/" element={<Home />}></Route>
			<Route path="/product" element={<MakePlan />}></Route>
      <Route path="/NoticeBoard" element={<NoticeBoard />}></Route>
    </BrowserRouter>
		</div>
)

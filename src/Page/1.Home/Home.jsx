import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap, PageHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { Link, useNavigate } from 'react-router-dom';
import './Home.css'
import Home1 from './Home1.jsx'
import Home2 from './Home2.jsx'
import Home3 from './Home3.jsx'
import Home4 from './Home4.jsx'
import Home5 from './Home5.jsx'
function Home() {

    
    return (
        <div className = 'home'>
            <img src = './Image/bagic/MainBackground.png'/>
            <div>
                <Home1 />
            </div>
            <div>
                <div></div>
                <div></div>
            </div>
            <div>
                <Home2 />
            </div>
            <div>
                <Home5 />
            </div>
            <div>
                <Home3 />
            </div>
            <div>
                <Home4 />
            </div>
        </div>
    )
}

export default Home
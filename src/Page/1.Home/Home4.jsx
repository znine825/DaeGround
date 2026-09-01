import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap, Post, PageHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { getAllPosts } from "./../../Javascript/firebase_logic"

import { Link, useNavigate } from 'react-router-dom';
import './Home4.css'
function Home4() {

    const [allPost, setAllPost] = useState(null);
    const [onLodding, setOnLodding] = useState(false);

    useEffect (() => {
        async function loading() {
            const allPost = await getAllPosts('view', 'desc');
            setAllPost(allPost);
            setOnLodding(true);
        }
        loading();
    },[])

    if (!onLodding) {
        return <div>로딩중</div>
    }

    return (
        <div className = 'Home4'>
            <Title 
                    icon = 'flag' 
                    text = '게시판' 
                    title = '대그리운드 인기 여행 경로' 
                    subtitle = '인기 있는 경로를 모아놨어요' 
                    locate = 'middle'/>
            <div>
                {Array.from({ length: 4 },(_, i) => (
                    <Post key = {i} post={allPost[i]}/>
                ))}
            </div>
        </div>
    )
}

export default Home4
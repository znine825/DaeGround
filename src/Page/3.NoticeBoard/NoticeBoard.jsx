import { useEffect, useState } from "react";
import { getPost, getAllPosts, getUserInfo, addview, toggleLike, checkLike, getComments, addComment } from "./../../Javascript/firebase_logic"
import { PageHeader, Post, Comment, Button } from './../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './NoticeBoard.css'

function NoticeBoard() {

    const [allPost, setAllPost] = useState(null);
    const [onLodding, setOnLodding] = useState(false);
    useEffect (() => {
        async function loading() {
            const allPost = await getAllPosts();
            setAllPost(allPost);
            setOnLodding(true);
        }
        loading();
    },[])
    const ph = {
        image: './Image/bagic/PageHeader.png',
        icon: 'file',
        iconText: '게시판',
        title: '여행 게시판',
        subtitle: '다른사람들이 만든 다양한 경로를 볼 수 있어요',

        heigth: 200
    };


    if(!onLodding) {
        return (
            <div>로딩중...</div>
        )
    }

    return (
        <div className = 'noticeboard'>
            <PageHeader contents = {ph}/>
            <div>
                {allPost.map((_, i) => (
                <div>
                    <Post post = {allPost[i]}/>
                </div>
                ))}
            </div>
        </div>
    )
}

export default NoticeBoard
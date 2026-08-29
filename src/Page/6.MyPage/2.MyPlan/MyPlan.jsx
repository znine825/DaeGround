import { useState, useEffect } from "react";
import { Info, InfoHeader } from "./../../../Components/Common/Common.jsx"
import { getPostsByUid, getComments } from "./../../../Javascript/firebase_logic.js"
import { auth, db } from "./../../../Javascript/firebase";
import { Icon } from './../../../Components/Icons/Icons.jsx'
import './MyPlan.css'

function formatDate(timestamp) {
        const date = timestamp.toDate();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}. ${month}. ${day}`;
    }

function Post(post) {
    const cuPost = post.post;
    const data = JSON.parse(cuPost.content);
    const [com, setCom] = useState(null);

    useEffect(() => {
        async function postStart() {
            const comment = await getComments(cuPost.id);
            setCom(comment);
        }
        postStart();
    }, [])

    if (!com) {
        return <div>로딩중</div>
    }
    return (
        <div className="post">
            <div>
                <img src = {data.contentImage} />
                <Icon
                    name="comment"
                    color="var(--LM-background-color)"
                />
                <p>{com.length}</p>
                <Icon
                    name="heart"
                    color="var(--LM-background-color)"
                />
                <p>{cuPost.likeCount}</p>
            </div>
            <div>
                <p>{cuPost.title}</p>
                <p>{data.allDay == 1 ? '당일 여행' : `${data.allDay - 1}박 ${data.allDay}일`}</p>
            </div>
            <p>제작 날짜 | {formatDate(cuPost.createdAt)}</p>
        </div>
    );
}

function Myplan() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        async function startFunction() {
            const userPost = await getPostsByUid(uid);
            setPost(userPost);
        }
        startFunction()
    }, [])

    if (!post) {
        return <div>로딩중</div>
        
    }
    console.log(post);

    return (
        <div className="myplan">
             {post.map((_, i) => (
                <div>
                    <Post post = {post[i]}/>
                </div>
             ))}
        </div>
    );
}

export default Myplan
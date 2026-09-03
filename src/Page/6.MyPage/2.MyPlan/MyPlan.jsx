import { useState, useEffect } from "react";
import { Info, InfoHeader, Post } from "./../../../Components/Common/Common.jsx"
import { getPostsByUid, getComments } from "./../../../Javascript/firebase_logic.js"
import { auth, db } from "./../../../Javascript/firebase";
import { Icon } from './../../../Components/Icons/Icons.jsx'
import './MyPlan.css'




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
                <div key = {i}>
                    <Post post = {post[i]}/>
                </div>
             ))}
        </div>
    );
}

export default Myplan
import { useState, useEffect } from "react";
import { Info, InfoHeader, Post } from "./../../../Components/Common/Common.jsx"
import { Icon } from "./../../../Components/Icons/Icons.jsx"
import { getPostsByUid, getComments } from "./../../../Javascript/firebase_logic.js"
import { auth, db } from "./../../../Javascript/firebase";
import './MyPlan.css'




function Myplan() {
    const [post, setPost] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;
    const [showPostNumber, setShowPostNumber] = useState([]);

    useEffect(() => {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        async function startFunction() {
            const userPost = await getPostsByUid(uid);
            setPost(userPost);
            setShowPostNumber(userPost.map((_, i) => i));
        }
        startFunction()
    }, [])

    if (!post) {
        return <div>로딩중</div>
    }

    if (post.length === 0) {
        return (
            <div className = 'MPnonePost'>
                <Icon name = "file" color = "color-mix(in srgb, var(--LM-line-color) 70%, transparent)"/>
                <p>아직 게시한 게시글이 없어요</p>
            </div>
        )
    }
    console.log(post);

    return (
        <div >
            <div className="myplan">
                {showPostNumber
                    .slice(
                        (currentPage - 1) * postsPerPage,
                        currentPage * postsPerPage
                    )
                    .map((i) => (
                        <div key={1}>
                            <Post post={post[i]} />
                        </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from(
                    { length: Math.ceil(post.length / postsPerPage) },
                    (_, i) => i + 1
                ).map(page => (
                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "active" : ""}
                    >
                        {page}
                    </button>
                ))}
            </div>

        </div>
    );
}



export default Myplan
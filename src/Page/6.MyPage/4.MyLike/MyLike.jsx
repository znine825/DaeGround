import { useState, useEffect } from "react";
import { PageHeader, Comment, Button, Post } from './../../../Components/Common/Common.jsx'
import { getCommentsByUid, getAllPosts, getPost, getUserInfo, addview, toggleLike, checkLike, getComments, addComment } from "./../../../Javascript/firebase_logic"
import { auth, db } from "../../../Javascript/firebase";
import { Icon } from "./../../../Components/Icons/Icons.jsx"
import './MyLike.css'
function MyLike() {

    const [userComment, setUserComment] = useState(null);
    const [allPost, setAllpost] = useState(null);
    const [showPostNumber, setShowPostNumber] = useState([]);

    const [onLodding, setOnLodding] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9;

    useEffect(() => {
        async function loading() {
        
            const tempdata = await getAllPosts();
            const tempArray = [];

            for (let i = 0; i < tempdata.length; i++) {
                const checkLikePostId = await checkLike(tempdata[i].id)
                if (checkLikePostId) {
                    tempArray.push(i);
                }
            }
            setShowPostNumber(tempArray);
            setAllpost(tempdata);
            setOnLodding(true);
        }
        loading();

    }, [])

    if (!onLodding) {
        return <div>로딩중...</div>;
    }

    if (showPostNumber.length === 0) {
        return (
            <div className = 'MPnonePost'>
                <Icon name = "heart" color = "color-mix(in srgb, var(--LM-line-color) 70%, transparent)"/>
                <p>아직 좋아요 누른 게시글이 없어요</p>
            </div>
        )
    }

    return (
        <div >
             <div className = 'MyLike'>
                {showPostNumber
                    .slice(
                        (currentPage - 1) * postsPerPage,
                        currentPage * postsPerPage
                    )
                    .map((postIndex) => (
                        <div key={postIndex}>
                            <Post post={allPost[postIndex]} />
                        </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from(
                    { length: Math.ceil(showPostNumber.length / postsPerPage) },
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
    )
}

export default MyLike
import { useState, useEffect } from "react";
import { PageHeader, Comment, Button, Post } from './../../../Components/Common/Common.jsx'
import { getCommentsByUid, getAllPosts, getPost, getUserInfo, addview, toggleLike, checkLike, getComments, addComment } from "./../../../Javascript/firebase_logic"
import { auth, db } from "../../../Javascript/firebase";
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

    return (
        <div className = 'MyLike'>
             <div>
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
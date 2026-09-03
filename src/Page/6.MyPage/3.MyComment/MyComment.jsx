import { useState, useEffect } from "react";
import { PageHeader, Comment, Button } from './../../../Components/Common/Common.jsx'
import { getCommentsByUid, getPost, getUserInfo, addview, toggleLike, checkLike, getComments, addComment } from "./../../../Javascript/firebase_logic"
import { auth, db } from "../../../Javascript/firebase";
import './MyComment.css'
function MyComment() {

    const [userComment, setUserComment] = useState(null);
    const [onLodding, setOnLodding] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        async function loading() {
            const uid = auth.currentUser?.uid;
            if (!uid) return;
    
            const tempdata = await getCommentsByUid(uid);
            setUserComment(tempdata);
            setOnLodding(true);
        }
        loading();

    }, [])

    if (!onLodding) {
        return <div>로딩중...</div>;
    }

    return (
        <div className = 'MyComment'>
            {userComment
                .slice(
                    (currentPage - 1) * postsPerPage,
                    currentPage * postsPerPage
                )
                .map((postIndex, i) => (
                    <div key={i}>
                        <Comment contents = { postIndex }/>
                    </div>
                ))}
            <div className="pagination">
                {Array.from(
                    { length: Math.ceil(userComment.length / postsPerPage) },
                    (_, i) => i + 1
                ).map(page => (
                    <button
                        key = {page}
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

export default MyComment
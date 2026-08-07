// ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./../../Javascript/firebase.js";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true); // 로그인 확인 중인지

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (!user) {
                alert('로그인이 필요한 페이지입니다');
                navigate('/');
            } else {
                setChecking(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    if (checking) {
        return <div>로딩중...</div>; // 확인 끝날 때까지 빈 화면 대신 로딩 표시
    }

    return children;
}

export default ProtectedRoute;
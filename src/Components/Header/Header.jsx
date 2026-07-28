import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <header>
            <div></div>
            <div>          
            </div>
        {user ? (
            // 로그인 상태
            <div></div>
        ) : (
            // 로그아웃 상태
            <div></div>
        )}
        </header>
    );
}

export default Header
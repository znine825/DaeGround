import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap, PageHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { Link, useNavigate } from 'react-router-dom';
import './Home1.css'
function Home1() {

    const [page, setPage] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setPage(prev => prev === 5 ? 1 : prev + 1);
        }, 3000);

        return () => clearInterval(timer);
    }, []);

    const moveLeftPage = () => {
        setPage((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {
        setPage((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    };

    const navigate = useNavigate();
    const toMakePlan = () => {
            navigate('/MakePlan');
    };

    const [displayPage, setDisplayPage] = useState(page);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        setFade(false);

        const timer = setTimeout(() => {
            setDisplayPage(page);
            setFade(true);
        }, 250);

        return () => clearTimeout(timer);
    }, [page]);

    return (
        <div className = 'home1'>
            <div className = 'leftText'>
                <p>지구를 위한 여행</p>
                <p>DaeGround</p>
                <p>대구의 친환경 여행 경로를 AI로 추천받고</p>
                <p>지구를 위한 가치 있는 여정을 기록하세요</p>
                <div>
                    <div onClick = {() => toMakePlan()}>
                        <p>경로 만들기</p> 
                        <div>
                            <Icon name = 'arrowright' color = 'var(--LM-background-color)' />
                        </div>
                    </div>
                    <div>
                        <p>둘러보기</p>
                    </div>
                </div>
            </div>
            <div className = 'rightImg'>
                <img
                    src={`./Image/bagic/Home/Home${displayPage}.png`}
                    className={fade ? 'homeImage fadeIn' : 'homeImage fadeOut'}
                />
                <div onClick = {() => moveRightPage()}>
                    <Icon name = 'arrowright' color = 'var(--LM-background-color)' />
                </div>
                <div onClick = {() => moveLeftPage()}>
                    <Icon name = 'arrowleft' color = 'var(--LM-background-color)' />
                </div>
                <div>
                    <div onClick = {() => {setPage(1)}} style = {{width: page == 1 ? '20px' : '8px', backgroundColor: page == 1 ? 'black' : undefined }}></div>
                    <div onClick = {() => {setPage(2)}} style = {{width: page == 2 ? '20px' : '8px', backgroundColor: page == 2 ? 'black' : undefined}}></div>
                    <div onClick = {() => {setPage(3)}} style = {{width: page == 3 ? '20px' : '8px', backgroundColor: page == 3 ? 'black' : undefined}}></div>
                    <div onClick = {() => {setPage(4)}} style = {{width: page == 4 ? '20px' : '8px', backgroundColor: page == 4 ? 'black' : undefined}}></div>
                    <div onClick = {() => {setPage(5)}} style = {{width: page == 5 ? '20px' : '8px', backgroundColor: page == 5 ? 'black' : undefined}}></div>
                </div>
            </div>
        </div>
    )
}

export default Home1
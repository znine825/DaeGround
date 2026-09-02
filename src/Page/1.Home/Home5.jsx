import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap, Post, PageHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { auth, db } from "./../../Javascript/firebase.js";
import { getAllPosts } from "./../../Javascript/firebase_logic"
import { doc, collection, setDoc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import './Home5.css'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function CarbonChart({ dates, carData }) {
    const data = {
        labels: dates,   // ['7/21', '7/22', '7/23', ...]
        datasets: [
            {
                label: '자가용',
                data: carData,          // [50, 80, 130, 150, 200]
                borderColor: '#199e70',
                backgroundColor: 'rgba(25,158,112,0.12)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#199e70',
                tension: 0.4,
                borderDash: [4, 3], 
                fill: true              // 영역 채우기
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top' }   // 기본 범례 끄고 직접 커스텀 범례 만들 예정
        },
        scales: {
            y: { beginAtZero: true },
            x: { grid: { display: false } }
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '280px' }}>
            <Line data={data} options={options} />
        </div>
    );
}

function Home5() {

    
    const [onLodding, setOnLodding] = useState(false);
    const [ecodata, setEcodata] = useState(null);

    useEffect (() => {
        async function loading() {
            const ecoRef = doc(db, "statistics", "eco");
            const ecoSnap = await getDoc(ecoRef);
            const data = ecoSnap.data();
            console.log(data);

            setEcodata(data);
            setOnLodding(true)
        }
        loading();
    },[])

    if (!onLodding) {
        return <div>로딩중</div>
    }

    return (
        <div className = 'Home5'>
            <Title 
                icon = 'flag' 
                text = '실시간 탄소절감 현황' 
                title = '우리가 함께 줄인 탄소량' 
                subtitle = '대그라운드 이용자들이 친환경 교통수단을 선택해 절감한 탄소 배출량입니다' 
                locate = 'middle'/>
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div>
                    <CarbonChart
                        dates={[
                            Object.keys(ecodata)[0],
                            Object.keys(ecodata)[1],
                            Object.keys(ecodata)[2],
                            Object.keys(ecodata)[3],
                            Object.keys(ecodata)[4],
                            Object.keys(ecodata)[5],
                            Object.keys(ecodata)[6],
                        ]}
                        carData={[
                            Object.values(ecodata)[0],
                            Object.values(ecodata)[1],
                            Object.values(ecodata)[2],
                            Object.values(ecodata)[3],
                            Object.values(ecodata)[4],
                            Object.values(ecodata)[5],
                            Object.values(ecodata)[6],
                        ]}
                    />
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Home5
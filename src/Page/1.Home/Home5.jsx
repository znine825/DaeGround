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

function CarbonChart({ dates, carData, title }) {
    const data = {
        labels: dates,   
        datasets: [
            {
                label: title,
                data: carData,          
                borderColor: '#199e70',
                backgroundColor: 'rgba(25,158,112,0.12)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#199e70',
                tension: 0.4,
                borderDash: [4, 3], 
                fill: false             
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: true, position: 'top' }  
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

function getRegionReductionPercent(allPost) {
    const regions = ["동구", "중구", "서구", "북구", "남구", "수성구", "달서구", "달성군"];
    const regionDistance = {};

    regions.forEach(region => {
        regionDistance[region] = 0;
    });

    allPost.forEach(post => {
        if (!post.content) return;

        const temp = JSON.parse(post.content);

        for (let i = 0; i < temp.allDay; i++) {
            const region = temp.selectRegions[i];

            if (!region) continue;

            const regionName = regions.find(r => region.startsWith(r));

            if (!regionName) continue;

            for (let j = 0; j < 3; j++) {
                const way = temp.moveType[i][j];
                const path = temp.pathSet[i][j].path;

                let distance;

                if (way === "WALK") {
                    distance = path.route.properties.totalDistance;
                } else {
                    distance = path.properties.totalDistance;
                }

                regionDistance[regionName] += distance;
            }
        }
    });

    const totalDistance = Object.values(regionDistance).reduce(
        (sum, value) => sum + value,
        0
    );

    const result = {};

    regions.forEach(region => {
        result[region] = totalDistance === 0
            ? 0
            : Number(((regionDistance[region] / totalDistance) * 100).toFixed(2));
    });

    return result;
}

function Home5() {

    const [outage, setOutage] = useState(null);

    const [onLodding, setOnLodding] = useState(false);
    const [ecodata, setEcodata] = useState(null);
    const [postdata, setPostdata] = useState(null);
    const [userdata, setUserdata] = useState(null);

    const [dataNum, setDataNum] = useState(0);

    const [chartData, setChartData] = useState([
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ]
    ])

    const [leftMenu, setLeftMenu] = useState([0, 0, 0]);

    const changeNum = (e) => {
        setDataNum(e);
    }

    useEffect (() => {
        async function loading() {
            const allPost = await getAllPosts('view', 'desc');

            const ecoRef = doc(db, "statistics", "eco");
            const ecoSnap = await getDoc(ecoRef);
            const ecodata = ecoSnap.data();

            const ecoSortedData = Object.fromEntries(
                Object.entries(ecodata).sort(
                    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
                )
            );

            const postRef = doc(db, "statistics", "post");
            const postSnap = await getDoc(postRef);
            const postdata = postSnap.data();

            const postSortedData = Object.fromEntries(
                Object.entries(postdata).sort(
                    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
                )
            );

            const userRef = doc(db, "statistics", "user");
            const userSnap = await getDoc(userRef);
            const userdata = userSnap.data();

            const userSortedData = Object.fromEntries(
                Object.entries(userdata).sort(
                    ([dateA], [dateB]) => new Date(dateB) - new Date(dateA)
                )
            );

            const sorted = Object.entries(getRegionReductionPercent(allPost))
                .sort(([, a], [, b]) => b - a)
                .reduce((obj, [key, value]) => {
                    obj[key] = Math.floor(value);
                    return obj;
                }, {});

            setOutage(sorted);
            setUserdata(userSortedData);
            setPostdata(postSortedData);
            setEcodata(ecoSortedData);
            setOnLodding(true)
        }
        loading();
    },[])

    useEffect (() => {
        if (ecodata == null) {
            return;
        }

        
        const chartData = [
            [
                [Object.keys(ecodata)[0], Object.keys(ecodata)[1], Object.keys(ecodata)[2],
                    Object.keys(ecodata)[3], Object.keys(ecodata)[4], Object.keys(ecodata)[5], Object.keys(ecodata)[6]],
                [Object.values(ecodata)[0], Object.values(ecodata)[1], Object.values(ecodata)[2],
                    Object.values(ecodata)[3], Object.values(ecodata)[4], Object.values(ecodata)[5], Object.values(ecodata)[6]]
            ],
            [
                [Object.keys(postdata)[0], Object.keys(postdata)[1], Object.keys(postdata)[2],
                    Object.keys(postdata)[3], Object.keys(postdata)[4], Object.keys(postdata)[5], Object.keys(postdata)[6]],
                [Object.values(postdata)[0], Object.values(postdata)[1], Object.values(postdata)[2],
                    Object.values(postdata)[3], Object.values(postdata)[4], Object.values(postdata)[5], Object.values(postdata)[6]]
            ],
            [
                [Object.keys(userdata)[0], Object.keys(userdata)[1], Object.keys(userdata)[2],
                    Object.keys(userdata)[3], Object.keys(userdata)[4], Object.keys(userdata)[5], Object.keys(postdata)[6]],
                [Object.values(userdata)[0], Object.values(userdata)[1], Object.values(userdata)[2],
                    Object.values(userdata)[3], Object.values(userdata)[4], Object.values(userdata)[5], Object.values(postdata)[6]]
            ]
        ];
        setLeftMenu(
            [Object.values(ecodata).slice(0, 7).reduce((a, b) => a + b, 0),
            Object.values(postdata).slice(0, 7).reduce((a, b) => a + b, 0),
            Object.values(userdata).slice(0, 7).reduce((a, b) => a + b, 0)
        ])
        setChartData(chartData);

    }, [ecodata])


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
                <div className = 'HomeLeft'>
                    <div className = {dataNum == 0 ? 'Home5Select' : ''} onClick = {() => changeNum(0)}>
                        <div>
                            <Icon name = 'profile' color = 'var(--LM-main-color)' />
                        </div>
                        <div>
                            <div>
                                <p>{leftMenu[0]}</p>
                                <p>g</p>
                            </div>
                            <p>절감한 CO₂</p>
                        </div>
                    </div >
                    <div className = {dataNum == 1 ? 'Home5Select' : ''} onClick = {() => changeNum(1)}>
                        <div>
                            <Icon name = 'profile' color = 'var(--LM-main-color)' />
                        </div>
                        <div>
                            <div>
                                <p>{leftMenu[1]}</p>
                                <p>개</p>
                            </div>
                            <p>게시된 여행 경로</p>
                        </div>
                    </div>
                    <div className = {dataNum == 2 ? 'Home5Select' : ''} onClick = {() => changeNum(2)}>
                        <div>
                            <Icon name = 'profile' color = 'var(--LM-main-color)' />
                        </div>
                        <div>
                            <div>
                                <p>{leftMenu[2]}</p>
                                <p>명</p>
                            </div>
                            <p>에코 여행자</p>
                        </div>
                    </div>
                </div>
                <div className = 'HomeMiddle'>
                    <CarbonChart
                        title = {dataNum == 0 ? '절감한 Co2' : dataNum == 1 ? '일별 게시글' : dataNum == 2 ? '일별 가입자' : ''}
                        dates={chartData[dataNum][0]}
                        carData={chartData[dataNum][1]}
                    />
                </div>
                <div className = 'HomeRight'>
                    <div>
                        <Icon name = 'profile' color = 'var(--LM-main-color)' />
                        <p>구별 절감 기여도</p>
                    </div>
                    <div>
                        <div style = {{width: `${Object.values(outage)[0]}%`}}></div>
                        <div style = {{width: `${Object.values(outage)[1]}%`}}></div>
                        <div style = {{width: `${Object.values(outage)[2]}%`}}></div>
                        <div style = {{width: `${Object.values(outage)[3]}%`}}></div>
                        <div style = {{width: `${Object.values(outage)[4]}%`}}></div>
                        <div style = {{width: `${Object.values(outage)[5]}%`}}></div>
                    </div>
                    {Object.entries(outage).slice(0, 5).map(([key, value], i) => (
                        <div key = {key}>
                            <div></div>
                            <p>{key}</p>
                            <div>
                                <div></div>
                                <div style = {{width: `${Object.values(outage)[i]}%`}}></div>
                            </div>
                            <p>{value}%</p>
                        </div>
                    ))}
                    <div>
                        <div></div>
                        <p>기타</p>
                        <div>
                            <div></div>
                            <div style = {{width: `${Object.values(outage)[5] + Object.values(outage)[6] + Object.values(outage)[7]}%`}}></div>
                        </div>
                        <p>{Object.values(outage)[5] + Object.values(outage)[6] + Object.values(outage)[7]}%</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home5
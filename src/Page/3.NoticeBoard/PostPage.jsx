import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost, getUserInfo } from "./../../Javascript/firebase_logic"
import { PageHeader } from './../../Components/Common/Common.jsx'
import { Bus, Walk } from './../../Components/TripCommon/TripCommon.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './PostPage.css'

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function CarbonChart({ dates, carData, transitData }) {
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
            },
            {
                label: '대중교통',
                data: transitData,
                borderColor: '#4a3aa7',
                backgroundColor: 'rgba(74,58,167,0.12)',
                borderWidth: 2,
                pointRadius: 4,
                pointBackgroundColor: '#4a3aa7',
                tension: 0.4,
                fill: true
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

function CO2(way, distance) {
    let carCo2 = 0;

    if (way === "WALK") {
        carCo2 = distance.route.properties.totalDistance * 0.17;
    } else {
        carCo2 = distance.properties.totalDistance * 0.17;
    }

    if (way === 'BUS') {
        return [
            distance.properties.totalDistance * 0.02,
            carCo2
        ];

    } else if (way === 'SUBWAY') {
        return [
            distance.properties.totalDistance * 0.001,
            carCo2
        ];

    } else if (way === 'BUSANDSUBWAY') {
        return [
            distance.properties.totalDistance * 0.01,
            carCo2
        ];

    } else {
        return [0, carCo2];
    }
}


function PostPage() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [info, setInfo] = useState(null);
    const [day, setDay] = useState(0);
    const [allco2, setAllco2] = useState([0, 0, 0]);

 
    useEffect(() => {
        async function loadPost() {
            const data = await getPost(postId);
            const userdata = await getUserInfo(data.authorUid);
            setPost(data);
            setUser(userdata);
            const temp = JSON.parse(data.content);
            setInfo(temp);
            const tempco2 = [0, 0, 0];
    
            for (let i = 0; i < temp.allDay; i++) {
                for (let j = 0; j < 3; j++) {
                    const way = temp.moveType[i][j];
                    const path = temp.pathSet[i][j].path;
    
                    const [used, car] = CO2(way, path);
    
                    let distance;
    
                    if (way === "WALK") {
                        distance = path.route.properties.totalDistance;
                    } else {
                        distance = path.properties.totalDistance;
                    }
    
                    tempco2[0] += used;
                    tempco2[1] += car;
                    tempco2[2] += distance;
                }
    
            }
    
            setAllco2(tempco2);
        }

        loadPost();
    }, [postId]);

    useEffect(() => {
        
    }, [info]);

    

    if (!user) {
        return <div>로딩중...</div>;
    }



    
    const ph = {
        image: info.contentImage,
        icon: 'file',
        iconText: '게시판',
        title: '여행 게시판',
        subtitle: '다른사람들이 만든 다양한 경로를 볼 수 있어요',

        heigth: 300
    };

    const changeDay = (e) => {
        setDay(e);
    }


    return (
        <div className = 'postpage'>
            <PageHeader contents = {ph}/>
            <div className = 'postinfobox'>
                <div>
                    <div>
                        <div></div>
                        <Icon name = {user.info.icon} color = 'var(--LM-mainouttext-color)' />
                        <p>{user.info.name}</p>
                        <p>{post.createdAt.toDate().toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p>{post.title}</p>
                        <Icon name = 'heart' color = 'var(--LM-mainouttext-color)'/>
                        <p>{post.likeCount}</p>
                    </div>
                    <p>{info.allDay == 1 ? '당일 여행' : `${info.allDay - 1}박 ${info.allDay}일`}</p>
                </div>
                <p>{post.text}</p>
            </div>
            <div className = 'co2info'>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>절감된 CO2</p>
                        <p>총 {Math.round(allco2[1] - allco2[0])}g</p>
                    </div>
                    <div className = 'CO2graph'> 
                        <CarbonChart
                            dates={[[info.pathNameSet[day][0].start, '~', info.pathNameSet[day][0].end], 
                                    [info.pathNameSet[day][1].start, '~', info.pathNameSet[day][1].end], 
                                    [info.pathNameSet[day][2].start, '~', info.pathNameSet[day][2].end]] }
                            carData={[
                                    CO2(info.moveType[day][0], info.pathSet[day][0].path)[1], 
                                    CO2(info.moveType[day][1], info.pathSet[day][1].path)[1],
                                    CO2(info.moveType[day][2], info.pathSet[day][2].path)[1]]}
                            transitData={
                                    [
                                    CO2(info.moveType[day][0], info.pathSet[day][0].path)[0], 
                                    CO2(info.moveType[day][1], info.pathSet[day][1].path)[0],
                                    CO2(info.moveType[day][2], info.pathSet[day][2].path)[0]]}
                        />
                    </div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>통계</p>
                    </div>
                    <div>
                        <div>
                            <p>총 이동량</p>
                            <p>{allco2[2]}m</p>
                        </div>
                        <div></div>
                        <div>
                            <p>탄소 배출량</p>
                            <p>{Math.round(allco2[0])}g</p>
                        </div>
                        <div></div>
                        <div>
                            <p>탄소 절감량</p>
                            <p>{Math.round(allco2[1] - allco2[0])}g</p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>여행 코스</p>
                    </div>
                    <div>
                        {Array.from({ length: info.allDay },(_, i) => (
                        <div key={i + 1}>
                            <div style={{ border: `1px solid ${ info.selectRegions[i] === '미등록' ? 'color-mix(in srgb, var(--LM-line-color) 70%, transparent)' : 'var(--LM-main-color)' }`}}
                                onClick={() => { changeDay(i); }}
                                className={ day === i ? 'selectDay select' : 'selectDay'}>
                                <div>
                                    <p>{i + 1}</p>
                                </div>
                                <div>
                                    <p>{i + 1}일차</p>
                                    <p>{info.selectRegions[i]}</p>
                                </div>
                                <div>
                                    <Icon name='down' color='color-mix(in srgb, var(--LM-line-color) 70%, transparent)'/>
                                </div>
                            </div>
                            <div className='path' style={{ display: day === i ? 'block' : 'none' }}>
                                {Array.from({ length: 3 }, (_, i) => (
                                <div key={i}>
                                    {info.pathSet[day][i].type != "WALK" &&
                                    <Bus info = {info} day = {day} num = {i}/>}
                                    {info.pathSet[day][i].type == "WALK" &&
                                    <Walk info = {info} day = {day} num = {i}/>}
                                </div>))}
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostPage;
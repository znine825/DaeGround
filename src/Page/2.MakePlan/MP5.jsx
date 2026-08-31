import { useState, useEffect } from "react";
import { Title, Input, Button, LimitedTextarea } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { Bus, Walk } from '../../Components/TripCommon/TripCommon.jsx'
import { createPost } from '../../Javascript/firebase_logic.js'
import { app, auth } from "../../Javascript/firebase.js";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import { getContentImage } from '../../Javascript/TourAPI/httpsCall.js'
import './MP5.css'
import './MakePlan.css'

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

function MP5({info, setInfo, page, pageSet}) {

    const [day, setDay] = useState(0);
    const [allco2, setAllco2] = useState([0, 0, 0]);
    const navigate = useNavigate();

    useEffect(() => {
        const tempco2 = [0, 0, 0];

        for (let i = 0; i < info.allDay; i++) {
            for (let j = 0; j < 3; j++) {
                const way = info.moveType[i][j];
                const path = info.pathSet[i][j].path;
    
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
    }, [info]);


    const changeDay = (e) => {
        setDay(e);
    }

    const moveLeftPage = () => {
        pageSet((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    

    const [addTrip, setAddTrip] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const seveTrip = () => {
        setAddTrip(true);

        window.scrollTo({
            top: 270,
            left: 0,
            behavior: 'smooth'
        });
    }

    const savePost = () => {
        async function save() {
            const tempInfo = structuredClone(info);
            for(let i = 0; i < info.allDay; i++) {
                for(let j = 0; j < 3; j++) {
                     tempInfo.pathSet[i][j].endWalk = 0;
                     tempInfo.pathSet[i][j].startWalk = 0;
    
                    if (tempInfo.moveType[i][j] == "WALK") {
                        tempInfo.pathSet[i][j].path.route.legs = 0;
                    } else {
                        for(let k = 0; k < tempInfo.pathSet[i][j].path.steps.length; k++) {
                            tempInfo.pathSet[i][j].path.steps[k].path = 0;
                            tempInfo.pathSet[i][j].path.steps[k].properties.stops = 0;
                        }
                    }
                }
            }
            var image = null;
            for (let i = 0; i < tempInfo.allDay; i++) {
                for (let j = 0; j < 4; j++) {
                    image = await getContentImage(tempInfo.allContentsID[i][j]);
                    console.log(i, j, image);
                    if (image.length) {
                        const random3 = Math.floor(Math.random() * image.length);
                        tempInfo.contentImage = image[random3].originimgurl;
                        break;
                    }
                }
            }


            const uid = auth.currentUser?.uid;
            const db = getFirestore();

            const docSnap = await getDoc(
                    doc(db, "users", uid)
                );

            const userRef = await doc(db, "users", uid);
            await updateDoc(userRef, {
                'info.co2' : docSnap.data().info.co2 + Math.round(allco2[1] - allco2[0])
            });

            createPost(title, tempInfo, text);
            setAddTrip(false);
            alert('여행 경로가 저장되었습니다.')
            navigate('/');
        }; 
        save();
    }

    return (
        <div className = 'MP5'>
            <div></div>
            <div>
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
                        <p>나의 여행</p>
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
            <div className = 'pageButton'>
                {page != 1 && <div onClick = {() => moveLeftPage()}>
                    <Button width = '150' height = '50' text = '이전단계' fsize = '16' fweight = '500' />
                </div>}
                <div></div>
                <div onClick = {() => seveTrip()}>
                    <Button width = '150' height = '50' text = '게시하기' fsize = '16' fweight = '500' />
                </div>
            </div>
            {addTrip &&
            <div className = 'addtrip'>
                <div>
                    <Title 
                        icon = 'calendarCheck'
                        text = '게시하기' 
                        title = '여행 계획을 업로드해요'
                        subtitle = '다른 사람들도 볼 수 있어요'
                        locate = 'left'/>
                    <p>제목</p>
                    <input placeholder = '여행 제목을 입력해주세요' value={title} maxLength = {10} onChange={(e) => setTitle(e.target.value)}/>
                    <p>{title.length}/10자</p>
                    <p>여행 설명</p>
                    <LimitedTextarea
                        value={text}
                        onChange={setText}   // state 함수를 그대로 넘김
                        maxLines={5}
                        placeholder="최대 5줄까지 입력 가능"
                        />
                    <p>{text.length}/100자</p>
                    <div className = 'pageButton'>
                        <div onClick = {() => {setAddTrip(false)}}>
                            <Button width = '150' height = '50' text = '취소' fsize = '16' fweight = '500' />
                        </div>
                        <div onClick = {() => savePost()}>
                            <Button width = '150' height = '50' text = '저장' fsize = '16' fweight = '500' />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default MP5


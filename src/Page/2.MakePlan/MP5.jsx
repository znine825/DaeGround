import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './MP5.css'
import './MakePlan.css'

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';

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
            legend: { display: false }   // 기본 범례 끄고 직접 커스텀 범례 만들 예정
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


function MP5({info, setInfo, page, pageSet}) {

    const [day, setDay] = useState(0);

    const changeDay = (e) => {
        setDay(e);
    }

    const moveLeftPage = () => {
        pageSet((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {
        pageSet((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    }; 

    function transitionCo2(way, distance) {
        if (way == 'walk') {

        }
    }

    return (
        <div className = 'MP5'>
            <Title 
                icon = 'calendarCheck'
                text = '5단계' 
                title = '탄소 절감량을 확인해봐요'
                subtitle = '만들어진 경로를 바탕으로 얼만큼 절감했는지 계산했어요'
                locate = 'left'/>
            <div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>절감된 CO2</p>
                        <p>총 {}co2</p>
                    </div>
                    <div className = 'CO2graph'>
                        
                        <CarbonChart
                            dates={[info.spotName[day][0], info.spotName[day][1], info.spotName[day][2], info.spotName[day][3]]}
                            carData={[50, 80, 130, 150]}
                            transitData={[30, 55, 80, 100]}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>이동 경로</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
            <div className = 'pageButton'>
                {page != 1 && <div onClick = {() => moveLeftPage()}>
                    <Button width = '150' height = '50' text = '이전단계' fsize = '16' fweight = '500' />
                </div>}
                <div></div>
                {page != 5 &&<div onClick = {() => moveRightPage()}>
                    <Button width = '150' height = '50' text = '다음단계' fsize = '16' fweight = '500' />
                </div>}
            </div>
        </div>
    )
}

export default MP5
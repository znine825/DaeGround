import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'


import MP1 from './MP1.jsx'
import MP2 from './MP2.jsx'
import MP3 from './MP3.jsx'
import MP4 from './MP4.jsx'
import MP5 from './MP5.jsx'

import './MakePlan.css'



const loadMapText = [
    {
        icon: 'mapPin',
        title: '여행 정보 입력',
        subtitle: '이번 여행의 정보를\n입력하세요',
        line: true
    },
    {
        icon: 'calendarCheck',
        title: '여행지 선택',
        subtitle: '어디로 여행을 갈지\n선택하세요',
        line: true
    },
    {
        icon: 'terminal',
        title: '여행 테마 선택',
        subtitle: '여행의 테마를\n선택하세요',
        line: true
    },
    {
        icon: 'map',
        title: 'AI여행 생성',
        subtitle: 'AI가 여행을 만들어요\n원하는 부분을 수정하세요',
        line: true
    },
    {
        icon: 'map',
        title: '탄소 절감량 확인',
        subtitle: '내가 절약한 탄소량을\n한눈에 확인하세요',
        line: false
    }
]



function MakePlan() {
    const [pageNum, setPageNum] = useState(1);

    const [tripInfo, setTripInfo] = useState({
        startDay: null,
        endDay: null,
        allDay: 0,

        peopleType: [true, false, false, false],
        peopleNumArray: [1, 0, 0, 0],
        peopleNum: 1,

        theme: [],
        themetitle: [],
        pathset: [],
        pathNameset: [],
        walkPath: [],

        selectRegions: null,

        theme1: null,
        theme2: null
    });


    return (
        <div className = 'makePlan'>
            <div>
                <Title 
                    icon = {loadMapText[pageNum - 1].icon}
                    text = '여행 만들기' 
                    title = {loadMapText[pageNum - 1].title}
                    subtitle = {loadMapText[pageNum - 1].subtitle}
                    locate = 'middle'/>
                <LoadMap contents = {loadMapText}/>
                {pageNum == 1 && <MP1 info = {tripInfo} setInfo = {setTripInfo} page = {pageNum} pageSet = {setPageNum} />}
                {pageNum == 2 && <MP2 info = {tripInfo} setInfo = {setTripInfo} page = {pageNum} pageSet = {setPageNum} />}
                {pageNum == 3 && <MP3 info = {tripInfo} setInfo = {setTripInfo} page = {pageNum} pageSet = {setPageNum} />}
                {pageNum == 4 && <MP4 info = {tripInfo} setInfo = {setTripInfo} page = {pageNum} pageSet = {setPageNum} />}
                {pageNum == 5 && <MP5 info = {tripInfo} setInfo = {setTripInfo} page = {pageNum} pageSet = {setPageNum} />}
            </div>
        </div>
    )
}

export default MakePlan






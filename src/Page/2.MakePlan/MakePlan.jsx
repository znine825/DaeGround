import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap, PageHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'


import MP1 from './MP1.jsx'
import MP2 from './MP2.jsx'
import MP3 from './MP3.jsx'
import MP4 from './MP4.jsx'
import MP5 from './MP5.jsx'

import './MakePlan.css'

const phInfo = [
    {
        icon: 'mapPin',
        icontext: '1단계',
        title: '누구와, 언제 떠나요?',
        subtitle: '인원과 여행 날짜를 알려주세요',
    },
    {
        icon: 'mapPin',
        icontext: '2단계',
        title: '대구 어디로 떠나요?',
        subtitle: '정하신 장소 또는 가고 싶은 장소를 골라주세요',
    },
    {
        icon: 'mapPin',
        icontext: '3단계',
        title: '어떤 여행을 하고 싶나요?',
        subtitle: '선호하는 여행 테마를 선택해주세요',
    },
    {
        icon: 'mapPin',
        icontext: '4단계',
        title: '여행 경로가 완성되었어요',
        subtitle: '맘에드는지 확인해보세요',
    },
    {
        icon: 'mapPin',
        icontext: '5단계',
        title: '탄소절감량을 확인해봐요',
        subtitle: '만들어진 경로를 바탕을 얼만큼 절감했는지 계산했어요',
    }
]

const loadMapText = [
    {
        icon: 'mapPin',
        icontext: '1단계',
        title: '여행 정보 입력',
        subtitle: '이번 여행의 정보를\n입력하세요',
        line: true
    },
    {
        icon: 'calendarCheck',
        icontext: '2단계',
        title: '여행지 선택',
        subtitle: '어디로 여행을 갈지\n선택하세요',
        line: true
    },
    {
        icon: 'terminal',
        icontext: '3단계',
        title: '여행 테마 선택',
        subtitle: '여행의 테마를\n선택하세요',
        line: true
    },
    {
        icon: 'map',
        icontext: '4단계',
        title: 'AI여행 생성',
        subtitle: 'AI가 여행을 만들어요\n원하는 부분을 수정하세요',
        line: true
    },
    {
        icon: 'map',
        icontext: '5단계',
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
        selectRegions: null,

        moveType: [],
        moveDetail: [],
        pathSet: [],
        pathNameSet: [],

    });

    const ph = {
        image: './Image/bagic/PageHeader.png',
        icon: phInfo[pageNum - 1].icon,
        iconText: phInfo[pageNum - 1].icontext,
        title: phInfo[pageNum - 1].title,
        subtitle: phInfo[pageNum - 1].subtitle,

        heigth: 300
    };

    return (
        <div className = 'makePlan'>
            <div>
                <PageHeader contents = {ph} />
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






import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import MP1 from './MP1.jsx'

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

async function testCall() {
    const functions = getFunctions();
    const fn = httpsCallable(functions, 'callTourApi');
    
    try {
        const result = await fn({ 
            endpoint: 'areaBasedList2', 
            service : 'KorService2', 
            params: { 
                areaCode: '1', 
                numOfRows: 5, 
                pageNo: 1,
                contentTypeId: 39 } });
        console.log(result.data);
    } catch (error) {
        console.error(error.code, error.message);
    }
}

function MakePlan() {
    const [pageNum, setPageNum] = useState(1);

    

    const moveLeftPage = () => {
        setPageNum((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {
        setPageNum((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    }; 


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
                {pageNum == 1 && <MP1 />}
                {pageNum == 2 && <div>2page</div>}
                {pageNum == 3 && <div>3page</div>}
                {pageNum == 4 && <div>4page</div>}
                {pageNum == 5 && <div>5page</div>}
            </div>
            <div>
                {pageNum != 1 && <div onClick = {() => moveLeftPage()}>
                    <Button width = '150' height = '50' text = '이전단계' fsize = '16' fweight = '500' />
                </div>}
                <div></div>
                {pageNum != 5 &&<div onClick = {() => moveRightPage()}>
                    <Button width = '150' height = '50' text = '다음단계' fsize = '16' fweight = '500' />
                </div>}
            </div>
        </div>
    )
}

export default MakePlan






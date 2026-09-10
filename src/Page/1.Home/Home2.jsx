import { Title, LoadMap } from '../../Components/Common/Common.jsx'
import { motion } from "motion/react";

import './Home2.css'
function Home2() {

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
            icon: 'puzzle',
            icontext: '3단계',
            title: '여행 테마 선택',
            subtitle: '여행의 테마를\n선택하세요',
            line: true
        },
        {
            icon: 'terminal',
            icontext: '4단계',
            title: 'AI여행 생성',
            subtitle: 'AI가 여행을 만들어요\n원하는 부분을 수정하세요',
            line: true
        },
        {
            icon: 'chartbar',
            icontext: '5단계',
            title: '탄소 절감량 확인',
            subtitle: '내가 절약한 탄소량을\n한눈에 확인하세요',
            line: false
        }
    ]

    return (
        <motion.div 
            className = 'home2'
            initial={{ opacity: 0}}
            whileInView={{ opacity: 1}}
            transition={{
                duration: 0.8,
                ease: "easeOut"
            }}>
            <Title 
                    icon = 'flag' 
                    text = '이용방법' 
                    title = '어떻게 이용하나요?' 
                    subtitle = '5단계로 간단하게 에코 여행을 시작하세요' 
                    locate = 'middle'/>
            <LoadMap contents = {loadMapText}/>
        </motion.div>
    )
}

export default Home2
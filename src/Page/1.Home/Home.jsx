import { useState, useEffect, use } from "react";
import { motion } from "motion/react";
import './Home.css'
import Home1 from './Home1.jsx'
import Home2 from './Home2.jsx'
import Home3 from './Home3.jsx'
import Home4 from './Home4.jsx'
import Home5 from './Home5.jsx'
function Home() {

    useEffect(() => {
        async function test() {
            const response = await fetch("https://apis.data.go.kr/B551011/KorService2/areaBasedList2?serviceKey=19d9c07bfc7bbe1c1fcb724f8911de3d3b3054cd8d58e28d069e12d44ffa3a60&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&arrange=C&contentTypeId=12&lDongRegnCd=26&lDongSignguCd=380&lclsSystm1=NA&lclsSystm2=NA04&lclsSystm3=NA040500");
            console.log(response.body);
        }
        test();
    })
    return (
        <motion.div 
            className = 'home'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            <img src = './Image/bagic/MainBackground.png'/>
            <div>
                <Home1 />
            </div>
            <div>
                <div></div>
                <div></div>
            </div>

            <div>
                <Home2 />
            </div>
            <div>
                <Home5 />
            </div> 
            <div>
                <Home3 />
            </div>
            <div>
                <Home4 />
            </div> 
        </motion.div>
    )
}

export default Home
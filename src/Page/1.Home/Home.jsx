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
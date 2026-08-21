import { useState, useEffect } from "react";
import './Namgu.css'

function Namgu({info, setInfo, day, incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const setRegion = (regionText) => {
        const temp = {...info};
        temp['selectRegions'][day] = `남구 ${regionText}`;
        setInfo(temp);
    }


    return (
        <div className = 'Namgu'>
            <p onClick = {() => setRegion('이천동')} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>이천동</p>
            <p onClick = {() => setRegion('대명동')} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>대명동</p>
            <p onClick = {() => setRegion('봉덕동')} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>봉덕동</p>

            <div>
                <svg onClick = {() => setRegion('이천동')} className = 'dong' width="328" height="403" viewBox="0 0 328 403" fill= { hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M239.34 46.6147L243.84 33.6147H245.84L264.34 40.1147L322.34 44.6147L325.34 64.6147L316.84 98.6147L319.34 125.115L311.34 118.615V113.615L301.84 110.615V106.115L279.34 100.615L270.84 80.6147L248.84 85.6147V68.6147L239.34 60.1147V46.6147Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg onClick = {() => setRegion('대명동')} className = 'dong' width="328" height="403" viewBox="0 0 328 403" fill= { hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M239.34 46.6147L243.34 33.6147L216.84 26.6147L170.84 32.6147L121.34 4.11475L115.34 70.1147L46.3398 123.615L3.83984 195.615L20.3398 207.615V213.615L33.3398 225.615L50.3398 271.115L75.8398 276.615L83.8398 266.115L98.8398 291.615L94.8398 306.615L98.8398 312.115H107.34L124.34 325.615L137.84 346.615L147.34 353.615L151.84 365.615L165.84 361.615L179.84 339.615L197.34 299.615L192.84 283.615L197.34 273.615L215.34 245.115L205.34 194.115L184.34 158.115H230.34V134.115H217.84L221.34 100.115L230.34 91.6147L234.34 95.6147H246.84L248.84 84.1147V68.6147L239.34 59.6147V46.6147Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg onClick = {() => setRegion('봉덕동')} className = 'dong' width="328" height="403" viewBox="0 0 328 403" fill= { hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M246.58 95.6147L249.072 85.1147L271.002 80.1147L279.476 100.115L301.905 105.615V110.115L311.375 113.115V118.115L318.851 124.615V146.115L310.378 195.115L322.34 238.115V248.615L307.387 255.615L299.911 286.115L275.488 346.615H264.523L257.047 352.615L238.107 356.615L231.627 365.115L221.16 371.115L224.649 385.615L218.17 390.115L184.277 399.115L172.813 371.615L164.838 363.115L165.835 361.615L179.791 339.615L197.236 299.615L192.75 283.615L197.236 273.615L215.179 245.115L205.211 194.115L184.277 158.115H230.132V134.115H217.671L221.16 100.115L230.132 91.6147L234.119 95.6147H246.58Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'outline' width="328" height="403" viewBox="0 0 328 403" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M164.34 362.115L172.315 371.115L184.277 399.115L217.671 390.115L224.649 385.615L221.16 371.115L231.128 365.615L238.106 356.615L256.548 353.115L264.523 346.615H268.012H274.99L298.914 287.615L307.886 255.115L322.34 249.115V240.615L310.378 195.615L318.352 147.115V123.115" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M166.34 362.615L151.84 365.615L146.84 353.115L137.84 346.615L123.84 325.115L106.84 312.115H98.8398L94.8398 307.115L98.8398 291.615L83.8398 266.115L75.8398 276.615L50.3398 271.615L33.3398 225.115L20.3398 213.615V207.615L3.33984 195.615L46.3398 124.115L115.34 70.1147L121.34 4.11475L170.84 32.6147L216.84 27.1147L246.34 33.6147" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M318.84 126.115L316.34 98.6147L325.34 65.1147L322.34 44.6147L263.84 40.1147L244.34 33.1147" stroke = {outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    )
}

export default Namgu







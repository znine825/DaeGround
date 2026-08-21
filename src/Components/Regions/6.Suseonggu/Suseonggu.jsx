import { useState, useEffect } from "react";
import './Suseonggu.css'

function Suseonggu({info, setInfo, day, incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const setRegion = (regionText) => {
        const temp = {...info};
        temp['selectRegions'][day] = `수성구 ${regionText}`;
        setInfo(temp);
    }

    return (
        <div className = 'Suseonggu'>
            <p onClick = {() => setRegion('수성동')} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>수성동</p>
            <p onClick = {() => setRegion('중동')} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>중동</p>
            <p onClick = {() => setRegion('상동')} onMouseEnter={() => setHoverIndex(7)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 7 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>상동</p>
            <p onClick = {() => setRegion('두산동')} onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 6 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>두산동</p>
            <p onClick = {() => setRegion('만촌동')} onMouseEnter={() => setHoverIndex(11)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 11 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>만촌동</p>
            <p onClick = {() => setRegion('범어동')} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>범어동</p>
            <p onClick = {() => setRegion('황금동')} onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>황금동</p>
            <p onClick = {() => setRegion('고산동')} onMouseEnter={() => setHoverIndex(10)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 10 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>고산동</p>
            <p onClick = {() => setRegion('자산동')} onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>자산동</p>
            <p onClick = {() => setRegion('파동')} onMouseEnter={() => setHoverIndex(8)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 8 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>파동</p>
            <p onClick = {() => setRegion('범물동')} onMouseEnter={() => setHoverIndex(9)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 9 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>범물동</p>

            

            <div>
                <svg onClick = {() => setRegion('범어동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M90.7402 73.1843V104.184L103.24 106.184V110.684H106.24V113.684L117.24 116.684V123.184L123.24 116.684L126.74 102.684L133.24 108.184L137.24 104.184L142.74 113.684L150.74 119.184L158.24 113.684L153.24 98.6843L160.74 87.6843L155.24 74.6843L149.24 73.1843L145.24 48.6843L133.24 43.1843L115.24 46.1843L82.2402 42.6843L78.2402 52.6843L95.2402 64.1843V73.1843H90.7402Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('수성동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M67.7402 110.184H51.7402L50.2402 107.684L54.2402 92.6843L51.7402 72.6843L59.2402 59.1843L67.2402 56.6843L72.7402 40.6843L82.2402 42.6843L78.2402 52.6843L95.2402 64.6843V73.1843H90.7402V103.684L79.4902 102.934L67.7402 102.184V110.184Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('중동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M62.2402 149.184L49.2402 145.684L51.7402 125.684L50.2402 111.184L51.7402 110.684H67.7402V102.684L79.4902 103.434L78.7402 141.684H65.2402L62.2402 149.184Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('황금동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 4 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M158.24 168.184L168.74 159.184L166.24 137.684L164.74 116.684L158.24 113.684L150.74 119.184L142.74 113.684L137.24 104.184L133.24 108.184L126.74 102.684L123.24 116.684L117.24 123.184V116.684L106.24 113.684V110.684H103.24V106.184L90.7402 104.184L78.9902 103.434L78.2402 141.684L100.74 143.684L108.74 145.684H117.24V157.184L123.24 164.184H130.24L137.24 159.184L147.24 178.184H155.24L158.24 168.184Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('자산동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 5 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(5)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M137.24 259.184L100.74 232.184L106.24 222.184L103.24 212.684L100.74 205.184L106.24 201.184V196.684L108.74 190.184L111.74 186.184L108.74 178.184L97.2402 179.684L100.74 143.684L108.74 145.684H117.24V157.184L123.24 164.184H130.24L137.24 159.184L147.24 178.184H155.24L158.24 168.184L168.74 159.184H174.74L180.24 172.684L186.74 177.184L184.24 189.684L187.24 196.684L184.74 199.684L182.74 194.184L174.74 196.684L166.74 202.684H160.74V196.684H158.24L155.24 205.184L145.24 212.684L137.24 215.184L140.24 229.684L145.24 233.151L142.74 252.684L137.24 259.184Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('두산동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 6 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(6)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M62.2402 199.684V196.684L69.7402 194.184L71.2402 186.184L78.2402 181.184V141.684L100.74 143.684L97.2402 179.684L108.74 178.184L111.74 186.184L108.74 190.184L106.24 196.684V201.184L100.74 205.184L103.24 212.684L106.24 222.184L100.74 232.184L95.2402 229.684L90.7402 219.684L81.7402 208.684L62.2402 199.684Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('상동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 7 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(7)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M54.7402 199.684L51.2402 190.184L44.2402 165.184L47.7402 145.684L62.2402 149.184L65.2402 141.684H78.2402V181.184L74.7402 183.684L71.2402 186.184L69.7402 194.184L62.2402 196.684L54.7402 199.684Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('파동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 8 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(8)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M54.7402 199.684L51.2402 189.684L44.2402 193.184L27.2402 237.184L9.24023 242.184L3.24023 253.684L23.2402 268.684L35.7402 266.184L77.7402 279.684L90.2402 269.684L115.74 279.684L145.74 276.684V271.184L137.74 259.184L101.24 232.184L95.7402 229.684L91.2402 219.684L82.2402 208.684L62.7402 199.684V196.684L54.7402 199.684Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('범물동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 9 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(9)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M145.24 270.684L137.24 258.684L142.74 252.184L145.24 232.651L140.24 229.184L137.24 214.684L145.24 212.184L155.24 204.684L158.24 196.184H160.74V202.184H166.74L174.74 196.184L182.74 193.684L184.74 199.184L187.24 196.184L191.74 200.684L195.24 219.184L224.24 221.684L244.24 232.651L235.24 263.684L240.24 276.184L257.74 282.184L259.74 311.684L248.74 307.184L231.24 304.684V302.184L183.24 288.684L178.24 276.184H145.24V270.684Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('고산동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 10 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(10)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M191.24 200.211L186.74 195.711L184.24 189.211L186.74 177.211L180.24 172.711L174.74 159.184H169.24L166.24 137.211L180.24 131.711L196.74 115.711L200.74 112.711L203.74 107.211L209.74 99.7108V86.7108L196.74 81.7108V63.2108H203.74L215.24 44.7108V22.2108L250.24 19.2108L259.24 25.2108L270.74 69.7108L295.24 79.2108H340.74L354.74 70.2108L371.74 62.2108L400.74 79.2108L390.74 84.7108L398.24 92.2108L402.74 135.711L396.24 149.211L397.74 155.711L386.74 164.211L382.74 158.711L348.74 191.711V207.211L366.74 227.211L372.74 257.211V269.211L358.74 271.211L344.74 281.211L346.74 288.211L322.74 309.211L306.74 302.211L296.74 306.711L272.74 326.711L267.24 315.711L259.24 311.211L257.24 281.711L239.74 275.711L234.74 263.211L243.74 232.178L223.74 221.211L194.74 218.711L191.24 200.211Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('만촌동')} className = 'dong' width="406" height="330" viewBox="0 0 406 330" fill= { hoverIndex === 11 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(11)}
                    onMouseLeave={() => setHoverIndex(null)}>
                <path d="M152.74 97.9536L158.24 113.454L164.24 116.684L166.24 137.184L179.74 131.684L196.24 115.684L200.24 112.684L203.24 107.184L209.24 99.6843V86.6843L196.24 81.6843V63.1843H203.24L214.74 44.6843V22.1843L202.24 10.6843L193.74 13.6843L184.74 5.18433L173.24 2.68433L144.24 22.1843L128.74 28.1843L116.24 45.1843L132.74 43.1843L145.24 48.6843L149.24 73.1843L155.74 74.6843L160.24 87.6843L152.74 97.9536Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
            
                <svg className = 'outline' width="406" height="330" viewBox="0 0 406 330" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M116.24 46.1843L81.7402 42.6843" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M50.2402 109.684L54.2402 92.1843L51.7402 72.1843L59.7402 59.1843L67.2402 56.6843L72.7402 40.6843L82.7402 42.6843" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M50.2402 108.684L51.7402 126.684L47.7402 146.684" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M50.7402 192.184L44.2402 164.684L47.7402 145.684" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M258.49 311.684L249.24 307.184L231.24 304.684V302.184L183.24 288.684L178.74 276.184L144.74 277.184" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M115.24 45.1843L129.24 28.1843L143.74 22.6843L173.74 2.68433L184.24 5.18433L193.74 13.6843L201.74 10.6843L215.24 22.6843" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M51.7402 189.684L44.7402 192.684L27.2402 237.184L9.74023 242.184L3.24023 253.684L23.2402 269.184L35.2402 266.184L77.2402 279.684L90.2402 269.184L115.24 279.684L145.74 277.184" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M152.74 97.9536L158.24 113.454L164.24 116.684L166.24 137.184L179.74 131.684L196.24 115.684L200.24 112.684L203.24 107.184L209.24 99.6843V86.6843L196.24 81.6843V63.1843H203.24L214.74 44.6843V22.1843L202.24 10.6843L193.74 13.6843L184.74 5.18433L173.24 2.68433L144.24 22.1843L128.74 28.1843L116.24 45.1843L132.74 43.1843L145.24 48.6843L149.24 73.1843L155.74 74.6843L160.24 87.6843L152.74 97.9536Z" stroke={incolor} strokeWidth={inline}/>
                    <path d="M215.74 22.7108C226.74 21.5441 250.94 19.1108 249.74 18.7108C248.54 18.3108 255.574 22.5441 259.24 24.7108L270.24 69.7108L294.74 79.2108H340.24L356.24 69.7108L371.74 62.2108L400.74 79.2108L390.74 84.7108L398.24 92.2108L402.74 135.211L395.74 149.211L398.24 155.711L386.24 164.711L382.74 158.211L348.74 191.711V207.211L366.24 226.711L372.74 256.711V269.211L358.74 271.211L344.74 281.211L346.74 288.211L322.24 309.211L306.24 301.711L296.74 306.711C289.24 313.544 273.94 327.111 272.74 326.711C271.54 326.311 268.574 319.211 267.24 315.711L257.99 311.211" stroke={outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    )
}

export default Suseonggu

import { useState, useEffect } from "react";
import './Dalseogu.css'

function Dalseogu({info, setInfo, day, incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const setRegion = (regionText) => {
        const temp = {...info};
        temp['selectRegions'][day] = `달서구 ${regionText}`;
        setInfo(temp);
    }

    return (
        <div className = 'Dalseogu'>
            <p onClick = {() => setRegion('죽전동')} onMouseEnter={() => setHoverIndex(12)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 12 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>죽전동</p>
            <p onClick = {() => setRegion('감삼동')} onMouseEnter={() => setHoverIndex(11)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 11 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>감삼동</p>
            <p onClick = {() => setRegion('두류동')} onMouseEnter={() => setHoverIndex(10)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 10 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>두류동</p>
            <p onClick = {() => setRegion('성당동')} onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>성당동</p>
            <p onClick = {() => setRegion('본리동')} onMouseEnter={() => setHoverIndex(8)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 8 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>본리동</p>
            <p onClick = {() => setRegion('본동')} onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 6 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>본동</p>
            <p onClick = {() => setRegion('용산동')} onMouseEnter={() => setHoverIndex(13)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 13 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>용산동</p>
            <p onClick = {() => setRegion('이곡동')} onMouseEnter={() => setHoverIndex(14)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 14 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>이곡동</p>
            <p onClick = {() => setRegion('신당동')} onMouseEnter={() => setHoverIndex(15)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 15 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>신당동</p>
            <p onClick = {() => setRegion('장기동')} onMouseEnter={() => setHoverIndex(9)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 9 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>장기동</p>
            <p onClick = {() => setRegion('월성동')} onMouseEnter={() => setHoverIndex(7)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 7 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>월성동</p>
            <p onClick = {() => setRegion('송현동')} onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>송현동</p>
            <p onClick = {() => setRegion('상인동')} onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>상인동</p>
            <p onClick = {() => setRegion('진천동')} onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>진천동</p>
            <p onClick = {() => setRegion('도원동')} onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>도원동</p>
            

            <div>
                <svg onClick = {() => setRegion('상인동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M197.145 187.793L193.645 196.793L201.645 203.793L196.145 208.793L197.145 214.293L204.145 221.793V233.793H220.145L232.145 239.793H252.145L258.645 248.793H264.645V244.293L287.145 246.793L293.145 244.293H307.645L311.645 242.793L327.145 246.793L329.145 244.293L343.145 253.293H369.145H373.145L375.645 244.293H366.145L359.145 226.793L350.145 226.293L324.145 198.293L306.145 208.793L304.145 207.793L287.645 206.293L278.645 200.793L262.145 194.293L242.145 181.293L241.145 184.793L229.645 173.293L204.145 181.793L201.645 185.293L197.145 187.793Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('도원동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M373.145 253.793H369.145H343.145L329.145 244.793L327.145 247.293L311.645 243.293L307.645 244.793H293.145L287.145 247.293L264.645 244.793V249.293H258.645L252.145 240.293H232.145L220.145 234.293H204.145L184.645 238.293L188.145 242.793L193.145 253.293L198.145 249.293L199.645 255.793L209.145 265.293L227.145 278.793L228.645 281.293L228.145 294.293L226.645 299.793L229.145 314.793L244.645 328.293L251.145 350.293L262.645 352.793L269.145 377.793H280.645L289.645 372.793L301.145 374.793L312.645 355.793L321.645 352.793L309.645 289.793L319.145 282.793L347.145 287.293L356.145 278.793L371.645 273.293L369.145 262.793L373.145 254.293" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('진천동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M136.145 191.293L120.645 210.293L122.145 219.293L141.645 232.293L126.145 240.793L124.145 248.793L142.645 249.793L161.145 283.793L172.145 299.793H184.145L190.145 317.793L215.145 323.293L229.145 314.293L226.645 299.793L228.145 294.293V280.793L226.645 278.293L208.645 264.793L199.645 255.793L198.145 248.793L193.145 253.293L188.145 242.793L184.145 237.793L203.645 233.793V221.793L196.645 214.293L195.645 208.793L201.145 203.793L193.145 196.793L164.145 214.293L136.145 191.293Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('송현동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 4 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M324.645 197.793L306.145 209.293L304.145 207.793L287.645 206.293L278.645 200.793L262.145 194.293L242.145 180.793L241.145 184.293L230.145 172.293L238.145 163.293L236.145 160.293L238.145 146.793H240.645V143.293H252.145L254.645 127.793H278.645L279.145 129.293L274.645 137.793L289.145 153.793L299.145 178.293L314.645 180.793L316.145 176.793L324.645 188.293L325.145 198.793" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('성당동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 5 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(5)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M263.145 86.7927L250.645 79.7927L242.145 93.2927V104.793L243.645 112.293H251.145V115.793L256.145 117.293V127.293H281.645L296.645 102.293L331.645 73.7927L327.145 66.2927L313.145 72.7927L310.145 79.7927H305.145L303.645 76.2927L299.145 77.7927V83.7927L295.145 81.2927L279.645 87.2927V89.7927L264.645 93.2927L263.145 86.7927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('본동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 6 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(6)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M252.145 143.293L254.145 128.293H189.145L188.145 132.793L193.145 135.793V140.793H198.145L195.645 134.793H207.145C206.812 139.293 206.345 148.593 207.145 149.793C207.945 150.993 210.645 150.959 211.645 150.793L214.145 148.793L216.145 150.793V154.793L225.145 160.293V162.293L229.645 172.293L238.145 163.293L236.145 160.293L238.145 146.793H240.645V143.293H252.145Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('월성동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 7 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(7)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M60.145 137.293L51.1453 150.793L58.6453 171.793C54.4786 184.459 46.0453 210.193 45.6453 211.793C45.2453 213.393 49.1453 206.793 51.1453 203.293L61.1453 200.793L68.6453 193.793C84.6453 199.626 117.045 211.393 118.645 211.793C120.245 212.193 120.645 210.626 120.645 209.793L136.145 190.793L164.145 213.793L193.145 196.293L196.645 187.293L201.145 184.793L203.645 181.293L229.645 172.793L225.145 162.293V160.293L216.145 154.793V150.793L214.145 148.293L211.145 150.793C210.145 150.959 207.945 150.993 207.145 149.793C206.345 148.593 206.812 139.293 207.145 134.793H195.645L198.145 140.793H193.145V135.793L188.145 132.793L189.145 128.293H188.145L123.645 133.793H101.645L60.145 137.293Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('본리동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 8 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(8)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M188.145 108.793L190.145 127.293L256.145 127.793V117.293L251.145 115.793V112.293H243.645L242.145 103.793H215.145V108.793L190.645 110.293L188.145 108.793Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('장기동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 9 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(9)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M142.145 80.7927L150.645 77.2927H171.145L181.645 83.7927L198.645 80.7927V91.7927L203.145 89.7927L205.645 99.7927L215.145 103.793V108.793L190.145 110.293L188.145 108.793L190.145 127.293L124.145 133.793V103.793H129.145C131.478 100.959 136.445 95.1927 137.645 94.7927C138.845 94.3927 142.812 92.1261 144.645 91.2927V83.7927L142.145 80.7927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('두류동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 10 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(10)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M255.645 68.7927L252.145 59.2927L333.645 31.2927L337.145 38.7927L331.145 72.2927L326.645 66.7927L313.145 72.2927L310.145 79.7927H305.145L303.645 76.2927L299.145 77.7927V84.2927L295.145 81.2927L279.645 86.7927V90.2927L264.645 93.7927L263.145 86.7927L250.645 79.7927L255.645 68.7927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('감삼동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 11 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(11)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M205.645 99.7927L215.145 103.793H242.145V93.2927L250.645 79.2927L255.645 68.2927L251.645 59.2927L248.645 52.2927L229.645 53.7927L231.645 71.7927L219.645 79.2927L207.145 79.7927L198.645 80.7927V91.7927L203.145 89.7927L205.645 99.7927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('죽전동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 12 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(12)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M209.145 52.7927L207.145 79.7927H219.645L231.645 72.2927L229.645 52.7927V47.2927L224.645 44.7927L207.145 42.7927L205.645 44.2927L207.145 51.7927L209.145 52.7927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('용산동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 13 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(13)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M159.145 27.2927L153.145 11.2927L161.645 3.29272L188.145 19.7927L184.145 27.7927L188.145 32.7927H208.145L205.645 43.7927L207.145 51.2927L209.145 52.2927L207.145 79.2927L198.645 80.7927L181.645 83.7927L171.145 77.2927H150.645V43.7927H148.145V36.2927L153.145 29.2927L159.145 27.2927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('이곡동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 14 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(14)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M104.145 27.2927L101.645 133.793H124.145V103.793H129.145C131.478 100.959 136.445 95.1927 137.645 94.7927C138.845 94.3927 142.812 92.6261 144.645 91.7927V83.7927L142.145 80.7927L150.645 77.2927V43.7927H148.145V36.2927L152.645 29.2927L158.645 27.2927L152.645 11.2927L132.145 3.29272L127.145 15.7927L104.145 27.2927Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg onClick = {() => setRegion('신당동')} className = 'dong' width="380" height="380" viewBox="0 0 380 380" fill= { hoverIndex === 15 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(15)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M60.145 137.293L52.645 148.293L41.145 153.793L22.645 147.293L2.64502 127.293L11.145 62.7927H15.645L18.645 38.7927L21.645 44.2927L45.145 8.29272H63.645L85.145 21.7927L104.145 25.2927V27.7927L101.645 134.293L60.145 137.293Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'outline' width="380" height="380" viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M323.145 197.293L349.645 226.293H359.645L365.645 244.293H375.645L372.645 253.043" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M227.145 312.793C231.812 316.793 243.345 326.993 244.145 327.793C244.945 328.593 249.145 343.459 251.145 350.793L262.645 352.793L264.645 362.793L268.645 377.293H281.145L289.145 372.793L301.145 375.293L312.645 355.793L321.645 352.793C318.145 332.293 310.845 291.093 309.645 290.293C308.445 289.493 315.145 284.959 318.645 282.793L347.145 287.293L355.645 279.293L371.645 273.293L369.645 262.293L372.645 253.543" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M228.645 314.293C224.812 317.126 216.945 322.793 216.145 322.793C215.345 322.793 198.478 319.793 190.145 318.293L184.145 299.793H171.645L163.145 286.793L142.645 249.293H124.145L125.645 241.293L142.645 232.793L122.145 219.293L119.645 212.293" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M324.145 198.293V188.293L316.145 175.793L314.145 181.293L298.645 178.293L289.145 154.293L274.645 137.793C276.182 135.114 280.598 129.831 282.645 126.293" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M333.645 70.7927C322.145 80.1261 298.345 100.593 297.145 101.793C296.229 102.709 288.257 116.317 281.645 127.746" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M119.645 211.793L68.645 193.293L60.645 200.793L52.145 203.293C49.645 206.793 44.645 213.393 44.645 211.793C44.645 210.193 53.645 184.459 58.145 171.793L50.645 149.793" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M251.645 61.2927L334.145 31.2927L337.145 38.7927L332.645 72.7927" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M229.645 54.2927L248.645 52.2927L253.645 60.2927" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M206.145 43.2927L225.645 45.2927L229.645 47.7927L231.645 55.7927" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M152.145 14.2927L161.645 3.29272L188.145 20.2927L184.145 28.2927L188.145 32.7927H207.645V44.2927" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M104.145 26.2927L127.645 15.7927L132.145 3.29272L153.145 11.7927" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M105.145 26.2927L85.145 22.2927L64.145 8.29272H45.645C37.9784 19.9594 22.445 43.6927 21.645 45.2927C20.845 46.8927 18.9784 39.6261 18.145 35.7927L16.145 62.7927H11.145L2.64502 128.293L23.645 147.793L41.645 153.793L53.145 149.793" stroke={outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    ) 
}

export default Dalseogu




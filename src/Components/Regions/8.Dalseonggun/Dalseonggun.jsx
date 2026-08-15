import { useState, useEffect } from "react";
import './Dalseonggun.css'

function Dalseonggun({ incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const fillOf = (i) => hoverIndex === i ? hovercolor : backcolor;

    return (
        <div className = 'Dalseonggun'>
            <p onMouseEnter={() => setHoverIndex(9)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 9 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>하빈면</p>
            <p onMouseEnter={() => setHoverIndex(8)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 8 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>다사읍</p>
            <p onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 6 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>화원읍</p>
            <p onMouseEnter={() => setHoverIndex(7)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 7 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>가창면</p>
            <p onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>논공읍</p>
            <p onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>옥포면</p>
            <p onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>현풍면</p>
            <p onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>유가면</p>
            <p onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>구지면</p>
            

            <div>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M112.113 366.075L101.113 311.575L93.1133 347.575L76.6133 342.075L65.6133 323.575L41.1133 318.075L31.1133 293.075L23.6133 286.075H6.11328L2.61328 296.575L8.61328 316.075L52.6133 362.575L50.1133 373.075L39.6133 393.075L23.6133 400.075L33.6133 406.575L70.6133 383.075L81.6133 389.075L97.1133 370.575L112.113 366.075Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M158.113 257.575L144.113 260.075L106.113 275.075L114.613 302.075L101.613 310.575L112.113 364.075L118.113 372.075L129.113 361.575L133.113 371.075L160.613 361.575L159.113 352.075L161.613 324.075L183.613 313.575L180.613 280.575L173.113 266.575L158.113 257.575Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M89.6133 271.075L106.113 275.575L114.613 302.575L101.613 311.075L93.6133 347.075L77.1133 341.575L66.1133 323.075L41.6133 317.575L31.6133 292.575H47.1133L58.6133 295.575L69.6133 300.075L89.6133 271.075Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 4 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M93.6133 206.575L63.6133 170.575L40.6133 214.075L44.1133 235.075L88.1133 269.575L106.113 275.075L144.113 260.075L133.113 245.075V231.575L126.613 229.575L110.113 210.575L93.6133 206.575Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 5 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(5)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M93.6133 206.075L63.6133 170.075L70.6133 155.075L98.1133 157.575L97.1133 163.075H121.113L124.113 157.575L133.113 186.575L152.113 199.575L158.113 206.075L175.613 214.075L188.113 227.575L192.613 248.075L173.113 266.075L158.113 257.075L144.113 259.575L133.113 244.575V231.075L126.613 229.075L110.113 210.075L93.6133 206.075Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 6 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(6)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M175.113 214.075L187.613 227.575L203.613 218.575V202.075L198.613 182.575L181.113 184.075L170.113 163.575L160.613 161.075L163.113 158.575L160.613 150.575L139.113 144.575C138.113 146.909 136.113 151.375 136.113 150.575C136.113 149.775 136.78 139.242 137.113 134.075L132.613 136.575L123.613 153.575L132.613 186.575L151.613 199.575L157.613 206.075L175.113 214.075Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 7 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(7)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M180.113 280.075L172.613 266.075L192.113 248.075L187.613 227.575L203.613 218.575V202.075H219.113L221.113 175.075L236.613 170.075L241.613 160.575L268.613 165.575L276.113 160.575L304.113 165.575L337.113 182.575L332.613 192.075L344.613 221.575L341.113 259.075L332.613 267.075H311.113L296.113 284.075H287.113L272.113 288.575L264.613 277.575L268.613 269.575L260.613 259.075L264.613 247.075L243.613 248.075L239.613 255.075L232.613 247.075L221.113 248.075L214.113 245.575L206.113 259.075L180.113 280.075Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 8 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(8)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M65.6133 90.5754V116.575C73.9466 117.242 91.8133 118.575 96.6133 118.575C101.413 118.575 110.947 126.575 115.113 130.575L119.113 103.075L130.613 94.0754L146.113 99.5754L164.613 95.5754L163.113 76.5754L170.113 68.5754L153.613 64.5754L147.613 72.5754L136.113 58.5754H119.113L107.113 56.5754L102.613 64.5754L99.1133 62.0754L90.6133 70.5754H86.1133L65.6133 90.5754Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="347" height="410" viewBox="0 0 347 410" fill= { hoverIndex === 9 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(9)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M65.6133 90.5754V116.575L40.1133 114.075L34.1133 105.575V95.5754L41.6133 90.5754V76.0754L64.6133 39.0754V29.5754L77.1133 17.5754H87.6133L89.6133 13.0754L98.1133 12.0754L101.113 3.57544L123.113 15.5754L113.613 44.0754V57.5754L107.113 56.5754L102.613 64.5754L99.1133 62.0754L90.6133 70.5754H86.1133L65.6133 90.5754Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'outline' width="347" height="410" viewBox="0 0 347 410" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M112.113 366.075L96.6133 370.575L81.6133 388.575L70.1133 382.075L33.1133 406.075L23.1133 400.075L40.1133 393.075L50.1133 373.075L52.6133 362.075C37.9466 347.242 8.51328 316.975 8.11328 314.575C7.71328 312.175 4.27995 301.242 2.61328 296.075L5.61328 285.575H23.1133L33.1133 293.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M180.113 277.575L183.613 313.575L161.113 323.575L159.113 351.075L161.113 361.075L133.113 372.075L129.113 361.075L118.113 372.075L111.613 365.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M32.1133 293.075H46.1133L60.1133 295.575C62.7799 297.409 68.6133 300.875 70.6133 300.075C72.6133 299.275 84.7799 281.242 90.6133 271.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M90.6133 271.075L43.6133 234.575L40.6133 213.575L64.1133 169.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M124.113 153.575L120.613 163.575L97.1133 162.575L98.6133 158.075L70.6133 155.575L63.6133 170.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M203.613 201.575C202.813 200.775 199.947 188.575 198.613 182.575L180.613 184.575L169.613 163.575L160.613 160.575L164.113 158.075L160.613 150.575L140.113 144.575L136.613 150.575V131.575L132.113 136.075L123.613 153.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M203.613 201.575C204.413 202.375 214.28 201.909 219.113 201.575C220.447 194.075 222.713 178.575 221.113 176.575C219.513 174.575 230.78 171.742 236.613 170.575L241.613 160.575L268.613 165.575L275.613 160.575L302.613 165.575L337.113 182.575L332.113 191.575L344.113 221.075L341.113 259.075L332.113 267.075H311.613L296.113 284.075H287.113L272.613 289.075L265.113 277.575L268.613 269.075L260.113 259.075L265.113 246.075L244.113 248.575L239.613 255.075L232.613 246.075L221.113 248.575L214.613 246.075L205.613 259.075L180.113 279.075" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M115.113 56.5754C116.713 58.1754 131.28 60.0754 136.613 58.5754L147.613 73.0754L153.613 64.0754L170.613 69.0754L162.613 76.0754L165.113 95.5754C158.947 97.2421 146.313 100.475 145.113 100.075C143.913 99.6754 134.28 95.9088 129.613 94.0754L118.613 103.075L115.113 131.575L96.1133 118.575L66.1133 116.575" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M115.113 56.5754C113.513 54.9754 114.28 48.7421 113.113 43.5754L123.113 15.0754L101.113 3.57544L98.1133 12.5754H89.6133L87.6133 17.5754H77.1133L64.6133 29.5754V38.5754L41.6133 76.0754V90.5754L33.6133 95.5754V105.575L40.1133 114.575L66.1133 116.575" stroke={outcolor} strokeWidth={outline}/>

                </svg>
            </div>
        </div>
    ) 
}

export default Dalseonggun






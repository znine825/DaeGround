import { useState, useEffect } from "react";
import './Junggu.css'

function Junggu({incolor, outcolor, backcolor, hovercolor, outline, inline}) {

    const [hoverIndex, setHoverIndex] = useState(null);

    return (
        <div className = 'Junggu'>
            <p onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>동인동</p>
            <p onMouseEnter={() => setHoverIndex(0)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 0 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>성내동</p>
            <p onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>삼덕동</p>
            <p onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>대봉동</p>
            <p onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>남산동</p>
            <p onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>대신동</p>
            <div>
                <svg className = 'dong1' width="391" height="301" viewBox="0 0 391 301" fill= { hoverIndex === 0 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(0)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M383.553 160.706L377.553 173.206L246.053 139.126L262.053 63.2059L302.553 73.7059L349.053 60.2059L365.553 71.2059L388.053 139.706L380.053 149.706L383.553 160.706Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong2' width="391" height="301" viewBox="0 0 391 301" fill={ hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M271.053 293.229C255.725 291.525 240.067 289.645 228.553 288.206L220.053 278.706L194.553 274.206L188.053 251.206L201.553 253.706L215.553 246.206L209.553 235.206H213.053L223.053 238.206L252.553 229.706L244.053 197.532L241.053 193.206L335.053 217.206L321.053 258.206C322.386 270.373 325.053 295.306 325.053 297.706C325.053 299.242 297.324 296.239 270.053 293.206" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong3' width="391" height="301" viewBox="0 0 391 301" fill={ hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M78.5527 177.706L5.05273 201.706L3.55273 171.206L51.0527 127.706L56.5527 114.706L47.5527 81.2059L58.0527 74.2059L77.2093 78.2059V110.706L78.5527 177.706Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong4' width="391" height="301" viewBox="0 0 391 301" fill={ hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M128.303 274.206L153.491 272.206L195.303 274.206L188.303 251.706L201.803 253.706L215.303 246.206L209.803 235.706H213.303L194.303 174.206L183.803 171.206L128.303 159.206L78.3027 178.206L4.80273 202.206L4.05273 234.706L81.5527 278.206L128.51 274.206" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong5' width="391" height="301" viewBox="0 0 391 301" fill={ hoverIndex === 4 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M346.553 204.206L335.053 217.206L240.053 192.88L221.053 174.706L223.053 161.206L213.553 157.706V154.706L202.053 152.206L204.053 139.206L240.053 146.206L242.553 139.206H246.553L377.053 173.706L356.053 202.09L346.553 204.206Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong6' width="391" height="301" viewBox="0 0 391 301" fill={ hoverIndex === 5 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(5)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M77.0527 78.7059L78.5527 177.706L128.896 159.206L182.053 170.706L194.553 174.706L213.553 235.206L223.053 238.206L252.553 229.706L244.053 196.706L221.053 174.706L223.053 161.206L213.553 157.706V154.706L202.053 152.206L204.053 139.206L240.053 146.206L242.553 139.206H246.053L262.053 63.2059L198.053 44.2059L134.553 27.2059L40.0527 3.20593V34.2059L50.5527 51.2059L42.5527 52.2059L29.0527 41.7059L15.0527 67.2059L17.0527 80.7059L27.5527 91.7059L49.0527 81.2059L57.5527 75.2059L77.5527 79.2059" stroke={incolor} strokeWidth={inline}/>    
                </svg>

                <svg className = 'outline' width="391" height="301" viewBox="0 0 391 301" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M270.553 293.229C255.225 291.525 239.567 289.645 228.053 288.206L219.553 278.706L193.053 273.706" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M335.053 216.706L320.553 258.206C321.886 270.373 324.553 295.306 324.553 297.706C324.553 299.242 296.824 296.239 269.553 293.206" stroke={outcolor} strokeWidth={outline}/>

                    <path d="M263.053 63.7059L197.553 44.2059" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M134.053 27.2059L199.053 44.7059" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M50.0527 82.2059L27.0527 91.7059L16.5527 80.7059L14.5527 67.2059L28.5527 41.7059L42.0527 52.2059L50.0527 51.2059L39.5527 34.2059V3.20593L137.053 27.7059" stroke={outcolor} strokeWidth={outline}/>

                    <path d="M48.0527 80.7059L56.0527 113.706L50.0527 128.206L2.55273 171.706L4.05273 203.206" stroke={outcolor} strokeWidth={outline}/>

                    <path d="M376.553 173.706L383.053 160.706L379.553 149.706L387.553 139.706L365.053 71.2059L348.553 60.2059L302.053 73.7059L260.553 62.7059" stroke={outcolor} strokeWidth={outline}/>

                    <path d="M127.803 274.206L152.991 272.206L194.803 274.206" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M81.0527 278.206L128.01 274.206" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M82.5527 278.706L3.55273 234.706L4.30273 202.206" stroke={outcolor} strokeWidth={outline}/>

                    <path d="M334.553 217.206L346.053 204.206L355.553 202.09L377.553 173.206" stroke={outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    )
}

export default Junggu
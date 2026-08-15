import { useState } from "react";
import './Donggu.css'

function Donggu({ incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const fillOf = (i) => hoverIndex === i ? hovercolor : backcolor;

    return (
        <div className="Donggu">
            <p onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>공산동</p>
            <p onMouseEnter={() => setHoverIndex(12)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 12 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>도평동</p>
            <p onMouseEnter={() => setHoverIndex(11)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 11 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>해안동</p>
            <p onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>혁신동</p>
            <p onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>안심동</p>
            <p onMouseEnter={() => setHoverIndex(9)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 9 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>방촌동</p>
            <p onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 6 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>동촌동</p>
            <p onMouseEnter={() => setHoverIndex(8)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 8 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>효목동</p>
            <p onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>신천동</p>
            <p onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>신암동</p>
            <p onMouseEnter={() => setHoverIndex(7)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 7 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>지저동</p>
            <p onMouseEnter={() => setHoverIndex(10)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 10 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>불로봉무동</p>

            <div className="mapWrap">
                <svg className="dong1" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(1)}
                     onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M248.278 267.643L262.278 253.143L263.278 244.143C264.944 243.31 268.278 241.243 268.278 239.643C268.278 238.043 269.444 231.976 269.778 229.643L291.278 241.143L299.778 259.643L294.278 265.143C296.778 274.976 301.778 295.771 301.778 300.284L248.278 302.643C238.944 300.429 211.278 293.643 209.778 293.143L217.778 278.143L223.278 276.143L233.778 273.143L248.278 267.643Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                
                <svg className="dong2" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(2)}
                     onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M154.778 165.143L127.278 173.643V176.643L119.278 184.143L115.778 199.143L90.7778 184.143L86.2778 188.143L79.2778 187.143L63.7778 197.143L53.2778 191.643L44.7778 194.643L38.2778 170.643L44.7778 141.643L29.7778 107.643L33.2778 103.643L32.7778 96.1431L22.7778 91.1431L19.2778 80.6431L3.27783 69.1431L13.7778 50.1431L23.7778 40.6431L27.2778 24.6431L33.7778 27.1431H53.7778L74.2778 17.1431L93.2778 22.1431L118.778 17.1431L143.778 8.64307H161.278L179.278 3.14307L183.278 15.1431L230.278 24.6431L241.778 45.1431L250.278 49.6431L255.278 57.1431L245.778 79.6431L255.278 84.6431L260.778 96.6431L274.778 103.643L267.778 134.143L260.278 146.643L267.778 169.143L259.278 190.643L244.778 183.643L226.778 182.643L206.278 176.643H184.278L174.278 169.143C170.611 169.976 162.978 171.543 161.778 171.143C160.578 170.743 156.611 166.976 154.778 165.143Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

               
                <svg className="dong3" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(3)}
                     onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M17.7778 333.143L57.7778 326.143L63.7778 337.643L48.2778 352.643L24.2778 345.643L22.7778 339.643L17.7778 333.143Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong4" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(4)}
                     onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M193.778 376.643L211.778 365.643L237.778 373.143L255.778 389.643L284.278 373.143L301.778 354.143L304.778 333.643L295.778 328.143L303.278 300.643L249.778 302.643C240.445 300.429 211.378 293.643 209.778 293.643L217.778 278.143L223.278 276.143L233.778 273.143L248.278 267.643L262.278 253.143L263.278 244.143C264.945 243.31 268.278 241.243 268.278 239.643C268.278 238.043 268.945 232.976 269.278 230.643L254.778 208.143L228.778 210.143L223.278 212.643L217.778 224.143L211.278 226.643L191.778 245.143L202.278 256.643L185.778 285.643L188.778 300.284L182.278 310.143L159.278 327.143L156.278 333.143L140.278 338.643L147.278 347.643L150.278 365.143L193.778 376.643Z" stroke={incolor} strokeWidth={inline}/>

                </svg>
                
                <svg className="dong5" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(5)}
                     onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M55.2778 296.143L61.7778 296.643L65.2778 297.143L74.7778 300.643L54.2778 311.143L66.2778 315.643L58.7778 326.643L17.2778 333.143L12.7778 328.143L27.7778 301.143L38.7778 293.643L49.7778 301.143L55.2778 296.143Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong6" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(6)}
                     onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M64.2778 339.502L57.7778 327.002L65.2778 316.002L53.2778 311.502L75.2778 300.143L112.278 305.072L134.278 318.002C135.878 323.202 137.278 333.835 137.778 338.502L122.778 339.502L110.278 329.002L103.778 332.002L89.7778 325.002L75.2778 337.502L64.2778 339.502Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong7" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(7)}
                     onMouseEnter={() => setHoverIndex(7)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M70.2778 278.143L64.2778 296.643L74.7778 300.284L76.7778 296.143L85.2778 281.643L97.7778 269.143L95.2778 258.643L79.7778 253.143L77.2778 254.643L70.2778 278.143Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong8" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(8)}
                     onMouseEnter={() => setHoverIndex(8)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M85.7778 281.643L98.2778 269.143L95.7778 258.643L117.278 254.143V275.143L120.778 285.643L112.278 305.214L75.2778 300.284L77.2778 296.143L85.7778 281.643Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong9" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(9)}
                     onMouseEnter={() => setHoverIndex(9)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M135.278 318.143L113.278 305.214L120.778 285.643L126.778 283.143L141.778 290.643L145.778 304.143L135.278 318.143Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong10" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(10)}
                     onMouseEnter={() => setHoverIndex(10)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M44.2778 195.143L53.2778 192.143L63.7778 197.643L79.2778 187.643L85.7778 188.643L90.7778 184.143L110.278 196.233V208.643L102.778 213.143V225.643C102.778 226.443 101.444 231.31 100.778 233.643H95.7778L90.7778 243.643L77.2778 254.143L70.7778 278.143L64.2778 296.643L60.7778 296.143L56.2778 294.643L48.7778 267.643L56.2778 249.143L44.2778 195.143Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong11" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(11)}
                     onMouseEnter={() => setHoverIndex(11)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M138.278 338.531C137.778 333.864 136.378 323.231 134.778 318.031L145.278 304.031L141.278 290.531L126.278 283.031L126.778 275.031L130.278 252.031L133.278 247.031L142.278 245.031L148.278 236.031L159.278 229.143L165.778 233.531L181.278 232.031L191.778 245.031L202.278 256.531L185.778 285.531L188.778 300.172L182.278 310.031L159.278 327.031L156.278 333.031L138.278 338.531Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className="dong12" width="308" height="393" viewBox="0 0 308 393" fill={fillOf(12)}
                     onMouseEnter={() => setHoverIndex(12)} onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M206.778 176.643H184.778L174.278 169.143L161.778 171.143L154.778 165.143L127.278 173.643V176.643L119.278 184.643L115.778 199.143L110.778 196.233V208.643L102.778 213.143V226.143C102.778 226.943 101.444 231.31 100.778 233.643H95.7778L90.7778 243.643L79.2778 253.143L96.2778 258.643L117.278 254.143V275.143L120.278 285.643L126.278 283.143L126.778 275.143L130.278 252.143L133.278 247.143L142.278 245.143L148.278 236.143L159.278 229.256L165.778 233.643L181.278 232.143L191.778 245.143L211.278 226.643L217.778 224.143L223.278 212.643L228.778 210.143L253.778 208.143L260.278 191.143L244.778 183.643L227.278 182.643L206.778 176.643Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'outline' width="308" height="393" viewBox="0 0 308 393" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M44.7778 195.643L38.2778 170.643L44.7778 141.643L29.2778 108.643L33.2778 104.143V96.6431L23.2778 92.6431L19.2778 81.1431L3.27783 69.6431L14.2778 50.1431L24.7778 40.1431L27.2778 25.1431L33.2778 27.6431H53.7778L73.7778 17.6431L92.7778 22.6431L119.778 17.6431L143.278 9.14307H160.278L178.778 3.14307C179.944 6.64307 182.278 13.9431 182.278 15.1431C182.278 16.6431 226.278 23.1431 229.778 25.1431C232.578 26.7431 238.278 39.1431 240.778 45.1431L250.278 50.1431L254.278 58.1431L246.278 79.6431L254.278 85.6431C256.444 88.8097 260.678 95.4431 260.278 96.6431C259.878 97.8431 269.778 102.143 274.778 104.143L267.778 135.143L260.278 147.643L267.778 170.643L260.278 191.643" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M303.278 303.143L294.278 265.143L300.278 258.643L290.778 240.643L268.278 229.143" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M15.7778 332.143L22.2778 338.643L24.2778 346.143L48.2778 352.643L63.7778 337.143" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M55.7778 294.143L49.2778 300.643L39.2778 293.143L28.2778 300.643L12.2778 328.643L18.2778 334.643" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M61.2778 339.502C64.7778 339.502 72.2778 338.502 73.7778 338.002C74.9778 337.602 84.9445 329.502 89.7778 325.502L104.278 331.502L109.778 329.002L122.778 339.502L137.778 338.002" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M44.2778 194.143L56.7778 248.643L48.2778 267.143L56.7778 296.643" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M254.278 208.643L260.278 191.643" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M303.278 300.643L295.778 328.143L304.778 333.643L301.778 353.643L283.778 373.643L255.778 389.643L238.278 373.143L211.778 365.643L193.778 376.643L150.278 365.143L147.278 347.643L140.278 338.143M269.778 231.643L254.778 208.143" stroke={outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    )
}

export default Donggu

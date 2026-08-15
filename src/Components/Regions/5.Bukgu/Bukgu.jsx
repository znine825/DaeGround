import { useState, useEffect } from "react";
import './Bukgu.css'

function Bukgu({ incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const fillOf = (i) => hoverIndex === i ? hovercolor : backcolor;

    return (
        <div className = 'Bukgu'>
            <p onMouseEnter={() => setHoverIndex(13)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 13 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>읍내동</p>
            <p onMouseEnter={() => setHoverIndex(14)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 14 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>관음동</p>
            <p onMouseEnter={() => setHoverIndex(12)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 12 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>동천동</p>
            <p onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>고성동</p>
            <p onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>칠성동</p>
            <p onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>대현동</p>
            <p onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>복현동</p>
            <p onMouseEnter={() => setHoverIndex(10)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 10 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>국우동</p>
            <p onMouseEnter={() => setHoverIndex(11)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 11 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>구암동</p>
            <p onMouseEnter={() => setHoverIndex(9)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 9 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>무태조야동</p>
            <p onMouseEnter={() => setHoverIndex(15)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 15 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>태전동</p>
            <p onMouseEnter={() => setHoverIndex(8)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 8 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>검단동</p>
            <p onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 6 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>침산동</p>
            <p onMouseEnter={() => setHoverIndex(16)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 16 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>관문동</p>
            <p onMouseEnter={() => setHoverIndex(7)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 7 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>산격동</p>
            <p onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>노원동</p>
            

            <div>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M284.658 351.355L322.307 349.829L323.307 352.329L296.307 389.829L284.658 381.752L280.5 365.721L284.658 351.355Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M342.441 282.829L329.343 286.16L324.769 297.403L318.324 318.431L312.5 333.629L322.5 350.633H326.193L335.693 336.829L356.193 344.829L367.193 334.829L353.193 298.829L354.5 286.16L348.055 288.867L342.441 282.829Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M284.516 381.69L280.5 366.329L268.5 375.829L250.5 361.829L235.5 360.329L231.5 368.365L246.261 371.072L243.5 389.329C260.119 393.127 293.4 401.929 295 402.329C296.6 402.729 302.333 398.829 305 396.829L298.03 391.267L284.516 381.69Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 4 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M246.002 371.444L231.405 368.639L223.548 364.006L206.5 355.829L218.905 369.139L213.905 383.139L242.884 390.806L246.002 371.444Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 5 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(5)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M178.705 309.614L198.664 299.829H211.138L212.802 320.857V339.387L226.523 345.008L223.821 363.804L206.772 355.626L205.178 356.936L147.178 343.436L136.5 332.933L149.806 324.605L162.072 323.147L178.705 309.614Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 6 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(6)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M220.024 291.829L211.5 300.365L213.163 321.393V339.923L226.885 345.544L224.182 364.34L231.875 368.03L235.617 360.534L250.794 362.2L268.674 376.358L280.733 366.364L272.832 349.084L252.665 335.759L257.655 307.027L255.784 291.829H220.024Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 7 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(7)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M292.418 253.829L282.231 260.908V277.564L255.619 291.513L257.49 306.711L252.5 335.443L272.667 348.768L280.567 366.048L284.725 351.682L322.374 350.156L312.374 333.153L318.198 317.954L324.643 296.926L329.217 285.683L318.198 266.529L305.516 264.447L293.042 253.829" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 8 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(8)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M292.5 253.797L324.725 221.734L354.456 203.829L361.956 206.624L365.956 216.124L367.956 274.624L358.456 284.124L354.456 285.651L348.011 288.358L342.398 282.32L329.299 285.651L318.28 266.497L305.598 264.415L293.124 253.797" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 9 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(9)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M219.755 204.034V195.498L215.493 189.356L226.2 178.842L237.843 175.719L246.159 169.889H249.07L268.197 147.612H276.929L292.938 129.915L292.314 120.546L272.771 105.348V95.5625L279.424 84.528L282.127 46.4277L275.058 38.5161L279.424 5.82898L294.271 2.82898C304.604 16.6623 325.471 44.529 326.271 45.329C327.071 46.129 323.271 53.9956 321.271 57.829L337.271 76.329L336.771 89.829L349.771 104.329L337.771 126.329V144.829L349.271 149.829V164.829L342.271 179.329L351.771 195.498L354.27 204.034L324.54 221.939L292.314 254.002L282.127 261.08V277.736L255.515 291.686H219.755L211.231 300.222H198.756V293.767L184.411 291.686V248.38L181.5 234.847L191.687 221.939L207.488 204.034H219.755Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 10 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(10)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M146.895 132.414L136.5 95.5625L145.178 76.329C145.844 68.9956 147.278 54.329 147.678 54.329H170.178L174.178 44.329L191.678 35.329L221.678 38.829L231.178 32.829H239.678L249.678 25.329V15.829L279.332 5.82898L274.966 38.5161L282.034 46.4277L279.332 84.528L272.679 95.5625V105.348L292.222 120.546L292.846 129.915L276.837 147.612H268.105L248.977 169.889H246.067L237.75 175.719L226.108 178.842L215.4 189.356L211.138 183.214V147.612L193.051 158.022L165.444 154.379L167.478 147.612H138.647L146.895 132.414Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 11 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(11)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M142.43 226.944L153.449 245.474L175.487 226.944L181.5 214.829L192 221.329L207.504 204.251H219.771V195.715L215.509 189.573L211.247 183.431V147.829L193.159 158.239L165.552 154.595L163.517 161.362L162.181 199.254H142.43L128.5 220.282L142.43 226.944Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 12 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(12)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M136.5 151.785L138.647 147.829H167.478L165.444 154.595L163.409 161.362L162.072 199.254H142.321L145.113 163.86L136.5 151.785Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 13 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(13)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M123.053 196.01L123.5 196.829L142.5 198.829L145.18 164.155L136.566 152.08L138.713 148.124L146.962 132.925L136.566 96.0743L123.244 91.8408V86.3408L114.744 81.3408V67.3408L106.744 57.8408V50.3408L91.2441 41.8408L85.2441 32.8408H78.7441L68.2441 28.8408L63.2441 32.8408L67.7441 39.3408L61.7441 45.8408L70.2441 93.3408L78.7441 99.8408L84.5898 105.86L103.094 110.232L112.449 128.553V144.376L119.102 152.08V164.155L128.458 170.401L123.053 196.01Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 14 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(14)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M87.5 192.329L123 195.829L128.381 170.371L119.025 164.125V152.049L112.372 144.346V128.523L103.016 110.201L84.5128 105.829L78.667 138.31L82.6416 187.235L87.5 192.329Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 15 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(15)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M84.7996 226.329L79 222.829L71 229.829L68.9541 228.404L82.9285 186.829L87.9182 192.45L123.262 195.573L123.158 197.031L142.598 199.113L128.668 220.141L142.598 226.803L153.617 245.333L151.953 250.538L136.776 274.064L133.658 285.931L108.917 272.607V264.695L106.422 254.077H95.8187L84.7996 238.254V226.329Z" stroke={incolor} strokeWidth={inline}/>
                </svg>
                <svg className = 'dong' width="371" height="405" viewBox="0 0 371 405" fill= { hoverIndex === 16 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(16)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M79.0242 222.949L70.5 230.444H67.5L30.5 274.829L25 272.829L14 280.829L3 302.329V342.829L9.5 336.329L33.5 339.829L79 362.829L94 358.829L98.5 343.829L131 327.829L136.822 332.878L150.128 324.55L162.395 323.092L179.027 309.559L198.986 299.774V293.32L184.641 291.238V247.933L181.73 234.4L191.917 221.491L181.73 214.829L175.701 226.28L153.663 244.81L151.999 250.015L136.822 273.541L133.704 285.408L108.963 272.084V264.172L106.468 253.554H95.8646L84.8455 237.731V226.28L79.0242 222.949Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                

                <svg className = 'outline' width="371" height="405" viewBox="0 0 371 405" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M295.5 390.829L325 350.329" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M355.5 286.329L352.686 299.331L367.5 335.302L355.567 344.551L335.815 337.152L324.5 351.133" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M296.593 389.112L305.44 396.923L294.741 402.267L242.5 389.329" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M206.905 357.639L219.383 369.34L213.622 383.317L242.905 389.484" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M207.178 357.436L146.82 343.855L136.678 333.436" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M355.522 286.624L367.456 275.594L365.604 216.19L361.695 207.146L352.642 204.124" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M279.21 6.52888L294.23 2.82898C304.311 16.6693 324.763 44.4734 325.915 44.9667C327.067 45.46 322.966 53.6683 320.771 57.7108L337.437 77.0325C336.546 81.8286 335.297 91.421 337.437 91.421C339.577 91.421 346.422 100.054 349.576 104.371L337.437 126.776V144.864L349.576 150.003V165.008L341.964 179.396L352.457 197.485V204.329" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M279.116 6.52893L249.488 15.7787V25.6451L239.818 32.4282H231.382L221.712 39.0058L191.467 35.1004L173.773 44.3501L169.863 54.6276H147.848L144.762 77.0325L135.5 96.829" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M137.01 96.2493L123.225 91.9328V86.3829L114.789 81.6553V67.6779L106.559 58.2226V50.6173L90.9222 41.7786L85.367 32.94H78.5772L68.2897 28.829L63.146 32.94L68.2897 39.5176L61.5 45.4785L70.3472 94.1938L78.5772 99.7437L86 107.829" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M85.1669 106.31L78.5 137.945L82.6669 187.81" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M82.9543 187.404L68.5 230.859" stroke={outcolor} strokeWidth={outline}/>
                    <path d="M69.5 228.881L30.6877 275.351L24.9267 272.885L14.6392 280.079L2.5 301.662V343.8L9.28974 336.4L33.1567 339.689L61.7559 355.105L78.8331 362.916L93.8529 358.188L98.5851 343.8L130.682 327.561L137 333.381" stroke={outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    )
}

export default Bukgu








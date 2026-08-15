import { useState, useEffect } from "react";
import './Seogu.css'

function Seogu({ incolor = '#000', outcolor = '#000', backcolor = '#fff', hovercolor = '#34C759', outline = 5, inline = 2 }) {
    const [hoverIndex, setHoverIndex] = useState(null);

    const fillOf = (i) => hoverIndex === i ? hovercolor : backcolor;

    return (
        <div className = 'Seogu'>
            <p onMouseEnter={() => setHoverIndex(2)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 2 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>비산동</p>
            <p onMouseEnter={() => setHoverIndex(5)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 5 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>원대동</p>
            <p onMouseEnter={() => setHoverIndex(1)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 1 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>평리동</p>
            <p onMouseEnter={() => setHoverIndex(4)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 4 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>내당동</p>
            <p onMouseEnter={() => setHoverIndex(3)} onMouseLeave={() => setHoverIndex(null)}
                style={{ color: hoverIndex === 3 ? 'var(--LM-main-color)' : 'var(--LM-mainouttext-color)' }}>상중이동</p>
            <div>
                <svg className = 'dong' width="382" height="305" viewBox="0 0 382 305" fill= { hoverIndex === 5 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(5)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M358.607 122.796L338.607 112.296L328.107 98.7958L332.607 83.7958L306.107 57.2958L345.607 65.7958L378.607 85.2958L371.107 118.296L373.607 128.296L358.607 122.796Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong' width="382" height="305" viewBox="0 0 382 305" fill= { hoverIndex === 4 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(4)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M366.107 186.296L361.607 185.296L351.607 198.296H345.107L333.107 205.296L308.107 213.796H300.607L286.107 218.296L260.107 228.796L215.607 239.296L192.107 243.796L160.107 261.796L163.607 264.296L167.607 287.796L180.607 285.296L180.607 285.296C181.774 289.296 184.107 297.296 184.607 299.796C185.078 302.149 236.441 278.629 262.607 266.296L335.607 242.296L338.607 229.796L366.107 186.296Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong' width="382" height="305" viewBox="0 0 382 305" fill= { hoverIndex === 3 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(3)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M102.607 89.7958L105.607 74.7958L58.6074 64.2958L54.6074 75.7958L12.1074 89.7958L3.10742 99.7958L16.6074 121.296L27.6074 147.796V163.796L30.1074 173.296L18.6074 192.296L39.1074 208.296H52.1074L66.1074 224.796L55.6074 238.796L66.1074 246.796H101.107V268.296H138.107L140.107 286.796L160.107 289.796L167.607 287.296L163.607 263.796L160.107 261.296L192.107 243.296L215.607 238.796L210.107 190.296L177.107 197.796L180.107 130.796L171.607 126.796V115.296H169.107V112.296L154.607 110.296V97.2958L120.607 94.2958L108.607 87.7958L102.607 89.7958Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong' width="382" height="305" viewBox="0 0 382 305" fill= { hoverIndex === 2 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(2)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M359.107 122.796L339.107 112.296L328.607 98.7958L333.107 83.7958L306.607 57.2958L225.607 41.7958L199.107 3.29578L180.107 13.2958L141.107 25.7958L121.607 71.2958L110.107 75.7958L105.607 74.7958L102.607 89.7958L108.607 87.7958L120.607 94.2958L228.607 103.796L226.107 112.296L244.107 110.296L256.607 116.796L272.107 115.296L302.607 116.796L300.607 123.796L302.607 136.296L298.107 139.796V147.296L295.607 148.796V172.296L298.107 175.296L302.607 187.296L304.107 204.796L300.607 213.296H308.107L333.107 204.796L345.107 197.796H351.607L361.607 184.796L366.107 185.796L365.107 170.296L350.607 173.296L343.607 167.796L350.607 145.796L366.107 153.796L359.107 122.796Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'dong' width="382" height="305" viewBox="0 0 382 305" fill= { hoverIndex === 1 ? hovercolor : backcolor } xmlns="http://www.w3.org/2000/svg"
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}>
                    <path d="M154.607 110.296V97.7958L228.607 103.796L225.607 112.796L244.107 110.296L257.107 117.296L271.607 114.796L302.607 117.296L300.607 124.296L302.607 136.796L298.107 140.296V146.796L295.607 149.296V172.296L298.107 175.796L302.607 187.296L304.607 204.796L300.607 213.296L260.107 229.296L215.607 239.296L210.607 190.796L177.107 198.296L180.107 131.296L171.607 126.796V115.796H169.107V112.796L154.607 110.296Z" stroke={incolor} strokeWidth={inline}/>
                </svg>

                <svg className = 'outline' width="382" height="305" viewBox="0 0 382 305" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M357.607 122.796L373.607 128.296L371.107 118.296L379.107 85.2958L345.607 65.7958L310.107 58.7252" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M167.607 288.296L180.607 285.296L184.107 300.796L262.607 266.296L306.607 252.296L335.107 242.796L338.107 230.296L367.607 183.296" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M167.607 287.796L158.607 289.796L140.107 286.796L138.107 267.796H101.107V246.796H66.1074L55.1074 238.296L66.1074 224.796L51.6074 208.296H39.1074L18.1074 192.296L30.6074 173.296L27.6074 163.296V147.796L16.6074 121.796L3.10742 99.7958L12.1074 89.7958L55.1074 75.7958L58.6074 64.2958L105.107 74.6793" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M358.107 122.296L366.107 153.796L350.607 145.796L343.607 167.796L350.607 173.296L365.107 169.796L367.107 184.796" stroke = {outcolor} strokeWidth={outline}/>
                    <path d="M310.607 58.7252L225.607 41.7958L198.607 3.29578L180.107 13.7958L141.107 26.2958L135.107 36.7958L121.607 71.2958L110.107 75.7958L105.107 74.6793" stroke = {outcolor} strokeWidth={outline}/>
                </svg>
            </div>
        </div>
    )
}

export default Seogu


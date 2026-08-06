import { useState, useEffect } from "react";
import { iconMap } from './../Icons/Icons.jsx'
import './Common.css'


export function Title({icon, text, title, subtitle, locate}) {
    const IconComponent = iconMap[icon];
    return (
        <div className = {`title ${locate}`}>
            <div>
                <IconComponent color = '#34C759' />
                <p>{text}</p>
            </div>
            <p>{title}</p>
            <p>{subtitle}</p>
        </div>
    )
}

export function Input({value, setValue, title, warning, condition, errch, showPassword}) {

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    return (
        <div className = 'inputArea'>
            <p>{title}</p>
            <input className = {errch ? 'inputT' : 'inputF'}
                type = {showPassword ? 'text' : 'password'}
                placeholder = {warning}
                value = {value}
                onChange = {handleChange}
            />
            <p>{condition}</p>
        </div>
    );
}


export function Button({ width, height, text, fsize, fweight }) {
    return (
        <div className = 'ButtonComponent'
             style = {{ width: `${width}px`, 
                        height: `${height}px`,
                        fontSize: `${fsize}px`,
                        fontWeight: fweight}}>
            <p>{ text }</p>
        </div>
    )
}
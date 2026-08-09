import { useState, useEffect } from "react";
import { Icon } from './../Icons/Icons.jsx'
import './Common.css'


export function Title({icon, text, title, subtitle, locate}) {
    return (
        <div className = {`title ${locate}`}>
            <div>
                <Icon name = {icon} color = '#34C759' />
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

export function LoadMap({contents}) {    
    return (
        <div className = "loadMap">
            {contents.map((item, index) => {
                return (
                    <div key = {index}>
                        <div>
                            <div>
                                <div><p>0{index + 1}</p></div>
                                <Icon name = {item.icon} color = 'var(--LM-main-color)' />
                            </div>
                            <p>{item['title']}</p>
                            <p>{item['subtitle']}</p>
                            
                        </div>
                        {item.line && <p>----------------</p>}
                    </div>
                )
            })}
        </div>
    )
}

export function Info({ title, subtitle, icon }) {
    return (
        <div className = 'infoComponent'>
             <div>
                <div></div>
                <Icon name = {icon} color = 'var(--LM-main-color)'/>
             </div>
             <div>
                <p>{title}</p>
                <p>{subtitle}</p>
             </div>
        </div>
    )
}

export function InfoHeader({contents}) {
    return (
        <div className = 'infoHeader'>
            <div>
                <div>
                    <div></div>
                    <Icon name = {contents.icon} color = 'color-mix(in srgb, var(--LM-background-color) 80%, #FFFFFF00 20%)' width = '90' height = '90' strc = '1.3'/>
                </div>
                <div>
                    <p>{contents.name}</p>
                    <p>가입일 {contents.date.toDate().toLocaleDateString()}</p>
                </div>
            </div>
            <div>
                <div>
                    <div>
                        <Icon name = 'file' color = 'var(--LM-background-color)'/>
                    </div>
                    <p>{contents.postCount}</p>
                    <p>게시글</p>
                </div>
                <div>
                    <div>
                        <Icon name = 'file' color = 'var(--LM-background-color)'/>
                    </div>
                    <p>{contents.commentCount}</p>
                    <p>댓글</p>
                </div>
                <div>
                    <div>
                        <Icon name = 'file' color = 'var(--LM-background-color)'/>
                    </div>
                    <p>1234kg</p>
                    <p>절감 CO2</p>
                </div>
            </div>
            <Icon name = 'profile' color = 'color-mix(in srgb, var(--LM-background-color) 30%, #FFFFFF00 70%)' width = '250' height = '250' strc = '1'/>
        </div>
    )
}
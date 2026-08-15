import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import Donggu from './../../Components/Regions/1.Donggu/Donggu.jsx';
import Junggu from './../../Components/Regions/2.Junggu/Junggu.jsx';
import Seogu from './../../Components/Regions/3.Seogu/Seogu.jsx';
import Namgu from './../../Components/Regions/4.Namgu/Namgu.jsx';
import Bukgu from './../../Components/Regions/5.Bukgu/Bukgu.jsx';
import Suseonggu from './../../Components/Regions/6.Suseonggu/Suseonggu.jsx';
import Dalseogu from './../../Components/Regions/7.Dalseogu/Dalseogu.jsx';
import Dalseonggun from './../../Components/Regions/8.Dalseonggun/Dalseonggun.jsx';
import './MP2.css'

function MP2() {
    return (
        <div className = 'MP2'>
            <Title 
                icon = 'calendarCheck'
                text = '2단계' 
                title = '대구 어디로 떠나요?'
                subtitle = '정하신 장소 또는 가고 싶은 장소를 골라주세요'
                locate = 'left'/>

            <div>
                <Dalseonggun
                    outline = '2'
                    inline = '2'
                    hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                    backcolor = '#FFFFFF00'
                    incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                    outcolor = '#000000'/>
            </div>
        </div>
    ) 
}

export default MP2
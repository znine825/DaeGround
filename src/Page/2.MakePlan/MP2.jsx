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
import './MakePlan.css'
import './../Page.css'

function MP2({info, setInfo, page, pageSet}) {

    const [regions , setRegions] = useState(1);
    const [day, setDay] = useState(0);

    const changeDay = (e) => {
        setDay(e);
    }

    const changeRegionMap = (e) => {
        setRegions(e);
    }

    const moveLeftPage = () => {
        pageSet((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {
        
        if (info['selectRegions'].includes('미등록')) {
            alert('여행 장소를 선택해주세요');
            return false;
        }

        pageSet((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    }; 

    const clearRigon = (e) => {
        const temp = {...info};
        temp['selectRegions'][e] = '미등록';
        setInfo(temp);
    }

    return (
        <div className = 'MP2'>
            <Title 
                icon = 'calendarCheck'
                text = '2단계' 
                title = '대구 어디로 떠나요?'
                subtitle = '정하신 장소 또는 가고 싶은 장소를 골라주세요'
                locate = 'left'/>

            <div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)' />
                        <p>대구광역시</p>
                    </div>
                    <div>
                        <div className = {regions == 1 ? 'select' : ''} onClick = {() => changeRegionMap(1)}><p>동구</p></div>
                        <div className = {regions == 2 ? 'select' : ''} onClick = {() => changeRegionMap(2)}><p>중구</p></div>
                        <div className = {regions == 3 ? 'select' : ''} onClick = {() => changeRegionMap(3)}><p>서구</p></div>
                        <div className = {regions == 4 ? 'select' : ''} onClick = {() => changeRegionMap(4)}><p>남구</p></div>
                        <div className = {regions == 5 ? 'select' : ''} onClick = {() => changeRegionMap(5)}><p>북구</p></div>
                        <div className = {regions == 6 ? 'select' : ''} onClick = {() => changeRegionMap(6)}><p>수성구</p></div>
                        <div className = {regions == 7 ? 'select' : ''} onClick = {() => changeRegionMap(7)}><p>달서구</p></div>
                        <div className = {regions == 8 ? 'select' : ''} onClick = {() => changeRegionMap(8)}><p>달성군</p></div>
                    </div>
                    {regions === 1 && 
                    <Donggu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 2 && 
                    <Junggu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 3 && 
                    <Seogu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 4 && 
                    <Namgu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 5 && 
                    <Bukgu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 6 && 
                    <Suseonggu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 7 && 
                    <Dalseogu info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    {regions === 8 && 
                    <Dalseonggun info = {info} setInfo = {setInfo} day = {day}
                        outline = '2'
                        inline = '2'
                        hovercolor = 'color-mix(in srgb, var(--LM-main-color) 15%, transparent)' 
                        backcolor = '#FFFFFF00'
                        incolor = 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'
                        outcolor = '#000000'/>}
                    
                </div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)' />
                        <p>선택한 장소</p>
                    </div>
                    <div>
                        {Array.from({ length: info['allDay'] }, (_, i) => (
                            <div style = {{border: `1px solid ${info['selectRegions'][i] == '미등록' ? 'color-mix(in srgb, var(--LM-line-color) 70%, transparent' : 'var(--LM-main-color)'}`}} onClick = {() => changeDay(i)} key={i + 1} className = {day == i ? 'selectDay select' : 'selectDay'}>
                                {info['selectRegions'][i] == '미등록' && 
                                <div>
                                    <p>{i + 1}</p>
                                </div>}
                                {info['selectRegions'][i] != '미등록' && 
                                <div style = {{backgroundColor: 'var(--LM-main-color)'}}>
                                    <Icon name = 'check' color = 'var(--LM-mainintext-color)'
                                            style = {{position: 'relative', top: '5px', left: '5px'}}/>
                                </div>}
                                <div>
                                    <p>{i + 1}일차</p>
                                    <p>{info['selectRegions'][i]}</p>
                                </div>
                                <div onClick = {() => clearRigon(i)}>
                                    <Icon name = 'undo' color = 'color-mix(in srgb, var(--LM-line-color) 70%, transparent)'/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className = 'pageButton'>
                {page != 1 && <div onClick = {() => moveLeftPage()}>
                    <Button width = '150' height = '50' text = '이전단계' fsize = '16' fweight = '500' />
                </div>}
                <div></div>
                {page != 5 &&<div onClick = {() => moveRightPage()}>
                    <Button width = '150' height = '50' text = '다음단계' fsize = '16' fweight = '500' />
                </div>}
            </div>
        </div>
    ) 
}

export default MP2
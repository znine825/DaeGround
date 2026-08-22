import { useState, useEffect, useRef } from "react";
import { KakaoMap } from "../../Components/KakaoMap/KakaoMap.jsx"
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { generateTripSpots } from '../../Javascript/TourAPI/Functions.js'
import { LocalBasedLoojup, getTransitRoute } from '../../Javascript/TourAPI/httpsCall.js'


import './MP4.css'
import './MakePlan.css'

function MP4({info, setInfo, page, pageSet}) {

    const [routeData, setRouteData] = useState([]);

    useEffect(() => {
        async function loadRouteData() {
            const result = [];
            const spots = await generateTripSpots(
                info.theme,
                230,
                LocalBasedLoojup
            );
            for (let i = 0; i < 3; i++) {
                result.push([spots[i], spots[i + 1]]);
            }
            setRouteData(result);
        }
        loadRouteData();
    }, [info.allDay, info.theme]);

    console.log("routeData:", routeData);

    const moveLeftPage = () => {
        pageSet((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {
        pageSet((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    }; 

    return (
        <div>
            <KakaoMap Spots = {routeData} info = {info}/>
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

export default MP4


import { useState, useEffect, useRef } from "react";
import { makeDaySet } from "../../Components/KakaoMap/KakaoMap.jsx"
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { generateTripSpots } from '../../Javascript/TourAPI/Functions.js'
import { LocalBasedLoojup } from '../../Javascript/TourAPI/httpsCall.js'

import './MP4.css'
import './MakePlan.css'

function drawPath(map, points, color, weight) {

    const path = points.map(([x, y]) => {
        return new window.kakao.maps.LatLng(y, x);
    });


    new window.kakao.maps.Polyline({
        map: map,
        path: path,
        strokeWeight: weight,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeStyle: "solid"
    });
}

async function loadRouteData(theme, region = 230) {
    const result = [];
    const spots = await generateTripSpots(
        theme,
        region,
        LocalBasedLoojup
    );
    for (let i = 0; i < 3; i++) {
        result.push([spots[i], spots[i + 1]]);
    }
    return result
}

function MP4({info, setInfo, page, pageSet}) {

    useEffect(() => {
        async function makeAllPath() {
            const allPathSet = [];
            const allPathName = [];
 
            for (let i = 0; i < info.allDay; i++) {
                const spotsResult = await loadRouteData(info.theme);
                const pathArray = await makeDaySet(spotsResult);
                allPathSet.push(pathArray[0]);
                allPathName.push(pathArray[1]);
            }

            setInfo(prev => ({
                ...prev,
                pathset: allPathSet
            }));
            setInfo(prev => ({
                ...prev,
                pathNameset: allPathName
            }));
        }

        if (info.allDay > 0 && info.theme.length > 0) {
            makeAllPath();
        }
    }, [info.allDay]);

    useEffect(() => {
        console.log(info.pathset);
        console.log(info.pathNameset);
    },[info.pathset]);


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
            {/* <KakaoMap Spots = {routeData} info = {info}/> */}
            <div>
                {Array.from({ length: info.allDay }, (_, i) => (
                    <div className = 'selectedPath' key = {i + 1}>{i + 1}일차</div>
                ))}
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

export default MP4


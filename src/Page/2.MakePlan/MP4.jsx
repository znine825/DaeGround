import { useState, useEffect, useRef } from "react";
import { makeDaySet, makeMockDaySet } from "../../Components/KakaoMap/KakaoMap.jsx"
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import { generateTripSpots } from '../../Javascript/TourAPI/Functions.js'
import { LocalBasedLoojup } from '../../Javascript/TourAPI/httpsCall.js'

import './MP4.css'
import './MP2.css'
import './MakePlan.css'

function drawPath(map, points, color, weight, opacity) {
    const path = points.map(([x, y]) => {
        return new window.kakao.maps.LatLng(y, x);
    });

    const polyline = new window.kakao.maps.Polyline({
        map: map,
        path: path,
        strokeWeight: weight,
        strokeColor: color,
        strokeOpacity: opacity,
        strokeStyle: "solid"
    });

    return polyline;
}
function drawMarker(map, point) {
    const position = new window.kakao.maps.LatLng(point[1], point[0]);

    return new window.kakao.maps.Marker({
        map: map,
        position: position
    });
}

async function loadRouteData(theme, region) {
    const result = [];
    const spots = await generateTripSpots(
        theme,
        region,
        LocalBasedLoojup
    );
    console.log(spots);
    for (let i = 0; i < 3; i++) {
        result.push([spots[i], spots[i + 1]]);
    }
    return result
}

function MP4({info, setInfo, page, pageSet}) {
    const [day, setDay] = useState(0);
    const [onloading, setOnloading] = useState(false);

    const changeDay = (e) => {
        setDay(e);
    }

    useEffect(() => {
        async function loadMock() {
            const mock = await makeMockDaySet();

            setInfo(prev => ({
                ...prev,
                pathset: [mock.pathset],
                pathNameset: [mock.pathNameset],
                spotName: [mock.spotName],
                walkPath: [mock.walkPath]
            }));

            setOnloading(true);
        }

        loadMock();
    }, []);

    // useEffect(() => {
    //     async function makeAllPath() {
    //         const allPathSet = [];
    //         const allPathName = [];
    //         const walkPath = [];
    //         const spotName = [];
 
    //         for (let i = 0; i < info.allDay; i++) {
    //             const spotsResult = await loadRouteData(info.theme, info.selectRegions[i].split(" ")[0]);

    //             const tempArray = [];
    //             console.log('spot')
    //             console.log(spotsResult)
    //             for (let j = 0; j < 3; j++) {
    //                 for (let k = 0; k < 2; k++) {
    //                     if (!tempArray.includes(spotsResult[j][k].spot.title)) {
    //                         tempArray.push(spotsResult[j][k].spot.title);
    //                     }
    //                 }
    //             }
    //             spotName.push(tempArray);


    //             const pathArray = await makeDaySet(spotsResult);
    //             allPathSet.push(pathArray[0]);
    //             allPathName.push(pathArray[1]);
    //             walkPath.push(pathArray[2]);
    //         }

    //         await setInfo(prev => ({
    //             ...prev,
    //             spotName: spotName,
    //             pathset: allPathSet,
    //             pathNameset: allPathName,
    //             walkPath: walkPath
    //         }));
    //         setOnloading(true);
    //     }

    //     if (info.allDay > 0 && info.theme.length > 0) {
    //         makeAllPath();
    //     }
    // }, [info.allDay]);


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

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!window.kakao) return;

        window.kakao.maps.load(() => {
            if (!mapRef.current) return;

            const map = new window.kakao.maps.Map(
                mapRef.current,
                {
                    center: new window.kakao.maps.LatLng(35.925329, 128.547035),
                    level: 5
                }
            );

            mapInstanceRef.current = map;
        });
    }, []);



    const [subday, setSubday] = useState(0);

    const changeSubday = (e) => {
        setSubday(e);
    }

    const polylineRef = useRef([]);
    const markerRef = useRef([]);

    

    useEffect(() => {
        
        const map = mapInstanceRef.current;
        if (!map || !info.pathset) return;

        const bounds = new window.kakao.maps.LatLngBounds();

        // 기존 경로 제거
        polylineRef.current.forEach((polyline) => {
            polyline.setMap(null);
        });

        polylineRef.current = [];

        // 기존 마커 제거
        markerRef.current.forEach((marker) => {
            marker.setMap(null);
        });

        markerRef.current = [];


        info.pathset.forEach((daySet, index) => {
            const opa = index === subday ? 0.8 : 0.2;

            daySet.forEach((set) => {
                const startPath = drawPath(map, set[0], "#888888", 4, opa);
                const busPath = drawPath(map, set[1], "#2196F3", 8, opa);
                const endPath = drawPath(map, set[2], "#888888", 4, opa);

                polylineRef.current.push(startPath);
                polylineRef.current.push(busPath);
                polylineRef.current.push(endPath);

                // 모든 경로 좌표를 bounds에 추가
                [...set[0], ...set[1], ...set[2]].forEach(([x, y]) => {
                    bounds.extend(
                        new window.kakao.maps.LatLng(y, x)
                    );
                });

                // 선택된 일차만 마커
                if (index === subday) {
                    const startMarker = drawMarker(map, set[0][0]);
                    const endMarker = drawMarker(map, set[2][set[2].length - 1]);

                    markerRef.current.push(startMarker);
                    markerRef.current.push(endMarker);
                }
            });
        });

        // 모든 경로가 화면에 들어오도록 이동
        if (!bounds.isEmpty()) {
            map.setBounds(bounds);
        }

    }, [info.pathset, subday]);

    console.log('======info======')
    console.log(info);

    
    return (
        <div className = 'MP4' >
            <Title 
                icon = 'calendarCheck'
                text = '4단계' 
                title = '여행 경로가 완성되었어요'
                subtitle = '맘에드는지 확인해보세요'
                locate = 'left'/>
            <div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>이동 경로</p>
                    </div>
                    <div ref = {mapRef} className = 'kakaoMap'/>
                </div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>AI 추천 경로</p>
                    </div>
                    <div>
                        {Array.from({ length: info.allDay }, (_, i) => (
                            <div key={i + 1}>
                                <div style = {{border: `1px solid ${info['selectRegions'][i] == '미등록' ? 'color-mix(in srgb, var(--LM-line-color) 70%, transparent' : 'var(--LM-main-color)'}`}} onClick = {() => {changeDay(i); changeSubday(i)}} className = {day == i ? 'selectDay select' : 'selectDay'}>
                                    <div>
                                        <p>{i + 1}</p>
                                    </div>
                                    <div>
                                        <p>{i + 1}일차</p>
                                        <p>{info['selectRegions'][i]}</p>
                                    </div>
                                    <div>
                                        <Icon name = 'down' color = 'color-mix(in srgb, var(--LM-line-color) 70%, transparent)'/>
                                    </div>
                                </div>
                                {onloading && 
                                    <div className = 'path' style = {{display: subday == i ? 'block' : 'none'}}>
                                        {Array.from({ length: 3 }, (_, i) => (
                                            <div key = {i}>
                                                <div>
                                                    <Icon name = 'flag' color = 'var(--LM-main-color)' />
                                                    <p>{info.spotName[day][i]}</p>
                                                    <Icon name = 'arrowright' color = 'var(--LM-main-color)' />
                                                    <Icon name = 'flag' color = 'var(--LM-main-color)' />
                                                    <p>{info.spotName[day][i + 1]}</p>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div>
                                                            <p>출발</p>
                                                        </div>
                                                        <div></div>
                                                        <div>
                                                            <p>{info.pathNameset[day][i][0].split(" ")[1].replace(/외$/, "")}</p>
                                                        </div>
                                                        <div></div>
                                                        <div>
                                                            <p>도보</p>
                                                        </div>
                                                        <div></div>
                                                        <div>
                                                            <p>도착</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            <p>{info.spotName[day][i]}</p>
                                                            <p>총 {info.walkPath[day][i][0].route.legs[0].properties.distance}m 이동</p>
                                                        </div>
                                                        <div>
                                                            <p>{info.pathNameset[day][i][0].match(/\((.*?)\s*>\s*(.*?)\)/)[1]}</p>
                                                            <p>{info.pathNameset[day][i][1].length}개 정류장 이동</p>
                                                        </div>
                                                        <div>
                                                            <p>{info.pathNameset[day][i][0].match(/\((.*?)\s*>\s*(.*?)\)/)[2]}</p>
                                                            <p>총 {info.walkPath[day][i][1].route.legs[0].properties.distance}m 이동</p>
                                                        </div>
                                                        <div>
                                                            <p>{info.spotName[day][i + 1]}</p>
                                                            <p>도착</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
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

export default MP4


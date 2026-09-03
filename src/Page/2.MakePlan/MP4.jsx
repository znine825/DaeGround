import { useState, useEffect, useRef } from "react";
import { makeDaySet } from "../../Components/KakaoMap/KakaoMap.jsx";
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx';
import { Bus, Walk } from '../../Components/TripCommon/TripCommon.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx';
import { generateTripSpots } from '../../Javascript/TourAPI/Functions.js';
import { LocalBasedLoojup } from '../../Javascript/TourAPI/httpsCall.js';
import districtCode from '../../JSON/법정동분류코드.json';
import mockinfo from '../../JSON/walk.json';
import './MP4.css';
import './MP2.css';
import './MakePlan.css';

function drawPath(map, points, color, weight, opacity) {
    if (!points || points.length < 2) return null;
    const path = points.map(([x, y]) => new window.kakao.maps.LatLng(y, x));
    return new window.kakao.maps.Polyline({
        map,
        path,
        strokeWeight: weight,
        strokeColor: color,
        strokeOpacity: opacity,
        strokeStyle: "solid"
    });
}

function drawMarker(map, point) {
    if (!point || point.length < 2) return null;
    const position = new window.kakao.maps.LatLng(point[1], point[0]);
    return new window.kakao.maps.Marker({
        map,
        position
    });
}

async function loadRouteData(theme, region) {
    const spots = await generateTripSpots(
        theme,
        region,
        LocalBasedLoojup
    );

    const result = [];

    for (let i = 0; i < 3; i++) {
        result.push([spots[i], spots[i + 1]]);
    }

    return result;
}

function MP4({ info, setInfo, page, pageSet }) {
    const [day, setDay] = useState(0);
    const [subday, setSubday] = useState(0);
    const [onloading, setOnloading] = useState(false);
    const [mapReady, setMapReady] = useState(false);

    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const polylineRef = useRef([]);
    const markerRef = useRef([]);

    const [bar, setBar] = useState(1);
    let maxbar = 0;

    const changeDay = (e) => {
        setDay(e);
    };

    const changeSubday = (e) => {
        setSubday(e);
    };
    

    useEffect(() => {

        if (info.pathSet.length) {
            setOnloading(true);
            return;
        }

        async function makeAllPath() {
            const allMoveTypes = [];
            const allMoveDetails = [];
            const allPathSet = [];
            const allPathNameSet = [];
            const allContentsID = [];
            maxbar = info.allDay + 1;

            for (let i = 0; i < info.allDay; i++) {
                const spotsResult = await loadRouteData(
                    info.theme,
                    districtCode[info.selectRegions[i].split(" ")[0]].code
                );

                const dayResult = await makeDaySet(spotsResult);

                allMoveTypes.push(dayResult.moveTypes);
                allMoveDetails.push(dayResult.moveDetails);
                allPathSet.push(dayResult.pathSet);
                allPathNameSet.push(dayResult.pathNameSet);

                const tempArray = [
                    spotsResult[0][0].spot.contentid,
                    spotsResult[1][0].spot.contentid,
                    spotsResult[2][0].spot.contentid,
                    spotsResult[2][1].spot.contentid,
                ];
                allContentsID.push(tempArray);
                setBar(prev => prev + 1);
            }

            setInfo(prev => ({
                ...prev,
                moveType: allMoveTypes,
                moveDetail: allMoveDetails,
                pathSet: allPathSet,
                pathNameSet: allPathNameSet,
                allContentsID: allContentsID
            }));

            setOnloading(true);
        }

        if (info.allDay > 0 && info.theme.length > 0) {
            makeAllPath();
        }
    }, [info.allDay, info.theme, info.selectRegions]);



    useEffect(() => {
        let timer = null;

        const initMap = () => {
            if (!window.kakao || !window.kakao.maps) return false;
            if (!mapRef.current) return false;

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
                setMapReady(true);
            });

            return true;
        };

        if (!initMap()) {
            timer = setInterval(() => {
                if (initMap()) {
                    clearInterval(timer);
                }
            }, 100);
        }

        return () => {
            if (timer) clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const map = mapInstanceRef.current;

        if (!mapReady || !map) return;
        if (!info.pathSet?.length) return;

        const bounds = new window.kakao.maps.LatLngBounds();

        polylineRef.current.forEach(polyline => {
            if (polyline) polyline.setMap(null);
        });
        polylineRef.current = [];

        markerRef.current.forEach(marker => {
            if (marker) marker.setMap(null);
        });
        markerRef.current = [];

        const addBounds = (points) => {
            if (!points?.length) return;

            points.forEach(([x, y]) => {
                bounds.extend(
                    new window.kakao.maps.LatLng(y, x)
                );
            });
        };

        const draw = (points, color, weight, opacity) => {
            if (!points || points.length < 2) return;

            const polyline = drawPath(
                map,
                points,
                color,
                weight,
                opacity
            );

            if (polyline) {
                polylineRef.current.push(polyline);
                addBounds(points);
            }
        };

        const getWalkPoints = (walk) => {
            return walk?.route?.legs
                ?.flatMap(leg => leg.steps || [])
                ?.flatMap(step => step.path?.points || []) || [];
        };

        const getBusColor = (step) => {
            const guidance = step.properties?.guidance || "";

            if (guidance.includes("급행")) {
                return "#C73434";
            }

            return "#2196F3";
        };

        const getSubwayColor = (step) => {
            const vehicles = step.properties?.vehicles || [];

            for (const vehicle of vehicles) {
                const name = vehicle.name || "";

                if (name.includes("1호선")) {
                    return "#C73434";
                }

                if (name.includes("2호선")) {
                    return "#34C759";
                }

                if (name.includes("3호선")) {
                    return "#C7BB34";
                }
            }

            return "#C7BB34";
        };

        info.pathSet.forEach((daySet, dayIndex) => {
            const opacity = dayIndex === subday ? 0.8 : 0.2;

            daySet.forEach(move => {
                if (!move) return;

                if (move.type === "WALK") {
                    const walkPoints = getWalkPoints(move.path);

                    draw(
                        walkPoints,
                        "#888888",
                        4,
                        opacity
                    );

                    if (dayIndex === subday && walkPoints.length > 0) {
                        const startMarker = drawMarker(
                            map,
                            walkPoints[0]
                        );

                        const endMarker = drawMarker(
                            map,
                            walkPoints[walkPoints.length - 1]
                        );

                        if (startMarker) {
                            markerRef.current.push(startMarker);
                        }

                        if (endMarker) {
                            markerRef.current.push(endMarker);
                        }
                    }

                    return;
                }

                const startWalkPoints = getWalkPoints(move.startWalk);

                draw(
                    startWalkPoints,
                    "#888888",
                    4,
                    opacity
                );

                const steps = move.path?.steps || [];

                steps.forEach(step => {
                    const type = step.properties?.type;
                    const points = step.path?.points || [];

                    if (!points.length) return;

                    if (type === "WALKING") {
                        draw(
                            points,
                            "#888888",
                            4,
                            opacity
                        );
                        return;
                    }

                    if (type === "BUS") {
                        draw(
                            points,
                            getBusColor(step),
                            8,
                            opacity
                        );
                        return;
                    }

                    if (type === "SUBWAY") {
                        draw(
                            points,
                            getSubwayColor(step),
                            8,
                            opacity
                        );
                    }
                });

                const endWalkPoints = getWalkPoints(move.endWalk);

                draw(
                    endWalkPoints,
                    "#888888",
                    4,
                    opacity
                );

                if (dayIndex === subday) {
                    let startPoint = null;
                    let endPoint = null;

                    if (startWalkPoints.length > 0) {
                        startPoint = startWalkPoints[0];
                    } else {
                        const firstStep = steps.find(
                            step => step.path?.points?.length > 0
                        );

                        if (firstStep) {
                            startPoint = firstStep.path.points[0];
                        }
                    }

                    if (endWalkPoints.length > 0) {
                        endPoint = endWalkPoints[endWalkPoints.length - 1];
                    } else {
                        const lastStep = [...steps]
                            .reverse()
                            .find(
                                step => step.path?.points?.length > 0
                            );

                        if (lastStep) {
                            endPoint = lastStep.path.points[
                                lastStep.path.points.length - 1
                            ];
                        }
                    }

                    if (startPoint) {
                        const marker = drawMarker(
                            map,
                            startPoint
                        );

                        if (marker) {
                            markerRef.current.push(marker);
                        }
                    }

                    if (endPoint) {
                        const marker = drawMarker(
                            map,
                            endPoint
                        );

                        if (marker) {
                            markerRef.current.push(marker);
                        }
                    }
                }
            });
        });

        if (!bounds.isEmpty()) {
            map.setBounds(bounds);
        }
    }, [info.pathSet, subday, mapReady]);



    // useEffect(()  => {
    //     async function test() {
    //         await setInfo(mockinfo);
    //         setOnloading(true);
    //     }
    //     test();
    // },[]);

    const moveLeftPage = () => {
        alert('여행이 완성되어서 이전단계로 갈 수 없어요.');
        return false;
    };

    const moveRightPage = () => {
        pageSet(prev => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    };

    return (
        <div className='MP4'>
            <div></div>
            {onloading && (
            <div>
                <div>
                    <div>
                        <Icon
                            name='calendarCheck'
                            color='var(--LM-main-color)'
                        />
                        <p>이동 경로</p>
                    </div>

                    <div
                        ref={mapRef}
                        className='kakaoMap'
                    />
                </div>

                <div>
                    <div>
                        <Icon
                            name='calendarCheck'
                            color='var(--LM-main-color)'
                        />
                        <p>AI 추천 경로</p>
                    </div>

                    <div>
                        {Array.from({ length: info.allDay },(_, i) => (
                        <div key={i + 1}>
                            <div style={{ border: `1px solid ${ info.selectRegions[i] === '미등록' ? 'color-mix(in srgb, var(--LM-line-color) 70%, transparent)' : 'var(--LM-main-color)' }`}}
                                onClick={() => { changeDay(i); changeSubday(i); }}
                                className={ day === i ? 'selectDay select' : 'selectDay'}>
                                <div>
                                    <p>{i + 1}</p>
                                </div>
                                <div>
                                    <p>{i + 1}일차</p>
                                    <p>{info.selectRegions[i]}</p>
                                </div>
                                <div>
                                    <Icon name='down' color='color-mix(in srgb, var(--LM-line-color) 70%, transparent)'/>
                                </div>
                            </div>
                            
                            <div className='path' style={{ display: subday === i ? 'block' : 'none' }}>
                                {Array.from({ length: 3 }, (_, i) => (
                                <div key={i}>
                                    {info.pathSet[day][i].type != "WALK" &&
                                    <Bus info = {info} day = {day} num = {i}/>}
                                    {info.pathSet[day][i].type == "WALK" &&
                                    <Walk info = {info} day = {day} num = {i}/>}
                                </div>))}
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>)}
            {!onloading && (
                <div className="loading">
                    <p>여행 경로를 생성하고 있어요.</p>

                    <div className="loadingBar">
                        <div
                            className="loadingBarProgress"
                            style={{
                                width: `${info.allDay > 0 ? (bar / info.allDay) * 100 : 0}%`
                            }}
                        />
                    </div>

                    <p>{bar} / {info.allDay}</p>
                </div>
            )}
            <div className='pageButton'>
                {page !== 1 && (
                    <div onClick={moveLeftPage}>
                        <Button
                            width='150'
                            height='50'
                            text='이전단계'
                            fsize='16'
                            fweight='500'
                        />
                    </div>
                )}

                <div></div>

                {page !== 5 && (
                    <div onClick={moveRightPage}>
                        <Button
                            width='150'
                            height='50'
                            text='다음단계'
                            fsize='16'
                            fweight='500'
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default MP4;
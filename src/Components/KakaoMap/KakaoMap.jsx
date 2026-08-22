import { LocalBasedLoojup, getTransitRoute } from '../../Javascript/TourAPI/httpsCall.js'
import { useState, useEffect, useRef } from "react";

export function getBusPath(route) {
    // 해당 추천 경로의 첫 번째 버스 step
    const busStep = route.steps[0];

    return {
        points: busStep.path.points,

        start: busStep.path.points[0],

        end: busStep.path.points[
            busStep.path.points.length - 1
        ],

        guidance: busStep.properties.guidance,

        vehicles: busStep.properties.vehicles,

        distance: busStep.properties.distance,

        time: busStep.properties.time
    };
}

export async function getStartToBus(startX, startY, busStartX, busStartY) {
    const result = await getTransitRoute(
        startX,
        startY,
        busStartX,
        busStartY,
        "walk"
    );

    return result;
}

export async function getBusToEnd(busEndX, busEndY, endX, endY) {
    const result = await getTransitRoute(
        busEndX,
        busEndY,
        endX,
        endY,
        "walk"
    );

    return result;
}

export async function makeSet( route, startX, startY, endX, endY ) {
    // ① 버스 경로
    const busPath = getBusPath(route);

    // ② 출발지 → 버스 승차점
    const startToBus = await getStartToBus(
        startX,
        startY,
        busPath.start[0],
        busPath.start[1]
    );

    // ③ 버스 하차점 → 목적지
    const busToEnd = await getBusToEnd(
        busPath.end[0],
        busPath.end[1],
        endX,
        endY
    );

    return {
        startToBus,
        busPath,
        busToEnd
    };
}

export function KakaoMap({info, Spots}) {

    const [pathArray, setPathArray] = useState([]);
    useEffect(() => {

        async function loadRoute() {
            const result = [];
            for (let i = 0; i < Spots.length; i++) {

                const startX = Spots[i][0].spot.mapx;
                const startY = Spots[i][0].spot.mapy;
                const endX = Spots[i][1].spot.mapx;
                const endY = Spots[i][1].spot.mapy;

                const transitResult = await getTransitRoute( startX, startY, endX, endY, "publictraffic" );
                const route = transitResult.routes[0];

                
                const pathSet =
                    await makeSet(
                        route,
                        startX,
                        startY,
                        endX,
                        endY
                    );


                result.push(pathSet);
            }


            setPathArray(result);
        }

        loadRoute();

    }, [Spots, info.allDay]);


    const mapRef = useRef(null);

    useEffect(() => {

        if (!window.kakao) return;

        window.kakao.maps.load(() => {

            const map = new window.kakao.maps.Map(
                mapRef.current,
                {
                    center: new window.kakao.maps.LatLng(
                        35.925329,
                        128.547035
                    ),
                    level: 5
                }
            );

            if (!pathArray || pathArray.length === 0) {
                return;
            }

            const bounds =
                new window.kakao.maps.LatLngBounds();

            // ==========================
            // 모든 Set을 하나씩 그림
            // ==========================

            pathArray.forEach((set) => {

                // --------------------------
                // ① 출발지 → 버스 : 도보
                // --------------------------

                const startToBusPoints =
                    set.startToBus.route.legs
                        .flatMap(leg => leg.steps)
                        .flatMap(step => step.path.points);

                const startToBusPath =
                    startToBusPoints.map(([x, y]) => {

                        const position =
                            new window.kakao.maps.LatLng(y, x);

                        bounds.extend(position);

                        return position;
                    });

                new window.kakao.maps.Polyline({
                    map: map,
                    path: startToBusPath,
                    strokeWeight: 4,
                    strokeColor: "#888888",
                    strokeOpacity: 0.8,
                    strokeStyle: "solid"
                });


                // --------------------------
                // ② 버스 경로
                // --------------------------

                const busPath =
                    set.busPath.points.map(([x, y]) => {

                        const position =
                            new window.kakao.maps.LatLng(y, x);

                        bounds.extend(position);

                        return position;
                    });

                new window.kakao.maps.Polyline({
                    map: map,
                    path: busPath,
                    strokeWeight: 6,
                    strokeColor: "#2196F3",
                    strokeOpacity: 0.9,
                    strokeStyle: "solid"
                });


                // --------------------------
                // ③ 버스 → 도착지 : 도보
                // --------------------------

                const busToEndPoints =
                    set.busToEnd.route.legs
                        .flatMap(leg => leg.steps)
                        .flatMap(step => step.path.points);

                const busToEndPath =
                    busToEndPoints.map(([x, y]) => {

                        const position =
                            new window.kakao.maps.LatLng(y, x);

                        bounds.extend(position);

                        return position;
                    });

                new window.kakao.maps.Polyline({
                    map: map,
                    path: busToEndPath,
                    strokeWeight: 4,
                    strokeColor: "#888888",
                    strokeOpacity: 0.8,
                    strokeStyle: "solid"
                });

            });

            // 모든 세트가 지도에 들어오도록 영역 조정
            map.setBounds(bounds);
        });

    }, [pathArray]);


    return (
        <div
            ref={mapRef}
            style={{
                width: "100%",
                height: "500px"
            }}
        />
    );
}

export default KakaoMap
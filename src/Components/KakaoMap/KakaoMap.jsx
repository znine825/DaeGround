import { getTransitRoute } from '../../Javascript/TourAPI/httpsCall.js'
import { useState, useEffect } from "react";

export function getBusPath(route, info, setinfo) {
    const busStep = route.steps[0];

    return {
        points: busStep.path.points,
        start: busStep.path.points[0],
        end: busStep.path.points[busStep.path.points.length - 1],
        guidance: busStep.properties.guidance,
        vehicles: busStep.properties.vehicles,
        distance: busStep.properties.distance,
        stops: busStep.properties.stops,
        time: busStep.properties.time
    };
}

export async function getStartToBus(startX, startY, busStartX, busStartY) {
    const result = await getTransitRoute(startX, startY, busStartX, busStartY, "walk");
    return result;
}

export async function getBusToEnd(busEndX, busEndY, endX, endY) {
    const result = await getTransitRoute( busEndX, busEndY, endX, endY, "walk");
    return result;
}

export async function makeSet(route, startX, startY, endX, endY, info, setinfo) {
    const busPath = getBusPath(route);
    const startToBus = await getStartToBus(startX, startY, busPath.start[0], busPath.start[1]);
    const busToEnd = await getBusToEnd(busPath.end[0], busPath.end[1], endX, endY);
    const busPathName = busPath.stops;
    const busName = busPath.guidance;
    return { startToBus, busPath, busToEnd, busName, busPathName };
}

export async function makeDaySet(Spots, info, setinfo) {
    const pathArray = [];
    const busNameArray = [];

    for (let i = 0; i < Spots.length; i++) {
        const startX = Spots[i][0].spot.mapx;
        const startY = Spots[i][0].spot.mapy;
        const endX = Spots[i][1].spot.mapx;
        const endY = Spots[i][1].spot.mapy;

        const transitResult = await getTransitRoute(startX, startY, endX, endY, "publictraffic");

        const route = transitResult.routes[0];
        const pathSet = await makeSet(route, startX, startY, endX, endY);

        const startToBus = pathSet.startToBus.route.legs
            .flatMap(leg => leg.steps)
            .flatMap(step => step.path.points);

        const bus = pathSet.busPath.points;

        const busToEnd = pathSet.busToEnd.route.legs
            .flatMap(leg => leg.steps)
            .flatMap(step => step.path.points);
        
        busNameArray.push([pathSet.busName, pathSet.busPathName]);
        pathArray.push([startToBus, bus, busToEnd]);
    }

    return [pathArray, busNameArray];
}



import { getTransitRoute } from '../../Javascript/TourAPI/httpsCall.js';

export async function makeMove(startSpot, endSpot) {
    const startX = Number(startSpot.spot.mapx);
    const startY = Number(startSpot.spot.mapy);
    const endX = Number(endSpot.spot.mapx);
    const endY = Number(endSpot.spot.mapy);

    const transitResult = await getTransitRoute(startX, startY, endX, endY, "publictraffic");

    if (transitResult?.status === "OK" && transitResult.routes?.length > 0) {
        const route = selectBestTransitRoute(transitResult.routes);
        return makeTransitMove(route, startX, startY, endX, endY);
    }

    return makeWalkMove(startX, startY, endX, endY);
}

function selectBestTransitRoute(routes) {
    const priority = {
        SUBWAY: 0,
        BUSANDSUBWAY: 1,
        BUS: 2
    };

    return [...routes].sort((a, b) => {
        return (priority[a.properties.type] ?? 99) - (priority[b.properties.type] ?? 99);
    })[0];
}

async function makeTransitMove(route, startX, startY, endX, endY) {
    const type = route.properties.type;

    const transitSteps = route.steps.filter(step => {
        return step.properties?.type === "BUS" || step.properties?.type === "SUBWAY";
    });

    if (transitSteps.length === 0) {
        return makeWalkMove(startX, startY, endX, endY);
    }

    const firstStep = transitSteps[0];
    const lastStep = transitSteps[transitSteps.length - 1];

    const startPoint = firstStep.path.points[0];
    const endPoint = lastStep.path.points[lastStep.path.points.length - 1];

    const startWalk = await getTransitRoute(startX, startY, startPoint[0], startPoint[1], "walk");
    const endWalk = await getTransitRoute(endPoint[0], endPoint[1], endX, endY, "walk");

    return {
        type,
        detail: getTransportDetail(route),
        path: route,
        startWalk,
        endWalk
    };
}

function getTransportDetail(route) {
    const type = route.properties.type;

    if (type === "WALK") {
        return "도보";
    }

    const details = [];

    for (const step of route.steps) {
        const stepType = step.properties?.type;

        if (stepType === "BUS") {
            const guidance = step.properties?.guidance || "";
            const busDetail = parseBusGuidance(guidance);

            if (busDetail) {
                details.push(busDetail);
            }
        }

        if (stepType === "SUBWAY") {
            const subwayDetail = parseSubwayStep(step);

            if (subwayDetail) {
                details.push(subwayDetail);
            }
        }
    }

    return [...new Set(details)].join(" + ") || "대중교통";
}

function parseBusGuidance(guidance) {
    if (!guidance) {
        return null;
    }

    let text = guidance.split("(")[0].trim();
    text = text.replace(/^(간선|지선|급행|마을|순환)\s*/u, "");
    text = text.replace(/외\s*(\d+)\s*대/u, " 외 $1대");

    return text.trim() || null;
}

function parseSubwayStep(step) {
    const vehicles = step.properties?.vehicles || [];
    const subwayLines = [];

    for (const vehicle of vehicles) {
        const name = vehicle?.name || vehicle;

        if (!name) {
            continue;
        }

        if (name.includes("1호선")) {
            if (!subwayLines.includes("1호선")) {
                subwayLines.push("1호선");
            }
        } else if (name.includes("2호선")) {
            if (!subwayLines.includes("2호선")) {
                subwayLines.push("2호선");
            }
        } else if (name.includes("3호선")) {
            if (!subwayLines.includes("3호선")) {
                subwayLines.push("3호선");
            }
        }
    }

    if (subwayLines.length === 0) {
        const guidance = step.properties?.guidance || "";

        if (guidance.includes("1호선")) {
            subwayLines.push("1호선");
        }

        if (guidance.includes("2호선")) {
            subwayLines.push("2호선");
        }

        if (guidance.includes("3호선")) {
            subwayLines.push("3호선");
        }
    }

    return [...new Set(subwayLines)].join(" + ") || null;
}

async function makeWalkMove(startX, startY, endX, endY) {
    const result = await getTransitRoute(startX, startY, endX, endY, "walk");

    return {
        type: "WALK",
        detail: "도보",
        path: result,
        startWalk: null,
        endWalk: null
    };
}

export async function makeDaySet(spots) {
    const moveTypes = [];
    const moveDetails = [];
    const pathSet = [];
    const pathNameSet = [];

    for (let i = 0; i < spots.length; i++) {
        const move = await makeMove(spots[i][0], spots[i][1]);

        moveTypes.push(move.type);
        moveDetails.push(move.detail);
        pathSet.push(move);

        pathNameSet.push({
            start: spots[i][0].spot.title,
            end: spots[i][1].spot.title
        });
    }

    return {
        moveTypes,
        moveDetails,
        pathSet,
        pathNameSet
    };
}


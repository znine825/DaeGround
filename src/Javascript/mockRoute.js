// mockRoute.js

export const mockTransitResult = {
    routes: [
        {
            steps: [
                {
                    path: {
                        points: [
                            [128.607855, 35.936291],
                            [128.606926, 35.935329],
                            [128.604750, 35.933188],
                            [128.601824, 35.930475],
                            [128.599992, 35.928546],
                            [128.596948, 35.927474],
                            [128.596644, 35.923082],
                            [128.599247, 35.921066],
                            [128.603499, 35.921165],
                            [128.603665, 35.917961],
                            [128.603715, 35.916697],
                            [128.599608, 35.916595],
                            [128.599319, 35.915219]
                        ]
                    },
                    properties: {
                        guidance: "지선 수성3-1",
                        vehicles: ["수성3-1"],
                        distance: 2800,
                        time: 15
                    }
                }
            ]
        }
    ]
};


// 출발지 → 버스 탑승지
export const mockWalkStart = {
    route: {
        legs: [
            {
                properties: {
                    distance: 520,
                    time: 7
                },
                steps: [
                    {
                        path: {
                            points: [
                                [128.604024, 35.938887],
                                [128.603500, 35.938500],
                                [128.602800, 35.937800],
                                [128.602000, 35.937000],
                                [128.602000, 35.937000],
                                [128.601500, 35.936500],
                                [128.601000, 35.936000]
                            ]
                        }
                    }
                ]
            }
        ]
    }
};


// 버스 하차지 → 도착지
export const mockWalkEnd = {
    route: {
        legs: [
            {
                properties: {
                    distance: 430,
                    time: 6
                },
                steps: [
                    {
                        path: {
                            points: [
                                [128.599319, 35.915219],
                                [128.598800, 35.914800],
                                [128.598000, 35.914300],
                                [128.597200, 35.913700],
                                [128.596500, 35.913000]
                            ]
                        }
                    }
                ]
            }
        ]
    }
};


export function getBusPath(route) {
    const busStep = route.steps[0];

    return {
        points: busStep.path.points,
        start: busStep.path.points[0],
        end: busStep.path.points[busStep.path.points.length - 1],
        guidance: busStep.properties.guidance,
        vehicles: busStep.properties.vehicles,
        distance: busStep.properties.distance,
        time: busStep.properties.time
    };
}



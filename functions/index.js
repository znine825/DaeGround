const {setGlobalOptions} = require("firebase-functions");
setGlobalOptions({ maxInstances: 10 });

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");

const tourApiKey = defineSecret("TOUR_API_KEY"); 
const tourApiKey2 = defineSecret("TOUR_API_KEY2"); 

exports.callTourApi = onCall(
    {
        secrets: [tourApiKey2],
        timeoutSeconds: 60,
    },
    async (request) => {
        try {
            const serviceKey = tourApiKey2.value();
            const { endpoint, params, service } = request.data;

            const baseUrl =
                `https://apis.data.go.kr/B551011/${service}/${endpoint}`;

            const query = new URLSearchParams({
                serviceKey,
                MobileOS: 'WEB',
                MobileApp: 'DaeGround',
                _type: 'json',
                numOfRows: '50',
                arrange: 'D',
                ...params
            });

            const url = `${baseUrl}?${query.toString()}`;

            console.log("TourAPI 요청:", url.replace(serviceKey, "***"));

            let response;

            for (let attempt = 1; attempt <= 3; attempt++) {
                try {
                    console.log(`TourAPI 요청 시도 ${attempt}/3`);

                    response = await fetch(url, {
                        signal: AbortSignal.timeout(10000)
                    });

                    break;
                } catch (error) {
                    console.error(
                        `TourAPI 요청 실패 ${attempt}/3:`,
                        error
                    );

                    if (attempt === 3) {
                        throw error;
                    }

                    await new Promise(resolve =>
                        setTimeout(resolve, 1000 * attempt)
                    );
                }
            }

            const text = await response.text();

            console.log("TourAPI HTTP:", response.status);
            console.log("TourAPI 응답:", text);

            let result;

            try {
                result = JSON.parse(text);
            } catch (e) {
                console.error("TourAPI JSON 파싱 실패:", text);

                throw new HttpsError(
                    "internal",
                    "TourAPI 응답이 JSON이 아닙니다."
                );
            }

            if (!result?.response) {
                console.error("response 없음:", result);

                throw new HttpsError(
                    "internal",
                    "TourAPI response가 없습니다."
                );
            }

            if (!result.response.body) {
                console.error("body 없음:", result);

                throw new HttpsError(
                    "internal",
                    "TourAPI body가 없습니다."
                );
            }

            const items = result.response.body.items?.item;

            if (!items || items === "") {
                return [];
            }

            return Array.isArray(items)
                ? items
                : [items];

        } catch (error) {
            console.error("callTourApi 오류:", error);

            if (error instanceof HttpsError) {
                throw error;
            }

            throw new HttpsError(
                "internal",
                error.message || "TourAPI 요청 중 오류가 발생했습니다."
            );
        }
    }
);


const kakaoApiKey = defineSecret("KAKAO_API_KEY");

exports.getPathToBud = onCall(
    { secrets: [kakaoApiKey] },
    async (request) => {
        const restApiKey = kakaoApiKey.value();
        const { startX, startY, endX, endY } = request.data;
        const url = `https://dapi.kakao.com/v2/routing/publictraffic?${params.toString()}`;

        const params = new URLSearchParams({
            start_x: String(startX),
            start_y: String(startY),
            end_x: String(endX),
            end_y: String(endY),
        });

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${restApiKey}`,
            },
        });

        const text = await response.text();

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("JSON 파싱 실패:", text);
            throw new HttpsError("internal", "KakaoAPI 요청 실패");
        }

        return result;
    }
);


exports.getToPath = onCall(
    { secrets: [kakaoApiKey] },
    async (request) => {
        const restApiKey = kakaoApiKey.value();
        const { startX, startY, endX, endY, way } = request.data;
        

        const params = new URLSearchParams({
            start_x: String(startX),
            start_y: String(startY),
            end_x: String(endX),
            end_y: String(endY),
        });
        
        const url = `https://dapi.kakao.com/v2/routing/${way}?${params.toString()}`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${restApiKey}`,
            },
        });

        const text = await response.text();

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error("JSON 파싱 실패:", text);
            throw new HttpsError("internal", "KakaoAPI 요청 실패");
        }

        return result;
    }
);
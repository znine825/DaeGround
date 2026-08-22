const {setGlobalOptions} = require("firebase-functions");
setGlobalOptions({ maxInstances: 10 });

const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");

const tourApiKey = defineSecret("TOUR_API_KEY"); 

exports.callTourApi = onCall(
    { secrets: [tourApiKey] },
    async (request) => {
        const serviceKey = tourApiKey.value();   
        const { endpoint, params, service } = request.data;   

        const baseUrl = `https://apis.data.go.kr/B551011/${service}/${endpoint}`;

        const query = new URLSearchParams({
            serviceKey,
            MobileOS: 'ETC',
            MobileApp: 'DaeGround',
            _type: 'json',
            ...params
        });

        const response = await fetch(`${baseUrl}?${query.toString()}`);
        const text = await response.text();

        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error('TourAPI 응답 파싱 실패:', text);
            throw new HttpsError('internal', 'TourAPI 요청 실패');
        }

        return result.response.body.items.item;
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
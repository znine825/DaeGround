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

        if (result.response.header.resultCode !== '0000') {
            throw new HttpsError('internal', result.response.header.resultMsg);
        }

        return result.response.body.items.item;
    }
);


const tmapApiKey = defineSecret("TMAP_API_KEY");

exports.getTransitRoute = onCall(
    { secrets: [tmapApiKey] },
    async (request) => {
        const appKey = tmapApiKey.value();
        const { startX, startY, endX, endY } = request.data;

        const url = 'https://apis.openapi.sk.com/transit/routes';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'appKey': appKey
            },
            body: JSON.stringify({
                startX: String(startX),
                startY: String(startY),
                endX: String(endX),
                endY: String(endY),
                count: 1,
                lang: 0,
                format: 'json'
            })
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('TMAP API 에러:', result);
            throw new HttpsError('internal', 'TMAP 경로 조회 실패');
        }

        return result;
    }
);
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// functions/index.js
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const fetch = require("node-fetch");

const tourApiKey = defineSecret("TOUR_API_KEY");   // 시크릿 정의

exports.callTourApi = onCall(
    { secrets: [tourApiKey] },   // ← runWith 대신 이렇게 옵션으로 전달
    async (request) => {
        const serviceKey = tourApiKey.value();   // ← process.env 대신 이렇게 값 가져옴
        const { endpoint, params, service } = request.data;   // v2는 request.data로 접근

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
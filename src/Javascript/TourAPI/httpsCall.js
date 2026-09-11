import { getFunctions, httpsCallable } from "firebase/functions";

const PROXY_URL = 'https://api.daeground.com/api/tour';

export async function LocalBasedLoojup(lDongSignguCd, lclsSystm1, lclsSystm2, lclsSystm3) {
    try {
        const params = {
            endpoint: 'areaBasedList2',
            service: 'KorService2',
            numOfRows: 50,
            MobileOS: 'WEB',
            MobileApp: 'DaeGound',
            arrange: 'D',
            lDongRegnCd: 27,
            lclsSystm1,
            lclsSystm2,
            lclsSystm3
        };

        if (lDongSignguCd !== undefined && lDongSignguCd !== null && lDongSignguCd !== '') {
            params.lDongSignguCd = lDongSignguCd;
        }

        const query = new URLSearchParams(params);

        const response = await fetch(`${PROXY_URL}?${query.toString()}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('LocalBasedLoojup 오류:', error);
        return null;
    }
}

export async function getContentImage(contentId) {
    try {
        const params = {
            endpoint: 'detailImage2',
            service: 'KorService2',
            MobileOS: 'WEB',
            MobileApp: 'DaeGound',
            contentId,
            numOfRows: 20,
            pageNo: 1
        };

        const query = new URLSearchParams(params);

        const response = await fetch(`${PROXY_URL}?${query.toString()}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('getContentImage 오류:', error);
        return null;
    }
}

export async function getTransitRoute(startX, startY, endX, endY, way) {
    const functions = getFunctions();
    const fn = httpsCallable(functions, 'getToPath');

    const result = await fn({
        way: way,
        startX: startX,
        startY: startY,

        endX: endX,
        endY: endY
    });
    return result.data;
}
import { getFunctions, httpsCallable } from "firebase/functions";

export async function LocalBasedLoojup(lDongSignguCd, lclsSystm1, lclsSystm2, lclsSystm3) {
    const functions = getFunctions();
    const fn = httpsCallable(functions, 'callTourApi');

    try {
        const params = {
            numOfRows: 50,
            MobileOS: 'WEB',
            MobileApp: 'DaeGound',
            arrange: 'D',
            lDongRegnCd: 27,
            lclsSystm1: lclsSystm1,
            lclsSystm2: lclsSystm2,
            lclsSystm3: lclsSystm3
        };

        if (lDongSignguCd) {
            params.lDongSignguCd = lDongSignguCd;
        }

        const result = await fn({
            endpoint: 'areaBasedList2',
            service: 'KorService2',
            params
        });

        return result.data;
    } catch (error) {
        console.error(error.code, error.message);
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

    console.log(result.data);
    return result.data;
}
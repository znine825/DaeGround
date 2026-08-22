import { getFunctions, httpsCallable } from "firebase/functions";
import themeData from '../../JSON/관광타입정보.json'
import daeguDistrictCode  from '../../JSON/법정동분류코드.json'

function buildSubThemeIndex(themeData) {
    const index = {};
    for (const [mainTheme, subThemes] of Object.entries(themeData)) {
        for (const [subTheme, codes] of Object.entries(subThemes)) {
            const pool = (mainTheme === '맛집탐방' && subTheme !== '카페') ? '밥' : '활동';
            index[subTheme] = { mainTheme, pool, codes };
        }
    }
    return index;
}
 
const subThemeIndex = buildSubThemeIndex(themeData);
 
// ─────────────────────────────────────────────
// 3. 특정 풀 타입(밥/활동)에 해당하는 전체 소테마 이름 목록 (폴백용)
// ─────────────────────────────────────────────
function getDefaultPool(poolType) {
    return Object.entries(subThemeIndex)
        .filter(([_, meta]) => meta.pool === poolType)
        .map(([name]) => name);
}
 
// ─────────────────────────────────────────────
// 4. Fisher-Yates 셔플
// ─────────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
 
// ─────────────────────────────────────────────
// 5. 풀에서 서로 다른 소테마 2개 선택
//    - 선택한 소테마가 2개 이상: 그중에서 랜덤 2개
//    - 선택한 소테마가 1개: 그 1개 + 기본 풀에서 겹치지 않는 랜덤 1개
//    - 선택한 소테마가 0개: 기본 풀에서 랜덤 2개
// ─────────────────────────────────────────────
function pickTwo(selectedPool, fallbackPool) {
    if (selectedPool.length >= 2) {
        const shuffled = shuffle(selectedPool);
        return [shuffled[0], shuffled[1]];
    }
 
    if (selectedPool.length === 1) {
        const first = selectedPool[0];
        const rest = fallbackPool.filter(name => name !== first);
        const second = rest.length > 0 ? shuffle(rest)[0] : first;
        return [first, second];
    }
 
    const shuffled = shuffle(fallbackPool);
    return shuffled.length >= 2
        ? [shuffled[0], shuffled[1]]
        : [shuffled[0], shuffled[0]];
}
 
// ─────────────────────────────────────────────
// 6. 메인 함수
//    유저가 선택한 소테마 이름 배열(2~4개) → 4개 슬롯(밥/활동/밥/활동) 반환
//    각 슬롯의 codes는 해당 소테마의 전체 코드 배열([[lclsSystm2, lclsSystm3], ...])이 그대로 담김
// ─────────────────────────────────────────────
export function selectThemeSlots(selectedSubThemeNames) {
    const mealSelected = selectedSubThemeNames.filter(
        name => subThemeIndex[name]?.pool === '밥'
    );
    const activitySelected = selectedSubThemeNames.filter(
        name => subThemeIndex[name]?.pool === '활동'
    );
 
    const [meal1, meal2] = pickTwo(mealSelected, getDefaultPool('밥'));
    const [act1, act2] = pickTwo(activitySelected, getDefaultPool('활동'));
 
    const buildSlot = (slotNum, type, subTheme) => {
        const meta = subThemeIndex[subTheme];
        return {
            slot: slotNum,
            type,
            subTheme,
            mainTheme: meta.mainTheme,
            pool: meta.pool,
            codes: meta.codes   // [[lclsSystm2, lclsSystm3], ...] 전체 배열 그대로
        };
    };
 
    return [
        buildSlot(1, '밥', meal1),
        buildSlot(2, '활동', act1),
        buildSlot(3, '밥', meal2),
        buildSlot(4, '활동', act2),
    ];
}
 
// ─────────────────────────────────────────────
// 7. 한 슬롯의 codes를 전부 순서대로 호출해서, 결과를 하나의 배열로 합치기
//    - callApiFn: (lDongSignguCd, lclsSystm1, lclsSystm2, lclsSystm3) => Promise<장소배열|null>
//      실제 API 호출 함수(예: wldurrlqks)를 그대로 주입받아 사용
// ─────────────────────────────────────────────
async function fetchAllSpotsForSlot(lDongSignguCd, slot, callApiFn) {
    let merged = [];
 
    for (const [lclsSystm2, lclsSystm3] of slot.codes) {
        const lclsSystm1 = lclsSystm2.slice(0, 2);
        const data = await callApiFn(lDongSignguCd, lclsSystm1, lclsSystm2, lclsSystm3);
        if (data && data.length > 0) {
            merged = merged.concat(data);
        }
    }
 
    return merged;   // 이 슬롯(소테마)에 해당하는 모든 후보 장소를 합친 배열
}
 
// ─────────────────────────────────────────────
// 8. 4개 슬롯 각각에 대해 fetchAllSpotsForSlot을 실행 →
//    "슬롯별 후보 장소 배열" 4개를 반환 (총 4개의 배열)
// ─────────────────────────────────────────────
export async function fetchCandidatesForAllSlots(lDongSignguCd, slots, callApiFn) {
    const candidateLists = await Promise.all(
        slots.map(slot => fetchAllSpotsForSlot(lDongSignguCd, slot, callApiFn))
    );
    // candidateLists[0] = 슬롯1 후보 장소 배열
    // candidateLists[1] = 슬롯2 후보 장소 배열
    // candidateLists[2] = 슬롯3 후보 장소 배열
    // candidateLists[3] = 슬롯4 후보 장소 배열
    return candidateLists;
}
 
// ─────────────────────────────────────────────
// 9. 4개의 후보 배열 각각에서 장소 하나씩 랜덤으로 뽑기 → 최종 4곳 확정
// ─────────────────────────────────────────────
export function pickFinalSpots(candidateLists) {
    return candidateLists.map(list => {
        if (!list || list.length === 0) return null;   // 후보가 아예 없으면 null
        return list[Math.floor(Math.random() * list.length)];
    });
}
 
// ─────────────────────────────────────────────
// 10. 전체 흐름을 한 번에 실행하는 최종 함수
// ─────────────────────────────────────────────
export async function generateTripSpots(selectedSubThemeNames, lDongSignguCd, callApiFn) {
    const slots = selectThemeSlots(selectedSubThemeNames);
    const candidateLists = await fetchCandidatesForAllSlots(lDongSignguCd, slots, callApiFn);
    const finalSpots = pickFinalSpots(candidateLists);
 
    return slots.map((slot, i) => ({
        ...slot,
        candidateCount: candidateLists[i].length,
        spot: finalSpots[i]
    }));
}
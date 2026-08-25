import { getFunctions, httpsCallable } from "firebase/functions";
import themeData from '../../JSON/관광타입정보.json';
import daeguDistrictCode from '../../JSON/법정동분류코드.json';


// ============================================================
// 1. 소테마 정보 인덱스 생성
// ============================================================

function buildSubThemeIndex(themeData) {
    const index = {};

    for (const [mainTheme, subThemes] of Object.entries(themeData)) {
        for (const [subTheme, codes] of Object.entries(subThemes)) {

            const pool =
                (mainTheme === '맛집탐방' && subTheme !== '카페')
                    ? '밥'
                    : '활동';

            index[subTheme] = {
                mainTheme,
                pool,
                codes
            };
        }
    }

    return index;
}

const subThemeIndex = buildSubThemeIndex(themeData);


// ============================================================
// 2. 특정 pool의 전체 소테마 목록
// ============================================================

function getDefaultPool(poolType) {
    return Object.entries(subThemeIndex)
        .filter(([_, meta]) => meta.pool === poolType)
        .map(([name]) => name);
}


// ============================================================
// 3. Fisher-Yates 셔플
// ============================================================

function shuffle(arr) {
    const a = [...arr];

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}


// ============================================================
// 4. 선택된 소테마 중 밥/활동 각각 2개 선택
// ============================================================

function pickTwo(selectedPool, fallbackPool) {

    // 선택된 소테마가 2개 이상
    if (selectedPool.length >= 2) {

        const shuffled = shuffle(selectedPool);

        return [
            shuffled[0],
            shuffled[1]
        ];
    }


    // 선택된 소테마가 1개
    if (selectedPool.length === 1) {

        const first = selectedPool[0];

        const rest = fallbackPool.filter(
            name => name !== first
        );

        const second =
            rest.length > 0
                ? shuffle(rest)[0]
                : first;

        return [
            first,
            second
        ];
    }


    // 선택된 소테마가 0개
    const shuffled = shuffle(fallbackPool);

    return shuffled.length >= 2
        ? [
            shuffled[0],
            shuffled[1]
        ]
        : [
            shuffled[0],
            shuffled[0]
        ];
}


// ============================================================
// 5. 최종 4개 슬롯 생성
// ============================================================

export function selectThemeSlots(selectedSubThemeNames) {

    const mealSelected =
        selectedSubThemeNames.filter(
            name => subThemeIndex[name]?.pool === '밥'
        );


    const activitySelected =
        selectedSubThemeNames.filter(
            name => subThemeIndex[name]?.pool === '활동'
        );


    const [meal1, meal2] =
        pickTwo(
            mealSelected,
            getDefaultPool('밥')
        );


    const [act1, act2] =
        pickTwo(
            activitySelected,
            getDefaultPool('활동')
        );


    const buildSlot = (
        slotNum,
        type,
        subTheme
    ) => {

        const meta = subThemeIndex[subTheme];

        return {
            slot: slotNum,
            type,
            subTheme,
            mainTheme: meta.mainTheme,
            pool: meta.pool,
            codes: meta.codes
        };
    };


    return [
        buildSlot(1, '밥', meal1),
        buildSlot(2, '활동', act1),
        buildSlot(3, '밥', meal2),
        buildSlot(4, '활동', act2)
    ];
}


// ============================================================
// 6. 한 슬롯의 모든 API 코드 검색
// ============================================================

async function fetchAllSpotsForSlot(lDongSignguCd, slot, callApiFn) {
    let merged = [];

    // 1. 현재 지역에서 먼저 검색
    for (const [lclsSystm2, lclsSystm3] of slot.codes) {
        const lclsSystm1 = lclsSystm2.slice(0, 2);

        const data = await callApiFn(
            lDongSignguCd,
            lclsSystm1,
            lclsSystm2,
            lclsSystm3
        );

        if (data && data.length > 0) {
            merged = merged.concat(data);
        }
    }

    // 현재 지역에서 찾았으면 그대로 사용
    if (merged.length > 0) {
        return merged;
    }

    // 2. 현재 지역에서 하나도 안 나오면
    // 대구 전체에서 같은 테마로 검색
    for (const [lclsSystm2, lclsSystm3] of slot.codes) {
        const lclsSystm1 = lclsSystm2.slice(0, 2);

        const data = await callApiFn(
            null,
            lclsSystm1,
            lclsSystm2,
            lclsSystm3
        );

        if (data && data.length > 0) {
            merged = merged.concat(data);
        }
    }

    return merged;
}


// ============================================================
// 7. 새로운 테마를 사용한 슬롯 생성
// ============================================================

function makeSlotWithTheme(
    slot,
    subTheme
) {

    const meta =
        subThemeIndex[subTheme];


    return {
        ...slot,

        subTheme,

        mainTheme:
            meta.mainTheme,

        pool:
            meta.pool,

        codes:
            meta.codes
    };
}


// ============================================================
// 8. 모든 슬롯 후보 검색
//
// 검색 순서:
//
// ① 선택 지역 + 현재 테마
// ② 대구 전체 + 현재 테마
// ③ 다른 테마 선택
// ④ 선택 지역 + 새로운 테마
// ⑤ 대구 전체 + 새로운 테마
// ⑥ 그래도 없으면 다시 다른 테마
//
// 결과가 나올 때까지 반복
// ============================================================

export async function fetchCandidatesForAllSlots(
    lDongSignguCd,
    slots,
    callApiFn
) {

    // 최종 후보 장소
    const candidateLists =
        new Array(slots.length).fill(null);


    // 최종적으로 사용할 슬롯 정보
    const finalSlots = [
        ...slots
    ];


    // 슬롯 하나씩 검색
    for (
        let i = 0;
        i < finalSlots.length;
        i++
    ) {

        let currentSlot =
            finalSlots[i];


        let result = [];


        // 이 슬롯에서 이미 사용한 테마
        const usedThemes =
            new Set([
                currentSlot.subTheme
            ]);


        console.log(
            `===== 슬롯 ${currentSlot.slot} 검색 시작 =====`
        );

        console.log(
            `현재 테마: ${currentSlot.subTheme}`
        );


        // ====================================================
        // 현재 테마 검색
        // ====================================================

        // --------------------------------------------
        // ① 선택 지역 검색
        // --------------------------------------------

        result =
            await fetchAllSpotsForSlot(
                lDongSignguCd,
                currentSlot,
                callApiFn
            );


        console.log(
            `지역 검색 결과: ${result.length}개`
        );


        // --------------------------------------------
        // ② 지역에서 없으면 대구 전체 검색
        // --------------------------------------------

        if (result.length === 0) {

            result =
                await fetchAllSpotsForSlot(
                    undefined,
                    currentSlot,
                    callApiFn
                );


            console.log(
                `대구 전체 검색 결과: ${result.length}개`
            );
        }


        // --------------------------------------------
        // 현재 테마에서 찾았으면 종료
        // --------------------------------------------

        if (result.length > 0) {

            candidateLists[i] =
                result;

            finalSlots[i] =
                currentSlot;

            console.log(
                `슬롯 ${currentSlot.slot} 성공: ${currentSlot.subTheme}`
            );

            continue;
        }


        // ====================================================
        // 현재 테마에서도 없음
        // 다른 테마로 계속 변경
        // ====================================================

        while (result.length === 0) {


            // --------------------------------------------
            // 같은 pool에서 아직 사용하지 않은 테마 찾기
            // --------------------------------------------

            const possibleThemes =
                getDefaultPool(
                    currentSlot.pool
                ).filter(
                    theme =>
                        !usedThemes.has(theme)
                );


            // --------------------------------------------
            // 사용할 테마가 하나도 없음
            // --------------------------------------------

            if (
                possibleThemes.length === 0
            ) {

                console.warn(
                    `슬롯 ${currentSlot.slot}: ${currentSlot.pool}의 모든 테마 검색 실패`
                );

                break;
            }


            // --------------------------------------------
            // 랜덤으로 새로운 테마 선택
            // --------------------------------------------

            const nextTheme =
                possibleThemes[
                    Math.floor(
                        Math.random() *
                        possibleThemes.length
                    )
                ];


            usedThemes.add(
                nextTheme
            );


            console.log(
                `슬롯 ${currentSlot.slot}: ${nextTheme}로 테마 변경`
            );


            // --------------------------------------------
            // 새로운 테마 슬롯 생성
            // --------------------------------------------

            currentSlot =
                makeSlotWithTheme(
                    currentSlot,
                    nextTheme
                );


            // --------------------------------------------
            // ③ 새로운 테마 + 선택 지역
            // --------------------------------------------

            result =
                await fetchAllSpotsForSlot(
                    lDongSignguCd,
                    currentSlot,
                    callApiFn
                );


            console.log(
                `${nextTheme} 지역 검색 결과: ${result.length}개`
            );


            // --------------------------------------------
            // ④ 새로운 테마 + 대구 전체
            // --------------------------------------------

            if (
                result.length === 0
            ) {

                result =
                    await fetchAllSpotsForSlot(
                        undefined,
                        currentSlot,
                        callApiFn
                    );


                console.log(
                    `${nextTheme} 대구 전체 검색 결과: ${result.length}개`
                );
            }


            // --------------------------------------------
            // 결과 발견
            // --------------------------------------------

            if (
                result.length > 0
            ) {

                console.log(
                    `슬롯 ${currentSlot.slot} 성공! 최종 테마: ${currentSlot.subTheme}`
                );


                candidateLists[i] =
                    result;


                finalSlots[i] =
                    currentSlot;
            }
        }


        console.log(
            `===== 슬롯 ${slots[i].slot} 검색 종료 =====`
        );
    }


    return {
        candidateLists,
        slots: finalSlots
    };
}


// ============================================================
// 9. 후보 장소 중 랜덤으로 하나 선택
// ============================================================

export function pickFinalSpots(
    candidateLists
) {

    return candidateLists.map(
        list => {

            if (
                !list ||
                list.length === 0
            ) {
                return null;
            }


            return list[
                Math.floor(
                    Math.random() *
                    list.length
                )
            ];
        }
    );
}


// ============================================================
// 10. 전체 장소 생성 함수
// ============================================================

export async function generateTripSpots(
    selectedSubThemeNames,
    lDongSignguCd,
    callApiFn
) {

    // ========================================================
    // ① 최초 4개 슬롯 생성
    // ========================================================

    const slots =
        selectThemeSlots(
            selectedSubThemeNames
        );


    console.log(
        "최초 선택 슬롯:",
        slots
    );


    // ========================================================
    // ② 슬롯별 장소 검색
    // ========================================================

    const result =
        await fetchCandidatesForAllSlots(
            lDongSignguCd,
            slots,
            callApiFn
        );


    const candidateLists =
        result.candidateLists;


    const finalSlots =
        result.slots;


    // ========================================================
    // ③ 각 슬롯에서 최종 장소 하나씩 랜덤 선택
    // ========================================================

    const finalSpots =
        pickFinalSpots(
            candidateLists
        );


    // ========================================================
    // ④ 최종 결과 생성
    // ========================================================

    return finalSlots.map(
        (slot, i) => ({

            ...slot,

            candidateCount:
                candidateLists[i]?.length ?? 0,

            spot:
                finalSpots[i]
        })
    );
}
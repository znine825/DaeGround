
import { getFunctions, httpsCallable } from "firebase/functions";
import themeData from '../../JSON/관광타입정보.json';

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

function getDefaultPool(poolType) {
    return Object.entries(subThemeIndex)
        .filter(([, meta]) => meta.pool === poolType)
        .map(([name]) => name);
}

function shuffle(arr) {
    const a = [...arr];

    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a;
}

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

export function selectThemeSlots(selectedSubThemeNames) {
    const mealSelected = selectedSubThemeNames.filter(
        name => subThemeIndex[name]?.pool === '밥'
    );

    const activitySelected = selectedSubThemeNames.filter(
        name => subThemeIndex[name]?.pool === '활동'
    );

    const [meal1, meal2] = pickTwo(
        mealSelected,
        getDefaultPool('밥')
    );

    const [act1, act2] = pickTwo(
        activitySelected,
        getDefaultPool('활동')
    );

    const buildSlot = (slotNum, type, subTheme) => {
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

async function fetchAllSpotsForSlot(lDongSignguCd, slot, callApiFn) {
    const results = await Promise.all(
        slot.codes.map(async ([lclsSystm2, lclsSystm3]) => {
            const lclsSystm1 = lclsSystm2.slice(0, 2);

            try {
                const data = await callApiFn(
                    lDongSignguCd,
                    lclsSystm1,
                    lclsSystm2,
                    lclsSystm3
                );

                return Array.isArray(data) ? data : [];
            } catch (error) {
                console.error(
                    `TourAPI 호출 실패: ${lclsSystm2}, ${lclsSystm3}`,
                    error
                );

                return [];
            }
        })
    );

    return results.flat();
}

function makeSlotWithTheme(slot, subTheme) {
    const meta = subThemeIndex[subTheme];

    return {
        ...slot,
        subTheme,
        mainTheme: meta.mainTheme,
        pool: meta.pool,
        codes: meta.codes
    };
}

export async function fetchCandidatesForAllSlots(
    lDongSignguCd,
    slots,
    callApiFn
) {
    const candidateLists = new Array(slots.length).fill(null);
    const finalSlots = [...slots];

    for (let i = 0; i < finalSlots.length; i++) {
        let currentSlot = finalSlots[i];
        let result = [];

        const usedThemes = new Set([currentSlot.subTheme]);

        console.log(`===== 슬롯 ${currentSlot.slot} 검색 시작 =====`);
        console.log(`현재 테마: ${currentSlot.subTheme}`);

        result = await fetchAllSpotsForSlot(
            lDongSignguCd,
            currentSlot,
            callApiFn
        );

        console.log(`지역 검색 결과: ${result.length}개`);

        if (result.length === 0) {
            result = await fetchAllSpotsForSlot(
                undefined,
                currentSlot,
                callApiFn
            );

            console.log(`대구 전체 검색 결과: ${result.length}개`);
        }

        if (result.length > 0) {
            candidateLists[i] = result;
            finalSlots[i] = currentSlot;

            console.log(
                `슬롯 ${currentSlot.slot} 성공: ${currentSlot.subTheme}`
            );

            console.log(`===== 슬롯 ${currentSlot.slot} 검색 종료 =====`);

            continue;
        }

        while (result.length === 0) {
            const possibleThemes = getDefaultPool(currentSlot.pool)
                .filter(theme => !usedThemes.has(theme));

            if (possibleThemes.length === 0) {
                console.warn(
                    `슬롯 ${currentSlot.slot}: ${currentSlot.pool}의 모든 테마 검색 실패`
                );

                break;
            }

            const nextTheme =
                possibleThemes[
                    Math.floor(Math.random() * possibleThemes.length)
                ];

            usedThemes.add(nextTheme);

            console.log(
                `슬롯 ${currentSlot.slot}: ${nextTheme}로 테마 변경`
            );

            currentSlot = makeSlotWithTheme(
                currentSlot,
                nextTheme
            );

            result = await fetchAllSpotsForSlot(
                lDongSignguCd,
                currentSlot,
                callApiFn
            );

            console.log(
                `${nextTheme} 지역 검색 결과: ${result.length}개`
            );

            if (result.length === 0) {
                result = await fetchAllSpotsForSlot(
                    undefined,
                    currentSlot,
                    callApiFn
                );

                console.log(
                    `${nextTheme} 대구 전체 검색 결과: ${result.length}개`
                );
            }

            if (result.length > 0) {
                console.log(
                    `슬롯 ${currentSlot.slot} 성공! 최종 테마: ${currentSlot.subTheme}`
                );

                candidateLists[i] = result;
                finalSlots[i] = currentSlot;
            }
        }

        console.log(`===== 슬롯 ${slots[i].slot} 검색 종료 =====`);
    }

    return {
        candidateLists,
        slots: finalSlots
    };
}

export function pickFinalSpots(candidateLists) {
    return candidateLists.map(list => {
        if (!list || list.length === 0) {
            return null;
        }

        return list[
            Math.floor(Math.random() * list.length)
        ];
    });
}

export async function generateTripSpots(
    selectedSubThemeNames,
    lDongSignguCd,
    callApiFn
) {
    const slots = selectThemeSlots(
        selectedSubThemeNames
    );

    console.log("최초 선택 슬롯:", slots);

    const result = await fetchCandidatesForAllSlots(
        lDongSignguCd,
        slots,
        callApiFn
    );

    const candidateLists = result.candidateLists;
    const finalSlots = result.slots;

    const finalSpots = pickFinalSpots(
        candidateLists
    );

    return finalSlots.map((slot, i) => ({
        ...slot,
        candidateCount:
            candidateLists[i]?.length ?? 0,
        spot: finalSpots[i]
    }));
}

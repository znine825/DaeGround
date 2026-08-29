import { useState, useEffect } from "react";
import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './MP3.css'
import './MakePlan.css'



function MP3({info, setInfo, page, pageSet}) {

    const setTheme = (t, h) => {
        setInfo(prev => {
            const index = prev.theme.indexOf(t);

            if (index === -1) {

                if (prev.theme.length >= 4) {
                    alert('테마는 최대 4개까지 선택 가능합니다');
                    return prev;
                }

                return {
                    ...prev,
                    theme: [...prev.theme, t],
                    themetitle: [...prev.themetitle, h]
                };
            }

            return {
                ...prev,
                theme: prev.theme.filter((_, i) => i !== index),
                themetitle: prev.themetitle.filter((_, i) => i !== index)
            };
        });
    };

    const deleteTheme = (index) => {
        setInfo(prev => ({
            ...prev,
            theme: prev.theme.filter((_, i) => i !== index),
            themetitle: prev.themetitle.filter((_, i) => i !== index)
        }));
    };

    function SubTheme({url, name, theme}) {
        return (
            <div onClick = {() => setTheme(name, theme)} className = 'subTheme'>
                <img src = {url}/>
                <p>{name}</p>
                {info['theme'].includes(name) &&
                    <div className = 'checkTheme'>
                        <Icon name ='check' color = 'var(--LM-background-color)'/>
                    </div>}
            </div>
        )
    }

    const moveLeftPage = () => {
        pageSet((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {
        if(info['theme'].length < 2) {
            alert('테마를 2개이상 선택해주세요');
            return false
        }
        pageSet((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    }; 

    return (
        <div className = 'MP3'>
            <div></div>
            <div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>테마</p>
                        <p>최소 2개 선택, 최대 4개 까지 선택가능</p>
                    </div>
                    <div>
                        <div className = 'mainTheme'>
                            <div>
                                <div>
                                    <img src = './Image/theme/맛집탐방/맛집탐방.png' />
                                    <p>맛집 탐방</p>
                                </div>
                                <div>
                                    <SubTheme url = './Image/theme/맛집탐방/한식.png' name = '한식' theme = '맛집탐방'/>
                                    <SubTheme url = './Image/theme/맛집탐방/외국식.png' name = '외국식' theme = '맛집탐방'/>
                                    <SubTheme url = './Image/theme/맛집탐방/카페.png' name = '카페' theme = '맛집탐방'/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src = './Image/theme/축제공연/축제공연.png' />
                                    <p>축제 / 공연</p>
                                </div>
                                <div>
                                    <SubTheme url = './Image/theme/축제공연/축제.png' name = '축제' theme = '축제공연'/>
                                    <SubTheme url = './Image/theme/축제공연/공연.png' name = '공연' theme = '축제공연'/>
                                    <SubTheme url = './Image/theme/축제공연/행사.png' name = '행사' theme = '축제공연'/>
                                    <SubTheme url = './Image/theme/축제공연/영화.png' name = '영화' theme = '축제공연'/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src = './Image/theme/쇼핑/쇼핑.png' />
                                    <p>쇼핑</p>
                                </div>
                                <div>
                                    <SubTheme url = './Image/theme/쇼핑/쇼핑몰.png' name = '쇼핑몰' theme = '쇼핑'/>
                                    <SubTheme url = './Image/theme/쇼핑/시장.png' name = '시장' theme = '쇼핑'/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src = './Image/theme/자연힐링/자연힐링.png' />
                                    <p>자연 / 힐링</p>
                                </div>
                                <div>
                                    <SubTheme url = './Image/theme/자연힐링/산•숲.png' name = '산•숲' theme = '자연힐링'/>
                                    <SubTheme url = './Image/theme/자연힐링/바다•강.png' name = '바다•강' theme = '자연힐링'/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src = './Image/theme/액티비티/액티비티.png' />
                                    <p>액티비티</p>
                                </div>
                                <div>
                                    <SubTheme url = './Image/theme/액티비티/공예.png' name = '공예' theme = '액티비티'/>
                                    <SubTheme url = './Image/theme/액티비티/스포츠.png' name = '스포츠' theme = '액티비티'/>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img src = './Image/theme/역사문화/역사문화.png' />
                                    <p>역사 / 문화</p>
                                </div>
                                <div>
                                    <SubTheme url = './Image/theme/역사문화/랜드마크.png' name = '랜드마크' theme = '역사문화'/>
                                    <SubTheme url = './Image/theme/역사문화/전시시설.png' name = '전시시설' theme = '역사문화'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)'/>
                        <p>선택된 테마</p>
                        <p>{info.theme.length}개</p>
                    </div>
                    <div>
                        {info.theme.length == 0 && 
                            <div className = 'notSelectedTheme'>
                                <Icon name = 'puzzle' color = 'color-mix(in srgb, var(--LM-line-color) 70%, transparent)'/>
                                <p>테마를 선택해주세요</p>
                            </div>}
                        {info.theme.length != 0 && Array.from({ length: info.theme.length }, (_, i) => (
                            <div className = 'selectedTheme' key = {i + 1}>
                                <img src = {`./Image/theme/${info['themetitle'][i]}/${info['theme'][i]}.png`} />
                                <p>{info['theme'][i]}</p>
                                <p>{info['themetitle'][i]}</p>
                                <div onClick={() => deleteTheme(i)}>
                                    <Icon name = 'trashcan' color = 'color-mix(in srgb, var(--LM-line-color) 70%, transparent)' />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className = 'pageButton'>
                {page != 1 && <div onClick = {() => moveLeftPage()}>
                    <Button width = '150' height = '50' text = '이전단계' fsize = '16' fweight = '500' />
                </div>}
                <div></div>
                {page != 5 &&<div onClick = {() => moveRightPage()}>
                    <Button width = '150' height = '50' text = '다음단계' fsize = '16' fweight = '500' />
                </div>}
            </div>
        </div>
    )
}

export default MP3
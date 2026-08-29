import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { ko } from "date-fns/locale/ko";
registerLocale("ko", ko);

import { Title, Input, Button, LoadMap, PageHeader } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import "react-datepicker/dist/react-datepicker.css";
import './MP1.css'
import './MakePlan.css'

function MP1({info, setInfo, page, pageSet}) {

    const changePeople = (e, count) => {
        let tempPeople = [false, false, false, false];
        tempPeople[e] = true;

        const temp = {...info};
        temp['peopleType'] = tempPeople;
        temp['peopleNum'] = count;
        setInfo(temp); 

        console.log(info);
    }

    const addPeople = (e) => {
        setInfo(prev => {
            const temp = {...prev};
            temp['peopleNumArray'][e] = prev['peopleNumArray'][e] + 1;
            changePeople(e, temp['peopleNumArray'][e]);
            return temp;
        });
    }

    const minusPeople = (e) => {
        setInfo(prev => {
            if (prev['peopleNumArray'][e] === 0) return prev;   

            const temp = {...prev};
            temp['peopleNumArray'][e] = prev['peopleNumArray'][e] - 1;
            changePeople(e, temp['peopleNumArray'][e]);
            return temp;
        });
    }

    const moveLeftPage = () => {
        pageSet((prev) => {
            if (prev > 1) return prev - 1;
            return prev;
        });
    };

    const moveRightPage = () => {

        if (info['startDay'] == null) {
            alert('여행 시작일을 선택해주세요');
            return false;
        }

        if (info['endDay'] == null) {
            alert('여행 종료일을 선택해주세요');
            return false;
        }

        if (info['peopleNum'] == 0) {
            alert('옮바른 인원을 선택해주세요');
            return false
        }

        const tempInfo = {...info};

       
        tempInfo['allDay'] = info['startDay'] && info['endDay'] ? Math.round((info['endDay'] - info['startDay']) / (1000 * 60 * 60 * 24)) + 1 : 0;
        tempInfo['selectRegions'] = Array(tempInfo['allDay']).fill('미등록');
        setInfo(tempInfo);

        pageSet((prev) => {
            if (prev < 5) return prev + 1;
            return prev;
        });
    }; 


    return (
        <div className = 'MP1'>
            <div></div>
            <div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)' />
                        <p>여행 기간</p>
                        <p>{(info['startDay'] == null) ? '시작일' : `${info['startDay'].getMonth() + 1}월 ${info['startDay'].getDate()}일`} ~ {(info['endDay'] == null) ? '마지막일' : `${info['endDay'].getMonth() + 1}월 ${info['endDay'].getDate()}일`}</p>
                    </div>
                    <DatePicker
                        selected={info['startDay']}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            const temp = {...info}
                            temp['startDay'] = start;
                            temp['endDay'] = end;
                            setInfo(temp);
                        }}
                        startDate={info['startDay']}
                        endDate={info['endDay']}
                        selectsRange
                        inline
                        minDate={new Date()}
                        locale="ko"
                        calendarStartDay={1}
                        disabledKeyboardNavigation
                    />
                </div>
                <div>
                    <div className = 'peopleSelecte'>
                        <div>
                            <Icon name = 'profile' color = 'var(--LM-main-color)' />
                            <p>인원</p>
                            <p>총 {info['peopleNum']} 명</p>
                        </div>
                        <div onClick = {() => changePeople(0, info['peopleNumArray'][0])} className = {`${(info['peopleType'][0] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(info['peopleType'][0] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(info['peopleType'][0] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(info['peopleType'][0] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'profile' color = {`${(info['peopleType'][0] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(info['peopleType'][0] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>혼자</p>
                        </div>
                        <div onClick = {() => changePeople(1, info['peopleNumArray'][1])} className = {`${(info['peopleType'][1] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(info['peopleType'][1] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(info['peopleType'][1] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(info['peopleType'][1] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'users' color = {`${(info['peopleType'][1] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(info['peopleType'][1] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>친구와</p>
                            <div>
                                <div onClick = {() => minusPeople(1)} className = {`${(info['peopleType'][1] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'minus' color = 'var(--LM-subtext-color)'/>
                                </div>
                                <p style = {{
                                    color: `${(info['peopleType'][1] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                                }}>{info['peopleNumArray'][1]}</p>
                                <div onClick = {() => addPeople(1)} className = {`${(info['peopleType'][1] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'plus' color = 'var(--LM-subtext-color)'/>
                                </div>
                            </div>
                        </div>
                        <div onClick = {() => changePeople(2, info['peopleNumArray'][2])} className = {`${(info['peopleType'][2] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(info['peopleType'][2] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(info['peopleType'][2] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(info['peopleType'][2] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'users' color = {`${(info['peopleType'][2] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(info['peopleType'][2] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>가족과</p>
                            <div>
                                <div onClick = {() => minusPeople(2)} className = {`${(info['peopleType'][2] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'minus' color = 'var(--LM-subtext-color)'/>
                                </div>
                                <p style = {{
                                    color: `${(info['peopleType'][2] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                                }}>{info['peopleNumArray'][2]}</p>
                                <div onClick = {() => addPeople(2)} className = {`${(info['peopleType'][2] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'plus' color = 'var(--LM-subtext-color)'/>
                                </div >
                            </div>
                        </div>
                        <div onClick = {() => changePeople(3, info['peopleNumArray'][3])} className = {`${(info['peopleType'][3] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(info['peopleType'][3] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(info['peopleType'][3] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(info['peopleType'][3] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'users' color = {`${(info['peopleType'][3] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(info['peopleType'][3] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>연인과</p>
                            <div>
                                <div onClick = {() => minusPeople(3)} className = {`${(info['peopleType'][3] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'minus' color = 'var(--LM-subtext-color)'/>
                                </div>
                                <p style = {{
                                    color: `${(info['peopleType'][3] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                                }}>{info['peopleNumArray'][3]}</p>
                                <div onClick = {() => addPeople(3)} className = {`${(info['peopleType'][3] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'plus' color = 'var(--LM-subtext-color)'/>
                                </div>
                            </div>
                        </div>
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

export default MP1



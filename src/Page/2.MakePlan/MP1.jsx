import { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";

import { ko } from "date-fns/locale/ko";
registerLocale("ko", ko);

import { Title, Input, Button, LoadMap } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import "react-datepicker/dist/react-datepicker.css";
import './MP1.css'

function MP1() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [people, setPeople] = useState([1, 0, 0, 0]);
    const [selectPeople, setSelectPeople] = useState([true, false, false, false]);

    const days = startDate && endDate ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 : 0;

    let [allPeople, setAllPeoplr] = useState(people[0]);
    const changePeople = (e) => {
        let tempPeople = [false, false, false, false];
        tempPeople[e] = true;
        setSelectPeople(tempPeople);
        setAllPeoplr(people[e]);
    }

    const addPeople = (e) => {
        const tempPeoples = [...people];
        tempPeoples[e] = people[e] + 1;
        setPeople(tempPeoples);
    }

    const minusPeople = (e) => {
        if (people[e] != 0) {
            const tempPeoples = [...people];
            tempPeoples[e] = people[e] - 1;
            setPeople(tempPeoples);
        }
    }


    return (
        <div className = 'MP1'>
            <Title 
                icon = 'calendarCheck'
                text = '1단계' 
                title = '누구와, 언제 떠나요?'
                subtitle = '여행 날짜와 누구랑 가는지 알려주세요'
                locate = 'left'/>
            <div>
                <div>
                    <div>
                        <Icon name = 'calendarCheck' color = 'var(--LM-main-color)' />
                        <p>여행 기간</p>
                        <p>{(startDate == null) ? '시작일' : `${startDate.getMonth() + 1}월 ${startDate.getDate()}일`} ~ {(endDate == null) ? '마지막일' : `${endDate.getMonth() + 1}월 ${endDate.getDate()}일`}</p>
                    </div>
                    <DatePicker
                        selected={startDate}
                        onChange={(dates) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
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
                            <p>총 {allPeople} 명</p>
                        </div>
                        <div onClick = {() => changePeople(0)} className = {`${(selectPeople[0] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(selectPeople[0] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(selectPeople[0] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(selectPeople[0] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'profile' color = {`${(selectPeople[0] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(selectPeople[0] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>혼자</p>
                        </div>
                        <div onClick = {() => changePeople(1)} className = {`${(selectPeople[1] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(selectPeople[1] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(selectPeople[1] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(selectPeople[1] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'users' color = {`${(selectPeople[1] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(selectPeople[1] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>친구와</p>
                            <div>
                                <div onClick = {() => minusPeople(1)} className = {`${(selectPeople[1] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'minus' color = 'var(--LM-subtext-color)'/>
                                </div>
                                <p style = {{
                                    color: `${(selectPeople[1] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                                }}>{people[1]}</p>
                                <div onClick = {() => addPeople(1)} className = {`${(selectPeople[1] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'plus' color = 'var(--LM-subtext-color)'/>
                                </div>
                            </div>
                        </div>
                        <div onClick = {() => changePeople(2)} className = {`${(selectPeople[2] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(selectPeople[2] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(selectPeople[2] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(selectPeople[2] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'users' color = {`${(selectPeople[2] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(selectPeople[2] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>가족과</p>
                            <div>
                                <div onClick = {() => minusPeople(2)} className = {`${(selectPeople[2] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'minus' color = 'var(--LM-subtext-color)'/>
                                </div>
                                <p style = {{
                                    color: `${(selectPeople[2] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                                }}>{people[2]}</p>
                                <div onClick = {() => addPeople(2)} className = {`${(selectPeople[2] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'plus' color = 'var(--LM-subtext-color)'/>
                                </div >
                            </div>
                        </div>
                        <div onClick = {() => changePeople(3)} className = {`${(selectPeople[3] == true) ? '' : 'hover'}`}
                                style = {{
                                border: `1px solid ${(selectPeople[3] == true) ? 'var(--LM-main-color)' : 'color-mix(in srgb, var(--LM-line-color) 60%, transparent)'}`,
                                backgroundColor: `${(selectPeople[3] == true) ? 'color-mix(in srgb, var(--LM-main-color) 20%, transparent)' : '#FFFFFF00'}`,
                                boxShadow: `${(selectPeople[3] == true) ? '0px 0px 20px rgba(52, 199, 89, 0.25)' : '0px 0px 0px #FFFFFF00'}`}}>
                            <Icon name = 'users' color = {`${(selectPeople[3] == true) ? 'var(--LM-main-color)' : 'var(--LM-subtext-color)'}`}/>
                            <p style = {{
                                color: `${(selectPeople[3] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                            }}>연인과</p>
                            <div>
                                <div onClick = {() => minusPeople(3)} className = {`${(selectPeople[3] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'minus' color = 'var(--LM-subtext-color)'/>
                                </div>
                                <p style = {{
                                    color: `${(selectPeople[3] == true) ? 'var(--LM-mainouttext-color)' : 'var(--LM-subtext-color)'}`
                                }}>{people[3]}</p>
                                <div onClick = {() => addPeople(3)} className = {`${(selectPeople[3] == true) ? 'hover' : ''}`}>
                                    <Icon name = 'plus' color = 'var(--LM-subtext-color)'/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MP1



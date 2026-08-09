import { useState, useEffect } from "react";
import { Outlet, Link } from 'react-router-dom';
import { Title } from '../../Components/Common/Common.jsx'
import { Icon } from './../../Components/Icons/Icons.jsx'
import './MyPage.css'

function MyPage() {

    const [menu, setMenu] = useState(['Myon', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff'])

    function changeMenu(num) {
        let tempMenu = ['Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff', 'Myoff'];
        tempMenu[num] = 'Myon';
        setMenu(tempMenu);
    }
    

    return (
        <div className = 'MyPage'>
            <div className = 'MyPageheader'>
                <Title 
                    icon = 'flag' 
                    text = '마이페이지' 
                    title = '나의 에코 여행기록' 
                    subtitle = '나의 정보와 기록을 한눈에 확인하세요' 
                    locate = 'left'/>
                <div>
                    <p>회원정보</p>
                    <Link className = {`menu ${menu[0]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(0)}><Icon name = 'profile' color = {(menu[0] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>회원 정보</p></Link>
                    <p>나의 여행</p>
                    <Link className = {`menu ${menu[1]}`}
                        to = "MyPlan"
                        onClick = {() => changeMenu(1)}><Icon name = 'plan' color = {(menu[1] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>예정된 여행</p></Link>
                    <Link className = {`menu ${menu[2]}`}
                        to = "MySaving"
                        onClick = {() =>changeMenu(2)}><Icon name = 'echo' color = {(menu[2] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>나의 탄소절감</p></Link>
                    <p>나의 활동</p>
                    <Link className = {`menu ${menu[3]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(3)}><Icon name = 'file' color = {(menu[3] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>게시글</p></Link>
                    <Link className = {`menu ${menu[4]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(4)}><Icon name = 'comment' color = {(menu[4] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>댓글</p></Link>
                    <Link className = {`menu ${menu[5]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(5)}><Icon name = 'heart' color = {(menu[5] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>좋아요</p></Link>
                    <Link className = {`menu ${menu[6]}`}
                        to = "MyInfo"
                        onClick = {() => changeMenu(6)}><Icon name = 'star' color = {(menu[6] == 'Myon') ? '#FFFFFF' : '#6D6D6D' } /><p>즐겨찾기</p></Link>
                </div>
            </div>
            <div></div>
            <div className = 'outlet'>
                <Outlet />
            </div>
        </div>
    )
}

export default MyPage
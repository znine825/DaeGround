import { Icon } from './../Icons/Icons.jsx'
import './TripCommon.css'

function WayTitle({start, end}) {
    return (
        <div className = 'wayTitle'>
            <Icon name='flag' color='var(--LM-main-color)'/>
            <p>{start}</p>
            <Icon name='arrowright' color='var(--LM-main-color)'/>
            <Icon name='flag' color='var(--LM-main-color)'/>
            <p>{end}</p>
        </div>
    )
}

function WayPoint({title, way, subtitle, line}) {
    return (
        <div className = 'wayPoint'>
            <div>
                <div>
                    <p>{title}</p>
                </div>
            </div>
            <div style = {{display: line ? 'box' : 'none'}}></div>
            <p>{way}</p>
            <p>{subtitle}</p>
        </div>
    )
}

export function Bus({info, day, num}) {
    const busCount = info.pathset[day][num].path.steps;

    const busWayArray = [];
    for(let i = 0; i < busCount.length; i++) {
        busWayArray.push(busCount[i].properties.type);
    }
    console.log(info);
    return (
        <div className = 'bus'>
            <WayTitle start = {info.pathNameSet[day][num].start} end = {info.pathNameSet[day][num].end}/>
            <div className = 'WayPointGrid'>
                <WayPoint title = '출발' way = {info.pathNameSet[day][num].start} subtitle = '1111m 이동' line = {true}/>
                {Array.from({ length: busWayArray.length }, (_, i) => (
                    <div key = {i}>
                        {busWayArray[i] == "BUS" &&
                        <div>
                        </div>}
                        {busWayArray[i] == "SUBWAY" &&
                        <div>
                        </div>}
                        {busWayArray[i] == "WALKING" &&
                        <div>
                        </div>}
                    </div>
                ))}

                <WayPoint title = '출발' way = {info.pathNameSet[day][num].start} subtitle = '1111m 이동' line = {true}/>
            </div>
        </div>
    )
}
export function Walk({info, day, num}) {
    return (
        <div className = 'walk'>
            <WayTitle start = {info.pathNameSet[day][num].start} end = {info.pathNameSet[day][num].end}/>
        </div>
    )
}
export function Subway({info, day, num}) {
    return (
        <div className = 'subway'>
            <WayTitle start = {info.pathNameSet[day][num].start} end = {info.pathNameSet[day][num].end}/>
        </div>
    )
}

export function SubwayAndBus({info, day, num}) {
    return (
        <div className = 'SubwayAndBus'>
            <WayTitle start = {info.pathNameSet[day][num].start} end = {info.pathNameSet[day][num].end}/>
        </div>
    )
}

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

function WayPoint({title, way, subtitle, color, line = true}) {
    return (
        <div className = 'wayPoint'>
            <div style ={{backgroundColor: color}}>
                <p>{title}</p>
            </div>
            <div style = {{ 
                    border: `2px dashed ${color}`,
                    display: line ? 'box' : 'none'}}></div>
            <p>{way}</p>
            <p>{subtitle}</p>
        </div>
    )
}

export function Bus({info, day, num}) {
    const busCount = info.pathSet[day][num].path.steps;
    
    function getBusNumber(text) {
        // 농어촌 300 → 농300
        const rural = text.match(/농어촌\s*(\d+(?:-\d+)?)/);
        if (rural) {
            return `농${rural[1]}`;
        }

        // 숫자 / 숫자-숫자 / 급행숫자 / 한글+숫자
        const match = text.match(/(?:급행\d+|[가-힣]+\d+|\d+(?:-\d+)?)/);

        return match ? match[0] : null;
    }

    function wayColorAndText(text) {
        const result = []
        if(text.includes('급행')) {
            result.push('#C73434');   
            result.push(getBusNumber(text));

            return result;
        }
        if(text.includes('간선')) {
            result.push('#346FC7');
            result.push(getBusNumber(text));

            return result;
        }
        if(text.includes('1호선')) {
            result.push('#C73434');
            result.push(text.split(" ")[0]);

            return result;
        }
        if(text.includes('2호선')) {
            result.push('#34C759');
            result.push(text.split(" ")[0]);

            return result;
        }
        if(text.includes('3호선')) {
            result.push('#C7BB34');     
            result.push(text.split(" ")[0]);

            return result;
        }
            
        
        result.push('#34C759');
        result.push(getBusNumber(text));

        return result;
    }

    function getBusStops(text) {
        const arrowIndex = text.indexOf(" > ");

        if (arrowIndex === -1) return null;

        // " > " 앞에서 가장 가까운 "("
        const startIndex = text.lastIndexOf("(", arrowIndex);

        // " > " 뒤에서 마지막 ")"
        const endIndex = text.lastIndexOf(")");

        if (startIndex === -1 || endIndex === -1) return null;

        const start = text.slice(startIndex + 1, arrowIndex).trim();
        const end = text.slice(arrowIndex + 3, endIndex).trim();

        return [start, end];
    }

    const busWayArray = [];
    for(let i = 0; i < busCount.length; i++) {
        busWayArray.push(busCount[i].properties.type);
    }

    
    return (
        <div className = 'bus'>
            <WayTitle start = {info.pathNameSet[day][num].start} end = {info.pathNameSet[day][num].end}/>
            <div className = 'WayPointGrid'>
                <WayPoint title = '출발' way = {info.pathNameSet[day][num].start} subtitle = {info.pathSet[day][num].startWalk === 0 ? '0m 이동' : `${info.pathSet[day][num].startWalk.route.legs[0].properties.distance}m 이동`}/>
                {Array.from({ length: busWayArray.length }, (_, i) => (
                    <div key = {i}>
                        {busWayArray[i] == "BUS" &&
                        <div>
                            <WayPoint 
                                title = {wayColorAndText(busCount[i].properties.guidance)[1]} 
                                way = {`${getBusStops(busCount[i].properties.guidance)[0]} 탑승`}
                                subtitle = {`${getBusStops(busCount[i].properties.guidance)[1]} 하차`}
                                color = {wayColorAndText(busCount[i].properties.guidance)[0]}/> 
                        </div>}
                        {busWayArray[i] == "SUBWAY" &&
                        <div>
                            <WayPoint 
                                title = {wayColorAndText(busCount[i].properties.guidance)[1]} 
                                way = {`${getBusStops(busCount[i].properties.guidance)[0]} 탑승`}
                                subtitle = {`${getBusStops(busCount[i].properties.guidance)[1]} 하차`}
                                color = {wayColorAndText(busCount[i].properties.guidance)[0]}/> 
                        </div>}
                        {busWayArray[i] == "WALKING" &&
                        <div>
                            <WayPoint title = '환승' way = {`${getBusStops(busCount[i+1].properties.guidance)[0]}까지 이동`} subtitle = {info.pathSet[day][num].startWalk === 0 ? '0m 이동' : `${info.pathSet[day][num].startWalk.route.legs[0].properties.distance}m 이동`}/>
                        </div>}
                    </div>
                ))}

                <WayPoint title = '도착' way = {info.pathNameSet[day][num].end} subtitle = '도착' line = {false}/>
            </div>
        </div>
    )
}

export function Walk({info, day, num}) {
    return (
        <div>
            <WayTitle start = {info.pathNameSet[day][num].start} end = {info.pathNameSet[day][num].end}/>
            <div className = 'WayPointGrid'>
                <WayPoint title = '출발' way = {info.pathNameSet[day][num].start} subtitle = {`${info.pathSet[day][num].path.route.properties.totalDistance}m 이동`}/>
                <WayPoint title = '도착' way = {info.pathNameSet[day][num].end} subtitle = '도착' line = {false}/>
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

async function testCall() {
    const functions = getFunctions();
    const fn = httpsCallable(functions, 'callTourApi');
    
    try {
        const result = await fn({ 
            endpoint: 'areaBasedList2', 
            service : 'KorService2', 
            params: { 
                areaCode: '1', 
                numOfRows: 5, 
                pageNo: 1 } });
        console.log(result.data);
    } catch (error) {
        console.error(error.code, error.message);
    }
}

function MakePlan() {
    testCall()
    return (
        <div>
            
        </div>
    )
}

export default MakePlan
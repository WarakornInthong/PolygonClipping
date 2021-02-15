import React, { useEffect, useState }  from 'react';

// บน canvas 400*400 ที่ต้องการ 40*40
// canvas(200,200) = wanted(0,0) แต่ละด้านห่างจากจุดเริ่ม 10 หน่วย (100pixel)

// mode -> 1: ด้านล่าง,  2: ด้านขวา,  3: ด้านบน,  4: ด้านซ้าย

// case -> A: อยู่ในคู่,  B: อยู่นอกคู่,  C: ตัวแรกอยู่ในตัวที่สองอยู่นอก,  D: ตัวแรกอยู่ในตัวที่สองอยู่นอก
// ผลลัพธ์ ->  เก็บตัวสอง   ไม่เก็บสักตัว    เก็บจุดตัด                    เก็บจุดตัดกับจุดที่สอง   


// ทุกอย่างในหน้านี้ใช้พิกัดจริงที่เราต้องการ ไม่ใช่พิกัดของ canvas

const PolygonClipping = ( { pointList,saveCPoints } ) =>{

    const [points, setPoints] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [clipped, setClipped] = useState(true)
    let newPoint = []
    let p = []

    function Clipping(){
        p = points
        if(p.length > 2){
            for(let i = 1 ; i <= 4 ; i++){
                console.log("mode ", i )
                newPoint = []
                checkAllEdge(i, p)
                p = newPoint
                // console.log(p)
            }
                
        }
        // saveCPoints(p)
    }

    useEffect(() =>{
        console.log(pointList)
        setPoints(pointList)
    },[,refresh])

    useEffect(() =>{
        if(pointList.length > 2)
            Clipping()
    },[clipped])

    const lineEquation = (fpoint, lpoint, x, y) =>{
        // y = mx + c
        // m = (y1-y0) / (x1-x0)
        const m = (lpoint.y - fpoint.y) / (lpoint.x - fpoint.x)
        // c = y1 - m * x1
        const c = lpoint.y - (m * lpoint.x)
        
        if(lpoint.x - fpoint.x !==0 && lpoint.y - fpoint.y !==0){
            // รับค่าที่ x = ? มา เกิดจุดตัด
            if(x){
                return {
                    id: Math.random(),
                    x: x,
                    y: m * x + c
                }
            }
            // รับค่าที่ y = ? มา เกิดจุดตัด
            if(y){
                return {
                    id: Math.random(),
                    x: (y - c) / m,
                    y: y
                }
            }
        }
        else{
            if(x){
                return {
                    id: Math.random(),
                    x: x,
                    y: lpoint.y
                }
            }
            if(y){
                return {
                    id: Math.random(),
                    x: lpoint.x,
                    y: y
                }
            }
        }
        
        return {}
    }
    
    // input-> mode:รูปแบบ, fpoint:จุดแรก , lpoint:จุดที่สอง , value:ค่าที่ใช้เช็คว่าน้อยหรือมากกว่า
    const caseEdge = (fpoint, lpoint, symbol, x, y) =>{
        // น้อยกว่า mode 2,3
        if(symbol === 0){
            if(x){
                // case A
                if(fpoint.x <= x && lpoint.x <= x){
                    newPoint.push(lpoint)
                    console.log(lpoint)
                }
                // case C
                else if(fpoint.x <= x && lpoint.x > x){
                    newPoint.push(lineEquation(fpoint,lpoint,x,))
                    console.log(lineEquation(fpoint,lpoint,x,))
                }
                // case D
                else if(fpoint.x > x && lpoint.x <= x){
                    newPoint.push(lineEquation(fpoint,lpoint,x,))
                    newPoint.push(lpoint)
                    console.log(lineEquation(fpoint,lpoint,x,))
                    console.log(lpoint)
                }
                // case B
                else{
                    console.log("0w0")
                }
            }
            if(y){
                // case A
                if(fpoint.y <= y && lpoint.y <= y){
                    newPoint.push(lpoint)
                    console.log(lpoint)
                }
                // case C
                else if(fpoint.y <= y && lpoint.y > y){
                    newPoint.push(lineEquation(fpoint,lpoint, '',y))
                    console.log(lineEquation(fpoint,lpoint, '',y))
                }
                // case D
                else if(fpoint.y > y && lpoint.y <= y){
                    newPoint.push(lineEquation(fpoint,lpoint, '',y))
                    newPoint.push(lpoint)
                    console.log(lineEquation(fpoint,lpoint, '',y))
                    console.log(lpoint)
                }
                // case B
                else{
                    console.log("0w0")
                }
            }
        }
        // มากกว่า mode 1,4
        else if(symbol === 1){
            if(x){
                // case A
                if(fpoint.x >= x && lpoint.x >= x){
                    newPoint.push(lpoint)
                    console.log(lpoint)
                }
                // case C
                else if(fpoint.x >= x && lpoint.x < x){
                    newPoint.push(lineEquation(fpoint,lpoint,x, ''))
                    console.log(lineEquation(fpoint,lpoint,x, ''))
                }
                // case D
                else if(fpoint.x < x && lpoint.x >= x){
                    newPoint.push(lineEquation(fpoint,lpoint,x, ''))
                    newPoint.push(lpoint)
                    console.log(lineEquation(fpoint,lpoint,x, ''))
                    console.log(lpoint)
                }
                // case B
                else{
                    console.log("0w0")
                }
            }
            if(y){
                // case A
                if(fpoint.y >= y && lpoint.y >= y){
                    newPoint.push(lpoint)
                    console.log(lpoint)
                }
                // case C
                else if(fpoint.y >= y && lpoint.y < y){
                    newPoint.push(lineEquation(fpoint,lpoint, '',y))
                    console.log(lineEquation(fpoint,lpoint, '',y))
                }
                // case D
                else if(fpoint.y < y && lpoint.y >= y){
                    newPoint.push(lineEquation(fpoint,lpoint, '',y))
                    newPoint.push(lpoint)
                    console.log(lineEquation(fpoint,lpoint, '',y))
                    console.log(lpoint)
                }
                // case B
                else{
                    console.log("0w0")
                }
            }
        }
    }
    
    // input-> mode:รูปแบบ, fpoint:จุดแรก , lpoint:จุดที่สอง , value:ค่าที่ใช้เช็คว่าน้อยหรือมากกว่า
    const checkEdge = (mode, fpoint, lpoint, value) =>{
        //ดูจากค่า x ว่าน้อยกว่าหรือมากกว้า
        // ดูน้อยกว่า
        switch(mode){
            // ขอบล่างต้องการ จุดที่ y > value*-1
            case 1: caseEdge(fpoint, lpoint, 1, '', value*-1)
                break;
            // ขอบขวาต้องการ จุดที่ x < value
            case 2: caseEdge(fpoint, lpoint, 0, value, '')
                break;
            // ขอบบนต้องการ จุดที่ y < value
            case 3: caseEdge(fpoint, lpoint, 0, '', value)
                break;
            // ขอบซ้ายต้องการ จุดที่ x > value*-1
            case 4: caseEdge(fpoint, lpoint, 1, value*-1, '')
                break;
        }
    
    }
    
    // input-> mode:รูปแบบ, points:จุดทั้งหมด
    function checkAllEdge(mode, points){
        for(let i = 1 ; i < points.length ; i++){
            if(points.length > 1)
                checkEdge(mode, points[i-1], points[i], 10)
        }
        if(points.length > 1)
        checkEdge(mode, points[points.length-1], points[0], 10)
    }
    
    function handleClickRefresh(){
        setRefresh(!refresh)
    }

    function handleClickClipping(){
        setClipped(!clipped)
    }

    return (
        <div>
            <button onClick={() => {setRefresh(!refresh)}}>refresh</button>
            <button onClick={() => {setClipped(!clipped)}}>clipped</button>
            <button onClick={() => {saveCPoints(p)}}>sendCPoints</button>
            
        </div>
    )


}

export default PolygonClipping

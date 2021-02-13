import { render } from "@testing-library/react";
import React ,{ useRef, useEffect, useState } from 'react';
import { decodeCoor, encodeCoor } from './DecodeCoor'

const Canvas = props => {

    const canvasRef = useRef(null)

    const [canvasPoints, setCanvasPoints] = useState([])

    const [updateP, setUpdateP] = useState(true)

    const [clear, setClear] = useState(true)
    // setCanvasPoints(props.points)

    // draw point when have only 1 point
    const drawPoint = (context, pxPoints) =>{
        context.beginPath();
        context.arc(pxPoints[0].x,pxPoints[0].y,2,0,2*Math.PI);
    }

    const drawLine = (context, pxPoints) => {
        
        context.moveTo(pxPoints[0].x,pxPoints[0].y)
        context.lineTo(pxPoints[1].x,pxPoints[1].y)
        context.stroke()
    }

    const drawPolygon = (context, pxPoints) => {
        
        for(let i = 1; i< pxPoints.length ; i++){
            drawLine(context, pxPoints.slice(i-1,i+1))
            
        }
        drawLine(context, [pxPoints[pxPoints.length-1],pxPoints[0]])
    }

    const draw = (canvas) => {
        const context = canvas.getContext('2d')
        // resetCanvas(canvas)
        context.beginPath()
        context.strokeStyle = "#FF0000"
        const p = props.points
        // console.log(p)
        let pxPoints = decodeCoor(p)

        if(p.length !== 0){
            if(p.length === 1){
                console.log('point')
                // console.log(pxPoints)
                drawPoint(context, pxPoints)
            }
            else if(p.length === 2){
                console.log('line')
                drawLine(context, pxPoints)
            }
            else{
                console.log('polygon')
                drawPolygon(context, pxPoints)
            }
        }
        else{
            resetCanvas(canvas)
        }
        pxPoints = encodeCoor(pxPoints)
    }

    const drawclipping = (canvas) => {
        const context = canvas.getContext('2d')
        resetCanvas(canvas)
        context.beginPath()
        context.strokeStyle = "#0000FF"
        const p = props.cpoints
        // console.log(p)
        let pxPoints = decodeCoor(p)
        if(p.length !== 0){
            if(p.length === 1){
                console.log('point clipped')
                // console.log(pxPoints)
                drawPoint(context, pxPoints)
            }
            else if(p.length === 2){
                console.log('line clipped')
                drawLine(context, pxPoints)
            }
            else{
                console.log('polygon clipped')
                drawPolygon(context, pxPoints)
            }
            context.fillStyle = '#0000FF'
            context.fill()
        }
        else{
            resetCanvas(canvas)
        }
        pxPoints = encodeCoor(pxPoints)
    }




    function toggleE() {
        // props.showPolygon(updateP)
        setCanvasPoints(props.points)
        // console.log(canvasPoints)
        setUpdateP(!updateP)
    }

    function setAxis(context){
        context.beginPath()
        context.strokeStyle = "#000000"
        context.moveTo(200,0)
        context.lineTo(200,400)
        context.stroke()
        context.moveTo(0,200)
        context.lineTo(400,200)
        context.stroke()
    }

    function setWindow(context){
        // window 20x20 Min(10,10) Max(30,30)
        context.beginPath()
        context.strokeStyle = "#00FF00"
        context.strokeRect(100, 100, 200, 200);
    }

    useEffect(() => {
        const canvas = canvasRef.current
        resetCanvas(canvas)
        
    },[clear])


    function resetCanvas(canvas){
        const context = canvas.getContext('2d')
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.clearRect(0, 0, canvas.width, canvas.height)
        // แกน x,y
        // context.beginPath()
        // context.strokeStyle = "#FF0000"
        // context.moveTo(0,0)
        // context.lineTo(400,400)
        // context.stroke()
        
        setAxis(context)
        
        // window แสดงผล
        setWindow(context)
    }

    useEffect(() => {
        setCanvasPoints(props.points)
        console.log(canvasPoints)
        const canvas = canvasRef.current
        resetCanvas(canvas)
        
        
        drawclipping(canvas)
        draw(canvas)
        
    },[updateP])

    function handleClickClear(){
        setClear(!clear)
    }

    return (
        <div>
            <button onClick={toggleE}>show</button>
            <button onClick={handleClickClear}>Clear</button>
            <canvas ref={canvasRef} {...props}/>
        </div>
    )
}
export default Canvas
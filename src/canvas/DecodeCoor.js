import React from 'react'

export function decodeCoor(points){
    let SPoint = []
    for(let i = 0 ; i < points.length ; i++){
        SPoint[i] = points[i]
        SPoint[i].x *= 10 
        SPoint[i].x += 200 
        SPoint[i].y *= -10 
        SPoint[i].y += 200
    }
    // console.log(SPoint)
    return SPoint
}

export function encodeCoor(points){
    let SPoint = []
    for(let i = 0 ; i < points.length ; i++){
        SPoint[i] = points[i]
        SPoint[i].x -= 200 
        SPoint[i].x /= 10 
        SPoint[i].y -= 200 
        SPoint[i].y /= -10
    }
    // console.log(SPoint)
    return SPoint
}

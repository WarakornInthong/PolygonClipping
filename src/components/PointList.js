import React from 'react'
import Point from './Point'

const PointList = ( {points, removePoint} ) => {


    return (
        <ul>
            {points.map( point => (
                <Point key={point.id} point={point} removePoint={removePoint} />
            ))}
        </ul>
    )
}

export default PointList;
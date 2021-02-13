import React from 'react'

const Point = ( { point, removePoint } ) =>{

    function handleClickRemove() {
        removePoint(point.id)
    }

    return (
        <div style={{ display: 'flex'}}>
            <li>
               {point.x},{point.y} 
            </li>
            <button onClick={handleClickRemove}>X</button>
        </div>
    )
}

export default Point
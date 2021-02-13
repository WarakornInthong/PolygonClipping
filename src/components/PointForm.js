import React, { useState } from 'react'

const PointForm = ( { addPoint } ) => {

    const [point, setPoint] = useState({
        id :"",
        x  :"",
        y  :"",
    })

    function handleInputPointX(e){
        setPoint({...point, x: e.target.value})
    }

    function handleInputPointY(e){
        setPoint({...point, y: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(point.x && point.y){
            addPoint({...point, id: e.timeStamp})

            setPoint({ ...point, x : "", y : ""})
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <input 
                    name='x'
                    placeholder='input x'
                    type='number'
                    value={point.x}
                    onChange={handleInputPointX} />
                <input 
                    name='y'
                    placeholder='input y'
                    type='number'
                    value={point.y}
                    onChange={handleInputPointY} />
                <button type='submit'>Add</button>
            </form>
        </div>
    )
}

export default PointForm;
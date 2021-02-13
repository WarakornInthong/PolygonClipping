
import './App.css';
import { useEffect, useState } from 'react';
import PointForm from './components/PointForm'
import PointList from './components/PointList'
import Canvas from './canvas/Canvas'
import PolygonClipping from "./canvas/PolygonClipping";


function App() {

  const [points, setPoints] = useState([])

  const [cpoints, setCPoints] = useState([])

  const LOCAL_STORAGE_KEY = "react-todo-list-todos";

  
  useEffect(() => {
    const storagePoints = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storagePoints){
      setPoints(storagePoints)
    }
  },[])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(points))
  },[points])

  function addPoint(point) {
    setPoints([...points, point])
  }

  function removePoint(id){
    // เอาทุกตัวที่เป็นจริง เป็นการตัด array
    setPoints(points.filter(point => point.id !== id))
  }

  function saveCPoints(cPoints){
    setCPoints(cPoints)
    console.log(cPoints)
  }


  return (
    <div >
      <h1 style={{
        marginTop: 15,
        marginLeft: 40
      }}>CG Lab 2</h1>
      <div style={{display: 'flex'}}>
        <div>
          <PointForm addPoint={addPoint} />
          <PointList points={points} removePoint={removePoint} />
          {/* <button onClick={handleClickClipping} >clipping</button> */}
          <PolygonClipping pointList={points} saveCPoints={saveCPoints} />
          {/* <PointForm addPoint={addPoint} /> */}
          <PointList points={cpoints} removePoint={removePoint} />
        </div>
        <Canvas width="400" height="400" points={points} cpoints={cpoints} />
      </div>
    </div>
  )
}

export default App;

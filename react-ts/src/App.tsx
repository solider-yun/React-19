import { EventHandler, useEffect, useState } from 'react'
import { Apple } from './components/Apple'

const homeStyle = {
  width:'1000px',
  height:'800px'
}

interface dragDrop {
  startP?:[number,number]
  currentP?:[number,number]
}

const testSet = [
  [0,1,2,3,4,5,6,7,8,9],
  [10,11,12,13,14,15,16,17,18,19],
  [20,21,22,23,24,25,26,27,28,29],
  [30,31,32,33,34,35,36,37,38,39]
]

function App() {
  const [drag, setDrag] = useState<dragDrop>();
  const [isDown, setIsDown] = useState(false);
  const [target, setTarget] = useState<Array<Array<number>>>(testSet);

  const handleMouseDown:React.MouseEventHandler<HTMLDivElement> = (event) => {
    console.log('on:',event)
    setDrag({startP:[event.clientX,event.clientY]})
    setIsDown(true)
    return null;
  }

  const handleMouseUp:React.MouseEventHandler<HTMLDivElement>  = (event) => {
    console.log('leave:',event)
    setDrag({})
    setIsDown(false)
  }

  const hanldeMouseMove:React.MouseEventHandler<HTMLDivElement> = (event) => {
    setDrag({...drag,currentP:[event.clientX,event.clientY]})
  }

  useEffect(() => {
      

  },[])

  return (
    <div style={homeStyle} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={hanldeMouseMove}>
    {/* {
      target?.map((v,row) => {
        return (<div style={{
          display:'flex',
        }}>{
        v.map((number,column) => {
          return <Apple key={`${row}_${column}`}  text={number}/>
        })}
        </div>)
      })
    } */}
   {drag && <div style={{
      position:'relative',
      top:`${drag?.startP?.[0]}`,
      left:`${drag?.startP?.[1]}`,
      width:`${drag?.currentP?.[0]}`,
      height:`${drag?.currentP?.[1]}`,
      backgroundColor:'blue'
    }}></div>}
    </div>https://oliveyoung.tech/2023-10-20/mouse/
  )
}

export default App

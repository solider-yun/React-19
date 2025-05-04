import { useEffect, useState } from "react"
import { Apple } from "./components/Apple";


const Container:React.CSSProperties = {
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  position:'relative',
  padding:'30px',
  width:"calc(100vw - 60px)",
  height:'calc(100vh - 60px)',
}

const BoxCss:React.CSSProperties = {
  position:'absolute',
  width:'10px',
  height:'10px',
  background:'blue',
  transformOrigin:'left top'
}

const itemInit = [
  [0,1,2,3,4,5,6,7,8,9],
  // [0,1,2,3,4,5,6,7,8,9],
  // [0,1,2,3,4,5,6,7,8,9],
  // [0,1,2,3,4,5,6,7,8,9],
]

function App() {
  const [target,setTarget] = useState(itemInit);
  const [clickPoint,setclickPoint] = useState<{startX?:number,startY?:number}>();
  const [dragPoint,setdragPoint] = useState<{dragX?:number,dragY?:number}>();
  const startX = clickPoint?.startX ?? 0;
  const startY = clickPoint?.startY ?? 0;
  const dragX = dragPoint?.dragX ?? 0;
  const dragY = dragPoint?.dragY ?? 0;

  const widthCul = (dragX !== 0) && dragX > startX ? Math.abs(startX - dragX) : 0
  const heightCul = dragY !== 0 && dragY > startY ?Math.abs(startY - dragY) : 0

  const MouseDownEventHandler = (ev: MouseEvent) => {
    setclickPoint({startX:ev.pageX,startY:ev.pageY})
    console.log('start:',ev.pageX,ev.pageY)
  }

  const MouseDragEventHandler = (ev: MouseEvent) => {
    if(startX && startX !== 0 && startY && startY !== 0){
      setdragPoint({dragX:ev.pageX,dragY:ev.pageY})
    }
  }

  const MouseUpEventHandler = () => {
    console.log('end:',dragPoint)
    setclickPoint({startX:0,startY:0})
    setdragPoint({dragX:0,dragY:0})
  }


useEffect(() => {
  window.addEventListener('mousedown',MouseDownEventHandler)
  window.addEventListener('mousemove',MouseDragEventHandler)
  window.addEventListener('mouseup',MouseUpEventHandler)

  return () => {
    window.removeEventListener('mousedown',MouseDownEventHandler);
    window.removeEventListener('mousemove',MouseDragEventHandler);
    window.removeEventListener('mouseup',MouseUpEventHandler);
  }
},[MouseDownEventHandler,MouseDragEventHandler,MouseUpEventHandler])
  
  return (
    <div style={Container}>

      {target.map((r) => {
        return r.map((c,ci) => <Apple key={`${r}_${ci}`} text={c}/>) 
      })}

      <div style={{...BoxCss,
  left:startX,
  top:startY,
  width:  widthCul,
  height: heightCul
  }}>
      </div>
    </div>
  )
}

export default App

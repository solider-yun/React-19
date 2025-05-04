import { useEffect, useState } from "react"


const Container:React.CSSProperties = {
  position:'relative',
  width:"100vw",
  height:'100vh',
}

const BoxCss:React.CSSProperties = {
  position:'absolute',
  width:'10px',
  height:'10px',
  background:'blue',
  transformOrigin:'left top'
}



function App() {
  const [clickPoint,setclickPoint] = useState<{startX?:number,startY?:number}>();
  const [dragPoint,setdragPoint] = useState<{dragX?:number,dragY?:number}>();
  const startX = clickPoint?.startX ?? 0;
  const startY = clickPoint?.startY ?? 0;
  const dragX = dragPoint?.dragX ?? 0;
  const dragY = dragPoint?.dragY ?? 0;

  const widthCul = dragX !== 0 ? Math.abs(startX - dragX) : 0
  const heightCul = dragY !== 0 ? Math.abs(startY - dragY) : 0

  const MouseDownEventHandler = (ev: MouseEvent) => {
    setclickPoint({startX:ev.pageX,startY:ev.pageY})
    console.log(clickPoint)
  }

  const MouseDragEventHandler = (ev: MouseEvent) => {
    if(startX && startX !== 0 && startY && startY !== 0){
      console.log(startX,startY)
      setdragPoint({dragX:ev.pageX,dragY:ev.pageY})
    }
  }

  const MouseUpEventHandler = () => {
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

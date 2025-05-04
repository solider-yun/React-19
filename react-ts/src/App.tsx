import { createContext, useEffect, useState } from "react"
import { Apple } from "./components/Apple";
import { LocateContext, MouseSumContext } from "./context/locateContext";

function getWeightedRandom() {
  const weighted = [
    1, 1, 1, 2,     // 1 더 많이 등장
    2, 2, 2, 3,     // 2 더 많이 등장
    3, 3, 3, 4,     // 3 더 많이 등장
    4, 5, 6, 7, 8, 9  // 나머지 숫자
  ];
  const index = Math.floor(Math.random() * weighted.length);
  return weighted[index];
}

const Container:React.CSSProperties = {
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  position:'relative',
  padding:'30px',
  gap:2,
 width:'1000px',
 height:'400px'
}

const BoxCss:React.CSSProperties = {
  position:'absolute',
  width:'10px',
  height:'10px',
  border:'2px solid grey',
  transformOrigin:'left top',
  opacity:0.6
}

const itemInit =  Array.from({ length: 16 }, () =>
  Array.from({ length: 10 }, () => getWeightedRandom())
);


function App() {
  const [getXY,setGetXY] = useState({startX:0,startY:0,dragX:0,dragY:0})
  const [cursor,setCursor] = useState<boolean>(false);
  const [isSum,setIsSum] = useState(0);

  const startX = getXY?.startX ?? 0;
  const startY = getXY?.startY ?? 0;
  const dragX = getXY?.dragX ?? 0;
  const dragY = getXY?.dragY ?? 0;

  const widthCul = (dragX !== 0) && dragX > startX ? Math.abs(startX - dragX) : 0
  const heightCul = dragY !== 0 && dragY > startY ?Math.abs(startY - dragY) : 0

  const MouseDownEventHandler = (ev: MouseEvent) => {
    setCursor(true);
    setGetXY({...getXY,startX:ev.pageX,startY:ev.pageY,})
  }

  const MouseDragEventHandler = (ev: MouseEvent) => {
    if(startX && startX !== 0 && startY && startY !== 0){
      setGetXY({...getXY,dragX:ev.pageX,dragY:ev.pageY})
    }
  }

  const MouseUpEventHandler = () => {
    setCursor(false);
    setGetXY({startX:0,startY:0,dragX:0,dragY:0});
  }

  const isHoverSum = (point:number) => {
    setIsSum(isSum + point)
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
    <MouseSumContext.Provider value={{mouseDown:cursor,sum:isSum}}>
      <LocateContext.Provider value={getXY}>
        <div style={Container}>
            {itemInit.map((r) => {
              return r.map((c,ci) => <Apple key={`${r}_${ci}`} text={c} sumFunc={isHoverSum}/>) 
            })}
            <div style={{...BoxCss,
            left:startX,
            top:startY,
            width:  widthCul,
            height: heightCul
            }}>
            </div>
        </div>
      </LocateContext.Provider>
    </MouseSumContext.Provider>
  )
}

export default App

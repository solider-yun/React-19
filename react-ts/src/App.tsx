import { useActionState, useContext, useEffect, useReducer, useState } from "react"
import { Apple } from "./components/Apple";
import { CounterContext, CounterDispatchContext, ActionType, countReducer, LocateContext } from "./context/locateContext";

function getWeightedRandom() {
  const weighted = [
    1, 1, 1, 2,     
    2, 2, 2, 3,     
    3, 3, 3, 4,     
    4, 5, 6, 7, 8, 9  
  ];
  const index = Math.floor(Math.random() * weighted.length);
  return weighted[index];
}
const BodyContainer:React.CSSProperties = {
  width:'100vw',
  height:'100vh',
  backgroundColor:'#FFF5A5'
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
  border:'2px solid blue',
  transformOrigin:'left top',
  opacity:0.6
}

const itemInit =  Array.from({ length: 16 }, () =>
  Array.from({ length: 10 }, () => getWeightedRandom())
);


function App() {
  const [getXY,setGetXY] = useState({startX:0,startY:0,dragX:0,dragY:0})
  const [removeItem,setRemoveItem] = useState<string[]>([]);
  const [counter, dispatch] = useReducer(countReducer,{mouseDown:false, sum:0,id:[]})

  const startX = getXY?.startX ?? 0;
  const startY = getXY?.startY ?? 0;
  const dragX = getXY?.dragX ?? 0;
  const dragY = getXY?.dragY ?? 0;

  const widthCul = (dragX !== 0) && dragX > startX ? Math.abs(startX - dragX) : 0
  const heightCul = (dragY !== 0) && dragY > startY ?Math.abs(startY - dragY) : 0

  const MouseDownEventHandler = (ev: MouseEvent) => {
    dispatch({type:ActionType.MOUSE_DOWN})
    setGetXY({...getXY,startX:ev.pageX,startY:ev.pageY,})
  }

  const MouseDragEventHandler = (ev: MouseEvent) => {
    if(startX && startX !== 0 && startY && startY !== 0){
      setGetXY({...getXY,dragX:ev.pageX,dragY:ev.pageY})
    }
  }

  const MouseUpEventHandler = () => {
    dispatch({type:ActionType.MOUSE_UP})
    setGetXY({startX:0,startY:0,dragX:0,dragY:0});
    if(counter.sum === 10){
      setRemoveItem([...removeItem,...counter.id])
    }
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
    <div style={BodyContainer}>
    <CounterContext.Provider value={counter}>
      <CounterDispatchContext.Provider value={dispatch}>
        <LocateContext.Provider value={getXY}>
        <div style={Container}>
            {itemInit.map((r,ri) => {
              return r.map((c,ci) => {
                const isShow = !removeItem.includes(`${ri}_${ci}`)
              return <Apple key={`${ri}_${ci}`} id={`${ri}_${ci}`} show={isShow} text={c}/>
            }) 
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
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
    </div>
  )
}

export default App

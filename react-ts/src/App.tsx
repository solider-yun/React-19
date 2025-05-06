import { useReducer, useState } from "react"
import { Apple } from "./components/Apple";
import { CounterContext, CounterDispatchContext, counterReducer, LocateContext } from "./context";
import { itemInit } from "./util";
import { CoordinateType } from "./context/type";
import DragBox from "./components/DragBox";

const BodyContainerCSS:React.CSSProperties = {
  width:'100vw',
  height:'100vh',
  backgroundColor:'#FFF5A5'
}

const ContainerCSS:React.CSSProperties = {
  display:'flex',
  flexDirection:'row',
  flexWrap:'wrap',
  position:'relative',
  padding:'30px',
  gap:2,
 width:'1000px',
 height:'400px'
}



function App() {
  const [coordinate,setCoordinate] = useState<CoordinateType>({startX:0,startY:0,dragX:0,dragY:0})
  const [removeItem,setRemoveItem] = useState<string[]>([]);
  const [counter, dispatch] = useReducer(counterReducer,{mouseDown:false, sum:0,id:[]})
  const counterRe = {value: counter, dispatch:dispatch}
  const removeSt = {value:removeItem, setState:setRemoveItem}
  const coordinateSt = {value:coordinate,setState:setCoordinate}


  return (
    <div style={BodyContainerCSS}>
    <CounterContext.Provider value={counter}>
      <CounterDispatchContext.Provider value={dispatch}>
        <LocateContext.Provider value={coordinate}>
        <div style={ContainerCSS}>
            {itemInit.map((r,ri) => {
              return r.map((c,ci) => {
                const isShow = !removeItem.includes(`${ri}_${ci}`)
              return <Apple key={`${ri}_${ci}`} id={`${ri}_${ci}`} show={isShow} text={c}/>
            }) 
            })}
        </div>
          <DragBox removeSt={removeSt} coordinateSt={coordinateSt} counterRe={counterRe}/>
        </LocateContext.Provider>
      </CounterDispatchContext.Provider>
    </CounterContext.Provider>
    </div>
  )
}

export default App

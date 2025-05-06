import { useEffect } from "react";
import { Action, ActionType, CoordinateType, CounterType } from "../context/type";
import React from "react";

const DragBoxCSS:React.CSSProperties = {
  position:'absolute',
  width:'10px',
  height:'10px',
  border:'2px solid blue',
  transformOrigin:'left top',
  opacity:0.6
}

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface DragBoxProps{
    removeSt: {
        value: string[];
        setState:SetState<string[]>;
    },
    coordinateSt: {
        value: CoordinateType;
        setState: SetState<CoordinateType>;
    },
    counterRe: {
        value: CounterType;
        dispatch: React.ActionDispatch<[action: Action]>;
    }
}

const DragBox:React.FC<DragBoxProps> = (props) => {
  const {removeSt,coordinateSt,counterRe} = props;

  const startX = coordinateSt.value?.startX ?? 0;
  const startY = coordinateSt.value?.startY ?? 0;
  const dragX = coordinateSt.value?.dragX ?? 0;
  const dragY = coordinateSt.value?.dragY ?? 0;

  const widthCul = (dragX !== 0) && dragX > startX ? Math.abs(startX - dragX) : 0
  const heightCul = (dragY !== 0) && dragY > startY ?Math.abs(startY - dragY) : 0

  const MouseDownEventHandler = (ev: MouseEvent) => {
    counterRe.dispatch({type:ActionType.MOUSE_DOWN})
    coordinateSt.setState({...coordinateSt.value,startX:ev.pageX,startY:ev.pageY,})
  }

  const MouseDragEventHandler = (ev: MouseEvent) => {
    if(startX && startX !== 0 && startY && startY !== 0){
      coordinateSt.setState({...coordinateSt.value,dragX:ev.pageX,dragY:ev.pageY})
    }
  }

  const MouseUpEventHandler = () => {
    counterRe.dispatch({type:ActionType.MOUSE_UP})
    coordinateSt.setState({startX:0,startY:0,dragX:0,dragY:0});
    if(counterRe.value.sum === 10){
        removeSt.setState([...removeSt.value,...counterRe.value.id])
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
        <div style={{...DragBoxCSS,
            left:startX,
            top:startY,
            width:  widthCul,
            height: heightCul
            }}>
        </div>)
}

export default DragBox;
import { useContext, useEffect, useRef, useState } from "react";
import { ActionType, LocateContext, useCounterDispatch, useCountState } from "../context/locateContext";

const AppleStyle = {
    height:38,
    width:38,
    margin:'5px',
    borderRadius:20,
    color: "white",
    transition: 'opacity 0.2s ease-in-out',
  };

const TextStyle:React.CSSProperties = {
    width:'100%',
    height:'100%',
    fontSize:25,
    fontWeight:700,
    textAlign:'center',
    userSelect:'none',
}

export const Apple = ({text,id, show, ...rest}:{text:number,id:string,show:boolean}) => {
    const ref = useRef<HTMLDivElement>(null);
    // const [show,setShow] = useState(true);
    const [selected,setSelected] = useState(false);
    const locatContext = useContext(LocateContext);
    const countState = useCountState();
    const countDispatch = useCounterDispatch();

    const topX = ref.current?.offsetLeft ?? 0
    const topY = ref.current?.offsetTop ?? 0
    const elementRight = topX + 38
    const elementBottom = topY + 38
    const startX = locatContext?.startX ?? 0
    const startY = locatContext?.startY ?? 0
    const dragX = locatContext?.dragX ?? 0
    const dragY = locatContext?.dragY ?? 0
    const isHovered = topX < dragX && topY < dragY && elementRight > startX && elementBottom > startY

    useEffect(() => {
        if(isHovered){
            countDispatch({type:ActionType.ADD_ITEM,payload:{item:text,id}})
        }else{
            countDispatch({type:ActionType.DEL_ITEM,payload:{item:text,id}})
        }
    },[isHovered])


    return (
      <div ref={ref} style={{...AppleStyle,opacity: show ? 1 : 0, backgroundColor:isHovered ? 'orange' : 'red'}} {...rest}>
        <div style={TextStyle}>{text}</div>
    </div>)
}
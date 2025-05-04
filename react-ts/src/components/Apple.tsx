import { useContext, useEffect, useRef, useState } from "react";
import { LocateContext, MouseSumContext } from "../context/locateContext";

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
//25씩 더해야함
export const Apple = ({text,sumFunc, ...rest}:{text:number,sumFunc:(x:number) => void}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [show,setShow] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const mouseSum = useContext(MouseSumContext)

    useEffect(() => {
        if(!mouseSum?.mouseDown && isHover){
            sumFunc(text);
        }
    },[mouseSum?.mouseDown,isHover])

    return (
       <LocateContext.Consumer>{(contextValue) => {
        const topX = ref.current?.offsetLeft ?? 0
        const topY = ref.current?.offsetTop ?? 0
        const elementRight = topX + 38
        const elementBottom = topY + 38
        const startX = contextValue?.startX ?? 0
        const startY = contextValue?.startY ?? 0
        const dragX = contextValue?.dragX ?? 0
        const dragY = contextValue?.dragY ?? 0
        
        if(mouseSum?.mouseDown && topX < dragX && topY < dragY && elementRight > startX && elementBottom > startY){
            setIsHover(true);
        }else{
            setIsHover(false);
        }
           
       return <div ref={ref} style={{...AppleStyle,opacity: show ? 1 : 0, backgroundColor:isHover ? 'orange' : 'red'}} {...rest}>
        <div style={TextStyle}>{text}</div>
    </div>}}
    </LocateContext.Consumer>)
}
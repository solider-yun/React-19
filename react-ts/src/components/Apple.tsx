import { useEffect, useRef } from "react";

const AppleStyle = {
    height:50,
    width:50,
    borderRadius:20,
    color: "white",
    background: "red",
  };

const TextStyle:React.CSSProperties = {
    width:'100%',
    height:'100%',
    fontSize:25,
    fontWeight:700,
    textAlign:'center',
    userSelect:'none'
}
//25씩 더해야함
export const Apple = ({text, ...rest}:{text:number}) => {

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        console.log(`locate X= ${ref.current?.offsetLeft}, Y= ${ref.current?.offsetTop}`)
    },[ref])


    return <div ref={ref} style={AppleStyle} {...rest}>
        <div style={TextStyle}>{text}</div>
    </div>
}
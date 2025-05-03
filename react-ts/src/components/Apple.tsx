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

export const Apple = ({text,key, ...rest}:{text:number,key:string}) => {


    return <div style={AppleStyle} key={key} {...rest}>
        <div style={TextStyle}>{text}</div>
    </div>
}
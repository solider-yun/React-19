const ContainerCSS: React.CSSProperties = {
  position: "fixed",
  width: "100vw",
  height: "10%",
  bottom: 0,
  left: 0,
  zIndex: -1,
};

const GroundCSS: React.CSSProperties = {
  width: "100%",
  height: "100%",
  backgroundColor: "#5EA152",
};

const Ground = (param: { trigger: boolean }) => {
  const { trigger } = param;

  return (
    <div style={ContainerCSS}>
      <div style={GroundCSS}></div>
    </div>
  );
};

export default Ground;

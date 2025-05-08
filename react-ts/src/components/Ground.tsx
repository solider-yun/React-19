const ContainerCSS: React.CSSProperties = {
  position: "fixed",
  width: "100vw",
  height: "100vw",
  top: 0,
  left: 0,
  zIndex: -1,
};
const GroundCSS: React.CSSProperties = {
  width: "100vw",
  height: "30%",
  backgroundColor: "",
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

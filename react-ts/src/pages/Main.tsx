import { useState } from "react";
import Meteor from "../components/MeteorSky";
import Ground from "../components/Ground";

const ContainerCSS: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};

const Main = () => {
  const [run, setRun] = useState(false);
  const handleRun = () => {
    setRun(!run);
  };

  return (
    <>
      <div style={ContainerCSS}>
        <button onClick={handleRun}>run</button>
      </div>
      <Meteor trigger={run} />
      <Ground trigger={run} />
    </>
  );
};

export default Main;

import { useState } from "react";
import Meteor from "../components/Meteor";

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
    <div style={ContainerCSS}>
      <Meteor trigger={run} />
      <button onClick={handleRun}>run</button>
    </div>
  );
};

export default Main;

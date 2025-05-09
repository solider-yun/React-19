import { useState } from "react";
import Meteor from "../components/MeteorSky";
import Ground from "../components/Ground";
import Container from "../components/Container";

const Main = () => {
  const [run, setRun] = useState(false);
  const handleRun = () => {
    setRun(!run);
  };

  return (
    <Container trigger={run}>
      <div>
        
      </div>
    </Container>
  );
};

export default Main;

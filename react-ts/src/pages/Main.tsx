import { useState } from "react";
import Meteor from "../components/MeteorSky";
import Ground from "../components/Ground";
import Container from "../components/Container";
import Typography from "../components/Typography";
import Button from "../components/Button";

const Main = () => {
  const [run, setRun] = useState(false);

  return (
    <Container trigger={run}>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography variant="h1">Applecalypse</Typography>
        <Typography variant="body">Apple + Apocalypse</Typography>
        <div style={{ height: "70px" }}></div>
        <Button variant="secondary">Drop the Apple!</Button>
      </div>
    </Container>
  );
};

export default Main;

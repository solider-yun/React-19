import { useEffect, useState } from "react";
import Container from "../../components/Container";
import Typography from "../../components/Typography";
import Button from "../../components/Button";
import HowToPlay from "./Practice";

const Main = () => {
  const [next, setNext] = useState(false);

  const handleNext = () => setNext(true);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!next && (
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
          <Button variant="danger" onClick={handleNext}>
            Drop the Apple!
          </Button>
        </div>
      )}
      {next && <HowToPlay />}
    </div>
  );
};

export default Main;

import { useEffect, useState } from "react";
import Typography from "../../components/Typography";
import Game from "../Game";
import Button from "../../components/Button";
import { useNavigate } from "react-router";

const HowToPlay = () => {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  const handleStartBtn = () => navigate("/game");

  useEffect(() => {
    const timer = setTimeout(() => {
      setReady(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
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
      <Typography variant="h1">Practice</Typography>
      <div
        style={{
          width: "400px",
          height: "400px",
          border: "1px solid #dc2626",
          borderRadius: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Game isPractice={true} />
      </div>
      <Typography variant="body">
        Click and drag to select apples — try to make the total add up to 10!
      </Typography>
      <Button
        style={{ zIndex: 4, opacity: ready ? 1 : 0, transition: "all 0.3s" }}
        onClick={handleStartBtn}
      >
        Start!
      </Button>
    </div>
  );
};

export default HowToPlay;

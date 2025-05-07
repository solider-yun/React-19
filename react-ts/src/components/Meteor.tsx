import { useEffect, useState } from "react";
import { AppleImg } from "../assets";
import getRandomPosition from "../util/randomPosition";

const ContainerCSS: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};

const MeteorBallCSS: React.CSSProperties = {
  display: "block",
  position: "fixed",
  zIndex: 99,
  width: "30px",
  height: "30px",
  backgroundImage: `url(${AppleImg})`,
  backgroundSize: "30px 30px",
  backgroundPosition: "center",
  transform: "rotate(30deg)",
};

const Meteor = (param: { trigger: boolean }) => {
  const { trigger } = param;
  const [run, setRun] = useState<boolean | null>(null);
  const points = getRandomPosition();

  useEffect(() => {
    if (run == null) {
      setRun(false);
    } else {
      setRun(true);
      const timeOutId = setTimeout(() => {
        setRun(false);
      }, 5000);
      return () => clearTimeout(timeOutId);
    }
  }, [trigger, setRun]);

  return (
    <div style={ContainerCSS}>
      {points.map((v, idx) => {
        return (
          <div
            key={idx}
            style={{
              ...MeteorBallCSS,
              transition: run ? "all 5s" : "none",
              top: run ? `calc(100% + ${v.x}px)` : `-${v.x}px`,
              right: run ? `calc(100% + ${v.y}px)` : `-${v.y}px`,
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default Meteor;

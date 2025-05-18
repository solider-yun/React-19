import { useEffect, useState } from "react";
import { MeteorApple } from "../assets";
import getRandomPosition from "../util/randomPosition";

const ContainerCSS: React.CSSProperties = {
  position: "fixed",
  width: "100vw",
  height: "100vw",
  top: 0,
  left: 0,
  zIndex: -1,
};

const NightSkyCSS = {
  zIndex: -5,
  width: "100%",
  height: "70%",
  background:
    "linear-gradient(180deg,rgba(9, 9, 121, 1) 0%, rgba(0, 212, 255, 0) 100%)",
  transition: "all 0.3s",
};

const MeteorBallCSS: React.CSSProperties = {
  display: "block",
  position: "fixed",
  width: "90px",
  height: "90px",
  backgroundImage: `url(${MeteorApple})`,
  backgroundSize: "90px 90px",
  backgroundPosition: "center",
  transform: "rotate(30deg)",
};

const MeteorSky = (param: { trigger: boolean }) => {
  const { trigger } = param;
  const [run, setRun] = useState<boolean | null>(null);
  //useMemo로 getRandomPosition을 캐싱할 경우 랜덤값이 이상한 값으로 고정된다
  const points = getRandomPosition();

  useEffect(() => {
    if (run == null) {
      setRun(false);
    } else {
      setRun(true);
      const timeOutId = setTimeout(() => {
        setRun(false);
      }, 4000);
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
              transition: run ? "all 8s" : "none",
              top: run ? `calc(100% + ${v.x}px)` : `-${v.x}px`,
              right: run ? `calc(100% + ${v.y}px)` : `-${v.y}px`,
            }}
          ></div>
        );
      })}
      <div style={{ ...NightSkyCSS, opacity: run ? 1 : 0 }}></div>
    </div>
  );
};

export default MeteorSky;

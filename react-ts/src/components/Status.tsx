import { useEffect } from "react";
import { useTimer } from "../hook/useTimer";

const ContainerCSS = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "60px",
};

interface StatusProps {
  point: number;
  startTimer: boolean;
}

const Status: React.FC<StatusProps> = (props) => {
  const { startTimer, point } = props;
  const { seconds, start, pause } = useTimer();

  const isZero = seconds > 100;

  useEffect(() => {
    if (startTimer) start();
    if (startTimer && isZero) {
      pause();
    }
  }, [startTimer, start, pause]);

  return (
    <div style={ContainerCSS}>
      <div
        style={{
          display: "flex",
          gap: "5px",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          height: "20px",
          padding: "5px 20px",
        }}
      >
        <i />
        <div
          style={{
            width: isZero
              ? "100%"
              : `calc(100% - ${seconds < 98 ? seconds : 98}%)`,
            backgroundColor: isZero ? "red" : "orange",
            borderRadius: "5px",
            textAlign: "end",
            lineHeight: "18px",
            padding: "0 5px",
            transition: "all 0.3s",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "18px" }}>
            {isZero ? "Time Over" : 100 - seconds}
          </span>
        </div>
      </div>
      <div
        style={{
          width: "20%",
          height: "30px",
          paddingRight: "20px",
          lineHeight: "30px",
        }}
      >
        <span style={{ fontSize: "20px", fontWeight: 600 }}>
          Score: {point}
        </span>
      </div>
    </div>
  );
};

export default Status;

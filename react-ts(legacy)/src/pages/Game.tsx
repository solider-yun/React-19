import { useState, useReducer, useEffect, useRef } from "react";
import { Apple } from "../components/Apple";
import DragBox from "../components/DragBox";
import { DragBoxContextType } from "../context/type";
import { counterReducer } from "../reducer/counterReducer";
import { itemInit } from "../util/itemInit";
import {
  CounterContext,
  CounterDispatchContext,
  DragAreaContext,
} from "../context/gameContext";
import Container from "../components/Container";
import Status from "../components/Status";
import calculateMaxApples from "../util/calMaxApple";
import { useMediaContextState } from "../hook/useMediaContext";
import { throttle } from "lodash";

interface Props {
  isPractice?: boolean;
}

const ContainerCSS: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  position: "relative",
  padding: "10px 30px",
  gap: 2,
  width: "calc(100% - 60px)",
  height: "calc(100% - 156px)",
};

const PracticeCSS: React.CSSProperties = {
  display: "grid",
  justifyItems: "center",
  alignItems: "center",
  gridTemplateColumns: "repeat(8,1fr)",
  width: "400px",
  height: "400px",
};

const CoordinateInit = {
  startX: 0,
  startY: 0,
  dragX: 0,
  dragY: 0,
};

const CounterInit = {
  sum: 0,
  id: [],
};

const Game: React.FC<Props> = (props) => {
  const { isPractice } = props;
  const media = useMediaContextState();
  const [coordinate, setCoordinate] =
    useState<DragBoxContextType>(CoordinateInit);

  const [effect, setEffect] = useState<{
    trigger: boolean;
    type: number | null;
  }>({ trigger: false, type: null });
  const [initApple, setInitApple] = useState<number[][] | null>(null);
  const [removeItem, setRemoveItem] = useState<string[]>([]);
  const [counter, dispatch] = useReducer(counterReducer, CounterInit);

  const onDragAreaChange = throttle(
    (
      props: null | {
        top: number;
        left: number;
        width: number;
        height: number;
      }
    ) => {
      if (props) {
        setCoordinate({
          startX: props.left,
          startY: props.top,
          dragX: props.left + props.width,
          dragY: props.top + props.height,
        });
        console.log(props);
      } else {
        setCoordinate(CoordinateInit);
      }
    },
    100
  );

  // const handleMeteor = (point: number) => {
  //   setEffect({ trigger: !effect.trigger, type: point });
  // };

  //for practice page
  useEffect(() => {
    if (media && !isPractice) {
      const width = media.width ?? 0;
      const height = media.height ?? 0;
      const calMaxApple = calculateMaxApples(width, height);
      if (calMaxApple.cols > 0 && !initApple) {
        const init = itemInit({
          cols: calMaxApple.cols,
          rows: calMaxApple.rows,
        });
        setInitApple(init);
      }
    } else {
      setInitApple(
        itemInit({
          cols: 8,
          rows: 8,
        })
      );
    }
  }, [media, itemInit, setInitApple, calculateMaxApples]);

  return (
    <Container
      trigger={effect.trigger}
      type={effect.type}
      isPractice={isPractice}
    >
      <CounterContext.Provider value={counter}>
        <CounterDispatchContext.Provider value={dispatch}>
          {!isPractice && (
            <Status startTimer={true} point={removeItem.length ?? 0} />
          )}
          <DragAreaContext.Provider value={coordinate}>
            <div style={isPractice ? PracticeCSS : ContainerCSS}>
              {initApple &&
                initApple.map((r, ri) => {
                  return r.map((c, ci) => {
                    const isShow = !removeItem.includes(`${ri}_${ci}`);
                    return (
                      <Apple
                        key={`${ri}_${ci}`}
                        dragBoxArea={coordinate}
                        id={`${ri}_${ci}`}
                        show={isShow}
                        num={c}
                      />
                    );
                  });
                })}
            </div>
            <DragBox onDragAreaChange={onDragAreaChange} />
          </DragAreaContext.Provider>
        </CounterDispatchContext.Provider>
      </CounterContext.Provider>
    </Container>
  );
};

export default Game;

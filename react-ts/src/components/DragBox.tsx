import { useEffect } from "react";
import {
  Action,
  ActionType,
  CoordinateType,
  CounterType,
} from "../context/type";
import React from "react";
const DragBoxCSS: React.CSSProperties = {
  position: "absolute",
  width: "10px",
  height: "10px",
  border: "2px solid blue",
  transformOrigin: "left top",
  opacity: 0.6,
};

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface DragBoxProps {
  removeSt: {
    value: string[];
    setState: SetState<string[]>;
  };
  coordinateSt: {
    value: CoordinateType;
    setState: SetState<CoordinateType>;
  };
  counterRe: {
    value: CounterType;
    dispatch: React.ActionDispatch<[action: Action]>;
  };
  meteor: (point: number) => void;
}

const DragBox: React.FC<DragBoxProps> = (props) => {
  const { removeSt, coordinateSt, counterRe, meteor } = props;

  const startX = coordinateSt.value?.startX ?? 0;
  const startY = coordinateSt.value?.startY ?? 0;
  const dragX = coordinateSt.value?.dragX ?? 0;
  const dragY = coordinateSt.value?.dragY ?? 0;

  const widthCul = dragX !== 0 && dragX > startX ? Math.abs(startX - dragX) : 0;
  const heightCul =
    dragY !== 0 && dragY > startY ? Math.abs(startY - dragY) : 0;

  const MouseDownEventHandler = (ev: MouseEvent) => {
    counterRe.dispatch({ type: ActionType.RESET });
    coordinateSt.setState((prev) => ({
      ...prev,
      startX: ev.pageX,
      startY: ev.pageY,
    }));
  };

  const MouseDragEventHandler = (ev: MouseEvent) => {
    if (startX && startX !== 0 && startY && startY !== 0) {
      coordinateSt.setState((prev) => ({
        ...prev,
        dragX: ev.pageX,
        dragY: ev.pageY,
      }));
    }
  };

  const MouseUpEventHandler = () => {
    coordinateSt.setState({ startX: 0, startY: 0, dragX: 0, dragY: 0 });
    if (counterRe.value.sum === 10) {
      removeSt.setState((prev) => [...prev, ...counterRe.value.id]);
      const counterReLng = counterRe.value.id.length;
      if (counterReLng > 2) meteor(counterReLng);
    }
  };

  useEffect(() => {
    window.addEventListener("mousedown", MouseDownEventHandler);
    window.addEventListener("mousemove", MouseDragEventHandler);
    window.addEventListener("mouseup", MouseUpEventHandler);

    return () => {
      window.removeEventListener("mousedown", MouseDownEventHandler);
      window.removeEventListener("mousemove", MouseDragEventHandler);
      window.removeEventListener("mouseup", MouseUpEventHandler);
    };
  }, [MouseDownEventHandler, MouseDragEventHandler, MouseUpEventHandler]);

  return (
    <div
      style={{
        ...DragBoxCSS,
        left: startX,
        top: startY,
        width: widthCul,
        height: heightCul,
      }}
    ></div>
  );
};

export default DragBox;

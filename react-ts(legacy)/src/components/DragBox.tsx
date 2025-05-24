import { useCallback, useContext, useEffect, useRef, useState } from "react";
import React from "react";
import { DragBoxRefContext } from "../context/DragBoxContext";
const DragBoxCSS: React.CSSProperties = {
  position: "absolute",
  width: "10px",
  height: "10px",
  border: "2px solid blue",
  transformOrigin: "left top",
  opacity: 0.6,
};

interface DragBoxProps {
  onDragAreaChange: (
    props: null | {
      top: number;
      left: number;
      width: number;
      height: number;
    }
  ) => void;
}

interface CoordStateInf {
  stX: number;
  stY: number;
}

const initCoord = {
  stX: 0,
  stY: 0,
};

const DragBox: React.FC<DragBoxProps> = (props) => {
  const { onDragAreaChange } = props;
  const dragBoxRef = useRef<HTMLDivElement>(null);
  const [coord, setCoord] = useState<CoordStateInf>(initCoord);
  const dragStateRef = useContext(DragBoxRefContext);

  const MouseDownEventHandler = (ev: MouseEvent) => {
    dragStateRef.current.coordinates = {
      startX: ev.pageX,
      startY: ev.pageY,
      dragX: ev.pageX,
      dragY: ev.pageY,
    };
    dragStateRef.current.dragArea = null;
    dragStateRef.current.subscribers.forEach((cb) => cb());

    if (dragBoxRef.current) {
      const dragBoxStyle = dragBoxRef.current.style;
      dragBoxStyle.display = "block";
      dragBoxStyle.left = `${ev.pageX}px`;
      dragBoxStyle.top = `${ev.pageY}px`;
      dragBoxStyle.width = "0px";
      dragBoxStyle.height = "0px";
      setCoord((x) => ({ ...x, stX: ev.pageX, stY: ev.pageY }));
    }
    // onDragAreaChange(null);
  };

  const MouseDragEventHandler = useCallback(
    (ev: MouseEvent) => {
      if (coord.stX !== 0 && coord.stY !== 0) {
        const currentDragX = ev.pageX;
        const currentDragY = ev.pageY;
        if (dragBoxRef.current) {
          const dragBoxStyle = dragBoxRef.current.style;
          const left = Math.min(coord.stX, currentDragX);
          const top = Math.min(coord.stY, currentDragY);
          const width = Math.abs(coord.stX - currentDragX);
          const height = Math.abs(coord.stY - currentDragY);

          dragBoxStyle.left = `${left}px`;
          dragBoxStyle.top = `${top}px`;
          dragBoxStyle.width = `${width}px`;
          dragBoxStyle.height = `${height}px`;
          // onDragAreaChange({ left, top, width, height });
          dragStateRef.current.coordinates = {
            startX: left,
            startY: top,
            dragX: left + width,
            dragY: top + height,
          };
          dragStateRef.current.dragArea = { left, top, width, height };

          // 3. Ref 구독자들에게 변경 알림 (사과 컴포넌트 등의 업데이트 트리거)
          dragStateRef.current.subscribers.forEach((cb) => cb());
        }
      }
    },
    [dragBoxRef, coord, dragStateRef]
  );

  const MouseUpEventHandler = () => {
    if (dragBoxRef.current) {
      dragBoxRef.current.style.display = "none";
      dragBoxRef.current.style.width = "0px";
      dragBoxRef.current.style.height = "0px";
    }
    // onDragAreaChange(null);
    dragStateRef.current.coordinates = {
      startX: 0,
      startY: 0,
      dragX: 0,
      dragY: 0,
    };
    dragStateRef.current.dragArea = null; // 드래그 영역 초기화
    dragStateRef.current.subscribers.forEach((cb) => cb()); // 구독자들에게 초기화 알림

    setCoord(initCoord);
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
      ref={dragBoxRef}
      style={{
        ...DragBoxCSS,
      }}
    ></div>
  );
};

export default DragBox;

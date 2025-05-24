import { useContext, useEffect, useRef, useState } from "react";
import { DragBoxContextType } from "../context/type";
import { AppleImg, OrangeImg } from "../assets";
import { DragBoxRefContext } from "../context/DragBoxContext";

const AppleStyleCSS = {
  height: 38,
  width: 38,
  margin: "5px",
  borderRadius: 20,
  color: "white",
  backgroundPosition: "center",
  backgroundSize: "37px 37px",
  transition: "opacity 0.2s ease-in-out",
};

const TextStyleCSS: React.CSSProperties = {
  width: "30px",
  height: "30px",
  padding: "4px",
  fontSize: 18,
  fontWeight: 700,
  textAlign: "center",
  userSelect: "none",
  lineHeight: "34px",
};

export const Apple = ({
  dragBoxArea,
  num,
  id,
  show,
  ...rest
}: {
  dragBoxArea: DragBoxContextType;
  num: number;
  id: string;
  show: boolean;
}) => {
  const dragStateRef = useContext(DragBoxRefContext);
  const ref = useRef<HTMLDivElement>(null);
  const [isInDragArea, setIsInDragArea] = useState(false);

  const clientRec = ref.current?.getBoundingClientRect();
  const topX = Math.floor(clientRec?.left ?? 0);
  const topY = Math.floor(clientRec?.top ?? 0);
  const elementRight = topX + 38;
  const elementBottom = topY + 38;

  const itemBgImg = isInDragArea ? `url(${OrangeImg})` : `url(${AppleImg})`;
  const showOp = show ? 1 : 0;
  const appleCssObj = {
    ...AppleStyleCSS,
    opacity: showOp,
    backgroundImage: itemBgImg,
  };

  const updateAppleState = () => {
    const currentDragArea = dragStateRef.current.dragArea;
    if (currentDragArea) {
      const startX = currentDragArea.left;
      const startY = currentDragArea.top;
      const dragX = startX + currentDragArea.width;
      const dragY = startY + currentDragArea.height;
      const isHovered =
        topX < dragX &&
        topY < dragY &&
        elementRight > startX &&
        elementBottom > startY;
      setIsInDragArea(isHovered);
    }
  };

  useEffect(() => {
    dragStateRef.current.subscribers.add(() => updateAppleState());

    return () => {
      dragStateRef.current.subscribers.delete(() => updateAppleState());
    };
  }, [setIsInDragArea, updateAppleState, dragStateRef]);

  useEffect(() => {
    if (show) {
      if (isInDragArea) {
      } else {
      }
    }
  }, [show, isInDragArea]);

  return (
    <div ref={ref} style={appleCssObj} {...rest}>
      <div style={TextStyleCSS}>{num}</div>
    </div>
  );
};

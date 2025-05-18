import { useContext, useEffect, useRef } from "react";
import { useCounterDispatch } from "../hook/useCounterHook";
import { ActionType } from "../context/type";
import { LocateContext } from "../context/gameContext";
import { AppleImg, OrangeImg } from "../assets";

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
  fontSize: 22,
  fontWeight: 700,
  textAlign: "center",
  userSelect: "none",
};

export const Apple = ({
  text,
  id,
  show,
  ...rest
}: {
  text: number;
  id: string;
  show: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const locatContext = useContext(LocateContext);
  const countDispatch = useCounterDispatch();

  const clientRec = ref.current?.getBoundingClientRect();
  const topX = Math.floor(clientRec?.left ?? 0);
  const topY = Math.floor(clientRec?.top ?? 0);
  const elementRight = topX + 38;
  const elementBottom = topY + 38;
  const startX = locatContext?.startX ?? 0;
  const startY = locatContext?.startY ?? 0;
  const dragX = locatContext?.dragX ?? 0;
  const dragY = locatContext?.dragY ?? 0;
  const isHovered =
    topX < dragX &&
    topY < dragY &&
    elementRight > startX &&
    elementBottom > startY;
  const itemBgImg = isHovered ? `url(${OrangeImg})` : `url(${AppleImg})`;
  const showOp = show ? 1 : 0;
  const appleCssObj = {
    ...AppleStyleCSS,
    opacity: showOp,
    backgroundImage: itemBgImg,
  };

  useEffect(() => {
    if (show) {
      if (isHovered) {
        countDispatch({
          type: ActionType.ADD_ITEM,
          payload: { item: text, id },
        });
      } else {
        countDispatch({
          type: ActionType.DEL_ITEM,
          payload: { item: text, id },
        });
      }
    }
  }, [show, isHovered, countDispatch]);

  return (
    <div ref={ref} style={appleCssObj} {...rest}>
      <div style={TextStyleCSS}>{text}</div>
    </div>
  );
};

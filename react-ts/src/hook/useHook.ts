import { useContext } from "react";
import { CounterContext, CounterDispatchContext } from "../context/gameContext";
import { MediaContext, MediaSizeType } from "../context/mediaContext";
import { ScreenSize } from "../util/screenSize";

export const useCounterState = () => {
  const state = useContext(CounterContext);
  if (!state) throw new Error("CounterContext NotFound");
  return state;
};

export const useCounterDispatch = () => {
  const dispatch = useContext(CounterDispatchContext);
  if (!dispatch) throw new Error("CounterDispatch NotFound");
  return dispatch;
};

export const useResizeObserver = (): [ResizeObserver, MediaSizeType] => {
  const state = useContext(MediaContext);
  let deviceWidth = null;
  if (!state) throw new Error("MediaContext NotFound");
  const resizeObj = new ResizeObserver((entries) => {
    for (const entry of entries) {
      if (entry.devicePixelContentBoxSize) {
        const width = entry.devicePixelContentBoxSize[0].inlineSize;
        //lg = 1920, md = 1280, sm=800, xs = 400
        deviceWidth = ScreenSize(width);
        return width;
      }
    }
  });

  return [resizeObj, deviceWidth];
};

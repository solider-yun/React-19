import React, { RefObject, useContext, useEffect, useState } from "react";
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

type MediaSize = {
  width: number | null;
  height: number | null;
  type: MediaSizeType | null;
};

type UseResizeObserverOptions<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T | null>;
};

const initialSize: MediaSize = {
  width: null,
  height: null,
  type: null,
};

export const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  param: UseResizeObserverOptions<T>
): MediaSize => {
  const [size, setSize] = useState<MediaSize>(initialSize);
  const { ref } = param;

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.devicePixelContentBoxSize) {
          const width = entry.devicePixelContentBoxSize[0].inlineSize;
          const height = entry.devicePixelContentBoxSize[0].blockSize;
          setSize({ width, height, type: ScreenSize(width) });
        }
      }
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, setSize]);

  return size;
};

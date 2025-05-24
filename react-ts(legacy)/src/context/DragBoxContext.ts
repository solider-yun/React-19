import React, { createContext } from "react";
import { DragBoxContextType } from "./type";

interface DragStateRef {
  coordinates: DragBoxContextType;
  dragArea: { left: number; top: number; width: number; height: number } | null;
  subscribers: Set<() => void>;
}

const initialDragStateRef: DragStateRef = {
  coordinates: { startX: 0, startY: 0, dragX: 0, dragY: 0 },
  dragArea: null,
  subscribers: new Set(),
};

export const DragBoxRefContext = createContext<React.RefObject<DragStateRef>>(
  React.createRef<DragStateRef>() as React.RefObject<DragStateRef>
);

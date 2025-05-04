import { createContext } from "react";

export const LocateContext = createContext<{startX:number,startY:number,dragX:number,dragY:number} | null>(null);
export const MouseSumContext = createContext<{mouseDown:boolean, sum:number}|null>(null)
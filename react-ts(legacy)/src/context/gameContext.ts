import { createContext, Dispatch } from "react";
import { Action, DragBoxContextType, CounterType } from "./type";

export const DragAreaContext = createContext<DragBoxContextType | null>(null);
export const CounterContext = createContext<CounterType | null>(null);
export const CounterDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

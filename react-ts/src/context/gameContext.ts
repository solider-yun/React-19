import { createContext, Dispatch } from "react";
import { Action, CoordinateType, CounterType } from "./type";

export const LocateContext = createContext<CoordinateType | null>(null);
export const CounterContext = createContext<CounterType | null>(null);
export const CounterDispatchContext = createContext<Dispatch<Action> | null>(
  null
);

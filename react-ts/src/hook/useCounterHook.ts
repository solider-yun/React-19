import { useContext } from "react";
import { CounterContext, CounterDispatchContext } from "../context/gameContext";

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

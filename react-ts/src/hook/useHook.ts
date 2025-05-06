import { useContext } from "react";
import { CounterContext, CounterDispatchContext } from "../context";

export const useCounterState = () => {
    const state = useContext(CounterContext);
    if(!state) throw new Error("CounterContext Notfound")
    return state;
}

export const useCounterDispatch = () => {
    const dispatch = useContext(CounterDispatchContext);
    if(!dispatch) throw new Error("CounterDispatch Notfound");
    return dispatch;
}
import { createContext, Dispatch, useContext } from "react";

export const LocateContext = createContext<{startX:number,startY:number,dragX:number,dragY:number} | null>(null);
export const CounterContext = createContext<CounterType|null>(null)
export const CounterDispatchContext = createContext<Dispatch<Action> | null>(null)

export interface CounterType {mouseDown?:boolean, sum:number, id:string[]}

export enum ActionType {
    ADD_ITEM = 'ADD_ITEM',
    DEL_ITEM = 'DEL_ITEM',
    MOUSE_DOWN = 'MOUSE_DOWN',
    MOUSE_UP = 'MOUSE_UP',
    RESET = 'RESET'
}

export type Action =
  | { type: ActionType.ADD_ITEM; payload: {item:number,id:string} }
  | { type: ActionType.DEL_ITEM; payload: {item:number,id:string} }
  | { type: ActionType.MOUSE_DOWN;}
  | { type: ActionType.MOUSE_UP;}
  | { type: ActionType.RESET };


export const countReducer = (counter:CounterType,action:Action):CounterType => {
    switch(action.type){
        case ActionType.ADD_ITEM:{
            const {item,id:newId} = action.payload
            const sum = counter.sum + item
            const id = counter.id ? [...counter.id,newId] : [newId]
            return {sum,id, mouseDown:counter.mouseDown}
        }
        case ActionType.DEL_ITEM:{
            const {item,id:delId} = action.payload
            const sum = counter.sum - item
            const id = counter.id.filter(x => x !== delId);
            return {sum,id, mouseDown:counter.mouseDown}
        }
        case ActionType.MOUSE_DOWN:{
            return {mouseDown: true, sum:0,id:[]}
        }
        case ActionType.MOUSE_UP:{
            return {mouseDown:false,...counter}
        }
        case ActionType.RESET:{
            return {sum:0, mouseDown:false,id:[]}
        }
        return counter
    }
}

export const useCountState = () => {
    const state = useContext(CounterContext);
    if(!state) throw new Error("CounterContext Notfound")
    return state;
}

export const useCounterDispatch = () => {
    const dispatch = useContext(CounterDispatchContext);
    if(!dispatch) throw new Error("CounterDispatch Notfound");
    return dispatch;
}
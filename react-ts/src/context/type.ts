
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

export interface CoordinateType {startX:number,startY:number,dragX:number,dragY:number}
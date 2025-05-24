export interface CounterType {
  sum: number;
  id: string[];
}

export enum ActionType {
  ADD_ITEM = "ADD_ITEM",
  DEL_ITEM = "DEL_ITEM",
  RESET = "RESET",
}

export type Action =
  | { type: ActionType.ADD_ITEM; payload: { item: number; id: string } }
  | { type: ActionType.DEL_ITEM; payload: { item: number; id: string } }
  | { type: ActionType.RESET };

export interface DragBoxContextType {
  startX: number;
  startY: number;
  dragX: number;
  dragY: number;
}

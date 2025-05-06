import { Action, ActionType, CounterType } from "../context/type";

export const counterReducer = (
  counter: CounterType,
  action: Action
): CounterType => {
  switch (action.type) {
    case ActionType.ADD_ITEM: {
      const { item, id: newId } = action.payload;
      const sum = counter.sum + item;
      const id = counter.id ? [...counter.id, newId] : [newId];
      return { sum, id };
    }
    case ActionType.DEL_ITEM: {
      const { item, id: delId } = action.payload;
      const sum = counter.sum - item;
      const id = counter.id.filter((x) => x !== delId);
      return { sum, id };
    }
    case ActionType.RESET: {
      return { sum: 0, id: [] };
    }
    default:
      return counter;
  }
};

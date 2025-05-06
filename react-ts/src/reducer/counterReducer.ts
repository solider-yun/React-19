import { Action, ActionType, CounterType } from "../context/type"

export const counterReducer = (counter:CounterType,action:Action):CounterType => {
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
        default:
        return counter
    }
}

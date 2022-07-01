import type {Action, BaseState} from 'react-imvc'
import {toDoType} from "./component/TodoList";
/**
 * Model
 */

export type State = {
    todoList: toDoType[],
    content: string,
} & BaseState

export const initialState = {
    todoList: [],
}

/**
 * 在 View 创建前将首屏数据合并到 state 里
 */
export const COMPONENT_WILL_CREATE: Action<State, toDoType[]> = (state, data) => {
    return {
        ...state,
        todoList: data
    }
}

export const ADD_TODO: Action<State, toDoType> = (state, data) => {
    state.todoList.push(data)
    return {
        ...state,
    }
}

export const DELETE_TODO: Action<State, number> = (state, data) => {
    state.todoList = state.todoList.filter((item,idx) => idx !== data)
    return {
     ...state
 }
}

export const CLEAR_TODO: Action<State> = (state) => {
    state.todoList = state.todoList.filter(item => item.finished === 0)
    return {
        ...state
    }
}

export type toggleType = {
    idx: number,
    time: string,
}
export const Toggle_TODO: Action<State, toggleType> = (state, props) => {
    let {idx, time} = props
    let item = state.todoList[idx]
    if(item.finished === 0){
        item.finishedTime = time
        item.finished = 1
    }else {
        item.finished = 0
    }

    return {
        ...state
    }
}



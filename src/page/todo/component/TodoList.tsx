import React, {useEffect, useState} from "react"
import Ctrl from '../Controller'
import * as Console from "console";

export type toDoType = {
    content: string,
    finished: number,
    startTime: string,
    finishedTime?: string,
}

export type toDoProps = {
    list:toDoType[],
    ctrl: Ctrl
}

export default function TodoList(props: toDoProps){
    const { list, ctrl } = props
    return(
        <div className="theList">
            {
                list.map((item, idx) => <ToDo todo={item} ctrl={ctrl} idx={idx} key={item.startTime.concat(item.content)} />)
            }
        </div>
    )
}

export type toDo = {
    todo:toDoType,
    ctrl: Ctrl,
    idx:number,
}

function ToDo(props:toDo){
    const { todo, ctrl, idx } = props
    const [ show, setShow ] = useState<boolean>(false);
    let id = todo.content.concat(todo.startTime);
    useEffect(() => {
    }, [show])

    const handleMouseEnter = () => {
        setShow(true)
    }

    const handleMouseLeave = () => {
        setShow(false)
    }

    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <label htmlFor={id} className={`cb-label ${todo.finished === 1 && "finished"}`}></label>
            <input type="checkbox" id={id} onClick={() => {
                ctrl.handleChecked(idx);
            }}/>
            <div className={`content ${todo.finished === 1 && "finished"}`}>{todo.content}</div>
            <div className="time">
                <span className="startTime">开始时间: {todo.startTime}</span>
                {
                    todo.finished === 1 && <span className="finishedTime">结束时间: {todo.finishedTime}</span>
                }
            </div>
            <div className={`close ${show && "show"}`} onClick={() => ctrl.handleDelete(idx)}>
                ×
            </div>
        </li>
    )
}

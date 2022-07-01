import React, {useEffect, useState} from "react"
import * as Model from './Model'
import Ctrl from './Controller'
import Layout from "../../component/Layout";
import TodoList, {toDoType} from "./component/TodoList";

export type ViewProps = {
    state: Model.State,
    ctrl: Ctrl
}

export default function View({ state, ctrl }: ViewProps){
    const [list, setList] = useState<toDoType[]>(state.todoList);

    const chooseActive = () => {
        setList(state.todoList.filter(item => item.finished === 0));
    }

    const chooseCompleted = () => {
        setList(state.todoList.filter(item => item.finished === 1));
    }

    const chooseAll = () => {
        setList(state.todoList);
    }

    useEffect(() => {
        console.log('list===>', list, state)
        setList(state.todoList);
    }, [state.todoList])

    return(
        <Layout>
            <div className="todoListMain">
                <div className="header">
                    <input
                        onChange={ctrl.handleChange}
                        onKeyDown={ctrl.handleKeyDown}
                        type="text"
                        name="content"
                        placeholder="Add Task"
                    />
                    <button type="submit" onClick={ctrl.handleSubmit}>add</button>
                </div>
                <TodoList list={list} ctrl={ctrl}/>
                <div className="footer">
                    <div className="count">{list.length} item left</div>
                    <div className="operation">
                        <div className="all" onClick={chooseAll}>All</div>
                        <div className="active" onClick={chooseActive}>Active</div>
                        <div className="completed" onClick={chooseCompleted}>Completed</div>
                    </div>
                    <div className="clear" onClick={ctrl.handleClear}>Clear completed</div>
                </div>
            </div>
        </Layout>
    )
}

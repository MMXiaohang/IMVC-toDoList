import Controller from 'react-imvc/controller'
import * as Model from "./Model"
import {ADD_TODO, CLEAR_TODO, Toggle_TODO} from "./Model"
import View from "./View";
import React from "react";
import BaseController from "../../shared/BaseController";
import {Context, Location} from "react-imvc";

type Actions = Omit<typeof Model, 'initialState'>
export default class Todo extends BaseController<Model.State, Actions>{
    pageId = 1000
    keepAlive = true
    Model = Model
    View = View

    constructor(location: Location, context: Context) {
        super(location, context)
    }

    // view 还未被创建和渲染，不存在window对象
    async componentWillCreate(){
        let { COMPONENT_WILL_CREATE } = this.store.actions
        let { todoList } = this.store.getState()
        COMPONENT_WILL_CREATE(todoList)
    }

    async componentDidFirstMount(){
        let todoList = JSON.parse(window.localStorage.getItem('todoList') || '[]')
        console.log('componentDidFirstMount==>', todoList)
        let { COMPONENT_WILL_CREATE } = this.store.actions
        COMPONENT_WILL_CREATE(todoList)
        // let shark = await this.shark.i18n()
        // console.log(shark)
    }

    handleSubmit = async () => {
        let content = this.store.getState().content
        if(content.length === 0) return
        let { ADD_TODO } = this.store.actions
        let time = await this.getTime()
        const todo = {
            content,
            finished: 0,
            startTime: time,
        }
        console.log(todo)
        ADD_TODO (todo)
        window.localStorage.setItem('todoList', JSON.stringify(this.store.getState().todoList))
    }

    handleChange = (e:React.FormEvent<HTMLInputElement>) => {
        this.store.getState().content = (e.target as HTMLInputElement).value
    }

    handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleChecked = async (idx: number) => {
        const { Toggle_TODO } = this.store.actions
        let time = await this.getTime()
        Toggle_TODO({idx, time})
        window.localStorage.setItem('todoList', JSON.stringify(this.store.getState().todoList))
    }

    handleDelete = (idx: number) => {
        const { DELETE_TODO } = this.store.actions
        DELETE_TODO(idx)
        window.localStorage.setItem('todoList', JSON.stringify(this.store.getState().todoList))
    }

    // 清楚所有已经做完的任务
    handleClear = () => {
        const { CLEAR_TODO } = this.store.actions
        CLEAR_TODO()
        window.localStorage.setItem('todoList', JSON.stringify(this.store.getState().todoList))
    }

    // 封装获取时间
    getTime = async () => {
        const params = {
            "head":{
                "lang": "zh-CN"
            },
            "ver": '8.50.0',
            "pageid": 100000,
        }
        let data = await this.post('/getUTCTime', params)
        return data.data.utcTime
    }
}

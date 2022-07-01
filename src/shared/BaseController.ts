import Controller from "react-imvc/controller";
import type { Actions, BaseState, BaseActions } from 'react-imvc'

class BaseController<
    S extends BaseState,
    AS extends Actions<S>
    > extends Controller<S, AS> {
    SSR = true  // 开启服务器端渲染
    preload = {  // 在页面显示前预加载css
        main: "/css/main.css"
    }

    // 生命周期：获取初始化状态
    async getInitialState(initialState: S): Promise<S & BaseState>  {
        let state = await super.getInitialState(initialState)
        // 获取初始状态
        return {
            ...state
        }
    }

    // 封装 get 方法，处理 cnode 跨域要求
    get(
        api: string,
        params?: Record<string, string | number | boolean>,
        options?: RequestInit & {
            raw?: boolean
            json?: boolean
            timeout?: number
            timeoutErrorFormatter?: ((opstion: any) => string) | string
        }
    ) {
        options = {
            ...options,
            credentials: "omit",
            headers: {
                ...(options && options.headers),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        console.log(api, params, options)
        return super.get(api, params, options)
    }

    // 封装 post 方法，处理 cnode 跨域要求
    post(
        api: string,
        data?: any,
        options?: RequestInit & {
            raw?: boolean
            json?: boolean
            timeout?: number
            timeoutErrorFormatter?: ((opstion: any) => string) | string
        }) {
        options = {
            ...options,
            credentials: "omit",
            method: "POST",
            headers: {
                ...(options && options.headers),
            },
            body: JSON.stringify(data)
        }
        return this.fetch(api, options)
    }

    // 统一抛错, get/post 方法底层调用的是 fetch 方法
    async fetch(
        url: string,
        options: RequestInit & {
            raw?: boolean
            json?: boolean
            timeout?: number
            timeoutErrorFormatter?: ((opstion: any) => string) | string
        } = {}
    ) {
        let data = await super.fetch(url, options)
        return data
    }
}

export default BaseController

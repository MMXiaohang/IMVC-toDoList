import BaseController from './BaseController'
import { SharkConfig } from '../../type'
/**
 * Shark 业务逻辑类
 * @see http://git.dev.sh.ctripcorp.com/vacation-infra/react-imvc-starter/blob/release/docs/shared/SharkBusiness.md
 */
type CTX = BaseController<any, any>

export default class SharkBusiness {
  ctx: CTX
  sharkConfig: SharkConfig | SharkConfig[]

  constructor(config: SharkConfig | SharkConfig[], ctx: CTX) {
    this.sharkConfig = config
    this.ctx = ctx
  }

  i18n = () => {
    /**
     * 执行获取国际化翻译请求
     */
    return (
        this.fetchI18n()
            /**
             * 正确获取到数据
             */
            .then(this.updateI18nToState)
            /**
             * 获取失败
             */
            .catch(console.warn)
    )
  }

  /**
   * 获取配置获取国际化翻译请求
   */
  fetchI18n = () => {
    let { ctx, sharkConfig } = this

    let { context } = ctx

    let { basename } = context

    let _type = this.getServerCargoContext()

    let data = {
      sharkConfig,
      ...(_type && { _type }),
    }

    let options = { raw: true }

    return this.ctx.post(`${basename}/shark/i18n`, data, options)
  }

  getServerCargoContext() {
    let { req, isServer } = this.ctx.context || {}

    if (isServer) {
      return req && req.cargoContext.getContextType()
    }
    return
  }

  /**
   * 触发 action 更新翻译数据到全局 state
   */
  updateI18nToState = (i18n: object) => {
    let { UPDATE_STATE_BY_PATH } = this.ctx.store.actions

    let i18nState = getKeys(i18n).reduce((acc, key) => {
      acc[`i18n_${key}`] = i18n[key]

      return acc
    }, {} as Record<string, any>)

    UPDATE_STATE_BY_PATH(i18nState)
  }
}

function getKeys<T extends {}>(o: T): Array<keyof T> {
  return Object.keys(o) as Array<keyof T>
}

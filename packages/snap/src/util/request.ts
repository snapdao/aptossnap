import { defaultConfiguration } from '../configuration/predefined'

export interface RequestConfig {
  host: string
  base: string
  version?: string
  withCredentials?: boolean
  credentials?: 'include' | 'omit' | 'same-origin'
  token?: string
  username?: string
  password?: string
  headers?: Headers
}

export interface RequestOptions extends Request {
  url: string
}

export const baseConfig: RequestConfig = {
  host: defaultConfiguration.rpc.node,
  base: '/v1',
  version: '1.0.1',
  withCredentials: false,
  credentials: 'include',
}

export default class Req {
  config: RequestConfig
  constructor (config: RequestConfig) {
    this.config = Object.assign({}, baseConfig, config)
  }

  request(options: RequestOptions) {
    options.url = `${this.config.host}${this.config.base}${options.url}`
    return global.fetch(options).then(res => res.json())
  }
}

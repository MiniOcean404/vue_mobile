import axios from 'axios'

export function request(config) {
  // 导出封装的方法
  // 创建axios对象并进行配置
  const api = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })
  // 请求拦截器
  api.interceptors.request.use(config => {
    return config
  })
  // 响应拦截器
  api.interceptors.response.use(res => {
    return res
  })

  return api(config)
}

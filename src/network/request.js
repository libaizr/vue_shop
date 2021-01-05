import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://www.liulongbin.top:8888',
    timeout: 6000
  })
  return instance(config)
  // instance.interceptors.request.use((config) => {
  //   return config
  // }, (error) => {
  //   return Promise.reject(error)
  // })

  // instance.interceptors.response.use((response) => {
  //   return response.data
  // }, (error) => {
  //   console.log('拦截器报错');
  //   return Promise.reject(error)
  // })
}
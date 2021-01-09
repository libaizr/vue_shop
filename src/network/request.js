import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://127.0.0.1:8888/api/private/v1',
    timeout: 6000
  })

  instance.interceptors.request.use((config) => {
    console.log(config);
    config.headers.Authorization = sessionStorage.getItem('token')
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  // instance.interceptors.response.use((response) => {
  //   // response.headers.Authorization = sessionStorage.getItem('token')
  //   return response.data
  // }, (error) => {
  //   console.log('拦截器报错');
  //   return Promise.reject(error)
  // })
  return instance(config)
}
import { request } from './request'

export function getData({ username, password }) {
  return request({
    url: '/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}
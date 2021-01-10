import { request } from './request'

export function addUserToData(obj) {
  return request({
    url: '/users',
    method: 'post',
    data: obj
  })
}
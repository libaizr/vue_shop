import { request } from './request'

export function getUsersList(pagenum, pagesize) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      pagenum,
      pagesize
    }
  })
}
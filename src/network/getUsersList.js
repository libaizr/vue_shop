import { request } from './request'

export function getUsersList(query, pagenum, pagesize) {
  return request({
    url: '/users',
    method: 'get',
    params: {
      query,
      pagenum,
      pagesize
    }
  })
}
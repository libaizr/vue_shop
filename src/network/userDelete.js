import { request } from './request'

export function userDelete(uId) {
  return request({
    url: '/users/' + uId,
    method: 'delete',
    params: {
      uId
    }
  })
}
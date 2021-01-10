import { request } from './request'

export function putUserIfon(uId, obj) {
  return request({
    url: '/users/' + uId,
    method: 'put',
    params: {
      uId
    },
    data: obj
  })
}
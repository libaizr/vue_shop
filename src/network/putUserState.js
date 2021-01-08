import { request } from './request'

export function putUserState(uId, type) {
  return request({
    url: '/users/' + uId + '/state/' + type,
    method: 'put',
    params: {
      uId,
      type
    }
  })
}
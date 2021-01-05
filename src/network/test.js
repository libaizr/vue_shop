import { request } from './request'

export function getData() {
  return request({
    url: '/api/private/v1/'
  })
}
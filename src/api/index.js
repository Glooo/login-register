import { request } from './request'

const Base = ''

// 注册，判断用户名重复
const userNameDuplicate = (params) => {
  return request({
    method: 'get',
    url: Base + '/userNameDuplicate',
    params: params
  })
}

export default {
  userNameDuplicate
}

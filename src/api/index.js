import request from '@/api/request'

const Base = ''

// 注册，判断用户名重复
export const userNameDuplicate = (params) => {
  return request({
    method: 'get',
    url: Base + '/userNameDuplicate',
    params: params
  })
}

// 注册
export const register = (params) => {
  return request({
    method: 'post',
    url: Base + '/api/user/re',
    params: params
  })
}

// export default {
//   userNameDuplicate,
//   register
// }

import request from '@/api/request'

const Base = ''

// 注册，判断用户名重复
const userNameDuplicate = (params) => {
  return request({
    method: 'get',
    url: Base + '/userNameDuplicate',
    params: params
  })
}

// 注册
const register = (params) => {
  return request({
    method: 'post',
    url: Base + '/api/user/re',
    params: [{
      a: 2,
      b: 2
    }]
  })
}

export default {
  userNameDuplicate,
  register
}

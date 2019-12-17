import { format } from 'date-fns'

/**
 * 获取对象里的某一个属性
 * @param {Object} obj
 * @param {String} propStr
 * @example
 */
export const getObjProps = (obj, propStr) => {
  if (!obj) {
    return undefined
  }
  propStr = propStr.trim()
  let len = propStr.length
  let pointIndex = propStr.indexOf('.')
  if (pointIndex === -1) {
    if (obj.hasOwnProperty(propStr)) {
      return obj[propStr]
    } else {
      return undefined
    }
  }
  if (pointIndex === 0 || pointIndex === len) {
    return undefined
  }
  let key = propStr.substr(0, pointIndex)
  let props = propStr.substr(pointIndex + 1, len)
  if (key in obj) {
    return getObjProps(obj[key], props)
  } else {
    return undefined
  }
}

/**
 * 判断数据类型
 * @param {is[type](v)}
 */

export const is = {
  array: v => Object.prototype.toString.call(v) === '[object Array]',
  object: v => Object.prototype.toString.call(v) === '[object Object]',
  string: v => Object.prototype.toString.call(v) === '[object String]',
  date: v => Object.prototype.toString.call(v) === '[object Date]',
  number: v => Object.prototype.toString.call(v) === '[object Number]',
  func: v => Object.prototype.toString.call(v) === '[object Function]',
  reg: v => Object.prototype.toString.call(v) === '[object RegExp]',
  boolean: v => Object.prototype.toString.call(v) === '[object Boolean]',
  null: v => Object.prototype.toString.call(v) === '[object Null]',
  undef: v => Object.prototype.toString.call(v) === '[object Undefined]'
}
// 字符串真实长度
export const _strRealLength = str => {
  let realLength = 0
  const len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
  }
  return realLength
}

/**
 * js截取字符串，中英文都能用
 * @param str：需要截取的字符串
 * @param len: 需要截取的长度
 */
export const _cutStr = (str, len, isEllips) => {
  let strLength = 0
  const strLen = str.length
  let strCut = ''
  for (let i = 0; i < strLen; i++) {
    const a = str.charAt(i)
    strLength++
    if (escape(a).length > 4) {
      // 中文字符的长度经编码之后大于4
      strLength++
    }
    strCut = strCut.concat(a)
    if (strLength >= len) {
      if (isEllips) return strCut + '...'
      return strCut
    }
  }
}

// 判断两个对象值是否相等
export const isObjectEqual = (obj1, obj2) => {
  let aProps = Object.getOwnPropertyNames(obj1)
  let bProps = Object.getOwnPropertyNames(obj2)
  if (aProps.length !== bProps.length) {
    return false
  }
  for (var i = 0; i < aProps.length; i++) {
    let propName = aProps[i]
    if (obj1[propName] !== obj2[propName]) {
      return false
    }
  }
  return true
}

/**
 * 小数加、减、乘、除 保留精度计算
 * @param {Number} value
 * @param {Number} decimals
 * for example
 * precisionRound(0.1 + 0.2, 2) 返回结果0.3
 */
export const precisionRound = (value, decimals) => {
  return Number(`${Math.round(`${value}e${decimals}`)}e-${decimals}`)
}

// 深复制
export const deepCopy = obj => {
  let newobj
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    newobj = []
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    newobj = {}
  } else {
    newobj = obj
  }

  if (typeof obj !== 'object') {
    return
  }

  for (var key in obj) {
    newobj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
  }
  return newobj
}

export const dateFormat = function (
  timestamp,
  formatter = 'YYYY-MM-DD HH:mm:ss'
) {
  return format(timestamp * 1000, formatter)
}

// 多维数组转一维数组
export const toOneArray = arr => {
  return arr.reduce((res, current) => {
    return is.array(current)
      ? [...res, ...toOneArray(current)]
      : [...res, current]
  }, [])
}
// 判断数组对象key是否有相同的value
export const hasSameValue = (arr, key) => {
  let obj = {}
  for (let item of arr) {
    if (item[key]) {
      if (obj[item[key]]) {
        return false
      } else {
        obj[item[key]] = item
      }
    }
  }
  return obj
}
// 防抖函数
export const decounce = (fn, delay) => {
  let timer = null
  return function () {
    const context = this
    let args = arguments
    clearTimeout(timer) // 每次调用debounce函数都会将前一次的timer清空，确保只执行一次
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

export const imgUrlScale = (url, w = 48, h = 48) => {
  const host = 'img.youpin.mi-img.com'
  if (url.indexOf(host) < 0) {
    return url
  }
  try {
    let beforeIndex = url
    const queryIndex = url.indexOf('?')
    const atIndex = url.indexOf('@')
    let index = null
    if (queryIndex > -1 && atIndex > -1) {
      index = queryIndex > atIndex ? atIndex : queryIndex
    } else {
      index = queryIndex > atIndex ? queryIndex : atIndex
    }
    if (index > -1) {
      beforeIndex = url.substring(0, index)
    }

    return `${beforeIndex}@base@tag=imgScale&m=0&w=${w}&h=${h}`
  } catch (error) {
    console.log(error)
    return url
  }
}
// 设置缓存，读取缓存，删除缓存
export const handleLocalStorage = (method, key, value) => {
  switch (method) {
    case 'get' : {
      let temp = window.localStorage.getItem(key)
      if (temp) {
        return temp
      } else {
        return false
      }
    }
    case 'set' : {
      window.localStorage.setItem(key, value)
      break
    }
    case 'remove': {
      window.localStorage.removeItem(key)
      break
    }
    default : {
      return false
    }
  }
}
// 判断时间段重叠方法  时间重叠返回true
export const isOverlap = ([startA, endA], [startB, endB]) => {
  return startA < endB && endA > startB
}

/** 文本复制
 *
 * @param {*} text
 */
export const Copy = (text) => {
  var textArea = document.createElement('textarea')
  textArea.style.width = '0'
  textArea.style.height = '0'
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    let res = document.execCommand('copy')
    document.body.removeChild(textArea)
    return res
  } catch (err) {
    console.warn('复制失败')
    return false
  }
}

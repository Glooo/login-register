// 所有正则

// 判断手机号
export const isTel = /^[1]([3-9])[0-9]{9}$/
// 判断邮箱
export const isMail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
// 判断微信
export const isWX = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
// 判断QQ
export const isQQ = /^[1-9]\d{4,9}$/
// 判断统一社会信用代码 数字或者大写字母18位
export const isCreditCode = /^[0-9A-Z]{18}$/
// 正整数
export const isPositiveInteger = /^[1-9]\d*$/
// 0-100正整数
export const isZeroToHundred = /^(?:[1-9]?\d|100)$/
// 1-100正整数
export const isOneToHundred = /^([1-9]?\d|100)$/
// 最多两位小数
export const isFloat2 = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/
// 身份证正则
export const isID = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
// 港澳通行证
// export const isHKCard = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
export const isHkId = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/
// 香港身份证
export const isHKCard = /^[A-Z]{1,2}[0-9]{6}\([0-9A]\)$/
// 澳门身份证
export const isMacaoCard = /^[157][0-9]{6}\([0-9]\)$/
// 台湾身份证
// export const isTWCard = /^\d{8}|^[a-zA-Z0-9]{10}$|^\d{18}$/
export const isTWCard = /^[A-Z][0-9]{9}$/
// 护照正则
export const isPassPortCard = /^([a-zA-z]|[0-9]){5,17}$/
// 链接正则
/* eslint-disable */
// export const isUrl = /((http|ftp|https|file):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/gi
// export const isUrl = /^((http|ftp|https):\/\/)?[\w-_.]+(\/[\w-_]+)*\/?$/
// export const isUrl = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/
// 没有ftp 支持中文
export const isUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#\u4e00-\u9fa5$]*[\w\-@?^=%&\/~+#\u4e00-\u9fa5$])?$/
// 带有域名限制
export const urlDomainLimit = /^http(s)?:\/\/((\w+\.)+)?((mi.com)|(xiaomi.com)|(xiaomiyoupin.com))(((\/)|(\?)|(#))[\w ~!@#$%\\ ^&*/|,.<>?"'();:_+-=[\]{}]*)?$/

// 品牌专用 放宽标准
export const brandUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+.*$/
// 邀请码正则
export const isInviteCode = /^([A-Z]|[\d+]){8}$/
// 中文英文姓名校验
export const isName = /^[\u4e00-\u9fa5]|[a-zA-Z]{2,20}$/
// 英文名字校验
export const isEnglish = /^[A-Za-z]+\s{0,1}[A-Za-z]+$/

export const isNumber = /^\d+(\.\d+)?$/
// 中文符号 匹配这些中文标点符号 。 ？ ！ ， 、 ； ： “ ” ‘ ' （ ） 《 》 〈 〉 【 】 『 』 「 」 ﹃ ﹄ 〔 〕 … — ～ ﹏ ￥
export const isChsymbol = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
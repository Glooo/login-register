import { saveAs } from 'file-saver'
import { _strRealLength, _cutStr } from './index.js'
import store from '@/store'

export const merchantMixin = {
  directives: {
    // 适配element自动获取焦点,仅适合单个输入框的情况下使用
    focus: {
      inserted: (el, { value }) => {
        el.querySelector('input').focus()
      },
      update: (el, { value }) => {
        el.querySelector('input').focus()
      }
    },
    permission: {
      inserted(el, binding, vnode) {
        let permissionList = []
        store.state.menuList.map(item => {
          if (item.resourceType === 'event') {
            permissionList.push(item.resourceUrl)
          }
        })
        if (!permissionList.includes(binding.value)) {
          el.style.display = 'none'
        } else {
          el.style.display = ''
        }
      },
      update(el, binding, vnode) {
        let permissionList = []
        store.state.menuList.map(item => {
          if (item.resourceType === 'event') {
            permissionList.push(item.resourceUrl)
          }
        })
        if (!permissionList.includes(binding.value)) {
          el.style.display = 'none'
        } else {
          el.style.display = ''
        }
      }
    },
    'filter-query': {
      update: (el, binding) => {
        const ev = new Event('input', { 'bubbles': true, 'cancelable': false })
        const elInput = el.querySelector('input')
        const val = elInput.value
        let queryWord = 'spmref'
        if (!val) return
        if (binding && binding.value) {
          queryWord = binding.value
        }
        try {
          let url = new URL(val)
          let params = url.searchParams
          params.delete(queryWord)
          elInput.value = url.toString()
          elInput.dispatchEvent(ev)
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  methods: {
    /** 图片上传前，校验
     * @param { Object } option
     * @param {Number} option.size 图片大小，默认：1,计算规则 size * 1000 KB，比如size=0.01，图片的大小为 10kb
     * @param {Number} option.width 图片宽度 默认：800
     * @param {Number} option.height 图片高度 默认：800
     * @param {String} option.support 支持文件的格式 以 , 隔开,如: 'jpg,png'
     * @param {Boolean} option.isExceed 上传图片的实际尺寸 是否必须大于等于 传入的尺寸,默认 false,必须等于，true，必须大于等于
     */
    beforeImageUpload(option) {
      let defaultObj = {
        size: 1,
        width: 800,
        height: 800,
        support: '',
        isExceed: false
      }
      const { size, width, height, support, isExceed } = Object.assign(defaultObj, option)
      return file => {
        let type = file.type.split('/')[1]
        let isSupport = support.indexOf(type) > -1
        if (!isSupport) { // 不支持
          this.$message.error(`上传图片只支持 ${support} 格式!`)
          return false
        }
        const isLimitSize = file.size / 1024 / 1024 < size
        if (!isLimitSize) {
          this.$message.error(`上传图片大小不能超过 ${size * 1000} KB!`)
          return false
        }
        const isSize = new Promise((resolve, reject) => {
          let _URL = window.URL || window.webkitURL
          let img = new Image()
          img.onload = () => {
            if (isExceed) {
              let valid = img.width >= width && img.height >= height
              valid ? resolve(img) : reject(new Error('error'))
            } else {
              let valid = img.width === width && img.height === height
              valid ? resolve(img) : reject(new Error('error'))
            }
          }
          img.src = _URL.createObjectURL(file)
        }).then(
          async() => {
            return file
          },
          e => {
            isExceed
              ? this.$message.error(`图片尺寸必须是${width}px * ${height}px以上!`)
              : this.$message.error(`图片尺寸必须是${width}px * ${height}px!`)
            return Promise.reject(e)
          }
        )

        return isSupport && isLimitSize && isSize
      }
    },
    /**
   * 截取字符串-字符串长度
   * @param {ruleForm} obj 代表整个表单的外城key
   * @param {ruleForm} ref 表单的ref 获取dom
   * @param {key} key 具体截取哪一个字段
   * @param {len} len 截取多少字数
   */
    _limitLen(obj = 'ruleForm', ref = 'ruleForm', key, len) {
      // console.log(obj, ref, key, len)
      let keyVal = this[obj][key]
      let valLen = keyVal.length
      if (valLen > len) {
        this.$nextTick(() => {
          this.$refs[ref].validateField([key])
          this[obj][key] = keyVal.slice(0, len)
        })
      }
    },
    /**
     * 截取字符串-字节长度
     * @param {ruleForm} obj 代表整个表单的外城key
     * @param {ruleForm} ref 表单的ref 获取dom
     * @param {key} key 具体截取哪一个字段
     * @param {len} len 截取多少字数
    */
    _limitRealLen(obj = 'ruleForm', ref = 'ruleForm', key, len) {
      // console.log(obj, ref, key, len)
      let keyVal = this[obj][key]
      let valLen = _strRealLength(keyVal)
      if (valLen > len * 2) {
        this.$nextTick(() => {
          this.$refs[ref].validateField([key])
          this[obj][key] = _cutStr(keyVal, len * 2)
        })
      }
    },
    strRealLength(val) {
      return _strRealLength(val)
    },
    /**
     *
     * @param {array} attr 需要排序的数据源
     * @param {string} rev key值，根据哪个key进行排序
     */
    _sortBy(attr, rev) {
      if (rev === undefined) {
        rev = 1
      } else {
        rev = rev ? 1 : -1
      }
      return (a, b) => {
        a = a[attr]
        b = b[attr]
        if (a < b) {
          return rev * -1
        }
        if (a > b) {
          return rev * 1
        }
        return 0
      }
    },

    // 时间转时间戳
    _dateToDateTime(strtime) {
      if (strtime.indexOf('T') !== -1 || strtime.indexOf('Z') !== -1) {
        return new Date(strtime).getTime()
      }
      return new Date(strtime.replace(/-/g, '/')).getTime()
    },
    // 下载文件, 兼容IE
    /**
     * 下载
     * @param  {String} url 目标文件地址
     * @param  {String} filename 想要保存的文件名称
     */
    downloadFile(url, filename) {
      saveAs(url, filename)
      // const isSupportDownload = 'download' in document.createElement('a')
    }
  }
}

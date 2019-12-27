<template>
  <div class="wrap" :style="wrapRotate">
    <div class="main">
      <h2>注册</h2>
      <div id="tag" class="tag" @click="telRegister()">
        {{tagName}}
      </div>
        <!-- <div class="triangle"></div> -->
        <!-- <div class="triangle2"></div> -->
      <el-form :model="form" :rules="rules" ref="form">
        <div v-if="!isTelRe">
          <div>
            <el-radio-group v-model="form.type">
              <el-radio :label="1" style="color:#F7F7F7">我是学生</el-radio>
              <el-radio :label="0" style="color:#F7F7F7">我是老师</el-radio>
            </el-radio-group>
          </div>
          <el-form-item class="formItem" prop="username">
            昵称：
            <el-input
              placeholder="输入一个可爱的用户名吧"
              v-model="form.username"
              size="small"
              clearable
              style="width:200px;">
            </el-input>
          </el-form-item>
          <el-form-item class="formItem" prop="pwd1">
            密码：
            <el-input
              placeholder="设置你的密码"
              v-model="form.pwd1"
              size="small"
              show-password
              style="width:200px;">
            </el-input>
          </el-form-item>
          <el-form-item class="formItem" prop="pwd2">
            确认：
            <el-input
              placeholder="再次确认你的密码"
              v-model="form.pwd2"
              size="small"
              show-password
              style="width:200px;">
            </el-input>
          </el-form-item>

        </div>
        <div v-if="isTelRe">
          <!-- 手机号注册 -->
           <div>
            <el-radio-group v-model="form.type">
              <el-radio :label="1" style="color:#F7F7F7">我是学生</el-radio>
              <el-radio :label="0" style="color:#F7F7F7">我是老师</el-radio>
            </el-radio-group>
          </div>
          <el-form-item class="formItem" prop="tel">
            <el-button size="middle" style="background: rgba(0,0,0,0);border:none;width:90px;padding:10px;color:white;font-size:18px;">手机号：</el-button>
            <el-input
              placeholder="输入您的手机号"
              v-model="form.tel"
              size="medium"
              clearable
              style="width:200px;">
            </el-input>
          </el-form-item>
          <div class="formItem">

          </div>
          <el-form-item class="formItem" prop="code">
            <el-button size="middle" style="width:90px;padding:10px;color:#409EFF;">获取验证码</el-button>
            <el-input
              placeholder="输入收到的验证码"
              v-model="form.code"
              size="medium"
              clearable
              style="width:200px;">
            </el-input>
          </el-form-item>
        </div>
        <el-form-item class="submitBt">
          <el-button plain type="primary" @click="submitForm('form')">注册</el-button>
          <el-button plain type="info" @click="resetForm('form')">重置</el-button>
        </el-form-item>
        <div class="login" @click="login()">已有账号?去登录</div>
      </el-form>

    </div>

    <div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { register } from '@/api/index'
import { isTel } from '@/common/reg'
const USER_REGISTER = '账号密码注册'
const TELE_REGISTER = '手机号注册'
export default {
  data () {
    return {
      // 绑定style
      isRotate: false,
      // 是否为手机号注册
      isTelRe: true,
      // 右上角tag名称
      tagName: TELE_REGISTER,
      form: {
        username: '',
        pwd1: '',
        pwd2: '',
        type: 1,
        tel: ''
      },
      rules: {
        username: [{required: true, message: '请输入username', trigger: 'blur'},
          { min: 8,
            max: 16,
            message: '长度在8~16之间', /* trigger: 'blur' */
            trigger: ['change', 'blur']
          }],
        pwd1: [{required: true, message: '请设置您的密码', trigger: 'blur'},
          {min: 6, max: 20, message: `长度在6～20之间`, trigger: ['change', 'blur']}],
        pwd2: [{required: true, message: '请再次输入密码', trigger: 'blur'},
          {min: 6, max: 20, message: `长度在6～20之间`, trigger: ['change', 'blur']}],
        tel: [{trigger: 'blur', validator: this.validatorTel}]

        // rules的格式
        //  name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }, { min: 0, max: 50, message: '长度在 0到 50 个字符', trigger: 'change' }],

      }
    }
  },
  computed: {
    wrapRotate () {
      if (this.isRotate) { return `transform: rotateY(0deg);transition: all 0.5s ease-in;` } else { return `transform: rotateY(90deg) rotateX(-180deg);transition: all 0.5s ease-out;` }
    }

  },
  mounted () {
    let thisVue = this
    setTimeout(function () {
      thisVue.isRotate = true
    }, 10)
  },
  methods: {
    validatorTel (rule, value, callback) {
      let reg = isTel
      if (value.length && reg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号'))
      }
    },
    // tag按钮事件-手机号注册
    telRegister () {
      if (!this.isTelRe) {
        this.isTelRe = true
        this.tagName = USER_REGISTER
      } else {
        this.isTelRe = false
        this.tagName = TELE_REGISTER
      }
    },
    async submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        // if (valid) {
        let params = {a: 1, b: 2}
        let data = register(params)
        console.log(data)
        // } else {
        //   this.$message.warning({ message: `请检查必填项OwO～`, center: true })
        //   return false
        // }
      })
      // post写法

      axios.post('/api/user/re', {a: 2, b: 2})
        .then((res) => { return res })
        .catch((err) => { return err })

      // axios({
      //   method: 'get',
      //   url: 'http://10.231.92.5:3000/api/user',
      //   headers: 'application/x-www-form-urlencoded; charset=utf-8',
      //   data: JSON.stringify({
      //     username: '234234',
      //     password: '4565'
      //   })
      // }).then((res) => {
      //   console.log(res.data)
      // })
    },
    resetForm (formName) {
      this.form.username = ''
      this.form.pwd1 = ''
      this.form.pwd2 = ''
      this.$refs[formName].resetFields()
    },
    login () {
      let thisVue = this
      this.isRotate = false
      setTimeout(function () {
        thisVue.$router.push('/login')
        this.isRotate = false
      }, 500)
    }

  }
}
</script>
<style lang="less">
.formItem {
  height: 55px;
  .el-form-item__error {
    color: #F56C6C;
    font-size: 4px;
    line-height: 1;
    position: relative!important;
    top: 0;
    padding: 0!important;
  }
}
</style>
<style lang="less" scoped>
// 把input框内文字变红的代码，加入/deep/ (两边有空格)
// .el-input--small /deep/ .el-input__inner {
//   color: red;
// }
.el-form-item {
  margin-bottom: 0px !important;
}

.wrap{
  height: 100vh;
  .main {
    height: 400px;
    width: 400px;
    background: rgba(100, 179, 179, 0.6);
    border-radius: 5px;
    position: relative;
    top: 10%;
    margin: auto;
    padding: 10px;
    color: #F7F7F7;
    overflow: hidden;
    .tag {
      height: 40px;
      width: 150px;
      background: rgba(0, 139, 182, 0.5);
      position: absolute;
      top: 0;
      right: 0;
      transform-origin: left 100%;
      transform: translate(29.29%,-100%) rotate(45deg);
      // 文字
      font-size: 14px;
      line-height: 40px;
      color: #F7F7F7;
      font-weight: 900;
      cursor: pointer;
      // 用户不可选中
      user-select: none;
    }
    // .triangle {
    //   height: 0px;
    //   width: 0px;
    //   border-top: 50px solid black;
    //   border-right: 50px solid black;
    //   border-bottom: 50px solid transparent;
    //   border-left: 50px solid transparent;
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    // }
    // .triangle2 {
    //   height: 0px;
    //   width: 0px;
    //   border-top: 30px solid rgba(100, 179, 179, 0.6);
    //   border-right: 30px solid rgba(100, 179, 179, 0.6);
    //   border-bottom: 30px solid transparent;
    //   border-left: 30px solid transparent;
    //   position: absolute;
    //   top: 0;
    //   right: 0;
    // }
    .submitBt {
      width: 100%;
      margin-top: 10px;
    }
    .login {
      position: relative;
      top: 10px;
      left: 15%;
      font-size: 10px;
      color: rgb(0, 119, 238);
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      z-index: 999;
    }
    .login:hover {
      color: #FFF;
      transition: all 0.2s;
    }
  }
}
.test {
  height: 100px;
  width: 200px;
  background: rgb(255, 255, 255);
}
.point {
  height: 1px;
  width: 1px;
  float: left;
}
.wenzi {
  position: absolute;
  margin: 0 auto;
  // font-weight: 900;
  font-size: 60px;
}
i::selection {
  background: rgba(0, 0, 0, 1) !important;
}
</style>

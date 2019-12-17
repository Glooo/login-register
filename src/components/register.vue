<template>
  <div class="wrap" :style="wrapRotate">
    <div class="main">
      <h2>注册</h2>
      <div id="tag" class="tag" @click="telRegister()">
        {{tagName}}
      </div>
      <!-- <div class="triangle">
      </div> -->
      <!-- <div class="triangle2">
      </div> -->
      <div v-if="!isTelRe">
        <div>
          <el-radio-group v-model="form.type">
            <el-radio :label="1" style="color:#F7F7F7">我是学生</el-radio>
            <el-radio :label="0" style="color:#F7F7F7">我是老师</el-radio>
          </el-radio-group>
        </div>
        <div style="margin-top:5px;">
          昵称：
          <el-input
            placeholder="输入一个可爱的用户名吧"
            v-model="form.username"
            size="small"
            clearable
            style="width:200px;">
          </el-input>
        </div>
        <div style="margin-top:5px;">
          密码：
          <el-input
            placeholder="设置你的密码"
            v-model="form.pwd1"
            size="small"
            show-password
            style="width:200px;">
          </el-input>
        </div>
        <div style="margin-top:5px;">
          确认：
          <el-input
            placeholder="再次确认你的密码"
            v-model="form.pwd2"
            size="small"
            show-password
            style="width:200px;">
          </el-input>
        </div>

      </div>
      <div v-if="isTelRe">
        手机号注册
      </div>
      <div class="submitBt">
        <el-button plain type="primary" @click="register()">注册</el-button>
        <el-button plain type="info" @click="reset()">重置</el-button>
      </div>
      <div class="login" @click="login()">已有账号?去登录</div>
    </div>

    <div>
    </div>
  </div>
</template>
<script>
const USER_REGISTER = '账号密码注册'
const TELE_REGISTER = '手机号注册'
export default {
  data () {
    return {
      // 绑定style
      isRotate: false,
      // 是否为手机号注册
      isTelRe: false,
      // 右上角tag名称
      tagName: TELE_REGISTER,
      form: {
        username: '',
        pwd1: '',
        pwd2: '',
        type: 1
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
    register () {

    },
    reset () {
      this.form.username = ''
      this.form.pwd1 = ''
      this.form.pwd2 = ''
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

<style lang="less" scoped>
// 把input框内文字变红的代码，加入/deep/ (两边有空格)
// .el-input--small /deep/ .el-input__inner {
//   color: red;
// }

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
</style>

<template>
  <div class="main" :style="mainRotate">
    <h2>登录</h2>
    <div class="form">
      <div>
        账号：
        <el-input
          placeholder="UserName"
          v-model="form.username"
          size="small"
          clearable
          style="width:200px;"
          @blur="judgeExist()"
          @focus="getFocus(1)">
        </el-input>
        <div class="error">*{{username_error}}</div>
      </div>
      <div style="margin-top:5px;">
        密码：
        <el-input
          placeholder="Password"
          v-model="form.pwd"
          size="small"
          show-password
          style="width:200px;"
          @keyup.enter.native="enterUp()"
          @focus="getFocus(0)">
        </el-input>
        <div class="error">*{{password_error}}</div>
      </div>
    </div>
    <div class="submitBt">
      <el-button plain type="primary" @click="login()">登录</el-button>
      <el-button plain type="info" @click="reset()">重置</el-button>
    </div>
    <div class="register" @click="register()">还没有账号？点击这里注册哦～</div>
    <bango-cat></bango-cat>

  </div>
</template>
<script>
import bangoCat from '@/components/bongo-cat/bangoCat'
export default {
  data () {
    return {
      // 绑定style
      isRotate: false,

      form: {
        username: '',
        pwd: ''
      },
      username_error: `账号不存在`,
      password_error: `密码错误`
      // username_error: ``,
      // password_error: ``
    }
  },
  components: {
    bangoCat
  },
  mounted () {
    let thisVue = this
    setTimeout(function () {
      thisVue.isRotate = true
    }, 10)
  },
  computed: {
    mainRotate () {
      if (this.isRotate) { return `transform: rotateY(0deg);transition: all 0.5s ease-in;` } else { return `transform: rotateY(90deg) rotateX(-180deg);transition: all 0.5s ease-out;` }
    }
  },
  methods: {
    getFocus (flag) {
      if (flag === 1) {
        console.log(`userName获得焦点`)
      } else {
        console.log(`password获得焦点`)
      }
    },
    // 账号输入框失去焦点时判断存在与否
    async judgeExist () {
      console.log('userName失去焦点')
    },
    async enterUp () {
      console.log('Enter Up')
      await this.login()
    },
    async login () {
      // await
      // this.$router.push('/register')
    },
    reset () {
      this.form.username = ''
      this.form.pwd = ''
    },
    register () {
      let thisVue = this
      this.isRotate = false
      setTimeout(function () {
        thisVue.$router.push('/register')
        thisVue.isRotate = true
      }, 500)
    }

  }
}
</script>
<style lang="less" scoped>

.main {
  height: 400px;
  width: 400px;
  // background: rgba(179, 179, 179, 0.6);
  background: rgba(235, 228, 218,0.6);
  border-radius: 5px;
  position: relative;
  left: 50%;
  margin-left: -200px;
  margin-top: 10%;
  color: #F7F7F7;
  overflow: hidden;
  // 旋转卡片
  // transform: rotateX(20deg) rotateY(0deg);
  .form {
    padding: 0 20px;
    // 输入错误提示语
    .error {
      width: 66px;
      text-align: left;
      display: inline-block;
      color: rgb(172, 0, 149);
      font-size: 8px;
    }
  }
  .submitBt {
    // width: 100%;
    margin-top: 20px;
    // padding:0 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register {
    position: relative;
    top: 10px;
    left: 15%;
    font-size: 10px;
    color: #409EFF;
    text-decoration: none;
    transition: all 0.2s;
    cursor: pointer;
    z-index: 999;
  }
  .register:hover {
    color: #FFF;
    transition: all 0.2s;
  }
}
</style>

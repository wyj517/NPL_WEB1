<template>
  <div class="login-container">
    <div style="width: 59%">

    </div>
    <div class="right" style="width: 41%">
      <el-tabs v-model="activeName" style="width: 50%" :stretch="true">
        <el-tab-pane label="账号密码登录" name="first" style="margin-top: 8px" >
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <el-form-item prop="username">
              <div>
                <span class="account">账号</span>
              </div>
              <el-input
                ref="username"
                v-model="loginForm.username"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                class="up_input"
              />
            </el-form-item>

            <el-form-item prop="password">
              <div>
                <span class="password">密码</span>
              </div>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
                class="up_input"
              />
            </el-form-item>
            <el-checkbox  class="rememberMe" :fill="fill">记住密码</el-checkbox>
            <el-button
              :loading="loading"
              type="primary"
              style="width: 100%; margin-top: 20px;background: #00C5A5;border-color: #00C5A5;"
              @click.native.prevent="handleLogin"
            >登录
            </el-button>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="二维码登录" name="second">
          <div style="height: 310px">
            施工中
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', message: '用户名不能为空' }
        ],
        password: [
          { required: true, trigger: 'blur', message: '密码不能为空' }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      activeName: 'first',
      fill:'#00C5A5'
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<!--<style lang="scss">-->
<!--/* 修复input 背景不协调 和光标变色 */-->
<!--/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */-->

<!--$bg: #283443;-->
<!--$light_gray: #fff;-->
<!--$cursor: #fff;-->

<!--@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {-->
<!--  .login-container .el-input input {-->
<!--    color: $cursor;-->
<!--  }-->
<!--}-->

<!--/* reset element-ui css */-->
<!--.login-container {-->
<!--  .el-input {-->
<!--    display: inline-block;-->
<!--    height: 47px;-->
<!--    width: 85%;-->

<!--    input {-->
<!--      background: transparent;-->
<!--      border: 0px;-->
<!--      -webkit-appearance: none;-->
<!--      border-radius: 0px;-->
<!--      padding: 12px 5px 12px 15px;-->
<!--      color: $light_gray;-->
<!--      height: 47px;-->
<!--      caret-color: $cursor;-->

<!--      &:-webkit-autofill {-->
<!--        box-shadow: 0 0 0px 1000px $bg inset !important;-->
<!--        -webkit-text-fill-color: $cursor !important;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .el-form-item {-->
<!--    border: 1px solid rgba(255, 255, 255, 0.1);-->
<!--    background: rgba(0, 0, 0, 0.1);-->
<!--    border-radius: 5px;-->
<!--    color: #454545;-->
<!--  }-->
<!--}-->
<!--</style>-->

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  margin: 0px;
  background: url("../../assets/login.png") fixed no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: row;
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  ::v-deep .el-tabs__nav{
    display: flex;
    justify-content: space-between;
  }
  ::v-deep .el-tabs__item{
    font-weight: 400;
    color: #607C85;
  }
  ::v-deep .el-tabs__item.is-active{
    font-weight: 800;
    color: #333333;
  }
  ::v-deep .el-tabs__active-bar{
    background-color:#19BC9C ;
    height: 4px;
  }
  .rememberMe{
    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
      background:#00C5A5;
    }
    ::v-deep .el-checkbox__input.is-checked.el-checkbox__label{
      background-color: black;
    }
  }
  ::v-deep .el-checkbox__label{
    color: black;
  }
  ::v-deep .el-input__inner{
    height: 50px;
    border: 1px solid #06324D;
  }
  .login-form{
    .account{
      display: block;
      background: #fff;
      position: relative;
      left: 40px;
      top: 20px;
      width: 50px;
      z-index: 1000;
      text-align: center;
    }
    .password{
      display: block;
      background: #fff;
      position: relative;
      left: 40px;
      top: 20px;
      width: 50px;
      z-index: 1000;
      text-align: center;
    }
  }
  ::v-deep .el-tabs__nav-wrap .el-tabs__nav-scroll .el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}

::v-deep input:-webkit-autofill { box-shadow: 0 0 0px 1000px #fff inset !important;}
</style>

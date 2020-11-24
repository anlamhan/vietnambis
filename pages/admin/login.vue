<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">Admin Login</h3>
      </div>

      <el-form-item prop="email">
        <i class="icon el-icon-user"></i>
        <el-input
          ref="email"
          v-model="loginForm.email"
          placeholder="UserName"
          name="email"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <i class="icon el-icon-lock"></i>
        <el-input
          ref="password"
          :key="passwordType"
          v-model="loginForm.password"
          :type="passwordType"
          @keyup.enter.native="handleLogin"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span @click="showPwd" class="show-pwd">
          <i
            :class="
              passwordType === 'password' ? 'el-icon-turn-off' : 'el-icon-open'
            "
            class="icon"
          />
        </span>
      </el-form-item>
      <el-alert v-if="hasErr" :title="errMsg" type="error" show-icon></el-alert>
      <el-button
        :loading="loading"
        @click.native.prevent="handleLogin(loginForm)"
        type="success"
        style="width:100%;margin-bottom:30px;"
        >Login</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line
/*eslint-disable */
  name: 'Login',
  layout: 'empty',
  data() {
    return {
      loginForm: {
        email: 'admin@a.com',
        password: '11111111'
      },
      hasErr: false,
      errMsg: '',
      loginRules: {
        email: [
          {
            type: 'email',
            min: 6,
            trigger: ['blur', 'change']
          }
        ],
        password: [{ required: true, min: 8, trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password'
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
    handleLogin(loginForm) {
      this.loading = true
      try {
        this.$refs.loginForm.validate((valid) => {
          if (!valid) {
            this.loading = false
            return false
          } else {
            this.$store.dispatch('auth/login', this.loginForm).catch((err) => {
              this.hasErr = true
              this.errMsg = err.message
              this.loading = false
            })
          }
        })
      } catch (err) {
        throw err
      }
    }
  }
}
</script>
<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
$bg: #305635;
$light_gray: #fff;
$cursor: #fff;
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #305635;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .icon {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

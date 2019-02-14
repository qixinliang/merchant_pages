<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false" v-show="isShowLogin">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit" @on-toggle="toggle"></login-form>
        </div>
      </Card>
      <Card icon="log-in" title="欢迎注册" :bordered="false" v-show="!isShowLogin">
        <div class="form-con">
          <register-form @on-register-valid="handleRegisterSubmit" @on-toggle="toggle"></register-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import LoginForm from '_c/login-form'
  import RegisterForm from '_c/register-form'
  import {mapActions, mapMutations} from 'vuex'

  export default {
    components: {
      LoginForm,
      RegisterForm
    },
    data() {
      return {
        isShowLogin: true
      }
    },
    methods: {
      ...mapMutations([
        'setUserName',
        'setAccess'
      ]),
      ...mapActions([
        'handleLogin',
        'handleRegister',
        'getUserInfo'
      ]),
      // handleSubmit({ userName, password }) {
      //   this.handleLogin({ userName, password })
      // },
      handleSubmit({userName, password}) {

        this.setUserName(userName)
        this.handleLogin({userName, password}).then(() => {
          this.getUserInfo(userName).then(res => {

            this.setAccess(res.data.type)
            this.$router.push({
              name: this.$config.homeName
            })
          })

          this.$router.push({
            name: this.$config.homeName
          })
        })
      },
      handleRegisterSubmit({userName, password}) {
        this.handleRegister({userName, password}).then(res => {

          console.log('res')
          console.log(res)
          // this.getUserInfo().then(res => {
          //   this.$router.push({
          //     name: this.$config.homeName
          //   })
          // })
          if (res.data.error_code === 0) {
            // alert(22)
            this.isShowLogin = true
            this.$Message.success('已成功注册，请登录')

          } else {
            this.$Message.error(res.data.error_msg)
          }
          // this.$router.push({
          //   name: this.$config.homeName
          // })
        })
      },
      toggle() {
        this.isShowLogin = !this.isShowLogin
      }
    }
  }
</script>

<style>

</style>

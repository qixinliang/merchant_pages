<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator"/>
      <!-- <Badge :dot="!!messageUnreadCount">
      </Badge> -->
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
         <DropdownItem name="addUserInfo">
          完善个人信息
        </DropdownItem>
        <DropdownItem name="pay">
          充值
        </DropdownItem>
        <!--<DropdownItem name="userInfo">-->
          <!--修改密码-->
        <!--</DropdownItem>-->
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    // messageUnreadCount: {
    //   type: Number,
    //   default: 0
    // }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    // message () {
    //   this.$router.push({
    //     name: 'message_page'
    //   })
    // },
    changeUserInfo () {
      this.$router.push({
        name: 'user-info'
      })
    },
    addUserInfo(){
      // this.$router.push({
      //   name: 'add-user-info'
      // })
      this.$store.commit('setIsShowDetailModal', true)
    },
    pay(){
      this.$store.commit('setIsShowPayModal', true)
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'userInfo': this.changeUserInfo()
          break
        case 'addUserInfo': this.addUserInfo()
          break
        case 'pay': this.pay()
          break
      }
    }
  }
}
</script>

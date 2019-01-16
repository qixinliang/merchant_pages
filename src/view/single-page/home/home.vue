<template>
  <Card>
    <div class="example-content" v-show="isShowDetail">
      <div class="avatar-wrapper">
        <img style="width: 82px; height: 82px" :src="userDetail.logo" v-show="userDetail.logo"
             alt="">
      </div>
      <div class="user-detail-wrapper">
        <Row type="flex" class-name="star-detail-base">
          <Col span="3" order="1">商户姓名</Col>
          <Col span="5" order="2">{{userDetail.username}}</Col>
          <Col span="3" order="3">手机号</Col>
          <Col span="5" order="4">{{userDetail.mobile}}</Col>
          <Col span="3" order="5">会员等级</Col>
          <Col span="5" order="6">{{userDetail.level}}级</Col>
        </Row>
        <Row type="flex" class-name="star-detail-base">
          <Col span="3" order="1">我的二维码</Col>
          <Col span="5" order="2">
            <Button @click="preview(userDetail.erweima)">查看</Button>
            <Button @click="setQrcode" style="margin-left: 16px">重置</Button>
          </Col>
          <Col span="3" order="3">会员到期日</Col>
          <Col span="5" order="4">{{userDetail.expire_date}}</Col>
          <Col span="3" order="5"></Col>
          <Col span="5" order="6"></Col>
        </Row>

      </div>

    </div>
  </Card>

</template>

<script>
import { getUserInfo } from '@/api/user'
import { setQrcode } from '@/api/commercial-tenant'

import dayjs from 'dayjs'
import erweima from '@/assets/images/test/ewm.jpeg'

export default {
  name: 'home',
  components: {},
  data () {
    return {
      isShowDetail: true,
      userDetail: {}
    }
  },
  mounted () {
    //
    const data = {
      username: this.$store.state.user.userName
    }
    getUserInfo(data).then(res => {
      console.log('res')
      console.log(res)
      if (res.data.error_code === 0) {
        const data = res.data.data
        this.userDetail = data
        this.userDetail.level = data.level ? data.level : 0
        this.userDetail.erweima = data.erweima ? data.erweima : ''
        this.userDetail.expire_date = data.expire_date ? data.expire_date : dayjs(new Date().getTime() + 365*24*60*60*1000).format('YYYY-MM-DD HH:mm:ss')
        this.userDetail.erweima = data.erweima ? 'http://' + data.erweima : erweima
      }
    })
  },
  methods:{
    preview (a) {
      const title = '查看二维码'
      const content = '<img style="width: 100%;height:100%"  src="'+ a +'">'
      this.$Modal.info({
        title: title,
        width: 300,
        content: content

      })
    },
    setQrcode () {
      const data = {
        merchant_id: this.$store.state.user.userId,
        uid: this.$store.state.user.userId,
        access_token: this.$store.state.user.accessToken
      }
      setQrcode(data).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.userDetail.erweima = 'http://'+res.data.data.erweima
          this.$Message.success('已成功生成二维码')
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },
  }
}
</script>

<style lang="less">
  .example-content {
    position: relative;
    .avatar-wrapper {
      margin: 24px auto;
      width: 82px;
      height: 82px;
      img {
        border-radius: 41px;
      }
    }
    .user-detail-wrapper {
      /*margin-left: 98px;*/
    }
  }
  .ivu-modal-confirm-body{
    padding-left: 0 !important;
  }
</style>

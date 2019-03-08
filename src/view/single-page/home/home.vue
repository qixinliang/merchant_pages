<template>
  <Card>
    <div class="example-content" v-show="isShowDetail">
      <div class="avatar-wrapper">
        <img style="width: 82px; height: 82px" :src="userAvator" v-show="userDetail.logo"
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
          <Col span="3" order="1">我的小程序码</Col>
          <Col span="5" order="2">
            <div class="col-center">
              <Button @click="preview(userDetail.erweima)">查看</Button>
              <Button style="margin-left: 8px" @click="preview(userDetail.erweima)">下载</Button>
            </div>
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
  import {getUserInfo} from '@/api/user'
  import {setQrcode} from '@/api/commercial-tenant'

  import dayjs from 'dayjs'
  import erweima from '@/assets/images/test/ewm.jpeg'

  export default {
    name: 'home',
    components: {},
    data() {
      return {
        isShowDetail: true,
        userDetail: {
          erweima: ''
        }
      }
    },
    mounted() {
      //
      this.getUserInfo()

      this.$bus.$on(this.$bus.RELOAD_USER_INFO, this.getUserInfo)
    },
    computed: {
      userAvator() {
        return this.$store.state.user.avatorImgPath
      }
    },
    methods: {
      getUserInfo() {
        // alert(1)
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
            this.userDetail.expire_date = data.expire_date ? data.expire_date : dayjs(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss')
            this.userDetail.erweima = data.erweima ? 'http://' + data.erweima : erweima
          }
        })
      },
      preview() {
        const title = '查看小程序码'
        const content = '<div class="image-wrapper"><img style="width: 100%;height:100%"  src="' + this.userDetail.erweima + '"> ' +
          '<Button @click="setQrcode">生成小程序码</Button>' +
          '</div>'
        this.$Modal.info({
          title: title,
          width: 300,
          content: content,

          render: (h) => {
            const children = [h('Button', {
              props: {
                type: 'primary'
              },
              on: {
                click: () => {
                  this.setQrcode()
                }
              },
              style: {
                display: this.userDetail.erweima !== "data:image/jpeg;base64,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" ? "none" : "inline-block",
                marginLeft: '-46px',
                marginTop: '-16px',
                position: 'absolute',
                left: '50%',
                top: '50%',
                zIndex: 1000
              }
            }, '生成小程序码'),
              h('img', {
                attrs: {
                  src: this.userDetail.erweima,
                  type: 'primary'
                },
                style: {
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '250px',
                  height: '250px',
                  marginLeft: '5px'
                }
              })]

            return h('div', {
              style: {
                position: 'relative',
                margin: 0,
                height: '256px'
              }
            }, children)
          }


        })
      },
      setQrcode() {
        const data = {
          merchant_id: this.$store.state.user.userId,
          uid: this.$store.state.user.userId,
          access_token: this.$store.state.user.accessToken
        }
        setQrcode(data).then(res => {
          console.log(res)
          if (res.data.error_code === 0) {
            this.userDetail.erweima = 'http://' + res.data.data.erweima
            this.$Message.success('已成功生成小程序码')
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

    .col-center {
      width: 100%;
      text-align: center;
    }

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

  .ivu-modal-confirm-body {
    padding-left: 0 !important;
  }
</style>

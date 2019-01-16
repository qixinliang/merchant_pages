<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider"
           :style="{overflow: 'hidden'}">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage"
                 :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-show="!collapsed" :src="maxLogo" key="max-logo"/>
          <img v-show="collapsed" :src="minLogo" key="min-logo"/>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <!-- :message-unread-count="unreadCount" -->
          <user :user-avator="userAvator"/>
          <language v-if="$config.useI18n" @on-lang-change="setLocal" style="margin-right: 10px;" :lang="local"/>
          <!-- <error-store v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader" :has-read="hasReadErrorPage" :count="errorCount"></error-store> -->
          <!--<fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>-->
          <span style="font-size: 14px;margin-right: 16px;">Hi,{{userName}},欢迎你</span>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
    <Modal v-model="isShowPayModal"
           :mask-closable="false"
           :closable="false"
           width="720">
      <p slot="header" style="color:#57a3f3;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>会员充值</span>
      </p>
      <div style="text-align:center" class="cash-menu">
        <row :gutter="16">
          <Col span="8">
            <a href="javascript:void(0);" class="cash-menu-a">
              <div class="menu-all">
                <b class="unit">¥</b>
                <i class="price j_autoRenew_ordinaryItem">500.00</i>
                / 一次活动
              </div>
              <div class="menu-each line ">¥800</div>
              <div class="menu-pop">
                <i class="menu-pop-hover">
                  <b class="icon icon-thumb"
                     style="background-image: url(https://www.iqiyipic.com/common/fix/vipcash/cash-menu-tips.png)"></b>
                  立省300元</i>
              </div>
            </a>
          </Col>
          <Col span="8">
            <a href="javascript:void(0);" class="cash-menu-a">
              <div class="menu-all">
                <b class="unit">¥</b>
                <i class="price j_autoRenew_ordinaryItem">1500.00</i>
                / 季度活动
              </div>
              <div class="menu-each line ">¥2000</div>
              <div class="menu-pop">
                <i class="menu-pop-hover">
                  <b class="icon icon-thumb"
                     style="background-image: url(https://www.iqiyipic.com/common/fix/vipcash/cash-menu-tips.png)"></b>
                  立省500元</i>
              </div>
            </a>
          </Col>
          <Col span="8">
            <a href="javascript:void(0);" class="cash-menu-a">
              <div class="menu-all">
                <b class="unit">¥</b>
                <i class="price j_autoRenew_ordinaryItem">3000.00</i>
                / 年度活动
              </div>
              <div class="menu-each line ">¥4000</div>
              <div class="menu-pop">
                <i class="menu-pop-hover">
                  <b class="icon icon-thumb"
                     style="background-image: url(https://www.iqiyipic.com/common/fix/vipcash/cash-menu-tips.png)"></b>
                  立省1000元</i>
              </div>
            </a>
          </Col>
        </row>
        <Card style="margin-top: 24px;">
          <p slot="title">
            <Icon type="md-qr-scanner"/>
            扫码支付
          </p>
          <div class="cash-method-saoma" data-tab-body="scanPay" data-seq="1" style="display: block;">
            <div class="saoma-ewm-box">
              <div class="saoma-ewm">
                <div class="saoma-ewm-cover">
                  <div class="cover-bg dn" data-vippay-widget="codeCover"><i class="cover-icon"></i> <span
                    class="cover-txt">请点击刷新</span></div>
                </div>
                <img data-vippay-widget="codeImg"
                     src="https://i.vip.iqiyi.com/client/store/qrcode/getIMG.action?url=https%3A%2F%2Fi.vip.iqiyi.com%2Fpay%2Fscan_pay.action%3Fpid%3Da0226bd958843452%26aid%3D%26amount%3D3%26payType%3D74%26payAutoRenew%3D3%26version%3D1.0%26fr_version%3DFromCasher%253D1%26platform%3Db6c13e26323c537d%26payParamCoupon%3D%26fs%3D%26fc%3D8181eb6f15b8c1da%26enableCustomCheckout%3D%26orderSeq%3Dbd2688c3bcdc0974f3428f96b3211dcd539%26fsSign%3D%26src%3D509221_0%26device_id%3Dbd2688c3bcdc0974f3428f96b3211dcd&amp;crossLogin=1&amp;validTime=900&amp;width=97&amp;payParamCoupon=&amp;fc=8181eb6f15b8c1da&amp;fv=&amp;P00001=bfa8j1xbZgCOUm1uCm1yMXhDlOVgU49n1GW8AILWQ9Pfr6OaWI2lIAP4k4RGGhkVcz038e"
                     alt="" width="97" height="97" data-cashier-status="gold"
                     data-saomapay-orderseq="bd2688c3bcdc0974f3428f96b3211dcd539" data-saomapay-paytype="74"></div>
              <span class="corner-lt"></span> <span class="corner-rb"></span></div>
            <div class="saoma-pay-box">
              <div class="saoma-pay-price"><i class="unit">¥</i> <span class="price" data-vippay-ele="payTotleValue">45.00</span>
                <span data-vippay-widget="paySale" class="">(已优惠                         <span
                  data-vippay-ele="saleTotleValue">13</span>元)                     </span></div>
              <div class="saoma-pay-tips">使用<span data-scan-pay="tips">支付宝、微信</span>扫码支付</div>
              <div class="saoma-pay-type" data-scan-pay="icons"><span class="icon icon-zhifubao"></span><span
                class="icon icon-weixin"></span></div>
            </div>
          </div>
        </Card>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="closePayModal">关闭</Button>
      </div>
    </Modal>

    <Modal
      v-model="isShowDetailModal"
      title="编辑用户信息"
      :mask-closable="false"
      :footer-hide="true"
      @on-ok="asyncOK"
      @on-visible-change="show">
      <Form ref="formValidateEdit" :model="formValidate" :rules="ruleValidateEdit" :label-width="100">
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="负责人" prop="boss">
          <Input v-model="formValidate.boss" placeholder="请输入负责人姓名"/>
        </FormItem>
        <FormItem label="座机" prop="tel">
          <Input v-model="formValidate.tel" placeholder="请输入座机"/>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input v-model="formValidate.mobile" placeholder="请输入手机"/>
        </FormItem>
        <FormItem label="地址" prop="address">
          <Input v-model="formValidate.address" placeholder="请输入地址"/>
        </FormItem>
        <FormItem label="头像/LOGO" prop="logo">
          <Upload
            ref="upload"
            :on-success="handleSuccess"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            type="drag"
            name="file"
            action="https://upload.qiniup.com"
            :data="{token: token}"
            :show-upload-list="false"
            style="display: inline-block;width:58px;">
            <div style="width:58px;height:58px;line-height:58px;">
              <Icon type="ios-camera" size="20" v-show="!formValidate.logo"></Icon>
              <img style="width: 100%;height:100%" :src="formValidate.logo" v-show="formValidate.logo" alt="">
              <Button @click.stop="preview(formValidate.logo)" v-show="formValidate.logo" style="position: absolute;top: 14px;right: -70px;">预览</Button>
            </div>
          </Upload>
          <input type="hidden" v-model="formValidate.logo">
        </FormItem>

        <FormItem label="营业执照" prop="licence">
          <Upload
            ref="upload"
            :on-success="handleSuccessLicence"
            :format="['jpg','jpeg','png']"
            :max-size="2048"
            type="drag"
            name="file"
            action="https://upload.qiniup.com"
            :data="{token: token}"
            :show-upload-list="false"
            style="display: inline-block;width:58px;">
            <div style="width:58px;height:58px;line-height:58px;">
              <Icon type="ios-camera" size="20" v-show="!formValidate.licence"></Icon>
              <img style="width: 100%;height:100%" :src="formValidate.licence" v-show="formValidate.licence" alt="">
              <Button @click.stop="preview(formValidate.licence)" v-show="formValidate.licence" style="position: absolute;top: 14px;right: -70px;">预览</Button>
            </div>
          </Upload>
          <input type="hidden" v-model="formValidate.licence">
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidateEdit')">提交</Button>
          <Button @click="closeDetailModal" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </Layout>
</template>
<script>
import $ from 'jquery'
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
// import Fullscreen from './components/fullscreen'
import Language from './components/language'
// import ErrorStore from './components/error-store'
// import { mapMutations, mapActions, mapGetters } from 'vuex'
import { mapMutations, mapActions, mapState } from 'vuex'
import { getNewTagList, getNextRoute, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.jpg'
import maxLogo from '@/assets/images/logo.jpg'
import './main.less'

import axios from 'axios'
import config from '@/config'

import { getUserInfo } from '@/api/user'
import { editUserDetail } from '@/api/commercial-tenant'

const tokenUrl = process.env.NODE_ENV === 'development' ? config.tokenUrl.dev : config.tokenUrl.pro

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    // Fullscreen,
    // ErrorStore,
    User,
    ABackTop
  },
  data () {
    return {
      token: '',
      isShowPay: true,
      collapsed: false,
      licence: '',
      minLogo,
      maxLogo,
      isFullscreen: false,
      userName: this.$store.state.user.userName,
      formValidate: {
        id: '',
        username: '',
        boss: '',
        tel: '',
        mobile: '',
        address: '',
        logo: '',
        licence: ''
      },
      ruleValidateEdit: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        boss: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }
        ],
        tel: [
          { required: false, message: '座机不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        logo: [
          { required: true, message: 'LOGO不能为空', trigger: 'blur' }
        ],
        licence: [
          { required: true, message: '营业执照不能为空', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    // ...mapGetters([
    //   'errorCount'
    // ]),

    isShowPayModal () {
      return this.$store.state.app.isShowPayModal
    },
    isShowDetailModal: {
      get () {
        // return this.$store.state.username
        return this.$store.state.app.isShowDetailModal

      },
      set (value) {
        this.$store.commit('setIsShowDetailModal', value)
      }
    },

    // ...mapState({
    //   isShowDetailModal: state => state.isShowDetailModal
    // }),

    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.user.avatorImgPath
    },
    cacheList () {
      return ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    }
    // hasReadErrorPage () {
    //   return this.$store.state.app.hasReadErrorPage
    // },
    // unreadCount () {
    //   return this.$store.state.user.unreadCount
    // }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    show (flag) {
      console.log(flag)
      if (flag) {
        this.getUploadToken()
        this.getUserInfo()
      }
    },
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') {
        name = route
      } else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type === 'all') {
        this.turnToPage(this.$config.homeName)
      } else if (routeEqual(this.$route, route)) {
        if (type !== 'others') {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    closePayModal () {
      this.$store.commit('setIsShowPayModal', false)
    },
    closeDetailModal () {
      this.$store.commit('setIsShowDetailModal', false)
    },
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {

        if (valid) {

          if (name === 'formValidateEdit') {
            this.editUserDetail(this.formValidate)
          }
        } else {
          this.$Message.error('请填写正确再提交!')
          // this.loading = false
        }
      })
    },
    editUserDetail () {
      let data = this.formValidate
      data.id = this.$store.state.user.userId
      data.uid = this.$store.state.user.userId
      data.access_token = this.$store.state.user.accessToken
      data.merchant_name = this.formValidate.username
      editUserDetail(data).then(res => {
        if (res.data.error_code === 0) {
          this.$Message.success('修改成功')
          this.closeDetailModal()

        }
      })
    },
    getUserInfo () {
      getUserInfo(this.$store.state.user.userName).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.formValidate = res.data.data
        }
      })
    },
    asyncOK () {
      this.handleSubmit('formValidate')
    },
    handleSuccess (res) {
      console.log(res)
      this.avatar = config.baseImgUrl + res.key
      this.formValidate.logo = this.avatar
    },
    handleSuccessLicence (res) {
      console.log(res)
      this.licence = config.baseImgUrl + res.key
      this.formValidate.licence = this.licence
    },
    getUploadToken () {
      axios.get(
        tokenUrl
      ).then((res) => {
        if (res.data.error_code === 0) {
          this.token = res.data.token
        } else {
          this.$Message.error('网络故障，请稍后再试')
        }
      })
    },
    preview (a) {
      const title = '预览'
      const content = '<img style="width: 100%;height:100%"  src="'+ a +'">'
      this.$Modal.info({
        title: title,
        width: 700,
        content: content

      })
    }
  },
  watch: {
    '$route' (newRoute) {
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }

    this.$nextTick(() => {
      $(document).on('click', '.cash-menu-a', function () {
        $('.cash-menu-a').removeClass('selected')
        $(this).addClass('selected')
        $('.saoma-pay-price').find('.price').html($(this).find('.j_autoRenew_ordinaryItem').html())
        console.log($(this).find('.menu-pop-hover').text())
        console.log(parseInt($(this).find('.menu-pop-hover').text()))
        $('[data-vippay-ele="saleTotleValue"]').html($(this).find('.menu-pop-hover').text().replace(/[^0-9]/ig, ''))
      })
    })

  }
}
</script>

<style lang="less">

  .ivu-modal-content {
    background-color: #F4F4F5 !important;
  }

  .cash-menu-a.selected, .cash-menu .cash-menu-a:hover {
    padding: 0;
    background: #fef3ee;
    border: 2px solid #f6644c;
  }

  .cash-menu .menu-all {
    display: block;
    height: 32px;
    line-height: 32px;
    font-size: 18px;
    color: #666;
    margin-top: 12px;
  }

  .vip-cash a, .vip-cash a:hover, .vip-cash a:visited {
    color: #fff;
    text-decoration: none;
  }

  .cash-menu .menu-all .price {
    font-size: 24px;
    color: #f6644c;
    font-family: Impact;
  }

  .cash-menu .menu-each.line {
    text-decoration: line-through;
  }

  .cash-menu .menu-each {
    display: block;
    line-height: 20px;
    font-size: 16px;
    color: #aaa;
  }

  .cash-menu .menu-pop-hover {
    display: inline-block;
    max-width: 110px;
    height: 20px;
    line-height: 19px;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
    background: #f6644c;
    color: #fff;
    font-size: 12px;
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cash-menu-a {
    display: block;
    /*width: 198px;*/
    height: 98px;
    padding: 1px;
    background: #fff;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-family: "microsoft yahei";
  }

  a:active, a:hover, a:link, a:visited {
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .vip-cash *, .vip-cash :after, .vip-cash :before, .cash-pop-wrap * {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }

  user agent stylesheet
  a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
  }

  .cash-menu .cash-menu-item {
    position: relative;
    display: inline-block;
    vertical-align: top;
    height: 52px;
    margin-right: 8px;
    text-align: center;
  }

  user agent stylesheet
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  .cash-menu .cash-menu-ul {
    height: 102px;
    width: 100%;
    font-size: 0;
    white-space: nowrap;
  }

  .vip-cash ul, .vip-cash ol {
    list-style: none;
  }

  ol, ul {
    list-style: none;
  }

  user agent stylesheet
  ul, menu, dir {
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }

  .vip-cash .cash-main {
    position: relative;
    width: 100%;
    height: 478px;
    padding: 10px 0 14px;
    font-size: 0;
    overflow: hidden;
  }

  .vip-cash {
    position: relative;
    width: 650px;
    height: 602px;
    background: #f4f4f4;
    color: #fff;
    font: 12px/1.5 PingFangSC-Regular, Helvetica, Arial, 'Microsoft Yahei', sans-serif;
  }

  .ivu-upload-drag {
    overflow: visible !important;
  }

</style>

<template>
  <div>
    <Card>
      <Form ref="formSearch" :model="formSearch" :rules="ruleValidate" :label-width="100">
        <Row>
          <Col :span="12">
            <FormItem label="用户名" prop="name">
              <Input v-model="formSearch.name" placeholder="请输入用户名"></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <Button type="primary" @click="handleSubmit('formSearch')" style="margin-left: 16px;">搜索</Button>
            <Button @click="handleReset('formSearch')" style="margin-left: 8px">重置</Button>
          </Col>
          <Col span="4" style="text-align: right">
            <Button type="primary" @click="handleAdd" style="margin-left: 8px">添加</Button>
          </Col>
        </Row>
      </Form>
      <Table border :columns="columns1" :data="data1"></Table>
      <!--<Page :total="totalPage" :page-size="pageSize" show-elevator show-sizer @on-change="changPageHandler" style="margin: 16px 0;"/>-->
      <Page :total="totalPage" :page-size="pageSize" show-elevator show-sizer @on-change="changPageHandler" @on-page-size-change="changPageSizeHandler"	style="margin: 16px 0;"/>

    </Card>
    <Modal
      v-model="isShowDetail"
      title="添加用户信息"
      :mask-closable="false"
      :footer-hide="true"
      @on-ok="asyncOK">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入用户名" :disabled="isUserNameDisabled"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="重复密码" prop="repass">
          <Input v-model="formValidate.repass" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="用户类型" prop="type" v-if="isShowType">
          <Select v-model="formValidate.type" :value="formValidate.type" placeholder="请选择类型">
            <Option value="1">用户</Option>
            <Option value="2">代理商</Option>
            <Option value="3">管理员</Option>
          </Select>
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
            </div>
          </Upload>
          <input type="hidden" v-model="formValidate.logo">
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleCancel" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

    <Modal
      v-model="isShowDetailEdit"
      title="编辑用户信息"
      :mask-closable="false"
      :footer-hide="true"
      @on-ok="asyncOK">
      <Form ref="formValidateEdit" :model="formValidate" :rules="ruleValidateEdit" :label-width="100">
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入用户名" :disabled="isUserNameDisabled"/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="重复密码" prop="repass">
          <Input v-model="formValidate.repass" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="用户类型" prop="type" v-if="isShowType">
          <Select v-model="formValidate.type" :value="formValidate.type" placeholder="请选择类型">
            <Option value="1">用户</Option>
            <Option value="2">代理商</Option>
            <Option value="3">管理员</Option>
          </Select>
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
            </div>
          </Upload>
          <input type="hidden" v-model="formValidate.logo">
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidateEdit')">提交</Button>
          <Button @click="handleCancel" style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import { getDate, getHandledValue } from '@/libs/tools'
import { getUserList, editUser, addUser, setQrcode, delUser } from '@/api/commercial-tenant'
import axios from 'axios'
import config from '@/config'
import {getUserInfo} from '@/api/user'

const tokenUrl = process.env.NODE_ENV === 'development' ? config.tokenUrl.dev : config.tokenUrl.pro
import dayjs from 'dayjs'

export default {
  name: 'commercial-tenant-list',
  data () {
    return {
      pageNo: 1,
      pageSize:10,
      totalPage: 1,
      typeArray: [ // 1，普通商户 2.代理商户／vip商户，3超级管理员
        '普通商户',
        '代理商户／vip商户',
        '超级管理员'
      ],
      isUserNameDisabled: true,
      modalTitle: '编辑用户信息',
      isShowType: false,
      isEdit: true,
      token: '',
      avatar: '',
      isShowDetail: false,
      isShowDetailEdit: false,
      formSearch: {
        name: ''
      },
      columns1: [
        {
          title: '用户ID',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '注册日期',
          key: 'add_time',
          render: (h, params) => {
            console.log(params.row.add_time)
            console.log(dayjs(params.row.add_time * 1000).format('YYYY-MM-DD HH:mm:ss'))
            // return h('span', getDate(params.row.add_time, 'year')
            return h('span', dayjs(params.row.add_time * 1000).format('YYYY-MM-DD HH:mm:ss'))
          }
        },
        {
          title: '等级/类型',
          key: 'typeLabel'
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       this.show(params.index)
              //     }
              //   }
              // }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handleEdit(params.index)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.setQrcode(params.row.id)
                  }
                }
              }, '生成二维码')
            ])
          }
        }
      ],
      data1: [],
      loading: true,
      formValidate: {
        id: '',
        username: '',
        add_time: '',
        type: '',
        logo: ''
      },

      ruleValidate: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        repass: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        logo: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ]
      },
      ruleValidateEdit: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],

        logo: [
          { required: true, message: '图片不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.getUserList('', this.pageNo)
  },
  watch: {
    isEdit () {
      if (this.isEdit) {
        this.isUserNameDisabled = true
        this.isShowType = false
        this.modalTitle = '编辑用户信息'
        this.isShowDetail = false
        this.isShowDetailEdit = true

      } else {
        this.isUserNameDisabled = false
        this.isShowType = true
        this.modalTitle = '添加用户信息'
        this.isShowDetail = true
        this.isShowDetailEdit = false
      }

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
    handleAdd () {
      this.isEdit = false
      this.isShowDetail = true
      this.handleReset('formValidate')
      this.show()
    },
    handleEdit (index) {
      this.isEdit = true
      this.isShowDetailEdit = true
      this.formValidate = JSON.parse(JSON.stringify(this.data1[index]))
      this.formValidate.password = ''
      this.formValidate.repass = ''
      this.show()
    },

    editUser (data) {
      editUser(data).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')
          this.isShowDetail = false
          this.isShowDetailEdit = false
          this.getUserList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },
    addUser (data) {
      addUser(data).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')

          this.isShowDetail = false
          this.isShowDetailEdit = false
          this.getUserList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },

    getUserList (username, pageno) {
      const url = '/merchant/lists?page=' + pageno
      username = username || ''
      const pagination = this.pageSize
      getUserList({ url, username, pagination }).then(res => {
        // console.log('res')
        // alert(44)
        // console.log(res)
        // console.log('res.data.data.data')
        // console.log(res.data.data.data)
        this.totalPage = res.data.data.total
        this.data1 = res.data.data.data.filter(item => {
          item.typeLabel = this.typeArray[item.type - 1]
          return item.type = '' + item.type
        })
      })
    },

    show () {
      this.getUploadToken()
    },

    remove (index) {
      const merchant_id = this.data1[index].id
      const uid = this.$store.state.user.userId
      const access_token = this.$store.state.user.accessToken

      delUser({ merchant_id, uid, access_token }).then(res => {
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')

          this.pageNo = 1
          this.getUserList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
      // this.data1.splice(index, 1)
    }
    ,
    setQrcode (id) {
      console.log(id)
      const data = {
        merchant_id: id,
        uid: this.$store.state.user.userId,
        access_token: this.$store.state.user.accessToken
      }
      setQrcode(data).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.$Message.success('已成功生成二维码')
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },
    asyncOK () {
      this.handleSubmit('formValidate')
    },
    handleCancel () {
      this.isShowDetail = false
      this.isShowDetailEdit = false
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {

        if (valid) {
          if (name === 'formSearch') {
            this.pageNo = 1
            this.getUserList(this.formSearch.name, this.pageNo)
          } else {
            if (this.formValidate.password === this.formValidate.repass) {
              this.formValidate.uid = this.$store.state.user.userId
              this.formValidate.access_token = this.$store.state.user.accessToken

              if (name === 'formValidateEdit') {
                this.editUser(this.formValidate)
              } else {
                this.addUser(this.formValidate)
              }
            } else {
              this.$Message.error('密码填写不一致!')
              // this.loading = false
            }
          }
        } else {
          this.$Message.error('请填写正确再提交!')
          // this.loading = false
        }
      })
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
    handleSuccess (res) {
      console.log(res)
      this.avatar = config.baseImgUrl + res.key
      this.formValidate.logo = this.avatar
    },
    changPageHandler (index) {
      this.pageNo = index
      this.getUserList(this.formSearch.name, this.pageNo)
    },
    changPageSizeHandler(num){
      this.pageSize = num
      this.getUserList(this.formSearch.name, 1)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

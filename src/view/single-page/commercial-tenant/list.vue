<template>
  <div>
    <Table border :columns="columns1" :data="data1"></Table>
    <Modal
      v-model="isShowDetail"
      title="编辑用户信息"
      :mask-closable="false"
      :footer-hide="true"
      @on-ok="asyncOK">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="username">
          <Input v-model="formValidate.username" placeholder="请输入用户名" disabled/>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formValidate.password" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="重复密码" prop="repass">
          <Input v-model="formValidate.repass" placeholder="请输入密码"/>
        </FormItem>
        <FormItem label="用户类型" prop="type">
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
  </div>
</template>

<script>
// import { getDate, getHandledValue } from '@/libs/tools'
import { getUserList } from '@/api/commercial-tenant'
import axios from 'axios'
import config from '@/config'

const tokenUrl = process.env.NODE_ENV === 'development' ? config.tokenUrl.dev : config.tokenUrl.pro
import dayjs from 'dayjs'

export default {
  name: 'list',
  data () {
    return {
      token: '',
      avatar: '',
      isShowDetail: false,
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
          key: 'type'
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
                    this.show(params.index)
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
                    this.qrcode(params.index)
                  }
                }
              }, '生成二维码')
            ])
          }
        }
      ],
      data1: [
        {
          id: '1',
          username: 'Jim Green',
          add_time: 1545041702,
          type: '1'
        },
        {
          id: '2',
          username: 'Jim Green1',
          add_time: 1545041702,
          type: '2'
        },
        {
          id: '3',
          username: 'Jim Green2',
          add_time: 1545041702,
          type: '3'
        },
        {
          id: '4',
          username: 'Jim Green3',
          add_time: 1545041702,
          type: '1'
        }
      ],
      loading: true,
      formValidate: {
        id: '',
        username: '',
        add_time: '',
        type: ''
      },
      ruleValidate: {
        name: [
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
      }
    }
  },
  mounted () {
    getUserList({ token: 'admin' }).then(res => {
      console.log(res)
      this.data1 = res.data.data.filter(item => {
        return item.type = '' + item.type
      })
    })
  },
  methods: {
    show (index) {
      this.getUploadToken()
      this.handleReset('formValidate')
      this.isShowDetail = true
      this.formValidate = JSON.parse(JSON.stringify(this.data1[index]))

    },
    remove (index) {
      this.data1.splice(index, 1)
    }
    ,
    qrcode (index) {
      console.log(index)
    },
    asyncOK () {
      this.handleSubmit('formValidate')
    },
    handleCancel () {
      this.isShowDetail = false
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    handleSubmit (name) {
      this.loading = true
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.formValidate.password === this.formValidate.repass) {
            this.$Message.success('Success!')
            setTimeout(() => {
              this.isShowDetail = false
              // this.loading = false
            }, 2000)
          } else {
            this.$Message.error('密码填写不一致!')
            // this.loading = false
          }

        } else {
          this.$Message.error('请填写完整再提交!')
          // this.loading = false
        }
      })
    },
    getUploadToken () {
      axios.get(
        tokenUrl,
        {}
      ).then((res) => {
        console.log('res')
        console.log(res)
        this.token = res.data.token
      })
    },
    handleSuccess (res) {
      console.log(res)
      this.avatar = config.baseImgUrl + res.key
      this.formValidate.logo = this.avatar
    }
  }
}
</script>

<style lang="less" scoped>

</style>

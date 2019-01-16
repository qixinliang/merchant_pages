<template>
  <div>
    <Card>
      <Form ref="formSearch" :model="formSearch" :label-width="100">
        <Row>
          <Col :span="12">
            <FormItem label="用户名" prop="sku_name">
              <Input v-model="formSearch.sku_name" placeholder="请输入用户名"></Input>
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
      <Page :total="totalPage" :page-size="2" show-elevator @on-change="changPageHandler" style="margin: 16px 0;"/>
    </Card>
    <Modal
      v-model="isShowDetail"
      title="添加用户信息"
      :mask-closable="false"
      :footer-hide="true"
      @on-ok="asyncOK">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="奖品名" prop="sku_name">
          <Input v-model="formValidate.sku_name" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="奖品有效期" prop="valid_time" v-if="isShowType">
          <Select v-model="formValidate.valid_time" :value="formValidate.valid_time" placeholder="奖品有效期">
            <Option value="7">7</Option>
            <Option value="15">15</Option>
            <Option value="30">30</Option>
            <Option value="180">180</Option>
            <Option value="365">365</Option>
          </Select>
        </FormItem>
        <FormItem label="奖品跳转链接" prop="redirect_url">
          <Input v-model="formValidate.redirect_url" placeholder="请输入奖品跳转链接"/>
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
      <Form ref="formValidateEdit" :model="formValidate" :rules="ruleValidateEdit" :label-width="120">
        <FormItem label="奖品名" prop="sku_name">
          <Input v-model="formValidate.sku_name" placeholder="请输入用户名"/>
        </FormItem>
        <FormItem label="奖品有效期" prop="valid_time">
          <Select v-model="formValidate.valid_time" :value="formValidate.valid_time" placeholder="奖品有效期">
            <Option value="7">7</Option>
            <Option value="15">15</Option>
            <Option value="30">30</Option>
            <Option value="180">180</Option>
            <Option value="365">365</Option>
          </Select>
        </FormItem>
        <FormItem label="奖品跳转链接" prop="redirect_url">
          <Input v-model="formValidate.redirect_url" placeholder="请输入奖品跳转链接"/>
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
import { getSkuList, addSku, editSku, handleAudit, delSku } from '@/api/sku'
import axios from 'axios'
import config from '@/config'

const tokenUrl = process.env.NODE_ENV === 'development' ? config.tokenUrl.dev : config.tokenUrl.pro
import dayjs from 'dayjs'

export default {
  name: 'commercial-tenant-list',
  data () {
    return {
      pageNo: 1,
      totalPage: 1,
      typeArray: [ // 1，普通商户 2.代理商户／vip商户，3超级管理员
        '审核驳回',
        '待审核',
        '审核成功',
        ''
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
        sku_name: ''
      },
      columns1: [
        {
          title: '奖品ID',
          key: 'id'
        },
        {
          title: '奖品名',
          key: 'sku_name'
        },
        {
          title: '跳转链接',
          key: 'redirect_url'
        },
        {
          title: '有效日期',
          key: 'valid_time'
        },
        {
          title: '状态',
          key: 'statusLabel'
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
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.handlePass(params.row.id)
                  }
                }
              }, '通过'),
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
                    this.handleReject(params.row.id)
                  }
                }
              }, '驳回'),
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
              }, '删除')
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
        type: ''
      },

      ruleValidate: {
        sku_name: [
          { required: true, message: '奖品名不能为空', trigger: 'blur' }
        ],
        valid_time: [
          { required: true, message: '奖品有效期不能为空', trigger: 'blur' }
        ],
        redirect_url: [
          { required: true, message: '奖品跳转链接不能为空', trigger: 'change' }
        ]
      },
      ruleValidateEdit: {
        sku_name: [
          { required: true, message: '奖品名不能为空', trigger: 'blur' }
        ],
        valid_time: [
          { required: true, message: '奖品有效期不能为空', trigger: 'blur' }
        ],
        redirect_url: [
          { required: true, message: '奖品跳转链接不能为空', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
    this.getSkuList('', this.pageNo)
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

    editSku (data) {
      editSku(data).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')
          this.isShowDetail = false
          this.isShowDetailEdit = false
          this.getSkuList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },
    addSku (data) {
      addSku(data).then(res => {
        console.log(res)
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')

          this.isShowDetail = false
          this.isShowDetailEdit = false
          this.getSkuList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },

    getSkuList (sku_name, pageno) {
      const url = '/sku/lists?page=' + pageno
      sku_name = sku_name || ''
      const pagination = 2
      getSkuList({ url, sku_name, pagination }).then(res => {
        // console.log('res')
        // alert(44)
        console.log(res)
        console.log('res.data.data.data')
        // console.log(res.data.data.data)
        this.totalPage = res.data.data.total
        this.data1 = res.data.data.data.filter(item => {
          item.sku_id = item.id
          item.statusLabel = this.typeArray[item.status + 1]
          return item.type = '' + item.type
        })
      })
    },

    show () {
      this.getUploadToken()
    },

    remove (index) {
      // this.data1.splice(index, 1)
      const sku_id = this.data1[index].id
      const uid = this.$store.state.user.userId
      const access_token = this.$store.state.user.accessToken

      delSku({ sku_id, uid, access_token }).then(res => {
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')
          this.pageNo = 1
          this.getSkuList('', this.pageNo)
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
            this.getSkuList(this.formSearch.sku_name, this.pageNo)
          } else {
            this.formValidate.uid = this.$store.state.user.userId
            this.formValidate.access_token = this.$store.state.user.accessToken

            if (name === 'formValidateEdit') {
              this.editSku(this.formValidate)
            } else {
              this.addSku(this.formValidate)
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
      this.getSkuList(this.formSearch.name, this.pageNo)
    },
    handleReject (id) {
      console.log(id)
      const data = {
        uid: this.$store.state.user.userId,
        access_token: this.$store.state.user.accessToken,
        sku_id: id,
        status: -1,
      }
      handleAudit(data).then(res => {
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')
          this.getSkuList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    },
    handlePass (id) {
      const data = {
        uid: this.$store.state.user.userId,
        access_token: this.$store.state.user.accessToken,
        sku_id: id,
        status: 1,
      }
      handleAudit(data).then(res => {
        if (res.data.error_code === 0) {
          this.$Message.success('Success!')
          this.getSkuList('', this.pageNo)
        } else {
          this.$Message.error(res.data.error_msg)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>

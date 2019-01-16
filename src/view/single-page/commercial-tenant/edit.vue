<template>
  <div>
    <Card style="width:100%">
      <Form v-show="!isShowDetail" ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="Name" prop="name">
          <Input v-model="formValidate.name" placeholder="Enter your name"/>
        </FormItem>
        <FormItem label="E-mail" prop="mail">
          <Input v-model="formValidate.mail" placeholder="Enter your e-mail"/>
        </FormItem>
        <FormItem label="City" prop="city">
          <Select v-model="formValidate.city" placeholder="Select your city">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="Date">
          <Row>
            <Col span="11">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <FormItem prop="time">
                <TimePicker type="time" placeholder="Select time" v-model="formValidate.time"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
          <RadioGroup v-model="formValidate.gender">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
          <CheckboxGroup v-model="formValidate.interest">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="Enter something..."></Input>
        </FormItem>
        <!--<FormItem>-->
        <!--<Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>-->
        <!--<Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>-->
        <!--</FormItem>-->
      </Form>

      <div class="example-content" v-show="isShowDetail">
        <div class="avatar-wrapper">
          <img style="width: 82px; height: 82px" src="https://ubmcmm.baidustatic.com/media/v1/0f000Dd29O15Im4ZGHXmF0.jpg" alt="">
        </div>
        <div class="user-detail-wrapper">
          <Row type="flex" class-name="star-detail-base">
            <Col span="3" order="1">商户姓名</Col>
            <Col span="5" order="2">张三</Col>
            <Col span="3" order="3">用户名（手机号）</Col>
            <Col span="5" order="4">13333333333</Col>
            <Col span="3" order="5">会员等级</Col>
            <Col span="5" order="6">3级</Col>
          </Row>
          <Row type="flex" class-name="star-detail-base">
            <Col span="3" order="1">我的二维码</Col>
            <Col span="5" order="2">
              <Button>查看</Button>
              <Button style="margin-left: 16px">重置</Button>
            </Col>
            <Col span="3" order="3">会员到期日</Col>
            <Col span="5" order="4">2019-01-02</Col>
            <Col span="3" order="5">账户余额</Col>
            <Col span="5" order="6">1000元</Col>
          </Row>
          <Row type="flex" class-name="star-detail-base">
            <Col span="3" order="1">我的二维码</Col>
            <Col span="5" order="2">
              <Button>查看</Button>
              <Button style="margin-left: 16px">重置</Button>
            </Col>
            <Col span="3" order="3">会员到期日</Col>
            <Col span="5" order="4">2019-01-02</Col>
            <Col span="3" order="5">账户余额</Col>
            <Col span="5" order="6">1000元</Col>
          </Row>
        </div>

      </div>

      <Row style="margin-top: 24px;">
        <Col class="but-wrapper" :span="24" align="center">
          <div v-show="!isShowDetail">
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            <Button @click="handleEdit" style="margin-left: 8px">取消</Button>
          </div>
          <div v-show="isShowDetail">
            <Button type="primary" @click="handleEdit">修改</Button>
          </div>
        </Col>
      </Row>
    </Card>

    <Card style="height: 283px;">
      <p slot="title">
        <Icon type="ios-pricetags-outline"></Icon>
        缩略图
      </p>
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
          <Icon type="ios-camera" size="20" v-show="!avatar"></Icon>
          <img style="width: 100%;height:100%" :src="avatar" v-show="avatar" alt="">
        </div>
      </Upload>
    </Card>

  </div>

</template>
<script>
import axios from 'axios'
import config from '@/config'

const tokenUrl = process.env.NODE_ENV === 'development' ? config.tokenUrl.dev : config.tokenUrl.pro

export default {
  data () {
    return {
      token: '',
      avatar: '',
      isShowDetail: true,
      formValidate: {
        name: '',
        mail: '',
        city: '',
        gender: '',
        interest: [],
        date: '',
        time: '',
        desc: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        city: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        gender: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        interest: [
          { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
          { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
        ],
        date: [
          { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
        ],
        time: [
          { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
        ],
        desc: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.getUploadToken()
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
      this.getUploadToken()
    },
    handleEdit () {
      this.isShowDetail = !this.isShowDetail
    },
    getUploadToken () {
      axios.post(
        tokenUrl,
        {
          name: '2019/ddd.jpg'
        }
      ).then((res) => {
        console.log('res')
        console.log(res)
        this.token = res.data
      })
    },
    handleSuccess (res) {
      console.log(res)
      this.avatar = config.baseImgUrl + res.key
    }
  }
}
</script>

<style lang="less">
  .example-content{
    position: relative;
    .avatar-wrapper{
      margin: 24px auto;
      width: 82px;
      height: 82px;
      img{
        border-radius: 41px;
      }
    }
    .user-detail-wrapper{
      /*margin-left: 98px;*/
    }
  }
</style>

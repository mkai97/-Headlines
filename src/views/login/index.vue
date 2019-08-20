<template>
    <div class="bgc">
       <el-card class="box-card">

      <img src="../../assets/img/logo_index.png" class="image">
      <div style="padding: 14px;">

      </div>
<el-form :model="formData" :rules="rules" ref="loginForm">
  <el-form-item prop="mobile">
<el-input class="mobile"  style="width:  480px" v-model="formData.mobile" placeholder="请输入手机号"></el-input>
</el-form-item>
<el-form-item prop="code">
<el-input class="code" style="width:  360px" v-model="formData.code" placeholder="请输入验证码"></el-input> <el-button type="primary">发送验证码</el-button>
</el-form-item>
<el-form-item prop="check">
 <el-checkbox style="margin:12px" v-model="formData.check">你必须同意我们的协议</el-checkbox>
</el-form-item>
<el-form-item>
<el-button @click="login" style="width:100%" type="primary">登录</el-button>
</el-form-item>
</el-form>
</el-card>

    </div>

</template>

<script>
export default {

  data () {
    var func = function (rule, value, callback) {
      // rule是当前的校验规则 没什么用
      // value就是当前表单的字段的值
      if (value) {
        callback()
      } else {
        callback(new Error('您是不是忘了什么吖'))
      }
    }
    return {
      formData: {
        check: false,
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          { required: true, message: '登录手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '验证码不可为空', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '验证码必须为6位数字' }
        ],
        check: [{
          validator: func
        }]
      }
    }
  },
  methods: {
    login () {
      // validate  手动校验表单数据
      // isOK是 当前表单是否通过了校验
      // result是当前的校验结果
      // 后面优化会删除抛异常部分

      this.$refs.loginForm.validate(isOk => {
        if (isOk) {
          console.log('校验成功')
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.formData
          }).then(result => {
            console.log(result.data.data)
            window.localStorage.setItem('user-info', JSON.stringify(result.data.data))
            this.$router.push('/home')
          })
        }
      })
    }
  }
}
</script>
<style lang="less" >
.image{
    margin-left: 100px
}
.moblile{
    margin: 11px;
}
.code{
    margin: 11px;

}
    .bgc{
        background-image: url(../../assets/img/login_bg.jpg);
        width: 100%;
        height: 100vh;
        display: flex;
        background-size: cover;
        justify-content: center;
        align-items: center;
    }
     .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    height: 460px;
    width: 560px;
  }
</style>

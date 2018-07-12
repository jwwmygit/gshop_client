<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:isHide}" @click="isHide=!isHide">短信登录</a>
          <a href="javascript:;" :class="{on:!isHide}" @click="isHide=!isHide">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:isHide}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone" >
              <button  class="get_verification" :class="{right_phone_number:isRightPhone}" @click.prevent="sendCode">
                {{computeTime>0? `已发送(${computeTime})`:'获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!isHide}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input :type="types ?'password':'text'" maxlength="8" placeholder="密码"  v-model="pwd">
                <div class="switch_button " :class="types? 'off':'on'" @click="types=!types">
                  <div class="switch_circle" :class="{right:!types}"></div>
                  <span class="switch_text">{{types ? '...': 'abc'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click.prevent="changeCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" @closeTip="closeTip" v-show="isShowAlert" />
  </section>
</template>
<script>
  import AlertTip from '../../components/AlertTip/AlertTip.vue'
  import {reqPwdLogin,reqSendCode,reqSmsLogin} from '../../api'
    export default {
      data(){
        return{
          isHide:true,//短信登录和密码登录切换
          phone:"",//电话号码
          computeTime: 0,
          types:true,//点击显示密码
          code:"",
          pwd:"",
          captcha:'',
          name:'',
          isShowAlert:false,
          alertText:""

        }
      },
      components:{
        AlertTip
      },
      computed:{
        isRightPhone(){
//          console.log(/^1\d{10}$/.test(this.phone))
          return /^1\d{10}$/.test(this.phone)
        }
      },
      methods:{
        async sendCode(){
//          判断是正确的手机号点击事件才生效并且没有倒计时
          if(this.isRightPhone&&this.computeTime===0){
            this.computeTime=30;
//            每隔一秒减少一个数
            const intevalId=setInterval(()=>{
              this.computeTime--;
              if(this.computeTime===0){
                clearInterval(intevalId)
              }
            },1000)
            //发送请求
            const result=await reqSendCode(this.phone);
            if(result.code===1){
              this.showTip(result.msg)
              this.computeTime=0
            }else {
              console.log('发送成功')
            }
          }
        },
        closeTip(){
          this.isShowAlert = false
          this.alertText = ''
        },
        showTip(text){
          this.isShowAlert = true
          this.alertText =text
        },
        async login(){
        //进行表单验证
          let result;
            if(this.isHide){//短信验证
              const {phone,code,isRightPhone}=this
               if(!isRightPhone){
                 this.showTip('请输入正确手机号')
                 return
               }else if(!/^\d{6}/.test(code)){
                 this.showTip('请输入正确验证码')
                 return
               }
                //短信验证登录，发送请求
               result=await reqSmsLogin(phone,code)

            }else {
              const {name, pwd, captcha} = this
              if(!name) { // 用户名
                this.showTip('请输,入用户名')
                return
              } else if(!pwd) { // 密码
                this.showTip('请输入密码')
                return
              } else if(!captcha) { // 图片验证码
                this.showTip('请输入验证码')
                return
              }
              //密码验证登录，发送请求
              result=await reqPwdLogin(name,pwd,captcha)
              if(result.code===1){
              //密码登录失败后重新更新图片验证码
                this.changeCaptcha()
              }
            }
         //根据数据结果进行处理
          if(result.code===1){
              this.showTip(result.msg)
          }else {
            //登录成功
            const user=result.data;
            //保存数据到vuex中
            this.$store.dispatch('saveUser',user);
            //返回主页
            this.$router.replace('/profile')
          }
            },
        changeCaptcha(){
          this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now();
        }


          }
    }

</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                outline none
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

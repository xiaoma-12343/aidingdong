<template>
    <div id="login">
        <div class="login">
            <h1>绑定手机号</h1>
            <div class="login-input">
                <div class="login-phone">
                    <input pattern="\d*" v-model="phoneNumber" type="number" placeholder="请输入您的手机号">
                    <!-- <span v-if="isshow" @click="getCode">获取验证码</span>
                    <span v-if="!isshow">{{s}}秒后获取</span> -->
                </div>
                <!-- <div class="login-code">
                    <input pattern="\d*" v-model="binddingCode" type="number" placeholder="请输入验证码">
                </div> -->
                <van-button @click="binddingMobile">绑定手机号</van-button>
            </div>
            <!-- <div class="login-pact">
                <p>登录注册代表同意<span><span @click="agreement(1)">用户注册协议</span></span></p>
            </div> -->
        </div>


    </div>
</template>

<script>
import api from '../../api/index.js'
export default {
    name:'login',
    data() {
        return {
            s:60,
            isshow:true,
            phoneNumber:'',
            binddingCode:'',
            auths:!window.localStorage.getItem('auths') ? null : JSON.parse(window.localStorage.getItem('auths')),
            oauth:null,
            showAgreement: false,       // 是否展示协议弹窗
            agreement_title: '',
            agreementDetail: '',        // 协议内容
            params: null
        }
    },
    created(){
        // console.log('this.params', this.$route.query)
        this.params = this.$route.query.params;


    },
    methods: {
        /**
         * 点击绑定手机号
         */
        binddingMobile(){
            this.params.phone = this.phoneNumber;
            this.params.code = this.binddingCode;

            // console.log('this.params'+this.params)

            if(this.params.type == 1){
                // 微信登录绑定手机号
                this.wechatLogin();
            }else{
                // QQ绑定手机号
                this.qqLogin();
            }
        },

        /**
         * 修改验证码
         */
        async getCode(){
            if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))) return this.$toast("请输入正确的手机号");
            this.isshow = false;
            const {data:ret} = await this.$http.post(this.setApi + api.getcode,this.querystring.stringify({mobile:this.phoneNumber, type: 2}));
            // console.log(ret)
            var time = setInterval(() => {
                if(this.s<=0){
                    this.s = 5;
                    this.isshow = true;
                    return clearInterval(time);
                }
                this.s--;
            }, 1000);
        },

        /**
         * 微信登录
         */
        async wechatLogin(){
            const {data:ret} = await this.$http.post(this.setApi + api.wechatLogin,this.querystring.stringify(this.params));
            // console.log('wechat'+JSON.stringify(ret));
            if(!ret.response_data.access_token){
              this.$toast('微信授权失败');
              return;
            } else{
              window.localStorage.setItem('token',ret.response_data.access_token);
              this.$router.replace('/my');
              this.$toast('登录成功');
            }

        },

        /**
         * qq 登录
         */
        async qqLogin(){
            
            const {data:ret} = await this.$http.post(this.setApi + api.qqLogin,this.querystring.stringify(this.params));
            // console.log('qq'+JSON.stringify(ret));
            if(!ret.response_data.access_token){
              this.$toast('QQ授权失败');
              return
            } else{
              window.localStorage.setItem('token',ret.response_data.access_token);
              this.$router.replace('/my');
              this.$toast('登录成功');
            }

        }


    },
}
</script>

<style lang="less" scoped>
@import url('./login.less');
.agreement-content {
    padding: 1.875rem 1.25rem;
    color: #333;
    width: 18.75rem;
    padding-top: .625rem;
    // max-height: 37.5rem;
    max-height: 30rem;
    position: relative;
}
.agreement-content .close {
    // position: fixed;
    // bottom: 1.25rem;
    // left: 50%;
    // transform: translateX(-50%);
    // border-radius: 50%;
    background: #fff;
    width: 1.875rem;
    height: 1.875rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.agreement-content .close img {
    display: block;
    width: 100%;
    height: auto;
}
.agreement-content h3 {
    font-weight: 400;
    text-align: center;
    margin: 1rem 0;
    font-size: 1.125rem;
}
.close-f {
    display: flex;
    justify-content: flex-end;
    padding: .625rem  1.25rem;
    // padding-top: 1.25rem;
}
.van-popup {
    border-radius: .375rem;
    box-sizing: border-box;
    // position: relative;
}
.agreement-txt {
    text-align: justify;
    padding-bottom: 1.25rem;
}
</style>

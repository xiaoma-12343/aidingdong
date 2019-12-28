<template>
    <div id="login">
        <div class="login">
            <h1>登录</h1>
            <div class="login-input">
                <div class="login-phone">
                    <input pattern="\d*" v-model="phoneNumber" type="number" placeholder="请输入您的手机号">
                    <span v-if="isshow" @click="getCode">获取验证码</span>
                    <span v-if="!isshow">{{s}}秒后获取</span>
                </div>
                <div class="login-code">
                    <input pattern="\d*" v-model="loginCode" type="number" placeholder="请输入验证码">
                </div>
                <van-button @click="Login">登录</van-button>
            </div>
            <div class="login-three">
                <p>第三方登录</p>
                <ul class="flex flex--justify-content--space-between">
                    <li @click="getLogin('weixin');oauth='weixin'">
                        <i class="icon-wechat"></i>
                        <p>微信</p>
                    </li>
                    <li @click="getLogin('qq');oauth='qq'">
                        <i class="icon-qq"></i>
                        <p>qq</p>
                    </li>
                </ul>
            </div>
            <div class="login-pact">
                <p>登录注册代表同意<span><span @click="agreement(1)">用户注册协议</span></span></p>
            </div>
        </div>

        <!-- 显示协议弹窗 -->
        <van-popup v-model="showAgreement">
            <div class="agreement-content">
                <!-- <h3>{{agreement_title}}</h3> -->
                <!-- <div class="close-f">
                    <div class="close">
                        <img src="../../assets/icon/close.png" alt="">
                    </div>
                </div> -->
                <div class="agreement-txt" v-html="agreementDetail"></div>
            </div>
        </van-popup>





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
            loginCode:'',
            auths:!window.localStorage.getItem('auths') ? null : JSON.parse(window.localStorage.getItem('auths')),
            oauth:null,
            showAgreement: false,       // 是否展示协议弹窗
            agreement_title: '',
            agreementDetail: '',        // 协议内容
            weixinParams: null,         // 微信登录参数
            qqParams: null              // qq登录参数
        }
    },
    created(){
        this.getAgreement(9);
    },
    methods: {
        /**
         * 查看协议
         * @param {*} type  1 表示用户协议  2 表示隐私政策
         */
        agreement(type){
            this.showAgreement = true;
            if(type == 1){
                // 用户协议
                this.agreement_title = '用户注册协议';
                this.getAgreement(9);
            }else{
                // 隐私政策
                this.agreement_title = '隐私政策';
                this.getAgreement(9);
            }
        },
        // 

        /**
         * 获取协议内容
         * @param {*} type  1同意赛事免责声明,2关于爱叮咚,3裁判评分说明,4支付协议,5邀请好友规则说明,6支付说明,7会员权益,8客服电话,9用户注册协议(默认type值为1)
         */
        async getAgreement(type){
            const {data:ret} = await this.$http.post(this.setApi + api.statement,this.querystring.stringify({type}));
            if(!ret.error_code){
                this.agreementDetail = this.escape2Html(ret.response_data.content);
            }
            // console.log(ret);
        },

        // 逻辑
        // 获取验证码
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
        // 登录
        async Login(){
            if(!(/^1[34578]\d{9}$/.test(this.phoneNumber))) return this.$toast("请输入正确的手机号");
            const {data:ret} = await this.$http.post(this.setApi + api.login,this.querystring.stringify({mobile:this.phoneNumber,code:this.loginCode}));
            // console.log(ret.response_data.access_token);
            var token = window.localStorage.setItem('token',ret.response_data.access_token);
            this.$toast('登录成功');
            this.$router.push('/my');
        },

        // wechatLogin
        // 获取登录授权列表
        getLogin(type){
            // 测试
            // this.$router.push({
            //     path: '/bindingMobile',
            //     query: {
            //         params: {
            //             type: 1
            //         }
            //     }
            // });
            // return
            // var aweixin = null
            // var auths = null
            // alert(JSON.stringify(this.auths))
            plus.oauth.getServices(success=>{
                // plus.nativeUI.alert('执行1111' + JSON.stringify(success));
              // alert(JSON.stringify(success))
                this.auths = success
                window.localStorage.setItem('auths',JSON.stringify(success))
                // this.auths = success['weixin']
                // plus.nativeUI.alert(`获取${type}登录成功${JSON.stringify(success)}`)
                this.$toast(`正在获取${type == 'weixin' ? '微信' : 'QQ'}登录...`)

                this.oauthLogin(type)
            },error=>{
                plus.nativeUI.alert("获取登录授权服务列表失败："+JSON.stringify(error));
            })

            // document.addEventListener('plusready',plusReady,false);
            // document.addEventListener('plusready',plusReady,false);
            // 登录认证
        },
        // 获取登录认证
        oauthLogin(type){

            // plus.nativeUI.alert('执行1111' + type);

            var s ;
            this.auths.forEach((item,index)=>{
                if(this.auths[index].id == type){
                    s = this.auths[index]
                }
            })
            if(!s.authResult){
                s.login(res=>{
                    // plus.nativeUI.alert('s.login'+JSON.stringify(res))
                    // plus.nativeUI.alert(JSON.stringify(s.userInfo.openid))
                    // console.log(JSON.stringify(s),JSON.stringify(res))
                    // plus.nativeUI.alert(JSON.stringify(s.userInfo.headimgurl))
                    // plus.nativeUI.alert(JSON.stringify(s.userInfo.sex))
                    this.authUserInfo(type);
                },error=>{
                    plus.nativeUI.alert('error'+JSON.stringify(error));
                })
            }else{
                // plus.nativeUI.alert('执行22222');
                this.authUserInfo(type);
                // this.$toast('已授权登录')
                // this.$router.replace('/my')
            }
        },
        // 获取授权用户信息
        authUserInfo(type){
            // plus.nativeUI.alert('执行3333');
            var s;
            this.auths.forEach((item,index)=>{
                if(this.auths[index].id==type){
                    s = this.auths[index]
                }
            })
            if(s.authResult){
                // plus.nativeUI.alert('this.oauth', this.oauth)
                // plus.nativeUI.alert('1111'+JSON.stringify(s))
                s.getUserInfo(res=>{
                    // plus.nativeUI.alert('2222'+JSON.stringify(res))
                    // plus.nativeUI.alert('userInfos'+JSON.stringify(s.userInfo))
                    // plus.nativeUI.alert('userInfos'+JSON.stringify(s.authResult))
                    // console.log(s.userInfo.openid,s.userInfo.nickname,s.userInfo.sex,s.userInfo.headimgurl)

                    // 跳转页面
                    // this.$router.push({
                    //     path: '/bindingMobile',
                    //     query: {

                    //     }
                    // })
                    // this.oauth == 'weixin' ? this.wechatLogin(s.userInfo.openid,s.userInfo.headimgurl,s.userInfo.sex) : this.qqLogin(s.authResult.openid,s.userInfo.figureurl,s.userInfo.gender == '男' ? '2' : '3');
                    
                    this.weixinParams = {
                        wx_openid: s.userInfo.openid,
                        head: s.userInfo.headimgurl,
                        sex: s.userInfo.sex
                    }

                    this.qqParams = {
                        qq_openid: s.authResult.openid,
                        head: s.userInfo.figureurl,
                        sex: s.userInfo.gender == '男' ? '2' : '3'
                    }
                    
                    let type = this.oauth == 'weixin' ? 1 : 2;
                    let openid = this.oauth == 'weixin' ? s.userInfo.openid : s.authResult.openid;

                    this.checkBingMobile(type, openid);

                },error=>{
                    plus.nativeUI.alert(JSON.stringify(error));
                })
            }
        },

        /**
         * 微信登录
         */
        async wechatLogin(wx_openid,head,sex){
            // plus.nativeUI.alert('进入微信登录')
            const {data:ret} = await this.$http.post(this.setApi + api.wechatLogin,this.querystring.stringify(this.weixinParams));
            // console.log('wechat',ret,JSON.stringify(ret));
            // plus.nativeUI.alert('wechat'+JSON.stringify(ret))
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
        async qqLogin(qq_openid,head,sex){
            // plus.nativeUI.alert('进入QQ登录')
            const {data:ret} = await this.$http.post(this.setApi + api.qqLogin,this.querystring.stringify(this.qqParams));
            // plus.nativeUI.alert('QQ'+JSON.stringify(ret))
            // console.log('qq',ret,JSON.stringify(ret));
            if(!ret.response_data.access_token){
              this.$toast('QQ授权失败');
              return
            } else{
              window.localStorage.setItem('token',ret.response_data.access_token);

              this.$router.replace('/my');
              this.$toast('登录成功');
            }

        },

        /**
         * 检测第三方账号有没有绑定过手机号
         */
        async checkBingMobile(type, openid){
            let params = {
                type,
                openid
            }
            // console.log('去检测'+JSON.stringify(params) )
            const {data:ret} = await this.$http.post(this.setApi + api.third_is_band,this.querystring.stringify(params));

            // console.log('检测'+JSON.stringify(ret));

            if(!ret.error_code){
                if(ret.response_data){
                    // 跳转登录
                    this.oauth == 'weixin' ? this.wechatLogin() : this.qqLogin();

                }else{
                    // 跳转到绑定手机号页面
                    let tempParams = this.oauth == 'weixin' ? this.weixinParams : this.qqParams;
                    tempParams.type =  type;
                    this.$router.push({
                        path: '/bindingMobile',
                        query: {
                            params: tempParams
                        }
                    });

                }

            }else{

            }

        },
        


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

<template>
    <div id="msg">
        <head-back :showback="false">
            <span class="head-title">
                消息
            </span>
        </head-back>

        <div class="msg" >
            <ul class="options flex flex--justify-content--space-between flex--align-items--center">
                <li @click="checkIsLogin(item.path)" v-for="(item, index) in optionList" :key="index">
                    <img :src="item.icon" alt="">
                    <p>{{item.name}}</p>
                </li>
            </ul>
            <!-- 赛事通知 -->
            <ul class="event-msg" v-if="token">
                <li class="flex flex--justify-content--space-between flex--align-items--center" @click="jumUrl(1)">
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <img src="../../assets/icon/game.png" alt="">
                        <p>您报名的XXX审核通过，请上传比赛作品</p>
                    </div>
                    <i class="iconfont icon-youjiantou"></i>
                </li>
                <li class="flex flex--justify-content--space-between flex--align-items--center" @click="jumUrl(2)">
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <img src="../../assets/icon/kaoshi.png" alt="">
                        <p>您报名的XXX考试答题已开始，请前去答题</p>
                    </div>
                    <i class="iconfont icon-youjiantou"></i>
                </li>
            </ul>
            <!-- 消息列表 -->
            <ul class="info-msg">
                <li v-for="(item, index) in 0" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <img src="../../assets/avator.jpg" alt="">
                        <div>
                            <p>ying十一</p>
                            <span>欢迎来到爱叮咚</span>
                        </div>
                    </div>
                    <span class="create-time">2019-2-19</span>
                </li>
            </ul>


            <!-- 登录提示弹窗 -->
            <van-popup v-model="showModle">
                <div class="login-modle flex flex--row flex--align-items--center">
                    <div class="login-content flex flex--justify-content--center">
                        尊敬的爱叮咚用户，请您先登录
                    </div>
                    <div class="login-btn flex flex--justify-content--space-between">
                        <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(1)">去首页</a>
                        <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(2)">去登录</a>
                    </div>
                </div>
            </van-popup>


        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'

import fans from '../../assets/icon/fans.png'
import dianzan from '../../assets/icon/star.png'
import message from '../../assets/icon/message.png'
import lianxi from '../../assets/icon/concatPeople.png'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            optionList:[
                {
                    name:'粉丝',
                    icon:fans,
                    path:'/msg/fans'
                },{
                    name:'点赞',
                    icon:dianzan,
                    path:'/msg/start'
                },{
                    name:'评论',
                    icon:message,
                    path:'/msg/pinglun'
                },{
                    name:'联系人',
                    icon:lianxi,
                    path:'/msg/firend'
                }
            ],
            token: '',
            showModle: false,       // 是否展示登录提示
        }
    },
    created(){
        this.token = window.localStorage.getItem('token');
        if(!this.token){
            this.showModle = true;
        }
    },
    methods: {
        /**
         * 先检测是否登录，然后再依据情况跳转
         */
        checkIsLogin(path){
            let token = window.localStorage.getItem('token');
            if(token){
                this.$router.push(path);
            }else{
                this.showModle = true;
            }
        },
        /**
         * 跳转连接
         * @param {*} type  [1表示返回，2表示去登录]
         */
        goJumpUrl(type){
            this.showModle = false
            if(type == 1){
                this.$router.push('/');
            }else{
                this.$router.push('/login');
            }
        },
        /**
         * 跳转页面
         * @params {*} type 跳转类型
         */
        jumUrl(type){
            
            let token = window.localStorage.getItem('token');
            
            if(!token){
                
                this.$toast('请先登录');
                return 
            }

            let path = '';
            
            if(type == 1){
                path = '/my/event'
            }else{
                path = '/exam'
            }

            this.$router.push({
                path
            })
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./msg.less');
.van-tabs__line {
  display: none !important;
}
.van-popup {
  border-radius: 10px;
}
.login-modle {
  width: 16.875rem;
  padding: 1.25rem;
}
.login-content {
  font-size: 1rem;
  padding: 1.875rem 0;
}
.login-btn a {
  width: 6.25rem;
  height: 1.875rem;
  border-radius: .375rem;
  box-sizing: border-box;
}
.login-btn a:first-child {
  background: #fff;
  color: #0eaf0a;
  border: 1px solid #0eaf0a; 
  margin-right: 2rem;
}
.login-btn a:last-child {
  background: #0eaf0a;
  color: #fff;
}
</style>


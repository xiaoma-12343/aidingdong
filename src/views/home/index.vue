<template>
    <div id="index">
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
        <!-- 参与、发布、入住功能 -->
        <transition name="fade">
            <div v-if="tabId == 2" class="join">
                <div>
                    <ul class="joinButton flex flex--wrap flex--justify-content--start">
                        <li @click="goTo(item.path)" v-for="(item, index) in joinList" :key="index">
                            <img :src="item.icon" alt="">
                            <p>{{item.name}}</p>
                        </li>
                    </ul>
                    <div @click="tabId = 1"><img src="../../assets/icon/join/icon-close.png" alt=""></div>
                </div>
            </div>
        </transition>
            <!-- switchTab -->
        <ul class="footer-tab flex">
            <li class="flex flex--align-items--center" @click="switchTab(index,item.path)" v-for="(item, index) in tabList" :key="index">
                <div>
                    <img :src="tabId == index ? item.active : item.icon" alt="">
                    <p>{{item.name}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import iconIndex from '../../assets/icon/tabBar/icon-home.png'
import iconIndexActive from '../../assets/icon/tabBar/tab1_active.png'

import iconLike from '../../assets/icon/tabBar/tab2.png'
import iconLikeActive from '../../assets/icon/tabBar/icon-like-active.png'

import iconAdd from '../../assets/icon/tabBar/icon-add.png'

import iconMsg from '../../assets/icon/tabBar/icon-msg.png'
import iconMsgActive from '../../assets/icon/tabBar/icon-msg-active.png'

import iconMy from '../../assets/icon/tabBar/icon-my.png'
import iconMyActive from '../../assets/icon/tabBar/icon-my-active.png'

import iconTopic from '../../assets/icon/join/icon-topic.png'
import iconEvent from '../../assets/icon/join/icon-event.png'
import iconYuyue from '../../assets/icon/join/icon-yuyue.png'
import iconKaoshi from '../../assets/icon/join/icon-kaoshi.png'
import iconRuzhu from '../../assets/icon/join/icon-ruzhu.png'
import iconSend from '../../assets/icon/join/icon-send.png'
export default {
    data() {
        return {
            tabId:!window.sessionStorage.getItem('TabId') ? 0 : window.sessionStorage.getItem('TabId'),
            tabList:[
                {
                    name:'首页',
                    icon:iconIndex,
                    active:iconIndexActive,
                    path:'/'
                },{
                    name:'关注',
                    icon:iconLike,
                    active:iconLikeActive,
                    path:'attention'
                },{
                    name:'',
                    icon:iconAdd,
                    active:iconAdd,
                    path:''
                },{
                    name:'消息',
                    icon:iconMsg,
                    active:iconMsgActive,
                    path:'message'
                },{
                    name:'我的',
                    icon:iconMy,
                    active:iconMyActive,
                    path:'my'
                }
            ],
            joinList:[
                {
                    name:'话题',
                    icon:iconTopic,
                    path:'/topic/send'
                },
                {
                    name: '赛事',
                    icon:iconEvent,
                    path:'/event'
                },
                // {
                //     name: '预约',
                //     icon:iconYuyue,
                //     path:'/reserve'
                // },
                {
                    name: '考试',
                    icon:iconKaoshi,
                    path:'/exam'
                },
                {
                    name: '入驻',
                    icon:iconRuzhu,
                    path:'/optType'
                },
                {
                    name: '发布作品',
                    icon:iconSend,
                    path:'/my/sends'
                }
            ]
        }
    },
    methods: {

        // 跳转参与功能
        goTo(path){
            this.$router.push(path)
            window.sessionStorage.setItem('TabId',0)
        },

        // 切换底部tab栏
        switchTab(index,path){
          this.tabId = index
          this.$router.replace(path),
          window.sessionStorage.setItem('TabId',index)
        }  
    },
}
</script>


<style lang="less" scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}

.join{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(255, 255, 255, .9);
    width: 100%;
    z-index: 3;
    padding: 0 2.875rem;
    >div{
        position: absolute;
        bottom: 4.4375rem;
        // bottom: -25.3125rem;
        >div{
                position: absolute;
                left: 50%;
                transform: translateX(-156%);
            >img{
                width: 1.375rem;
            }
        }
    }
    .joinButton{
        li{
            margin-right: 2.25rem;
            margin-bottom: 1.375rem;
            text-align: center;
            color: #575757;
            font-size: .8125rem;
            img{
                width: 4.375rem;
            }
        }
        li:nth-child(3n){
            margin-right: 0;
        }
    }
}
.footer-tab{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 3.0625rem;
    // border: 1px solid red;
    background: #fff;
    border-top: .0625rem solid #eee; 
    color: #4A4A4A;
    font-size: .625rem;
    text-align: center;
    div{
        width: 100%;
    }
    img{
        width: 1.5625rem;
    }
    li{
        flex: 1;
        flex-shrink: 0;
    }
    li:nth-child(3){
        position: relative;
        top: -0.4375rem;
        img{
            width: 2.875rem;
        }
    }
}
</style>


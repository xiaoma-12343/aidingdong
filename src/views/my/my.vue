<template>
    <div class="my">
        <!-- <TabBar></TabBar> -->
        <div class="header oneLineBetween">
            <div class="imgBox" @click="goTo('/my/seting')">
                <!-- <img class="coverImg" src="../../assets/icon/my/setting_header.png" alt> -->
                <p>设置</p>
            </div>
            <!-- <router-link to="/message">
        <div class="imgBox">
          <img class="coverImg" src="../../assets/icon/my/message_header.png" alt>
        </div>
            </router-link>-->
            <div></div>
        </div>
        <div class="content">
            <div class="avator" @click="goTo(`/mypage/${userInfo.id}`)">
                <img class="coverImg" :src="userInfo.head" alt />
            </div>
            <div class="userInfo columnBetween">
                <div class="name">{{userInfo.nickname}}</div>
                <div class="account signature">{{userInfo.signature}}</div>
                <div class="account">叮咚号：{{userInfo.username}}</div>
            </div>
        </div>
        <div class="mainTabs">
            <div class="plusBox oneLineBetween" v-if="userInfo.is_plus == 1">
                <div class="introduce">您已是<span class="vip">VIP</span>用户，到期时间为：{{userInfo.stop_date | dateFilter}}</div>
                <div class="open xufei" @click="goTo('/my/openvip')">立即续费</div>
            </div>

            <div class="plusBox oneLineBetween" v-else>
                <div class="introduce">所有作品免费观看VIP会员平均可省60元</div>
                <div class="open" @click="goTo('/my/vip')">立即开通></div>
            </div>

            <div class="tabs oneLineBetween">
                <!-- 暂时屏蔽掉 -->
                <!-- <div class="tab columnBetween" @click="goTo('/reserve')">
                <img src="../../assets/icon/my/onLineTab1.png" alt>
                <span>学习预约</span>
                </div>-->
                <router-link to="/event" class="tab" :style="{'height':'100%','margin-top':'0'}">
                    <div class="tab columnBetween">
                        <img src="../../assets/icon/my/onLineTab1.png" alt />
                        <span>热门赛事</span>
                    </div>
                </router-link>
                <div class="tab columnBetween" @click="goTo('/exam')">
                    <img src="../../assets/icon/my/onLineTab3.png" alt />
                    <span>文学考试</span>
                </div>
            </div>
        </div>
        <!-- 我参与的 -->
        <div class="myJoin">
            <div class="title">我参与的</div>
            <div class="joinTabs oneLineBetween">
                <div class="tab columnBetween" @click="goTo('/my/event')">
                    <div class="iconBox">
                        <img class="coverImg" src="../../assets/icon/my/secondLineTab1.png" alt />
                    </div>
                    <span>赛事</span>
                </div>
                <div class="tab columnBetween" @click="goTo('/my/exam')">
                    <img src="../../assets/icon/my/secondLineTab2.png" alt />
                    <span>考试</span>
                </div>
                <div @click="goTo('/topic')" class="tab columnBetween">
                    <img src="../../assets/icon/my/secondLineTab3.png" alt />
                    <span>帖子</span>
                </div>
                <router-link to="/my/event/score" class="tab">
                    <div class="tab columnBetween">
                        <img src="../../assets/icon/my/secondLineTab4.png" alt />
                        <span>评分</span>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="gap myJoin_bottom"></div>
        <!-- 我的服务 -->
        <div class="myService">
            <div class="title">我的服务</div>
            <div class="serviceTabs flex f-wrap">
                <div class="tab columnBetween" @click="goTo('/my/order')">
                    <img src="../../assets/icon/my/serviceTab1.png" alt />
                    <span>订单</span>
                </div>
                <div class="tab columnBetween" @click="goTo('/my/gold')">
                    <img src="../../assets/icon/my/serviceTab2.png" alt />
                    <span>余额</span>
                </div>

                <!-- <div class="tab columnBetween" @click="$router.push('/my/gold/integral')">
                    <img src="../../assets/icon/my/serviceTab3.png" alt />
                    <span>积分</span>
                </div> -->
                <!-- <div class="tab columnBetween">
                  <img src="../../assets/icon/my/serviceTab4.png" alt>
                  <span>优惠券</span>
                </div>
                <div class="tab columnBetween">
                  <img src="../../assets/icon/my/serviceTab5.png" alt>
                  <span>邀请有礼</span>
                </div>-->
                <div class="tab columnBetween" @click="goTo('/optType')">
                    <img src="../../assets/icon/my/serviceTab7.png" alt />
                    <span>入驻</span>
                </div>
                <!-- <div class="tab columnBetween" @click="goTo(userInfo.type != 3 ?'/my/coach' : '/my/teaching')">
                  <img src="../../assets/icon/my/serviceTab6.png" alt>
                  <span>{{userInfo.type != 3 ? '个人入驻' : '教学管理'}}</span>
                </div>-->
                <div class="tab columnBetween" @click="goTo('/buyLists?type=2')">
                  <img src="../../assets/icon/my/yaoqing.png" alt>
                  <span>邀请</span>
                </div>
                <div class="tab columnBetween" @click="goTo('/reward')">
                  <img src="../../assets/icon/my/reward.png" alt>
                  <span>打赏</span>
                </div>

                <div class="tab columnBetween" @click="goTo('/buyLists?type=1')">
                  <img src="../../assets/icon/my/buy_lists.png" alt>
                  <span>交易</span>
                </div>
                <div class="tab columnBetween" @click="goTo('/collection')">
                  <img src="../../assets/icon/my/collection.png" alt>
                  <span>收藏</span>
                </div>
                <div class="tab columnBetween" @click="openCustomer">
                    <a style="width:100%;height:100%;" href="javaScript:void(0)" class="flex flex--row columnBetween">
                        <img src="../../assets/icon/my/kefu.png" alt />
                        <span>客服</span>
                    </a>
                </div>

            </div>
        </div>

        <van-popup v-model="exceptSpecies">
            <div class="modle flex dashang flex--row">
                <h5>客服热线</h5>
                <ul class="flex flex--row">
                    <li
                        v-for="(item,index) in customLists"
                        v-if="item"
                        :key="index"
                        class="flex flex--align-items--center"
                    >
                        <!-- <span>{{index + 1}}：</span> -->
                        <a :href="'tel:' + item">{{item}}</a>

                        <a :href="'tel:' + item" class="call-phone">拨打</a>
                    </li>
                </ul>
            </div>
        </van-popup>

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
</template>
<script>
import { TabBar } from "@/components";
import api from "@/api/index.js";
export default {
    components: {
        TabBar
    },
    created() {
        // var local = window.localStorage
        // if(!local.getItem('token')) return this.$router.push('/login') , this.$toast("请先登录")
        // if(!local || userInfo =='undefined') return window.localStorage.removeItem('token'),window.localStorage.removeItem('userInfo');

        // this.getUserInfo();

        // 获取客服电话
        this.getCustomer();
    },
    beforeRouteEnter(to, from, next) {
        // var local = window.localStorage.getItem('token');
        // var userInfo = window.localStorage.getItem('userInfo');
        // // console.log(to,from)
        // if(to.path == '/login') return next('/login');
        // if(!local || userInfo =='undefined') return next(vm=>{
        //   window.localStorage.removeItem('userInfo');
        //   window.localStorage.removeItem('token');
        //     vm.$toast("请先登录");
        //     next('/login');
        // });

        next(vm => {
            vm.getUserInfo();
        });
    },
    data() {
        return {
            userInfo: {},
            token: window.localStorage.getItem("token"),
            exceptSpecies: false,
            customLists: [],
            showModle: false,       // 是否展示弹窗
        };
    },
    methods: {
        /**
         * 点击展示弹窗选择客服电话
         */
        openCustomer() {
            this.exceptSpecies = true;
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
         * 获取客服电话
         */
        async getCustomer() {
            const { data: ret } = await this.$http.post(
                this.setApi + api.statement,
                this.querystring.stringify({ type: 8 })
            );
            // console.log('retreteretreteretrete', ret);
            if (!ret.error_code) {
                this.customLists = ret.response_data.content;
            }
        },

        /**
         * 跳转页面
         */
        goTo(path) {
            if (!this.token || this.token == "undefined")
                return this.$router.push(path);
            this.$router.push(path);
        },

        /**
         * 获取个人资料
         */
        async getUserInfo() {
            const { data: ret } = await this.$http.post(
                this.setApi + api.userInfo,
                this.querystring.stringify({
                    access_token: window.localStorage.getItem("token")
                })
            );

            window.localStorage.setItem(
                "userInfo",
                JSON.stringify(ret.response_data)
            );

            // console.log(ret.response_data);

            // alert(JSON.stringify(ret.response_data))

            // console.log('userInfouserInfouserInfouserInfo', JSON.parse(JSON.stringify(ret.response_data)));
            if (!ret.error_code) {
                this.userInfo = ret.response_data;
            } else {
                // 展示弹窗
                this.showModle = true;

                // this.$router.push({
                //     path: "/"
                // });
            }
        }
    }
};
</script>
<style lang="scss" scoped>

@mixin Title {
    height: 2.8125rem;
    line-height: 2.8125rem;
    padding-left: 0.875rem;
    font-size: 0.9375rem;
    font-family: PingFang-SC-Bold;
    font-weight: bold;
    color: rgba(74, 74, 74, 1);
}
.my {
    position: relative;
    padding-bottom: 3.4375rem;
    .header {
        height: 2.75rem;
        width: 100%;
        background: #312f32;
        box-sizing: border-box;
        padding: 0 0.875rem;
        .imgBox {
            // width: 1.25rem;
            color: #fff;
            height: 1.375rem;
            &:last-child {
                width: 1.4375rem;
            }
        }
    }
    .content {
        position: relative;
        margin-top: -0.625rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 10.25rem;
        width: 100%;
        background: #312f32;
        a {
            margin-top: 0;
        }
        .avator {
            width: 4rem;
            height: 4rem;
            img {
                border-radius: 50%;
            }
        }
        .userInfo {
            margin-top: 0.385rem;
            .name {
                height: 1.0625rem;
                font-size: 1rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
            }
            .account {
                margin-top: 0.5625rem;
                height: 0.625rem;
                font-size: 0.625rem;
                font-family: PingFang-SC-Medium;
                font-weight: 500;
                color: rgba(238, 238, 238, 1);
                opacity: 0.6;
            }
        }
    }
    .mainTabs {
        position: absolute;
        top: 10.925rem;
        left: 0.875rem;
        box-sizing: border-box;
        width: 21.6875rem;
        height: 7.8125rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0.0625rem 0.375rem 0 rgba(0, 0, 0, 0.16);
        border-radius: 0.375rem;
        .plusBox {
            height: 2.5625rem;
            line-height: 1;
            font-size: 0.75rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            box-sizing: border-box;
            margin: 0 0.9375rem 0 0.875rem;
            border-bottom: 0.0625rem dashed rgba(238, 238, 238, 1);
            .introduce {
                color: rgba(102, 102, 102, 1);
            }
            .open {
                color: #0eaf0a;
            }
        }
        .tabs {
            width: 100%;
            .tab {
                position: relative;
                flex: 1;
                margin-top: 1.0625rem;
                height: 3.125rem;
                &:nth-child(-1n + 2)::after {
                    position: absolute;
                    right: 0;
                    top: 0.625rem;
                    content: "";
                    width: 0.0625rem;
                    height: 1.25rem;
                    background: rgba(238, 238, 238, 1);
                }

                img {
                    width: 1.3125rem;
                    height: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                span {
                    height: 0.8125rem;
                    font-size: 0.8125rem;
                    font-family: PingFangSC-Regular;
                    font-weight: 400;
                    color: rgba(77, 77, 77, 1);
                }
            }
        }
    }
    .myJoin {
        margin-top: 6rem;
        height: 6.6875rem;
        box-sizing: border-box;
        .title {
            @include Title;
        }
        .joinTabs {
            .tab {
                flex: 1;
                height: 3rem;
                .iconBox {
                    width: 1.25rem;
                    height: 1.25rem;
                }
                img {
                    width: 1.25rem;
                    height: 1.25rem;
                }
                span {
                    height: 0.8125rem;
                    font-size: 0.8125rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }
    .myJoin_bottom {
        height: 0.625rem;
    }
    .myService {
        padding-bottom: 3.125rem;
        position: relative;
        .title {
            @include Title;
        }
        .serviceTabs {
            // &::after {
            //   position: absolute;
            //   top: 6.5625rem;
            //   width: 100%;
            //   height: .0625rem;
            //   background: rgba(238, 238, 238, 1);
            //   content: "";
            // }
            height: 8rem;
            .tab {
                width: 25%;
                height: 3rem;
                padding-bottom: 0.9375rem;
                &:nth-last-child(-n + 4) {
                    // padding-top: 0.9375rem;
                }
                &:nth-child(4) img {
                    width: 1.375rem;
                    height: 1.125rem;
                }
                &:nth-child(6) img {
                    width: 1.25rem;
                    height: 1.25rem;
                }
                .iconBox {
                    width: 1.25rem;
                    height: 1.25rem;
                }
                img {
                    width: 1.25rem;
                    height: 1.25rem;
                    margin-bottom: 0.5625rem;
                }
                span {
                    height: 0.8125rem;
                    font-size: 0.8125rem;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                }
            }
        }
    }
}
.modle {
    padding: 1.25rem;
    width: 18.75rem;
    box-sizing: border-box;
}
.modle li {
    padding-left: .875rem;
    display: flex;
    justify-content: space-between;
}
.modle li a {
    color: #333;
    padding: 0.6rem 0;
}
.modle h5 {
    font-size: 18px;
    margin: 1.5rem 0;
    font-weight: 400;
    margin-bottom: .625rem;
    margin-top: 0.4rem;

    text-align: center;
}
.modle li a.call-phone {
    padding: .4rem .6rem;
    background: #0eaf0a;
    color: #fff !important;
    border-radius: .25rem;
    font-size: .875rem;
}
</style>
<style>
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
.xufei {
    font-size: 1rem;
}
span.vip {
    color: #0eaf0a;
    margin: 0 4px;
}
.my .myService .serviceTabs .tab img {
    width: 1.25rem !important;
    height: 1.25rem !important;
}
</style>

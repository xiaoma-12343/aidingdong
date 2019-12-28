<template>
    <keep-alive>
        <div id="home">

            <head-back :color="''">
                <span v-show="true" class="head-title" style="color:#333;">我的收藏</span>
            </head-back>

            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <div class="home" style="padding-top:2.75rem">

                    <!-- 推荐视频 -->
                    <div
                        class="tj-video recommend"
                        v-if="hotVideoLis.length > 0"
                    >
                        
                        <div class="tj-videos">
                            <ul
                                class="tj-vlist flex flex--justify-content--space-between flex--wrap"
                            >
                                <li
                                    class="rela small-video"
                                    @click="goToDetail(item)"
                                    v-for="(item, index) in hotVideoLis"
                                    :key="index"
                                >
                                    <img :src="item.image" alt />

                                    <div
                                        class="charge"
                                        v-if="item.is_charge == 1 && (item.is_vip == 1 || item.is_vip != 1)"
                                    >
                                        <img src="../../../static/image/fufei.png" alt="vip" />
                                    </div>
                                    <div
                                        class="charge"
                                        v-if="item.is_vip == 1 && item.is_charge != 1"
                                    >
                                        <img src="../../../static/image/vip.png" alt="vip" />
                                    </div>
                                    <div
                                        class="charge"
                                        v-if="item.is_vip != 1 && item.is_charge == 0"
                                    >
                                        <img
                                            src="../../../static/image/mianfei.png"
                                            style="display:block;height:22px !important;"
                                            alt="vip"
                                        />
                                    </div>

                                    <div class="like flex flex--align-items--center">
                                        <i class="iconfont icon-like"></i>
                                        {{item.praise}}
                                    </div>
                                    <div class="top-show-img flex flex--align-items--center">
                                        <img :src="item.head" alt />
                                        <span>@{{item.nickname}}</span>
                                    </div>
                                    <div class="user-info">
                                        <p
                                            v-if="item.title"
                                            :class="{'ellipsis11': item.title.length > 10}"
                                        >{{item.title}}</p>
                                        <p
                                            v-if="item.content"
                                            :class="{'ellipsis11': item.content.length > 10}"
                                        >{{item.content}}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div
                    v-show="hotVideoLis.length == 0"
                    class="no-result"
                    style="width:100%;text-align:center;"
                >
                    <h5>暂时没有更多视频</h5>
                </div>

            </van-pull-refresh>


        </div>
    </keep-alive>
</template>

<script>
import api from "../../api";
import Swiper from "swiper";
import HeadBack from '../../components/headback/headback';
import LyTabSecond from "../../components/ly-tab/src/index.vue";

import "./home.less";
var home = document.querySelector("#home");
export default {
    mounted() {
        
    },
    destroyed() {
        
    },
    components: {
        HeadBack,
        LyTabSecond
    },
    created() {
        // 获取首页列表
        // this.getIndexTypeLists();

        this.getHotVideo();

        let token = window.localStorage.getItem("token");

        if (token) {
            this.getUserInfo();
        }

    },
    data() {
        return {
            indexNavLists: [], // 首页分类数组
            indexTypeList: [],
            bannerList: [],
            hotVideoLis: [],
            wushutopic: [],
            zhongyitopic: [],
            Hotnum: 1,
            wsNum: 1,
            tabVideo: {},
            isLoading: false,
            showFiltrate: false,
            screeningCondition: [], // 筛选条件
            classification: [], // 筛选条件
            columnId: 0, // 当前栏目id
            flage: true, // 方式重复请求
            num: 300,
            filterNewArr: [],
            showModle: false, // 是否显示登录弹窗提示
            userInfo: null // 个人信息
        };
    },
    methods: {
        /**
         * 获取收藏视频列表
         */
        async getHotVideo(num = 1) {
            const { data: ret } = await this.$http.post(
                this.setApi + api.shoucang_list,
                this.querystring.stringify({
                    page: num,
                    num: 2000,

                    access_token: window.localStorage.getItem("token")
                })
            );
            // console.log('热门',ret)
            this.hotVideoLis = ret.response_data;
        },

        /**
         * 跳转详情
         */
        goToDetail(item) {
            this.$router.push(`/works/${item.id}`);
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

            if (!ret.error_code) {
                window.localStorage.setItem(
                    "userInfo",
                    JSON.stringify(ret.response_data)
                );
                this.userInfo = ret.response_data;
            }
        },
        /**
         * 跳转连接
         * @param {*} type  [1表示返回，2表示去登录]
         */
        goJumpUrl(type) {
            this.showModle = false;
            if (type == 1) {
                this.$router.push("/");
            } else {
                this.$router.push("/login");
            }
        },
        /**
         * 跳转到修改首页导航页面
         */
        jumpInsert() {
            let token = window.localStorage.getItem("token");
            if (token) {
                this.$router.push("/interst");
            } else {
                // this.$toast("请先登录！");
                this.showModle = true;
            }
        },

        /**
         * 轮播图跳转
         * @param {*} obj
         */
        jumpUrl(obj) {
            let token = window.localStorage.getItem("token");
            if (token) {
                // console.log('------', obj);
                if (obj.type == "1") {
                    // 赛事
                    this.$router.push("/event/details/" + obj.url);
                } else {
                    // 个人介绍视频详情页
                    this.$router.push("/videoDetails?id=" + obj.url);
                }
            } else {
                // this.$toast("请先登录！");
                this.showModle = true;
            }
        },

        /**
         * 打开筛选框
         */
        openScreening() {
            this.showFiltrate = !this.showFiltrate;
        },

        onRefresh() {
            setTimeout(() => {
                console.log('请求接口')
                this.isLoading = false;
            }, 1000);
        },

        switchTab(e, index) {
            if (e.id == -1) {
                return;
            }
            let id = e.id;
            this.columnId = e.id;
            if (id * 1 > 0) {
                this.indexTypeId = index;
            } else {
                this.indexTypeId = 0;

                id = this.indexTypeList[1].id;
            }

            window.sessionStorage.setItem("aidingdong_id", JSON.stringify(e));
            window.sessionStorage.setItem("aidingdong_index", index);

            this.getTabVideo(id);
            this.getBannerList(id);

            // 获取当前分类下的过滤筛选条件
            this.getFilterCondition(id);
        },
        dianji(e) {
            console.log(e);
        },


        /**
         * 数组排序
         */
        arrFilter(Arr) {
            var min;
            for (var i = 0; i < Arr.length; i++) {
                for (var j = i; j < Arr.length; j++) {
                    if (Arr[i] > Arr[j]) {
                        min = Arr[j];
                        Arr[j] = Arr[i];
                        Arr[i] = min;
                    }
                }
            }

            return Arr;
        },

        /**
         * 获取首页的分类导航
         */
        async getIndexType() {
            const { data: ret } = await this.$http.post(
                this.setApi + api.indexType,
                this.querystring.stringify({
                    access_token: window.localStorage.getItem("token")
                })
            );
            // console.log(ret)
            let tempObj = {
                id: "0",
                img: "",
                name: "热点",
                sort: "0"
            };
            ret.response_data.lists.unshift(tempObj);
            this.indexTypeList = ret.response_data.lists;

        },
        // banner
        async getBannerList(type_id = 0) {
            const { data: ret } = await this.$http.post(
                this.setApi + api.bannerList,
                this.querystring.stringify({
                    type: !type_id ? 1 : "",
                    type_id: type_id ? type_id : ""
                })
            );
            // console.log('banner',ret)
            this.bannerList = ret.response_data.lists;
            if (this.bannerList != 0) {
                this.$nextTick(() => {
                    var swiper = new Swiper(".swiper-container", {
                        loop: true,
                        autoplay: true,
                        observer: true,
                        observeParents: true,
                        pagination: {
                            el: ".swiper-pagination"
                        }
                    });
                });
            }
        },
        
        
        
    }
};
</script>

<style lang="less" scoped>
// @import url('./home.less');
.logo {
    margin-right: 0.4375rem;
}

.logo img {
    display: block;
}

.rela {
    position: relative;
}

.user-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
}

#home .home .tj-video .tj-videos .user-info {
    left: 0;
    bottom: 0;
    padding-left: 0.6875rem;
    box-sizing: border-box;
}

#home .home .tj-video .tj-videos .small-video .user-info {
    padding-left: 0;
}

.big-video .user-info {
    background: rgba(0, 0, 0, 0.6);
    height: 3rem;
    display: flex;
    align-items: center;
}

#home .home .tj-video .tj-videos .small-video .user-info p,
#home .home .tj-video .tj-videos .small-video .user-info div,
.small-video .user-info {
    color: #333;
}

#home .home .tj-video .tj-videos .ws-list li {
    height: 8.5rem;
    background: transparent;
}

#home .home .tj-video .tj-videos .ws-list li img {
    background: #333;
    border-radius: 4px;
}

#home .home .tj-video .tj-videos .ws-list li > img {
    display: block;
    width: 6.75rem;
    height: 6.75rem;
}

#home .home .tj-video .tj-videos .tj-vlist li {
    height: auto;
    background: transparent;
    // flex-direction: column
}

#home .home .tj-video .tj-videos .tj-vlist li > img {
    display: block;
    width: 10.5rem;
    height: 10.5rem;
    background: #333;
}

#home .home .tj-video.recommend .tj-videos .user-info {
    position: relative;
    padding: 10px 0;
    // height: 75px;
    box-sizing: border-box;
}

#home .home .ws-list .user-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

#home .home .tj-video.recommend .tj-videos .user-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}

#home .home .tj-video .tj-videos .big-video .user-info {
    position: absolute;
}

.screening {
    display: block;
    width: 18px;
    height: auto;
    margin-bottom: 4px;
}

.screening-rank {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

a:focus,
a:visited,
a:active {
    color: #333;
    text-decoration: none;
}

a {
    color: #333;
    text-decoration: none;
}

::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
}

.m-sortList-wrap {
    width: 100%;
}

.m-sliding-list {
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    white-space: nowrap;
}

.m-sliding-list li {
    display: inline-block;
    // float: left;
}

.lay-out {
    margin-right: 14px;
    width: 90%;
}

.top-show-img {
    position: absolute;
    // bottom: 80px;
    bottom: 4rem;
    left: 0;
    right: 0;
    padding: 0.625rem 0;
    background: rgba(0, 0, 0, 0.6);
    padding-left: 0.625rem;
    font-size: 0.75rem;
    color: #fff;
}

.top-show-img img {
    width: 1.375rem;
    height: 1.375rem;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    border-radius: 50%;
    margin-right: 0.25rem;
    background: #333;
    border-radius: 4px;
}

.ws-list .top-show-img {
    bottom: 1.75rem;
}

.m-sortList {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}

.m-sortList {
    padding: 20px 0;
}

.m-sortList li {
    margin-right: 30px;
}

.section-filter {
    background: #fff;
    margin-bottom: 0.3125rem;
}

#home {
    padding-bottom: 3rem;
}

.ellipsis11 {
    height: 1rem;
    width: auto;
    // display: -webkit-box !important;
    display: inline-block;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
    overflow-y: hidden;
    overflow-x: visible;
    position: relative;
    padding-right: 0.75rem;
}
.ellipsis11::before {
    content: "...";
    position: absolute;
    right: 0;
    bottom: 0;
}
// .user-info {
//   position: relative;
// }
// .user-info::before {
//   content: '...';
//   position: absolute;
//   bottom: 0;
//   right: 0;
// }
#home .home .tj-video .all-video-lists .tj-vlist li {
    height: 14.5rem;
}
.charge {
    position: absolute;
    // top: .625rem;
    // left: .625rem;
    top: 0;
    left: 0;
    z-index: 99;
    color: red;
    font-weight: 700;
    font-size: 0.875rem;
}
.charge img,
#home .switchVideo li .box > div.charge img {
    display: block;
    width: 2rem;
    border-radius: 6px;
    height: auto !important;
    background: #fff;
}
#home .switchVideo li .box > div.charge {
    padding: 0 !important;
}

.switchVideo div.charge {
    // left: .625rem;
    // top: .625rem;
    left: 0;
    top: 0;
    right: auto !important;
    bottom: auto !important;
    background: transparent !important;
}
.home-video .switchVideo span,
#home .switchVideo div.charge span {
    color: red !important;
}
</style>
<style>
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
    border-radius: 0.375rem;
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
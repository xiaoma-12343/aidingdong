<template>
    <keep-alive>
        <div class="all-video">
            <head-back>
                <span class="head-title">
                    推荐视频
                </span>
            </head-back>
            <div id="home-video" class="home-video" >
                <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                    <div class="home ">
                        <!-- 推荐视频 -->
                        <div class="tj-video recommend" v-if="hotVideoList.length > 0">
                            <div class="tj-videos">
                                <ul class="tj-vlist flex flex--justify-content--space-between flex--wrap">
                                    <li
                                        class="rela small-video"
                                        @click="$router.push(`/works/${item.id}`)"
                                        v-for="(item, index) in hotVideoList"
                                        :key="index"
                                    >
                                        <img :src="item.image" alt />

                                        <div class="like flex flex--align-items--center">
                                            <i class="iconfont icon-like"></i>
                                            {{item.praise}}
                                        </div>
                                        <div class="top-show-img flex flex--align-items--center">
                                            <img :src="item.head" :alt='item.nickname' />
                                            <span class="no-wrap">@{{item.nickname}}</span>
                                        </div>
                                        <div class="user-info">
                                            <p class="ellipsis11">{{item.title}}</p>
                                            <p class="ellipsis11">{{item.content}}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </van-pull-refresh>
            </div>

            <infinite-loading spinner="circles" @infinite="getHotVideo">
                <!-- <div slot="spinner">我也是有底线的~</div> -->
                <div slot="no-more">我也是有底线的~</div>
                <div slot="no-results">我也是有底线的~</div>
            </infinite-loading>

        </div>

    </keep-alive>
</template>

<script>
import api from "../../api";
import Swiper from "swiper";
import HeadBack from '@/components/headback/headback';
import InfiniteLoading from 'vue-infinite-loading';
import "./home.less";
let pageLoading = null;
export default {
    mounted() {

    },
    destroyed() {

    },
    components: {
        HeadBack,
        InfiniteLoading
    },
    created() {


    },
    data() {
        return {
            num: 20,
            page: 1,
            hotVideoList: [],
            isLoading: false,
        };
    },
    methods: {
        /**
         * 获取推荐视频列表
         */
        async getHotVideo($state, type = 0) {
            pageLoading = $state;

            let params = {
                page: this.page,
                num: this.num
            }

            const { data: ret } = await this.$http.post(
                this.setApi + api.recommendList,
                this.querystring.stringify(params)
            );

            this.isLoading = false;

            if(!ret.error_code){
                let lists = ret.response_data.lists.video;


                if(type){
                    // 如果是刷新页面列表，则需要重置下数据
                    this.hotVideoList = lists;
                }

                if (lists.length) {
                    this.page += 1;
                    this.hotVideoList = this.hotVideoList.concat(lists);
                    $state.loaded();
                } else {
                    $state.complete();
                }

            }else{
                $state.complete();
            }
            
        },

        /**
         * 刷新当前页面
         */
        onRefresh() {

            this.page = 1;
            this.getHotVideo(pageLoading, 1);

        },



    }
};
</script>

<style lang="less" scoped>
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

#home-video .home .tj-video .tj-videos .user-info {
  left: 0;
  bottom: 0;
  padding-left: 0.6875rem;
  box-sizing: border-box;
}

#home-video .home .tj-video .tj-videos .small-video .user-info {
  padding-left: 0;
}

.big-video .user-info {
  background: rgba(0, 0, 0, 0.6);
  height: 3rem;
  display: flex;
  align-items: center;
}

#home-video .home .tj-video .tj-videos .small-video .user-info p,
#home-video .home .tj-video .tj-videos .small-video .user-info div,
.small-video .user-info {
  color: #333;
}

#home-video .home .tj-video .tj-videos .ws-list li {
  height: 8.5rem;
  background: transparent;
}

#home-video .home .tj-video .tj-videos .ws-list li img {
  background: #333;
  border-radius: 4px;
}

#home-video .home .tj-video .tj-videos .ws-list li > img {
  display: block;
  width: 6.75rem;
  height: 6.75rem;
}

#home-video .home .tj-video .tj-videos .tj-vlist li {
  height: auto;
  background: transparent;
  // flex-direction: column
}

#home-video .home .tj-video .tj-videos .tj-vlist li > img {
  display: block;
  width: 10.5rem;
  height: 10.5rem;
  background: #333;
}

#home-video .home .tj-video.recommend .tj-videos .user-info {
  position: relative;
  padding: 10px 0;
  // height: 75px;
  box-sizing: border-box;
}

#home-video .home .ws-list .user-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#home-video .home .tj-video.recommend .tj-videos .user-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#home-video .home .tj-video .tj-videos .big-video .user-info {
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

#home-video {
  padding-bottom: 3rem;
}


.ellipsis11 {
  height: 1rem;
  width: 100%;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
#home-video .home .tj-video .all-video-lists .tj-vlist li {
  height: 14.5rem;
}
.home-video .home {
    padding-top: 0 !important;
}
#home-video.home-video {
    padding-top: 2.75rem !important;
}
.no-wrap {
    white-space: nowrap !important;
}
#home-video {
    padding-bottom: 1rem;
    background: #fff;
}
.all-video {
    padding-bottom: 2rem;
}
</style>

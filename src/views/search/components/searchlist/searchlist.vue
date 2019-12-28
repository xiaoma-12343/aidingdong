<template>
    <div id="search-list" class="pt275">
        <head-back>
            <!-- <span class="head-title">&quot; {{searchKeywords}}&quot; 搜索结果</span> -->
            <span class="head-title ellipsis">{{searchKeywords}}</span>
        </head-back>
        
        <!-- <ul class="search-list" v-if="searchRetList.length == 0">
            <li @click="pushDetails(item.id)" v-for="(item, index) in searchRetList" :key="index">
                <div class="event-contentimg">
                    <img :src="item.head_img" alt="">   
                </div> 
                <div class="event-contentinfo">
                    <div>
                        <p>{{item.name}}</p>
                        <p>{{item.apply_sum}}人已报名</p>
                    </div>
                    <div>
                        <p>&yen;&nbsp;{{item.money}}&nbsp;元</p>
                        <p>{{item.apply_start_time}}-{{item.apply_end_time}}</p>
                    </div>
                </div>
            </li>
        </ul> -->

        <ul class="video-lists flex flex--wrap">
            <li 
                style="text-align: left;"
                class="flex flex--row flex--align-items--center" 
                v-for="(item,index) in searchRetList" 
                @click="$router.push(`/works/${item.id}`)"
                :key="index">
                <div class="them-title">
                    <img :src="item.image[0]" alt="">
                </div>
                <div class="flex flex--row flex--align-items--start">
                    <h4 v-if="item.title" class="search-video-title" :class="{'ellipsis11': item.title.length > 10}">{{item.title}}</h4>
                    <p v-if="item.content" class="search-video-content" :class="{'ellipsis11': item.content.length > 10}">{{item.content}}</p>
                </div>
                <p class="praise">
                    <i class="iconfont icon-like"></i>
                    {{item.praise}}
                </p>
            </li>
        </ul>




        <!-- 无数据显示状态 -->
        <template v-if="searchRetList.length == 0">
            <div class="event-null"></div>
        </template>
    </div>
</template>

<script>

import HeadBack from '../../../../components/headback/headback';
import api from '../../../../api/index.js';
import themImg from '../../../../../static/image/vip.png';
export default {
    components:{
        HeadBack
    },
    created() {
        // console.log(this.$route.params);
        this.searchKeywords = this.$route.params.keywords;
        this.getSearchRet();
    },
    data() {
        return {
            searchKeywords:'',
            searchRetList:[],
            themImg
        }
    },
    methods: {
        // 逻辑
        pushDetails(id){
            this.$router.push(`/event/details/${id}`)
        },
        // 请求
        async getSearchRet(){
            const {data:ret} = await this.$http.post(this.setApi + api.searchRet,this.querystring.stringify({name:this.searchKeywords}))
            // console.log(ret)
            if(!ret.error_code){
                this.searchRetList = ret.response_data.lists;
            }
        }  
    },
}
</script>

<style lang="less" scoped>
@import url('./searchlist.less');
.ellipsis {
    display: -webkit-box !important;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
.head-title {
    width: 60%;
    text-align: center;
}
.video-lists li {
    width: 9.5rem;
    margin-right: 1.25rem;
    margin-bottom: 1rem;
    position: relative;
}
.praise {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    display: flex;
    align-items: center;
    padding: .3rem;
    background: rgba(0,0,0,0.4);
}
.praise i {
    margin-right: .25rem;
}
.video-lists li:nth-child(2n + 2) {
    margin-right: 0;
}
.them-title {
    width: 100%;
    height: 9.5rem;
    margin-bottom: .5rem;
}
.them-title img {
    display: block;
    width: 100%;
    height: 100%;
}
.video-lists {
    padding: 1.25rem;
}
.video-lists li h4 {
    text-align: left;
    margin-bottom: .5rem;
    font-size: 0.9rem;
}
.video-lists li p {
    margin: 0;
    text-align: left;
    font-size: 0.8rem;
    margin-bottom: .5rem;
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
  padding-right: .75rem;
}
.ellipsis11::before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>
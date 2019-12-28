<template>
    <div id="topic-details">
        <head-back :color="'#fff'" :isshow="false">
            <van-icon name="share" size="20px" color="#fff"></van-icon>
        </head-back>
        <div class="topic-details">
            <!-- 顶部 -->
            <div class="top-bgc" :style="{
                backgroundImage:'url('+require('../../../../assets/img/topic-bgc.png')+')',
                backgroundPosition:'center',
                backgroundSize:'100%',
            }">
                <div>
                    <p>#太极初级学习方法</p>
                    <p>话题的文字介绍话题的文字话题的文字介绍话题的文字话题的文字介绍话题的文字话题的文字介绍话题的文字话题的文字介绍话</p>
                    <p>928关注</p>
                </div>
            </div>
            <!-- neirong -->
            <div class="topic-list"  ref="toplist">
                <ul class="list-tab flex">
                    <li @click="getTabId(index+1)" :class="tabId == index+1 ? 'active' : ''" v-for="(item, index) in tabList" :key="index">{{item}}</li>
                </ul>
                <ul class="my-topList">
                    <li v-for="(item, index) in myTopicList" :key="index">
                        <!-- 用户info-->
                        <div class="my-userinfo flex--justify-content--space-between flex flex--align-items--center">
                            <div @click="$router.push(`/mypage/${item.user_id}`)" class="flex flex--align-items--center">
                                <!-- 头像 -->
                                <div>
                                    <img preview :src="item.head" alt="">
                                </div>
                                <!-- 用户名 -->
                                <div>
                                    <p>{{item.nickname}}</p>
                                    <span>{{item.ctime}}</span>
                                </div>
                            </div>
                            <div @click="getAttention(2,item.id)" class="guanzhu" v-if="item.user_id !== userId && item.is_attention == 1">+ 关注</div>
                            <div class="guanzhu" v-if="item.user_id !== userId && item.is_attention == 2">已关注</div>
                        </div>
                        <!-- send content -->
                        <div class="my-content" >
                            <p @click="$router.push(`/topic/details/${item.id}`)">{{item.content}}</p>
                            <ul class="content-img flex flex--wrap flex--justify-content--start">
                                <li v-if="item.img.length != 0" class="flex flex--justify-content--center flex--align-items--center" v-for="(itemImg, index) in item.img" :key="index">
                                    <img :preview="item.id" :src="itemImg" alt="item">
                                </li>
                            </ul>
                        </div>
                        <!-- how -->
                        <div class="my-how flex">
                            <p class="flex flex--align-items--center">{{item.browse}}人阅读</p>
                            <p>{{item.topic_type_name}}</p>
                        </div>
                        <!-- operat -->
                        <div class="my-operat flex flex--justify-content--space-between flex--align-items--center">
                            <div class="flex">
                                <p :class="item.is_praise==1 ? 'like-active':'operat-like' " @click="getLikes(3,item.id,item.user_id,item.is_praise)">{{item.assist}}</p>
                                <p class="operat-pl">{{item.comment_sum}}</p>
                                <p class="operat-fx"></p>
                            </div>
                            <div>
                                <van-icon name="weapp-nav" color="#F1F1F2" ></van-icon>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getTopicDetail()
    },
    data() {
        return {
            tabList:['最新','热门','精华'],
            tabId:'1',
            myTopicList:[],
            userId:JSON.parse(window.localStorage.getItem('userInfo')).id,
            flag:false,
            isprise:null,
        }
    },
    methods: {
        // aa(event){

        //     // var scroll = document.querySelector('.topic-list').scrollTop
        //     // console.log(event.touches[0].clientX,event.touches[0].clientY,event.target.offsetTop)
        // },
        getTabId(id){
            this.tabId = id
            console.log(id)
            this.getTopicDetail(this.$route.params.id,id)
        },
        async getTopicDetail(id=this.$route.params.id,pid=1){
            const {data:ret} = await this.$http.post(this.setApi+api.allTopicList,this.querystring.stringify({topic_id:id,type:pid,access_token:window.localStorage.getItem('token')}))
            console.log(ret)
            this.myTopicList = ret.response_data.lists
            this.$previewRefresh()
        },

        // 点赞功能
        async getLikes(type='topic',cid,rid,isprise){
            // if(this.flag){
            //     this.flag = false
            //     this.isprise = 2
            // }else{
            //     this.flag = true
            //     this.isprise = 1
            // }
            const {data:ret} = await this.$http.post(this.setApi+api.praise,this.querystring.stringify({
                type:type,
                access_token:window.localStorage.getItem('token'),
                reception_user_id:rid,
                correlation_id:cid,
                prise_or_cancle:isprise == 1 ? 2 : 1
            }))
            console.log(ret)
            this.getTopicDetail(this.$route.params.id,this.tabId)
        },

        // 关注
        async getAttention(type,correlation_id){
            const {data:ret} = await this.$http.post(this.setApi + api.attentioned,this.querystring.stringify({
                type,
                correlation_id,
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.getTopicDetail(this.$route.params.id,this.tabId)
        },

        // 评论
    },

}
</script>

style <style lang="less" scoped>
@import url('./topicdetail.less');
</style>

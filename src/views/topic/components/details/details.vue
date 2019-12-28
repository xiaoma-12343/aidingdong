<template>
    <div id="details">
        <head-back>
            <span class="head-title">
                动态详情
            </span>
        </head-back>

        <div class="details">
            <div class="send-user">
                <!-- 用户info-->
                <div class="my-userinfo flex--justify-content--space-between flex flex--align-items--center">
                    <div class="flex flex--align-items--center">
                        <!-- 头像 -->
                        <div>
                            <img :src="topicdetails.head" alt="">
                        </div>
                        <!-- 用户名 -->
                        <div>
                            <p>{{topicdetails.nickname}}</p>
                            <span>{{topicdetails.ctime}}</span>
                        </div>
                    </div>
                    <div class="guanzhu" @click="getAttentions(topicdetails.id)" v-show="topicdetails.is_attention == 1&&topicdetails.user_id != userId">+ 关注</div>
                    <div class="guanzhu" v-show="topicdetails.is_attention == 2&&topicdetails.user_id != userId">已关注</div>
                </div>
                <!-- send content -->
                <div class="my-content">
                    <p>{{topicdetails.content}}</p>
                    <ul class="content-img flex flex--wrap flex--justify-content--start">
                        <li v-if="topicdetails.img.length != 0" class="flex flex--justify-content--center flex--align-items--center" v-for="(itemImg, index) in topicdetails.img" :key="index">
                            <img preview :src="itemImg" alt="">
                        </li>
                    </ul>
                </div>
                <!-- how -->
                <div class="my-how flex">
                    <p class="flex flex--align-items--center">{{topicdetails.browse}}人阅读</p>
                    <p>{{topicdetails.topic_type_name}}</p>
                </div>
                <!-- operat -->
                <div class="my-operat flex flex--justify-content--space-between flex--align-items--center">
                    <div class="flex">
                        <p class="operat-like">{{topicdetails.assist}}</p>
                        <p class="operat-pl">{{topicdetails.comment_sum}}</p>
                        <p class="operat-fx"></p>
                    </div>
                    <div>
                        <van-icon name="weapp-nav" color="#F1F1F2" ></van-icon>
                    </div>
                </div>
            </div>
            <div class="pingluncontent" v-show="false">
                <textarea placeholder="请输入..." v-model="textcontent" maxlength="500"></textarea>
                <div class="flex flex--justify-content--end flex--align-items--center">
                    <div class="sendtopic">评论</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback.vue'
import api from '../../../../api/index.js'
import {getAttention} from '../../../../api/apiEvent.js'
export default {
    components:{
        HeadBack
    },
    created() {
        console.log(this.$route)
        // this.getHeadTabId(this.$route.params.type_id,this.userId)
        this.getDetails(this.$route.params.type_id)
    },
    data() {
        return {
            userId:JSON.parse(window.localStorage.getItem('userInfo')).id,
            myTopicList:[{head:'',img:[]}],
            textcontent:'',
            topicdetails:{}

        }
    },
    methods: {
        // 请求
        async getHeadTabId(id = 1){
            // this.headTabId = id
            const {data:ret} = await this.$http.post(this.setApi + api.myTopicList,this.querystring.stringify({user_id:this.userId,type:id}))
            console.log(ret.response_data.lists)
            this.myTopicList = ret.response_data.lists.filter(item=>item.id == this.$route.params.id)
            console.log(this.myTopicList)
            this.getPinglun (this.myTopicList[0].user_id,this.myTopicList[0].id)
        },
        // 获取评论
        async getPinglun (userid,topicid){
            const {data:ret} = this.$http.post(this.setApi + api.pingl,this.querystring.stringify({
                topic_id:topicid,
                user_id:userid
            }))
            console.log(1)
        },
        // 获取话题详情
        async getDetails(tid){
            const {data:ret} = await this.$http.post(this.setApi + api.topicDetails,this.querystring.stringify({
                // user_id:uid,
                topic_id:tid,
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.topicdetails = ret.response_data.lists
            this.$previewRefresh()

        },
        // 关注
        getAttentions(id){
            getAttention(2,id)
            this.getDetails(this.$route.params.type_id)
            
        }


    },
}
</script>

<style lang="less" scoped>
@import url('./details.less');
</style>


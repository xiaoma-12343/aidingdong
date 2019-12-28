<template>
    <div id="my-topic">
        <head-back>
            <ul class="head-tab flex">
                <li @click="getHeadTabId(index+1)" :class="headTabId == index+1 ? 'active' : ''" v-for="(item, index) in headTab" :key="index">{{item}}</li>
            </ul>
        </head-back>

        <div class="my-topic">
            <ul class="my-topList">
                <li v-for="(item, index) in myTopicList" :key="index">
                    <!-- 用户info-->
                    <div class="my-userinfo flex flex--align-items--center">
                        <!-- 头像 -->
                        <div>
                            <img :src="item.head" alt="">
                        </div>
                        <!-- 用户名 -->
                        <div>
                            <p>{{item.nickname}}</p>
                            <span>{{item.ctime}}</span>
                        </div>
                    </div>
                    <!-- send content -->
                    <div class="my-content" @click="routerPush(item.id,headTabId == 1 ? item.user_id:item.send_user_id)">
                        <p>{{item.content}}</p>
                        <ul class="content-img flex flex--wrap flex--justify-content--start">
                            <li v-for="(itemImg, index) in item.img" :key="index">
                                <div class="imslist flex flex--justify-content--center flex--align-items--center">
                                    <img :src="itemImg" alt="">
                                </div>
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
                            <p class="operat-like" @click="getPraise(item.id)">{{item.assist}}</p>
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
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getHeadTabId()
    },
    data() {
        return {
            headTab:['我发布过','我互动过'],
            headTabId:'1',
            userId:JSON.parse(window.localStorage.getItem('userInfo')).id,
            myTopicList:[],
            access_token:window.localStorage.getItem('token')
        }
    },
    methods: {
        // 逻辑
        routerPush(typeId,id){
            this.$router.push(`/topic/details/${typeId}/${id}`)
        },
        // 请求
        // 获取列表
        async getHeadTabId(id = 1){
            this.headTabId = id
            const {data:ret} = await this.$http.post(this.setApi + api.myTopicList,this.querystring.stringify({user_id:this.userId,type:id}))
            console.log(ret.response_data.lists)
            this.myTopicList = ret.response_data.lists
        },
        // 我发布过的
        async getPraise(content_id){
            const {data:ret} = await this.$http.post(this.setApi + api.praise,this.querystring.stringify({
                access_token:this.access_token,
                reception_user_id:this.userId,
                correlation_id:content_id,
                type:3
            }))
            console.log(ret)
            this.getHeadTabId()
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./mytopic.less');
</style>


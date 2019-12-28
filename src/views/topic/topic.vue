<template>
    <div id="topic">
        <head-back :isshow="false">
            <span class="head-title">
                话题
            </span>
            <span @click="$router.push('/topic/mysend')" class="head-right">
                我参与的
            </span>
        </head-back>
        <div class="topic flex">
            <ul class="topic-left">
                <li @click="getTabId(item.id)" :class="['flex flex--align-items--center flex--justify-content--center',topicTabId == item.id ? 'active' : '']" v-for="(item, index) in topicList" :key="index">{{item.name}}</li>
            </ul>
            <ul class="topic-right">
                <li class="flex" v-for="(item, index) in topicDetails" :key="index">
                    <div class="flex flex--align-items--center flex--justify-content--center" @click="$router.push(`/topic/detail/${item.id}`)">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="flex flex--justify-content--space-between">
                        <p @click="$router.push(`/topic/detail/${item.id}`)">{{item.topic_type_name}}</p>
                        <div class="flex flex--align-items--center flex--justify-content--space-between">
                           <p>{{item.attention_sum}}人关注</p>
                           <div v-show="item.is_attention == 1" @click="getAttention(3,item.id)">关注</div>
                           <div v-show="item.is_attention == 2">已关注</div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="topic-send flex flex--justify-content--content flex--align-items--center" @click="$router.push('/topic/send')">
                <div>
                    <p>+</p>
                    <span>参加</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
import api from '../../api/index.js'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getTopicTabList()
        this.getTopicList(15)
    },
    data() {
        return {
            topicList:[],
            topicTabId:'15',

            topicDetails:[]
        }
    },
    methods: {
        // 逻辑
        getTabId(id){
            this.topicTabId = id;
            this.getTopicList(id)
        },
        async getAttention(type,correlation_id){
            const {data:ret} = await this.$http.post(this.setApi + api.attentioned,this.querystring.stringify({
                type,
                correlation_id,
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.getTopicList()
        },
        // 请求
        // 获取分类列表
        async getTopicTabList(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType)
            // console.log(ret)
            this.topicList = ret.response_data.lists
        },

        async getTopicList(){
            const {data:ret} = await this.$http.post(this.setApi + api.topicList,this.querystring.stringify({type_id:this.topicTabId,access_token:window.localStorage.getItem('token')}))
            console.log(ret.response_data.lists)
            this.topicDetails = ret.response_data.lists
        },

        // 关注功能
        

    },
}
</script>

<style lang="less" scoped>
@import url('./topic.less');
</style>


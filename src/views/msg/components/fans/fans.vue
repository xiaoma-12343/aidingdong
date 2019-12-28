<template>
    <div id="fans">
        <head-back :color="'#fff'">
            <span class="head-title">
                粉丝
            </span>
        </head-back>
        <ul class="fans" v-if="fansLists.length > 0">
            <li v-for="(item, index) in fansLists" :key="index" class="flex flex--align-items--center flex--justify-content--space-between">
                <div class="flex flex--justify-content--space-between flex--align-items--center">
                    <img :src="item.head" alt="">
                    <div>
                        <p>{{item.nickname}}</p>
                        <span>欢迎来到爱叮咚</span>
                    </div>
                </div>
                <!-- <span @click="getAttention(4,item.id)" class="guanzhu" v-show="item.status != 2 && item.status != 3">关注</span> -->
                <span class="guanzhu" v-show="item.status == 2">互相关注</span>
                <span class="guanzhu" v-show="item.status == 3">已关注</span>
            </li>
        </ul>
        <div v-else class="no-thing">
            <p>暂无更多粉丝~</p>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api'
export default {
    components:{
        HeadBack
    },
    created() {
        this.fansList()
    },
    data() {
        return {
            fansLists:[]
        }
    },
    methods: {
        async fansList(type=1){
            const {data:ret} = await this.$http.post(this.setApi + api.msginfo,this.querystring.stringify({
                access_token:window.localStorage.getItem('token'),
                type
            }))
            console.log(ret)
            if(!ret.error_code){
                this.fansLists = ret.response_data.lists
            }else{
                this.$toast('请先登录')
            }
        },
        // 关注
        async getAttention(type,correlation_id){
            const {data:ret} = await this.$http.post(this.setApi + api.attentioned,this.querystring.stringify({
                type,
                correlation_id,
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.fansList()
        },
    },
}
</script>

<style lang="less" scoped>
@import url('./fans.less');
.no-thing {
    padding: 1.875rem;
    text-align: center;
    font-size: 1.125rem;
    padding-top: 4.5rem;
}
</style>


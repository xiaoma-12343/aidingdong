<template>
    <div id="start">
        <head-back :color="'#fff'">
            <span class="head-title">
                点赞
            </span>
        </head-back>


        <ul class="start" v-if="startList.length > 0">
            <li v-for="(item, index) in startList" :key="index" class="flex flex--align-items--center flex--justify-content--space-between">
                <div class="flex flex--justify-content--space-between flex--align-items--center">
                    <img :src="item.head" alt="">
                    <div>
                        <p>{{item.nickname}}</p>
                        <p>{{item.ctime}}</p>
                        <span>赞了你的作品</span>
                    </div>
                </div>
                <!-- <span @click="attentions(item.id)" class="guanzhu" v-show="item.status != 2 && item.status != 3">关注</span> -->
                <span class="guanzhu" v-show="item.status == 2">互相关注</span>
                <span class="guanzhu" v-show="item.status == 3">已关注</span>
            </li>
        </ul>
        <div v-else class="no-thing">
            <p>暂无点赞~</p>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api'
import {getAttention} from '../../../../api/apiEvent.js'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getStart()
    },
    data() {
        return {
            startList:[]
        }
    },
    methods: {
        async getStart(type=2){
            const {data:ret} = await this.$http.post(this.setApi + api.msginfo,this.querystring.stringify({
                access_token:window.localStorage.getItem('token'),
                type
            }))
            // console.log(ret)
            if(!ret.error_code){
                this.startList = ret.response_data.lists
            }else{
                this.$toast('请先登录')
            }
        },
        // 关注列表
        attentions(id){
            getAttention(4,id)
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./start.less');
.no-thing {
    padding: 1.875rem;
    text-align: center;
    font-size: 1.125rem;
    padding-top: 4.5rem;
}
</style>


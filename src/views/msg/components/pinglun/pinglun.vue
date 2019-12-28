<template>
    <div id="pinglun">
        <head-back :color="'#fff'">
            <span class="head-title">评论</span>
        </head-back>
        <ul class="pinglun" v-if="commentsLists.length > 0">
            <li v-for="(item,index) in commentsLists" :key="index">
                <div class="userinfos flex flex--align-item--center flex--justify-content--space-between">
                    <div class="head flex flex--align-items--center">
                        <!-- <img src="../../../../assets/yindao.png" alt=""> -->
                        <img :src="item.head" alt="头像">
                        <div>
                            <p>{{item.nickname}}</p>
                            <span>{{ctime | timeFilter}}</span>
                        </div>
                    </div>
                    <!-- <div class="gz">+关注</div> -->
                    <div class="ygz"  v-show="item.status == 3">已关注</div>
                    <div class="ygz"  v-show="item.status == 2">互相关注</div>
                </div>
                <p class="content">{{item.content}}</p>
            </li>
        </ul>
        <div v-else class="no-thing">
            <p>暂无评论~</p>
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
        this.getPingLun()
    },
    data() {
        return {
            commentsLists: []
        }
    },
    methods: {
        async getPingLun(){
            const {data:ret} = await this.$http.post(this.setApi + api.msginfo,this.querystring.stringify({
                type:3,
                num: 200,
                access_token:window.localStorage.getItem('token')
            }))

            if(!ret.error_code){
                this.commentsLists = ret.response_data.lists;
            }else{
                this.$toast('请先登录')
            }
            console.log(ret)
        }
    },
}
</script>

<style lang="less" scope>
    @import url('./pinglun.less');
    .no-thing {
        padding: 1.875rem;
        text-align: center;
        font-size: 1.125rem;
        padding-top: 4.5rem;
    }
</style>

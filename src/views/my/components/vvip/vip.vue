<template>
    <div id="vip">
        <head-back :color="'#fff'">
            <span class="head-title">
                充值
            </span>
        </head-back>
        <div class="vip">
            <div class="vip-cardbg">
                <div class="vip-card">
                    <img src="../../../../assets/icon/vip.png" alt="">
                </div>
            </div>
            <div class="vip-lists">
                <p>会员特权</p>
                <ul>
                    <li v-for="(item, index) in 1" :key="index">
                        <!-- <div class="flex flex--align-items--center">
                            <img src="../../../../assets/icon/icon-video.png" alt="">
                            <p>全站视频免费观看</p>
                        </div> -->
                        <div v-html="rulesDetail"></div>
                    </li>
                </ul>
            </div>
            <div class="vip-check">
                <van-button @click="$router.push('/my/openvip')" type="primary">立即开通</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback';
import api from '@/api/index.js';
export default {
    components:{
        HeadBack
    },
    data(){
        return {
            rulesDetail: null
        }
    },
    created(){
        // 获取规则详情
        this.getCustomer();
    },
    methods: {
        /**
         * 获取规则详情
         */
        async getCustomer(){
            const {data:ret} = await this.$http.post(this.setApi + api.statement, this.querystring.stringify({type: 7}));
            console.log('retreteretreteretrete', ret);
            if(!ret.error_code){
                this.rulesDetail = this.escape2Html(ret.response_data.content);
            }
        },

    }
}
</script>

<style lang="less" scoped>
@import url('./vip.less');
</style>

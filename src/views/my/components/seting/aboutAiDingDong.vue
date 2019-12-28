<template>
    <div class="pt300">
        <head-back>
            <span class="head-title">
                关于爱叮咚
            </span>
        </head-back>
        <div class="detail" v-html="detail" >

        </div>
    </div>
</template>
<script>
import HeadBack from '@/components/headback/headback';
import api from '@/api';
export default {
    components:{
        HeadBack
    },
    data(){
        return {
            detail: ''
        }
    },
    created(){
        // 获取关于我们
        this.aboutAidingdong();
    },
    methods: {
        /**
         * 获取关于爱叮咚
         */
        async aboutAidingdong(){
            const {data:ret} = await this.$http.post(this.setApi + api.statement, this.querystring.stringify({type: 2}));

            if(!ret.error_code){

                this.detail = this.escape2Html(ret.response_data.content);
            }else{
                // this.$router.push({
                //     path: '/login'
                // })
            }
        },

        /**
         * 过滤字符串
         */
        escape2Html (str) {
            var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
                return arrEntities[t];
            });
        }
    }
}
</script>
<style>
.pt300 {
    padding-top: 3rem;
}
.detail {
    padding: 1.25rem;
    box-sizing: border-box;
    text-align: justify;
}
</style>

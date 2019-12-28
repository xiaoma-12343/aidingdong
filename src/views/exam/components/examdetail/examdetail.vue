<template>
    <div id="exam-detail">
        <head-back>
            <span class="head-title">考试说明</span>
        </head-back>
        <div class="exam-detail">



            <div class="exam-submit" @click="$router.push(`/exam/type/${$route.params.id}`)">开始报名</div>
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
        this.getExamDetail(this.$route.params.id)
    },
    data() {
        return {
            
        }
    },
    methods: {
        async getExamDetail(id){
            const {data:ret} = await this.$http.post(this.setApi + api.examDetail,this.querystring.stringify({examination_id:id}))
            console.log(ret)
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./examdetail.less');
</style>

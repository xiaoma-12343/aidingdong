<template>
    <div id="exam-type">
        <head-back>
            <span class="head-title">考试类别</span>
        </head-back>
        <div class="exam-detail">
            <p>考试类别</p>
            <ul class="flex flex--justify-content--space-between flex--wrap">
                <li @click="selectType(item.id)" :class="selectId == item.id ? 'active':''" v-for="(item, index) in typeList" :key="index">{{item.name}}</li>
            </ul>


            <div class="exam-submit" @click="next">确定选择</div>
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
        this.getTypeList(this.$route.params.id)
    },
    data() {
        return {
            typeList:[],
            selectId:null
        }
    },
    methods: {
        selectType(id){
            this.selectId = id
        },
        next(){
            if(this.selectId == null) return this.$toast('请选择参赛类型')
            this.$router.push(`/exam/sign/${this.$route.params.id}/${this.selectId}`)
        },
        async getTypeList(id){
            const {data:ret} = await this.$http.post(this.setApi + api.examType,this.querystring.stringify({examination_id:id}))
            console.log(ret)
            this.typeList = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./examtype.less');
</style>

<template>
    <div id="kpls">
        <head-back>
            <span class="head-title">
                开票历史
            </span>
        </head-back>

        <ul class="kpls">
            <li v-for="(item, index) in historyList" :key="index">
                <div class="top flex flex--justify-content--space-between flex--align-items--center">
                    <p><i class="iconfont icon-shijian"></i>{{item.ctime}}</p>
                    <p>{{item.status == 1 ? '已开票' : '未通过'}}&gt;</p>
                </div>
                <div class="bottom flex flex--align-items--center flex--justify-content--space-between">
                    <p><i></i>私教体验课</p>
                    <p><span>&yen;</span>{{item.amount}}</p>
                </div>
            </li>
        </ul>
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
        this.getHistory()
    },
    data() {
        return {
            historyList:[]
        }
    },
    methods: {
       async getHistory(){
           const {data:ret} = await this.$http.post(this.setApi + api.kphistory,this.querystring.stringify({
               access_token:window.localStorage.getItem('token')
           }))
           console.log(ret)
       }  
    },
}
</script>

<style lang="less" scoped>
@import url('./kpls.less');
</style>

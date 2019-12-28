<template>
    <div id="storecolist">
        <head-back>
            <span class="head-title">
                门下教练
            </span>
        </head-back>
        <ul class="storecolist">
            <li v-for="(item, index) in 10" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                <div class="userInfo flex flex--align-items--center">
                    <img src="" alt="">
                    <span>slkfdjls</span>
                </div>
                <div class="guanzhu">
                    + 关注
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import HeadBack from '../../../../../../components/headback/headback'
import api from '../../../../../../api/index.js'
export default {
   components:{
       HeadBack
   },
   created() {
       this.getColist()
   },
   data() {
       return {
           
       }
   },
   methods: {
       
       // 请求
       async getColist(){
           const {data:ret} = await this.$http.post(this.setApi + api.coList,this.querystring.stringify({
               access_token:window.localStorage.getItem('token')
           }))
           console.log(ret)
       }
   },
}
</script>


<style lang="less" scoped>
@import url('./storecolist.less');
</style>

<template>
    <div id="gold">
        <head-back>
            <span class="head-title">
                金币
            </span>
        </head-back>
        <div class="gold">
            <!-- 金币数 -->
            <div class="gold-num">
                <div class="gold-icon"></div>
                <p class="gold-nums">{{goldNum}}</p>
                <div class="gold-qp">金币</div>
            </div>
            <!-- /// -->
            <div class="gold-title flex flex--justify-content--space-between flex--align-items--center">
                <span>账户明细</span>
                <ul class="flex flex--align-items--center">
                    <li>年月筛选</li>
                    <li class="line"></li>
                    <li>类型筛选</li>
                </ul>
            </div>


            <!-- 列表 -->
            <ul class="gold-details">
                <li v-for="(item, index) in 5" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                    <div>
                        <span>充值</span>
                        <span></span>
                    </div>
                    <div>+1</div>
                </li>
            </ul>

            <div class="gold-button" @click="$router.push('/my/gold/pay')">兑换优惠券</div>
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
       this.getGoldNum()
   },
   data() {
       return {
           goldNum:''
       }
   },
   methods: {
       // 请求
       async getGoldNum(){
           const {data:ret} = await this.$http.post(this.setApi + api.gold,this.querystring.stringify({
               access_token:window.localStorage.getItem('token')
           }))
           console.log(ret)
           this.goldNum = ret.response_data.lists.class[0].gold
       }
   },
}
</script>


<style lang="less" scoped>
@import url('./integral.less');
</style>


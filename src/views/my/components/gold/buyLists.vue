<template>
    <div id="gold">
        <head-back>
            <span class="head-title">
                {{type == 1 ? '收支明细' : '我的邀请'}}
            </span>
        </head-back>
        <div class="gold">
            <div v-if="type == 1" class="gold-title flex flex--justify-content--space-between flex--align-items--center">
                <ul class="flex flex--align-items--center flex--justify-content--space-between" style="font-size: 16px;color: #333;width: 100%;">
                    <li>标题</li>
                    <li>日期</li>
                    <li>金额</li>
                </ul>
            </div>

            <div v-if="type == 2" class="gold-title flex flex--justify-content--space-between flex--align-items--center">
                <ul class="flex flex--align-items--center flex--justify-content--space-between" style="font-size: 16px;color: #333;width: 100%;padding:0 30px;">
                    <li>头像</li>
                    <li>账号</li>
                    <li>时间</li>
                </ul>
            </div>


            <!-- 列表 -->
            <ul class="gold-details" v-if="sale_detail.length > 0 && type == 1">
                <li v-for="(item, index) in sale_detail" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                    <div>
                        <span>{{item.log}}</span>
                        <span></span>
                    </div>
                    <div>
                        <span>{{item.ctime}}</span>
                    </div>
                    <div>
                        <span>{{item.type}}</span>
                        <span>{{item.amount}}元</span>
                    </div>
                </li>
            </ul>

            <ul class="gold-details" v-if="sale_detail.length > 0 && type == 2">
                <li v-for="(item, index) in sale_detail" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                    <div>
                        <!-- <span>{{item.head}}</span> -->
                        <img :src="item.head" style="width:30px;height:30px;border-radius:50%;" alt="">
                    </div>
                    <div>
                        <span>{{item.username}}</span>
                    </div>
                    <div>
                        <span>{{item.ctime | timeFilter }}</span>
                    </div>
                </li>
            </ul>

            <div v-if="sale_detail.length == 0" class="nothing">
                <p>暂无数据</p>
            </div>

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
    //    console.log(this.$route.query.type)
       let type = this.$route.query.type;
       this.type = type;
       if(type == 1){
            // 收支明细
           this.getShouwZhiLists();
       }else{
            // 邀请列表
            this.invitation();
       }
   },
   data() {
       return {
           goldNum:'',
           sale_detail: [],
           type: 0
       }
   },
   methods: {
       // 请求
       async invitation(){
           const {data:ret} = await this.$http.post(this.setApi + api.invited_list,this.querystring.stringify({
               access_token:window.localStorage.getItem('token'),
               num: 10000
           }))
           if(!ret.error_code){
                this.sale_detail = ret.response_data.list;
            }
       },

       /**
        * 获取收支明细列表
        */
        async getShouwZhiLists(){
            const {data:ret} = await this.$http.post(this.setApi + api.sale_detail,this.querystring.stringify({
                access_token:window.localStorage.getItem('token'),
                num: 10000
            }))
            if(!ret.error_code){
                this.sale_detail = ret.response_data;
            }
        }
   },
}
</script>


<style lang="less" scoped>
@import url('./gold.less');
.nothing {
    padding: 1.25rem 0;
    text-align: center;
    font-size: .875rem;
    color: #333;
}
</style>


<template>
    <div id="site">
        <head-back :isshow="false">
            <span class="head-title">
                教学场地
            </span>
            <span @click="$router.push('/my/addsite')" class="head-right">新增地址</span>
        </head-back>
        <div class="site">
            <ul>
                <li v-for="(item, index) in siteList" :key="index" class="flex flex--justify-content--space-between">
                    <div>
                        <p>{{item.address}}</p>
                        <span>{{item.username}}</span>
                        <span>{{item.phone}}</span>
                    </div>
                    <i class="iconfont icon-bianji"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
export default {
    name:'site',
    components:{
        HeadBack
    },
    created() {
        this.getSiteList()
    },
    data() {
        return {
            siteList:[]
        }
    },
    methods: {
        


        // 请求

        async getSiteList(){
            const {data:ret} = await this.$http.post(this.setApi + api.siteList,this.querystring.stringify({access_token:window.localStorage.getItem('token')}))
            console.log(ret.response_data.lists)
            this.siteList = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./site.less');
</style>


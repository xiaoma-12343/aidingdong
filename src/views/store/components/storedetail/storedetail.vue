<template>
    <div id="store-detail">
        <head-back>
            <span class="head-title">
                门店详情
            </span>
        </head-back>
        <div class="store-detail">
            <div class="detail-img">
                <img :src="storeDetails[0].img" alt="">
            </div>
            <div class="detail-info">
                <h2>{{storeDetails[0].name}}</h2>
                <span>距离您{{storeDetails[0].juli}}km</span>
                <p>门店面222平方米丨私教面积28平方米</p>
            </div>
            <div class="address flex flex--justify-content--space-between flex--align-items--center">
                <p>{{storeDetails[0].address}}</p>
                <div>
                    <a href="tel:13888888888">
                        <i></i>
                        <p>联系电话</p>
                    </a>
                </div>
            </div>
            <!-- 推荐教练 -->
            <div class="recom">
                <div class="recom-title flex flex--align-items--content flex--justify-content--space-between">
                    <p>推荐教练</p>
                    <span>更多</span>
                </div>
                <ul class="recom-list flex flex--justify-content--space-between flex--wrap">
                    <li v-for="(item, index) in recomLists" :key="index" >
                        <img :src="item.head" alt="">
                        <ul class="recom-start flex">
                            <li v-for="(item, index) in parseInt(item.rank)" :key="index" class="iconfont icon-iconfontxingxing"></li>
                        </ul>
                        <div class="recom-info">
                            <p>{{item.nickname}}</p>
                            <span>累计课时{{item.course_sum}}节</span>
                            <div>
                                <span>擅长课程</span>
                                <p>{{item.master}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
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
        this.getStoreDetail()
        this.getRecomList()
    },
    data() {
        return {
            storeDetails:[
                {img:''}
            ],
            recomLists:[]
        }
    },
    methods: {

        // 逻辑

        // 请求
        // 获取店面详情
        async getStoreDetail(){
            const {data:ret} = await this.$http.post(this.setApi + api.storeDetail,this.querystring.stringify({shop_id:this.$route.params.id,lng:this.$route.params.lng,lat:this.$route.params.lat}))
            console.log(ret.response_data.lists)
            this.storeDetails = ret.response_data.lists
        } ,
        // 获取推荐教练列表
        async getRecomList(){
            const {data:ret} = await this.$http.post(this.setApi + api.recomLists,this.querystring.stringify({shop_id:this.$route.params.id}))
            console.log(ret)
            this.recomLists = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./storedetail.less');
</style>

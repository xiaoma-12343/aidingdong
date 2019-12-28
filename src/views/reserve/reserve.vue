<template>
    <div id="reserve">
        <head-back>
            <ul>
                <li 
                :class="headNav.typeNavId==index?'active':''" 
                @click="pushTypeNavId(index);" 
                v-for="(item, index) in headNav.navList" 
                :key="index">
                {{item.name}}
                </li>
            </ul>
        </head-back>

        <div class="reserve">
            <!-- 推荐门店 -->
            <div class="res-md">
                <div class="t_title flex flex--justify-content--space-between">
                    <p>推荐门店</p>
                    <span @click="$router.push('/store')">更多</span>
                </div>
                <ul class="md-list flex">
                    <li v-for="(item, index) in 10" :key="index">
                        <div class="md-img">

                        </div>
                        <p>咏春郑传勋拳术馆</p>
                        <div class="md-bottom flex flex--justify-content--space-between flex--align-items--center">
                            <ul class="flex">
                                <li v-for="(item, index) in 5" :key="index" class="iconfont icon-iconfontxingxing"></li>
                            </ul>
                            <span>3.1Km</span>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- 推荐教练 -->
            <div class="recom">
                <div class="recom-title flex flex--align-items--content flex--justify-content--space-between">
                    <p>推荐教练</p>
                    <span>更多</span>
                </div>
                <!-- <ul class="recom-list flex flex--justify-content--space-between flex--wrap">
                    <li v-for="(item, index) in 5" :key="index" >
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
                </ul> -->
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
import api from '../../api/index.js'
export default {
    components:{
        HeadBack
    },
    created() {
        // 获取导航
        this.getHeadNav();
        // 获取门店列表
        this.getStoreList();
    },
    data() {
        return {
            // 头部导航
            headNav:{
                navList: [],    // 导航列表
                typeNavId: 0,
                storeLists: [],     // 门店列表
            },
        }
    },
    methods: {
        // 逻辑
        // 控制点击切换
        pushTypeNavId(index){
            this.headNav.typeNavId = index;
        },
        // 跳转详情
        pushDetails(id){
            this.$router.push(`/event/details/${id}`)
        },
        // 请求
        // 头部导航分类获取
        async getHeadNav(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType);
            if(!ret.error_code){
                this.headNav.navList = ret.response_data.lists;
            }
        },

        /**
         * 获取场馆列表
         */
        async getStoreList(){
            let params = {
                lng: '',
                lat: ''
            }
            const {data:ret} = await this.$http.post(this.setApi + api.storeList, this.querystring.stringify(params));
            if(ret.error_code){
                this.storeLists = ret.response_data.lists;
            }
        },

    },
}
</script>


<style lang="less" scoped>
@import url('./reserve.less');
</style>


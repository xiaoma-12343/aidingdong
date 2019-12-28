<template>
    <div id="rank">
        <head-back>
            <div class="select-rank flex">
                <div class="rank-like" @click="rankTabId = 2;getRankList(2)" :class="rankTabId == 2 ? 'active' : ''">
                    点赞排行
                </div>
                <div class="rank-reward" @click="rankTabId = 1;getRankList(1)" :class="rankTabId == 1 ? 'active' : ''">
                    打赏排行
                </div>
            </div>
        </head-back>
        <div class="rank">
            <ul class="rank-tablist ">
                <li @click="type_id = item.id;switchTab(index)" :class="tabsId == index ? 'active':''" v-for="(item, index) in indexTypeList" :key="index"><span>{{item.name}}</span></li>
            </ul>
            <!-- <vueWaterfallEasy :imgsArr="imgsList"></vueWaterfallEasy> -->
            <ul class="rankList flex flex--wrap flex--justify-content--space-between">
                <li @click="$router.push(`/works/${item.id}`)" v-for="(item, index) in rankList" :key="index">
                    <!-- <img :src="item.image ? item.image : 'https://aidingdong-public.oss-cn-beijing.aliyuncs.com/media-static/2019-04-28/5cc5688866f74.png'" alt=""> -->
                    <img src="https://aidingdong-public.oss-cn-beijing.aliyuncs.com/media-static/2019-04-28/5cc5688866f74.png" alt="">
                    <div class="usersinfo">
                        <div class="flex flex--align-items--center">
                            <img :src="item.head" alt="">
                            <span>@{{item.name}}</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import vueWaterfallEasy from 'vue-waterfall-easy'
import api from '../../../../api'
import img1 from '../../../../assets/img/182200786.jpg'
export default {
    components:{
        HeadBack,
        vueWaterfallEasy
    },
    created() {
        this.getRankList()
        this.getIndexType()
    },
    data() {
        return {
            rankTabId:'2',
            tabsId:'',
            imgsList:[{src:img1,href:''},{src:img1,href:''},{src:img1,href:''},{src:img1,href:''},{src:img1,href:''}],
            indexTypeList:[],
            type_id:15,
            rankList:[]

        }
    },
    methods: {
        // 逻辑
        switchTab(index){
            this.tabsId = index
            this.getRankList(this.rankTabId)
        },
        // 获取分类
        async getIndexType(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType)
            console.log(ret)
            this.indexTypeList = ret.response_data.lists
        },
        //
        async getRankList(type=2){
            const {data:ret} = await this.$http.post(this.setApi + api.rankList,this.querystring.stringify({
                type,
                type_id:this.type_id
            }))
            console.log(ret)
            this.rankList = ret.response_data.lists
        }

    },
}
</script>

<style lang="less" scoped>
@import url('./rank.less');
</style>

<template>
    <div id="exam">
        <head-back :searchicon="false">
            <ul>
                <li 
                :class="headNav.typeNavId==index?'active':''" 
                @click="pushTypeNavId(index);getExamlist(item.id)" 
                v-for="(item, index) in headNav.navList" 
                :key="index">
                {{item.name}}
                </li>
            </ul>
        </head-back>
        <div class="exam">
            <!-- 赛事列表 -->
        <div class="exam-lists">
            <ul>
                <li @click="pushDetails(item.id)" v-for="(item, index) in examList.list" :key="index">
                    <div class="exam-contentimg">
                        <img :src="item.cover_img" alt="">   
                    </div> 
                    <div class="exam-contentinfo">
                        <div>
                            <p>{{item.name}}</p>
                            <p>{{item.apply_sum}}人已报名</p>
                        </div>
                        <div>
                            <p>&yen;&nbsp;{{item.money}}&nbsp;元</p>
                            <p>{{item.apply_start_time}}-{{item.apply_end_time}}</p>
                        </div>
                    </div>
                </li>
            </ul>
            <template v-if="examList.list.length == 0">
                <div class="exam-null">
                </div>
            </template>
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
    mounted() {
        this.getHeadNav()
        this.getExamlist(15)
    },
    data() {
        return {
            // 头部导航
            headNav:{
                navList:[],
                typeNavId:0
            },
            // 赛事列表
            examList:{
                list:[]
            }
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
            this.$router.push(`/exam/detail/${id}`)
        },
        // 请求
        // 头部导航分类获取
        async getHeadNav(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType);
            // console.log(ret.response_data.lists)
            this.headNav.navList = ret.response_data.lists;
        },
        // 赛事列表
        async getExamlist(id){
            const {data:ret} = await this.$http.post(this.setApi + api.examLists,this.querystring.stringify({type_id:id}));
            this.examList.list = ret.response_data.lists;
            console.log(ret.response_data.lists)
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./exam.less');
</style>

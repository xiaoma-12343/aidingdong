<template>
    <div id="event">
        <head-back :searchicon="true">
            <ul>
                <li 
                :class="headNav.typeNavId==index?'active':''" 
                @click="pushTypeNavId(index);getEventlist(item.id)" 
                v-for="(item, index) in headNav.navList" 
                :key="index">
                {{item.name}}
                </li>
            </ul>
        </head-back>
        <!-- 赛事列表 -->
        <div class="event-lists">
            <ul>
                <li @click="pushDetails(item.id)" v-for="(item, index) in eventList.list" :key="index">
                    <div class="event-contentimg">
                        <img :src="item.head_img" alt="">
                        <div v-show="item.status == 1" class="event-status">报名中</div>
                        <div v-show="item.status == 2" class="event-status">报名截止</div>
                        <div v-show="item.status == 3" class="event-status">投票中</div>
                        <div v-show="item.status == 4" class="event-status">评分中</div>
                        <div v-show="item.status == 5" class="event-status">已公布</div>
                    </div>
                    <div class="event-contentinfo">
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
            <template v-if="eventList.list.length == 0">
                <div class="event-null">
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import api from '../../api/index.js'
// 组件引入
import HeadBack from '../../components/headback/headback'
export default {
    name:'event',
    components:{
        HeadBack
    },
    mounted() {
        this.getHeadNav()
        
    },
    data() {
        return {
            // 头部导航
            headNav:{
                navList:[],
                typeNavId:0
            },
            // 赛事列表
            eventList:{
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
            this.$router.push(`/event/details/${id}`);
        },
        // 请求
        // 头部导航分类获取
        async getHeadNav(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType);
            console.log(ret.response_data.lists,'===')
            let tempObj = {
                id: 0,
                img: '',
                name: '全部',
                sort: 0
            }
            ret.response_data.lists.unshift(tempObj);
            this.headNav.navList = ret.response_data.lists;
            this.getEventlist(ret.response_data.lists[0].id);
        },
        // 赛事列表
        async getEventlist(id){
            const {data:ret} = await this.$http.post(this.setApi + api.eventList,this.querystring.stringify({type_id:id}));
            this.eventList.list = ret.response_data.lists;
            console.log(ret.response_data.lists)
        }

    },
    
}
</script>

<style lang="less" scoped>
@import url('./event.less');
</style>


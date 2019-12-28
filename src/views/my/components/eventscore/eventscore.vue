<template>
    <div id="event-score">
        <head-back>
            <span class="head-title">
                赛事评分
            </span>
        </head-back>
        <div class="event-score">
            <ul class="event-tab flex flex--align-items--center flex--justify-content--space-between">
                <li :class="tabIndex==item.index?'active':''" @click="tabbar(item.index)" v-for="(item, index) in tabList" :key="index">{{item.name}}</li>
            </ul>
            <ul class="scorelist">
                <li @click="$router.push(`/my/event/score/details/${item.competition_id}&${tabIndex}`)" v-for="(item, index) in scoreList" :key="index">
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <p>{{item.apply_num}}</p>
                        <span v-show="tabIndex == 4">待评分</span>
                        <span v-show="tabIndex == 5">已评分</span>
                        <span v-show="tabIndex == 6">逾期未评分</span>
                    </div>
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <div>
                            <p>{{item.name}}</p>
                            <span>报名截止时间：{{item.grade_start_time}}-{{item.grade_end_time}}</span>
                        </div>
                        <i class="iconfont icon-youjiantou"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api';
export default {
    components:{
        HeadBack
    },
    created() {

        // console.log('==============', this.$route.query.type);
        if(this.$route.query && this.$route.query.type == 1){
            this.tabIndex = 5;
        }

        this.getEventScorelist()
    },
    data() {
        return {
            tabList:[
                {
                    name:'评分',
                    index:4
                },{
                    name:'已评分',
                    index:5
                },{
                    name:'逾期未评分',
                    index:6
                }
            ],
            tabIndex:4,
            scoreList:[]
        }
    },
    methods: {
        tabbar(index){
            this.tabIndex = index
            this.getEventScorelist(index)
        },
        async getEventScorelist(status = 4){
            const {data:ret} = await this.$http.post(this.setApi + api.eventscore,this.querystring.stringify({
                access_token:window.localStorage.getItem('token'),
                status
            }))
            // console.log(ret);
            this.scoreList = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./eventscore.less');
</style>

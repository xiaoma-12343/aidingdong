<template>
    <div id="eventdetail">
        <head-back :searchicon="false">
            <span class="head-title">赛事详情</span>
        </head-back>
        <!-- 详情 -->
        <div class="details-content">
            <div class="topcontent">
                <div class="details-contentimg">
                    <!-- <img :src="eventDetails[0].referral_url" alt="">    -->
                    <video controls :src="eventDetails[0].video"></video>
                </div> 
                <div class="details-contentinfo">
                    <div>
                        <p>{{eventDetails[0].competition_name}}</p>
                        <p>{{eventDetails[0].apply_sum}}人已报名</p>
                    </div>
                    <div>
                        <p>&yen;&nbsp;{{eventDetails[0].money}}&nbsp;元</p>
                        <p>{{eventDetails[0].apply_start_time}}-{{eventDetails[0].apply_end_time}}</p>
                    </div>
                </div>
            </div>
            <!-- 阵容 -->
            <div class="details-lineup">
                <div class="details-linetitle flex flex--justify-content--space-between flex--align-items--center">
                    <p>举办方阵容</p>
                    <div class="more" v-if="showMore" @click="showAll = !showAll">查看全部</div>
                </div>
                <ul class="details-lineuplist flex flex--align-items--center" :class="{'h170': showAll}">
                    <li v-for="(item, index) in hostList" :key="index" @click="viewDetail(item)">
                        <img :src="item.head" alt="头像">
                        <p>{{item.username}}</p>
                    </li>
                </ul>
            </div>
            <!-- 活动介绍 -->
            <div class="details-activity">
                <div class="details-linetitle flex flex--justify-content--space-between flex--align-items--center">
                    <p>活动介绍</p>
                    <!-- <router-link to="#">查看全部</router-link> -->
                </div>
                <div class="details-contents" v-html="eventDetails[0].content" >
                    <!-- 富文本内容 -->
                </div>
            </div>
        </div>
        <!-- 我要报名 -->
        <div class="details-signup">
            <button v-show="eventDetails[0].status == 1" @click="$router.replace(`/event/signup/${$route.params.id}`)">我要报名</button>
            <button v-show="eventDetails[0].status == 2" >报名截止</button>
            <button v-show="eventDetails[0].status == 3"  @click="$router.replace(`/event/vote/${voitId}&3`)">投票中</button>
            <button v-show="eventDetails[0].status == 4"  @click="$router.replace(`/event/vote/${voitId}&4`)">评分中</button>
            <button v-show="eventDetails[0].status == 5"  @click="$router.replace(`/event/vote/${voitId}&5`)">已公布</button>
        </div>
    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback'
import api from '@/api/index.js'
export default {
    components:{
        HeadBack,
        // ConTent:this.eventDetails[0].content
    },
    created() {
        this.getEventDetails();
        // 获取举办方阵容
        this.getHostTeam();
    },
    data() {
        return {
            eventDetails:[
                {
                    competition_name:''
                }
            ],
            hostList: [],
            showMore: false,
            showAll: true,      // 是否显示全部
            voitId: 0,          // 查看投票详情的id
        }
    },
    methods: {
        /**
         * 查看举办方个人详情
         */
        viewDetail(obj){
            this.$router.push('/videoDetails?id='+obj.id);
        },

        /**
         * 获取赛事详情
         */
        async getEventDetails(){
            let id = this.$route.params.id;
            this.voitId = this.$route.params.id;
            const {data:ret} = await this.$http.post(this.setApi + api.eventDetail,this.querystring.stringify({
                competition_id: id
            }));
            // console.log('==============', ret)
            if(!ret.error_code){
                this.eventDetails = ret.response_data.detail;
            }else{
                this.$toast(ret.error_msg);
            }
            
        },

        /**
         * 获取举办方阵容
         */
        async getHostTeam(){
            let id = this.$route.params.id
            const {data:ret} = await this.$http.post(this.setApi + api.get_master_list,this.querystring.stringify({
                competition_id: id
            }));
            this.hostList = ret.response_data.lists;
            if(ret.response_data.lists.length > 5){
                this.showMore = true;
            }else{
                this.showMore = false;
            }
            // console.log('=======举办方阵容=======', this.hostList);
            
        },

    },

}
</script>

<style lang="less" scoped>
@import url('./eventdetail.less');
</style>
<style>
.details-contentimg {
    
}
.details-contentimg video {
    display: block;
    width: 100%;
}
#eventdetail .details-content .details-lineup .details-lineuplist.h170 {
    height: 86px;
    overflow: hidden;
}
.more {
    font-size: 14px;
    color: #999;
}
</style>



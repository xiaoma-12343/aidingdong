<template>
    <div class="appointment-class">
        <div class="header-title">
            <head-back>
                <span class="head-title">教练详情</span>
            </head-back>
        </div>
        <div v-if="coach_detail_coach && coach_detail_course && coach_detail_comment">
            <div class="header-top">
                <img :src="coach_detail_coach.lists.head" alt="">
            </div>
            <div class="top-info flex flex--row plr14">
                <div class="header-img-top flex flex--justify-content--space-between flex--align-items--center">
                    <div class="header-left flex flex--align-items--center">
                        <img class="header" :src="coach_detail_coach.lists.head" alt="">
                        <div class="header-name flex flex--row">
                            <h4>{{coach_detail_coach.lists.nickname}}</h4>
                            <p>累计课时：{{coach_detail_coach.lists.reserve_time.length}}课时</p>
                        </div>
                    </div>
                    <div class="header-right">
                        <h4><span>教龄：</span>{{coach_detail_coach.lists.year}}年</h4>
                        <!-- <p>评分：3</p> -->
                    </div>
                </div>
                <div class="header-img-bottom flex">
                    <div class="left-hearder-txt1">
                        擅长：
                    </div>
                    <div class="left-hearder-txt2 flex flex--wrap">
                        <!-- 瑜伽 | 中国功夫 | 扭秧歌 | 舞蹈 | 中国功夫 | 扭秧歌 | 舞蹈 | 中国功夫 | 扭秧歌 | 舞蹈  -->
                        {{coach_detail_coach.lists.master}}
                    </div>
                </div>
            </div>
            <!-- <div class="title flex flex--justify-content--space-between flex--align-items--center">
                <p><a href="#aaaa">教练</a></p>
                <p><a href="#aaaa">课程</a></p>
                <p><a href="#aaaa">评价</a></p>
            </div> -->
            <div class="about">
                <div class="top-title flex flex--justify-content--space-between flex--align-items--center">
                    <h4>关于TA</h4>
                    <p @click="viewMore(1)">全部</p>
                </div>
                <div class="about-content plr14">
                    <p :class="{'ellipsis4': !showAllAbout, 'ellipsisauto': showAllAbout}" >
                        {{coach_detail_coach.lists.desc}}
                    </p>
                </div>
            </div>
            <div class="appointment-time">
                <div class="top-title flex flex--justify-content--space-between flex--align-items--center">
                    <h4 class="flex flex--align-items--end">可约时间<p>近七天</p></h4>
                    <p @click="viewMore(2)">全部</p>
                </div>
                <div class="appointment-lists plr14">
                    <ul class="flex flex--wrap" :class="{'h200': showAllSometime}">
                        <li v-for="(item,index) in coach_detail_coach.lists.class_time" :key="index" class="flex flex-center-wrapper" >{{item}}</li>
                    </ul>
                </div>
            </div>
            <div class="server-place appointment-time">
                <div class="top-title flex flex--justify-content--space-between flex--align-items--center">
                    <h4 class="flex flex--align-items--end">服务场地<p>1个场地</p></h4>
                    <p @click="viewMore(3)">全部</p>
                </div>
                <div class="appointment-lists plr14">
                    <ul class="flex flex--wrap" :class="{'h300': showAllServerPlace}">
                        <li v-for="(item,index) in 1" :key="index" class="flex flex-center-wrapper" >{{coach_detail_coach.lists.shop_name}}</li>
                    </ul>
                </div>
            </div>
            <div class="teaching">
                <div class="top-title flex flex--justify-content--space-between flex--align-items--center">
                    <h4 class="flex flex--align-items--end">所授课程<p>{{coach_detail_course.lists.length}}种</p></h4>
                    <p @click="viewMore(4)">全部</p>
                </div>
                <div class="teaching-content plr14">
                    <ul class="flex flex--wrap"  :class="{'h400': showAllteaching}">
                        <li 
                            class="flex flex--row" 
                            v-for="(item, index) in coach_detail_course.lists" 
                            @click="gotoDetail(item)"
                            :key="index">
                            <div class="them-img">
                                <img :src="item.img" alt="">
                            </div>
                            <div class="title1 ellipsis1">
                                {{item.name}}
                            </div>
                            <div class="sub-title ellipsis1">
                                {{item.introduce}}
                            </div>
                            <div class="show-price">
                                <h5 class="flex flex--align-items--end">￥{{item.unit_price * 1}}<span>/课时</span></h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="comments" id="aaaa">
                <div class="comments-title flex">
                    <h3>评论互动</h3>
                </div>
                <div class="comments-lists plr14">
                    <ul v-if="coach_detail_comment.lists.length > 0">
                        <li class="flex flex--row" v-for="(item,index) in coach_detail_comment.lists" :key="index">
                            <div class="comments-top flex flex--align-items--center flex--justify-content--space-between">
                                <div class="comments-left flex flex--align-items--center">
                                    <img class="comment-header" :src="item.head" alt="头像">
                                    <div class="comments-name flex flex--row">
                                        <h3>{{item.nickname}}</h3>
                                        <p>{{item.ctime | timeFilter}}</p>
                                    </div>
                                </div>
                                <div class="comments-right">
                                    <!-- 评分 -->
                                </div>
                            </div>
                            <div class="comments-bottom ellipsis6">
                                <p class="ellipsis6">
                                    {{item.content}}
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div v-else class="no-result">
                        <p>暂无评论</p>
                    </div>
                </div>
            </div>



        </div>

    </div>
</template>
<script>
import HeadBack from '@/components/headback/headback';
import api from '@/api';
export default {
    data(){
        return {
            coach_id: this.$route.query.coach_id,

            coach_detail_coach: null,               // 教练详情
            coach_detail_course: null,              // 课程
            coach_detail_comment: null,             // 评论

            showAllAbout: false,                    // 查看全部关于TA
            showAllSometime: true,                 // 查看全部约课时间
            showAllServerPlace: true,              // 查看所有服务场地
            showAllteaching: true,                 // 查看所有授课
        }
    },
    components: {
        HeadBack
    },
    created(){
        // console.log('coach_idcoach_idcoach_id', this.coach_id);
        // 获取教练详情
        this.get_detail_coach();

    },
    methods: {
        /**
         * 跳转课程详情
         */
        gotoDetail(obj){
            this.$router.push({
                path: `/classDetail?coach_id=${this.coach_detail_coach.lists.id}&course_id=${obj.id}`
            })
        },
        
        /**
         * 查看全部
         * @param {*} type  查看类型
         */
        viewMore(type){
            // console.log(type);
            let key = Number(type);

            switch(key){
                case 1:
                    // 查看全部关于TA
                    this.showAllAbout = !this.showAllAbout;
                break;
                case 2:
                    // 查看全部约课时间
                    this.showAllSometime = !this.showAllSometime;
                break;
                case 3:
                    // 查看全部服务课程
                    this.showAllServerPlace = !this.showAllServerPlace;
                break;
                case 4:
                    // 查看全部所授课程
                    this.showAllteaching = !this.showAllteaching;
                break;
            }

        },

        /**
         * 获取教练详情
         */
        async get_detail_coach(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                coach_id: this.coach_id
            }

            const {data:ret} = await this.$http.post(this.setApi + api.coach_detail_coach, this.querystring.stringify(params));
            
            if(!ret.error_code){
                let tempArr = [];
                ret.response_data.lists['class_time'] = ret.response_data.lists.reserve_time.toString().split(',');
                this.coach_detail_coach = ret.response_data;
                console.log('教练详情', JSON.parse(JSON.stringify(this.coach_detail_coach)));
                // 获取课程
                this.get_detail_course(ret.response_data.lists.id);

                // 获取评论详情
                this.get_detail_comment(ret.response_data.lists.id);
            }else{
                this.$toast(ret.error_msg);
            }
        },

        /**
         * 获取课程接口
         */
        async get_detail_course(coach_id){
            let params = {
                access_token: window.localStorage.getItem('token'),
                coach_id
            }

            const {data:ret} = await this.$http.post(this.setApi + api.coach_detail_course, this.querystring.stringify(params));
            
            if(!ret.error_code){
                this.coach_detail_course = ret.response_data;
                console.log('课程详情', JSON.parse(JSON.stringify(this.coach_detail_course)));
            }else{
                this.$toast(ret.error_msg);
            }
        },

        /**
         * 评论详情
         */
        async get_detail_comment(coach_id){
            let params = {
                access_token: window.localStorage.getItem('token'),
                coach_id
            }

            const {data:ret} = await this.$http.post(this.setApi + api.coach_detail_comment, this.querystring.stringify(params));
            
            if(!ret.error_code){
                this.coach_detail_comment = ret.response_data;
                console.log('评论详情', JSON.parse(JSON.stringify(this.coach_detail_comment)));
            }else{
                this.$toast(ret.error_msg);
            }
        },

    }


}
</script>
<style scoped>
    .h200 {
        height: 5rem;
        overflow: hidden;
    }
    .h300 {
        height: 2.5rem;
        overflow: hidden;
    }
    .h400 {
        height: 11rem;
        overflow: hidden;
    }



    .teaching-content {
        padding-bottom: 1.25rem;
    }
    .teaching-content li {
        width: 6.875rem;
        box-sizing: border-box;
        margin-bottom: 1.25rem;
        margin-right: .5rem;
    }
    .teaching-content li:nth-child(3n + 3) {
        margin-right: 0;
    }
    .teaching-content li .them-img {
        width: 100%;
        height: 6.875rem;
        margin-bottom: .5rem;
    }
    .teaching-content li .them-img img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .teaching-content li .title1 {
        font-size: .9375rem;
        color: #333333;
        margin-bottom: .25rem;
    }
    .teaching-content li .sub-title {
        font-size: .75rem;
        color: #999999;
        margin-bottom: .25rem;
    }
    .teaching-content li .show-price h5 {
        color: #FF3B30;
        font-size: 1.125rem;
        margin: 0;
        line-height: 1.5625rem;
    }
    .teaching-content li .show-price h5 span {
        font-size: .75rem;
        color: #CCCCCC;
    }
    h4 {
        margin: 0;
    }
    .appointment-class {
        padding-top: 2.75rem;
    }
    .header-top {
        position: relative;
        height: 6.9375rem;
        /* background-image: url(../../../src/assets/img/topic-bgc.png);
        background-repeat: no-repeat;
        background-position: top center;
        background-size: 100% auto;  */
        overflow: hidden;
    }
    .header-top img {
        width: 100%;
        height: auto;;
    }
    .header-top::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: .4;
    }
    .top-info {
        height: 7.1875rem;
        width: 100%;
        box-sizing: border-box;
        padding: .875rem;
        padding-top: 0;
        /* background: skyblue; */
    }
    img.header {
        display: block;
        width: 3.75rem;
        height: 3.75rem;
        border-radius: 3.75rem;
        position: relative;
        top: -1rem;
        margin-right: .625rem;
    }
    .header-name h4 {
        font-size: 1.125rem;
        color: #312F32;
        margin-bottom: .25rem;
    }
    .header-name p {
        font-size: .8125rem;
        color: #999;
    }
    .header-right h4 {
        font-size: 1.0625rem;
        color: #312F32;
        margin-bottom: .25rem;
    }
    .header-right h4 span {
        font-size: .8125rem;
        color: #999;
    }
    .header-right p {
        font-size: .75rem;
    }
    .header-img-bottom {
        font-size: .75rem;
        color: #9B9B9B;
        line-height: 1.0625rem;
    }
    .left-hearder-txt1 {
        width: 12%;
        white-space: nowrap;
        font-size: .8125rem;
        color: #312F32;
    }
    .left-hearder-txt2 {
        width: 85%;
    }
    .header-img-top {
        margin-bottom: .625rem;
    }
    .title {
        height: 3.125rem;
        background: #F1F1F2;
    }
    .title p {
        width: 33.3%;
        text-align: center;
        border-right: 1px solid #CCCCCC;
        box-sizing: border-box;
    }
    .title p:last-child {
        border-right: none;
    }

    .top-title {
        padding: .9375rem .875rem;
    }
    .top-title h4 {
        font-size: .9375rem;
        color: #312F32;
    }
    .top-title h4 p {
        font-size: .8125rem;
        color: #999;
        margin-left: .375rem;
    }
    .top-title p {
        font-size: .8125rem;
        color: #0EAF0A;
    }
    .plr14 {
        padding: 0 .875rem;
        position: relative;
        margin-bottom: .3125rem;
    }
    .plr14::before {
        position: absolute;
        content: '';
        bottom: -0.3125rem;
        left: 0;
        right: 0;
        height: .3125rem;
        background: #F2F2F2;
    }
    .about-content {
        font-size: .75rem;
        color: #9B9B9B;
        line-height: 1.0625rem;
        padding-bottom: 1.25rem; 
    }
    .appointment-lists {
        padding-bottom: 1.875rem;
        padding-top: .625rem;
    }
    .appointment-lists li {
        margin-bottom: .625rem;
        width: 6.1875rem;
        height: 1.875rem;
        background: #F1F1F2;
        color: #606060;
        font-size: .625rem;
        border-radius: 3.75rem;
        margin-right: 1.5625rem;
    }
    .appointment-lists li:nth-child(3n + 3){
        margin-right: 0;
    }
    .comments-title {
        font-size: 1.125rem;
        color: #312F32;
        padding: .625rem 1.5rem;
    }
    .comment-header {
        display: block;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        margin-right: .625rem;
    }
    .comments-bottom {
        font-size: .875rem;
        color: #312F32;
        line-height: 1.25rem;
        border-bottom: 1px solid #EEEEEE;
        padding-bottom: .625rem;
        padding-top: .625rem;
        text-align: justify;
    }
    .comments-name h3 {
        font-size: .875rem;
        color: #312F32;
        margin: 0;
        margin-bottom: .25rem;
    }
    .comments-name p {
        font-size: .625rem;
        color: #9B9B9B;
    }
    .comments-lists li {
        padding-top: 1.25rem;
    }
    .teaching-content {
        padding-bottom: 1.25rem;
    }
    .comments-right {
        font-size: .875rem;
    }
    .no-result {
        text-align: center;
        padding-bottom: 1.875rem;
    }
    .title p a {
        color: #333;
    }






    .ellipsis1 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .ellipsis2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .ellipsis3 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
    }
    .ellipsis4 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
    .ellipsisauto {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .ellipsis5 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        overflow: hidden;
    }
    .ellipsis6 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
    }
    
</style>
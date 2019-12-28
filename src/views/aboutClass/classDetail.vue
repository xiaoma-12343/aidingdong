<template>
    <div class="class-detail pt275 pb100">
        <div class="class-title">
            <head-back>
                <span class="head-title">课程详情</span>
            </head-back>
        </div>
        <div class="class-detail-content">
            <div class="class-img flex flex--justify-content--center">
                <img :src="course_detail.img" alt="">
            </div>
            <div class="class-info flex flex--align-items--center flex--justify-content--space-between">
                <div class="info-lef flex flex--row">
                    <h5>{{course_detail.name}}</h5>
                    <p>（购买后，请在{{course_detail.expire_time | dateFilter}}之前使用）</p>
                </div>
                <div class="info-right">
                    <h5>{{course_detail.unit_price}}<span>金币/课时</span></h5>
                    <p>60分钟</p>
                </div>
            </div>
            <!-- <div class="operation flex flex--justify-content--space-between flex--align-items--center">
                <div class="left-operation flex">
                    <img src="../../assets/img/rili.png" alt="">
                    <div class="flex flex--align-items--center">
                        <h5>七天可约近</h5>
                        <p>最近 今日2点</p>
                    </div>
                </div>
                <div class="right-operation flex">
                    <img src="../../assets/img/local.png" alt="">
                    <div class="flex flex--align-items--center">
                        <h5>服务场地 {{course_detail.add_num}}个</h5>
                        <p>最近的xxx</p>
                    </div>
                </div>
            </div> -->
            <div class="class-name">
                <div class="class-title">
                    <h4>课程名称</h4>
                </div>
                <div class="class-content">
                    <p>{{course_detail.introduce}}</p>
                </div>
            </div>
            <div class="class-name intended">
                <div class="class-title">
                    <h4>适用人群</h4>
                </div>
                <div class="class-content">
                    <p>{{course_detail.application_crowd}}</p>
                </div>
            </div>
            <div class="class-name intended">
                <div class="class-title">
                    <h4>课程建议</h4>
                </div>
                <div class="class-content">
                    <p>{{course_detail.suggest}}</p>
                </div>
            </div>
            <div class="class-name intended">
                <div class="class-title ">
                    <h4>课程须知<span>建议</span></h4>
                </div>
                <div class="class-content instructions">
                    <ul class="flex flex--justify-content--space-between flex--align-items--center ">
                        <li class="flex flex--row flex--align-items--center">
                            <img src="../../assets/img/shopping.png" alt="图标">
                            <p>1.购买</p>
                        </li>
                        <li class="flex flex--row flex--align-items--center">
                            <img src="../../assets/img/yuyue.png" alt="图标">
                            <p>2.教练约课</p>
                        </li>
                        <li class="flex flex--row flex--align-items--center">
                            <img src="../../assets/img/class-lists.png" alt="图标">
                            <p>3.签到上课</p>
                        </li>
                        <li class="flex flex--row flex--align-items--center">
                            <img src="../../assets/img/comments.png" alt="图标">
                            <p>4.评价</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="buy flex flex--justify-content--space-between flex--align-items--center">
                <div class="left-concat flex flex--row flex--align-items--center">
                    <img src="../../assets/img/concat.png" alt="">
                    <p>联系教练</p>
                </div>
                <div class="right-btn">
                    <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="buy">立即购买</a>
                </div>
            </div>
        </div>


        <chose-pay-type 
            ref="choseType" 
            :orderdetail="course_detail"
            :needPayType="3"
            :position="'bottom'"></chose-pay-type>

    </div>
</template>
<script>
import HeadBack from '@/components/headback/headback';
import chosePayType from '@/components/chosePayType';
import api from '@/api';
export default {
    data(){
        return {
            coach_id: this.$route.query.coach_id,
            course_id: this.$route.query.course_id,
            course_detail: null
        }
    },
    components: {
        HeadBack,
        chosePayType
    },
    created(){
        // 获取课程详情
        this.get_detail_coach();
    },
    methods: {
        /**
         * 打开购买弹窗
         */
        buy(){
            // this.$refs.choseType.open();
            this.$router.push({
                path: `/classOrder?order_detail=${JSON.stringify(this.course_detail)}&coach_id=${this.coach_id}`
            })
        },

        /**
         * 获取课程详情
         */
        async get_detail_coach(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                coach_id: this.coach_id,
                course_id: this.course_id
            }

            const {data:ret} = await this.$http.post(this.setApi + api.course_detail, this.querystring.stringify(params));
            
            if(!ret.error_code){
                this.course_detail = ret.response_data[0];
                // console.log('教练详情', JSON.parse(JSON.stringify(this.course_detail)));
            }else{
                this.$toast(ret.error_msg);
            }
        },
    }
}
</script>
<style scoped>
    h4,
    h5 {
        margin: 0;
    }
    .class-detail-content {
        padding: 0 .875rem;
    }
    .class-detail-content .class-img img {
        display: block;
        width: 21.125rem;
        height: 9.0625rem;
        border-radius: .375rem;
    }
    .pt275 {
        padding-top: 2.75rem;
    }
    .class-title {
        padding-top: .625rem;
    }
    .class-info {
        /* height: 3.625rem; */
        padding-top: 1.25rem;
    }
    .class-info h5 {
        margin-bottom: .5rem;
    }
    .info-lef h5 {
        font-size: .9375rem;
        color: #333333;
    }
    .info-lef p {
        font-size: .75rem;
        color: #999999;
    }
    .info-right {
        text-align: right;
    }
    .info-right h5 {
        font-size: 1.125rem;
        color: red;
    }
    .info-right h5 span {
        color: #333;
        font-size: .9375rem;
    }
    .info-right p {
        font-size: .75rem;
        color: #999999;
    }
    .operation {
        height: 4.1875rem;
        border-top: .3125rem solid #F2F2F2;
    }
    .class-info {
        padding-bottom: 1.25rem;
        margin-bottom: 1.25rem;
        border-bottom: .3125rem solid #F2F2F2;
    }
    .operation img {
        display: block;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin-right: 1.125rem;
    }
    .operation h5 {
        font-size: .875rem;
        color: #333333;
        /* margin-bottom: .25rem; */
    }
    .operation p {
        font-size: .75rem;
        color: #999999;
    }
    .operation {
        padding: 0 .75rem;
    }
    .class-title h4 {
        font-size: 1rem;
        color: #4A4A4A;
        padding: .875rem 0;
    }
    .sub-content {
        font-size: .9375rem;
        color: #666666;
    }
    .class-content {
        padding-bottom: 1.2rem;
        line-height: 2.0625rem;
        border-bottom: 1px solid #F1F1F2;
    }
    .class-content p {
        text-indent: 1.5rem;
        text-align: justify;
        font-size: .9375rem;
        color: #666666;
    }
    .intended .class-content p {
        text-indent: 0;
    }
    .instructions ul {
        padding: 0 .625rem;
    }
    .instructions ul li img {
        display: block;
        width: 1.6875rem;
        height: 1.6875rem;
        margin-bottom: .6875rem;
    }
    .instructions ul li p {
        color: #666666;
        font-size: .9375rem;
    }
    .pb100 {
        padding-bottom: 6.25rem;
    }
    .buy {
        height: 2.875rem;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 99;
        padding: 0 1.3125rem 0 1.1875rem;
        font-size: .8125rem;
        color: #333333;
        background: #fff;
        box-shadow:-1px -1px 8px 2px rgba(169,169,169,0.19);
    }
    .buy img {
        display: block;
        width: 1.1875rem;
        height: 1.1875rem;
        margin-bottom: .25rem;
    }
    .right-btn a {
        width: 5.6875rem;
        height: 1.6875rem;
        color: #fff;
        background: #0EAF0A;
        border-radius: 3.75rem;
    }
</style>
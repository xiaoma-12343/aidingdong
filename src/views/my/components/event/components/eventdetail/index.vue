<template>
    <div id="indexs">
        <head-back>
            <span class="head-title">赛事详情</span>
        </head-back>
        <div class="indexs">
            <div class="video-show" v-if="detailInfo.is_img == 1 && detailInfo.works_url">
                <video controls :src="detailInfo.works_url"></video>
            </div>
            <div class="icon" v-if="detailInfo.is_img == 0 && detailInfo.works_url">
                <img :src="detailInfo.works_url" alt="">
            </div>
            <div class="index-bgc">
                <!-- 图标 works_url -->
                <div class="icon" v-if="!detailInfo.works_url">
                    <img src="../../../../../../assets/icon/upvideo.png" alt="">
                </div>
                <!-- 状态 -->
                <!-- <p class="status" v-show="eventInfo[0].status == 1">待参加</p>
                <p class="status" v-show="eventInfo[0].status == 2">已上传</p>
                <p class="status" v-show="eventInfo[0].status == 3">投票中</p>
                <p class="status" v-show="eventInfo[0].status == 4">评分中</p> -->
                <p class="status" v-if="eventInfo[0].status==1">未支付</p>
                <p class="status" v-else-if="eventInfo[0].status==2">支付失败</p>
                <p class="status" v-else-if="eventInfo[0].status==3">信息待审核</p>
                <p class="status" v-else-if="eventInfo[0].status==4">审核失败</p>
                <p class="status" v-else-if="eventInfo[0].status==5">待参加</p>
                <p class="status" v-else-if="eventInfo[0].status==6">已上传</p>
                <p class="status" v-else-if="eventInfo[0].status==7">作品审核失败</p>
                <p class="status" v-else-if="eventInfo[0].status==8">作品审核成功</p>

                <!-- 参赛信息 -->
                <div class="sign">
                    <p>参赛信息</p>
                    <p>{{eventInfo[0].competition_name}}</p>
                    <p>{{eventInfo[0].type_name}}</p>
                </div>
                <!-- 选手信息 -->
                <div class="userinfo">
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <span>姓名：{{eventInfo[0].user_name}}</span>
                        <span>性别：{{eventInfo[0].sex == 1 ? '男' : '女'}}</span>
                    </div>
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <span>地址：{{eventInfo[0].address}}</span>
                        <span>场馆：{{eventInfo[0].venue}}</span>
                    </div>
                    <div class="flex flex--justify-content--space-between flex--align-items--center">
                        <span>电话：{{eventInfo[0].phone}}</span>
                    </div>
                </div>

                <!-- 报名编号 报名时间 -->
                <div class="signnum flex flex--justify-content--space-between">
                    <span>报名编号：{{eventInfo[0].identity_number}}</span>
                    <span>报名时间：{{eventInfo[0].ctime | timeFilter}}</span>
                </div>

                <!-- 待参加 -->
                <div class="options" v-show="eventInfo[0].status == 5">
                    <p>上传截止时间：{{eventInfo[0].apply_end_time | timeFilter}}</p>
                    <p>请{{eventInfo[0].apply_end_time | timeFilter}}之前上传您的比赛作品</p>
                    <div class="button" @click="$router.push(`/my/event/upload`)">上传作品</div>
                </div>

                <div class="options" v-show="type == 1 && status == 1">
                    <div class="button" @click="openPayModle">去支付</div>
                </div>
            </div>
        </div>

        <chose-pay-type 
            ref="choseType" 
            :orderdetail="detailInfo" 
            @closeModle="closeModle"
            :needPayType="1"
            :position="'bottom'"></chose-pay-type>

    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback'
import api from '@/api';
import chosePayType from '@/components/chosePayType';
export default {
    components:{
        HeadBack,
        chosePayType
    },
    created() {
        // console.log('===1111=====', this.detailInfo);
        console.log('===2222=====', this.eventInfo);
    },
    data() {
        return {
            eventInfo: JSON.parse(window.sessionStorage.getItem('eventDetails')),
            type: this.$route.query.type,
            status: this.$route.query.status,
            detailInfo: JSON.parse(this.$route.query.detailInfo),
            orderInfo: null,
        }
    },
    methods: {
        /**
         * 打开支付选择弹窗
         */
        openPayModle(){
            this.$refs.choseType.open();
        },
        closeModle(){
            // this.showPayType = false;
            console.log('showPayType');
        },

        /**
         * 支付报名费用
         */
        async goPay(){
            const {data:ret} = await this.$http.post(this.setApi + api.paymoney,this.querystring.stringify({
                pay_type: 3,
                access_token: window.localStorage.getItem('token'),
                amount: this.eventInfo[0].money,
                competition_id: this.eventInfo[0].competition_id,
                competition_type_id: this.eventInfo[0].competition_id
            }))
            // console.log(ret);
            if(!ret.error_code){
                this.$router.replace('/event/pay/sign-success?amount='+this.eventInfo[0].money)
            }else{
                this.$toast(ret.error_msg);
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
.video-show {
    height: 200px;
}
.video-show video {
    display: block;
    width: 100%;
    height: 100%;
}
</style>

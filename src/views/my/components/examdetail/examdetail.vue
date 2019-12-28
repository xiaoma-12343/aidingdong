<template>
    <div id="exam-detail">
        <head-back>
            <span class="head-title">
                考试详情
            </span>
        </head-back>
        <div class="exam-detail">
            <div class="exam-bg">
                <!-- 图标 -->
                <div class="exam-logo flex flex--align-items--center flex--justify-content--center">
                    <img src="../../../../assets/icon/signgo.png" alt="">
                </div>
                <!-- 状态 status -->
                <div class="exam-status">
                    <span v-if="$route.params.id==1">信息审核中</span>
                    <span v-else-if="$route.params.id==2">待参加</span>
                    <span v-if="$route.params.id==3">评审中</span>
                    <span v-if="$route.params.id==4">已公布</span>
                </div>
                <!-- 参考信息 -->
                <div class="exam-examinfo">
                    <p>参赛信息</p>
                    <p>{{examDetailList[0].e_name}}</p>
                </div>
                <!-- 考生信息 -->
                <div class="exam-student flex flex--justify-content--space-between">
                    <div>
                        <p>姓名：{{examDetailList[0].ea_name}}</p>
                        <p>手机号：{{examDetailList[0].phone}}</p>
                    </div>
                    <div>
                        <p>性别：{{examDetailList[0].sex}}</p>
                        <p>地址：{{examDetailList[0].address}}</p>
                    </div>
                </div>
                <!-- 编号 时间 -->
                <div class="exam-number flex flex--justify-content--space-between">
                    <span>报名编号：{{examDetailList[0].identity_number}}</span>
                    <span>报名时间：{{examDetailList[0].ctime}}</span>
                </div>
                <!-- 待参加时显示 -->
                <div class="exam-prompt" v-show="$route.params.id == 2">
                    <p>考试时间：{{examDetailList[0].exa_start_time}}-{{examDetailList[0].exa_end_time}}</p>
                    <p>请在{{examDetailList[0].exa_end_time}}之前提交您的考试</p>
                    <van-button @click="show = !show" type="primary">立即考试</van-button>
                </div>
                <!-- 评审中 -->
                <div class="exam-wait" v-show="$route.params.id == 3">
                    <van-button type="primary">回顾答题</van-button>
                </div>
                <!-- 已公开 -->
                <div class="exam-public" v-show="$route.params.id == 4">
                    <p>{{examDetailList[0].score}}分</p>
                    <van-button type="primary">答题回顾</van-button>
                    <van-button plain type="primary">查看排名</van-button>
                </div>

                <!-- 模态框 -->
                <van-popup v-model="show">
                    <div class="goExam">
                        <p>50道题</p>
                        <p>计时<span>50</span>分钟</p>
                        <van-button @click="$router.push(`/my/startexam/${$route.params.type_id}/${$route.params.pid}`)" plain hairline type="primary">计时开始</van-button>
                    </div>
                </van-popup>
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
        console.log(this.$route)
        this.getExamDetails()
    },
    data() {
        return {
            show:false,
            examDetailList:[
                {e_name:'加载中'}
            ]
        }
    },
    methods: {
        // 请求
        async getExamDetails(){
            const {data:ret} = await this.$http.post(this.setApi + api.examDetails,this.querystring.stringify({examination_apply_id:this.$route.params.pid,access_token:window.localStorage.getItem('token')}))
            console.log(ret.response_data.lists)
            this.examDetailList = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./examdetail.less');
</style>


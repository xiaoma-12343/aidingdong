<template>
    <div id="sign-exam">
        <head-back>
            <span class="head-title">
                确认报名
            </span>
        </head-back>
        <div class="sign-exam">
            <div class="sign-info">
                <p>参赛者信息</p>
                <div class="sign-name flex flex--justify-content--space-between flex--align-items--center">
                    <span>姓名</span>
                    <input v-model="userInfo.name" placeholder="请输入您的名字" type="text">
                </div>
                <div class="sign-sex flex flex--justify-content--space-between flex--align-items--center">
                    <span>性别</span>
                    <span>{{userInfo.sex == 1　? '男' : '女'}}</span>
                </div>
                <div class="sign-age flex flex--justify-content--space-between flex--align-items--center">
                    <span>年龄</span>
                    <span>{{userInfo.year}}</span>
                </div>
                <div v-if="is_certification == 0" class="sign-real flex flex--justify-content--space-between flex--align-items--center">
                    去实名认证>>
                </div>
                <div class="sign-address flex flex--justify-content--space-between flex--align-items--center">
                    <span>地址</span>
                    <input v-model="userInfo.address" placeholder="请输入您的地址" type="text">
                </div>
                <div class="sign-phone flex flex--justify-content--space-between flex--align-items--center">
                    <span>联系电话</span>
                    <span>{{userInfo.phone}}</span>          
                </div>
            </div>

            <div class="sign-submit" @click="submitpay">支付报名费(&yen; 10元)</div>
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
        this.getExamInfo(this.$route.params.id,this.$route.params.tid)
    },
    data() {
        return {
            userInfo:{},
            is_certification: JSON.parse(window.localStorage.get('userInfo')).is_certification,
        }
    },methods: {
        // 获取用户info
        async getExamInfo(id,tid){
            const {data:ret} = await this.$http.post(this.setApi + api.signExam,this.querystring.stringify({
                type:1,
                examination_id:id,
                examination_type_id:tid,
                user_id:JSON.parse(window.localStorage.getItem('userInfo')).id,
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.userInfo = ret.response_data.user_info[0]
            this.userInfo['address'] = '',
            this.userInfo['name'] = '',
            this.userInfo['height'] = 1
            console.log(this.userInfo)
        },


        // 提交
        async submitpay(){
            if(!this.is_certification){
                this.$toast('请先进行实名认证')
                return
            }


            const {data:ret} = await this.$http.post(this.setApi + api.payExam,this.querystring.stringify({
                examination_id:this.$route.params.id,
                examination_type_id:this.$route.params.tid,
                name:this.userInfo.name,
                sex:this.userInfo.sex,
                year:20,
                phone:this.userInfo.phone,
                address:this.userInfo.address,
                height:1,
                access_token:window.localStorage.getItem('token'),
                user_id:JSON.parse(window.localStorage.getItem('userInfo')).id,
                type:1
            }))
            console.log(ret)
            window.sessionStorage.setItem('examInfo',JSON.stringify(this.userInfo))
            this.$router.push('/exam/sign/detail')
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./signexam.less');
</style>

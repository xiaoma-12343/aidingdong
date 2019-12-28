<template>
    <div id="real">
        <head-back>
            <span class="head-title">
                实名认证
            </span>
        </head-back>
        <div class="real">
            <div class="input">
                <span>真实姓名</span>
                <input type="text" placeholder="请输入您的真实姓名" v-model="realName">
            </div>
            <div class="input">
                <span>身份证号</span>
                <input type="text" placeholder="请输入您的有效身份证号码" v-model="cardNum">
            </div>
        </div>
        <div class="submit" @click="submitCard">实名认证</div>
    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback';
import api from '@/api/index.js';
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            realName:'',
            cardNum:''
        }
    },
    methods: {
        async submitCard (){
            if(!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/.test(this.cardNum) || this.cardNum == '') return this.$toast('请输入正确的身份证号')
            if(this.realName == '') return this.$toast('请输入您的真实姓名')
            const {data:ret} = await this.$http.post(this.setApi + api.cardReal,this.querystring.stringify({
                id_card:this.cardNum,
                id_name:this.realName,
                access_token:window.localStorage.getItem('token')
            }))
            // console.log(ret);
            // 更新本地个人信息
            this.getUserInfo();
            if(ret.response_data.code == 204 || ret.response_data.code == 202 || ret.response_data.code == '205' || ret.response_data.code == '02') return this.$toast(ret.response_data.msg)
            if(ret.response_data.code == '01') return this.$router.replace('/real/success')

        },

        /**
         * 获取个人信息
         */
        async getUserInfo(){
            const {data:ret} = await this.$http.post(this.setApi + api.userInfo, this.querystring.stringify({access_token:window.localStorage.getItem('token')}))
            window.localStorage.setItem('userInfo',JSON.stringify(ret.response_data))
            console.log(ret.response_data)
            this.userInfo = ret.response_data
        }
    },
}
</script>


<style lang="less" scoped>
@import url('./real.less');
</style>

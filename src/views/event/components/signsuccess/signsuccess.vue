<template>
    <div id="sign-success">
        <head-back>
            <span class="head-title">
                支付成功
            </span>
        </head-back>
        <div class="sign-success">
            <div class="sign-pay">
                <div>
                    <van-icon name="success" size="30px" color="#fff"></van-icon>
                </div>
                <p>支付成功</p>
                <p>￥{{amount}}</p>
                <p>请在七日内上传参赛视频</p>
            </div>
            <van-button type="primary" @click="$router.replace('/my/event')">查看报名</van-button>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            amount: this.$route.query.amount
        }
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
@import url('./signsuccess.less');
</style>


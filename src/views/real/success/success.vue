<template>
    <div id="real-success">
        <head-back>
            <span class="head-title">
                认证成功
            </span>
        </head-back>
        <div class="real-success">
            <img src="../../../assets/icon/success.png" alt="">
           <p>认证成功</p>
         <!--   <p>姓名：</p>
            <p>身份证号：123456789</p> -->
            <div class="submit" @click="$router.go(-1)">确定</div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../components/headback/headback'
// import
export default {
    components:{
        HeadBack
    },
    data() {
        return {

        }
    },
    created() {
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
@import url('./success.less');
</style>

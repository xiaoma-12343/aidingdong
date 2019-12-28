<template>
    <div id="tjfp">
        <head-back>
            <span class="head-title">提交发票</span>
        </head-back>

        <div class="tjfp">
            <div class="t_title">
                发票详情
            </div>
            
            <div class="t_title">
                接收方式
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
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>


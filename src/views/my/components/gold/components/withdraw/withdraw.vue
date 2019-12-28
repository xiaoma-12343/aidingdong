<template>
    <div id="withdraw">
        <head-back>
            <span class="head-title">
                金币提现
            </span>
        </head-back>
        <div class="withdraw">
        <!-- 提现金额数量 -->
            <div>
                <p>提现金币</p>
                <div>
                    &yen;<input type="number" placeholder="请输入提现金额">
                </div>
                <div class="flex flex--align-items--center flex--justify-content--space-between">
                    <span>可提现金额：996</span>
                    <span>全部体现</span>
                </div>
            </div>
            <!-- tixian -->
            <div class="flex flex--justify-content--space-between flex--align-items--center">
                <div class="payinfo flex flex--align-items--center">
                    <img src="../../../../../../assets/icon/icon-alipay.png" alt="">
                    <div>
                        <p>齐静春</p>
                        <span>13999999999</span>
                    </div>
                </div>
                <i class="iconfont icon-youjiantou"></i>
            </div>


            <div class="submit">下一步</div>


        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../../../components/headback/headback'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>


<style lang="less" scoped>
@import url('./withdraw.less');
</style>

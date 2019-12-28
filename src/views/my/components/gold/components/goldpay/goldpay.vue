<template>
    <div id="gold-pay">
        <head-back>
            <span class="head-title">
                金币充值
            </span>
        </head-back>
        <div class="gold-pay">
            <div class="gold-rmb">
                <p class="gold-waring">实际充值的余额可用于支付所有类型的课程</p>
                <ul class="flex flex--justify-content--space-between flex--wrap">
                    <li 
                        v-for="(item, index) in payLists" @click="selectPayMoney(item)" 
                        :class="{'active': selectType.type == item.type}"
                        :key="index" class="flex flex--align-items--center flex--justify-content--center">
                        <div>
                            <p>{{item.amount}}金币</p>
                            <span>vip</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="gold-button">
                <!-- <p>同意<a>《支付服务协议》</a></p> -->
                <div class="button" @click="jumpPay">确认支付</div>
            </div>
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
            payLists: [
                {
                    amount: 100,
                    type: 1
                },
                {
                    amount: 200,
                    type: 2
                },
                {
                    amount: 300,
                    type: 3
                },
                {
                    amount: 400,
                    type: 4
                },
                {
                    amount: 500,
                    type: 5
                },
                {
                    amount: 600,
                    type: 6
                }
            ],
            selectType: {
                type: 1,
                amount: 100,
            }
        }
    },
    methods: {
        /**
         * 选择支付方式
         */
        selectPayMoney(obj){
            this.selectType = obj;
        },

        /**
         * 跳转支付页
         */
        jumpPay(){
            // $router.push('/my/gold/select')
            this.$router.push({
                path: '/my/gold/select',
                query: {
                    selectType: this.selectType
                }
            })
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./goldpay.less');
#gold-pay .gold-pay .gold-rmb ul li.active {
    background: #0EAF0A;
    color: #fff;
}
</style>


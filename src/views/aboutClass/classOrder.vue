<template>
    <div class="pt275">
        <div class="class-title">
            <head-back>
                <span class="head-title">订单详情</span>
            </head-back>
        </div>

        <div class="order-item flex flex--align-items--center">
            <div class="order-left">
                <img :src="class_order.img" alt="">
            </div>
            <div class="right-order flex flex--row">
                <h5>{{class_order.name}}</h5>
                <h6>{{class_order.unit_price}}<span>金币/课时</span> <span>60分钟</span></h6>
                <p>购买后，请在{{class_order.expire_time | dateFilter}}前使用</p>
            </div>
        </div>

        <div class="order-item1 flex flex--justify-content--space-between flex--align-items--center">
            <div class="item-left">
                购买课时
            </div>
            <div class="item-right flex flex--align-items--center">
                <p class="btn-jian" @click="operaNum(-1)">-</p>
                <p class="btn-num">{{class_order.num}}</p>
                <p class="btn-jia" @click="operaNum(1)">+</p>
            </div>
        </div>


        <div class="buy flex flex--justify-content--space-between flex--align-items--center">
            <div class="left-concat flex flex--align-items--center">
                总计：￥<span>{{class_order.num * class_order.unit_price}}</span>
            </div>
            <div class="right-btn">
                <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="buy">立即购买</a>
            </div>
        </div>


        <chose-pay-type 
            ref="choseType" 
            :orderdetail="order_detail"
            :needPayType="5"
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
            class_order: JSON.parse(this.$route.query.order_detail),
            coach_id: this.$route.query.coach_id,
            order_detail: null
        }
    },
    components: {
        HeadBack,
        chosePayType
    },
    created(){
        // this.order_detail.num = 1;
        this.$set(this.class_order, 'num', 1);
        console.log('order_detail', this.class_order);
    },
    methods: {
        /**
         * 操作数量加减
         */
        operaNum(type){
            this.class_order.num += type;

            if(this.class_order.num <= 1){
                this.class_order.num = 1;
                return
            }

        },

        /**
         * 打开购买弹窗
         */
        buy(){
            this.$refs.choseType.open();
            this.createdOrder();
            
        },

        /**
         * 生成订单
         */
        async createdOrder(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                coach_id: this.coach_id,
                course_id: this.class_order.id,
                course_name: this.class_order.name,
                class_num: this.class_order.num,
                amount: this.class_order.num * this.class_order.unit_price,
                coupon_id: '',
                expire_time: this.class_order.expire_time
            }

            const {data:ret} = await this.$http.post(this.setApi + api.create_order, this.querystring.stringify(params));
            
            if(!ret.error_code){
                this.order_detail = ret.response_data;
                console.log('订单详情', JSON.parse(JSON.stringify(this.order_detail)));
            }else{
                this.$toast(ret.error_msg);
            }
        }


    }
}
</script>
<style scoped>
    h5,h6 {
        margin: 0;
    }
    .order-left {
        margin-right: 1.0625rem;
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
    .right-order h5 {
        color: #333333;
        font-size: .6875rem;
        margin-bottom: .625rem;
    }
    .right-order h6 {
        font-size: 1.1875rem;
        color: #FF3B30;
        margin-bottom: .625rem;
    }
    .right-order h6 span {
        color: #333333;
        font-size: .75rem;
    }
    .right-order p {
        color: #999999;
        font-size: .6875rem;
    }
    .order-left {
        width: 5.4375rem;
        height: 5.4375rem;
    }
    .order-left img {
        display: block;
        width: 100%;
        height: 100%;
    }
    .pt275 {
        padding-top: 2.75rem;
    }
    .order-item {
        padding: .875rem;
    }
    .left-concat {
        white-space: nowrap;
        font-size: .875rem;
        color: #F70010;
    }
    .left-concat span {
        font-size: 1.0625rem;
        color: #F70010;
        font-weight: 700;
    }
    .order-item1 {
        height: 3rem;
        padding: 0 .9375rem;
        font-size: .875rem;
        color: #333;
        margin-top: 6.25rem;
        border-bottom: 1px solid #E5E5E5;
        border-top: 1px solid #E5E5E5;
    }
    .item-right .btn-jian {
        padding: .25rem .625rem;
        background: #0EAF0A;
        color: #fff;
    }
    .item-right .btn-num {
        padding: 0 1.25rem;
    }
    .item-right .btn-jia {
        padding: .25rem .625rem;
        background: #0EAF0A;
        color: #fff;
    }
</style>
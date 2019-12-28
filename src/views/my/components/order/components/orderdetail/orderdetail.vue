<template>
    <div id="order-detail">
        <head-back>
            <span class="head-title">订单详情</span>
        </head-back>
        <div class="order-detail">
            <!-- 订单商品信息 -->
            <div class="order-info flex flex--justify-content--space-between">
                <div class="order-infomation flex">
                    <div class="order-image flex flex--align-items--center">
                        <img :src="orderInfo.img" alt="">
                    </div>
                    <div class="order-name">
                        <p>{{orderInfo.name}}</p>
                        <span v-html="orderInfo.content"></span>
                    </div>
                </div>
                <div class="order-money">
                    <p>&yen;&nbsp;{{orderInfo.amount}}</p>
                    <!-- 购课订单详情数量 -->
                    <!-- <span>数量：×1</span> -->
                </div>
            </div>
            <!-- 购课订单详情券码 -->
            <ul class="order-number">
                <li 
                    class="flex flex--justify-content--space-between flex--align-itams--center" 
                    v-for="(item, index) in orderArr" 
                    @click="openQrCode(item)"
                    :key="index">
                    <span>券码{{index+1}}：{{item.code}}</span>
                    <img v-if="item.status == 1" src="../../../../../../assets/icon/order/icon-ed.png" alt="">
                </li>
            </ul>
            <!-- 信息 -->
            <div class="product-info">
                <p>订单信息</p>
                <ul>
                    <li><span>订单号</span><span>{{orderInfo.order_sn}}</span></li>
                    <li><span>下单时间</span><span>{{orderInfo.ctime | timeFilter}}</span></li>
                </ul>
                <ul>
                    <li><span>商品总价</span><span>¥{{orderInfo.amount}}</span></li>
                    <li><span>优惠</span><span>-¥0.00</span></li>
                    <li><span>实付款</span><span>¥{{orderInfo.amount}}</span></li>
                </ul>
            </div>

            <!-- <div class="qrcode flex flex-center-wrapper flex--row">
                <p>消费二维码</p>
                <div class="qr-img">
                    <img src="" alt="">
                </div>
            </div> -->

            <van-popup v-model="showPopup">
                <div class="qrcode flex flex-center-wrapper flex--row">
                    <p>消费二维码</p>
                    <div class="qr-img">
                        <img :src="showQrCode.qr" alt="消费二维码">
                    </div>
                </div>
            </van-popup>


            <div class="order-button flex" v-if="orderInfo.pay_status  == 1">
                <div class="order-cancel" @click="cancelOrder">取消订单</div>
                <div class="order-confirm" @click="openSelect">去支付</div>
            </div>
        </div>



        <!-- 选择支付方式 -->
        <chose-pay-type 
            ref="choseType" 
            :orderdetail="orderInfo" 
            @closeModle="closeModle" 
            :needPayType="orderInfo.needPayType" 
            :position="'bottom'"></chose-pay-type>


    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback';
import api from '@/api/index.js';
import chosePayType from '@/components/chosePayType';
export default {
    components:{
        HeadBack,
        chosePayType
    },
    created(){
        // 获取路由参数
        this.log('获取的参数', this.$route.query.orderInfo);
        this.orderInfo = this.$route.query.orderInfo;
        // 获取订单详情
        this.getOrderDetail();
    },
    data() {
        return {
            orderInfo: null,
            showPayType: false,
            order_detail: null,
            showPopup: false,
            orderArr: [],
            showQrCode: {
                qr: null
            }
        }
    },
    methods: {
        /**
         * 出示二维码
         */
        openQrCode(obj){
            this.showPopup = true;
            this.showQrCode = obj;
        },

        /**
         * 获取订单详情
         */
        async getOrderDetail(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                order_sn: this.orderInfo.order_sn,
            };
            const {data:ret} = await this.$http.post(this.setApi + api.class_order_detail, this.querystring.stringify(params));
            if(!ret.error_code){
                for(var i in ret.response_data.qr_info){
                    console.log('iiiiiiiiiii', i);
                    this.orderArr.push(ret.response_data.qr_info[i]);
                }

                this.order_detail = ret.response_data;
                console.log('获取订单详情', this.orderArr);
            }
        },

        /**
         * 打开选择弹窗
         */
        openSelect(){
            this.showPayType = !this.showPayType;
            this.$refs.choseType.open();
        },
        closeModle(){
            // this.showPayType = false;
            console.log('showPayType');
        },

        /**
         * 取消订单
         */
        async cancelOrder(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                order_sn: this.orderInfo.order_sn,
                type: 2
            };
            const {data:ret} = await this.$http.post(this.setApi + api.delete_cancel_order, this.querystring.stringify(params));
            // this.log('取消订单', ret);
        },

        /**
         * 赛事报名确认支付
         */
        async confirmOrder(){
            let params = {
                pay_type: 3,        // 1 支付宝  2 微信  3 金币支付方式（默认金币支付）
                access_token: window.localStorage.getItem('token'),
                amount: this.orderInfo.amount,
                competition_id: this.orderInfo.id,
                competition_type_id: this.orderInfo.competition_id
            };
            const {data:ret} = await this.$http.post(this.setApi + api.paymoney, this.querystring.stringify(params));
            if(!ret.error_code){
                this.$toast('支付成功！');
                this.$router.push({
                    path: '/my/order'
                })
            }else{
                this.$toast(ret.error_msg);
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./orderdetail.less');
.order-image {
    border: none;
}
.order-image img {
    display: block;
    width: 100%;
    height: auto;
}

.qrcode {
    font-size: 1rem;
    color: #333;
    background: #fff;
    padding: 1.25rem 1.875rem;
    border-radius: .625rem;
}
.qrcode p {
    padding: 1.25rem;
}
.qr-img {
    width: 9.375rem;
    height: 9.375rem;
}
.qr-img img {
    display: block;
    width: 100%;
}
</style>


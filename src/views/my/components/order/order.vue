<template>
    <div id="order">
        <head-back :isshow="false">
            <span class="head-title">我的订单</span>
            <span class="head-right" @click="$router.push('/invoice')">开发票</span>
        </head-back>
        <div class="order">
            <!-- tab -->
            <ul class="order-tab flex flex--align-items--center">
                <li @click="switchTab(0)" :class="orderTabId == 0 ? 'active' : ''"  >全部</li>
                <li @click="switchTab(1)" :class="orderTabId == 1 ? 'active' : ''"  >待支付</li>
                <li @click="switchTab(3)" :class="orderTabId == 3 ? 'active' : ''"  >已支付</li>
            </ul>
            <!-- order-list  All list -->
            <ul class="order-list">
                <li v-for="(item, index) in orderLists" :key="index" @click="goDetail(item)">
                    <div class="order-list-top flex flex--justify-content--space-between flex--align-items--center">
                        <p>{{item.ctime |  timeFilter}}</p>
                        <span v-show="item.pay_status == 1">待支付</span>
                        <span v-show="item.pay_status == 3">待消费</span>
                        <span v-show="item.pay_status == 4">已使用</span>
                    </div>
                    <div class="order-list-center flex">
                        <div class="order-list-img flex flex--justify-content--center flex--align-items--center">
                            <img :src="item.img" alt="">
                        </div>
                        <div class="order-list-content">
                            <p>{{item.course_name}}</p>
                            <span>× {{item.class_num}}</span>
                        </div>
                    </div>
                    <div class="order-list-bottom flex flex--justify-content--end">
                        <div class="order-list-box">
                            <p class="order-list-money">总价：<span>&yen;{{item.amount}}</span></p>
                            <div class="order-list-button" v-show="item.pay_status == 3">查看券码</div>
                            <div class="order-list-buttons" v-show="item.pay_status == 1">
                                <van-button type="primary">付款</van-button>
                                <van-button plain type="primary">更多</van-button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
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
        this.getOrderList()
    },
    data() {
        return {
            orderTab:['全部','待支付','已支付'],
            orderTabId:0,
            orderList:[],
            orderLists:[],
            classOrder:[],
            eventOrder:[],
            examOrder:[],
            goldOrder:[],
            memberOrder:[],

            unpaid: [],     // 待支付
            paymented: [],  // 已支付
            allOrder: []    // 全部订单
        }
    },
    // filters: {
    //     timeFilter: function (value) {
    //         console.log('value值', value);

    //         if (!value) return '';
                
    //         value = value * 1000;
    //         var date = new Date(value);
    //         var M = date.getMonth() + 1;
    //         var y = date.getFullYear();
    //         var d = date.getDate();
    //         var h = date.getHours();
    //         var F = date.getMinutes();
    //         var s = date.getSeconds();
            
    //         if (M < 10) M = "0" + M;
    //         if (d < 10) d = "0" + d;
    //         if (h < 10) h = "0" + h;
    //         if (F < 10) F = "0" + F;
    //         if (s < 10) s = "0" + s;
        
    //         return y + '-' + M + '-' + d + ' ' + h + ':' + F ;
    //     }
    // },
    methods: {
        /**
         * 订单跳转详情页
         * @param {*} obj   每条订单
         */
        goDetail(obj){
            // $router.push('/my/order/detail')
            // let detail = JSON.stringify(obj);
            this.$router.push({
                path: `/my/order/detail`,
                query: {
                    orderInfo: obj
                }
            })
        },

        // 逻辑
        switchTab(index){
            this.orderTabId = index;
            // this.orderLists = this.orderList;
            // this.orderLists = index == 0 ? this.orderList : this.orderList.filter(item=>item.pay_status == index);

            // unpaid: [],     // 待支付
            // paymented: [],  // 已支付
            // allOrder: []    // 全部订单
            switch(index){
                case 0:
                    this.orderLists = this.allOrder;
                break;
                case 1:
                    this.orderLists = this.unpaid;
                break;
                case 3:
                    this.orderLists = this.paymented;
                break;

            }

            // console.log(this.orderList);
        },
        // 处理分类
        
        // request
        async getOrderList(){
            const {data:ret} = await this.$http.post(this.setApi + api.orderList,this.querystring.stringify({access_token:window.localStorage.getItem('token')}))
            // this.log('==', ret);
            // console.log('==', ret.response_data.lists.member_orders);
            // this.classOrder = ret.response_data.lists.class_orders.length > 0 ? ret.response_data.lists.class_orders : [];
            // this.eventOrder = ret.response_data.lists.competition_orders.length > 0 ? ret.response_data.lists.competition_orders : [];
            // this.examOrder = ret.response_data.lists.examination_orders.length > 0 ? ret.response_data.lists.examination_orders : [];
            // this.goldOrder = ret.response_data.lists.gold_orders.length > 0 ? ret.response_data.lists.gold_orders : [];
            // this.plus_orders = ret.response_data.lists.plus_orders.length > 0 ? ret.response_data.lists.plus_orders : [];
            let unpaid1 = [];
            let paymented1 = [];
            let allOrder1 = [];


            for(var i in ret.response_data.lists){
                ret.response_data.lists[i].forEach(item => {
                    switch(i){
                        case 'competition_orders':
                            item['needPayType'] = 1;
                        break;
                        case 'examination_orders':
                            item['needPayType'] = 2;
                        break;
                        case 'plus_orders':
                            item['needPayType'] = 3;
                        break;
                        case 'gold_orders':
                            item['needPayType'] = 4;
                        break;
                        case 'class_orders':
                            item['needPayType'] = 5;
                        break;
                    }


                    switch(item.pay_status){
                        case 1:
                        case '1':
                            // 未支付
                            unpaid1.push(item);
                        break;
                        case 2:
                        case '2':
                            // 支付失败
                            // unpaid1.push(item);
                        break;
                        case 3:
                        case '3':
                            // 支付成功
                            paymented1.push(item);
                        break;
                        case 4:
                        case '4':
                            // 已使用
                            allOrder1.push(item);
                        break;

                    }
                })
            }

            this.unpaid = unpaid1;
            this.paymented = paymented1;
            this.allOrder = allOrder1.concat(unpaid1).concat(paymented1);

            this.orderLists = this.allOrder;

            // this.log('=============', this.orderLists)

            // this.orderList = [...this.classOrder,...this.eventOrder,...this.examOrder,...this.goldOrder,...this.memberOrder]
            // this.orderList = this.classOrder.concat(this.eventOrder).concat(this.examOrder).concat(this.goldOrder).concat(this.plus_orders);
            // this.orderLists = this.orderList

        }
    },
}
</script>


<style lang="less" scoped>
@import url('./order.less');
</style>

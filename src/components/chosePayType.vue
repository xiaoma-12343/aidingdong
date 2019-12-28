<template>
    <div>
        <van-popup
            @click-overlay="clickOverlay"
            v-model="showPayType"
            :position="position"
            :style="{ height: '50%' }"
        >
        <div>
            <div class="selectpay">
                <ul>
                    <li @click="chosePayType(item,index)" v-for="(item, index) in pay" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                        <div 
                            v-if="!(item.type == 3 && (needPayType != 3 || needPayType != 6 || needPayType != 7))"
                            class="li flex flex--justify-content--space-between flex--align-items--center">
                            <div class="flex flex--align-items--center" >
                                <img :src="item.icon" alt="">
                                <span>{{item.name}}</span>
                            </div>
                            <div class="gold-num" style="color:#999;font-size: 12px;" v-if="item.type == 3">
                                剩余金币：{{goldNum}}
                            </div>
                            <div class="chose" :class="[selectId == index ? 'active' : '']"></div>
                        </div>
                    </li>
                </ul>

                <div class="submit" @click="payOrder">确认支付</div>
            </div>
        </div>
        </van-popup>
    </div>
</template>
<script>
import alipay from '@/assets/icon/icon-alipay.png';
import wechat from '@/assets/icon/icon-wechat.png';
import icongold from '@/assets/icon/icon-gold.png';
import api from '@/api/index.js';

export default {
    data(){
        return {
            showPayType: false,
            pay:[
                {
                    name: '支付宝',
                    icon: alipay,
                    type: 1
                },
                {
                    name: '微信',
                    icon: wechat,
                    type: 2
                },
                {
                    name: '金币',
                    icon: icongold,
                    type: 3
                },
            ],
            pay_type: 1,
            selectId: '',
            payUrl1: this.setApi + '/rest/2.0/competition/competition/pay?pay_type=',           // 1 表示支付赛报名事订单
            payUrl2: this.setApi + '/rest/2.0/examination/examination/pay?pay_type=',           // 2 表示支付考试订单
            payUrl3: this.setApi + '/rest/2.0/user/user/plus_pay?pay_type=',                    // 3 购买会员订单
            payUrl4: this.setApi + '/rest/2.0/gold/gold/pay?pay_type=',                         // 4 充值金币订单
            payUrl5: this.setApi + '/rest/2.0/coach/coach/pay?type=',                           // 5 购课订单
            payUrl6: this.setApi + '/rest/2.0/reward/reward/reward_pay?pay_type=',              // 6 打赏支付
            payUrl7: this.setApi + '/rest/2.0/video/video/buy_pay?pay_type=',                       // 7 购买付费视频
            payUrl: '',
            pays: {},
            goldNum: 0
        }
    },
    created(){
        let token = window.localStorage.getItem('token');
        if(token){
            // 获取金币余额
            this.getGoldNum();
        }
    },
    props: {
        position: {
            type: String,
            default: 'bottom'
        },
        needPayType: {
            type: Number,
            default: 1  // 1 表示支付赛报名事订单   2 表示支付考试订单  3 购买会员订单  4 充值金币订单  5 购课订单
        },
        orderdetail: {
            type: Object,
            default: null
        }   
    },
    mounted(){
        // console.log('执行')
        setTimeout(() => {
            this.onplusReady();
        }, 2000);
        document.addEventListener('plusready', this.plusReady, false);
    },
    destroyed(){
        // document.removeEventListener('plusready', this.plusReady)
    },
    methods: {
        // 请求
       async getGoldNum(){
            const {data:ret} = await this.$http.post(this.setApi + api.gold,this.querystring.stringify({
                access_token:window.localStorage.getItem('token')
            }))

            this.goldNum = ret.response_data.sum_gold;
            
            if(!Number(ret.response_data.sum_gold)){
                this.pay = this.pay.slice(0, 2);
            }
       },

        /**
         * 打开弹窗
         */
        open(){
            this.showPayType = true;
        },

        /**
         * 点击弹出个层
         */
        clickOverlay(){
            this.showPayType = false;
            this.$emit('closeModle');
        },

        /**
         * 选择支付方式
         */
        chosePayType(obj, index){
            if(this.needPayType == 7 && obj.type == 3){
                this.$toast('购买视频不能使用金币支付')
                return
            }

            if(this.needPayType == 3 && obj.type == 3){
                this.$toast('购买会员不能使用金币支付')
                return
            }

            if(this.needPayType == 6 && obj.type == 3){
                this.$toast('打赏不能使用金币支付')
                return
            }

            this.pay_type = obj.type;
            this.selectId = index;
        },

        /**
         * 支付订单
         */
        payOrder(){
            // console.log('====123456=====', this.orderdetail);
            // return
            let token = window.localStorage.getItem('token');
            switch(this.needPayType){
                case 1:
                    // 1 表示支付赛事订单
                    this.payUrl = `${this.payUrl1}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;
                break;
                case 2:
                    // 2 表示支付考试订单
                    this.payUrl = `${this.payUrl2}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;               
                break;
                case 3:
                    // 3 购买会员订单
                    this.payUrl = `${this.payUrl3}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;
                break;
                case 4:
                    // 4 充值金币订单
                    this.payUrl = `${this.payUrl4}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;
                break;
                case 5:
                    // 5 购课订单
                    this.payUrl = `${this.payUrl5}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;
                break;
                case 6:
                    // 6 支付打赏订单
                    this.payUrl = `${this.payUrl6}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;
                break;
                case 7:
                    // 7 购买付费视频
                    this.payUrl = `${this.payUrl7}${this.pay_type}&access_token=${token}&order_sn=${this.orderdetail.order_sn}`;
                break;
            }

            this.paaay();
        },

        /**
         * 点击支付
         */
        paaay(){
            var id = ''
            // plus.nativeUI.alert("this.pay_type", null, this.pay_type);
            if(this.pay_type == 1){
                // 支付宝支付
                id = 'alipay';
                this.apppay(id);
            }else if(this.pay_type == 2){
                // 微信支付
                id = 'wxpay';
                this.apppay(id);
            }else{
                // 余额支付
                this.balancePay();
            }



        },

        /**
         * 余额支付
         */
        async balancePay(){
            // switch(this.needPayType){
            //     case 1:

            //     break;
            //     case 2:

            //     break;
            //     case 3:

            //     break;
            //     case 4:

            //     break;
            //     case 5:

            //     break;
            // }
            // console.log('=======', this.payUrl);
            const {data:ret} = await this.$http.get(this.payUrl);
            // this.log('余额支付成功', ret);
            if(!ret.error_code){
                if(this.needPayType == 1){
                    this.$toast('报名成功，信息待审核');
                }else{
                    this.$toast('支付成功');
                }
                this.showPayType = false;
            }
        },

        /**
         * 唤醒第三方支付
         */
        apppay(id){
            let that = this;
            // plus.nativeUI.alert("path", null, this.payUrl);

            // console.log('path跳转连接--------------' + this.payUrl);

            let xhr = new XMLHttpRequest();
                xhr.onreadystatechange=()=>{
                    // plus.nativeUI.alert(JSON.stringify(xhr.readyState), null, '请求返回');
                switch(xhr.readyState){
                    case 4:  
                    if(xhr.status == 200){
                        // plus.nativeUI.alert(JSON.stringify(that.pays[id]),null,'测试1');
                        // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试5');
                        // console.log('=='+JSON.stringify(xhr.responseText));
                        plus.payment.request(that.pays[id], xhr.responseText, (result)=>{
                            // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试321');
                            that.showPayType = false;
                            if(this.needPayType == 1){
                                this.$toast('报名成功，信息待审核');
                            }else{
                                this.$toast('支付成功');
                                
                            }

                            // 购买付费视频
                            if(this.needPayType == 7 || this.needPayType == 3){
                                this.$emit('paySuccess');
                            }else{
                                that.$router.go(-1);
                            }
                            // plus.nativeUI.alert("支付成功！",()=>{
                                // that.$router.go(-2);
                            // });  
                        },(error)=>{
                            // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试123');
                            // plus.nativeUI.alert("支付失败：" + error.code); 
                            // plus.nativeUI.alert("支付失败"); 
                        });  
                    }else{
                        plus.nativeUI.alert("订单获取失败"); 
                    }
                    break;
                    default:
                    break;
                }  
            };
            xhr.open('GET', that.payUrl);  
            xhr.send();  

        },
        plusReady(){
            this.onplusReady();
        },
        onplusReady() {
            let that = this;
            // 获取支付通道
            plus.payment.getChannels(
                function(channels) {
                var content = document.getElementById("dcontent");

                that.payList = channels;
                for (var i in channels) {
                    var channel = channels[i];
                    if (channel.id == "qhpay" || channel.id == "qihoo") {
                        // 过滤掉不支持的支付通道：暂不支持360相关支付
                        continue;
                    }
                    that.pays[channel.id] = channel;
                    that.checkServices(channel);
                }
                },
                function(e) {
                // outLine('获取支付通道失败：' + e.message);
                }
            );
        },
        // 检查是否有安装支付服务
        checkServices(pc){
            if(!pc.serviceReady){
                var txt = null;
                switch(pc.id){
                    case 'alipay':
                    txt='检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
                    break;
                    default:
                    txt='系统未安装“'+pc.description+'”服务，无法完成支付，是否立即安装？';
                    break;
                }
                plus.nativeUI.confirm(txt, function(e){
                    if(e.index == 0){
                        pc.installService();
                    }
                }, pc.description);
            }
        }
    }
}
</script>
<style lang='less' scoped>
    .selectpay{
        padding: 2.75rem 0  0 .875rem;
        ul{
            li{
                .li {
                    height: 3.25rem;
                    padding-right: .875rem;
                    border-bottom: .0625rem solid #eee;
                    height: 3.25rem;
                    width: 100%;
                }
                div:first-child{
                    color: #333;
                    img{
                        width: 1.8125rem;
                        height: 1.8125rem;
                        margin-right: .8125rem;
                    }
                    span{
                        font-size: .8125rem;
                        color: #333333;
                    }
                }
                div.chose{
                    width: .75rem;
                    height: .75rem;
                    border: .0625rem solid #eee;
                    border-radius: 50%;
                    position: relative;
                    flex-shrink: 0;
                }
                .active::after{
                    content: "";
                    display: block;
                    background: #0EAF0A;
                    width: .5625rem;
                    height: .5625rem;
                    border-radius: 50%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
            }
        }
        .submit{
            width: 21.6875rem;
            height: 2.9375rem;
            color: #fff;
            text-align: center;
            line-height: 2.9375rem;
            background: #0EAF0A;
            // position: fixed;
            // bottom: 8.375rem;
            margin-top: 4rem;
        }
    }

</style>
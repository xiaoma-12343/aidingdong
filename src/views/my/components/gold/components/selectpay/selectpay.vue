<template>
    <div id="selectpay">
        <head-back>
            <span class="head-titile">
                订单支付
            </span>
        </head-back>
        <div class="selectpay">
            <ul>
                <li @click="chosePayType(item,index)" v-for="(item, index) in pay" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                    <div class="flex flex--align-items--center">
                        <img :src="item.icon" alt="">
                        <span>{{item.name}}</span>
                    </div>
                    <div :class="[selectId == index ? 'active' : '']">
                        
                    </div>
                </li>
            </ul>

            <div class="submit" @click="createdOrder">确认支付</div>
        </div>
    </div>
</template>

<script>
import alipay from '../../../../../../assets/icon/icon-alipay.png'
import wechat from '../../../../../../assets/icon/icon-wechat.png'
import HeadBack from '../../../../../../components/headback/headback'
import api from '@/api/index.js'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            selectId:'',
            pay:[
                {
                    name: '支付宝支付',
                    icon: alipay,
                    type: 1
                },
                {
                    name: '微信支付',
                    icon: wechat,
                    type: 2
                }
            ],
            pays: {},
            w: null,
            payList: '',
            texts: '',
            PAYSERVER: 'http://aidingdong.taijichn.com/rest/2.0/gold/gold/pay?payid=',
            orderNumber: '',
            types: '',
            pay_type: 1,        // 支付方式 1表示支付宝支付  2表示微信支付  3表示金币支付
        }
    },
    created(){
        this.selectObj = this.$route.query.selectType;
        // console.log('---------', this.$route);
    },
    mounted(){
        this.onplusReady();
        document.addEventListener('plusready', this.plusReady, false);
    },
    methods: {
        /**
         * 选择支付方式
         */
        chosePayType(obj, index){
            this.pay_type = obj.type;
            this.selectId = index;
        },

        /**
         * 创建充值订单
         */
        async createdOrder(id){
            let that = this;
            let params = {
                access_token: window.localStorage.getItem('token'),
                amount: this.selectObj.amount * 100
            }
            const {data:ret} = await that.$http.post(that.setApi + api.gold_create,that.querystring.stringify(params));
            // plus.nativeUI.alert(JSON.stringify(ret.response_data), null, '支付参数');
            that.order_sn = ret.response_data.order_sn;
            // console.log(that.orderNumber);
            that.paaay();
        },

        /**
         * 点击支付
         */
        paaay(){
            var id = ''
            if(this.pay_type == 1){
                id = 'alipay';
            }else if(this.pay_type == 2){
                id = 'wxpay';
            }

            this.apppay(id);
        },

        //http://aidingdong.taijichn.com/rest/2.0/competition/competition/pay
        apppay(id){
            let that = this;
            let token = window.localStorage.getItem('token');
            let path = `http://aidingdong.taijichn.com/rest/2.0/gold/gold/pay?payid=${id}&pay_type=${this.pay_type}&access_token=${token}&order_sn=${this.order_sn}`;
            //  plus.nativeUI.alert(path, null, "打开的链接");
            //  console.log('path跳转连接--------------' + path);
            let xhr = new XMLHttpRequest();
                xhr.onreadystatechange=()=>{
                switch(xhr.readyState){  
                    case 4:  
                    if(xhr.status==200){
                        // plus.nativeUI.alert(JSON.stringify(this.pays[id]),null,'测试1');
                        // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试5');
                        // console.log('=='+JSON.stringify(xhr.responseText));
                        plus.payment.request(this.pays[id], xhr.responseText, (result)=>{
                            // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试2');
                            plus.nativeUI.alert("支付成功！",()=>{
                                that.$router.go(-2);
                                // back();  
                            });  
                        },(error)=>{  
                            // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试3');
                            plus.nativeUI.alert("支付失败：" + error.code); 
                        });  
                    }else{  
                        alert("获取订单信息失败！");  
                    }  
                    break;  
                    default:  
                    break;  
                }  
            };
            xhr.open('GET',path);  
            xhr.send();  

        },
        plusReady(){},
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
    },
}
</script>

<style lang="less" scoped>
@import url('./selectpay.less');
</style>


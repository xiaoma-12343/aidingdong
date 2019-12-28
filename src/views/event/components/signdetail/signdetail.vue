<template>
    <div id="sign-detail">
        <head-back>
            <span class="head-title">支付报名费</span>
        </head-back>
        <div class="sign-detail">
            <!-- 参赛者信息 -->
            <div class="sign-signinfo">
                <p>参赛者信息</p>
                <div class="sign-infolist">
                    <div>
                        <span>姓名</span>
                        <span>{{sessionitem.name}}</span>
                    </div>
                    <div>
                        <span>性别</span>
                        <span>{{sessionitem.sex==1?'男':'女'}}</span>
                    </div>
                    <div>
                        <span>身高</span>
                        <span>{{sessionitem.stature_id}}cm</span>
                    </div>
                    <div>
                        <span>体重</span>
                        <span>{{sessionitem.weight_id}}kg</span>
                    </div>
                    <div>
                        <span>地址</span>
                        <span>{{sessionitem.address}}</span>
                    </div>
                    <div>
                        <span>场馆</span>
                        <span>{{sessionitem.venue}}</span>
                    </div>
                    <div>
                        <span>联系电话</span>
                        <span>{{sessionitem.phone}}</span>
                    </div>
                </div>
            </div>
            <div class="sign-money">
                <p>参赛项目名称：{{sessionitem.com_name}}</p>
                <div class="sign-howmoney flex flex--justify-content--space-between flex--align-items--center">
                    <span>金额</span>
                    <span>&yen; {{sessionitem.amount}}</span>
                </div>
                <div class="sign-total flex flex--justify-content--space-between flex--align-items--center">
                    <span>总计</span>
                    <span>&yen; {{sessionitem.amount}}</span>
                </div>
                <div class="sign-pay">
                    <p>支付方式</p>
                    <ul class="flex flex--justify-content--space-around">
                        <li style="display:none;" @click.self="setSelectPay(3)" :class="selectPay==3?'active':''" :data-index="3">
                            <p>金币</p>
                            <!-- <i class="iconjinbi"></i>
                            <p>388金币可用 &gt;</p> -->
                        </li>
                        <li  @click.self="setSelectPay(2)"  :class="selectPay==2?'active':''" :data-index="2">
                            <p>微信</p>
                            <!-- <i class="iconwehat"></i> -->
                        </li>
                        <li  @click.self="setSelectPay(1)"  :class="selectPay==1?'active':''" :data-index="1" >
                            <p>支付宝</p>
                            <!-- <i class="iconalipay"></i> -->
                        </li>
                    </ul>
                    <van-button v-show="selectPay != 3" type="primary" @click="pay">支付</van-button>
                    <van-button v-show="selectPay == 3" type="primary" @click="payOrder">支付</van-button>
                </div>
            </div>
        </div>


        <!-- 询问对话框 -->
        <van-popup v-model="showAlert">
            <div class="login-modle flex flex--row flex--align-items--center">
                <div class="login-content flex flex--justify-content--center">
                    是否继续报名？
                </div>
                <div class="login-btn flex flex--justify-content--space-between">
                    <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(1)">返回</a>
                    <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(2)">继续报名</a>
                </div>
            </div>
        </van-popup>




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
        var session = window.sessionStorage;
        var successInfos = session.getItem('successInfo');
        console.log(JSON.parse(successInfos));
        var sessionLists = JSON.parse(successInfos);
        this.sessionitem = sessionLists;

        this.from_data = window.localStorage.setItem('from_data', JSON.stringify(this.fromData));

    },
    mounted() {
        // console.log('this.$route', this.$route)
        this.onplusReady();
        document.addEventListener("plusready", this.plusReady, false);

    },
    data() {
        return {
            sessionitem:{},
            selectPay:'2',
            pays:{},
            showAlert: false,
            from_data: null,
        }
    },
    methods: {
        /**
         * 报名支付完成提醒用户短信接收通知
         */
        async send_msg(){
            const {data:ret} = await this.$http.post(this.setApi + api.getcode,this.querystring.stringify({
                type: 7,
                mobile: this.from_data.phone,
                name: this.from_data.username,
                access_token: window.localStorage.getItem('token'),
            }))

            if(!ret.error_code){
                this.$toast('报名信息已经下发至短信，请注意查收！');
                window.localStorage.setItem('from_data', null);
            }else{
                this.$toast(ret.error_msg);
                return
            }

        },

        //逻辑
        setSelectPay(e){
            this.selectPay = e;
            // console.log(e.target.dataset.index)
            // console.log(e)
        },

        /**
         * 点击支付
         */
        payOrder(){
            
            if(this.selectPay == 3){
                this.payMoney();
            }else{
                this.pay();
            }
        },

        /**
         * 余额支付
         */
        async payMoney(){
            const {data:ret} = await this.$http.post(this.setApi + api.paymoney,this.querystring.stringify({
                pay_type: 3,
                access_token: window.localStorage.getItem('token'),
                // amount: this.sessionitem.amount,
                competition_id: this.sessionitem.competition_id,
                competition_type_id: this.sessionitem.competition_type_id,
                order_sn: this.sessionitem.order_sn
            }))
            // console.log(ret)
            if(!ret.error_code){
                this.$router.replace('/event/pay/sign-success?amount='+this.sessionitem.amount)
                // 下发手机短信
                this.send_msg();
            }
        },
        //http://aidingdong.taijichn.com/rest/2.0/competition/competition/pay
        pay(){
            let that = this;
            let token = window.localStorage.getItem('token');
            let path = `http://aidingdong.taijichn.com/rest/2.0/competition/competition/pay?pay_type=${this.selectPay}&access_token=${token}&competition_id=${this.sessionitem.competition_id}&competition_type_id=${this.sessionitem.competition_type_id}&order_sn=${this.sessionitem.order_sn}`
            //  plus.nativeUI.alert("path", path);  
            // plus.nativeUI.alert(this.path , null, '请求连接');
            let xhr = new XMLHttpRequest();
                xhr.onreadystatechange=()=>{
                    switch(xhr.readyState){  
                        case 4:  
                    if(xhr.status==200){
                        // plus.nativeUI.alert(JSON.stringify(this.pays),null,'测试1');
                        plus.payment.request(this.selectPay == 1 ? this.pays['alipay'] : this.pays['wxpay'],xhr.responseText,(result)=>{  
                            // plus.nativeUI.alert(JSON.stringify(xhr.responseText),null,'测试2');
                            plus.nativeUI.alert("支付成功！",()=>{
                                // back();  
                                // that.$router.go(-2);
                                that.showAlert = true;
                                // 下发手机短信
                                this.send_msg();
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
            }  
            xhr.open('GET', path);
            xhr.send();  

        },
        /**
         * 弹出继续报名对话框
         * @param {*} type 类型
         */
        goJumpUrl(type){
            if(type == 2){
                // 继续报名
                this.$router.push({
                    path: '/event/signup/'+this.$route.query.id
                })
            }else{
                // 返回到赛事列表
                this.$router.push({
                    path: '/event'
                })
            }
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
                var txt=null;
                switch(pc.id){
                    case 'alipay':
                    txt='检测到系统未安装“支付宝快捷支付服务”，无法完成支付操作，是否立即安装？';
                    break;
                    default:
                    txt='系统未安装“'+pc.description+'”服务，无法完成支付，是否立即安装？';
                    break;
                }
                plus.nativeUI.confirm(txt, function(e){
                    if(e.index==0){
                        pc.installService();
                    }
                }, pc.description);
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./signdetail.less');
</style>
<style >
.van-popup {
    border-radius: 10px;
}
.login-modle {
    width: 16.875rem;
    padding: 1.25rem;
}
.login-content {
    font-size: 1rem;
    padding: 1.875rem 0;
}
.login-btn a {
    width: 6.25rem;
    height: 1.875rem;
    border-radius: .375rem;
    box-sizing: border-box;
}
.login-btn a:first-child {
    background: #fff;
    color: #0eaf0a;
    border: 1px solid #0eaf0a; 
    margin-right: 2rem;
}
.login-btn a:last-child {
    background: #0eaf0a;
    color: #fff;
}
</style>

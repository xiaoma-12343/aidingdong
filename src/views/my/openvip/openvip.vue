<template>
    <div id="openvip">
        <head-back>
            <span class="head-title">
                开通会员
            </span>
        </head-back>

        <div class="openvip">
            <ul class="howMoney">
                <li 
                    :class="['flex flex--align-items--center flex--justify-content--space-between',vipId == index ? 'active' : '']" 
                    v-for="(item, index) in vipLists" 
                    @click="choseVip(item, index)" 
                    :key="index">
                    <div>
                        <p>{{item.duration}}</p>
                        <!-- <span>{{item.price}}元</span> -->
                    </div>
                    <p>&yen; <span>{{item.price}}元</span></p>
                </li>
            </ul>
            <!-- <div class="selectpay">
                <p>支付方式</p>
                <ul class="pay">
                    <li @click="payId = 0" class="flex flex--justify-content--space-between flex--align-items--center">
                        <div class="pays flex flex--align-items--center">
                            <img src="../../../assets/icon/icon-wechat.png" alt="">
                            <span>微信支付</span>
                        </div>
                        <div :class="['icon-select',payId == 0 ? 'active' : '']">
                            <i class="iconfont icon-dui"></i>
                        </div>
                    </li>
                </ul>
            </div> -->

            <div class="pt100 flex flex--justify-content--center">
                <div class="submit" @click="openPayModle">
                    选择支付方式
                </div>
            </div>

        </div>

        <chose-pay-type 
            @paySuccess="paySuccess"
            ref="choseType" 
            :orderdetail="detailInfo"
            :needPayType="3"
            :position="'bottom'"></chose-pay-type>


    </div>
</template>


<script>
import HeadBack from '@/components/headback/headback'
import api from '@/api'
import chosePayType from '@/components/chosePayType';
export default {
    components:{
        HeadBack,
        chosePayType
    },
    data() {
        return {
            vipId:'',
            payId:'',
            vipLists: [],       // 会员列表
            detailInfo: null,
            curVipPackage: null
        }
    },
    created(){

        // 获取会员列表
        this.getVipLists();

    },
    methods: {
        /**
         * 选择会员
         */
        choseVip(obj, index){
            this.vipId = index;
            this.curVipPackage = obj;
        },

        /**
         * 会员购买成功回调
         */
        paySuccess(){
            this.$router.replace('/my');
        },

        /**
         * 打开支付选择弹窗
         */
        openPayModle(){
            this.getOrderNumber();
        },

        /**
         * 生成订单
         */
        async getOrderNumber(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                duration_id: this.curVipPackage.id,
                amount: this.curVipPackage.price,
            }
            const {data:ret} = await this.$http.post(this.setApi + api.open_plus, this.querystring.stringify(params))
            // console.log('生成订单',  ret);
            if(!ret.error_code){
                this.detailInfo = ret.response_data;
                this.$refs.choseType.open();
            }else{
                this.$toast(ret.error_msg);
                return
            }
        },

        /**
         * 获取会员列表
         */
        async getVipLists(){
            const {data:ret} = await this.$http.post(this.setApi + api.plus_duration)
            console.log('获取会员列表',  ret);
            if(!ret.error_code){
                this.vipLists = ret.response_data.lists;
                this.curVipPackage = ret.response_data.lists[0];
            }else{
                this.$toast(ret.error_msg);
                return
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./openvip.less');
</style>

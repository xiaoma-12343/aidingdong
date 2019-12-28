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
                        <span>联系电话</span>
                        <span>{{sessionitem.phone}}</span>
                    </div>
                </div>
            </div>
            <div class="sign-money">
                <p>参赛项目名称：{{sessionitem.com_name}}</p>
                <div class="sign-howmoney flex flex--justify-content--space-between flex--align-items--center">
                    <span>金额</span>
                    <span>&yen; {{sessionitem.money}}.00</span>
                </div>
                <div class="sign-total flex flex--justify-content--space-between flex--align-items--center">
                    <span>总计</span>
                    <span>&yen; {{sessionitem.money}}.00</span>
                </div>
                <div class="sign-pay">
                    <p>支付方式</p>
                    <ul class="flex flex--justify-content--space-between">
                        <li  @click.self="setSelectPay" :class="selectPay==1?'active':''" :data-index="1">
                            <p>金币</p>
                            <!-- <i class="iconjinbi"></i> -->
                            <p>388金币可用 &gt;</p>
                        </li>
                        <li  @click.self="setSelectPay"  :class="selectPay==2?'active':''" :data-index="2">
                            <p>微信</p>
                            <!-- <i class="iconwehat"></i> -->
                        </li>
                        <li  @click.self="setSelectPay"  :class="selectPay==3?'active':''" :data-index="3" >
                            <p>支付宝</p>
                            <!-- <i class="iconalipay"></i> -->
                        </li>
                    </ul>
                    <van-button type="primary" @click="$router.push('/event/pay/sign-success')">支付</van-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
export default {
    components:{
        HeadBack
    },
    created() {
        var session = window.sessionStorage;
        var successInfos = session.getItem('examInfo')
        // console.log(JSON.parse(successInfos))
        var sessionLists = JSON.parse(successInfos)
        this.sessionitem = sessionLists
        console.log()
    },
    data() {
        return {
            sessionitem:{
                name:null
            },
            selectPay:'1'
        }
    },
    methods: {
        //逻辑
        setSelectPay(e){
            this.selectPay = e.target.dataset.index
            // console.log(e.target.dataset.index)
            console.log(e)

        }
    },
}
</script>

<style lang="less" scoped>
@import url('./signdetail.less');
</style>

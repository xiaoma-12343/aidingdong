<template>
    <div id="invoice">
        <head-back :isshow="false">
            <span class="head-title">
                按订单开票
            </span>
            <span class="head-right" @click="$router.push('/kphistory')">
                开票历史
            </span>
        </head-back>

        <div class="invoice">
            <ul>
                <li @click="selectInvoice(index)" v-for="(item, index) in invoicelList" :key="index" class="flex flex--justify-content--space-between flex--align-items--center">
                    <div class="left flex flex--align-items--center">
                        <div :class="['gren',selectInvoiceList.indexOf(index) != -1 ? 'active' : '']"></div>
                        <div class="info">
                            <p><i class="iconfont icon-shijian"></i>{{item.ctime}}</p>
                            <p><i></i>{{item.course_name}}</p>
                            <p><i></i>x{{item.class_num}}</p>
                        </div>
                    </div>
                    <div class="right">
                        <span>&yen;</span>{{item.amount}}
                    </div>
                </li>
            </ul>

            <div class="opction">
                <div class="num">
                    <span>{{selectInvoiceList.length}}</span>个行程,共{{money}}元(满200元包邮)
                </div>
                <div class="select flex flex--align-items--center flex--justify-content--space-between">
                    <div class="selected flex">
                        <div @click="selectId = 1">
                            <div :class="['gren',selectId == 1 ? 'active' : '']"></div> 本页全选
                        </div>
                        <div @click="selectAll(2)">
                            <div :class="['gren',selectId == 2 ? 'active' : '']"></div> 全部全选
                        </div>
                    </div>
                    <div class="button">
                        下一步
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback';
import api from '../../api'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getInvoiceList()
    },
    data() {
        return {
            selectInvoiceList:[],
            selectInvoiceAllList:[],
            selectId:'',
            invoicelList:[],
            money:0
        }
    },
    methods: {
        selectAll(id){
            this.selectId = id
            console.log(1)
            this.selectInvoiceList = []
            this.invoicelList.forEach((item,index)=>{
               this.selectInvoiceList.push(index)
            })
            // this.countNum()
        },
        countNum(){
            var money = 0
            this.selectInvoiceList.forEach((item,index)=>{
                this.money = money += parseInt(this.invoicelList[item].amount * this.invoicelList[item].class_num)
            })
        },
        selectInvoice(id,money){
            if(this.selectInvoiceList.indexOf(id) == -1){
                this.selectInvoiceList.push(id)
                this.countNum()
            }else{
                this.selectInvoiceList.splice(this.selectInvoiceList.indexOf(id),1)
            }
        },
        async getInvoiceList(){
            const {data:ret} = await this.$http.post(this.setApi + api.invoiceList,this.querystring.stringify({
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.invoicelList = ret.response_data.lists.class_orders
        }
       
    },
}
</script>

<style lang="less" scoped>
@import url('./invoice.less');
</style>


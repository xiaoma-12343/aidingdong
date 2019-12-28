<template>
    <div id="seting">
        <head-back>
            <span class="head-title">
                账号设置
            </span>
        </head-back>
        <div class="seting">
            <ul>
                <li class="flex flex--align-items--center flex--justify-content--space-between" v-for="(item, index) in setingList" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.value}}<i class="iconfont icon-youjiantou"></i></span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../../../components/headback/headback'
// import 
export default {
    components:{
        HeadBack
    },
    created() {
        console.log(123456, window.localStorage.getItem('userInfo'));
    },
    data() {
        return {
           setingList:[
               {
                   name:'手机号',
                   path:'',
                   value: JSON.parse(window.localStorage.getItem('userInfo')).phone

               },
               {
                   name:'微信',
                   path:'',
                   value:JSON.parse(window.localStorage.getItem('userInfo')).wechat_openid == '' ? '未绑定' : ''
               }
           ] 
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./numseting.less');
</style>


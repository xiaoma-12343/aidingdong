<template>
    <div id="seting">
        <head-back>
            <span class="head-title">
                设置
            </span>
        </head-back>
        <div class="seting">
            <ul>
                <li @click="$router.push(item.path)" v-for="(item, index) in setingList" :key="index">
                    <span>{{item.name}}</span>
                    <i class="iconfont icon-youjiantou"></i>
                </li>
                <li @click="removeToken">
                    <span>退出登录</span>
                    <i class="iconfont icon-youjiantou"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
// import 
export default {
    components:{
        HeadBack
    },
    created() {

    },
    data() {
        return {
           setingList:[
               {
                   name:'资料设置',
                   path:'/my/edit'
               },
            //    {
            //        name:'系统设置',
            //        path:''
            //    },
               {
                   name:'关于爱叮咚',
                   path:'/aboutAiDingDong'
               }
           ] 
        }
    },
    methods: {
        removeToken(){
            window.localStorage.removeItem('token')
            this.authLogout()
            this.$toast('退出成功')
            this.$router.push('/login')
        },
        // 注销
        async authLogout(){
            var auths = JSON.parse(window.localStorage.getItem('auths'))
            console.log(auths)
            for(let i in auths){
                var s = auths[i]
                if(s.authResult){
                    s.logout(res=>{
                        console.log('注销登录成功')
                    },error=>{
                        console.log('注销失败')
                    })
                }
            }
        }

    },
}
</script>

<style lang="less" scoped>
@import url('./seting.less');
</style>


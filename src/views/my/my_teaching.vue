<template>
    <div id="teaching">
        <head-back>
            <span class="head-title">
                教学管理
            </span>
        </head-back>
        <ul class="teaching flex flex--wrap">
            <li @click="$router.push(item.url)" class="flex flex--align-items--center flex--justify-content--center" v-for="(item, index) in teachingList" :key="index">
                <span>{{item.title}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            teachingList:[
                {
                    title:'我的学员',
                    icon:'',
                    url:'/my/student'
                },{
                    title:'我的课程',
                    icon:'',
                    url:'/my/course'
                },{
                    title:'约课时间',
                    icon:'',
                    url:'/my/abtimes'
                },{
                    title:'教学场地',
                    icon:'',
                    url:'/my/site'
                }
            ]
        }
    },
}
</script>

<style lang="less" scoped>
#teaching{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #F1F1F2;
    .teaching{
        background: #fff;
        margin-top: 3.125rem;
        li{
            border-right:1px solid #EEEEEE;
            border-bottom: 1px solid #EEEEEE; 
            width: 11.6875rem;
            height: 3.3125rem;
            span{
                color: #333333;
            }
        }
        li:nth-child(2n){
            border-right: none;
        }
    }
}
</style>


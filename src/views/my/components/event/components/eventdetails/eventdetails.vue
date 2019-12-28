<template>
    <div id="eventdetails">
        <head-back>
            <span class="head-title">
                赛事详情
            </span>
        </head-back>
        <div class="event-d">
            <div class=" top flex flex--justify-content--space-between flex--align-items--center">
                <span>信息审核中</span>
                <img src="../../../../../../assets/icon/icon-eventdetail.png" alt="">
            </div>

            <div class="signinfo">
                <div class="sign-title">参赛信息</div>
                <div class="event-info">
                    <div class="event-name">陈氏太极比赛-赛事名称</div>
                    <div class="event-zu">太极组</div>
                    <ul>
                        <li>
                            <span>姓名</span>
                            <span>希特勒</span>
                        </li>
                        <li>
                            <span>性别</span>
                            <span>男</span>
                        </li>
                        <li>
                            <span>电话</span>
                            <span>13888888888</span>
                        </li>
                        <li>
                            <span>地址</span>
                            <span>北京市</span>
                        </li>
                        <li>
                            <span>场馆</span>
                            <span>朝阳区</span>
                        </li>
                        <li>
                            <span>报名编号</span>
                            <span>123123</span>
                        </li>
                        <li>
                            <span>报名时间</span>
                            <span>20119-05-06</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../../../components/headback/headback'
import api from '../../../../../../api'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
@import url('./eventdetails.less');
</style>


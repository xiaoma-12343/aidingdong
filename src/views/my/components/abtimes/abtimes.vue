<template>
    <div id="abtimes">
        <head-back>
            <span class="head-title">
                约课时间
            </span>
        </head-back>
        <div class="abtimes-week">
            <p>每周约课</p>
            <ul>
                <li @click="fanWeek(index,item)" :class="weekId.indexOf(index)==-1 ? '' : 'active'" v-for="(item, index) in weekList"  :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="abtimes-day">
            <p>每天时间</p>
            <div @click="timeShow=true" class="selectTime flex flex--justify-content--space-between flex--align-items--center">
                <span>开始时间</span>
                <span>{{startTime}}<i class="iconfont icon-youjiantou"></i></span>
            </div>
            <van-popup v-model="timeShow" overlay close-on-click-overlay position="bottom">
                <van-datetime-picker @confirm="startTimes" v-model="currentDate" type="time" title="开始时间" />
            </van-popup>
            <!-- 结束时间 -->
            <div @click="endTimeShow=true" class="selectTime flex flex--justify-content--space-between flex--align-items--center">
                <span>结束时间</span>
                <span>{{endTime}}<i class="iconfont icon-youjiantou"></i></span>
            </div>
            <van-popup v-model="endTimeShow" overlay close-on-click-overlay position="bottom">
                <van-datetime-picker  @confirm="endTimes" v-model="currentDate" type="time" title="结束时间" />
            </van-popup>
            <van-button @click="pushAbTimes" type="primary">提交</van-button>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
export default {
    name:'abtimes',
    components:{
        HeadBack
    },
    data() {
        return {
            weekList:['周一','周二','周三','周四','周五','周六','周日'],
            weekId:[],
            timeList:[],
            timeShow:false,
            endTimeShow:false,
            weekSelect:{},
            currentDate:'12:00',
            startTime:'', //选中的开始时间
            endTime:'' //选中的结束时间

            

            
        }
    },
    methods: {
        // 逻辑
        fanWeek(index,item){
            // console.log(this.weekId.indexOf(index))
            if(this.weekId.indexOf(index)==-1) {
                this.weekId.push(index)
                // console.log(item)
                var arr = []
                arr.push(this.startTime,this.endTime)
                // console.log(arr)
                this.weekSelect[item] = arr
                console.log(this.weekSelect)
            } else{
                this.weekId.splice(this.weekId.indexOf(index),1)
            }
        },
        startTimes(times){
            // console.log(c)
            this.startTime = times;
            this.timeShow = false;
        },
        endTimes(times){
            // console.log(c)
            this.endTime = times;
            this.endTimeShow = false;
        },  


        // 请求
        async pushAbTimes(){
            const {data:ret} = await this.$http.post(this.setApi + api.abtimeList,this.querystring.stringify({reserve_time:JSON.stringify(this.weekSelect),access_token:window.localStorage.getItem('token')}))
            console.log(ret)
        } 
    },
}
</script>

<style lang="less" scoped>
@import url('./abtimes.less');
</style>


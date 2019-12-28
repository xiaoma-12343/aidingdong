<template>
    <div id="start-exam">
        <head-back>
            <span class="head-title">
                答题
            </span>
        </head-back>
        <div class="start-exam">
            <!-- 答题头部 -->
            <div class="start-top">
                <div class="flex flex--justify-content--space-between">
                    <p>答题者：王利川</p>
                    <p>剩余时间:<span>{{minutes}}:{{seconds}}</span></p>
                </div>
                <p>共50道题，总分100分，90分过关，计时50分钟</p>
            </div>
            <!-- 题 -->
            <ul class="start-select">
                <li class="flex flex--justify-content--space-between">
                    <p>选择题</p>
                    <p>已答({{Object.keys(examSelect).length}})</p>
                </li>
                <li v-for="(item, index) in examination" :key="index">
                    <p>{{index+1}}、{{item.name}}</p>
                    <ul>
                        <li @click="selectExam(v,item.id)" :class="examSelect[index+1] == v? 'active':''" v-for="(item2, v) in item.option" :key="v">
                            {{v}}<span>{{item2}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
            <!-- 提交 -->
            <div class="sbBtn">
                <van-button @click="pushExam" type="primary">提交试卷</van-button>
            </div>
        </div>
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
        this.getExamList()
        this.setInterval()
    },
    data() {
        return {
            selectId:'',
            examselectId:'',
            examSelect:{},
            examination:[],
            successList:[],
            // toTime:new Date()
            minutes:'60',
            seconds:'00'
        }
    },
    methods: {
        // 逻辑
        selectExam(items,val){
            this.examSelect[val] = items
            // typeof this.examSelect[val] 
            console.log(this.examSelect)
        },

        // 倒计时
        setInterval(){
            // var now = new Date()
            var maxTime = 60 * 60
            var Time = setInterval(() => {
                    if(maxTime >= 0){
                        this.minutes = Math.floor(maxTime / 60)
                        this.seconds = Math.floor(maxTime % 60)<=9?'0'+Math.floor(maxTime % 60):Math.floor(maxTime % 60)
                        // console.log(this.minutes,':',this.seconds)
                        --maxTime
                    }else{
                        clearInterval(Time)
                    }
                
            },1000);

        },

        // 请求
        async getExamList(){
            const {data:ret} = await this.$http.post(this.setApi + api.startExamList,this.querystring.stringify({examination_type_id:this.$route.params.id}))
            console.log(ret)
            this.examination = ret.response_data.lists.examination
        },
        async pushExam(){
            console.log(this.examSelect)
            // console.log(this.examSelect.length,Object.keys(this.examination).length)
            if(Object.keys(this.examSelect).length != Object.keys(this.examination).length) return this.$toast('您还有题未答哦，请认真检查')
            const {data:ret} = await this.$http.post(this.setApi + api.submitExam,this.querystring.stringify({
                user_id:JSON.parse(window.localStorage.getItem('userInfo')).id,
                examination_type_id:this.$route.params.id,
                answer:JSON.stringify(this.examSelect),
                examination_apply_id:this.$route.params.examid,
                use_time:'8'
            }))
            console.log(ret)
            this.successList = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./startexam.less');
</style>


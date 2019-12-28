<template>
    <div id="exam">
        <head-back>
            <span class="head-title">
                我的考试
            </span>
        </head-back>
        <div class="exam">
            <ul class="exam-tab flex flex--align-items--center flex--justify-content--space-between">
                <li :class="tabIndex==index?'active':''" @click="tabbar(index)" v-for="(item, index) in tabList" :key="index">{{item}}</li>
            </ul>
            <div class="exam-all" v-show="tabIndex == index" v-for="(item, index) in tabList" :key="index">
                <ul>
                    <li v-for="(item, index) in allMockList" :key="index">
                        <!-- 状态 -->
                        <div class="exam-status flex flex--align-items--center flex--justify-content--space-between">
                            <span>报名编号：{{item.identity_number}}</span>
                            <span v-if="item.status==1">审核中</span>
                            <span v-else-if="item.is_answer==1">已答题</span>
                            <span v-else-if="item.status==2 || item.is_answer == 0">待参加</span>
                            <span v-else-if="item.status==3">评审中</span>
                            <span v-else>已公布</span>
                        </div>
                        <!-- 内容 -->
                        <div @click="$router.push(`/my/examdetail/${item.status}/${item.id}/${item.examination_type_id}`)" class="exam-datails flex flex--align-items--center flex--justify-content--space-between">
                            <div>
                                <p>{{item.e_name}}</p>
                                <p v-show="item.status == 1 || item.status == 2"></p>
                                <span v-show="item.status == 1 || item.status == 2">报名截止时间：{{item.apply_end_time}}</span>
                            </div>
                            <i class="iconfont icon-youjiantou"></i>
                        </div>
                        
                        <!-- 操作 -->
                        <div class="exam-operat" v-show="item.status == 2 && item.is_answer == 0">
                            <van-button @click="$router.push(`/my/startexam/${item.examination_type_id}/${item.id}`)" type="primary">去答题</van-button>
                        </div>
                        <div class="exam-operat" v-show="item.status == 2 && item.is_answer == 1">
                            <van-button type="primary">已答题</van-button>
                        </div>
                    </li>
                </ul>
            </div>
            <!-- <div class="exam-all" v-show="tabIndex == 1">
                2
            </div>
            <div class="exam-all" v-show="tabIndex == 2">
                3
            </div>
            <div class="exam-all" v-show="tabIndex == 3">
                4
            </div>
            <div class="exam-all" v-show="tabIndex == 4">
                5
            </div> -->
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
        this.getExamList();
    },
    data() {
        return {
            tabList:['全部','审核中','待参加','审核中','已公布'],
            tabIndex:0,
            allExamList:[],
            allMock:[
                {
                    e_name:'考试',
                    et_name:'太极',
                    examination_type_id:Math.random()*10,
                    identity_number:Math.random()*1000,
                    status:1
                },
                {
                    e_name:'考试1',
                    et_name:'啊啊',
                    examination_type_id:Math.random()*10,
                    identity_number:Math.random()*1000,
                    status:2
                },
                {
                    e_name:'上手',
                    et_name:'上手',
                    examination_type_id:Math.random()*10,
                    identity_number:Math.random()*1000,
                    status:3
                },
                {
                    e_name:'手动阀',
                    et_name:'稍微',
                    examination_type_id:Math.random()*10,
                    identity_number:Math.random()*1000,
                    status:4
                },{
                    e_name:'sdf',
                    et_name:'sdfsdf',
                    examination_type_id:Math.random()*10,
                    identity_number:Math.random()*1000,
                    status:2
                },
            ],
            allMockList:this.allMock
            
        }
    },
    methods: {
        // 逻辑
        tabbar(index){
            this.tabIndex = index;
            switch(this.tabIndex){
                case 0:
                this.allMockList = this.allExamList.filter(item=>item)
                break;
                case index:
                this.allMockList = this.allExamList.filter(item=>item.status == index)
                break;
            }
        },

        // 请求
        async getExamList(){
            const {data:ret} = await this.$http.post(this.setApi + api.examList,this.querystring.stringify({access_token:window.localStorage.getItem('token')}));
            console.log(ret)
            this.allExamList = ret.response_data.lists
            this.$nextTick(()=>{
                this.tabbar(this.tabIndex)
            })

        }
    },
}
</script>

<style lang="less" scoped>
@import url('./exam.less');
</style>


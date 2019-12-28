<template>
    <div id="exam">
        <head-back>
            <span class="head-title">
                我的赛事
            </span>
        </head-back>
        <div class="exam">
            <ul class="exam-tab flex flex--align-items--center flex--justify-content--space-between">
                <li :class="tabIndex==index?'active':''" @click="tabbar(item, index)" v-for="(item, index) in tabList" :key="index">{{item.name}}</li>
            </ul>
            <div class="exam-all" v-show="tabIndex == index" v-for="(item, index) in tabList" :key="index">
                <ul>
                    <li v-for="(item, index) in allEventList" :key="index">
                        <!-- 状态 -->
                        <div class="exam-status flex flex--align-items--center flex--justify-content--space-between">
                            <span>报名编号：{{item.identity_number}}，参赛类别：{{item.type_name}}</span>
                            <span v-if="item.status==1">未支付</span>
                            <span v-else-if="item.status==2">支付失败</span>
                            <span v-else-if="item.status==3">信息待审核</span>
                            <span v-else-if="item.status==4">审核失败</span>
                            <span v-else-if="item.status==5">待参加</span>
                            <span v-else-if="item.status==6">已上传</span>
                            <span v-else-if="item.status==7">作品审核失败</span>
                            <span v-else-if="item.status==8">作品审核成功</span>
                        </div>
                        <!-- 内容 -->
                        <div 
                            @click="goToDetails(item.identity_number,item.status,item.competition_id,item)" 
                            class="exam-datails flex flex--align-items--center flex--justify-content--space-between">
                            <div>
                                <p>{{item.competition_name}}</p>
                                <p v-show="item.status == 1 || item.status == 2"></p>
                                <span v-show="item.status == 1 || item.status == 2">报名截止时间：{{item.apply_end_time | dateFilter}}</span>
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
        this.getEventList();
        // this.tabbar(0)
    },
    data() {
        return {
            // '全部','待参加','已上传','投票中','评分中'
            tabList:[
                {
                    name: '全部',
                    type: 0
                },
                {
                    name: '报名中',
                    type: 1
                },
                {
                    name: '投票中',
                    type: 3
                },
                {
                    name: '评分中',
                    type: 4
                },
                {
                    name: '已公布',
                    type: 5
                },
            ],
            tabIndex:0,
            allEventList:[],
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
            allMockList:this.allMock,
            objType: 0,
        }
    },
    methods: {
        // 逻辑
        tabbar(obj, index){
            this.tabIndex = index;
            this.objType = obj.type;
            // switch(this.tabIndex){
            //     case 0:
            //     this.allMockList = this.allEventList.filter(item=>item)
            //     break;
            //     case index:
            //     this.allMockList = this.allEventList.filter(item=>item.status == index)
            //     break;
            // }
            // console.log('this.objTypethis.objType', this.objType);
            this.allEventList = [];
            this.getEventList(obj.type);

        },


        goToDetails(id,status,eventid,obj){

            // (status == 5 || status == 3 || !(this.objType == 3 && status == 6)) && status != 6
            
            let type = this.objType;

            if(type){
                type = this.objType;
            }else{
                type = Number(obj.t_status);
            }

            console.log('this.objType', type);

            // return;
            // 子分类中根据分类跳转
            if(this.tabIndex == 0 || type == 4){
                switch(type){
                    case 1:
                        this.$router.push(`/my/event/detail?type=${type}&status=${obj.status}&detailInfo=${JSON.stringify(obj)}`);
                    break;
                    case 3:
                        this.$router.push(`/event/vote/${eventid}&${type}`);
                    break;
                    case 4:
                        // this.$router.push(`/vote/works/${eventid}&${type}`);
                        this.$router.push(`/event/vote/${eventid}&${type}&4`);
                    break;
                    case 5:
                        if(obj.status != 6){
                            this.$router.push(`/event/vote/${eventid}&${type}`);
                        }
                    break;
                }
            }else{
                switch(this.tabIndex){
                    case 1:
                        // 报名详情
                        this.$router.push(`/my/event/detail?type=${type}&status=${obj.status}&detailInfo=${JSON.stringify(obj)}`);
                    break;
                    case 2:
                        // 投票
                        this.$router.push(`/event/vote/${eventid}&${type}`);
                    break;
                    case 3:
                        // 评分列表展示
                        this.$router.push(`/event/vote/${eventid}&${type}&4`);
                    break;
                    case 4:
                        // 跳转已公布
                        this.$router.push(`/event/vote/${eventid}&${type}&5`);
                    break;
                }
            }

            // console.log('this.allEventList.filter(item=>item.identity_number == id)', this.allEventList.filter(item=>item.identity_number == id));
            window.sessionStorage.setItem('eventDetails', JSON.stringify(this.allEventList.filter(item=>item.identity_number == id)));

        },

        /**
         * 获取我的赛事列表
         * @param {*} type  赛事类型
         */
        async getEventList(type){
            let params = {
                access_token:window.localStorage.getItem('token'),
                type
            }
            // if(!window.localStorage)
            const {data:ret} = await this.$http.post(this.setApi + api.myEventList,this.querystring.stringify(params));
            // console.log(ret)
            if(!ret.error_code){
                this.allEventList = ret.response_data.lists;
            }else{
                this.$toast(ret.error_msg);
            }
            // this.tabbar(0)
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./event.less');
</style>


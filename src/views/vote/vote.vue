<template>
    <div id="vote">
        <head-back>
            <ul class="head-tab flex">
                <li @click="switchTopTab(index)" :class="headTabId == index ? 'active' : ''" v-for="(item, index) in headTab" :key="index">{{item}}</li>
            </ul>
        </head-back>
        <div class="search-input flex flex--align-items--center">
            <form action="javascript:;">
                <input @keyup.enter="getVoteList" v-model="username"  type="search" class="van-field" placeholder="寻找生活中的精彩">
            </form>
            <!-- <i class="iconfont icon-htmal5icon13"></i> -->
            <!-- <van-icon name="search" color="#8E8E93"></van-icon> -->
            <span @click="search">搜索</span>
        </div>
        <div class="vote" v-if="headTabId == 0">
            <!-- getVoteList -->
            <!-- <ul class="voteTab flex flex--align-items--center flex--justify-content--space-between">
                <li @click="voteTabId = index;getVoteList(item.competition_type_id,true)" :class="voteTabId == index ? 'active' : ''" v-for="(item, index) in voteTab" :key="index">{{item.name}}</li>
            </ul> -->
            <div class="lay-out lay-out1 ">
                <!-- 需修改node_modles中的初始值 -->
                <!-- <ly-tab
                    v-model="indexTypeId"
                    :items="voteTab"
                    :options="options"
                    :fixBottom="false"
                    @change="switchTab">
                </ly-tab> -->
                <!-- 选择参赛项目  一级分类 -->
            <div class="event-select">
                <p>选择参赛项目</p>
                <ul 
                    v-if="voteTab.length != 0" 
                    class="flex flex--wrap flex--justify-content--space-between">
                    <li 
                        class="ellopes"
                        :class="competition_type_id == item.competition_type_id?'active':''" 
                        @click="switchTab(item)" v-for="(item,index) in voteTab" :key="index">{{item.name}}</li>
                </ul>
                <div 
                    class="isShow" 
                    v-if="voteTab.length == 0">
                    <h3>暂无参赛项目b(￣▽￣)d</h3>
                </div>
            </div>
            <!-- 参赛项目  二级分类 -->
            <div class="event-select">
                <p>请选择参赛组别</p>
                <ul 
                    v-if="voteTab1.length != 0" 
                    class="flex flex--wrap flex--justify-content--space-between">
                    <li 
                        class="ellopes"
                        :class="competition_type_id1 == item.competition_type_id ? 'active' : ''" 
                        @click="switchTab1(item)" v-for="(item,index) in voteTab1" :key="index">{{item.name}}</li>
                </ul>
                <div 
                    class="isShow" 
                    v-if="voteTab1.length == 0">
                    <h3>暂无参赛项目b(￣▽￣)d</h3>
                </div>
            </div>
            </div>
            <!-- <div class="lay-out">
                <ly-tab
                    v-model="indexTypeId1"
                    :items="voteTab1"
                    :options="options1"
                    :fixBottom="false"
                    @change="switchTab1">
                </ly-tab>
            </div> -->
            <ul class="vote-list flex flex--wrap flex--justify-content--space-between">
                <li v-for="(item, index) in voteList" :key="index">
                    <img @click="$router.push(`/vote/works/${item.apply_id}&${pageType}`)" :src="item.head" alt="">
                    <div class="likenum">1.3w</div>
                    <div class="userinfo flex flex--align-items--center flex--justify-content--space-between">
                        <div class="flex flex--align-items--center">
                            <img :src="item.head" alt="">
                            <p>{{item.username}}</p>
                        </div>
                        <span>{{item.grade ? item.grade : 0}}分</span>
                        <span>{{voteNums[index]}}票</span>
                    </div>
                    <!-- disabled -->
                    <div v-if="pageType == 1 || (status != 5 && status != 4)" class="submit" @click="voteSubmit(item.apply_id,index)">投票</div>
                </li>
            </ul>
        </div>
        
        <!-- 展示赛事详情 -->
        <div class="saishi-detail" v-if="headTabId == 1">
            
        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
import api from '../../api/index.js'
import {voteSubmit} from '../../api/apiEvent.js'
import LyTabSecond from '../../components/ly-tab/src/index.vue';
export default {
    components:{
        HeadBack,
        LyTabSecond
    },
    created() {
        // console.log('==============', this.$route.params.id.split('&')[0]);
        if(this.$route.params.id.split('&').length == 3){
            // 获取评分列表
            this.pageType = 2;
        }else{
            // 获取投票列表
            this.pageType = 1;            
        }
        if(this.$route.params.id.split('&')[1] == 3){
            // 获取投票列表
            this.pageType = 1; 
        }else{
            // 获取评分列表
            this.pageType = 2;
        }
        // 获取投票列表
        this.getVoteList(this.$route.params.id.split('&')[0], true);

        // 获取个人信息
        this.getUserInfo();
    },
    data() {
        return {
            headTab:['参赛者作品','赛事详情'],
            headTabId:'',
            voteTab:[],
            voteTabId:'',
            voteList:[],
            voteNums:[],
            options: {
                activeColor: '#0EAF0A',
                labelKey: "name",
                // 可在这里指定labelKey为你数据里文字对应的字段
            },
            options1: {
                activeColor: '#0EAF0A',
                labelKey: "name",
                // 可在这里指定labelKey为你数据里文字对应的字段
            },
            indexTypeId: 0,
            competition_type_id: 0,     // 一级分类
            competition_type_id1: 0,    // 二级分类
            status: this.$route.params.id.split('&')[1],
            indexTypeId1: 0,
            voteTab1: [],
            username: '',               // 搜索关键字
            pageType: 1,    // 页面种类 1 表示投票列表 2 表示评分列表页

        }
    },
    methods: {
        /**
         * 获取评分列表
         */
        // async grade_list(competition_id,isVote=false){
        //     const {data:ret} = await this.$http.post(this.setApi + api.grade_list,this.querystring.stringify({
        //         // access_token: window.localStorage.getItem('token'),
        //         competition_id: this.$route.params.id.split('&')[0],
        //         competition_type_id: this.competition_type_id,
        //         competition_type_id1,
        //         status
        //     }));
        //     // console.log(ret.response_data);
        //     this.userInfo = ret.response_data;
        // },



        /**
         * 获取视频列表
         */
        async getVoteList(competition_id,isVote=false){
            let apiUrl = this.$route.params.id.split('&').length == 3 ? api.grade_list : api.voteList
            let token = window.localStorage.getItem('token');
            const {data:ret} = await this.$http.post(this.setApi + apiUrl, this.querystring.stringify({
                // access_token: token,
                competition_id: this.$route.params.id.split('&')[0],
                competition_type_id: this.competition_type_id,
                competition_type_id1: this.competition_type_id1,
                status: this.status,
                username: this.username
            }));
            // console.log(ret);
            this.voteList = ret.response_data.lists
            ret.response_data.lists.forEach((item,index)=>{
                this.voteNums.push(item.poll_number);
            })
            if(!isVote) return;
            // let temObj = {
            //     competition_type_id:  '0',
            //     name:' 全部'
            // }
            // ret.response_data.type_lists.unshift(temObj);
            this.voteTab = ret.response_data.type_lists;
            this.competition_type_id = Number(ret.response_data.type_lists[0].competition_type_id);
            this.competition_type_id1 = Number(ret.response_data.type_lists[0].children[0].competition_type_id);
            this.voteTab1 = ret.response_data.type_lists[0].children;
            this.getVoteList(this.$route.params.id.split('&')[0]);
            // console.log('=-===========', ret.response_data);
        },

        /**
         * 获取评分赛事列表
         */
        async getGradeList(isVote = false){
            let token = window.localStorage.getItem('token');

            const {data:ret} = await this.$http.post(this.setApi + api.grade_list,this.querystring.stringify({
                // access_token: token,
                competition_id: this.$route.params.id.split('&')[0],
                competition_type_id: this.competition_type_id,
                competition_type_id1: this.competition_type_id1,
                status: this.status,
                username: this.username
            }))

            if(!ret.error_code){
                this.voteList = ret.response_data.lists;
                ret.response_data.lists.forEach((item,index)=>{
                    this.voteNums.push(item.poll_number);
                });
    
                if(!isVote) return;
                this.voteTab = ret.response_data.type_lists;
                this.competition_type_id = Number(ret.response_data.type_lists[0].competition_type_id);
                this.competition_type_id1 = Number(ret.response_data.type_lists[0].children[0].competition_type_id);
                this.voteTab1 = ret.response_data.type_lists[0].children;
            }else{
                this.$toast(ret.error_msg);
            }

        },

        /**
         * 搜索
         */
        search(){
            // this.competition_type_id = 0;
            // this.competition_type_id1 = 0;
            this.getVoteList();
        },

        /**
         * 投票
         */
        voteSubmit(id,index){
            new Promise((res,rej)=>{
                res(voteSubmit(id))
            }).then((ret)=>{
                if(!ret.response_data.error_code){
                    this.$toast.success('投票成功');
                    this.voteNums.splice(index, 1, ++this.voteNums[index]);
                }else{
                    // console.log('res.response_data.error_msg', ret.response_data.error_msg)
                    this.$toast(ret.response_data.error_msg);
                }
            })
        },

        /**
         * 切换顶部
         */
        switchTopTab(index){
            this.headTabId = index;
            if(index == 1){
                // 跳转赛事详情
                this.$router.push(`/event/details/${this.$route.params.id}`);
            }
        },

        /**
         * 二级导航点击
         */
        switchTab1(e){
            // console.log()
            // this.log('===========', e);
            // return;
            this.competition_type_id1 = e.competition_type_id;
            this.getVoteList(this.$route.params.id.split('&')[0]);
        },


        /**
         * 切换tab栏
         */
        switchTab(e){
            // console.log(e)
            // console.log(index)
            // this.log('===========', e);
            // return;
            this.competition_type_id = e.competition_type_id;
            // this.indexTypeId = index;
            this.voteTab1 = e.children;

            this.getVoteList(this.$route.params.id.split('&')[0]);
            // return
            // let id = e.id;
            // if(id * 1 > 0){
            // }else{
            //     this.indexTypeId = 0;
            //     id = this.indexTypeList[1].competition_type_id;
            // }
        },

        /**
         * 获取个人信息
         */
        async getUserInfo(){
            const {data:ret} = await this.$http.post(this.setApi + api.userInfo,this.querystring.stringify({access_token:window.localStorage.getItem('token')}));
            window.localStorage.setItem('userInfo',JSON.stringify(ret.response_data));
            // console.log(ret.response_data);
            this.userInfo = ret.response_data;
        }

    },
}
</script>

<style lang="less" scoped>
@import url('./vote.less');
.lay-out {
    background: #333;
    margin-bottom: 1.25rem;
}
.lay-out1 {
    margin-bottom: 0rem;
}
.event-select{
    padding-top: 1.0625rem;
    padding-left: .9375rem;
    padding-right: .9375rem;
    background: #fff;
    >p{
        padding-left: .875rem;
        font-size: .9375rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: .875rem;
    }
    ul{
        li{
            background: #F1F1F2;
            font-size: .75rem;
            // padding: 0 2.875rem;
            // width: 10.1875rem;
            text-align: center;
            // height: 1.875rem;
            flex-shrink: 0;
            text-align: center;
            // line-height: 1.875rem;
            margin-bottom: .6875rem;
            padding: .3125rem .875rem;
            border-radius: .25rem;
        }
        .active{
            background: #312F32;
            color: #fff;
        }
    }
    .isShow{
        text-align: center;
        height: 6.25rem;
        line-height: 6.25rem;
        color: #666;
    }
}
.search-input {
    // padding-top: 3.4375rem;
}
.search-input span {
    // color: #333;
}
.search-input{
        // width: 100%;
        position: relative;
        height: 5.75rem;
        // border: 1px solid red;
        padding: 0 .9375rem;
        padding-top: 3.125rem;
        box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
        .van-field {
            width: 18.4375rem;
            height: 1.875rem;
            background: #F0F0F1;
            border-radius: 1.125rem;
            border: none;
            outline: none;
            padding-left: 1.875rem;
            padding-right: 1.3125rem;
            font-size: .8125rem;
            color: #8E8E93;
            line-height: 1.875rem;
        }
        .van-icon{
            position: absolute;
            left: 1.5625rem;
            top: 50%;
            transform: translateY(-50%);
        }
        .icon-htmal5icon13{
            // right: 1.3125rem;
            position: absolute;
            color: #8E8E93;
            right: 4.8125rem;
        }
        >span{
            color: #333;
            font-weight: 700;
            font-size: .875rem;
            flex-shrink: 0;
            margin-left: .875rem;
        }
    }

    #vote .vote {
        padding-top: 0;
    }
</style>


<template>
    <div id="my-pages">
        <head-back :color="'#fff'">

        </head-back>
        <!-- <Upload :loading="false" @onUpload="scrollEvent"> -->
            <div class="my-pages">
            <!-- 背景封面图 -->
            <div class="topbgc">
                <img :src="userInfo.head" alt="">
            </div>
            <!-- 头像 用户名 性别 地区 关注 -->
            <div class="users-info flex flex--justify-content--space-between flex--align-items--end">
                <div class="headinfo flex flex--align-items--end">
                    <img preview :src="userInfo.head" alt="">
                    <div>
                        <p>{{userInfo.nickname}}</p>
                        <span>{{userInfo.sex == 1 ? '男' : '女'}} {{userInfo.year}}岁 | {{userInfo.province_name}} {{userInfo.city_name}}</span>
                    </div>
                </div>
                <div @click="userInfo.id == userId ? $router.push('/my/edit') : guanzhuUser " class="guanzhu">{{userInfo.id == userId ? '编辑资料' : '关注'}}</div>
                <!-- <div @click="userInfo.id == userId ? $router.push('/my/edit') : guanzhuUser " class="guanzhu">{{userInfo.id == userId ? '编辑资料' : '关注'}}</div> -->
            </div>
            <!-- 获赞 关注 粉丝 -->
            <ul class="dataNum flex flex--justify-content--space-between">
                <li>
                    <span>{{userInfo.praise_sum}}</span>
                    <span>获赞</span>
                </li>
                <li>
                    <span>{{userInfo.attention_sum}}</span>
                    <span>关注</span>
                </li>
                <li>
                    <span>{{userInfo.user_sum}}</span>
                    <span>粉丝</span>
                </li>
            </ul>
            <!-- 发布作品 -->
            <div @click="$router.push('/my/sends')" class="send flex flex--justify-content--center flex--align-items--center">
                <i class="iconfont icon-bianji1"></i>
                <span>发布作品</span>
            </div>
            <!-- 作品 动态 赞过 -->
            <ul class="zpDataNum flex flex--justify-content--space-between">
                <li :class="tabId == 1 ? 'active' : ''" @click="switchTab(1)">
                    <span>99</span>
                    <span>作品</span>
                </li>
                <li :class="tabId == 2 ? 'active' : ''" @click="switchTab(2)">
                    <span>99</span>
                    <span>动态</span>
                </li>
                <li :class="tabId == 3 ? 'active' : ''" @click="switchTab(3)">
                    <span>99</span>
                    <span>赞过</span>
                </li>
            </ul>
            <!-- 作品列表 -->
            <ul v-show="tabId == 1" class="zuopinlist flex flex--wrap flex--justify-content--space-between">
                <li @click="$router.push(`/works/${item.id}`)" v-for="(item, index) in videoList" :key="index">
                    <img :src="item.image == '' || item.image == null ? item.head : item.image" alt="">
                    <div>
                        <div class="flex flex--align-items--center">
                            <img :src="item.head" alt="">
                            <span>{{userInfo.nickname}}</span>
                        </div>
                        <!-- <p></p> -->
                    </div>
                </li>
            </ul>
            <!-- 话题列表 -->
            <ul v-show="tabId == 2" class="zuopinlist flex flex--wrap flex--justify-content--space-between">
                <li @click="$router.push(`/topic/details/${item.id}`)" v-for="(item, index) in topicList" :key="index">
                    <img :src="item.img" alt="">
                    <div>
                        <div class="flex flex--align-items--center">
                            <img :src="item.head" alt="">
                            <span>{{userInfo.nickname}}</span>
                        </div>
                        <!-- <p></p> -->
                    </div>
                </li>
            </ul>
            <!-- 赞过列表 -->
            <ul v-show="tabId == 3" class="zuopinlist flex flex--wrap flex--justify-content--space-between">
                <li v-for="(item, index) in praisedList" :key="index">
                    <img :src="item.image" alt="">
                    <div>
                        <div class="flex flex--align-items--center">
                            <img :src="item.head" alt="">
                            <span>{{userInfo.nickname}}</span>
                        </div>
                        <!-- <p></p> -->
                    </div>
                </li>
            </ul>
            <!-- <div></div> -->
        </div>
        <!-- </Upload> -->
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
import api from '../../api'
import {getAttention} from '../../api/apiEvent.js';
import Upload from '../../components/upload/upload'
export default {
    components:{
        HeadBack,
        Upload
    },
    created() {
        this.getUserInfo()
        this.getUserVideo()
    },
    mounted() {
        window.ontouchmove = ()=>{
            this.scroEvent()
        }
    },
    destroyed() {
        this.pageClose()
    },
    data() {
        return {
            userInfo:{},
            userId:JSON.parse(window.localStorage.getItem('userInfo')).id,
            tabId:'1',
            videoList:[],
            topicList:[],
            praisedList:[],
            loadtext:'loading...',
            di:false,
            nums:1,
            loading:false,
            totalPages:''
        }
    },
    methods: {
        pageClose(){
            // 获取所有的class类名
            var classLists = 'pswp--supports-fs,pswp--open,pswp--animate_opacity,pswp--notouch,pswp--css_animation,pswp--svg,pswp--zoom-allowed,pswp--visible,pswp--zoom-allowed,pswp--animated-in'
            // 分割成数组
            var clists = classLists.split(',')
            // 获取Dom元素
            var nones = document.querySelector('.pswp')
            var nonesChild = document.querySelector('.pswp .pswp__bg')
            // 默认样式清空
            nones.style = ''
            nonesChild.style = ''
            // 将自定义属性设置为true
            nones.setAttribute('aria-hidden','true')
            // 遍历删除分割数组内的class名
            clists.forEach(item=>{
                nones.classList.remove(item)
            })
        },
        // 下拉加载更多数据
        scroEvent(){
            window.addEventListener('scroll',()=>{
                if(this.loading) return
                var docHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight); //document.documentElement.scrollHeight // 文档的高度 
                var winHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0; //window.innerHeight // 浏览器的高度
                var scrollTops = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0; // document.documentElement.scrollTop // 被卷上去的高度
                console.log(docHeight,winHeight,scrollTops,docHeight-winHeight-scrollTops)
                if((docHeight-winHeight-scrollTops)<=0){
                    if(this.nums >= this.totalPages) return this.loadtext = "- 没有更多数据了 -" , setTimeout(()=>{this.di = false},500)
                    this.loading = true
                    this.di = true
                    console.log('success')
                    this.getUserVideo(this.tabId,++this.nums)
                }
            })
        },
        switchTab(index){
            this.tabId = index
            this.getUserVideo(index)
        },
        // 获取用户信息
        async getUserInfo(){
            const {data:ret} = await this.$http.post(this.setApi + api.myPages,this.querystring.stringify({
                user_id:this.$route.params.id,
                access_token:window.localStorage.getItem('token')
            }))
            console.log(ret)
            this.userInfo = ret.response_data.lists.user_info
        },
        // 获取用户视频
        async getUserVideo(type=1,page=1){
            const {data:ret} = await this.$http.post(this.setApi + api.myVideo,this.querystring.stringify({
                user_id:this.$route.params.id,
                type,
                page
            }))
            console.log(type,ret)
            switch(type){
                case 1:
                    this.topicList = []
                    this.praisedList = []
                    ret.response_data.lists.video.forEach(item=>this.videoList.push(item))
                    this.totalPages = ret.response_data.lists.video_page_sum
                    console.log(this.videoList)
                break;
                case 2:
                    this.videoList = []
                    this.praisedList = []
                    ret.response_data.lists.topic.forEach(item=>this.topicList.push(item))
                    this.totalPages = ret.response_data.lists.topic_page_sum
                break;
                case 3:
                    this.videoList = []
                    this.topicList = []
                    ret.response_data.lists.parise.forEach(item=>this.praisedList.push(item))
                    this.totalPages = ret.response_data.lists.video_page_sum
                break;
            }
        },
        guanzhuUser(){
            getAttention(1,this.userInfo.id);
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./mypage.less');
</style>

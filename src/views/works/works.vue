<template>
    <div id="works">
        <head-back :color="headColor">
            <span v-show="true" class="head-title" style="color:#333;">作品详情</span>
        </head-back>
        <div class="works pt30">
            <div class="videoplayer">
                <!-- 暂时屏蔽 :class="{'full-video': isFull}" :style="{'width': vwidth, 'height': vheight}" -->
                <!-- <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                ></video-player> -->

                <video  style="width:100%;"  controlslist="nodownload" controls :src="playerOptions.sources[0].src"></video>
                <!-- <video
                        x5-video-orientation="landscape"
                        :class="{'full-video': isFull}"
                        class="video-player vjs-custom-skin"
                        controls
                        :src="this.playerOptions.sources[0].src"></video> -->
                    <!-- <div>
                        <div class="fied-btn" @click="isFull = !isFull">
                            点击全屏
                        </div>
                    </div> -->
            </div>
            <!-- <video id="videos" controls>
                <source :src="videoUrl" type="video/mp4"></source>
            </video> -->
            <!-- 视频详情 -->
            <div class="infos" v-if="!$route.meta.vote">
                <!-- flex--align-items--center oneLineBetween -->
                <div class="head flex flex--row">
                    <section class="flex flex--align-items--center oneLineBetween">
                        <!-- 获取是id  如果不是id的话  就要加入一个user_id 字段 -->
                        <section class="flex flex--align-items--center">
                            <img @click="$router.push(`/mypage/${zuopinInfo.uid}`)" :src="zuopinInfo.head" alt="">
                            <span>@{{zuopinInfo.nickname}}</span>
                        </section>
                        <!-- @click="getAttentions(4,zuopinInfo.uid)" -->
                        <!-- 分享 -->
                        <!-- <a class="share" href="javascript:void(0)" @click="shareDetail" style="">
                            <van-icon name="share" />
                            分享
                        </a> -->
                    </section>
                    <section class="share flex flex--align-items--center flex--justify-content--space-between" style="padding: 16px 0;">
                        <!-- <a @click="gotoCompeition" href="javaScript:void(0)">预约课程</a> -->
                        <div @click="collection" style="">收藏</div>
                        <div @click="gotoCompeition" style="">预约</div>
                        <div @click="shareDetail" style="">分享</div>
                        <!-- <div @click="getAttentions(4,zuopinInfo.uid)" v-show="isAttention == 0">关注</div>
                        <div @click="getAttentions(4,zuopinInfo.uid)"  v-show="isAttention==1">已关注</div> -->

                        <div @click="report" style="background:#ffb308;color:#fff;">举报</div>
                    </section>
                </div>
                <p>{{zuopinInfo.content}}</p>
            </div>
            <div class="vote-event" v-if="$route.meta.vote">
                <div class="infonum flex flex--justify-content--space-between">
                    <div>
                        <p>{{voteDetails.identity_number}}</p>
                        <span>{{voteDetails.nickname}}</span>
                    </div>
                    <div>
                        <p>{{voteDetails.poll_number}}</p>
                        <span>当前票数</span>
                    </div>
                </div>
                <div v-if="pageType == 1" class="submit" @click="voteSubmit($route.params.id)">投票</div>
            </div>
            <!-- 视频评论 -->
            <div class="works-pinglun">
                <div class="p_title flex flex--justify-content--space-between flex--align-items--center">
                    <p>评论互动</p>
                    <!-- <span>更多</span> -->
                </div>
                <ul class="pinglunlist">
                    <li v-for="(item, index) in pinglunList" :key="index">
                        <div class="top flex flex--justify-content--space-between flex--align-items--center">
                            <div class="flex flex--justify-content--space-between flex--align-items--center">
                                <img :src="item.head" alt="">
                                <div>
                                    <p>{{item.nickname}}</p>
                                    <span>{{index === 0? '刚刚':item.ctime}}</span>
                                </div>
                            </div>
                            <!-- <img @click="praise(2,1,item.uid,item.cid)" :src="item.is_praise == 0 ? liken : like" alt=""> -->
                        </div>
                        <p>
                            {{item.content}}
                        </p>
                    </li>
                </ul>
            </div>

            <!-- 底部评论从能框 -->
            <div class="pinglun-input flex flex--align-items--center">
                <div @click="inputwidth" class="input">
                    <!-- <input v-model="content" type="text" placeholder="发表我的看法..."> -->
                    <input v-model="content" type="text" placeholder="友善评论、理性发言、阳光心灵">
                </div>
                <span @click="sendSay" class="sendsay" v-show="!footerTab">{{btname}}</span>
                <ul class="flex" v-show="footerTab">
                    <li @click="inputwidth">
                        <img src="../../assets/icon/icon-pinglun-v.png">
                        <p>{{zuopinInfo.comment_sum ? zuopinInfo.comment_sum : 0}}</p>
                    </li>
                    <!-- <li style="position:relative;" @click="praise(1,zuopinInfo.praise == 0 ? 1 : 2,zuopinInfo.uid,zuopinInfo.vid)"> -->
                    <li style="position:relative;" @click="giveMeLike">
                        <span class="opration-num" :class="{'active': isOperation}">{{zuopinInfo.praise == 0 ? '-' : '+'}}1</span>
                        <img :src="zuopinInfo.praise == 0 ? liken : like">
                        <p>{{zuopinInfo.praise ? zuopinInfo.praise : 0}}</p>
                    </li>
                    <li @click="openSelectRecoder">
                        <img src="../../../static/image/Rewarr.png">
                        <p>打赏</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="loading" v-if="isShowLoading">
            <!-- 加载条 -->
            <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
        </div>

        <van-popup v-model="exceptSpecies">
            <div class="modle flex dashang">
                <ul class="flex flex--justify-content--space-around flex--wrap">
                    <li
                        v-for="(item,index) in exceptionalList"
                        :key="index"
                        @click="reward(item)"
                        class="flex flex--row flex--align-items--center">
                        <div class="top-img">
                            <img :src="item.img" alt="">
                        </div>
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </div>
        </van-popup>


        <!-- 登录提示弹窗 -->
        <van-popup v-model="showModle">
            <div class="login-modle flex flex--row flex--align-items--center">
                <div class="login-content flex flex--justify-content--center">
                    尊敬的用户，欢迎来到爱叮咚，请您先登录
                </div>
                <div class="login-btn flex flex--justify-content--space-between">
                    <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(1)">去首页</a>
                    <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(2)">去登录</a>
                </div>
            </div>
        </van-popup>



        <chose-pay-type 
            ref="choseType" 
            :orderdetail="detailInfo"
            :needPayType="6"
            :position="'bottom'"></chose-pay-type>


    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback';
import api from '../../api';
import {getPraise,getAttention,voteSubmit} from '../../api/apiEvent';
import like from '../../assets/icon/icon-likes-active.png';
import liken from '../../assets/icon/icon-likes.png';


import flowers from '../../assets/icon/flowers.png';
import applause from '../../assets/icon/applause.png';
import iconGold from '../../assets/icon/icon-gold.png';
import timeFormat from '../../utils/times.js';

import logo from '../../assets/icon.png';
import chosePayType from '@/components/chosePayType';


export default {
    components:{
        HeadBack,
        chosePayType
    },
    created() {
        this.VoiteId =  this.$route.params.id.split('&')[0];

        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        // console.log('userInfouserInfo', this.$route.params)
        // console.log('this.$route', this.$route);
        this.$route.meta.vote ? this.getVoteDetails() : this.getzuopinDetail();
        // console.log('====this.$route.params.id===', this.$route.params.id);
        // console.log('===this.VoiteId====', this.VoiteId);
        // 获取打赏类别
        this.getRewardList();
    },
    mounted() {
        let that = this;
        document.addEventListener('scroll',this.scrollEvent);
        document.addEventListener("plusready", this.onplusready, false);
        this.updateSerivces();
        // document.onscroll=()=>{
        //     this.scrollEvent()
        // }
        // document.ontouchmove = ()=>{
        //     this.scrollEvent()
        // }
        // this.vwidth = document.documentElement.clientWidth;
        // this.vheight = document.documentElement.clientHeight;
    },
    destroyed() {
        document.removeEventListener('scroll',this.scrollEvent);
        // document.onscroll=()=>{
        //     // this.scrollEvent()
        // }
    },
    data() {
        return {
            showModle: false,       // 是否展示登录弹窗
            isFull: false,          // 当前视频是否全屏
            show: true,
            like,
            liken,
            vwidth: 0,
            vheight: 0,
            footerTab:true,
            zuopinInfo:{},
            pinglunList:[],
            content:'',
            headColor:'#333',
            headTitle:false,
            flag:false,
            isAttention:'',
            videoUrl:'',
            voteDetails:{},
            isShowLoading: false,       // 是否显示加载动效
            // 视频播放器
            playerOptions: {
                autoplay: true, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",
                    // type:'rtmp/mp4',
                    src: ''
                    // src:'rtmp://46463.livepush.myqcloud.com/live/tianyu?txSecret=c4fd1c165df5bf307790d7005cd1ffc8&txTime=5CBDE4FF'
                }],
                poster: "poster.jpg", //你的封面地址
                width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
            },
            isOperation: false,         // 标识当前是否操作过该按钮
            VoiteId: 0,
            exceptSpecies: false,        // 展示打赏方式选择的弹窗
            exceptionalList: [
                {
                    id: 1,
                    name: '1x鲜花',
                    img: flowers

                },
                {
                    id: 2,
                    name: '1x掌声',
                    img: applause
                },
                {
                    id: 3,
                    name: '1x金币',
                    img: iconGold
                },
            ],                          // 打赏内容列表
            pageType: this.$route.params.id.split('&')[1],
            is_exemption: 0,        // 是否有免责声明
            userInfo: null,         // 个人信息
            detailInfo: null,       // 打赏订单信息
            praiseLock: true
        }
    },
    computed: {
        btname(){
            return this.content.length <= 0 ? '取消' : '发表'
        }
    },
    methods: {
        /**
         * 点赞
         */
        async giveMeLike(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                correlation_id: this.VoiteId,
                type: 1
            }

            const {data:ret} = await this.$http.post(this.setApi + api.praise,this.querystring.stringify(params))
            console.log(ret)
            if(!ret.response_data.error_code){
                this.$toast('点赞成功！');
                // this.$route.meta.vote ? this.getVoteDetails() : this.getzuopinDetail();
                this.zuopinInfo.praise ++
            }else{
                if(ret.response_data.error_msg){
                    this.$toast(ret.response_data.error_msg);
                }else{
                    this.$toast('明天再来吧！');
                }
                return
            }
        },

        /**
         * 收藏视频
         */
        async collection(){
            const {data:ret} = await this.$http.post(this.setApi + api.shoucang,this.querystring.stringify({
                access_token: window.localStorage.getItem('token'),
                correct_id: this.VoiteId,
            }))

            if(!ret.error_code){
                this.$toast('已收藏');
            }else{
                this.$toast(ret.error_msg);
                return
            }
        },
        /**
         * 点击举报视频
         */
        async report(){
            const {data:ret} = await this.$http.post(this.setApi + api.jubao,this.querystring.stringify({
                access_token: window.localStorage.getItem('token'),
                correct_id: this.VoiteId,
                type: 2     //  1用户  2视频
            }))

            if(!ret.error_code){
                this.$toast('已举报');
            }else{
                this.$toast(ret.error_msg);
                return
            }
        },

        /**
         * 打赏支付完成提醒用户短信接收通知
         */
        async send_msg(){
            const {data:ret} = await this.$http.post(this.setApi + api.getcode,this.querystring.stringify({
                type: 9,
                mobile: this.zuopinInfo.phone,
                name: this.zuopinInfo.truename,
                access_token: window.localStorage.getItem('token'),
            }))

            if(!ret.error_code){
                this.$toast('打赏信息已经下发至短信，请注意查收！');
                window.localStorage.setItem('from_data', null);
            }else{
                this.$toast(ret.error_msg);
                return
            }

        },

        /**
         * 跳转连接
         * @param {*} type  [1表示返回，2表示去登录]
         */
        goJumpUrl(type){
            this.showModle = false
            if(type == 1){
                this.$router.push('/');
            }else{
                this.$router.push('/login');
            }
        },

        /**
         * 跳转到预约课程
         */
        gotoCompeition(){
            this.$router.push({
                path: `/aboutClass?coach_id=${this.zuopinInfo.uid}`
            })
        },

        /**
         * 分享
         */
        shareDetail(){
            let that = this;
            var shareBts = [];
            // 更新分享列表
            var ss = that.shares['weixin'];
            ss && ss.nativeClient && shareBts.push({
                    title: '微信朋友圈',
                    s: ss,
                    x: 'WXSceneTimeline'
                }),
                shareBts.push({
                    title: '微信好友',
                    s: ss,
                    x: 'WXSceneSession'
                })

            // ss = shares['qq'];
            // ss && ss.nativeClient && shareBts.push({
            //     title: 'QQ',
            //     s: ss
            // });
            // 弹出分享列表
            shareBts.length > 0 ? plus.nativeUI.actionSheet({
                // title: '分享',
                cancel: '取消',
                buttons: shareBts
            }, function(e) {
                (e.index > 0) && that.shareAction(shareBts[e.index - 1], true);
            }) : plus.nativeUI.alert('当前环境无法支持分享链接操作!');
        },

        onplusready() {
            this.updateSerivces()
        },

        updateSerivces(){
            let that = this;
            plus.share.getServices(function(s){
                that.shares={};
                for(var i in s){
                    var t=s[i];
                    that.shares[t.id]=t;
                }
            }, function(e){
                // outSet('获取分享服务列表失败：'+e.message);
            });
        },


        shareAction(sb, bh) {
            let that = this
            //  console.log('分享操作：');
            if(!sb || !sb.s) {
                outLine('无效的分享服务！');
                return;
            }
            var msg = {
                // content: that.zuopinInfo.content,
                content: '点击注册下载',
                extra: {
                    scene: sb.x
                },
                // title: that.zuopinInfo.content
                title: '爱叮咚APP'
            };
            if(bh) {
                // 264
                msg.href = `http://taiji_share.test01.qcw100.com/#/login?id=${that.$route.params.id.split('&')[0]}&invite_code=${this.userInfo.invite_code}`;
                // if(that.sharehrefTitle && that.sharehrefTitle != '') {
                //     msg.title = that.sharehrefTitle;
                // }
                // if(that.sharehrefDes && that.sharehrefDes != '') {
                //     msg.content = that.sharehrefDes;
                // }
                msg.thumbs = [logo];
                // msg.pictures = ['http://ganxibao.test01.qcw100.com/logo.png'];
                // msg.title = that.zuopinInfo.content;

                // var img = plus.io.convertAbsoluteFileSystem(Share.info.head_image.replace('file://', ''));

                // msg.thumbs = [img];



            } else {
                if(that.pic && that.pic.realUrl) {
                    msg.pictures = [that.pic.realUrl];
                }
            }
            // 发送分享
            if(sb.s.authenticated) {
                //  console.log('---已授权---');
                that.shareMessage(msg, sb.s);
            } else {
                //  console.log('---未授权---');
                sb.s.authorize(function() {
                    that.shareMessage(msg, sb.s);
                }, function(e) {
                //  plus.nativeUI.alert('认证授权失败');
                //  plus.nativeUI.alert('认证授权失败：' + e.code + ' - ' + e.message);
                });
            }
        },

        shareMessage(msg, s) {
            // outLine(JSON.stringify(msg));
            s.send(msg, function() {
                // plus.nativeUI.alert('分享到"' + s.description + '"成功！');
            }, function(e) {
                plus.nativeUI.alert('分享到"' + s.description + '"失败！');
            // plus.nativeUI.alert('分享到"' + s.description + '"失败: ' + JSON.stringify(e));
            });
        },


        /**
         * 打开
         */
        openSelectRecoder(){
            this.exceptSpecies = true;
        },

        /**
         * 打赏操作
         */
        async reward(obj){

            let params = {
                access_token: window.localStorage.getItem('token'),
                to_user_id: this.zuopinInfo.uid,
                video_id: this.zuopinInfo.vid,
                reward_id: obj.id,
                reward_money: obj.gold_sum
            }

            const {data:ret} = await this.$http.post(this.setApi + api.reward, this.querystring.stringify(params));
            if(!ret.error_code){
                this.exceptSpecies = false;

                // 给被打赏人发送短信通知
                // this.send_msg();
                // this.$toast('打赏成功！');

                this.detailInfo = ret.response_data;
                this.$refs.choseType.open();

            }else{
                this.$toast(ret.error_msg);
            }

        },

        /**
         * 获取打赏名列表
         */
        async getRewardList(){
            let params = {
                access_token: window.localStorage.getItem('token'),
                type: 1
            }
            const {data:ret} = await this.$http.post(this.setApi + api.rewardList, this.querystring.stringify(params));

            if(!ret.error_code){
                // console.log('获取打赏列表', ret);
                this.exceptionalList = ret.response_data.lists;
            }else{

            }

        },

        // 改变输入框的样式
        inputwidth(e){
            console.log(e)
            // 13.75rem
            document.querySelector('.input').style.width = '89%';
            document.querySelector('.input').style.marginRight = '.5rem';
            // document.querySelector('.input input').style.width = '100%'
            this.footerTab = false

        },
        // 重置输入框的样式
        reswidth(){
            document.querySelector('.input').style.width = '13.75rem';
            document.querySelector('.input').style.marginRight = '0';
            setTimeout(()=>{
                this.footerTab = true
            },500)
        },
        // 获取作品详情
        async getzuopinDetail(){
            // this.isShowLoading = true;
            // console.log('zuopinxiangqing',this.zuopinInfo)
            const {data:ret} = await this.$http.post(this.setApi + api.zuopinDetail,this.querystring.stringify({
                video_id: this.VoiteId,
                access_token:window.localStorage.getItem('token'),
                user_id:this.zuopinInfo.uid
            }))
                // console.log('video', ret)
            if(!ret.error_code){
                this.is_exemption = ret.response_data.lists.video[0].is_exemption;

                if(Number(ret.response_data.lists.video[0].is_exemption) == 1 && !Number(ret.response_data.lists.video[0].is_charge)){
                    setTimeout(() => {
                        this.$dialog.confirm({
                            title: '免责提示',
                            message: '本视频仅用于文化交流推广，若有涉及您的肖像权，著作权等知识产权问题，请及时联系客服作下架处理！'
                        }).then(() => {
                            // on confirm
                            // console.log('确定')
                        }).catch(() => {
                            // on cancel
                            // console.log('取消')
                        });
                    }, 1000)
                }

                // console.log('评论',ret.response_data.lists.comment)
              ret.response_data.lists.comment.forEach((v)=>{
                v.ctime = timeFormat.timestampToTime(v.ctime)
              })
                // console.log('00000000000000000',ret.response_data.lists.video[0].video)
                this.videoUrl = ret.response_data.lists.video[0].video;
                this.playerOptions.sources[0].src = ret.response_data.lists.video[0].video;
                this.zuopinInfo = ret.response_data.lists.video[0];
                this.pinglunList = ret.response_data.lists.comment;
                this.is_exemption = ret.response_data.lists.video[0].is_exemption;




            }else{

                
                if(ret.error_msg.indexOf('账号') > -1){
                    this.showModle = true; 
                }else{
                    this.$toast(ret.error_msg);
                }

                // this.$router.go(-1)
                return
            }
            // this.isShowLoading = false;
        },
        // 获取投票作品详情
        async getVoteDetails(){
            const {data:ret} = await this.$http.post(this.setApi + api.voteDetail,this.querystring.stringify({
                apply_id: this.VoiteId,
                user_id:JSON.parse(window.localStorage.getItem('userInfo')).id
            }))
            // console.log('vote',ret)
            if(!ret.error_code){
                this.pinglunList = ret.response_data.comment
                this.playerOptions.sources[0].src = ret.response_data.detail[0].video
                this.voteDetails = ret.response_data.detail[0]
            }else{
                if(ret.error_msg.indexOf('账号') > -1){
                    this.showModle = true; 
                }else{
                    this.$toast(ret.error_msg);
                }
                // this.$toast(ret.error_msg);
                // this.$router.go(-1);
                return
            }
        },
        // 发表评论
        async sendSay(){
            switch(this.btname){
                case '取消':
                    this.reswidth()
                break;
                case '发表':
                    const {data:ret} = await this.$http.post(this.setApi + api.comment,this.querystring.stringify({
                        type:1,
                        content:this.content,
                        correlation_id: this.VoiteId,
                        access_token:window.localStorage.getItem('token')
                    }));
                    // console.log(ret);
                    this.$toast('发表成功');
                    this.reswidth();
                    this.content = '';
                    this.getzuopinDetail();
                break;
            }

        },

        /**
        * 点赞
         */
        praise(type,prise_or_cancle,reception_user_id,correlation_id){
            // this.isShowLoading = true;
            if(!this.praiseLock){
                this.$toast('今天已点赞，明天再来吧！')

                return
            }
            // debugger
            if(this.isOperation){

                return;
            }

            this.isOperation = true;

            setTimeout(()=>{
                this.zuopinInfo.praise ++;
                this.isOperation = false;
                this.praiseLock = false;
            }, 500)

            // if(type == 1){
            //     if(this.zuopinInfo.praise == 0){
            //         this.zuopinInfo.praise = 1;
            //     }else{
            //         this.zuopinInfo.praise = 0;
            //     }
            //     this.isOperation = true;


            //     setTimeout(() => {
            //         this.isOperation = false;
            //     }, 800)
            // }

            // new Promise((res,rej)=>{
            //     res(getPraise(type,prise_or_cancle,reception_user_id,correlation_id))
            // }).then(()=>{
            //     // this.isShowLoading = false;

            //     // this.getzuopinDetail()
            //     this.$route.meta.vote ? this.getVoteDetails() : this.getzuopinDetail();

            // })

        },
        scrollEvent(){
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            // console.log(scrollTop);
            scrollTop >= 160 ? (document.querySelector('.head-back').style.backgroundColor = '#333',this.headColor='#333',this.headTitle = true) : (document.querySelector('.head-back').style.backgroundColor = 'transparent',this.headColor='#333',this.headTitle = false)
        },
        // 关注
        getAttentions(type,id){
            getAttention(type,id)
            this.$nextTick(()=>{
                // this.getzuopinDetail()
            })
        },
        voteSubmit(id){
            new Promise((res,rej)=>{
                res(voteSubmit(id), this.voteDetails.poll_number);
            }).then((res)=>{
                // this.getVoteDetails()
                if(!res.response_data.error_code){
                    ++this.voteDetails.poll_number;
                    this.$toast.success('投票成功');
                }else{
                    this.$toast(res.response_data.error_msg);
                }
            })

        }
    },
}
</script>

<style lang="less" scoped>
@import url('./works.less');
#works {
    width: 100%;
    overflow-x: hidden;
}
.modle {
    width: 16rem;
    box-sizing: border-box;
    padding: 1.25rem;
}
.modle ul {
    flex-grow: 1;
}
.top-img {
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: .625rem;
}
.top-img img {
    display: block;
    width: 100%;
}
.dashang p {
    font-size: .875rem;
}
.van-popup {
    border-radius: .375rem;
}








.loading {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
}

.opration-num {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -0px;
    opacity: 0;
    // color: #333;
    color: red;
    z-index: -1;
    // transition: 1s linear;
}
.opration-num.active {
    animation:mymove 0.8s linear;
    -webkit-animation:mymove 0.8s linear;
}

@keyframes mymove{
    0% {
        top: -0px;
        opacity: 0;
    }
    50% {
        top: -20px;
        opacity: 1;
    }
    100% {
        top: -40px;
        opacity: 0;
    }
}

.video-player {
    transition: 1s ease;
    width: 100%;
}
.full-video.video-player {
    position: fixed;
    // height: 414px;
    // width: 736px;
    // left: 0;
    // right: 0;
    // bottom: 0;
    // top: 0;
    z-index: 99999;
    height: 100vw;
    width: 100vh;
    // transform: rotate(90deg);
    transform: translate(-22%, 34%) rotate(90deg);
    // object-fit: cover;
    // object-position: center center;
}
.fied-btn {
    position: fixed;
    right: 10%;
    bottom: 10%;
    z-index: 999999999999;
}
a.share {
    color: #333;
    font-size: 0.875rem;
}
.pt30 {
    padding-top: 2.75rem;
}
#works .works .pinglun-input .input input {
    font-size: .75rem;
}
.van-tabs__line {
  display: none !important;
}
.van-popup {
  border-radius: 10px;
}
.login-modle {
  width: 16.875rem;
  padding: 1.25rem;
}
.login-content {
  font-size: 1rem;
  padding: 1.875rem 0;
}
.login-btn a {
  width: 6.25rem;
  height: 1.875rem;
  border-radius: .375rem;
  box-sizing: border-box;
}
.login-btn a:first-child {
  background: #fff;
  color: #0eaf0a;
  border: 1px solid #0eaf0a; 
  margin-right: 2rem;
}
.login-btn a:last-child {
  background: #0eaf0a;
  color: #fff;
}
</style>
<style>
video::-internal-media-controls-download-button {
    display:none;
}
video::-webkit-media-controls-enclosure {
    overflow:hidden;
}
video::-webkit-media-controls-panel {
    width: calc(100% + 30px); 
}
.videoplayer {
    width: 100%;
}
</style>
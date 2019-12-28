<template>
  <keep-alive>
    <div id="home">
      <div class="home-head">
        <div class="toptab flex flex--align-items--center flex--justify-content--space-between">
          <!-- <ul class="navTab flex flex--align-items--center" id="wrapper">
          <li :class="indexTypeId == -1 ? 'active' : ''" @click="indexTypeId = -1;getBannerList(15)">热门</li>
          <li :class="indexTypeId == index ? 'active' : ''" @click="indexTypeId = index;switchTab(item.id)" v-for="(item, index) in 20" :key="index">{{item.name}}测试</li>
          </ul>-->

          <div class="lay-out">
            <!-- 需修改node_modles中的初始值 -->
            <ly-tab
              v-model="indexTypeId"
              :items="indexTypeList"
              :options="options"
              :fixBottom="false"
              @change="switchTab"
            ></ly-tab>
          </div>

          <img @click="jumpInsert" src="../../assets/icon/interest.png" alt />
        </div>

        <div class="search flex flex--justify-contnet--space-between flex--align-items--center">
          <div class="logo">
            <img class="search_logo" src="../../../static/image/search_logo.png" alt="logo" />
          </div>
          <div class="searchinput" @click="$router.push('/search/home')">
            寻找生活中的精彩
            <i class="iconfont icon-sousuo"></i>
            <i class="iconfont icon-htmal5icon13"></i>
          </div>

          <div class="rank" @click="$router.push('/rank')" v-if="indexTypeId == 0">
            <i class="iconfont icon-paihangbang"></i>
            <p>排行榜</p>
          </div>

          <div class="rank screening-rank" @click="openScreening" v-else>
            <img class="screening" src="../../../static/image/screening.png" alt />
            <p>筛选</p>
          </div>

        </div>
      </div>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <div class="home">
          <!-- swiper -->
          <div class="swiper-container" v-if="!showFiltrate || indexTypeId == 0">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in bannerList"
                :key="index"
              >
                <img 
                  @click="jumpUrl(item)"
                  :src="item.img" alt="主题图" />
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>

          <!-- 筛选过滤选择 -->
          <div class="section-filter" v-else>
            <!-- <div class="lay-out"> -->
            <!-- 需修改node_modles中的初始值 -->
            <!-- <div v-for="(item,index) in screeningCondition" :key="index"> -->
              <!-- <LyTabSecond
                v-model="classification[index].id"
                :items="item.children"
                :fixBottom="false"
                :index="index"
                @change="switchTab1"
                :options="options1"
              ></LyTabSecond> -->
              <van-tabs 
                :border="false"
                :swipe-threshold="4"
                :title-active-color="'rgb(14, 175, 10)'"
                v-for="(item,index) in screeningCondition" 
                :key="index" >
                <van-tab v-for="(item1,index1) in item.children" :key="index1">
                  <span slot="title"  @click="switchTab1(index, item, item1)">{{item1.name}}</span>
                </van-tab>
              </van-tabs>
            <!-- </div> -->
            <!-- </div> -->
          </div>

          <!-- 推荐视频 -->
          <div v-show="indexTypeId == 0" class="tj-video recommend" v-if="hotVideoList.length > 0">
            <div
              class="tj-title flex flex--justify-content--space-between flex--align-items--center"
            >
              <p>推荐视频</p>
              <div class="flex flex--justify-content--space-between">
                <span @click="getHotVideo(++Hotnum)">换一批</span>
                <span @click="$router.push('/moreVideo')">更多</span>
              </div>
            </div>
            <div class="tj-videos">
              <!-- <div
                @click="$router.push(`/works/${hotVideoList[0].id}`)"
                class="tj-big rela big-video"
              >
                <img class="main-img" :src="hotVideoList[0].image" alt />
                <div class="user-info">
                  <div class="flex flex--align-items--center">
                    <img :src="hotVideoList[0].head" alt />
                    <span class="ellipsis11">@{{hotVideoList[0].nickname}}</span>
                  </div>
                  <p class="ellipsis11">{{hotVideoList[0].content}}</p>
                </div>
                <div class="like flex flex--align-items--center">
                  <i class="iconfont icon-like"></i>
                  {{hotVideoList[0].praise}}
                </div>
              </div>-->
              <ul class="tj-vlist flex flex--justify-content--space-between flex--wrap">
                <li
                  class="rela small-video"
                  @click="goToDetail(item)"
                  v-for="(item, index) in hotVideoList.slice(0,6)"
                  :key="index"
                >
                  <img :src="item.image" alt />
                  <!-- <div class="charge">
                    <span>收费</span>
                  </div> -->


                  <div class="charge" v-if="item.is_charge == 1 && (item.is_vip == 1 || item.is_vip != 1)">
                    <img src="../../../static/image/fufei.png" alt="vip">
                  </div>
                  <div class="charge" v-if="item.is_vip == 1 && item.is_charge != 1">
                    <img src="../../../static/image/vip.png" alt="vip">
                  </div>
                  <div class="charge" v-if="item.is_vip != 1 && item.is_charge == 0">
                    <img src="../../../static/image/mianfei.png" style="display:block;height:22px !important;" alt="vip">
                  </div>


                  <div class="like flex flex--align-items--center">
                    <i class="iconfont icon-like"></i>
                    {{item.praise}}
                  </div>
                  <div class="top-show-img flex flex--align-items--center">
                    <img :src="item.head" alt />
                    <span>@{{item.nickname}}</span>
                  </div>
                  <div class="user-info">
                    <p v-if="item.title" :class="{'ellipsis11': item.title.length > 10}">{{item.title}}</p>
                    <!-- <p class="ellipsis11">{{item.content}}</p> -->
                    <p v-if="item.content" :class="{'ellipsis11': item.content.length > 10}">{{item.content}}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- 栏目推荐和栏目热门话题 -->
          <div v-show="indexTypeId == 0" class="tj-video">
            <div v-for="(item, index) in indexNavLists" :key="index">
              <div
                class="tj-title flex flex--justify-content--space-between flex--align-items--center"
                v-if="item[0].video.length > 0"
              >
                <p>{{item[0].type_name}}</p>
                <div class="flex flex--justify-content--space-between">
                  <!-- <span @click="getwushuList(++wsNum)">换一批</span> -->
                  <span style="background: #fff;"></span>
                  <!-- <span @click="indexTypeId = index;getTabVideo(indexTypeList[index - 1].id)">更多</span>switchTab -->
                  <span @click="switchTab(indexTypeList[index + 1], index + 1)">更多</span>
                </div>
              </div>

              <!-- 大视频 -->
              <div class="tj-videos all-video-lists">
                  <!-- 发布作品用户信息 -->
                <!-- <div
                  @click="$router.push(`/works/${item[0].video.video[0].id}`)"
                  class="tj-big rela big-video"
                  v-if="item[0].video.length > 0"
                >
                  <img :src="item[0].video[0].image" alt />
                  <div class="user-info">
                    <div class="flex flex--align-items--center">
                      <img :src="item[0].video[0].head" alt />
                      <span>@{{item[0].video[0].nickname}}</span>
                    </div>
                    <p>{{item[0].video[0].content}}</p>
                  </div>
                </div> -->

                <!-- 小视频 -->

                <!-- <ul
                  class="ws-list flex flex--justify-content--space-between flex--wrap"
                  v-if="item[0].video.length > 0"
                >
                  <li
                    class="rela small-video"
                    @click="$router.push(`/works/${item1.id}`)"
                    v-for="(item1, index) in item[0].video.slice(1,4)"
                    :key="index"
                  >
                    <img v-if="item1" :src="item1.image" alt />
                    <div v-if="item1" class="top-show-img flex flex--align-items--center">
                      <img :src="item1.head" alt />
                      <span>@{{item1.nickname}}</span>
                    </div>
                    <div v-if="item1" class="user-info">
                      <p class="ellipsis11">{{item1.title}}</p>
                    </div>
                  </li>
                </ul> -->

                <ul class="tj-vlist flex flex--justify-content--space-between flex--wrap">
                  <li
                    class="rela small-video"
                    @click="goToDetail(item1)"
                    v-for="(item1, index) in item[0].video.slice(0,5)"
                    :key="index"
                  >
                    <img :src="item1.image" alt />

                    <div class="charge" v-if="item1.is_charge == 1 && (item1.is_vip == 1 || item1.is_vip != 1)">
                      <img src="../../../static/image/fufei.png" alt="vip">
                    </div>
                    <div class="charge" v-if="item1.is_vip == 1 && item1.is_charge != 1">
                      <img src="../../../static/image/vip.png" alt="vip">
                    </div>
                    <div class="charge" v-if="item1.is_vip != 1 && item1.is_charge == 0">
                      <img src="../../../static/image/mianfei.png" style="display:block;height:22px !important;" alt="vip">
                    </div>


                    <div class="like flex flex--align-items--center">
                      <i class="iconfont icon-like"></i>
                      {{item1.praise}}
                    </div>
                    <div class="top-show-img flex flex--align-items--center">
                      <img :src="item1.head" alt />
                      <span>@{{item1.nickname}}</span>
                    </div>
                    <div class="user-info">
                      <!-- <p class="ellipsis11">{{item1.title}}</p> -->
                      <p :class="{'ellipsis11': item1.title.length > 10}">{{item1.title}}</p>
                      <!-- <p class="ellipsis11">{{item1.content}}</p> -->
                      <p :class="{'ellipsis11': item1.content.length > 10}">{{item1.content}}</p>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- 热门话题 -->
              <div class="topic-hot" v-if="item[0].topic.length > 0">
                <div
                  class="tj-title flex flex--justify-content--space-between flex--align-items--center"
                >
                  <p>{{item[0].type_name}}热门话题</p>
                  <span @click="$router.push('/topic')">更多</span>
                </div>
                <ul class="topiclist flex">
                  <li
                    v-for="(item1, index) in item[0].topic"
                    @click="$router.push(`/topic/details/${item1.id}`)"
                    :key="index"
                  >
                    <img :src="item1.img" alt />
                    <!-- <div class="charge" v-if="item1.is_charge == 1">
                      <span>收费</span>
                      <img src="../../../static/image/vip.png" alt="vip">
                    </div> -->
                    <!-- <div class="charge" v-if="item1.is_charge != 1">
                      <img src="../../../static/image/mianfei.png" style="display:block;height:22px !important;" alt="vip">
                    </div> -->
                    <div>
                      <span>{{item1.topic_type_name}}</span>
                      <p>{{item1.content}}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- 中医 -->
          <div v-show="indexTypeId == 0" class="tj-video">
            <!-- <div class="tj-title flex flex--justify-content--space-between flex--align-items--center">
          <p>中医</p>
          <div class="flex flex--justify-content--space-between">
            <span @click="getzhongyiList(++zyVideoNum)">换一批</span>
            <span @click="indexTypeId = 3;getTabVideo(24)">更多</span>
          </div>
            </div>-->
            <!-- 视频 发布作品用户信息 -->
            <!-- <div class="tj-videos">
          <div @click="$router.push(`/works/${zhongyiList[0].id}`)" class="tj-big rela big-video">
            <img :src="zhongyiList[0].image" alt="">
            <div class="user-info">
              <div class="flex flex--align-items--center">
                <img :src="zhongyiList[0].head" alt="">
                <span>@{{zhongyiList[0].nickname}}</span>
              </div>
              <p>{{zhongyiList[0].content}}</p>
            </div>
          </div>
          <ul class="ws-list flex flex--justify-content--space-between flex--wrap">
            <li class="rela small-video" @click="$router.push(`/works/${item.id}`)" v-for="(item, index) in zhongyiList.slice(1,4)" :key="index">
              <img :src="item.image" alt="">
              <div class="top-show-img flex flex--align-items--center">
                  <img :src="item.head" alt="">
                  <span>@{{item.nickname}}</span>
                </div>
              <div class="user-info">
                <p>{{item.title}}</p>
              </div>
            </li>
          </ul>
            </div>-->
            <!-- 武术热门话题 -->
            <!-- <div class="topic-hot">
          <div class="tj-title flex flex--justify-content--space-between flex--align-items--center">
            <p>中医热门话题</p>
            <span @click="$router.push('/topic')">更多</span>
          </div>
          <ul class="topiclist flex">
            <li class="small-video" @click="$router.push(`/topic/details/${item.id}`)" v-for="(item, index) in zhongyitopic" :key="index">
              <img :src="item.img" alt="">
              <div>
                <span>{{item.topic_type_name}}</span>
                <p>{{item.title}}</p>
              </div>
            </li>
          </ul>
            </div>-->
          </div>
        </div>
        <ul v-show="indexTypeId != 0 && tabVideo.length > 0" class="switchVideo">
          <li
            @click="goToDetail(item)"
            v-for="(item, index) in tabVideo"
            :key="index"
          >
            <div class="box">
              <img :src="item.image" alt />
              
              <div class="charge" v-if="item.is_charge == 1 && (item.is_vip == 1 || item.is_vip != 1)">
                <img src="../../../static/image/fufei.png" alt="vip">
              </div>
              <div class="charge" v-if="item.is_vip == 1 && item.is_charge != 1">
                <img src="../../../static/image/vip.png" alt="vip">
              </div>
              <div class="charge" v-if="item.is_vip != 1 && item.is_charge == 0">
                <img src="../../../static/image/mianfei.png" style="display:block;height: 22px !important;" alt="vip">
              </div>

              <div>
                <img :src="item.head" alt />
                <span>{{item.nickname}}</span>
              </div>
            </div>
            <b>{{item.title}}</b>
            <b style="color:#666;">{{item.content}}</b>
          </li>
        </ul>

        <div v-show="indexTypeId != 0 && tabVideo.length == 0" class="no-result" style="width:100%;text-align:center;">
          <h5>暂时没有更多视频</h5>
        </div>

        <!-- <TabBar></TabBar> -->
        <!-- <p>刷新次数: {{ count }}</p> -->
      </van-pull-refresh>

      <van-popup v-model="showModle">
        <div class="login-modle flex flex--row flex--align-items--center">
            <div class="login-content flex flex--justify-content--center">
                尊敬的爱叮咚用户，请您先登录
            </div>
            <div class="login-btn flex flex--justify-content--space-between">
                <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(1)">去首页</a>
                <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(2)">去登录</a>
            </div>
        </div>
      </van-popup>
      

      <chose-pay-type 
            ref="choseType" 
            @paySuccess="paySuccess"
            :orderdetail="detailInfo"
            :needPayType="7"
            :position="'bottom'"></chose-pay-type>

    </div>
  </keep-alive>
</template>

<script>
import api from "../../api";
import Swiper from "swiper";
import LyTabSecond from "../../components/ly-tab/src/index.vue";
import chosePayType from '@/components/chosePayType';
// import Swiper from 'swiper';
// import TabBar from '../../components/tabBar'
import "./home.less";
var home = document.querySelector("#home");
export default {

  components: {
    // TabBar
    LyTabSecond,
    chosePayType
  },
  created() {
    // 获取筛选条件
    // this.getFilterCondition();
    // 获取首页列表
    this.getIndexTypeLists();

    this.getIndexType();
    this.getHotVideo();
    this.getBannerList(0);

    let token = window.localStorage.getItem('token');
    if(token){
      this.getUserInfo();
    }

    // this.getwushuList();
    // this.getzhongyiList();
    // this.startRecognize();
    // let index = window.sessionStorage.getItem('index')?window.sessionStorage.getItem('index'):0;
    // let e = window.sessionStorage.getItem('id')?JSON.parse(window.sessionStorage.getItem('id')):{id:-1}
  },
  data() {
    return {
      indexNavLists: [], // 首页分类数组
      indexTypeList: [],
      indexTypeId: 0,
      bannerList: [],
      hotVideoList: [
        {
          img: ""
        }
      ],
      wushuList: [
        {
          img: ""
        }
      ],
      wushutopic: [],
      zhongyiList: [
        {
          img: ""
        }
      ],
      zhongyitopic: [],
      Hotnum: 1,
      HotTotal: "",
      zyVideoNum: 1,
      zyVideoTotal: "",
      wsNum: 1,
      wsTotal: "",
      tabVideo: {},
      isLoading: false,
      // contentText: null,
      showFiltrate: false,
      screeningCondition: [], // 筛选条件
      options: {
        activeColor: "#0EAF0A",
        labelKey: "name"
        // 可在这里指定labelKey为你数据里文字对应的字段
      },
      options1: {
        activeColor: "rgb(14, 175, 10)",
        labelKey: "name"
      },
      classification: [], // 筛选条件
      columnId: 0, // 当前栏目id
      flage: true, // 方式重复请求
      num: 300,
      filterNewArr: [],
      showModle: false,   // 是否显示登录弹窗提示
      userInfo: null,   // 个人信息
      detailInfo: null,   // 支付信息
      shares: ''
    };
  },  mounted() {
    // window.ontouchmove=()=>{
    //   this.scrollY()
    // }
    // console.log('$children$children', this.$children)
    // 获取默认
    this.getDefault();
  
    document.addEventListener("plusready", this.onplusready, false);
    // this.updateSerivces()
  },
  destroyed() {
    // window.ontouchmove=()=>{
    // }
  },

  watch: {
    mockList() {
      this.$nextTick(() => {
        this.waterfall();
      });
    }
  },
  methods: {
    onplusready() {
        this.updateSerivces()
    },
    updateSerivces(){
        let that = this;
        // console.log('plus'+plus)
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
    /**
     * 付费视频生成订单
     * @param {*} obj 要购买的订单信息
     */
    async createdVideoOrder(obj){
        let access_token = window.localStorage.getItem('token');
        const { data: ret } = await this.$http.post(this.setApi + api.buy_video, this.querystring.stringify({
          access_token,
          video_id: obj.id,
          amount: obj.charge
        }));

        if(!ret.error_code){
          this.detailInfo = ret.response_data;
          this.$refs.choseType.open();
        }else{
          this.$toast(ret.error_msg);
        }

    },

    /**
     * 付费视频支付成功
     */
    paySuccess(){
      // console.log('支付成功啦啦啦啦');
    },

    /**
     * 判断当前用户有没有买过该视频
     */
    async isBuyVideo(obj){
        const { data: ret } = await this.$http.post(
          this.setApi + api.is_buy,
          this.querystring.stringify({
              access_token: window.localStorage.getItem("token"),
              video_id: obj.id
          })
        );

        if(!ret.error_code){

          if(!ret.response_data){
            // 当前点击是收费视频 item.charge(//价格) 直接跳转支付费用
            this.$dialog.confirm({
              title: '温馨提示',
              message: '当前属于付费视频，请先购买观看'
            }).then(() => {
              // on confirm
              // this.$router.push('/my/vip');
              // 打开付费购买弹窗
              this.createdVideoOrder(obj);
              // console.log('确定')
            }).catch(() => {
              // on cancel
              // console.log('取消')
            });
          }else{
            // 购买完跳转到详情页
            this.$router.push(`/works/${obj.id}`);
          }



        }else{
          this.$toast(ret.error_msg);
        }

    },


    /**
     * 跳转详情
     */
    goToDetail(item){
      // if(item)
      // this.$router.push(`/works/${item.id}`);
      
      let token = window.localStorage.getItem('token');

      if(token){

        if(item.is_charge == 1){

          this.isBuyVideo(item);

          return;
        }


        // 想观看付费或者vip视频必须去登录
        if(item.is_vip == 1 && this.userInfo.type.indexOf('2') == -1){
          // 当前点击的是vip视频(如果是vip视频、用户不是vip)；
          this.$dialog.confirm({
            title: '温馨提示',
            message: '尊敬的用户，您还不是VIP会员，请您升级为VIP！'
          }).then(() => {
            // on confirm
            this.$router.push('/my/vip');
            // console.log('确定')
          }).catch(() => {
            // on cancel
            // console.log('取消')
          });
          
          return;
        }else{
          this.$router.push(`/works/${item.id}`);
        }
  
        
      }else{
        this.$dialog.confirm({
          title: '温馨提示',
          message: '尊敬的爱叮咚用户，请您先登录'
        }).then(() => {
          // on confirm
          this.$router.push('/login');
          // console.log('确定')
        }).catch(() => {
          // on cancel
          // console.log('取消')
        });
      }


      if(!item.is_charge){
        // 当前是免费视频

        return;
      }

    },

    /**
     * 获取个人资料
     */
    async getUserInfo() {
        const { data: ret } = await this.$http.post(
            this.setApi + api.userInfo,
            this.querystring.stringify({
                access_token: window.localStorage.getItem("token")
            })
        );


        if (!ret.error_code) {
            window.localStorage.setItem(
                "userInfo",
                JSON.stringify(ret.response_data)
            );
            this.userInfo = ret.response_data;
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
     * 跳转到修改首页导航页面
     */
    jumpInsert() {
      let token = window.localStorage.getItem("token");
      if (token) {
        this.$router.push("/interst");
      } else {
        // this.$toast("请先登录！");
        this.showModle = true;
      }
    },

    /**
     * 轮播图跳转
     * @param {*} obj
     */
    jumpUrl(obj) {
      let token = window.localStorage.getItem("token");
      // console.log('------', obj);
      // alert(123)
      if (token) {
        if (obj.type == "1") {
          // 赛事
          this.$router.push("/event/details/" + obj.url);
        } else {
          // 个人介绍视频详情页
          this.$router.push("/videoDetails?id=" + obj.url);
        }
      } else {
        // this.$toast("请先登录！");
        this.showModle = true;
      }
      
    },

    /**
     * 获取筛选条件
     * @params {*} type_id  筛选条件
     */
    async getFilterCondition(type_id) {
      // 重置选中状态
      this.showFiltrate = false;
      this.classification = [];
      this.classification = [];

      const { data: ret } = await this.$http.post(
        this.setApi + api.getFilterCondition,
        this.querystring.stringify({
          type_id
        })
      );
      // console.log('筛选条件111111',ret);
      ret.response_data.lists.length > 0 &&
        ret.response_data.lists.forEach((item, index) => {
          let tempObj1 = {
            id: 0,
            fid: 0,
            name: item.name
          };

          item.children.unshift(tempObj1);
        });
      this.screeningCondition = ret.response_data.lists;

      this.screeningCondition.forEach((item, index) => {
        let tempObj2 = {
          id: item.children[0].id,
          fid: item.children[0].fid,
          name: item.children[0].name
        };
        this.classification.push(tempObj2);
      });

      this.classification = this.classification;
      // this.log('获取分类导航========', this.screeningCondition);
    },

    /**
     * 打开筛选框
     */
    openScreening() {
      this.showFiltrate = !this.showFiltrate;
    },

    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },

    /**
     * 执行默认
     */
    getDefault() {
      let index = Number(window.sessionStorage.getItem("aidingdong_index"));
      let e = window.sessionStorage.getItem("aidingdong_id")
        ? JSON.parse(window.sessionStorage.getItem("aidingdong_id"))
        : {};
      if (index && e) {
        // console.log('this.indexTypeId', index);
        // console.log('this.id', e);

        // this.getTabVideo(id);
        // this.getBannerList(id);

        // // 获取当前分类下的过滤筛选条件
        // this.getFilterCondition(id);

        this.switchTab(e, index);
      }
    },

    switchTab(e, index) {
      // console.log("当前查看分类111111", e);
      // console.log("当前查看分类222222", index);
      if (e.id == -1) {
        return;
      }
      let id = e.id;
      this.columnId = e.id;
      if (id * 1 > 0) {
        this.indexTypeId = index;
      } else {
        this.indexTypeId = 0;

        id = this.indexTypeList[1].id;
      }

      window.sessionStorage.setItem("aidingdong_id", JSON.stringify(e));
      window.sessionStorage.setItem("aidingdong_index", index);
      // console.log('this.indexTypeListthis.indexTypeList', this.indexTypeList);
      // console.log('获取的栏目id值', Number(id));

      this.getTabVideo(id);
      this.getBannerList(id);

      // 获取当前分类下的过滤筛选条件
      this.getFilterCondition(id);
    },
    dianji(e){
      console.log(e)
    },
    /**
     * 分类筛选条件过滤
     */
    switchTab1(index, item, item1) {
    // switchTab1(index, item11, obj) {
      let arr = this.filterNewArr;
      let lock1 = true;
      let lock2 = true;

      // console.log(index);
      // console.log(item);
      // console.log(item1);

      // if(arr.indexOf(item1.id) == -1){
      //   arr.push(item1);
      // }

      arr.forEach((item11, index11) => {
        if(item11.id == item1.id){
          lock1 = false;
        }
        if(item11.fid == item1.fid){
          arr.splice(index11, 1);
          // lock2 = false;
        }
      })


      if(lock1 && lock2){
        arr.push(item1);
        let newArr = [];

        arr.forEach(item22 => {
          newArr.push(item22.id);
        })
        // let newArr = this.arrFilter(arr);

        if (newArr.length > 0) {
          this.filterTabVideo(this.columnId, newArr.join(","));
        }


      }else{

        return
      }






    return
      if (this.flage) {
        this.flage = false;
        let tempObj;
        if (obj) {
          tempObj = {
            id: Number(obj.id),
            fid: Number(obj.fid),
            name: obj.name
          };
        }
        this.classification[index2] = tempObj;
        let arr = [];

        // console.log('this.classificationthis.classification执行条件筛选', this.classification);

        // return;

        this.classification.forEach(item => {
          if (item && item.id) {
            arr.push(item.id);
          }
        });
        // 使用当前选择的过滤条件请求数据；
        let newArr = this.arrFilter(arr);

        // console.log('最终选中的结果', JSON.parse(JSON.stringify(newArr)));

        if (newArr.length > 0) {
          this.filterTabVideo(this.columnId, newArr.join(","));
        }

        setTimeout(() => {
          this.flage = true;
        }, 1);
      }
    },

    /**
     * 数组排序
     */
    arrFilter(Arr) {
      var min;
      for (var i = 0; i < Arr.length; i++) {
        for (var j = i; j < Arr.length; j++) {
          if (Arr[i] > Arr[j]) {
            min = Arr[j];
            Arr[j] = Arr[i];
            Arr[i] = min;
          }
        }
      }

      return Arr;
    },

    /**
     * 获取首页的分类导航
     */
    async getIndexType() {
      const { data: ret } = await this.$http.post(
        this.setApi + api.indexType,
        this.querystring.stringify({
          access_token: window.localStorage.getItem("token")
        })
      );
      // console.log(ret)
      let tempObj = {
        id: "0",
        img: "",
        name: "热点",
        sort: "0"
      };
      ret.response_data.lists.unshift(tempObj);
      this.indexTypeList = ret.response_data.lists;
      // this.log('导航', this.indexTypeList);

      // 获取首页的热门推荐和分类
      // this.indexTypeList.forEach((item,index) => {
      //   if(item.id > 0){
      //     this.getTabVideo(item.id, 1, index);
      //   }
      // })
    },
    // banner
    async getBannerList(type_id = 0) {
      const { data: ret } = await this.$http.post(
        this.setApi + api.bannerList,
        this.querystring.stringify({
          type: !type_id ? 1 : '',
          type_id: type_id ? type_id : ''
        })
      );
      // console.log('banner',ret)
      this.bannerList = ret.response_data.lists;
      if (this.bannerList != 0) {
        this.$nextTick(() => {
          var swiper = new Swiper(".swiper-container", {
            loop: false,
            autoplay: true,
            observer: true,
            observeParents: true,
            pagination: {
              el: ".swiper-pagination"
            }
          });
        });
      }
    },
    // 热门(推荐)视频
    async getHotVideo(num = 1) {
      // console.log(num)
      if (num > this.HotTotal) (this.Hotnum = 1), (num = this.Hotnum);

      const { data: ret } = await this.$http.post(
        this.setApi + api.recommendList,
        this.querystring.stringify({
          page: num,
          num: 6,
          access_token: window.localStorage.getItem("token")
        })
      );
      this.hotVideoList = ret.response_data.lists.video;
      // this.log('=============', this.hotVideoList);
      this.HotTotal = ret.response_data.lists.video_page_sum;
    },
    // 武术
    async getwushuList(num = 1) {
      if (num > this.wsTotal) (this.wsNum = 1), (num = this.wsNum);
      const { data: ret } = await this.$http.post(
        this.setApi + api.indexlist,
        this.querystring.stringify({
          type_id: 20,
          page: num,
          num: 2000,
          access_token: window.localStorage.getItem("token")
        })
      );
      // console.log('1',ret)
      this.wushuList = ret.response_data.lists.video;
      this.wushutopic = ret.response_data.lists.topic;
      this.b = ret.response_data.lists.video_page_sum;
    },
    // 中医
    async getzhongyiList(num = 1) {
      if (num > this.zyVideoTotal)
        (this.zyVideoNum = 1), (num = this.zyVideoNum);
      const { data: ret } = await this.$http.post(
        this.setApi + api.indexlist,
        this.querystring.stringify({
          type_id: 24,
          page: num,
          access_token: window.localStorage.getItem("token")
        })
      );
      // console.log('2',ret)
      this.zhongyiList = ret.response_data.lists.video;
      this.zhongyitopic = ret.response_data.lists.topic;
      this.zyVideoTotal = ret.response_data.lists.video_page_sum;
    },
    // 某
    async getTabVideo(type_id, type = 0, index = 0) {
      const { data: ret } = await this.$http.post(
        this.setApi + api.indexlist,
        this.querystring.stringify({
          type_id,
          num: this.num,
          access_token: window.localStorage.getItem("token")
        })
      );
      // console.log("==============获取每个分类的列表=========", ret, type_id);
      this.tabVideo = ret[0].video;
      // if(type == 1){
      //   this.log('====================', index);
      //   this.indexNavLists.push(ret.response_data.lists);
      // }

      // this.indexNavLists = this.indexNavLists;
    },

    /**
     * 获取首页列表
     */
    async getIndexTypeLists() {
      const { data: ret } = await this.$http.post(
        this.setApi + api.all_list,
        this.querystring.stringify({
          access_token: window.localStorage.getItem("token")
        })
      );
      // console.log('=========',ret, type_id)

      this.indexNavLists = ret.response_data.lists;
      // this.log('=========首页列表===========', this.indexNavLists);
    },

    /**
     * 其他视频的分类筛选
     */
    async filterTabVideo(type_id, attr_ids) {
      const { data: ret } = await this.$http.post(
        this.setApi + api.searchList,
        this.querystring.stringify({
          type_id,
          attr_ids
        })
      );
      // console.log(ret)
      this.tabVideo = ret.response_data.lists;
    }
  }
};
</script>

<style lang="less" scoped>
// @import url('./home.less');
.logo {
  margin-right: 0.4375rem;
}

.logo img {
  display: block;
}

.rela {
  position: relative;
}

.user-info {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}

#home .home .tj-video .tj-videos .user-info {
  left: 0;
  bottom: 0;
  padding-left: 0.6875rem;
  box-sizing: border-box;
}

#home .home .tj-video .tj-videos .small-video .user-info {
  padding-left: 0;
}

.big-video .user-info {
  background: rgba(0, 0, 0, 0.6);
  height: 3rem;
  display: flex;
  align-items: center;
}

#home .home .tj-video .tj-videos .small-video .user-info p,
#home .home .tj-video .tj-videos .small-video .user-info div,
.small-video .user-info {
  color: #333;
}

#home .home .tj-video .tj-videos .ws-list li {
  height: 8.5rem;
  background: transparent;
}

#home .home .tj-video .tj-videos .ws-list li img {
  background: #333;
  border-radius: 4px;
}

#home .home .tj-video .tj-videos .ws-list li > img {
  display: block;
  width: 6.75rem;
  height: 6.75rem;
}

#home .home .tj-video .tj-videos .tj-vlist li {
  height: auto;
  background: transparent;
  // flex-direction: column
}

#home .home .tj-video .tj-videos .tj-vlist li > img {
  display: block;
  width: 10.5rem;
  height: 10.5rem;
  background: #333;
}

#home .home .tj-video.recommend .tj-videos .user-info {
  position: relative;
  padding: 10px 0;
  // height: 75px;
  box-sizing: border-box;
}

#home .home .ws-list .user-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#home .home .tj-video.recommend .tj-videos .user-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

#home .home .tj-video .tj-videos .big-video .user-info {
  position: absolute;
}

.screening {
  display: block;
  width: 18px;
  height: auto;
  margin-bottom: 4px;
}

.screening-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

a:focus,
a:visited,
a:active {
  color: #333;
  text-decoration: none;
}

a {
  color: #333;
  text-decoration: none;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  background-color: transparent;
}

.m-sortList-wrap {
  width: 100%;
}

.m-sliding-list {
  width: 100%;
  overflow: hidden;
  overflow-x: auto;
  white-space: nowrap;
}

.m-sliding-list li {
  display: inline-block;
  // float: left;
}

.lay-out {
  margin-right: 14px;
  width: 90%;
}

.top-show-img {
  position: absolute;
  // bottom: 80px;
  bottom: 4rem;
  left: 0;
  right: 0;
  padding: 0.625rem 0;
  background: rgba(0, 0, 0, 0.6);
  padding-left: 0.625rem;
  font-size: 0.75rem;
  color: #fff;
}

.top-show-img img {
  width: 1.375rem;
  height: 1.375rem;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 0.25rem;
  background: #333;
  border-radius: 4px;
}

.ws-list .top-show-img {
  bottom: 1.75rem;
}

.m-sortList {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.m-sortList {
  padding: 20px 0;
}

.m-sortList li {
  margin-right: 30px;
}

.section-filter {
  background: #fff;
  margin-bottom: 0.3125rem;
}

#home {
  padding-bottom: 3rem;
}

.ellipsis11 {
  height: 1rem;
  width: auto;
  // display: -webkit-box !important;
  display: inline-block;
  // -webkit-box-orient: vertical;
  // -webkit-line-clamp: 1;
  overflow-y: hidden;
  overflow-x: visible;
  position: relative;
  padding-right: .75rem;
}
.ellipsis11::before {
  content: '...';
  position: absolute;
  right: 0;
  bottom: 0;
}
// .user-info {
//   position: relative;
// }
// .user-info::before {
//   content: '...';
//   position: absolute;
//   bottom: 0;
//   right: 0;
// }
#home .home .tj-video .all-video-lists .tj-vlist li {
  height: 14.5rem;
}
.charge {
  position: absolute;
  // top: .625rem;
  // left: .625rem;
  top: 0;
  left: 0;
  z-index: 99;
  color: red;
  font-weight: 700;
  font-size: .875rem;
}
.charge img,
#home .switchVideo li .box > div.charge img {
  display: block;
  width: 2rem;
  border-radius: 6px;
  height: auto !important;
  background: #fff;
}
#home .switchVideo li .box > div.charge {
  padding: 0 !important;
}



.switchVideo div.charge {
  // left: .625rem;
  // top: .625rem;
  left: 0;
  top: 0;
  right: auto !important;
  bottom: auto !important;
  background: transparent !important;
}
.home-video .switchVideo span, #home .switchVideo div.charge span {
  color: red !important;
}

</style>
<style>
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
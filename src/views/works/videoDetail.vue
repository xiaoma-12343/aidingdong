<template>
  <div id="works">
    <head-back :color="headColor">
      <span v-show="headTitle" class="head-title">作品详情</span>
    </head-back>
    <div class="works">
      <div class="videoplayer">
        <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions"></video-player>
      </div>

      <!-- 视频详情 -->
      <div class="infos">
        <p v-html="voteDetails.content"></p>
      </div>

    </div>

    <div class="loading" v-if="isShowLoading">
      <!-- 加载条 -->
      <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    </div>

  </div>
</template>

<script>
  import HeadBack from '../../components/headback/headback';
  import api from '../../api';
  import {
    getPraise,
    getAttention,
    voteSubmit
  } from '../../api/apiEvent';
  import like from '../../assets/icon/icon-likes-active.png';
  import liken from '../../assets/icon/icon-likes.png';


  export default {
    components: {
      HeadBack
    },
    created() {

      // console.log('====this.$route.params.id===', this.$route.query.id);
      this.getzuopinDetail(this.$route.query.id);
      // console.log('===this.VoiteId====', this.VoiteId);
    },
    mounted() {
      document.addEventListener('scroll', this.scrollEvent);
    },
    destroyed() {
      document.removeEventListener('scroll', this.scrollEvent);
    },
    data() {
      return {
        isFull: false, // 当前视频是否全屏
        show: true,
        like,
        liken,
        vwidth: 0,
        vheight: 0,
        footerTab: true,
        zuopinInfo: {},
        pinglunList: [],
        content: '',
        headColor: '#fff',
        headTitle: false,
        flag: false,
        isAttention: '',
        videoUrl: '',
        voteDetails: {},
        isShowLoading: false, // 是否显示加载动效
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
            src: '',
            // src:'http://admin.aidingdong.taijichn.com/Upload/image/2019-04-26/add.mp4'
          }],
          poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        },

      }
    },
    computed: {
      btname() {
        return this.content.length <= 0 ? '取消' : '发表'
      }
    },
    methods: {

      escape2Html(str) { //转化后台传过来的数据中含有以字符
        var arrEntities = {
          lt: "<",
          gt: ">",
          nbsp: " ",
          amp: "&",
          quot: '"'
        };
        return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
          return arrEntities[t];
        });
      },

      /**
       * 打开
       */
      openSelectRecoder() {
        this.exceptSpecies = true;
      },

      // 获取作品详情
      async getzuopinDetail(user_id) {

        const {
          data: ret
        } = await this.$http.post(this.setApi + api.personage, this.querystring.stringify({
          user_id
        }))

        // console.log('获取个人详情宣传', ret);

        if (!ret.error_code) {
          if (ret.response_data.length) {
            ret.response_data[0].content = this.escape2Html(ret.response_data[0].content)
            this.voteDetails = ret.response_data[0];
            this.playerOptions.sources[0].src = ret.response_data[0].video;
            // this.log('this.playerOptions.sources[0].src', this.playerOptions.sources[0].src);
          } else {
            // this.$router.push('/mypage/' + user_id);
          }
        } else {
          this.$toast(ret.error_msg);
        }
      },


      scrollEvent() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        // console.log(scrollTop)
        scrollTop >= 160 ? (document.querySelector('.head-back').style.backgroundColor = '#fff', this.headColor =
          '#000', this.headTitle = true) : (document.querySelector('.head-back').style.backgroundColor =
          'transparent', this.headColor = '#fff', this.headTitle = false)
      },

    },
  }
</script>

<style lang="less" scoped>
  @import url('./works.less');

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
    background: rgba(0, 0, 0, 0.4);
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
    animation: mymove 0.8s linear;
    -webkit-animation: mymove 0.8s linear;
  }

  @keyframes mymove {
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

  #works .works .infos {
    padding: 0;
    padding: 1.25rem;
  }
</style>
<style>
  .infos {}

  .infos p img {
    display: block;
    width: 100%;
  }
</style>

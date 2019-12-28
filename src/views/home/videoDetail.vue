<template>
  <div class="videoDetail">
      <div class="backToLast oneLineStart" @click="toLastPage">
          <img src="../../assets/icon/back_white.png" alt>
        </div>
      <div class="MainVideo">
        <video-player class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player>
    </div>
    <!-- <video class="MainVideo" :src="videoUrl"></video> -->
    <div class="userMsg columnBetweenStart">
      <div class="line oneLineStart">
        <div class="avator">
          <img class="coverImg" src="../../assets/avator.jpg" alt>
        </div>
        <div class="name">@西米悠悠</div>
        <div class="state">已关注</div>
      </div>
      <div class="line">今天很开心，考级过来，也见到了大师今天很开心，考级过来，也见到了大师···</div>
    </div>
    <div class="content">
      <div class="title">评论互动</div>
      <!-- 单个评论 start -->
      <div class="message">
        <div class="line oneLineStart">
          <div class="avator">
            <img class="coverImg" src="../../assets/avator.jpg" alt>
          </div>
          <div class="user">
            <div class="name">RainBow</div>
            <div class="time">刚刚</div>
          </div>
        </div>
        <div class="textarea">Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。</div>
      </div>
      <!-- 单个评论 end -->
      <div class="message">
        <div class="line oneLineStart">
          <div class="avator">
            <img class="coverImg" src="../../assets/avator.jpg" alt>
          </div>
          <div class="user">
            <div class="name">Rodrigo</div>
            <div class="time">19:20</div>
          </div>
        </div>
        <div class="textarea">Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Head } from "../../components";
import $ from "../../utils/index";
export default {
  components: {
    Head
  },
  mounted(){
    },
  data() {
    return {
      videoUrl: $.filterUrl(localStorage.getItem("videoDetailPage_PlayUrl")),
      ImgUrl: $.filterUrl(localStorage.getItem("videoDetailPage_ImgUrl")),
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
              src: $.filterUrl(localStorage.getItem("videoDetailPage_PlayUrl")) //你的m3u8地址（必填）
              // src:'rtmp://46463.livepush.myqcloud.com/live/tianyu?txSecret=c4fd1c165df5bf307790d7005cd1ffc8&txTime=5CBDE4FF'
          }],
          poster: "poster.jpg", //你的封面地址
          width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
      }
    };
  },
  created() {
    // console.log(this.$route.params.videoUrl);
    console.log(this.videoUrl,this.ImgUrl,this.playerOptions.sources.src)
  },
  methods:{
    toLastPage: function() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.videoDetail {
  .backToLast {
    position: absolute;
    height: 2.75rem;
    z-index: 10000;
    box-sizing: border-box;
    padding-left: .5625rem;
  }
  .MainVideo {
    width: 100%;
    height: 13.125rem;
  }
  .vjs-fluid  {
    padding-top: 0 !important;
  }
  .userMsg {
    width: 100%;
    // height: 7.9375rem;
    box-sizing: border-box;
    padding: 1.125rem 0.875rem 0.8125rem;
    // padding-top: 11rem;
    border-bottom: 1px solid rgba(238, 238, 238, 1);
    & .line:first-child {
      .avator {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 50%;
        overflow: hidden;
      }
      .name {
        margin-left: 0.625rem;
        height: 1.25rem;
        font-size: 0.875rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(49, 47, 50, 1);
      }
      .state {
        margin-left: 1.25rem;
        width: 3.6875rem;
        height: 1.375rem;
        background: rgba(230, 253, 230, 1);
        border-radius: 0.75rem;
        font-size: 0.8125rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        text-align: center;
        color: rgba(14, 175, 10, 1);
        line-height: 1.375rem;
      }
    }
    & .line:last-child {
      height: 3.125rem;
      font-size: 1rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(49, 47, 50, 1);
      line-height: 1.625rem;
    }
  }
  .content {
    width: 100%;
    padding: 0.875rem;
    box-sizing: border-box;
    .title {
      height: 1.5625rem;
      font-size: 1.125rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(49, 47, 50, 1);
      line-height: 1.5625rem;
    }
    .message {
      padding-top: 0.9375rem;
      padding-bottom: 0.8125rem;
      border-bottom: 1px solid rgba(238, 238, 238, 1);
      .line {
        .avator {
          width: 2.25rem;
          height: 2.25rem;
          border-radius: 50%;
          overflow: hidden;
        }
        .user {
          margin-left: 0.625rem;
          .name {
            height: 1.25rem;
            font-size: 0.875rem;
            font-family: PingFangSC-Medium;
            font-weight: 500;
            color: rgba(49, 47, 50, 1);
            line-height: 1.25rem;
          }
          .time {
            height: 1.125rem;
            font-size: 0.625rem;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(155, 155, 155, 1);
            line-height: 0.875rem;
          }
        }
      }
      .textarea {
        margin-top: 0.25rem;
        font-size: 0.875rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(49, 47, 50, 1);
        line-height: 1.25rem;
      }
    }
  }
}
</style>


<template>
  <div class="myMesage">
    <Head title="消息" canBack="true" themeDark="true"></Head>
    <div class="tabsGroup oneLineBetween">
      <router-link to="/message/fans">
        <div class="tab columnBetween">
          <img src="../../assets/icon/fans.png" alt>
          <span>粉丝</span>
        </div>
      </router-link>
      <router-link to="/message/zan">
        <div class="tab columnBetween">
          <img src="../../assets/icon/star.png" alt>
          <span>点赞</span>
        </div>
      </router-link>
      <router-link to="/message/comment">
        <div class="tab columnBetween">
          <img src="../../assets/icon/message.png" alt>
          <span>评论</span>
        </div>
      </router-link>
      <router-link to="/message/concat">
        <div class="tab columnBetween">
          <img src="../../assets/icon/concatPeople.png" alt>
          <span>联系人</span>
        </div>
      </router-link>
    </div>
    <div class="gap gap_height"></div>
    <!-- 赛事，考试 -->
    <div class="toastBox">
      <div class="line oneLineBetween">
        <img src="../../assets/icon/game.png" alt>
        <div class="text">您报名的XXX审核通过，请上传比赛作品</div>
        <img src="../../assets/icon/more.png" alt>
      </div>
      <div class="line oneLineBetween">
        <img src="../../assets/icon/game.png" alt>
        <div class="text">您报名的XXX审核通过，请上传比赛作品</div>
        <img src="../../assets/icon/more.png" alt>
      </div>
    </div>
    <div class="gap gap_height"></div>
    <div class="contentBox">
      <!-- message item -->
      <div class="item oneLineBetween">
        <div class="avatorBox">
          <img src="../../assets/avator.jpg" alt>
        </div>
        <div class="content columnBetweenStart">
          <div class="name">A猫三</div>
          <div class="instro">欢迎来到爱叮咚</div>
        </div>
        <div class="time">2019-2-19</div>
      </div>
      <div class="item oneLineBetween">
        <div class="avatorBox">
          <img src="../../assets/avator.jpg" alt>
        </div>
        <div class="content columnBetweenStart">
          <div class="name">A猫三</div>
          <div class="instro">欢迎来到爱叮咚</div>
        </div>
        <div class="time">2019-2-19</div>
      </div>
      <div class="item oneLineBetween">
        <div class="avatorBox">
          <img src="../../assets/avator.jpg" alt>
        </div>
        <div class="content columnBetweenStart">
          <div class="name">A猫三</div>
          <div class="instro">欢迎来到爱叮咚</div>
        </div>
        <div class="time">2019-2-19</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Head } from "../../components";
export default {
  name: "myMesage",
  components: {
    Head
  }
};
</script>
<style lang="scss" scoped>
.myMesage {
  width: 100%;
  .commonHeader {
    width: 100%;
    background: #3d3c41;
    height: 2.75rem;
    line-height: 2.75rem;
    text-align: center;
    font-size: 1.125rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}

.tabsGroup {
  height: 5.625rem;
  padding: 1.0625rem 2.5625rem 1rem;
  box-sizing: border-box;
  a {
    display: inline-block;
    height: 100%;
  }
  .tab {
    height: 100%;
    img {
      width: 2.1875rem;
      height: 2.1875rem;
    }
    span {
      font-size: 0.8125rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
    }
  }
}

.gap_height {
  height: 0.625rem;
}
.toastBox {
  width: 100%;
  height: 6.25rem;
  padding: 0 1.125rem 0 0.8125rem;
  box-sizing: border-box;
  .line {
    position: relative;
    height: 3.125rem;
    img:first-child {
      height: 1.0625rem;
    }
    img:last-child {
      height: 0.6875rem;
    }
    &:first-child {
      border-bottom: 1px solid #f5f5f5;
    }
    .text {
      position: absolute;
      left: 3.6875rem;
      font-size: 0.8125rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
}
.contentBox {
  .item {
    position: relative;
    height: 4.25rem;
    padding: 0 0.875rem;
    border-bottom: 1px solid #f5f5f5;
    .avatorBox {
      width: 2.8125rem;
      height: 2.8125rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .content {
      position: absolute;
      left: 4.3125rem;
      .name {
        font-size: 0.875rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        height: 0.9375rem;
        color: rgba(0, 0, 0, 1);
      }
      .instro {
        padding-top: 0.5625rem;
        height: 0.9375rem;
        font-size: 0.75rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
    }
    .time {
      position: absolute;
      top: 1.25rem;
      right: 0.875rem;
      height: 0.5625rem;
      font-size: 0.6875rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
    }
  }
}
</style>


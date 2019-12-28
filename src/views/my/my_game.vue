<template>
  <div class="my_game">
    <Head title="我的赛事" canBack="true"></Head>
    <div class="content">
      <div class="tabs oneLineBetween">
        <div class="tab active">全部</div>
        <div class="tab">审核中</div>
        <div class="tab">待参加</div>
        <div class="tab">评审中</div>
        <div class="tab">已公布</div>
      </div>
      <div class="contentCards">
        <!-- 单个列表 -->
        <div class="card">
          <div class="title oneLineBetween">
            <div class="number">报名编号：20160</div>
            <div class="stateText">审核中</div>
          </div>
          <div class="gameIntroduce oneLineBetween">
            <div class="mainBody columnBetweenStart">
              <div class="name">陈氏太极比赛-赛事名称</div>
              <div class="time">报名截止时间：1月18日-1月28日</div>
            </div>
            <div class="imgBox">
              <img class="coverImg" src="./../../assets/icon/loadMore.png" alt>
            </div>
          </div>
        </div>
        <!-- 单个列表结束 -->
        <div class="card">
          <div class="title oneLineBetween">
            <div class="number">报名编号：20160</div>
            <div class="stateText">审核中</div>
          </div>
          <div class="gameIntroduce oneLineBetween">
            <div class="mainBody columnBetweenStart">
              <div class="name">陈氏太极比赛-赛事名称</div>
              <div class="time">报名截止时间：1月18日-1月28日</div>
            </div>
            <div class="imgBox">
              <img class="coverImg" src="./../../assets/icon/loadMore.png" alt>
            </div>
          </div>
          <div class="actionBox oneLineEnd">
            <div class="action">上传作品</div>
          </div>
        </div>
        <div class="card">
          <div class="title oneLineBetween">
            <div class="number">报名编号：20160</div>
            <div class="stateText">审核中</div>
          </div>
          <div class="gameIntroduce oneLineBetween">
            <div class="mainBody columnBetweenStart">
              <div class="name">陈氏太极比赛-赛事名称</div>
              <div class="time">报名截止时间：1月18日-1月28日</div>
            </div>
            <div class="imgBox">
              <img class="coverImg" src="./../../assets/icon/loadMore.png" alt>
            </div>
          </div>
          <div class="actionBox oneLineEnd">
            <div class="action">邀请投票</div>
          </div>
        </div>
        <div class="card">
          <div class="title oneLineBetween">
            <div class="number">报名编号：20160</div>
            <div class="stateText">审核中</div>
          </div>
          <div class="gameIntroduce oneLineBetween">
            <div class="mainBody columnBetweenStart">
              <div class="name">陈氏太极比赛-赛事名称</div>
              <div class="time">报名截止时间：1月18日-1月28日</div>
            </div>
            <div class="imgBox">
              <img class="coverImg" src="./../../assets/icon/loadMore.png" alt>
            </div>
          </div>
          <div class="actionBox oneLineEnd">
            <div class="action">邀请投票</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Head } from "../../components";
export default {
  components: {
    Head
  }
};
</script>

<style lang="scss" scoped>
.my_game {
  width: 100%;
  .h5 {
    height: 5px;
  }
  .content {
    height: 100%;
    .tabs {
      position: fixed;
      width: 100%;
      top: 2.75rem;
      height: 3.125rem;
      box-sizing: border-box;
      padding: 0 1.1875rem 0;
      background: #fff;
      .tab {
        position: relative;
        height: 100%;
        font-size: 0.9375rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(49, 47, 50, 1);
        line-height: 3.125rem;
        &.active {
          &::after {
            position: absolute;
            left: -0.375rem;
            bottom: 0;
            content: "";
            width: 2.5rem;
            height: 0.1875rem;
            background: rgba(14, 175, 10, 1);
            border-radius: 0.125rem;
          }
        }
      }
    }
    .contentCards {
      width: 100%;
      box-sizing: border-box;
      padding: 0.5625rem 0.875rem;
      background: rgba(245, 245, 245, 1);
      margin-top: 3.0625rem;
      .card {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.625rem;
        margin-bottom: 0.625rem;
        .title {
          box-sizing: border-box;
          height: 2.875rem;
          padding: 0 0.9375rem 0 0.6875rem;
          .number {
            height: 0.6875rem;
            font-size: 0.6875rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(153, 153, 153, 1);
          }
          .stateText {
            height: 0.75rem;
            font-size: 0.75rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(14, 175, 10, 1);
          }
        }
        .gameIntroduce {
          padding: 1.3125rem 0.625rem 1.3125rem 0.75rem;
          .mainBody {
            height: 2.9375rem;
            .name {
              height: 1rem;
              font-size: 1rem;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(0, 0, 0, 1);
            }
            .time {
              height: 0.8125rem;
              font-size: 0.8125rem;
              font-family: PingFang-SC-Medium;
              font-weight: 500;
              color: rgba(102, 102, 102, 1);
            }
          }
        }
        .imgBox {
          width: 0.5625rem;
          height: 1.0625rem;
        }
        .actionBox {
          height: 3.4375rem;
          padding-right: 0.75rem;
          border-top: 1px solid #f5f5f5;
          .action {
            width: 4.375rem;
            height: 1.875rem;
            background: rgba(14, 175, 10, 1);
            border-radius: 0.9375rem;
            font-size: 0.75rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            line-height: 1.875rem;
            text-align: center;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
  }
}
</style>


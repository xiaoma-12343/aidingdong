<template>
  <div class="commonentsBox">
    <Head title="评论" canBack="true" themeDark="true"></Head>
    <div class="contentBox">
      <!-- fans item -->
      <div class="item columnBetweenStart">
        <div class="firstLine oneLineBetween">
          <div class="avatorBox">
            <img src="../../assets/avator.jpg" alt>
          </div>
          <div class="content columnBetweenStart">
            <div class="name">A猫三</div>
            <div class="instro">2019-2-19</div>
          </div>
          <div class="flow green">关注</div>
        </div>
        <div class="twoLine">红红火火恍恍惚惚，噼噼啪啪乒乒乓乓</div>
      </div>
      <div class="item columnBetweenStart">
        <div class="firstLine oneLineBetween">
          <div class="avatorBox">
            <img src="../../assets/avator.jpg" alt>
          </div>
          <div class="content columnBetweenStart">
            <div class="name">A猫三</div>
            <div class="instro">2019-2-19</div>
          </div>
          <div class="flow green">关注</div>
        </div>
        <div class="twoLine">红红火火恍恍惚惚，噼噼啪啪乒乒乓乓</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Head } from "../../components";
export default {
  name: "myMessage_comment",
  components: {
    Head
  }
};
</script>

<style lang="scss" scoped>
.commonentsBox {
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
    .backToLast {
      position: absolute;
      top: 0;
      height: 2.75rem;
      width: 4.375rem;
      box-sizing: border-box;
      padding-left: 0.875rem;
    }
  }
  .contentBox {
    .item {
      position: relative;
      height: 6rem;
      padding: 0.8125rem 0.875rem;
      border-bottom: 1px solid #f5f5f5;
      box-sizing: border-box;
      .firstLine {
        width: 100%;
      }
      .twoLine {
        height: 1.0625rem;
        font-size: 1rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      .avatorBox {
        height: 2.25rem;
        width: 2.25rem;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .content {
        position: absolute;
        left: 4.3125rem;
        padding: 0.375rem 0 0.3125rem;
        box-sizing: border-box;
        .name {
          font-size: 0.875rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          height: 0.9375rem;
          color: rgba(0, 0, 0, 1);
        }
        .instro {
          padding-top: 0.25rem;
          height: 0.9375rem;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
        }
      }
      .flow {
        width: 4.375rem;
        height: 1.875rem;
        line-height: 1.875rem;
        text-align: center;
        &.green {
          background: rgba(14, 175, 10, 1);
          border-radius: 0.9375rem;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        &.white {
          background: rgba(248, 248, 250, 1);
          border-radius: 0.9375rem;
          font-size: 0.75rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(14, 175, 10, 1);
        }
      }
    }
  }
}
</style>


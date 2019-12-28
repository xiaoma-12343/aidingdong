<template>
  <div class="concatPeople">
    <Head title="选择联系人" canBack="true" ></Head>
    <div class="serchPeopleName">
      <input type="text" placeholder="寻找生活中的精彩">
    </div>
    <div class="contentBox">
      <!-- concat item -->
      <div class="item columnBetweenStart">
        <div class="firstLine oneLineBetween">
          <div class="avatorBox">
            <img src="../../assets/avator.jpg" alt>
          </div>
          <div class="content columnBetweenStart">
            <div class="name">A猫三</div>
            <div class="instro">欢迎来到爱叮咚</div>
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
.concatPeople {
  .serchPeopleName {
    margin-top: 0.625rem;
    margin-left: 0.875rem;
    width: 20rem;
    height: 1.875rem;
    input {
      box-sizing: border-box;
      padding-left: 2.8125rem;
      border: 0;
      outline: none;
      width: 100%;
      height: 100%;
      background: rgba(241, 241, 242, 1);
      border-radius: 0.9375rem;
      font-size: 0.8125rem;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(142, 142, 147, 1);
    }
  }
  .contentBox {
    .item {
      position: relative;
      height: 4.3125rem;
      padding: 0.75rem 0.875rem;
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
          padding-top: 0.5625rem;
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


<template>
  <div class="my_edit">
    <Head title="编辑资料" canBack="true"></Head>
    <div class="content">
      <div class="gap h5"></div>
      <!-- 第一组 -->
      <div class="group">
        <div class="row oneLineBetween">
          <div class="name">头像</div>
          <div class="value">RainBow</div>
        </div>
        <div class="row oneLineBetween">
          <div class="name">昵称</div>
          <div class="value">RainBow</div>
        </div>
        <div class="row oneLineBetween">
          <div class="name">性别</div>
          <div class="value">男</div>
        </div>
      </div>
      <!-- 第二组 -->
      <div class="gap h5"></div>
      <div class="group">
        <div class="row oneLineBetween">
          <div class="name">身高</div>
          <div class="value">180cm</div>
        </div>
        <div class="row oneLineBetween">
          <div class="name">生日</div>
          <div class="value">1994-08-13</div>
        </div>
        <div class="row oneLineBetween">
          <div class="name">城市</div>
          <div class="value">北京市北京市</div>
        </div>
        <div class="row oneLineBetween">
          <div class="name">行业</div>
          <div class="value">互联网-软件</div>
        </div>
      </div>
      <!-- 第三组 -->
      <div class="gap h5"></div>
      <div class="group">
        <div class="row oneLineBetween">
          <div class="name">学历</div>
          <div class="value">本科</div>
        </div>
        <div class="row oneLineBetween">
          <div class="name">签名</div>
          <div class="value">愿你的江湖有梦为马</div>
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
.my_edit {
  width: 100%;
  .h5 {
    height: 5px;
  }
  .content {
    .group {
      box-sizing: border-box;
      padding: 0 0 0 0.875rem;
      .row {
        position: relative;
        height: 3.25rem;
        box-sizing: border-box;
        padding-right: 2.1875rem;
        .name {
          height: 1rem;
          font-size: 1.0625rem;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        &::before {
          position: absolute;
          bottom: 0;
          display: inline-block;
          width: 100%;
          height: 1px;
          content: "";
          background: #eeeeee;
        }
        &::after {
          position: absolute;
          right: 0.875rem;
          display: inline-block;
          content: ">";
        }
      }
    }
  }
}
</style>


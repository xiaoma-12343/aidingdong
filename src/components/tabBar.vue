<template>
  <div class="tabBar oneLineBetween">
    <!-- <router-link to="/" class="tab"> -->
    <div class="columnBetween tab" @click="$router.push('/')">
      <img src="../assets/icon/tabBar/tab1_active.png" alt>
      <span>首页</span>
    </div>
    <!-- </router-link> -->
    <!-- <router-link to="/attention" class="tab"> -->
    <div class="columnBetween tab" @click="$router.push('/attention')">
      <img src="../assets/icon/tabBar/tab2.png" alt>
      <span>关注</span>
    </div>
    <!-- </router-link> -->
    <div class="addActionBox tab" @click="noShow">
      <img src="../assets/icon/tabBar/add.png" alt>
    </div>
    <!-- <router-link to="/message" class="tab"> -->
    <div class="columnBetween tab" @click="$router.push('/message')">
      <img src="../assets/icon/tabBar/tab3.png" alt>
      <span>消息</span>
    </div>
    <!-- </router-link> -->
    <!-- <router-link to="/my" class="tab"> -->
    <div class="columnBetween tab" @click="$router.push('/my')">
      <img src="../assets/icon/tabBar/tab4.png" alt>
      <span>我的</span>
    </div>
    <!-- </router-link> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      showNoData: false,
      pop: {
        width: "17.8125rem",
        height: "7.5rem",
        background: "rgba(255, 255, 255, 1)",
        "border-radius": "0.375rem"
      }
    };
  },
  methods: {
    noShow: function() {
      this.$toast("本功能暂未开放");
      this.showNoData = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.pop {
  width: 17.8125rem;
  height: 7.5rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.375rem;
}
.tabBar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3.0625rem;
  box-sizing: border-box;
  padding: 0 1.375rem 0 1.375rem;
  //   FIXME: background:rgba(250,250,250,0.9);
  background: rgba(250, 250, 250, 1);
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.25);
  z-index: 999;
  .addActionBox {
    width: 2.875rem;
    height: 2.875rem;
    margin-top: -0.75rem;
  }
  .tab {
    height: 100%;
    box-sizing: border-box;
    padding: 0.1875rem 0;
    span {
      height: 0.875rem;
      font-size: 0.625rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(74, 74, 74, 1);
      line-height: 0.875rem;
    }
  }
}
</style>


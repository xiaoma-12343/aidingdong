<template>
  <div class="myHeader_compenent">
    <div
      :class="{ commonHeader: defaultState, 'canBack': canBack,'themeDark':themeDark,'border':border }"
    >
      {{title}}
      <div v-if="themeDark">
        <div v-if="canBack" class="backToLast oneLineStart" @click="toLastPage">
          <img src="../assets/icon/back_white.png" alt>
        </div>
      </div>
      <div v-else-if="!themeDark">
        <div v-if="canBack" class="backToLast oneLineStart" @click="toLastPage">
          <img src="../assets/icon/back.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "head",
  props: {
    title: String,
    canBack: Boolean,
    themeDark: String
  },
  data() {
    return {
      defaultState: true,
      Dark: false,
      border: false
    };
  },
  methods: {
    toLastPage: function() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.myHeader_compenent {
  width: 100%;
  // TODO: 控制距离顶部的高度
  padding-bottom: 2.75rem;
  .commonHeader {
    position: fixed;
    width: 100%;
    height: 2.75rem;
    background: #fff;
    line-height: 2.75rem;
    text-align: center;
    font-size: 1.125rem;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: #333 !important;
    box-sizing: border-box;
    z-index: 1000;
    &.border {
      border-bottom: 1px solid rgba(241, 241, 242, 1);
    }
    &.themeDark {
      background: #3d3c41 !important;
      color: rgba(255, 255, 255, 1) !important;
      border-bottom: none !important;
    }
    .backToLast {
      position: absolute;
      top: 0;
      height: 2.75rem;
      width: 4.375rem;
      box-sizing: border-box;
      padding-left: 0.875rem;
    }
  }
}
</style>



<template>
  <div class="my_score">
    <Head title="详情" canBack="true"></Head>
    <div class="content">
      <div class="tabs oneLineBetween">
        <div class="tab active">作品</div>
        <div class="tab">预定</div>
        <div class="tab">话题</div>
        <div class="tab">用户</div>
      </div>
      <div class="smallGroup oneLineBetween f-wrap">
        <!-- item 单个 start -->
        <div class="item">
          <div class="rightRightCorner oneLineBetween">
            <div>❤</div>
            <div class="num">1.4w</div>
          </div>
          <div class="leftBottomCorner columnBetweenStart">
            <div class="nameBox oneLineStart">
              <div class="avatorBox">
                <img class="coverImg" src="../../assets/avator.jpg" alt>
              </div>
              <div class="name">RainBow</div>
            </div>
          </div>
          <div class="introduce">跟我学中医</div>
        </div>
        <!-- item 单个 end -->
        <div class="item">
          <div class="rightRightCorner oneLineBetween">
            <div>❤</div>
            <div class="num">1.4w</div>
          </div>
          <div class="leftBottomCorner columnBetweenStart">
            <div class="nameBox oneLineStart">
              <div class="avatorBox">
                <img class="coverImg" src="../../assets/avator.jpg" alt>
              </div>
              <div class="name">RainBow</div>
            </div>
          </div>
          <div class="introduce">跟我学中医</div>
        </div>
        <div class="item">
          <div class="rightRightCorner oneLineBetween">
            <div>❤</div>
            <div class="num">1.4w</div>
          </div>
          <div class="leftBottomCorner columnBetweenStart">
            <div class="nameBox oneLineStart">
              <div class="avatorBox">
                <img class="coverImg" src="../../assets/avator.jpg" alt>
              </div>
              <div class="name">RainBow</div>
            </div>
          </div>
          <div class="introduce">跟我学中医</div>
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
  },
  methods: {
    getVideoList(id) {
      this.$http
        .post(this.setApi + API.indexTypeDetail, { type: 5 })
        .then(res => {
          this.RecommendList = res.data.response_data.lists;
        });
    }
  },
  mounted() {
    let id = this.$route.params.id;
    this.getVideoList();
  }
};
</script>

<style lang="scss" scoped>
.my_score {
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
      padding: 0 3.375rem 0;
      background: #fff;
      border-bottom: 1px solid #eeeeee;
      .tab {
        position: relative;
        height: 100%;
        font-size: 0.9375rem;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: #9f9f9f;
        line-height: 3.125rem;
        &.active {
          color: #312f32;
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
    .smallGroup {
      box-sizing: border-box;
      padding: 0.75rem 0.875rem;
      margin-top: 3.125rem;
      .item {
        position: relative;
        width: 10.5rem;
        height: 10.5rem;
        border-radius: 0.375rem;
        background: pink;
        margin-bottom: 0.6875rem;
        box-sizing: border-box;
        overflow: hidden;
        .introduce {
          position: absolute;
          bottom: 0.625rem !important;
          left: 0.6875rem;
          height: 1.25rem;
          font-size: 0.875rem;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 1.25rem;
        }
        .coverBox {
          width: 10.5rem;
          height: 10.5rem;
        }
        .rightRightCorner {
          position: absolute;
          right: 0;
          top: 0;
          width: 3.1875rem;
          box-sizing: border-box;
          padding: 0 0.25rem;
          height: 1.25rem;
          background: rgba(0, 0, 0, 1);
          border-radius: 0px 6px 0px 0px;
          opacity: 0.3;
          font-size: 0.75rem;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
        }
        .leftBottomCorner {
          position: absolute;
          left: 0.625rem;
          bottom: 0.625rem;
          height: 3.0625rem;
          width: 9.0625rem;

          .nameBox {
            height: 1.375rem;
            .avatorBox {
              width: 1.375rem;
              height: 1.375rem;
              border-radius: 50%;
              img {
                border-radius: 50%;
              }
            }
            .name {
              margin-left: 0.25rem;
              height: 1.375rem;
              font-size: 0.75rem;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 1.375rem;
            }
          }
        }
      }
    }
  }
}
</style>


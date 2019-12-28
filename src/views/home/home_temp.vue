<template>
  <div class="home">
    <TabBar></TabBar>
    <div class="header">
      <div class="tabs oneLineBetween">
        <!-- <div class="tab active">热门</div> -->
        <div
          v-for="(type, index) in IndexTypes"
          :class=" {'tab':true, 'active': index ==tabIndex}"
          :tabIndex="tabIndex"
          @click="selectTabIndex(index,type.id)"
          :key="type.id"
        >{{type.name}}</div>
      </div>
      <div class="searchBar">
        <input placeholder="寻找生活中的精彩" type="text">
      </div>
    </div>
    <div class="swiperWrap center">
      <van-swipe :autoplay="3000" indicator-color="white">
        <template v-if="bannerList.length > 0">
          <div v-for="banner in bannerList" :key="banner.id">
            <van-swipe-item class="mainPic">
              <img class="coverImg" :src="banner.img" alt>
            </van-swipe-item>
          </div>
        </template>
      </van-swipe>
      <!-- <div class="mainPic"></div> -->
    </div>
    <!-- 推荐视频 start -->
    <div class="tuijian">
      <div class="titleBox oneLineBetween">
        <div class="title">推荐视频</div>
        <div class="actionBox oneLineEnd">
          <div class="changeNext">换一批</div>
          <div class="loadMore">更多</div>
        </div>
      </div>
      <div class="content">
        <!-- 大图 -->
        <!-- TODO:视频详情页 -->
        <div
          class="bigImgText"
          v-if="RecommendList && RecommendList.video"
          @click="toVideoDetailPage"
        >
          <!-- 大图片 -->
          <img class="child" :src="mainImg" alt>
          <div class="rightRightCorner oneLineBetween">
            <div>❤</div>
            <div class="num">{{RecommendList.video[0].praise}}</div>
          </div>
          <div class="leftBottomCorner columnBetweenStart">
            <div class="nameBox oneLineStart">
              <div class="avatorBox">
                <img class="coverImg" src="../../assets/avator.jpg" alt>
              </div>
              <div class="name">{{RecommendList.video[0].nickname}}</div>
            </div>
            <div class="introduce">{{RecommendList.video[0].content}}</div>
          </div>
        </div>
        <!-- 大图 end -->
        <!-- 小图分组 -->
        <div class="smallGroup oneLineBetween f-wrap" v-if="RecommendList && RecommendList.topic">
          <!-- item 单个 start -->
          <div class="item" v-for="(item,key) in RecommendList.topic.slice(0,4)" :key="key">
            <div class="coverBox">
              <img class="coverImg" :src="filterImg(item.img)" alt>
            </div>
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
              <div class="introduce">{{item.topic_type_name}}</div>
            </div>
          </div>
          <!-- item 单个 end -->
        </div>
      </div>
    </div>
    <!-- 推荐视频 end -->
    <!-- 武术 start -->
    <div class="wushu">
      <div class="titleBox oneLineBetween">
        <div class="title">武术</div>
        <div class="actionBox oneLineEnd">
          <div class="changeNext">换一批</div>
          <div class="loadMore">更多</div>
        </div>
      </div>
      <div class="content">
        <!-- 大图 -->
        <div class="bigImgText">
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
            <div class="introduce">跟我学中医：治疗腰疼，一按就见效</div>
          </div>
        </div>
        <!-- 大图 end -->
        <!-- 小图分组 -->
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
    <!-- 武术end -->
    <!-- 中医 start -->
    <div class="zhongyi">
      <div class="titleBox oneLineBetween">
        <div class="title">中医</div>
        <div class="actionBox oneLineEnd">
          <div class="changeNext">换一批</div>
          <div class="loadMore">更多</div>
        </div>
      </div>
      <div class="content">
        <!-- 大图 -->
        <div class="bigImgText">
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
            <div class="introduce">跟我学中医：治疗腰疼，一按就见效</div>
          </div>
        </div>
        <!-- 大图 end -->
        <!-- 小图分组 -->
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
    <!-- 中医end -->
  </div>
</template>
<script>
import { TabBar } from "../../components";
import API from "../../api/index";
import $ from "../../utils/index";
export default {
  components: {
    TabBar
  },
  data() {
    return {
      bannerList: [],
      RecommendList: [], // 推荐视频
      IndexTypes: [],
      tabIndex: 0
    };
  },
  computed: {
    mainImg() {
      return $.filterUrl(this.RecommendList.video[0].image);
    }
  },
  methods: {
    // 首页轮播
    getSwiperList() {
      this.$http.post(this.setApi + API.bannerList).then(res => {
        this.bannerList = res.data.response_data.lists;
      });
    },
    // 推荐视频
    getRecommend() {
      this.$http
        .post(this.setApi + API.recommendList, { type: 5 })
        .then(res => {
          this.RecommendList = res.data.response_data.lists;
        });
    },
    filterImg(img) {
      return $.filterUrl(img);
    },
    toVideoDetailPage() {
      localStorage.setItem(
        "videoDetailPage_PlayUrl",
        this.RecommendList.video[0].video
      );
      this.$router.push("/videoDetail");
    },
    getIndexTypes() {
      this.$http.post(this.setApi + API.indexType, { type: "1" }).then(res => {
        this.IndexTypes = res.data.response_data.lists;
      });
    },
    selectTabIndex(index, id) {
      this.tabIndex = index;
      this.$router.push(`/typeDetail/${id}`);
      console.log("detail", id);
    }
  },
  mounted() {
    this.getSwiperList();
    this.getRecommend();
    this.getIndexTypes();
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  background: #f2f2f2;
  padding-bottom: 3.125rem;
  .header {
    height: 6rem;
    position: fixed;
    z-index: 100;
  }
  .tabs {
    top: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0 3.125rem 0 1.125rem;
    background: #303032;
    height: 2.75rem;

    .tab {
      position: relative;
      line-height: 2.75rem;
      font-size: 0.9375rem;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      line-height: 2.75rem;
      outline: none;
      &.active {
        color: #0bbe06;
        font-weight: 600;
        &::after {
          position: absolute;
          bottom: 0.5rem;
          left: 0.4375rem;
          content: "";
          height: 0.1875rem;
          width: 1rem;
          background: rgba(14, 175, 10, 1);
          border-radius: 0.125rem;
        }
      }
    }
  }
  .searchBar {
    width: 100%;
    box-sizing: border-box;
    padding: 0 1.25rem 0 0.9375rem;
    height: 3.25rem;
    background: #303032;
    input {
      position: relative;
      border: 0;
      outline: none;
      width: 19.1875rem;
      height: 2.25rem;
      background: rgba(142, 142, 147, 0.12);
      border-radius: 1.125rem;
      font-size: 0.8125rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(142, 142, 147, 1);
      line-height: 2.25rem;
      padding-left: 2.5625rem;
    }
  }
  .swiperWrap {
    padding-top: 6rem;
    width: 100%;
    height: 11.875rem;
    background: #fff;
    .van-swipe {
      width: 19rem !important;
      height: 9.375rem !important;
      border-radius: 0.25rem;
      overflow: hidden;
    }
    .mainPic {
      width: 19rem !important;
      height: 9.375rem !important;
      background: pink;
    }
  }
  //   武术，中医，推荐视频共同样式
  .tuijian,
  .wushu,
  .zhongyi {
    margin-top: 0.3125rem;
    padding: 0.1875rem 0.875rem 0.5625rem;
    width: 100%;
    box-sizing: border-box;
    height: 37.5rem;
    background-color: #fff;
    .titleBox {
      height: 2.9375rem;
      .title {
        height: 1.3125rem;
        font-size: 0.9375rem;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(74, 74, 74, 1);
      }
      .changeNext {
        position: relative;
        width: 3rem;
        height: 1.25rem;
        background: rgba(238, 238, 238, 1);
        border-radius: 0.25rem;
        font-size: 0.8125rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 1.25rem;
        text-align: center;
        &::after {
          position: absolute;
          right: -0.875rem;
          top: 0.25rem;
          content: "";
          width: 0.1875rem;
          height: 0.875rem;
          background: rgba(238, 238, 238, 1);
        }
      }
      .loadMore {
        padding-left: 1.4375rem;
        line-height: 1.25rem;
        font-size: 0.8125rem;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .bigImgText {
      position: relative;
      width: 21.6875rem;
      height: 10.625rem;
      border-radius: 0.375rem;
      overflow: hidden;
      background: pink;
      img:first-child {
        width: 21.6875rem;
        height: 10.625rem;
      }
      .rightRightCorner {
        position: absolute;
        right: 0;
        top: 0;
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
        z-index: 3;
        .num {
          margin-left: 0.1875rem;
        }
      }
      .leftBottomCorner {
        position: absolute;
        left: 0.625rem;
        bottom: 0.625rem;
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
        .introduce {
          margin-top: 0.3125rem;
          height: 1.25rem;
          font-size: 0.875rem;
          font-family: PingFangSC-Semibold;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 1.25rem;
        }
      }
    }
    .smallGroup {
      margin-top: 0.6875rem;
      .item {
        position: relative;
        width: 10.5rem;
        height: 10.5rem;
        border-radius: 0.375rem;
        background: pink;
        margin-bottom: 0.6875rem;
        overflow: hidden;
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
          .introduce {
            margin-top: 0.3125rem;
            height: 1.25rem;
            font-size: 0.875rem;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            line-height: 1.25rem;
          }
        }
      }
    }
  }
  //   武术与中医单独的特性
  .wushu,
  .zhongyi {
    height: auto !important;
    padding-bottom: 1.25rem;
    .item {
      width: 6.75rem !important;
      height: 6.75rem !important;
      border-radius: 0.375rem !important;
      .introduce {
        position: absolute;
        left: 0;
        bottom: -1.5rem !important;
      }
    }
  }
}
</style>


<template>
  <div id="attention">
    <head-back :showback="false">
        <ul class="flex">
          <li @click="switchTab(1)" :class="topTabId == 1 ? 'active' : ''">作品</li>
          <li @click="switchTab(2)" :class="topTabId == 2 ? 'active' : ''">话题动态</li>
        </ul>
    </head-back>
    <!-- <TabBar></TabBar> -->
    <!-- <tab-bar></tab-bar> -->
    <div class="attention">
      <ul class="attention-video flex flex--wrap flex--justify-content--space-between">
        <li @click="$router.push(`/works/${item.id}`)" v-for="(item, index) in attentionList" :key="index">
          <img :src="item.image" alt="" class="attention-img">
          <div class="userInfo">
            <div class="flex flex--align-items--center">
              <img :src="item.head" alt="" class="headimg">
              <span>{{item.title}}</span>
            </div>
            <p>{{item.content}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- 登录提示弹窗 -->
    <van-popup v-model="showModle">
        <div class="login-modle flex flex--row flex--align-items--center">
            <div class="login-content flex flex--justify-content--center">
                尊敬的用户，欢迎来到爱叮咚，请您先登录
            </div>
            <div class="login-btn flex flex--justify-content--space-between">
                <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(1)">去首页</a>
                <a href="javaScript:void(0)" class="flex flex-center-wrapper" @click="goJumpUrl(2)">去登录</a>
            </div>
        </div>
    </van-popup>


  </div>

</template>

<script>
// import TabBar from '../../components/tabBar'
import HeadBack from '../../components/headback/headback'
import api from '../../api/index.js'
export default {
  components:{
    HeadBack,
    // TabBar
  },
  created() {
    if(!window.localStorage.getItem('token')){
      // this.$router.push('/my');
      this.showModle = true;
      // this.$toast('请先登录');
      return
    }
    this.getAttentionList();
  },
  data() {
    return {
      topTabId:1,
      attentionList:[],
      showModle: false,
    }
  },
  methods: {
    /**
     * 跳转连接
     * @param {*} type  [1表示返回，2表示去登录]
     */
    goJumpUrl(type){
        this.showModle = false
        if(type == 1){
            this.$router.push('/');
        }else{
            this.$router.push('/login');
        }
    },
    //逻辑
    switchTab(index){
      this.topTabId = index
      this.getAttentionList(index)
    },
    // 请求
    async getAttentionList(type = 1){
      const {data:ret} = await this.$http.post(this.setApi + api.attention,this.querystring.stringify({
        access_token:window.localStorage.getItem('token'),
        type,
        user_id:JSON.parse(window.localStorage.getItem('userInfo')).id
      }))
      console.log(ret)
      if(!ret.error_code){
        this.attentionList = ret.response_data.lists
      }else{
        this.$toast(ret.error_msg);
      }
    }
  },
}
</script>

<style lang="less" scoped>
@import url('./attention.less');
.van-tabs__line {
  display: none !important;
}
.van-popup {
  border-radius: 10px;
}
.login-modle {
  width: 16.875rem;
  padding: 1.25rem;
}
.login-content {
  font-size: 1rem;
  padding: 1.875rem 0;
}
.login-btn a {
  width: 6.25rem;
  height: 1.875rem;
  border-radius: .375rem;
  box-sizing: border-box;
}
.login-btn a:first-child {
  background: #fff;
  color: #0eaf0a;
  border: 1px solid #0eaf0a; 
  margin-right: 2rem;
}
.login-btn a:last-child {
  background: #0eaf0a;
  color: #fff;
}
</style>

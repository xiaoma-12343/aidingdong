<template>
  <div id="app">
    <!-- <transition name="router-fade">
      <router-view v-if="true"/>
    </transition> -->
     <transition :name="fadeName">
      <!-- <keep-alive> -->
        <router-view class="Router"></router-view>
      <!-- </keep-alive> -->
　　　</transition>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
export default {
  name: "App",
  created() {
    let token = window.localStorage.getItem('token')
    let userInfo = window.localStorage.getItem('userInfo')
    if(token==null || userInfo==null || token=='undefined' || userInfo == 'undefined'){
      // return this.$router.replace('/login')
    }
  },
  data() {
    return {
      fadeName: 'slide-right',

    }
  },
  watch: {
    '$route' (to, from) {
        let isBack = this.$router.isBack
        // console.log(this.$router)
        // console.log(isBack)
        if(isBack) {
          this.fadeName = 'slide-right'
        } else {
          this.fadeName = 'slide-left'
        }
        this.$router.isBack = false
      }
  },
  methods: {

  },
};
</script>

<style lang="less">
html {
  width: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;


    .Router {
      position: absolute;
      width: 100%;
      transition: all .5s ease;
      top: 0;
    }

    .slide-left-enter,
    .slide-right-leave-active {
      // opacity: 0;
      -webkit-transform: translate(100%, 0);
      transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
      // opacity: 0;
      -webkit-transform: translate(-100%, 0);
      transform: translate(-100%,0);
    }
}


</style>

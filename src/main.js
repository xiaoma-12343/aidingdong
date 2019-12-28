// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import { Swipe,SwipeItem, Toast ,Icon, Field, PullRefresh, Popup,Picker,Button,RadioGroup, Radio, Uploader,Actionsheet, DatetimePicker,Tab, Tabs, Area, Dialog} from "vant";
import querystring from 'querystring';
import VueVideoPlayer from 'vue-video-player';
import preview from 'vue-photo-preview'
import VueAMap from 'vue-amap'
import vConsole from 'vconsole'
import repeat from './utils/repeat'  // 去重算法引入
import timestampToTime from './utils/times.js'
import VueLoading from 'vue-loading-template'
import LyTab from '../src/assets/ly-tab'
import * as filters from '../filter/filter';





// 样式
import './utils/rem';
import './styles/flex.css';
import './styles/common.css'
import './styles/app.css';
import './styles/normalize.css'
import './assets/css/flex.css'
import './styles/global.css'
import './assets/font/iconfont.css'
import 'video.js/dist/video-js.css'
import 'swiper/dist/css/swiper.css';
import 'vue-video-player/src/custom-theme.css'
import 'vue-photo-preview/dist/skin.css'

// router.prototype.goBack = function () { 
// 　　this.isBack = true
// 　　window.history.go(-1)
// }
  
// 配置
  
router.afterEach((to, from, next)=>{
  window.scrollTo(0,0)
  // if(to=='/'){
  //   window.scrollTo(0,window.sessionStorage.getItem('scrollY'))
  // }
})

    
    
// 注册
Vue.use(VueLoading, /** options **/)
Vue.config.productionTip = false;
Vue.use(VueAMap);
Vue.use(VueVideoPlayer);
Vue.use(preview);
Vue.use(Dialog);

Vue.prototype.repeat = repeat
Vue.prototype.querystring = querystring
// vant 组件引入
Vue.use(Swipe).use(SwipeItem).use(PullRefresh).use(Toast).use(Icon).use(Field).use(Popup).use(Picker).use(Button).use(RadioGroup).use(Radio).use(Uploader).use(DatetimePicker).use(Tab).use(Tabs).use(LyTab).use(Area).use(Dialog);
// console.log('注册注册表')
Vue.use(Actionsheet);
// axios
Vue.prototype.$http = axios;
// 过滤 转换时间戳
// Vue.filter('formatDate',(time)=>{ 
//   var now = new Date(time)
//   var month=now.getMonth()+1; 
//   var date=now.getDate(); 
//   return month+"月"+date+"日"; 
// } )
Vue.filter('formatDate',(time)=>{
  return timestampToTime(time,true)
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})


// 初始化手机控制台

// 初始化高德
VueAMap.initAMapApiLoader ({
  key: 'bf62482ecc4e59f0f67190e70663ad57',
  plugin: ['AMap.Geolocation','AMap.Geocoder'],
    // 默认高德 sdk 版本为 1.4.4
    v: '1.4.4'
  })
if (process.env.NODE_ENV === 'development') {
  Vue.prototype.setApi = "/api";
  // new vConsole()
  // axios.defaults.baseURL = '/api'
} else {
  Vue.prototype.setApi = "http://aidingdong.taijichn.com";
  // new vConsole()
  // axios.defaults.baseURL = 'http://aidingdong.taijichn.com'
}

/* eslint-disable no-new */
const globleVue =  new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

window.sessionStorage.removeItem('aidingdong_index');
window.sessionStorage.removeItem('aidingdong_id');

Vue.prototype.log = (type, obj) => {
  // type = type || "log";
  const log = JSON.parse(JSON.stringify(obj));
  console['log'](type, log)
}

Vue.prototype.escape2Html = (str) => {
  var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
      return arrEntities[t];
  });
}

// module.exports.globleVue = globleVue;
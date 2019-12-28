import Vue from 'vue'
import Router from 'vue-router'

// const router = new Router({
//   scrollBehavior(to, from, savedPosition) {
//     console.log(to,savedPosition)
//     if(savedPosition) {
//         return savedPosition
//     } else {
//         return {
//             x: 0,
//             y: 1228
//         }
//     }
// }
// })

import { my, msg, mypage, my_edit, my_game, my_storement, my_storecolist, vip, openvip, my_score, my_teaching, seting, numseting, my_event, reward } from "../views";
import { eventlist } from '../views'
import { my_store } from '../views'
import { index, home1, typeDetail, attention, videoDetail, moreVideo } from "../views";
import { login, guide, bindingMobile } from '../views'
import { reserve, store, storedetail } from '../views'
import { topic, topicsend, mytopic, topicdetail, details } from '../views'

import { interst, firend, fans, start, pinglun } from '../views'
import { send } from '../views'
// 我的赛事
import { myEventDetails, myEventDetail, myUpvideo, upemail } from '../views'
// 赛事评分
import { eventscore, scoredetail } from '../views'
// import {attention} from '../views'
import { works, real, realsuccess, videoDetails } from '../views'
// 考试
import { exam, examdetail, examtype, signexam, payexam, signdetails, collection, buyLists } from '../views'

import rank from '../views/home/components/rank/rank.vue'
// 教练入住
import coach from '../views/my/components/coach/coach'
import student from '../views/my/components/student/student.vue'
import course from '../views/my/components/course/course.vue'
import abtimes from '../views/my/components/abtimes/abtimes.vue'
import site from '../views/my/components/site/site.vue'
import addsite from '../views/my/components/addsite/addsite.vue'
// 赛事列表
import Event from '../views/event/event.vue'
import eventdetails from '../views/event/components/eventdetail/eventdetail.vue'
import eventsignup from '../views/event/components/eventsignup/eventsignup.vue'
import signdetail from '../views/event/components/signdetail/signdetail.vue'
import signsuccess from '../views/event/components/signsuccess/signsuccess.vue'
import live from '../views/live/live.vue'
// 搜索
import search from '../views/search/search.vue'
import searchlist from '../views/search/components/searchlist/searchlist.vue'

// 我的考试
import my_exam from '../views/my/components/exam/exam.vue'
import my_examdetail from '../views/my/components/examdetail/examdetail.vue'
import my_startexam from '../views/my/components/startexam/startexam.vue'

// 关于爱叮咚
import aboutAiDingDong from '../views/my/components/seting/aboutAiDingDong.vue'
// 金币
import { gold, goldpay, withdraw, selectpay } from '../views'

// 积分
import { integral } from '../views'
// 订单
import { order, orderdetail } from '../views'

// 赛事作品
import { vote } from '../views'

// 发票
import { invoice, kphistory, tjhistory } from '../views'

import optType from '../views/my/optType.vue'

// 约课 
import aboutClass from '../views/aboutClass/aboutClass.vue'
// 课程详情
import classDetail from '../views/aboutClass/classDetail.vue'
// 订单页面
import classOrder from '../views/aboutClass/classOrder.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '/',
          name: 'home',
          component: home1,
        }, {
          path: 'attention',
          name: 'attention',
          component: attention
        }, {
          path: 'message',
          name: 'message',
          component: msg,
        }, {
          path: 'my',
          name: 'my',
          component: my,
        }
      ]
    },
    {
      path: '/works/:id',
      name: 'works',
      component: works,
      meta: {
        vote: false
      }
    },
    {
      path: '/buyLists',
      name: 'buyLists',
      component: buyLists,
      meta: {
        vote: false
      }
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection,
      meta: {
        vote: false
      }
    },
    {
      path: '/bindingMobile',
      name: 'bindingMobile',
      component: bindingMobile,
      meta: {
        vote: false
      }
    },
    {
      path: '/moreVideo',
      name: 'moreVideo',
      component: moreVideo,
      meta: {
        vote: false
      }
    },
    {
      path: '/classDetail',
      name: 'classDetail',
      component: classDetail,
      meta: {
        vote: false
      }
    },
    {
      path: '/classOrder',
      name: 'classOrder',
      component: classOrder,
      meta: {
        vote: false
      }
    },
    {
      path: '/reward',
      name: 'reward',
      component: reward,
      meta: {
        vote: false
      }
    },
    {
      path: '/aboutClass',
      name: 'aboutClass',
      component: aboutClass,
      meta: {
        vote: false
      }
    },
    {
      path: '/optType',
      name: 'optType',
      component: optType,
      meta: {
        vote: false
      }
    },
    {
      path: '/aboutAiDingDong',
      name: 'aboutAiDingDong',
      component: aboutAiDingDong,
      meta: {
        vote: false
      }
    },
    {
      path: '/videoDetails',
      name: 'videoDetails',
      component: videoDetails,
      meta: {
        vote: false
      }
    },
    {
      path: '/vote/works/:id',
      name: 'works',
      component: works,
      meta: {
        vote: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/interst',
      name: 'interst',
      component: interst
    },
    {
      path: '/msg/firend',
      name: 'firend',
      component: firend
    },
    // {attention
    //   path: '/typeDetail/:id',
    //   name: 'typeDetail',
    //   component: typeDetail,
    // },
    // 赛事评分
    {
      path: '/my/event/score',
      name: 'score',
      component: eventscore

    },
    {
      path: '/my/event/score/details/:id',
      name: 'scoredetails',
      component: scoredetail

    }
    // 消息
    , {
      path: '/msg/fans',
      name: 'fans',
      component: fans
    }, {
      path: '/msg/start',
      name: 'start',
      component: start
    }, {
      path: '/msg/pinglun',
      name: 'pinglun',
      component: pinglun
    },
    // tabmsg
    {
      path: '/mypage/:id',
      name: 'mypage',
      component: mypage
    },
    {
      path: '/videoDetail',
      name: 'videoDetail',
      component: videoDetail,

    },
    // 我的赛事
    {
      path: '/my/event/details',
      name: 'eventdetails',
      component: myEventDetails
    },
    {
      path: '/my/event/detail',
      name: 'eventdetailinfo',
      component: myEventDetail
    },
    {
      path: '/my/event/upload',
      name: 'upload',
      component: myUpvideo
    }, {
      path: '/my/event/email',
      name: 'email',
      component: upemail
    },
    // 我的关注、
    {
      path: '/attention',
      name: 'attentions',
      component: attention
    },
    // 排行榜
    {
      path: '/rank',
      name: 'rank',
      component: rank
    },
    // 我的

    {
      path: '/my/seting',
      name: 'seting',
      component: seting
    },
    {
      path: '/seting/numseting',
      name: 'numseting',
      component: numseting
    },
    // 门店管理
    {
      path: '/my/store',
      name: 'mystore',
      component: my_store
    },
    {
      path: '/my/store/ment',
      name: 'storement',
      component: my_storement
    },
    {
      path: '/my/store/colist',
      name: 'storecolist',
      component: my_storecolist
    },
    {
      path: '/my/edit',
      name: 'my_edit',
      component: my_edit,

    },
    {
      path: '/my/game',
      name: 'my_game',
      component: my_game,
    }, {
      path: '/my/score',
      name: 'my_score',
      component: my_score,
    }, {
      path: '/my/teaching',
      name: 'teaching',
      component: my_teaching

    },
    // 预约
    {
      path: '/reserve',
      name: 'reserve',
      component: reserve
    },
    // 门店
    {
      path: '/store',
      name: 'store',
      component: store
    },
    // 门店详情
    {
      path: '/store/detail/:id/:lng/:lat',
      name: 'storedetail',
      component: storedetail
    },
    // 教练
    {
      path: '/my/coach',
      name: 'coach',
      component: coach
    }, {
      path: '/my/student',
      name: 'student',
      component: student
    }, {
      path: '/my/course',
      name: 'course',
      component: course
    }, {
      path: '/my/abtimes',
      name: 'abtimes',
      component: abtimes
    },
    // 教学场地
    {
      path: '/my/site',
      name: 'site',
      component: site
    },
    {
      path: '/my/addsite',
      name: 'addsite',
      component: addsite
    }
    // 考试
    , {
      path: '/my/exam',
      name: 'my_exam',
      component: my_exam
    }, {
      path: '/my/examdetail/:id/:pid/:type_id',
      name: 'my_examdetail',
      component: my_examdetail
    }, {
      path: '/my/startexam/:id/:examid',
      name: 'my_startexam',
      component: my_startexam
    },
    // vip
    {
      path: '/my/vip',
      name: 'vip',
      component: vip
    },
    {
      path: '/my/sends',
      name: 'send',
      component: send
    },
    {
      path: '/my/openvip',
      name: 'openvip',
      component: openvip
    },
    // 赛事列表
    {
      path: '/event',
      name: 'event',
      component: Event
    }
    , {
      path: '/event/details/:id',
      name: 'eventdetail',
      component: eventdetails
    }, {
      path: '/event/signup/:id',
      name: 'eventsignup',
      component: eventsignup
    }, {
      path: '/event/signdetail',
      name: 'signdetail',
      component: signdetail
    }, {
      path: '/live',
      name: 'live',
      component: live
    }, {
      path: '/event/pay/sign-success',
      name: 'sign-success',
      component: signsuccess
    },
    // 搜索
    {
      path: '/search/home',
      name: 'searchHome',
      component: search,
      meta: {
        type: 'home'
      }
    }, {
      path: '/search/event',
      name: 'searchEvent',
      component: search,
      meta: {
        type: 'event'
      }
    }, {
      path: '/search/retlist/:keywords',
      name: 'searchRet',
      component: searchlist
    },
    // 话题
    {
      path: '/topic',
      name: 'topic',
      component: topic
    }, {
      path: '/topic/send',
      name: 'topicsend',
      component: topicsend
    }, {
      path: '/topic/mysend',
      name: 'mytopic',
      component: mytopic
    }, {
      path: '/topic/detail/:id',
      name: 'topicdetail',
      component: topicdetail
    }, {
      path: '/topic/details/:type_id',
      name: 'details',
      component: details
    },
    // 我的赛事
    {
      path: '/my/event',
      name: 'myevent',
      component: eventlist
    },
    // 金币

    {
      path: '/my/gold',
      name: 'gold',
      component: gold
    }, {
      path: '/my/gold/pay',
      name: 'goldpay',
      component: goldpay
    }, {
      path: '/my/gold/withdraw',
      name: 'widthdraw',
      component: withdraw
    },
    , {
      path: '/my/gold/select',
      name: 'selectpay',
      component: selectpay
    },


    // 积分
    {
      path: '/my/gold/integral',
      name: 'integral',
      component: integral
    },



    // 订单
    {
      path: '/my/order',
      name: 'order',
      component: order
    }, {
      path: '/my/order/detail',
      name: 'orderdetails',
      component: orderdetail
    },


    // 考试报名

    {
      path: '/exam',
      name: 'exam',
      component: exam
    }, {
      path: '/exam/detail/:id',
      name: 'examdetail',
      component: examdetail
    }, {
      path: '/exam/type/:id',
      name: 'examtype',
      component: examtype
    }, {
      path: '/exam/sign/:id/:tid',
      name: 'signexam',
      component: signexam
    }, {
      path: '/exam/pay',
      name: 'payexam',
      component: payexam
    }, {
      path: '/exam/sign/detail',
      name: 'signdetails',
      component: signdetails
    },

    {
      path: '/real',
      name: 'real',
      component: real
    },
    {
      path: '/real/success',
      name: 'realsuccess',
      component: realsuccess
    },

    // 发票
    {
      path: '/invoice',
      name: 'invoice',
      component: invoice
    }, {
      path: '/kphistory',
      name: 'kphistory',
      component: kphistory
    },
    {
      path: '/tjhistory',
      name: 'tjhistory',
      component: tjhistory
    },
    // 投票  参赛作品
    {
      path: '/event/vote/:id',
      name: 'vote',
      component: vote
    }
  ]
})

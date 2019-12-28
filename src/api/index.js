var ApiObj = {};
// 首页分类
ApiObj.indexType = "/rest/2.0/type/type/List";
// 首页分类详情
ApiObj.indexTypeDetail = "/rest/2.0/index/index/list";
// 首页轮播
ApiObj.bannerList = "/rest/2.0/banner/banner/list";
// 推荐
ApiObj.recommendList = "/rest/2.0/index/index/recommend_list";
// 获取某个
ApiObj.indexlist =  '/rest/2.0/index/index/list'

// 首页分类获取
// ApiObj.getIndexType = async ()=>{
//     const {data:ret} = await this.$http.post(this.setApi + '/rest/2.0/type/type/List')
// }
// 作品详情
ApiObj.zuopinDetail = "/rest/2.0/index/index/details_list"
// 赛事列表
ApiObj.eventList = '/rest/2.0/competition/competition/competition_list'
// 赛事详情
ApiObj.eventDetail = '/rest/2.0/competition/competition/details_list'
// 参赛项目选择
ApiObj.eventSelect = '/rest/2.0/competition/competition/competition_type_list'
// 提交报名
ApiObj.eventSignup = '/rest/2.0/competition/competition/competition_apply_submit'
// 搜索
ApiObj.search = '/rest/2.0/search/search/list'
// 搜索结果
ApiObj.searchRet = '/rest/2.0/search/search/result_list'
// 支付
ApiObj.paymoney = '/rest/2.0/competition/competition/pay'
// 图片上传 base64
ApiObj.uploaderBase64 = '/rest/2.0/file/file/uploadBase64'
// 教练入住
ApiObj.coachEnter = '/rest/2.0/coach/coach/coach_enter'
// 我的学员
ApiObj.studentList = '/rest/2.0/coach/coach/my_student'
// 拳种
ApiObj.labelList = '/rest/2.0/coach/coach/coach_major'
// 我的课程
ApiObj.courseList = '/rest/2.0/coach/coach/my_class'
// 约课时间
ApiObj.abtimeList = '/rest/2.0/coach/coach/my_about'
// 保存地址
ApiObj.addSiteList = '/rest/2.0/coach/coach/my_addaddr'
// 教学地址
ApiObj.siteList = '/rest/2.0/coach/coach/my_addr'

// 考试列表
ApiObj.examList = '/rest/2.0/user/user/my_examination'
// 考试详情
ApiObj.examDetails = '/rest/2.0/user/user/my_examination_detail'
// 考试题
ApiObj.startExamList = '/rest/2.0/user/user/examination_list' 
// 考试提交
ApiObj.submitExam = '/rest/2.0/user/user/examination_submit'

// 场馆列表
ApiObj.storeList = '/rest/2.0/shop/shop/list'
// 场馆详情
ApiObj.storeDetail = '/rest/2.0/shop/shop/shop_detail'
// 推荐教练列表
ApiObj.recomLists = '/rest/2.0/shop/shop/coach_detail'

// 门店入住
ApiObj.stores = '/rest/2.0/shop/shop/shop_add'
// 门下教练
ApiObj.coList = '/rest/2.0/shop/shop/shop_coach'

// 发送验证码
ApiObj.getcode = '/rest/2.0/user/user/send_sms'
// login
ApiObj.login = '/rest/2.0/user/user/login'

// 关注列表
ApiObj.attention = '/rest/2.0/attention/attention/attention_list'

// 我的

// 资料声明


// 个人信息
ApiObj.userInfo = '/rest/2.0/user/user/user_BasicData'

// 教练列表
ApiObj.coachList = '/rest/2.0/coach/coach/list'

// 话题
ApiObj.topicList = '/rest/2.0/type_topic/type_topic/type_topic_list'
// 发布话题
ApiObj.addTopic = '/rest/2.0/type_topic/type_topic/type_topic_single_add'
// 所有话题列表
ApiObj.allTopicList = '/rest/2.0/type_topic/type_topic/topic_all_list'
// 我参与的话题
ApiObj.myTopicList = '/rest/2.0/type_topic/type_topic/type_mytopic_list'
// 话题详情
ApiObj.topicDetails = '/rest/2.0/type_topic/type_topic/topic_single_detail'
// 点赞
ApiObj.praise = '/rest/2.0/praise/praise/praise'
// 发表评论
ApiObj.comment = '/rest/2.0/comment/comment/comment'
// 获取帖子评论
ApiObj.pingl = '/rest/2.0/type_topic/type_topic/type_topic_single_comment_list'
// 修改个人信息
ApiObj.editUserInfo = '/rest/2.0/user/user/user_info_submit'

// 粉丝.点赞.评论.好友
ApiObj.msginfo = '/rest/2.0/news/news/list'

// 订单
ApiObj.orderList = '/rest/2.0/user/user/my_orders_list'

// // 我赛事列表
// ApiObj.myEventList = '/rest/2.0/competition/competition/competition_list'
// // 赛事类型列表
// ApiObj.myEventClassList = '/rest/2.0/competition/competition/competition_list'
// // 赛事详情
// ApiObj.myEventDetails = '/rest/2.0/competition/competition/competition_type_list'
// // 赛事报名
// ApiObj.myEventApply = '/rest/2.0/competition/competition/competition_type_list'

// 个人页面
ApiObj.myPages = '/rest/2.0/index/index/user'
// 个人页面下的视频
ApiObj.myVideo = '/rest/2.0/index/index/info'

// 关注功能
ApiObj.attentioned = '/rest/2.0/type_topic/type_topic/type_topic_attention'


// 排行榜
ApiObj.rankList = '/rest/2.0/index/index/ranking_list'

// 我的金币
ApiObj.gold = '/rest/2.0/user/user/my_gold'

// 我的赛事列表
ApiObj.myEventList = '/rest/2.0/user/user/my_competition'

// 赛事创建订单列表
// ApiObj.createEventOrder = '/rest/2.0/competition/competition/competition_apply_submit'

// 考试列表
ApiObj.examLists = '/rest/2.0/examination/examination/examination_list'
ApiObj.examDetail = '/rest/2.0/examination/examination/examination_detail'
ApiObj.examType = '/rest/2.0/examination/examination/examination_type_list'
ApiObj.signExam = '/rest/2.0/examination/examination/examination_apply_info'
ApiObj.payExam = '/rest/2.0/examination/examination/examination_apply_submit'

// 赛事评分
ApiObj.eventscore = '/rest/2.0/user/user/com_grade_list'
// 评分详情
ApiObj.scoredetails = '/rest/2.0/user/user/com_grade_detail'
//评分动作
ApiObj.scoreEvent = '/rest/2.0/competition/competition/grade'
// 赛事作品上传
ApiObj.zuopinUp = '/rest/2.0/file/file/upload_oss'
// 个人作品上传
ApiObj.myzuopinup = '/rest/2.0/user/user/publish'

// 微信登录
ApiObj.wechatLogin = '/rest/2.0/user/user/wx_login'

// qq登录
ApiObj.qqLogin = '/rest/2.0/user/user/qq_login'

// 开票
ApiObj.invoiceList = '/rest/2.0/invoice/invoice/invoice_orders_list'
// 开票历史
ApiObj.kphistory = '/rest/2.0/invoice/invoice/invoice_history_list'

// 赛事投票
ApiObj.voteEvent = '/rest/2.0/competition/competition/vote'
// 投票列表
ApiObj.voteList = '/rest/2.0/competition/competition/vote_list'
// 投票详情
ApiObj.voteDetail = '/rest/2.0/competition/competition/vote_detail'


// 实名认证
ApiObj.cardReal = '/rest/2.0/user/user/idenauthen'

// 筛选条件
ApiObj.getFilterCondition = '/rest/2.0/search/search/list_items'

// 打赏操作
ApiObj.reward = '/rest/2.0/reward/reward/reward'

// 打赏种类列表
ApiObj.rewardList = '/rest/2.0/reward/reward/list'

// 其他视频筛选
ApiObj.searchList = '/rest/2.0/search/search/search'

// 取消订单
ApiObj.delete_cancel_order = '/rest/2.0/coach/coach/delete_cancel_order'

// 赛事报名确认支付
ApiObj.competition_apply_info = '/rest/2.0/competition/competition/competition_apply_info'

// 创建充值订单
ApiObj.gold_create = '/rest/2.0/gold/gold/create'

// 获取举办方阵容
ApiObj.get_master_list = '/rest/2.0/competition/competition/master_list'
// 获取会员列表
ApiObj.plus_duration = '/rest/2.0/user/user/plus_duration'
// 生成订单号
ApiObj.open_plus = '/rest/2.0/user/user/open_plus'
// 获取首页所有列表
ApiObj.all_list = '/rest/2.0/index/index/all_list'
// 获取个人宣传内容
ApiObj.personage = '/rest/2.0/user/user/personage'
// 获取评分赛事列表
ApiObj.grade_list = '/rest/2.0/competition/competition/grade_list'

// 1同意赛事免责声明,2关于爱叮咚,3裁判评分说明,4支付协议,5邀请好友规则说明,6支付说明,7会员权益(默认type值为1)
ApiObj.statement = '/rest/2.0/statement/statement/list'

// 教练详情-1教练接口
ApiObj.coach_detail_coach = '/rest/2.0/coach/coach/coach_detail_coach'
// 教练详情-2课程接口
ApiObj.coach_detail_course = '/rest/2.0/coach/coach/coach_detail_course'
// 教练详情-3 评论接口
ApiObj.coach_detail_comment = '/rest/2.0/coach/coach/coach_detail_comment'
// 课程详情接口
ApiObj.course_detail = '/rest/2.0/coach/coach/course_detail'
// 购买课程生成订单
ApiObj.create_order = '/rest/2.0/coach/coach/create_order'
// 课程订单详情
ApiObj.class_order_detail = '/rest/2.0/user/user/class_order_detail'
// 获取打赏列表
ApiObj.reward_list = '/rest/2.0/user/user/reward_list'
// 发送信息
ApiObj.send_sms = '/rest/2.0/user/user/send_sms'
// 举报
ApiObj.jubao = '/rest/2.0/user/user/jubao'
// 收藏
ApiObj.shoucang = '/rest/2.0/user/user/shoucang'
// 我的收藏
ApiObj.shoucang_list = '/rest/2.0/user/user/shoucang_list'
// 付费视频下单接口
ApiObj.buy_video = '/rest/2.0/video/video/buy_video'
// 判断当前用户是否购买过该视频
ApiObj.is_buy = '/rest/2.0/user/user/is_buy'
// 获取收支明细列表
ApiObj.sale_detail = '/rest/2.0/user/user/sale_detail'
// 我的邀请列表
ApiObj.invited_list = '/rest/2.0/user/user/invited_list'
// 检测第三方登录有没有绑定过手机号
ApiObj.third_is_band = '/rest/2.0/user/user/third_is_band'



export default ApiObj;
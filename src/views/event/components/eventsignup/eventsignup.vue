<template>
    <div id="event-signup">
        <head-back>
            <span class="head-title">填写报名信息</span>
        </head-back>
        <div class="event-signup">
            <!-- 选择参赛项目  一级分类 -->
            <div class="event-select">
                <p>选择参赛项目</p>
                <ul
                    v-if="select.selectList.length != 0"
                    class="flex flex--wrap flex--justify-content--space-between"
                >
                    <!-- :class="fromData.competition_type_id==item.id?'active':''"  -->
                    <li
                        class="ellopes"
                        :class="{'ellipsis11': item.name.length > 11, 'active': fromData.competition_type_id==item.id}"
                        @click="pushSelectlist(item.id)"
                        v-for="(item,index) in select.selectList"
                        :key="index"
                    >
                        {{item.name}}
                        <span
                            v-if="item.name.length > 11"
                            @click="viewMoreTxt(item.name)"
                        >...</span>
                    </li>
                </ul>
                <!-- {{item.name}} -->
                <div class="isShow" v-if="select.selectList.length == 0">
                    <h3>暂无参赛项目b(￣▽￣)d</h3>
                </div>
            </div>
            <!-- 参赛项目  二级分类 -->
            <div class="event-select">
                <p>请选择参赛组别</p>
                <ul
                    v-if="select.selectList1.length != 0"
                    class="flex flex--wrap flex--justify-content--space-between"
                >
                    <!-- :class="fromData.competition_type_id1==item.id?'active':''"  -->
                    <li
                        class="ellopes"
                        :class="{'ellipsis11': item.name.length > 11, 'active': fromData.competition_type_id1==item.id}"
                        @click="pushSelectlist1(item.id)"
                        v-for="(item,index) in select.selectList1"
                        :key="index"
                    >
                        {{item.name}}
                        <span
                            v-if="item.name.length > 11"
                            @click="viewMoreTxt(item.name)"
                        >...</span>
                    </li>
                </ul>
                <div class="isShow" v-if="select.selectList1.length == 0">
                    <h3>暂无参赛项目b(￣▽￣)d</h3>
                </div>
            </div>

            <!-- 表单 -->
            <div class="event-enter">
                <!-- 参赛者信息 -->
                <p>参赛者信息</p>
                <div class="event-formdata">
                    <!-- 姓名 -->
                    <div class="form-input flex flex--align-items--center" v-if="userInfo">
                        <span>姓名</span>
                        <div class="form-inp" style>
                            <!-- v-model="userInfo.truename" :disabled="true"  -->
                            <!-- <input v-model="fromData.name" @input="getFormData" type="text" placeholder="请输入您的姓名"> -->
                            <input
                                class="input"
                                style="width:10rem !important;"
                                v-model="userInfo.truename"
                                :disabled="true"
                                type="text"
                                placeholder="请输入您的姓名"
                            />
                        </div>
                        <van-button
                            type="primary"
                            v-if="userInfo.is_certification != 1"
                            @click="toReal"
                        >去实名认证</van-button>
                    </div>
                    <!-- 性别选择 -->
                    <div
                        class="form-input form-sex flex flex--justify-content--space-between flex--align-items--center"
                    >
                        <span>性别</span>
                        <div class="flex flex--align-items--center" v-if="userInfo.sex">
                            <span>{{userInfo.sex == 1?'男':'女'}}</span>
                            <van-icon name="arrow" color="#494949" />
                        </div>
                    </div>
                    <van-popup v-model="sexShow" overlay close-on-click-overlay position="bottom">
                        <van-picker
                            show-toolbar
                            title="性别"
                            @cancel="sexShow=false"
                            @confirm="getSex"
                            :columns="sexList"
                        />
                    </van-popup>
                    <!-- 年龄 -->
                    <div class="form-input flex flex--align-items--center">
                        <span>年龄</span>
                        <div class="form-inp">
                            <input
                                @input="getFormData"
                                v-model="userInfo.year"
                                :disabled="true"
                                type="number"
                                placeholder="请输入您的年龄"
                            />
                        </div>
                    </div>
                    <!-- 实名认证 -->
                    <div
                        v-if="is_certification==0"
                        @click="$router.push(`/real`)"
                        class="event-realname"
                    >实名认证&gt;&gt;</div>
                    <!-- 身高 -->
                    <div class="form-input flex flex--align-items--center">
                        <span>身高</span>
                        <div class="form-inp">
                            <input
                                @input="getFormData"
                                v-model="fromData.stature_id"
                                type="number"
                                placeholder="请输入您的身高"
                            />
                            <span>Cm</span>
                        </div>
                    </div>
                    <!-- 体重 -->
                    <div class="form-input flex flex--align-items--center">
                        <span>体重</span>
                        <div class="form-inp">
                            <input
                                @input="getFormData"
                                v-model="fromData.weight_id"
                                type="number"
                                placeholder="请输入您的体重"
                            />
                            <span>Kg</span>
                        </div>
                    </div>
                    <!-- 地址 -->
                    <div class="form-input flex flex--align-items--center">
                        <span>地址</span>
                        <div class="form-inp">
                            <input
                                @input="getFormData"
                                v-model="fromData.address"
                                type="text"
                                placeholder="请输入场馆地址"
                            />
                        </div>
                    </div>
                    <!-- 场馆 -->
                    <div class="form-input flex flex--align-items--center">
                        <span>场馆</span>
                        <div class="form-inp">
                            <input
                                @input="getFormData"
                                v-model="fromData.venue"
                                type="text"
                                placeholder="请输入场馆名称"
                            />
                        </div>
                    </div>
                    <!-- 联系电话 -->
                    <div class="form-input flex flex--align-items--center">
                        <span>联系电话</span>
                        <div class="form-inp">
                            <input
                                @input="getFormData"
                                v-model="fromData.phone"
                                type="number"
                                placeholder="请输入您的手机号码"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <!-- 按钮 -->
            <div class="event-submit">
                <van-radio-group v-model="radio">
                    <van-radio name="1">
                        同意
                        <span @click="viewSaishishengming" class="shengmin">《赛事声明》</span>
                    </van-radio>
                </van-radio-group>
                <div class="button">
                    <van-button @click="postFormData" :disabled="radio!=1" type="primary">确定报名</van-button>
                </div>
            </div>
        </div>

        <loading v-if="loadingShow" />

        <van-popup v-model="showShenmging">
            <div class="shengming-content">
                <div v-html="shengmingTxt"></div>
            </div>
        </van-popup>
        <van-popup v-model="showModle">
            <div class="login-modle flex flex--row flex--align-items--center">
                <div class="login-content flex flex--justify-content--center">尊敬的爱叮咚用户，请您先登录</div>
                <div class="login-btn flex flex--justify-content--space-between">
                    <a
                        href="javaScript:void(0)"
                        class="flex flex-center-wrapper"
                        @click="goJumpUrl(1)"
                    >去首页</a>
                    <a
                        href="javaScript:void(0)"
                        class="flex flex-center-wrapper"
                        @click="goJumpUrl(2)"
                    >去登录</a>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import HeadBack from "../../../../components/headback/headback";
// import FormInput from '../../../../components/forminput/forminput'
import api from "../../../../api/index.js";
import loading from "../../../../components/loading";
export default {
    components: {
        HeadBack,
        loading
        // FormInput
    },
    created() {
        let token = window.localStorage.getItem("token");
        if (!token || token == undefined || token == "" || token == null) {
            this.loadingShow = false;
            this.showModle = true;
            return;
        }
        let from_data_obj = window.localStorage.getItem("from_data");
        if (
            from_data_obj &&
            from_data_obj != "null" &&
            from_data_obj != "undefined"
        ) {
            if (typeof JSON.parse(from_data_obj) == "object") {
                let from_data = JSON.parse(from_data_obj);
                if (from_data && Object.keys(from_data).length > 0) {
                    this.fromData = from_data;
                }
            }
        }

        this.fromData.access_token = window.localStorage.getItem("token");
        this.is_certification = JSON.parse(
            window.localStorage.getItem("userInfo")
        ).is_certification;
        // 获取个人信息
        this.getUserInfo();
        this.getEventSelect();
        this.getEventDetails();
        this.getShengming();
    },
    data() {
        return {
            // radio
            radio: "",
            // 显示弹出框
            sexShow: false,
            showModle: false,
            // 获取项目选择列表
            select: {
                selectList: [],
                selectList1: []
            },
            is_certification: null,
            // 性别
            sexList: ["男", "女"],
            fromData: {
                type: "2",
                competition_id: this.$route.params.id,
                competition_type_id: "", //赛事项目id（一级分类）
                competition_type_id1: "", //赛事项目id（二级分类）
                name: "", //姓名
                sex: 1, //性别
                stature_id: "", //身高
                weight_id: "", //体重
                year_id: "", //年龄
                phone: "", //手机
                address: "", //地址
                venue: "", //场馆
                access_token: ""
                // money: 0
            },
            userInfo: {}, // 个人信息
            loadingShow: true, // 是否显示加载loading
            showShenmging: false, // 是否显示赛事声明
            shengmingTxt: "" // 赛事声明
        };
    },
    methods: {
        /**
         * 展示全部文字
         */
        viewMoreTxt(txt) {
            this.$toast(txt);
        },

        /**
         * 获取个人资料
         */
        async getUserInfo() {
            const { data: ret } = await this.$http.post(
                this.setApi + api.userInfo,
                this.querystring.stringify({
                    access_token: window.localStorage.getItem("token")
                })
            );

            window.localStorage.setItem(
                "userInfo",
                JSON.stringify(ret.response_data)
            );

            if (!ret.error_code) {
                this.userInfo = ret.response_data;
                // console.log(
                //     "个人信息",
                //     JSON.parse(JSON.stringify(this.userInfo))
                // );
            }
        },
        /**
         * 跳转连接
         * @param {*} type  [1表示返回，2表示去登录]
         */
        goJumpUrl(type) {
            this.showModle = false;
            if (type == 1) {
                this.$router.push("/");
            } else {
                this.$router.push("/login");
            }
        },
        /**
         * 跳转到实名认证
         *
         */
        toReal() {
            this.$router.push({
                path: "/real"
            });
        },

        /**
         * 保存input框输入信息
         */
        getFormData() {
            window.localStorage.setItem(
                "from_data",
                JSON.stringify(this.fromData)
            );
        },

        /**
         * 查看赛事声明
         */
        viewSaishishengming() {
            this.showShenmging = true;
        },

        /**
         * 获取赛事声明
         */
        async getShengming() {
            const { data: ret } = await this.$http.post(
                this.setApi + api.statement,
                this.querystring.stringify({ type: 1 })
            );
            // console.log('赛事详情', ret);
            if (!ret.error_code) {
                this.shengmingTxt = this.escape2Html(ret.response_data.content);
            } else {
            }
        },

        escape2Html(str) {
            var arrEntities = {
                lt: "<",
                gt: ">",
                nbsp: " ",
                amp: "&",
                quot: '"'
            };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
                return arrEntities[t];
            });
        },

        /**
         * 获取赛事详情
         */
        async getEventDetails() {
            let id = this.$route.params.id;
            const { data: ret } = await this.$http.post(
                this.setApi + api.eventDetail,
                this.querystring.stringify({ competition_id: id })
            );
            console.log("==============", ret);
            if (!ret.error_msg) {
                this.eventDetails = ret.response_data.detail;
                this.fromData.amount = ret.response_data.detail[0].money;
            }
        },
        // 逻辑
        // 获取当前选择的性别并渲染到页面上 并讲弹框隐藏
        getSex(val, index) {
            console.log(index + 1);
            this.fromData.sex = index + 1;
            this.sexShow = false;
        },

        // 获取当前的赛事项目id
        pushSelectlist(id) {
            // console.log(id);
            // 请求二级分类

            this.fromData.competition_type_id = id;
            this.getEventSelect(id);
        },

        /**
         * 二级分类选择
         */
        pushSelectlist1(id) {
            this.fromData.competition_type_id1 = id;
        },
        // 请求
        // 获取项目选择
        async getEventSelect(parent_id) {
            let params = {
                competition_id: this.$route.params.id,
                parent_id
            };
            const { data: ret } = await this.$http.post(
                this.setApi + api.eventSelect,
                this.querystring.stringify(params)
            );
            this.loadingShow = false;
            console.log("获取的分类选择", ret.response_data);
            if (!ret.error_msg) {
                if (parent_id) {
                    this.select.selectList1 = ret.response_data.lists;
                    this.fromData.competition_type_id1 =
                        ret.response_data.lists[0].id;
                } else {
                    this.select.selectList = ret.response_data.lists;
                    this.fromData.competition_type_id =
                        ret.response_data.lists[0].id;
                    this.getEventSelect(ret.response_data.lists[0].id);
                }
            }
        },

        /**
         * 获取个人信息
         */
        // getUserInfo(){
        //     this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
        //     // this.log('获取个人信息', this.userInfo);
        // },

        // 提交
        async postFormData() {
            // console.log('==========', !this.is_certification);
            if (this.is_certification == 0) {
                this.$toast("请先进行实名认证");
                return;
            }

            let lock = true;
            let cnRge = /^[\u4e00-\u9fa5 ]{2,20}$/;
            let enRge = /^[a-zA-Z\/ ]{2,20}$/;
            // Object.keys(this.fromData).forEach(keys=>{
            //     if(this.fromData[keys] == '' || this.fromData[keys] == 'undefined' || this.fromData[keys] == null){
            //         lock = false;
            //     }
            // })
            // console.log('this.userInfo', this.userInfo);
            // console.log('this.fromData', this.fromData);
            this.fromData.name = this.userInfo.truename;
            this.fromData.username = this.userInfo.truename;
            this.fromData.sex = this.userInfo.sex;
            this.fromData.year_id = this.userInfo.year;
            if (!lock) {
                this.$toast("请先完善内容");
                return;
            }

            if (
                !cnRge.test(this.fromData.name) &&
                !enRge.test(this.fromData.name)
            ) {
                this.$toast("请检查姓名格式是否正确");
                return;
            }

            // 校验电话输入
            if (!/^1[3456789]\d{9}$/.test(this.fromData.phone)) {
                this.$toast("手机号有误，请重新填写");
                return false;
            }

            const { data: ret } = await this.$http.post(
                this.setApi + api.eventSignup,
                this.querystring.stringify(this.fromData)
            );

            window.localStorage.setItem("from_data", null);
            // console.log(ret)
            if (ret.error_code == 113000) return this.$toast(ret.error_msg);
            // 将成功后返回的数据给存储到本地
            if (!ret.response_data) return;
            var session = window.sessionStorage;
            session.setItem("successInfo", JSON.stringify(ret.response_data));
            this.$router.replace(
                "/event/signdetail?id=" + this.$route.params.id
            );
        }
    }
};
</script>

<style lang="less" scoped>
@import url("./eventsignup.less");
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
    border-radius: 0.375rem;
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
.ellopes {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
}
.shengmin {
    color: #07c160;
}
.shengming-content {
    width: 18.75rem;
    max-height: 31.25rem;
    overflow-y: auto;
    // overflow-x: hidden;
    box-sizing: border-box;
    padding: 1.25rem;
}
.shengming-content div {
    width: 100%;
}
.ellipsis11 {
    height: 1rem;
    width: auto;
    // display: -webkit-box !important;
    display: inline-block;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
    overflow-y: hidden;
    overflow-x: visible;
    position: relative;
    padding-right: 0.75rem;
}
.ellipsis11 span {
    //   content: '...';
    position: absolute;
    right: 0;
    bottom: 0;
    font-weight: 700;
    letter-spacing: 0.125rem;
}
.ellipsis11.active span {
    color: #fff !important;
}
</style>

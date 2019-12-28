<template>
    <div id="edit-userinfo">
        <head-back :isshow="false">
            <span class="head-title">
                编辑资料
            </span>
            <span @click="editSubmit" class="head-right">
                完成
            </span>
        </head-back>
        <div class="edit-userinfo">
            <div class="userinfos">
                <!-- 头像 -->
                <van-uploader id="img-uploader" style="width:100%" :after-read="uploadImg">
                    <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                        <p>头像</p>
                        <div class="flex flex--align-items--center">
                            <!-- <label for="img-uploader"><img :src="userInfo.head" alt="img"></label> -->
                                <img :src="userInfo.head" alt="img">
                            <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                        </div>
                    </div>
                </van-uploader>
                <!-- 手机号 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center"  @click="editorMobile = true;">
                    <p>手机号</p>
                    <div class="block-div flex flex--align-items--center">
                        <span v-show="!editorMobile" class="block-span edit-text">{{userInfo.phone}}</span>
                        <input autofocus class="editinput" @blur="editorMobile = false" v-show="editorMobile" v-model="userInfo.phone" type="text">
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div>
                <!-- 昵称 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>昵称</p>
                    <div @click="nickinput = true" class="block-div flex flex--align-items--center">
                        <span v-show="!nickinput"  class="edit-text block-span">{{userInfo.nickname == ''?'未填写' : userInfo.nickname}}</span>
                        <input autofocus class="editinput" @blur="nickinput = false" v-show="nickinput" v-model="userInfo.nickname" type="text">
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div>
                <!-- 性别 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>性别</p>
                    <div class="block-div flex flex--align-items--center">
                        <span @click="sexShow = true" class="block-span edit-text">{{userInfo.sex == 1 ? '男' : '女'}}</span>
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                    <van-popup v-model="sexShow" overlay close-on-click-overlay position="bottom">
                        <van-picker show-toolbar title="性别" @cancel="sexShow=false" @confirm="getSex" :columns="sexList"/>
                    </van-popup>
                </div>
            </div>

            <div class="userinfos">
                <!-- 身高 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>身高</p>
                    <div class="block-div flex flex--align-items--center">
                        <span @click="statureinput = true" v-show="!statureinput" class="block-span edit-text">{{userInfo.stature == ''?'未填写' : userInfo.stature}}cm</span>
                        <input autofocus class="editinput" @blur="statureinput = false" v-show="statureinput" v-model="userInfo.stature" type="text">
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div>
                <!-- 生日 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>生日</p>
                    <div  @click="birthdays = true"  class="block-div flex flex--align-items--center">
                        <span class="edit-text block-span">{{userInfo.birthday == ''?'未填写' : userInfo.birthday}}</span>
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                    <van-popup v-model="birthdays" overlay close-on-click-overlay position="bottom">
                        <van-datetime-picker 
                            :min-date="minDate"
                            :max-date="maxDate" 
                            @confirm="birthday"  
                            v-model="currentDate" 
                            type="date" 
                            title="选择生日" />
                    </van-popup>
                </div>
                <!-- 城市 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center" @click="areaListsShow  = !areaListsShow">
                    <p>城市</p>
                    <div class="block-div flex flex--align-items--center">
                        <span class="block-span edit-text">{{userInfo.province_name}} {{userInfo.city_name}} {{userInfo.county_name}}</span>
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div>
                <!-- 行业 -->
               <!-- <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>行业</p>
                    <div @click="industryinput = true" class="flex flex--align-items--center">
                        <span  v-show="!industryinput" class="edit-text">{{userInfo.industry == ''?'未填写' : userInfo.industry}}</span>
                        <input autofocus class="editinput" @blur="industryinput = false" v-show="industryinput" v-model="userInfo.industry" type="text">
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div> -->
            </div>

            <div class="userinfos">
                <!-- 昵称 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>学历</p>
                    <div @click="educationinput = true" class="block-div flex flex--align-items--center">
                        <span v-show="!educationinput" class="block-span edit-text">{{userInfo.education  == ''?'未填写' : userInfo.education}}</span>
                        <input autofocus class="editinput" @blur="educationinput = false" v-show="educationinput" v-model="userInfo.education" type="text">
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div>
                <!-- 性别 -->
                <div class="edit-data flex flex--justify-content--space-between flex--align-items--center">
                    <p>签名</p>
                    <div @click="signatureinput = true" class="block-div flex flex--align-items--center">
                        <span class="edit-text block-span" v-show="!signatureinput">{{userInfo.signature == ''?'未填写' : userInfo.signature}}</span>
                        <input autofocus class="editinput" @blur="signatureinput = false" v-show="signatureinput" v-model="userInfo.signature" type="text">
                        <van-icon name="arrow" size="15px" color="#CBCBCB"></van-icon>
                    </div>
                </div>
            </div>
        </div>





        <!-- 城市选择组件 -->
        <van-actionsheet v-model="areaListsShow" title="标题">
            <van-area 
                @confirm="confimeSeletc"
                @cancel="cancel"
                :area-list="areaList" :value="userInfo.county_id" />
        </van-actionsheet>

    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
import area from './area';
export default {
    components:{
        HeadBack
    },
    created() {
        this.getUserInfo()
    },
    data() {
        return {
            editorMobile: false,
            userInfo:JSON.parse(window.localStorage.getItem('userInfo')),
            nickinput:false, // 昵称输入框显示
            sexShow:false, // 性别弹框显示
            statureinput:false,// 身高
            birthdays:false, // 生日
            industryinput:false,//行业
            educationinput:false,//学历
            signatureinput:false,//签名
            currentDate:new Date(),
            sexList: ['男','女'],
            areaList: area,
            minDate: new Date(1949, 10, 1),
            maxDate: new Date(),
            areaListsShow: false
        }
    },
    methods: {
        cancel(){
            this.areaListsShow = !this.areaListsShow;
            // console.log('取消')
        },
        confimeSeletc(e){
            // console.log('确定选择', e)
            this.userInfo.province_id = e[0].code;
            this.userInfo.city_id = e[1].code;
            this.userInfo.county_id = e[2].code;

            this.userInfo.province_name = e[0].name;
            this.userInfo.city_name = e[1].name;
            this.userInfo.county_name = e[2].name;

            this.areaListsShow = !this.areaListsShow;
        },
        /**
         * 获取个人信息
         */
        async getUserInfo(){
            const {data:ret} = await this.$http.post(this.setApi + api.userInfo,this.querystring.stringify({access_token:window.localStorage.getItem('token')}));
            window.localStorage.setItem('userInfo',JSON.stringify(ret.response_data));
            // console.log(ret.response_data);
            // console.log('userInfouserInfouserInfouserInfo', JSON.parse(JSON.stringify(ret.response_data)));
            if(!ret.error_code){
                this.userInfo = ret.response_data;
            }else{
                this.$router.push({
                path: '/login'
                })
            }
        },



        // 逻辑
        // 更换头像
        async uploadImg(file){
            console.log(123456,file)
            const {data:ret} = await this.$http.post(this.setApi + api.uploaderBase64,this.querystring.stringify({fileImg:file.content}))
            console.log(ret)
            this.userInfo.head = ret.response_data
        },
        // 更换性别
        getSex(val,index){
            console.log(val,index+1)
            this.userInfo.sex = index + 1
            this.sexShow = false;
        },
        birthday(val){
            var times = new Date(val)
            // console.log(`${times.getFullYear()}-${times.getMonth()+1}-${times.getDate()}`)
            this.userInfo.birthday = `${times.getFullYear()}-${times.getMonth()+1}-${times.getDate()}`
            this.birthdays = false
        },
        // 请求
        // 提交编辑
        async editSubmit(){


            // console.log('this.userInfothis.userInfo', this.userInfo);
            // return
            this.userInfo.access_token = window.localStorage.getItem('token')
            this.userInfo.type = 2
            this.userInfo.user_id = this.userInfo.id
            // this.userInfo.province_id = 1
            // this.userInfo.city_id = 1

            console.log(JSON.parse(JSON.stringify(this.userInfo)))
            const {data:ret} = await this.$http.post(this.setApi + api.editUserInfo,this.querystring.stringify(this.userInfo))
            if(!ret.error_code){
                this.getUserInfo();
                this.$router.go(-1);
            }else{
                this.$toast(ret.error_msg);
            }
            // console.log(ret)
        }
        // - 获取个人信息
        // async getUserInfo () {
        //     const {data: ret} = await this.$http.post (this.setApi + api.userInfo,this.querystring.stringify({access_token:window.localStorage.getItem('token')}))
        //     console.log(ret)
        // }
    },
}
</script>

<style lang="less" scoped>
@import url('./editUserInfo.less');


.edit-data p {
    white-space: nowrap;
}
.block-div {
    display: flex;
    width: 100%;
    justify-content: flex-end;
}
.block-span {
    display: block;
    width: 100%;
    text-align: right;
}
</style>

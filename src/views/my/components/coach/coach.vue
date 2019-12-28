<template>
    <div id="coach">
        <head-back>
            <span class="head-title">个人信息</span>
        </head-back>
        <div class="coach">
            <div class="coach-form">
                <!-- <form-input v-model="something" :formtitle="'教练姓名'" :placeholder="'请输入您的姓名'" :type="'text'"></form-input> -->
                <!-- 姓名 -->
                <div class="form-input flex flex--align-items--center">
                    <span>姓名</span>
                    <div class="form-inp">
                        <input v-model="userInfo.truename" :disabled="true" type="text" placeholder="请先实名认证">
                    </div>
                    <van-button type="primary" v-if="userInfo.is_certification != 1" @click="toReal">去实名认证</van-button>
                </div>
                <!-- 性别选择 -->
                <div  class="form-input form-sex flex flex--justify-content--space-between flex--align-items--center">
                    <!-- @click="sexShow=true" -->
                    <span>性别</span>
                    <div class="flex flex--align-items--center">
                        <span>{{userInfo.sex == 1 ? '男' : '女'}}</span>
                        <van-icon name="arrow" color="#494949"/>
                    </div>
                </div>
                <van-popup v-model="sexShow" overlay close-on-click-overlay position="bottom">
                        <van-picker show-toolbar title="性别" @cancel="sexShow=false" @confirm="getSex" :columns="sexList"/>
                </van-popup>
                <!-- 年龄 -->
                <div class="form-input flex flex--align-items--center">
                    <span>年龄</span>
                    <div class="form-inp">
                        <input v-model="userInfo.year" :disabled="true" type="number" placeholder="请输入您的年龄">
                    </div>
                </div>
                <!-- 教龄 -->
                <div class="form-input flex flex--align-items--center">
                    <span>从业年限</span>
                    <div class="form-inp">
                        <input v-model="formData.teach_year" type="number" placeholder="请输入您的从业年限">
                    </div>
                </div>
                <!-- 从业类别 -->
                <div @click="labelShow=true" class="form-input form-sex flex flex--justify-content--space-between flex--align-items--center">
                    <span>从业类别</span>
                    <div class="flex flex--align-items--center">
                        <span>{{formData.labelName}}</span>
                        <van-icon name="arrow" color="#494949"/>
                    </div>
                </div>
                <!-- <van-actionsheet v-model="labelShow" /> -->
                <van-popup v-model="labelShow" overlay close-on-click-overlay position="bottom">
                        <van-picker show-toolbar title="从业类别" @cancel="labelShow=false" @confirm="getLabel" :columns="indexType"/>
                </van-popup>
                <!-- <van-popup class="labelShows" v-model="labelShows" overlay close-on-click-overlay position="bottom">
                    <ul>
                        <li @click="getlabels(item.id,index)" :class="quanzhongList.indexOf(item.id) != -1 ? 'active' : ''" v-for="(item, index) in labelList" :key="index">{{item.name}}</li>
                        <li class="flex">
                            <div @click="labelShows = false">取消</div>
                            <div @click="labelShows = false">确定</div>
                        </li>
                    </ul>
                </van-popup> -->
                <!-- 有效联系方式 -->
                <div class="form-input flex flex--align-items--center">
                    <span>联系方式</span>
                    <div class="form-inp">
                        <input v-model="formData.mobile" type="number" placeholder="请输入您的手机或固话">
                    </div>
                </div>
            </div>
        </div>
        <!-- 证件认证 -->
        <div class="coach-upload">
            <p>证件认证<span>温馨提示：请上传能证明您真实身份或从业资格的有效证件，以便您顺利通过审核呦</span></p>
            <ul class="coach-upimg flex flex--wrap" style="margin-right:20px;">
                <li v-for="(item, index) in formData.certificate" :key="index">
                    <img :src="item" alt="">
                    <i @click="deleteImg(index)" class="icon-delete">x</i>
                </li>
                <li>
                    <van-uploader :after-read="onRead">
                        <van-icon name="photograph" />
                    </van-uploader>
                </li>
            </ul>

        </div>
        <!-- 擅长 -->
        <div class="coach-goodat">
            <p>擅长</p>
            <van-field type="textarea" v-model="formData.master" placeholder="填写您的擅长" />
        </div>
        <!-- 自我描述 -->
        <div class="coach-evaluation">
            <p>自我描述</p>
            <van-field type="textarea" v-model="formData.desc" placeholder="填写您的评价" />
        </div>
        <div class="coach-subimt">
            <van-button type="primary" @click="coachEnter">提交</van-button>
        </div>
    </div>
</template>

<script>
import FormInput from '../../../../components/forminput/forminput';
import HeadBack from '../../../../components/headback/headback';
import api from '../../../../api/index.js';
export default {
    components:{
        FormInput,
        HeadBack
    },
    created() {

        this.getIndexType();

        // 获取个人信息
        this.getUserInfo();
    },
    data() {
        return {
            // 显示
            sexShow:false,
            labelShow:false,
            labelShows:false,
            // 数据
            indexType:[],
            labelList:[],
            sexList: ['男','女'],
            imglist:[],
            quanzhongList:[], //拳种
            userInfo: {
                truename: null
            },     // 个人信息
            formData:{
                access_token:window.localStorage.getItem('token'),
                username:'', //教练姓名
                sex:1, // 性别 1男 2女
                year:'', // 年龄
                teach_year:'', // 教龄
                desc:'', // 描述
                label_ids:'', // 拳种
                master:'', // 擅长
                certificate:[], // 图片
                labelName:'', // 拳种名
                type_id:'' ,//分类Id
                mobile:'', //联系方式
            }
        }
    },
    methods: {
        /**
         * 跳转到实名认证
         *
         */
        toReal(){
            this.$router.push({
                path:'/real'
            })
        },

        // 逻辑
        // 多选拳种
        getlabels(id,index){
            if(this.quanzhongList.indexOf(id) != -1){
                this.quanzhongList.splice(index,1)
                this.formData.label_ids = this.quanzhongList.join()
                // console.log(this.formData.label_ids)
            }else{
                this.quanzhongList.push(id)
                this.formData.label_ids = this.quanzhongList.join()
                // console.log(this.formData.label_ids)
            }
        },
        // 获取当前选择的性别并渲染到页面上 并讲弹框隐藏
        getSex(val,index){
            // console.log(index+1)
            this.formData.sex = index+1;
            this.sexShow = false;
        },
        // 拳种
        getLabel(val,index){
            // console.log(val.id)
            this.formData.labelName = val.text
            this.formData.type_id = val.id
            this.labelShow = false
            // this.getlabelList(val.id)
            // this.labelShows = true;
        },
        // 删除图片
        deleteImg(index){
            // console.log(index)
            this.formData.certificate.splice(index,1)
        },
        // 请求
        // 图片上传
        async onRead(file){
            const {data:ret} = await this.$http.post(this.setApi + api.uploaderBase64,this.querystring.stringify({fileImg:file.content}))
            this.formData.certificate.push(ret.response_data)
        },
        // 获取首页分类
        async getIndexType(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType)
            // console.log(ret.response_data.lists)
            ret.response_data.lists.forEach(item=>this.indexType.push({text:item.name,id:item.id}))
            // console.log(this.indexType)
        },
        // 获取拳种
        async getlabelList(id){
            this.quanzhongList = []
            // console.log(this.quanzhongList)
            const {data:ret} = await this.$http.post(this.setApi + api.labelList,this.querystring.stringify({type_id:id}))
            // console.log(ret)
            this.labelList = ret.response_data.lists
        },
        // 提交入住
        async coachEnter(){
            // var regName =/^[\u4e00-\u9fa5]{2,4}$/;

            let lock = false;
            this.fromData.name = this.userInfo.truename;
            this.formData.username = this.userInfo.username;
            this.formData.sex = this.userInfo.sex;
            this.formData.year = this.userInfo.year;

            // console.log(this.formData);

            Object.keys(this.formData).forEach(keys=>{
              if((this.formData[keys]=='' || this.formData[keys] == null || this.formData[keys] == 'undefined') && keys !=  'label_ids' && keys != 'username') {
                lock = true;
              }
            })

            if(lock){
               this.$toast('请填写完整信息');
              return;
            }

            // if(!regName.test(this.formData.truename)){
            //     this.$toast('您填写的姓名格式有误！');
            //     return false;
            // }

            const {data:ret} = await this.$http.post(this.setApi + api.coachEnter,this.querystring.stringify(this.formData))
            // console.log(ret)
            this.$toast('提交成功')
            this.$router.go(-1)
        },
        /**
         * 获取个人信息
         */
        async getUserInfo(){
            const {data:ret} = await this.$http.post(this.setApi + api.userInfo, this.querystring.stringify({access_token:window.localStorage.getItem('token')}));
            window.localStorage.setItem('userInfo',JSON.stringify(ret.response_data));
            console.log('获取个人信息', JSON.parse(JSON.stringify(ret.response_data)));
            this.userInfo = ret.response_data;
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./coach.less');
</style>
<style>
input:disabled {
    background: #fff;
}
</style>

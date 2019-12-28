<template>
    <div id="score-details">
        <head-back>
            <span class="head-title">
                评分
            </span>
        </head-back>

        <div class="score-details">
            <div class="top" v-if="curScoreData && curScoreData.grade_end_time">
                评分截止：{{curScoreData.grade_end_time}}
            </div>
            <div class="content" v-if="curScoreData">
                <img v-if="curScoreData.is_img == 0" :src="curScoreData.works_url" alt="">
                <video style="width:100%" v-else controls :src="curScoreData.works_url"></video>
            </div>
            <!-- 上一个 下一个 -->
            <div class="options flex flex--justify-content--space-between">
                <div @click="switchCompe(1)"><span><i class="iconfont icon-shang"></i>上一个</span></div>
                <div @click="switchCompe(2)"><span><i class="iconfont icon-xia"></i>下一个</span></div>                
            </div>
            <div style="text-align: center;padding-bottom: 15px;" class="flex oneLineCenter" @click="openPicker">
                <div>参赛者：</div>
                <!-- <p style="margin-right: 20px;">{{curScoreData.user_name}}</p> -->
                <p style="margin-right: 20px;">***</p>
                <div>参赛项目：</div>
                <p>{{curScoreData.type_name}}</p>
            </div>
            <div  class="flex" @click="openPicker">
            </div>
            <!-- 打分框 -->
            <div class="scoreInput flex" @click="openPicker">
                <div>打分</div>
                <input :disabled="type != 4" v-model="grade" type="number" placeholder="1至10分">
            </div>

            <!-- 语音评分 -->
            <!-- <div class="voice scoreInput flex">
                <div>语音评价</div>
                <a href="javascript:void(0)"  @touchstart="startRecord"  @touchend="stopRecord" class="flex flex--justify-content--center--align-items--center">按住说话</a>
            </div> -->

            <!-- 意见 -->
            <div class="sugg">
                <textarea :disabled="type != 4" v-model="comment" placeholder="请填写评语"></textarea>
            </div>

            <div @click="submit()" v-if="type == 4" class="button">
                提交评分
            </div>


            <!-- 选择分数 -->
            <div class="mask" v-if="showPicker"></div>
            <div class="picker-score flex flex--row" :class="{'show': showPicker}">
                <div class="flex confire-btn flex--justify-content--space-between flex--align-items--center">
                    <a href="javascript:void(0)" @click="openPicker">取消</a>
                    <a href="javascript:void(0)" @click="openPicker">确认</a>
                </div>
                <van-picker :columns="columns" @change="onChange" />
            </div>

        </div>
    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback';
import api from '@/api';
import { Picker } from 'vant';
import Record from "./record-sdk";


export default {
    components:{
        HeadBack,
        Picker
    },
    created() {
        // console.log('this.$routethis.$route', this.$route.params.id);
        // this.apply_id = this.$route.params.id;
        this.id = this.$route.params.id.split('&')[0];
        this.type = this.$route.params.id.split('&')[1];

        this.getScoreDetail();
    },
    mounted(){
        // 初始化plus
  
    },
    data() {
        return {
            scoreData: [],
            curScoreData: null,
            apply_id: '',
            grade:'',       // 分数
            comment: '',
            voice: '',
            curShowScore: 0,
            showPicker: false,
            columns: ['1分', '2分', '3分', '4分', '5分', '6分', '7分', '8分', '9分', '10分'],      // picker组件选择
            recorder: new Record(),
            id: 0,      // 详情id
            type: 4,    // 4 待评分  5 已评分   6 逾期未评分
        }
    },
    methods: {
        /**
         * 开始录音
         */
        startRecord: function() {
            // console.log("start to record now.");
            let self = this;
            self.isFinished = false;
            self.recorder.startRecord({
                success: res => {
                    console.log("开始录音.成功", res);
                },
                error: res => {
                    console.log("开始录音.错误", res);
                }
            });
        },

        /**
         * 停止录音
         */
        stopRecord: function() {
            // console.log("现在停止");
            let self = this;
            self.isFinished = false;
            self.recorder.stopRecord({
                success: res => {
                    //此处可以获取音频源文件(res)，用于上传等操作
                    // console.log("停止录音.成功", res);
                    this.upVideo(res);


                },
                error: res => {
                    console.log("停止录音.错误", res);
                }
            });
        },

        /**
         * 上传录音
         */
        async upVideo(files){

            let _this = this;
            var formData = new FormData();
            formData.append('file', files);
            formData.append('id', this.apply_id);
            formData.append('type', 1);                                 // 表示赛事上传作品
            const {data: ret} = await this.$http.post(this.setApi + api.zuopinUp,formData,{
                onUploadProgress(res){
                    // plus.nativeUI.alert(JSON.stringify(res),null,'测试1');
                    // console.log('==========上传音频文件==========', res);
                    if(res.total > 262144000) return this.$toast('文件已经超出限制');
                    // if(jindu == 100) return _this.$toast('上传成功');
                    // _this.lineShow = false;
                }
            
            })
            plus.nativeUI.alert(JSON.stringify(ret),null,'测试1');
            // console.log('=================', ret);
            if(!ret.error_code){
                _this.$toast('上传成功');
            }else{
                _this.$toast('上传失败，稍后再试');
            }
        },

        /**
         * 播放录音
         */
        play: function() {
            console.log("play record now.");
            let self = this;
            self.isFinished = true;
            self.audio = document.querySelector("audio");
            self.recorder.play(self.audio);
        },

        /**
         * 选择
         */
        openPicker(){
            if(this.type != 4){
                // this.$toast('已限制评分')
                return;
            }
            
            this.showPicker = !this.showPicker;
            // console.log('============', this.grade);
        },

        /**
         * pisker选择分数
         */
        onChange(picker, value, index) {
            // this.$toast(`当前值：${value}, 当前索引：${index}`);
            this.grade = Number(index) + 1; 
        },

        /**
         * 赛事中的作品切换
         * @param {*} type  1表示上一页  2表示下一页
         */
        switchCompe(type){
            if(type == 1){
                // 上一页
                this.curShowScore --;
            }else{
                // 下一页
                this.curShowScore ++;
            }

            if(this.curShowScore <= 0){
                this.curShowScore = 0;
                this.$toast('已经是第一个');
            }else{
                if(this.curShowScore >= this.scoreData.length - 1){
                    this.curShowScore = this.scoreData.length - 1;
                    this.$toast('已经是最后一个');
                }
            }


            this.curScoreData = this.scoreData.length > 0 ? this.scoreData[this.curShowScore] : null;
            this.apply_id = this.curScoreData.apply_id;
            // console.log('当前的值', this.curScoreData)
        },

        /**
         * 获取赛事中的作品
         */
        async getScoreDetail(){
            const {data:ret} = await this.$http.post(this.setApi + api.scoredetails,this.querystring.stringify({
                access_token:window.localStorage.getItem('token'),
                competition_id: this.$route.params.id.split('&')[0]
            }))
            console.log(ret)
            // 评分列表
            this.scoreData = ret.response_data.lists;
            this.curScoreData = ret.response_data.lists ? ret.response_data.lists[this.curShowScore] : [];
            this.apply_id = this.curScoreData.apply_id;
        },

        async submit(){
            // if(this.type != 4){
            //     this.$toast('已限制评分')
            //     return;
            // }

            if(this.grade < 0 || this.grade > 10){
                this.$toast('请正确输入评分格式')
                return
            }

            if(!this.grade || !this.comment){
                this.$toast('请正确输入评分格式')
                return
            }

            let params = {
                apply_id: this.apply_id,
                grade: this.grade,
                comment: this.comment,
                voice: this.voice,
                access_token: window.localStorage.getItem('token')
            }
            const {data:ret} = await this.$http.post(this.setApi + api.scoreEvent,this.querystring.stringify(params));
            this.$toast('评分提交成功');
            // this.$router.go(-1);
            this.$router.push(`/my/event/score?type=1`);
            // console.log(ret);
        },

        


        


    },
}
</script>

<style lang="less" scoped>
@import url('./scoredetail.less');
.voice {
    a {
        color: #333;
        width: 70%;
        height: 3.125rem;
    }
}

.picker-score {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    transform: translateY(100%);
    transition: 0.4s ease;
}
.picker-score.show {
    transform: translateY(0);
}
.picker-score a {
    color: #333;
    font-size: .875rem;
}
.confire-btn {
    background: #fff;
    padding: 1.25rem;
}
.mask {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
}
#score-details .score-details .scoreInput input {
    color: #333;
}
.scoreInput {
    font-size: .875rem;
}
</style>


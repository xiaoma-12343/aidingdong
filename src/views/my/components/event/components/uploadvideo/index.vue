<template>
    <div id="upvideo">
        <head-back>
            <span class="head-title">上传作品</span>
        </head-back>
        <div class="upvideo">
            <div class="uptitle">本地上传</div>
            <div class="options">
                <label for="uploads">
                    <div class="up">
                        <p>+</p>
                        <span>{{textToast}}</span>
                    </div>
                </label>
                <input type="file" @change="onRead" v-show="false" id="uploads">
                <p class="again" @click="clear">重新上传</p>
                <div v-if="showOperated" class="video flex flex--justify-content--space-between flex--align-items--center">
                    <div class="flex flex--align-items--center">
                        <img class="video-file" src="../../../../../../assets/video-file.png" alt="文件">
                        <p>{{files.name}}</p>
                    </div>
                    <div @click="clear" class="close flex flex--align-items--center">
                        <img class="video-close" src="../../../../../../assets/icon/close.png" alt="">
                    </div>
                </div>
                <div @click="upVideo" class="submit">
                    上传作品
                </div>
                <!-- <div class="button" @click="$router.push(`/my/event/email`)">
                    邮箱上传
                </div> -->
            </div>
            <!-- 进度条 --> 
            <div v-show="lineShow" class="jindutiao">
                <p>{{jindu}}</p>
                <div ref="jinduline"></div>
            </div>
            <div class="shuoming flex">
                <img src="../../../../../../assets/icon/tanhao.png" alt="">
                <p>
                    如果您的作品文件过大过长，请将文件发送到我们的邮箱平台客服帮您上传。<br/>
                    邮箱地址：1442801340@qq.com<br/>
                    平台客服电话：010-69385122，69389836<br/>
                </p>
            </div>
        </div>
        <input type="hidden" name="video" id="video">
                        <iframe id="iFrame1" name="iFrame1" width="100%" height="250px"  frameborder="0" src="http://aidingdong_admin.taijichn.com/Ossupload/index.html"></iframe>

        <loading v-if="showLoading" />
    </div>
</template>

<script>
import { Toast } from 'vant';
import HeadBack from '@/components/headback/headback';
import loading from '@/components/loading';
import api from '@/api';

export default {
    components:{
        HeadBack,
        loading
    },
    data() {
        return {
            files:null,
            showOperated: false,
            lineShow:false,
            jindu:'0%',
            textToast:'添加视频/图片',
            eventInfo: JSON.parse(window.sessionStorage.getItem('eventDetails')),
            showLoading: false
        }
    },
    created(){
        console.log('eventInfo===', this.eventInfo);
    },
    methods: {
        /**
         * 清楚待上传区视频
         */
        clear(){
            this.showOperated = false;
            this.files = null;
        },

        /**
         * 获取准备上传的文件
         */
        onRead(e){
            this.files = document.querySelector('#uploads').files[0];
            this.showOperated = true;
            // console.log('-----------------', e);
            // console.log('=================', this.files);
            this.$toast('已添加待上传区');
            // this.upVideo();
        },

        /**
         * 上传作品
         */
        async upVideo(){
            let _this = this;
            let times = 0;
            let success = 0;

            if(!this.files){
                this.$toast('请先添加上传文件');
                return;
            }
            // this.showLoading = true;
            
            let timeClire = Toast.loading({
                duration: 0,       // 持续展示 toast
                forbidClick: true, // 禁用背景点击
                loadingType: 'spinner',
                mask: true,
                message: times + '%'
            });

            _this.showLoading = false;

            let timer = setInterval(() => {
                times++;
                timeClire.message = times + '%';
                if(times == 99){
                    clearInterval(timer);
                    // if(success == 0){
                    //     timeClire.message = '上传失败，请重试！'
                    // }else{
                    //     timeClire.message = '上传成功！'
                    // }

                    // setTimeout(() => {
                    //     Toast.clear();
                    // }, 500);
                }

            }, 50);

            // this.lineShow = true;
            var formData = new FormData();
            formData.append('file', this.files);
            formData.append('id', this.eventInfo[0].identity_number);
            formData.append('type', 1);       // 表示赛事上传作品
            const {data:ret} = await this.$http.post(this.setApi + api.zuopinUp,formData,{
                onUploadProgress(res){
                    if(res.total > 262144000) return this.$toast('文件已经超出限制');
                    // let jindu = Math.floor((res.loaded / res.total) * 100 );
                    // _this.jindu = `${jindu}%`;
                    // _this.$refs.jinduline.style.width = `${jindu}%`;
                    // if(jindu == 100) return _this.$toast('上传成功');
                    _this.lineShow = false;
                }
            
            })

            Toast.clear();

            if(!ret.error_code){
                success = 1;
                _this.textToast = '已添加';
                timeClire.message = '上传成功！'
                this.showLoading = false;
                _this.$router.go(-2);
            }else{
                success = 0;
                 _this.textToast = '';
                timeClire.message = '上传失败，请重试！'
                _this.$router.go(-2);
            }
        }

    },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
.video .video-close,
.video .video-file {
    display: block;
    width: 20px;
}
.video .video-file {
    margin-right: 10px;
}
.video {
    font-size: 12px;
    padding: 20px 0;
}
</style>


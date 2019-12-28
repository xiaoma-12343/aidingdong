<template>
    <div id="send">
        <head-back :lefticon="'cross'" :isshow="false">
            <span class="head-right" @click="submitSay">
                发布
            </span>
        </head-back>
        <div class="send">
            <textarea v-model="content" placeholder="请输入作品描述"></textarea>
            <div @click="topicShow = true" class="select-topic flex flex--align-items--center flex--justify-content--space-between">
                <p><span># 选择作品分类</span> {{selectName}}</p>
                <van-icon name="arrow" size="10px"/>
            </div>
            <van-popup v-model="topicShow" overlay close-on-click-overlay position="bottom">
                <van-picker show-toolbar title="分类选择" @cancel="topicShow = false" @confirm="pushList" :columns="indexType"/>
            </van-popup>
            <label for="files">
                <div>
                    <p>+</p>
                    <span>上传作品</span>
                    <img v-if="sub_url != null" :src="sub_url" alt="">
                </div>
            </label>
            <input v-show="false" type="file" id="files" @change="selectFile">
        </div>
        <div v-show="jdshow" class="jindutiao">
            <div></div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
import api from '../../api'
import {formData} from '../../utils/formdata.js'
export default {
    components:{
        HeadBack
    },
    created() {
        // this.$toast('已欠费暂时上传不了作品'),
        // this.$router.go(-1)
        this.getIndexType()
    },
    data() {
        return {
            jdshow:false,
            content:null,
            url:null,
            topicShow:false,
            indexType:[],
            indexTypeId:'',
            selectName:null,
            sub_url:null
        }
    },
    methods: {
        pushList(e){
            console.log(e)
            this.selectName = e.text
            this.indexTypeId = e.id
            this.topicShow = false
        },
        // 获取类型
        async getIndexType(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType,this.querystring.stringify({
                access_token:window.localStorage.getItem('token')
            }))
            console.log('indextype',ret)
            ret.response_data.lists.forEach(item=>this.indexType.push({text:item.name,id:item.id}))
        },
        // 上传视频 或 图片
        async selectFile(e){
            let _this = this
            let files = document.querySelector('#files').files[0]
            console.log(files)
            let params = [
                {
                    key:'file',
                    value:files
                },
                {
                    key:'id',
                    value:JSON.parse(window.localStorage.getItem('userInfo')).id
                }
            ]
            const {data:ret} = await this.$http.post(this.setApi + api.zuopinUp,formData(params),{
                onUploadProgress(res){
                    _this.jdshow = true
                    console.log(res,Math.floor((res.loaded / res.total)*100))
                    document.querySelector('.jindutiao div').style.width = `${Math.floor((res.loaded / res.total)*100)}%`
                    if(Math.floor((res.loaded / res.total)*100) == 100) return _this.$toast('正在解码中...'),_this.jdshow = false
                }
            })
            console.log(ret)
            this.url = ret.response_data.file
            this.sub_url = ret.response_data.sub_video
            this.$toast('上传成功')
        },
        // 发布
        async submitSay (is_video=0){
            if(this.url == null || this.content == null || this.selectName == null) return this.$toast('请填写完整内容')
            const {data:ret} = await this.$http.post(this.setApi + api.myzuopinup,this.querystring.stringify({
                is_video:0,
                access_token:window.localStorage.getItem('token'),
                type_id:this.indexTypeId,
                url:this.url,
                content:this.content,
                imgurl:this.sub_url
            }))
            console.log(ret)
            this.$toast('发表成功')
            this.$router.go(-1)
        }
    },
}
</script>


<style lang="less" scoped>
@import url('./send.less');
</style>



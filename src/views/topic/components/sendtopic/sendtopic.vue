<template>
    <div id="send-topic">
        <head-back :lefticon="'cross'" :isshow="false">
            <span @click="sendTopic" class="head-right">
                发布
            </span>
        </head-back>
        <div class="send-topic">
            <div class="send-text">
                <textarea class="sendtext" v-model="content" placeholder="输入图文描述"></textarea>            
                <div @click="topicShow = true" class="select-topic flex flex--align-items--center flex--justify-content--space-between">
                    <p><span># 选择话题</span> {{selectName}}</p>
                    <van-icon name="arrow" size="10px"/>
                </div>
                <van-popup v-model="topicShow" overlay close-on-click-overlay position="bottom">
                    <van-picker show-toolbar title="话题选择" @cancel="topicShow = false" @confirm="pushList" :columns="allTopicList"/>
                </van-popup>
                <ul class="send-img flex flex--wrap">
                    <li class="send-imgs" v-for="(item, index) in uploadImg" :key="index">
                        <div class="imglists flex flex--justify-content--center flex--align-items--center"><img :src="item" alt=""></div>
                        <van-icon @click="deleteImg(index)" name="cross" color="#fff" size="6px"/>
                    </li>
                    <li>
                        <van-uploader :after-read="getUpload">
                            <van-icon name="photograph" />
                            <p>添加图片</p>
                        </van-uploader>
                    </li>
                </ul>
            </div>            
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getTopicList()
    },
    mounted() {
        console.log(this.topic_type_id)
    },
    data() {
        return {
            uploadImg:[],
            content:null,
            userId:JSON.parse(window.localStorage.getItem('userInfo')).id,
            topic_type_id:null,
            topicShow:false,
            allTopicList:[],
            selectName:'(选合适的话题会被更多人看到)',
            isSend:false
        }
    },
    methods: {
        // 逻辑
        pushList(value,index){
            console.log(value.id)
            this.topic_type_id = value.id
            this.selectName = value.text
            this.topicShow = false
        },
        // 删除图片
        deleteImg(index){
            // console.log(index)
            this.uploadImg.splice(index,1)
        },
        // 请求 
        // 上传图片
        async getUpload(file){
            // console.log(file)
            const {data:ret} = await this.$http.post(this.setApi + api.uploaderBase64,this.querystring.stringify({fileImg:file.content}))
            // console.log(ret.response_data)
            this.uploadImg.unshift(ret.response_data);
        },
        async getTopicList(){
            const {data:ret} = await this.$http.post(this.setApi + api.topicList,this.querystring.stringify({type_id:'all',access_token:window.localStorage.getItem('token')}))
            console.log(ret)
            ret.response_data.lists.forEach(item=>this.allTopicList.push({text:item.topic_type_name,id:item.id}))
            // this.allTopicList = list
            console.log(this.allTopicList)
            
        },
        // 发布
        async sendTopic(){
            if(this.content == null || this.topic_type_id == null) return this.$toast('您有内容未填')
            if(this.isSend) return
            const {data:ret} = await this.$http.post(this.setApi + api.addTopic,this.querystring.stringify({content:this.content,img:this.uploadImg.length <= 0 ? null:this.uploadImg.join(),user_id:this.userId,topic_type_id:this.topic_type_id}))
            // console.log(ret)
            this.isSend = true
            if(!ret) return
            this.$toast("发布成功");
            this.$router.replace(`/topic/detail/${this.topic_type_id}`)
        }

    },
}
</script>


<style lang="less" scoped>
@import url('./sendtopic.less');
</style>

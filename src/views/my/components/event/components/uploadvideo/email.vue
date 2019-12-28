<template>
    <div id="upvideo">
        <head-back>
            <span class="head-title">上传作品</span>
        </head-back>
        <div class="upvideo">
            <div class="uptitle">邮箱提交</div>
            <div class="options">
               <div class="emailinput">
                   <input type="text" name="email" placeholder="输入邮箱地址">
               </div>
                <div class="submit">
                    提交
                </div>
            </div>
            
            <div class="shuoming flex">
                <img src="../../../../../../assets/icon/tanhao.png" alt="">
                <p>
                    如果您的作品文件过大过长，请将文件发送到我们的邮箱平台客服帮您上传。<br/>
                    邮箱地址：1442801340@qq.com<br/>
                    平台客服电话：010-69385122，69389836<br/>
                    邮箱标题的格式：赛事名称+报名姓名+报名手机号<br/>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '@/components/headback/headback'
import api from '@/api'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            
        }
    },
    methods: {
        onRead(e){
            
            let file = document.querySelector('#uploads').files[0]
            console.log(e,file)
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>


<template>
    <div id="student">
        <head-back>
            <span class="head-title">
                我的学员
            </span>
        </head-back>
        <ul class="student">
            <li v-for="(item, index) in studentRetList" :key="index">
                <!-- 头像 用户名 -->
                <div class="student-easyinfo flex flex--align-items--center">
                    <img :src="item.head" alt="">
                    <span>{{item.username}}</span>
                </div>
                <!-- 课程列表 -->
                <ul>
                    <li v-for="(item, index) in 2" :key="index">
                        <div class="flex flex--justify-content--space-between">
                            <span>深度教程</span>
                            <span>到期时间：2019-10-1</span>
                        </div>
                        <div class="flex flex--justify-content--space-between">
                            <span>未上课：48</span>
                            <span>未上课：48</span>
                        </div>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '../../../../api/index.js'
import HeadBack from '../../../../components/headback/headback'
export default {
    components:{
        HeadBack,
    },
    created() {
        this.getStudentList()
    },
    data() {
        return {
            studentRetList:[]
        }
    },
    methods: {
        // 逻辑



        // 请求
        async getStudentList(){
            const {data:ret} = await this.$http.post(this.setApi + api.studentList,this.querystring.stringify({access_token:window.localStorage.getItem('token')}))
            // console.log(ret.response_data.lists)
            this.studentRetList.push(ret.response_data.lists)
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./student.less');
</style>

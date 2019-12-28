<template>
    <div id="course">
        <head-back :isshow="false">
            <span class="head-title">
                我的课程
            </span>
            <span class="head-addcourse">添加课程</span>
        </head-back>
        <ul class="course">
            <li v-for="(item, index) in courseList" :key="index">
                <div class="course-top">
                    <p>深度教程</p>
                    <div class="course-info flex">
                        <div class="course-imgs">
                            <img :src="item.img" alt="">
                        </div>
                        <div>
                            <p>{{item.name}}</p>
                            <p>{{item.introduce}}</p>
                            <p>&yen;{{item.unit_price}}/{{item.duration}}小时/课</p>
                        </div>
                    </div>
                </div>
                <div class="course-btn flex flex--align-items--center flex--justify-content--end">
                    <van-button plain type="primary">下架</van-button>
                    <van-button type="primary">看评价</van-button>
                </div>
            </li>
        </ul>
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
        this.getCourseList()
    },
    data() {
        return {
            courseList:[]

        }
    },
    methods: {
        

        // 请求
        async getCourseList(){
            const {data:ret} = await this.$http.post(this.setApi + api.courseList,this.querystring.stringify({access_token:window.localStorage.getItem('token')}))
            console.log(ret.response_data)
            this.courseList = ret.response_data.lists
        }  
    },
}
</script>

<style lang="less" scoped>
@import url('./course.less');
</style>

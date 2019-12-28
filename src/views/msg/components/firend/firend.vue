<template>
    <div id="firend">
        <head-back>
            <span class="head-title">
                联系人
            </span>
        </head-back>
        <div class="firend">
            <div class="search-input">
                <form action="javascript:;">
                    <input type="search" placeholder="寻找生活中的精彩" name="search" id="search">
                    <i class="iconfont icon-sousuo"></i>
                </form>
            </div>

            <!-- 联系人列表 -->
            <ul class="contact" v-if="contactList.length > 0">
                <li v-for="(item, index) in contactList" :key="index">
                    <div class="userinfo flex flex--align-items--center">
                        <img :src="item.head" alt="">
                        <div>
                            <p>{{item.nickname}}</p>
                            <span>{{item.signature}}</span>
                        </div>
                    </div>
                </li>
            </ul>

            <div v-else class="no-thing">
                <p>暂无联系人~</p>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api'
export default {
    components:{
        HeadBack
    },
    created() {
        this.getContact()
    },
    data() {
        return {
            contactList:[]
        }
    },
    methods: {
        async getContact(){
            const {data:ret} = await this.$http.post(this.setApi + api.msginfo,this.querystring.stringify({
                access_token:window.localStorage.getItem('token'),
                type:4
            }))
            // console.log(ret)
            if(!ret.error_code){
                this.contactList = ret.response_data.lists
            }else{
                this.$toast('请先登录')
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./filrend.less');
.no-thing {
    padding: 1.875rem;
    text-align: center;
    font-size: 1.125rem;
    padding-top: 4.5rem;
}
</style>


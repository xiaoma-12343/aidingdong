<template>
    <div id="interest">
        <head-back>
			<span class="head-title">
				选择感兴趣的内容
			</span>
		</head-back>
        <!-- <h2>选择您感兴趣的内容</h2> -->
        <span>私人订制，只看您感兴趣的</span>

        <div class="top-select">
            <ul class="interest flex flex--wrap">
                <li class="flex oneLineStart" v-for="(item, index) in selectArr" :key="index">
                    <span class="select-name">{{item.name}}</span>
                    <span @click="deleteSelect(item, index)">
                        <van-icon name="close" />
                    </span>
                </li>
            </ul>
        </div>

        <ul class="interest flex flex--wrap oneLineBetween">
            <li @click="selected(item)" v-for="(item, index) in indexType" :key="index">
                <div>
                    <img class="interest-img" :src="item.img" alt="">
                    <!-- <div :class="['gren',select.indexOf(item.id) != -1 ? 'active' : '' ]"></div> -->
                </div>
                <span>{{item.name}}</span>
            </li>
        </ul>

        <div @click="getAttentions" class="button">
            选择关注
        </div>
    </div>
</template>

<script>
import api from '../../api';
import {getAttention} from '../../api/apiEvent.js';
import HeadBack from '@/components/headback/headback';
export default {
    components: {
        HeadBack
    },
    created(){
        // 获取定制分类
        this.getIndexType2();

        // 获取全部导航分类
        this.getIndexType();
    },
    data() {
        return {
            indexType:[],
            select:[],
            selectArr: []
        }
    },
    methods: {
        /**
         * 删除当前选项
         */
        deleteSelect(obj, index){
            this.selectArr.splice(index, 1); 
        },

        /**
         * 获取首页的分类导航
         */
        async getIndexType2(){
        const {data:ret} = await this.$http.post(this.setApi + api.indexType, this.querystring.stringify({access_token:window.localStorage.getItem('token')}))

        this.selectArr = ret.response_data.lists;

        },

        /**
         * 选择当前标题
         */
        selected(obj){
            // if(this.select.indexOf(obj.id) != -1){
            //     this.select.splice(this.select.indexOf(obj.id),1)
            // }else{
            //     this.select.push(obj.id)
            // }

            let lock = true;
            this.selectArr.forEach(item => {
                if(item.id == obj.id){
                    lock = false;
                }
            })

            if(lock){
                this.selectArr.push(obj);
            }else{
                this.$toast('已经添加过该选项！');
                return
            }

        },

        /**
         * 获取全部导航
         */
        async getIndexType(){
            const {data:ret} = await this.$http.post(this.setApi + api.indexType)
            // console.log(ret)
            this.indexType = ret.response_data.lists
        },

        /**
         * 修改首页导航标题
         */
        async getAttentions(){

            let selectIds = [];
            this.selectArr.forEach(item => {
                selectIds.push(item.id);
            })

            let ret = await getAttention(5, selectIds.join());

            if(!ret.error_code){
                this.$toast('修改成功！');
                this.$router.go(-1);
            }else{
                this.$toast(ret.error_msg);
            }

            // console.log('retretretret', ret);

        }
    },
}
</script>

<style lang="less" scoped>
@import url('./interest.less');
#interest .interest li > div img {
    display: block;
    width: 4.9375rem;
    height: 4.9375rem;
}
</style>


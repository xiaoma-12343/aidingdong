<template>
    <div class="head-back">
        <!-- <i @click="$router.go(-1)" class="icon-back"></i> -->
        <van-icon v-show="showback" @click="$router.go(-1);$router.isBack = true;" :color="color" size="20px" :name="lefticon" />
        <slot></slot>
        <!-- <i v-show="searchicon" class="icon-search"></i> -->
        <van-icon @click="$router.push('/search/event')" v-show="searchicon" name="search" size="20px" color="#494949"></van-icon>
        <i class="icon-search1" v-show="isshow" v-if="!searchicon"></i>
    </div>
</template>

<script>
export default {
    name:'search',
    data() {
        return {
            // search:this.props.searchicon
        }
    },

    props:{
        searchicon:{
            type:Boolean,
            required:false,
            default:false
        },
        isshow:{
            type:Boolean,
            required:false,
            default:true,
        },
        color:{
            type:String,
            required:false,
            default:'#494949'
        },
        lefticon:{
            type:String,
            required:false,
            default:'arrow-left'
        },
        showback:{
            type:Boolean,
            required:false,
            default: true
        }
    },

    created() {
      
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
@import url('./headback.less');
</style>

<template>
    <div class="optType pt275">
        <head-back >
            <span class="head-title">入驻类别</span>
        </head-back>

        <div class="flex flex--row">
            <div @click="jumpUrl(1)" class="box-list flex flex--align-items--center flex--justify-content--space-between">
                <p>
                    单位入驻
                </p>
                <p>
                    <van-icon name="arrow"/>
                </p>
            </div>
            <div @click="jumpUrl(2)" class="box-list flex flex--align-items--center flex--justify-content--space-between">
                <p>
                    个人入驻
                </p>
                <p>
                    <van-icon name="arrow"/>
                </p>
            </div>
        </div>


    </div>
</template>
<script>
import HeadBack from '@/components/headback/headback';
export default {
    data(){
        return {}
    },
    methods: {
        /**
         * 跳转页面
         * @param {*} type  跳转页面类型
         */
        jumpUrl(type){
            switch(type){
                case 1:
                    this.$router.push({
                        path: '/my/store'
                    })
                break;
                case 2:
                    this.$router.push({
                        path: '/my/coach'
                    })
                break;
            }
        },
    },
    components: {
        HeadBack
    }
}
</script>
<style>
.pt275 {
    padding-top: 2.75rem;
}
.box-list {
    padding: .6rem .8rem;
    border-bottom: 1px solid #f5f5f5;
}
</style>
<template>
    <div id="storement">
        <head-back>
            <span class="head-title">
                门店管理
            </span>
        </head-back>
        <div class="storement">
            <div @click="$router.push('/my/store/colist')" class="ment-list flex flex--justify-content--center flex--align-items--center">
                <div>
                    门下教练
                </div>
            </div>

            <!-- <div class="ment-list flex flex--justify-content--center flex--align-items--center">
                <div>
                    门店信息
                </div>
            </div>

            <div class="ment-list flex flex--justify-content--center flex--align-items--center">
                <div>
                    保证金
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../../../components/headback/headback'
export default {
    components:{
        HeadBack
    },
    data() {
        return {
            
        }
    },
    methods: {
        
    },
}
</script>

<style lang="less" scoped>
@import url('./sotrement.less');
</style>

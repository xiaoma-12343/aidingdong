<template>
    <div class="form-input flex flex--align-items--center">
        <span>{{formtitle}}</span>
        <div class="form-inp">
            <input :type="type" :placeholder="placeholder">
        </div>
    </div>
</template>

<script>
export default {
    name:'frominput',
    data() {
        return {
            
        }
    },
    props:{
        formtitle:{
            type:String,
            required:false
        },
        placeholder:{
            type:String,
            required:false
        },
        type:{
            type:String,
            required:false
        }
    }
}
</script>

<style lang="less" scoped>
@import url('./forminput.less');
</style>

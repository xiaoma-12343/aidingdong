<template>
    <div id="guide">

    </div>
</template>

<script>
export default {
    mounted() {
      setTimeout(()=>{
          this.$router.push('/home')
      },3000)  
    },
}
</script>

<style lang="less" scoped>
#guide{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url('../../assets/yindao.png') no-repeat center/100%;
}
</style>

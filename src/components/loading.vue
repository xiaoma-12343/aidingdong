<template>
    <div class="loading-com flex flex--justify-content--center--align-items--center">
        <loading size="40px" color="#fff" type="spinner" />
    </div>
</template>
<script>
import { Loading } from 'vant';
export default {
    components: {
        Loading
    },
    data(){
        return {}
    }
}
</script>
<style>
.loading-com {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999999;
    background: rgba(0,0,0,0.6);
}
</style>

<template>
    <div id="addsite">
        <head-back>
            <span class="head-title">
                添加地址
            </span>
        </head-back>
        <div class="addsite">
            <!-- 定位 -->
            <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
                src="https://apis.map.qq.com/tools/geolocation?key=P4MBZ-FEH3V-ZFTPE-UHEXB-ZKZ5V-WIFKB&referer=aidd">
            </iframe>
            <div class="site-select flex flex--align-items--center flex--justify-content--space-between">
                <span>地址</span>
                <span class="flex">{{province}} {{city}}<i class="iconfont icon-youjiantou"></i></span>
            </div>
            <div class="site-select flex flex--align-items--center flex--justify-content--space-between">
                <span>详细地址</span>
                <input type="text" placeholder="请输入详细地址" v-model="detailInput">
            </div>
        </div>

        <div class="save-site">
            <van-button @click="saveSite" type="primary">保存地址</van-button>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
import map from '../../../../utils/map.js';
export default {
    components:{
        HeadBack
    },
    mounted() {
        this.getSite()
        // var geolocation = new qq.maps.Geolocation('P4MBZ-FEH3V-ZFTPE-UHEXB-ZKZ5V-WIFKB','aidd')
        // console.log(geolocation)
    },
    data() {
        let self = this
        return {
            lng:'',
            lat:'',
            province:'正在获取定位',
            city:'',
            detailInput:'田羽12号'
        }
    },
    methods: {
        // 逻辑
        // 获取定位
        getSite(){
            window.addEventListener('message', (event) => {
                // 接收位置信息
                var loc = event.data;
                this.$nextTick(()=>{
                    this.lng = loc.lng
                    this.lat = loc.lat
                    this.province = loc.province
                    this.city = loc.city
                    // console.log('location', loc);
                    console.log(this.lng,this.lat)
                })  
            }, false);
        },

        // 请求
        async saveSite(){
            const {data:ret} = await this.$http.post(this.setApi + api.addSiteList,this.querystring.stringify({address:this.detailInput,lng:this.lng,lat:this.lat,access_token:window.localStorage.getItem('token')}))
            console.log(ret.response_data.lists)
            if(ret.response_data.lists == null) {
                this.$router.go(-1)
            }
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./addsite.less');
</style>


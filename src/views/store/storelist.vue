<template>
    <div id="store">
        <head-back>
            <span class="head-title">
                全部门店
            </span>
        </head-back>
        <div class="store">
            <iframe id="geoPage" width=0 height=0 frameborder=0  style="display:none;" scrolling="no"
                src="https://apis.map.qq.com/tools/geolocation?key=P4MBZ-FEH3V-ZFTPE-UHEXB-ZKZ5V-WIFKB&referer=aidd">
            </iframe>
            <div class="store-search flex flex--justify-content--space-between flex--align-items--center">
                <span>{{city}}</span>
                <div class="search-input">
                    <input type="text" name="search" placeholder="搜索你需要的商品热门关键词">
                    <i class="icon-search"></i>
                </div>
                <span>共{{storeLists.length}}条</span>
            </div>
            <ul class="store-list">
                <li @click="$router.push(`/store/detail/${item.id}/${lng}/${lng}`)" class="flex flex--justify-content--space-between flex--align-items--center" v-for="(item, index) in storeLists" :key="index">
                    <div class="list-img">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="list-content">
                        <p>{{item.name}}</p>
                        <p>
                            {{item.content}}
                        </p>
                    </div>
                    <p>{{item.juli}}km</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import HeadBack from '../../components/headback/headback'
import api from '../../api/index.js'
export default {
    components:{
        HeadBack
    },
    mounted() {
        this.getSite()

    },
    data() {
        return {
            lng:'116.40',
            lat:'39.90',
            city:'获取中',
            storeLists:[]
        }
    },
    methods: {
        // 逻辑
        getSite(){
            window.addEventListener('message', (event) => {
                // 接收位置信息
                var loc = event.data;
                this.lng = loc.lng
                this.lat = loc.lat
                this.city = loc.city
                this.$nextTick(()=>{
                    this.getStoreList()
                })  
            }, false);
        },

        // request
        async getStoreList(){
            const {data:ret} = await this.$http.post(this.setApi + api.storeList,this.querystring.stringify({lng:this.lng,lat:this.lat}))
            // console.log(ret.response_data.lists)
            this.storeLists = ret.response_data.lists
        }
    },
}
</script>

<style lang="less" scoped>
@import url('./storelist.less');
</style>

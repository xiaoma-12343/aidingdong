<template>
    <div id="search">
        <!-- 搜索输入框 -->
        <div class="search-input flex flex--align-items--center">
            <form action="javascript:;">
                <input @keyup.enter="searchPost" v-model="searchinput" v-text="searchBtn" autofocus type="search" class="van-field" placeholder="寻找生活中的精彩">
            </form>
            <div class="font30 flex flex--align-items--center">
                <i v-show="this.searchinput.length <= 0" @click="startRecognize" class="iconfont icon-htmal5icon13"></i>
            </div>
            <van-icon name="search" color="#8E8E93"></van-icon>
            <span @click="searchPost">{{searchBtn}}</span>
        </div>
        <!-- 历史记录 history-->
        <div class="search-history">
            <div class="top-title flex flex--align-items--center flex--justify-content--space-between">
                <span>历史搜索</span>
                <i @click="removeHistory" class="icon-delete"></i>
            </div>
            <ul class="search-historylist flex flex--wrap">
                <li v-for="(item, index) in historyList" @click="$router.push(`/search/retlist/${item.name}`)" :key="index">{{item.name}}</li>
            </ul>
        </div>
        <!-- 热门搜索 hot -->
        <div class="search-hot">
            <div class="top-title">
                <span>热门搜索</span>
            </div>
            <ul class="search-hotlist flex flex--wrap">
                <li v-for="(item, index) in hotsearchList" @click="addHottoHistory(item.name)" :key="index">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import api from '../../api/index.js'
export default {
    name:'search',
    components:{

    },
    created() {
        this.getSearchHot()
        this.getHistoryList()
        // console.log(this.historyList)
    },
    computed: {
        searchBtn(){       
            return this.searchinput.length <= 0 ? '取消': '搜索';
        }
    },
    data(){
        return {
            searchinput:'',
            isSearch:false,
            // 历史搜索
            historyList:[],
            // 热门搜索
            hotsearchList:[],
            // 语音识别的内容
            // contentText:null
        }
    },
    methods: {
        // 逻辑
        removeHistory(){
            window.localStorage.removeItem('searchHistory');
            this.historyList = []
        },
        addHottoHistory(name){
            this.historyList.push({name})
            this.addItem('searchHistory',this.historyList)
            this.$router.push(`/search/retlist/${name}`)
        },
        //封装
        addItem(storagename,data){
            var local = window.localStorage
            local.setItem(storagename,JSON.stringify(this.repeat(data)))
        },
        // 语音识别功能
        // contentText
        startRecognize(){
            var options = {};
            options.engine = 'iFly';
            this.searchinput = "";
            // alert("开始语音识别：");
            plus.speech.startRecognize(options, s=>{
                this.searchinput += s;
                if(this.searchinput.indexOf('。') > -1){
                    this.searchinput = this.searchinput.substr(0, this.searchinput.indexOf('。'));
                }

                this.searchBtn = '搜索';
                this.searchPost();
                // plus.nativeUI.alert(this.searchinput);
            }, e=>{
                // alert("语音识别失败："+e.message);
            });
        },
        // 请求
        // 搜索
        searchPost(){
            switch(this.searchBtn){
                case '取消':
                    this.$router.go(-1)
                break;
                case '搜索':
                    // const {data:ret} = await this.$http.post(this.setApi + api.searchRet,this.querystring.stringify({type:5,name:this.searchinput}))
                    // console.log(ret)
                    // 将历史搜索记录存入本地
                    this.historyList.push({name:this.searchinput})
                    // console.log(this.historyList)
                    // var local = window.localStorage
                    // local.setItem('searchHistory',JSON.stringify(this.repeat(this.historyList)))
                    this.addItem('searchHistory',this.historyList)
                    this.$router.push(`/search/retlist/${this.searchinput}`);
                break;
            }
        },
        // 热门
        async getSearchHot(){
            const {data:ret} = await this.$http.post(this.setApi + api.search,this.querystring.stringify({type:2}))
            // console.log(ret.response_data.lists)
            this.hotsearchList = ret.response_data.lists
        },
        // 历史搜索封装
        getHistoryList(){
            var local = window.localStorage
            var searchRetlist = local.getItem('searchHistory')
            if(!searchRetlist) return this.historyList = []
            this.historyList = JSON.parse(searchRetlist)
        }

    },

}
</script>

<style lang="less" scoped>
@import url('./search.less');
.font30 .icon-htmal5icon13:before {
    font-size: 1.4rem !important;
}
</style>

<template>
    <div id="reward">
        <head-back>
            <span class="head-title">
                打赏记录
            </span>
        </head-back>

        <div>
            <div class="reward-top-nav">
                <ul class="flex flex--justify-content--space-between">
                    <li 
                        class="flex-grow"
                        v-for="(item,index) in top_nav" 
                        :key="index">
                        <h3>{{item.title}}</h3>
                    </li>
                </ul>
            </div>
            <ul class="reward-content" v-if="reward_list.length > 0">
                <li class="flex flex--justify-content--space-between flex--align-items--center" v-for="(item,index) in reward_list" :key="index">
                    <p class="flex-grow">{{item.username}}</p>
                    <p class="flex-grow">{{item.ctime | timeFilter}}</p>
                    <p class="flex-grow">
                        <img class="reworld-img" :src="item.img" alt="打赏商品">
                    </p>
                </li>
            </ul>
            <div class="reword">
                <h4>暂时没有打赏记录</h4>
            </div>
        </div>

    </div>
</template>
<script>
import HeadBack from '../../components/headback/headback';
import api from "@/api/index.js";
export default {
    data(){
        return {
            top_nav: [
                {
                    id: 1,
                    title: '打赏人',
                },
                {
                    id: 2,
                    title: '时间',
                },
                {
                    id: 3,
                    title: '礼物',
                }
            ],
            reward_list:  [],       // 打赏列表
        }
    },
    components: {
        HeadBack
    },
    created(){
        // 获取打赏列表
        this.getreward_list();
    },
    methods: {
         /**
         * 获取打赏列表
         */
        async getreward_list() {
            const { data: ret } = await this.$http.post(
                this.setApi + api.reward_list,
                this.querystring.stringify({
                    access_token: window.localStorage.getItem("token")
                })
            );

            if (!ret.error_code) {
                this.reward_list = ret.response_data;
            }
        }
    }
}
</script>
<style lang="less" scoped>
#reward {
    padding-top: 2.75rem;
    text-align: center;
    .reward-top-nav {
        padding: 0 1.25rem;
        h3 {
            font-size: 1rem;
            font-weight: 400;
        }
    }
    .reward-content {
        padding: 0 1.25rem;
    }
}
.flex-grow {
    // flex-grow: 1;
}
.reword {
    text-align: center;
    font-size: 1rem;
    font-weight: 400;
}
.reworld-img {
    display: block;
    width: 2.5rem;
    height: auto;
}
</style>
<template>
	<div id="store">
		<head-back>
			<span class="head-title">
				单位信息
			</span>
		</head-back>

		<div class="store">

			<div class="store-sign flex flex--align-items--center">
				<span>单位名称</span>
				<input type="text" v-model="storeInfo.name" placeholder="请输入门店名称">
			</div>
			<div class="store-sign flex flex--align-items--center">
				<span>单位面积</span>
				<input type="number" v-model="storeInfo.shop_area" placeholder="请输入门店面积">
			</div>
			<div class="store-sign flex flex--align-items--center">
				<span>单位地址</span>
				<input type="text" v-model="storeInfo.address" placeholder="请输入您门店所在地址">
			</div>
			<div class="store-sign flex flex--align-items--center">
				<span>负责人姓名</span>
				<input type="text" v-model="storeInfo.charge_name" placeholder="请输入门店负责人">
			</div>
			<div class="store-sign flex flex--align-items--center">
				<span>联系电话</span>
				<input type="number" v-model="storeInfo.phone" placeholder="请输入门店电话">
			</div>
			<div class="store-sign flex flex--align-items--center"> 
				<span>负责人微信</span>
				<input type="text" v-model="storeInfo.wechat" placeholder="请输入负责人微信">
			</div>
			<div class="store-sign flex flex--align-items--center">
				<span>单位介绍</span>
			</div>
			<div class="text-des">
				<textarea placeholder="请输入门店介绍" v-model="storeInfo.content"></textarea>
			</div>
			<div class="store-img">
				<p>单位照片</p>
				<ul class="flex flex--wrap">
					<li class="flex flex--align-items--center" v-for="(item, index) in storeInfo.img" :key="index">
						<img :src="item" alt="">
             <i @click="deleteImg(index,1)" class="icon-delete">x</i>
					</li>
					<li v-show="storeInfo.img.length < 8">
						<van-uploader :after-read="onRead">
							<van-icon name="photograph" />
						</van-uploader>
					</li>
				</ul>
			</div>
			<div class="store-img">
				<p>单位资质</p>
				<ul class="flex flex--wrap">
					<li class="flex flex--align-items--center" v-for="(item, index) in storeInfo.qualifications_imgs" :key="index">
						<img :src="item" alt="">
            <i @click="deleteImg(index,2)" class="icon-delete">x</i>
					</li>
					<li v-show="storeInfo.qualifications_imgs.length < 8">
						<van-uploader :after-read="mdZizhi">
							<van-icon name="photograph" />
						</van-uploader>
					</li>
				</ul>
			</div>
			<div class="button" @click="addStore">提交审核</div>
		</div>
	</div>
</template>

<script>
import HeadBack from '../../../../components/headback/headback'
import api from '../../../../api/index.js'
export default {
	components:{
		HeadBack
	},
	data() {
		return {
			storeInfo:{
				access_token:window.localStorage.getItem('token'),
				name:'',
				shop_area:'',
				address:'',
				charge_name:'',
				phone:'',
				wechat:'',
				content:'',
				img:[],
				qualifications_imgs:[]
			}
		}
	},
	methods: {
    // 删除图片
    deleteImg(index,type){  // 1:单位照片  2：单位资质照片
        console.log(index)
        if(type === 1){
           this.storeInfo.img.splice(index,1)
        }else{
           this.storeInfo.qualifications_imgs.splice(index,1)
        }
       
    },
		// 门店图片
		onRead(file){
			console.log(file)
			this.uploadImg(file.content,1)
		},
		// 门店资质
		mdZizhi(file){
			console.log(file)
			this.uploadImg(file.content,2)
		},
		// 上传图片
		async uploadImg(img,type){
			const {data:ret} = await this.$http.post(this.setApi + api.uploaderBase64,this.querystring.stringify({
				fileImg:img
			}))
			console.log(ret)
			type==1?this.storeInfo.img.unshift(ret.response_data) : this.storeInfo.qualifications_imgs.unshift(ret.response_data)
		},

		// 提交入住
		async addStore(){
			let lock = false;


			Object.keys(this.storeInfo).forEach(key=>{
				if(this.storeInfo[key]=='' || this.storeInfo[key] == null || this.storeInfo[key] == 'undefined'){
					lock = true;
					return 
				}

			})

			if(lock){
				this.$toast('请填写完整信息');
				return;
			}
			const {data:ret} = await this.$http.post(this.setApi + api.stores,this.querystring.stringify(this.storeInfo))
			// console.log(ret)
			if(!ret.response_data.lists.id) return this.$toast('提交失败')

			this.$toast('提交成功，请等待审核...');
			
			this.$router.go(-1)
		}

	},
}
</script>

<style lang="less" scoped>
@import url('./store.less');
</style>

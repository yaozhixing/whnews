<template>
	<view class="nav">
		<select-tab style="width: 100%;" :selectTypeId="selectTypeId" :hasLaunch="true" v-model="activeNav"
		            :labelKey="labelKey" :list="navList" @handleSelectTab="handleSelectTab" />
		<!-- <view class="nav-wrap">
			<view class="nav-item" :class="{ active: activeNav === item.channelId }" v-for="item in navList" :key="item.id" @click="clickNav(item.channelId)">
				<view class="adm-tabs-tab">{{item.channelName}}</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import SelectTab from '@/components/select-tab/select-tab.vue'
	import { getCategory } from '@/api/home.js'
	const RECOMMEND_ENUM = {
		channelId: 1,
		channelName: '推荐',
		columns: null,
		coverUrl: null,
		createBy: 1,
		createTime: '2021-08-24 22:21:26',
		del: 1,
		id: 1,
		isEditable: 1,
		isEnable: 1,
		isShow: 1,
		linkUrl: null,
		parentId: 0,
		sort: 1,
		updateBy: 1,
		updateTime: "2023-03-09 10:53:56"
	}
	export default {
		name: 'HomeNav',
		
		components:{
			SelectTab
		},
		
		data() {
			return {
				navList:[],
				activeNav: '1',
				// selectType: '1',
				selectTypeId: 'channelId',
				labelKey: "channelName",
			};
		},
		
		model: {
		  prop: 'activeNav',
		  event: 'change'
		},
		
		created(){
			this.getCategory()
		},
		
		methods:{
			async getCategory(){
				try{
					const { data:{ data: result } } = await getCategory()
					result.unshift(RECOMMEND_ENUM)
					this.navList = result
				}catch(e){
					console.log(e)
				}
			},
			
			clickNav(channelId){
				this.activeNav = channelId
				this.$emit('change', this.activeNav)
			},
			
			handleSelectTab(val){
				this.activeNav = val.channelId
				this.$emit('change', this.activeNav)
			}
		}
	}
</script>

<style lang="scss">
.nav{
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	height: 40px;
	padding: 0 10px 10px;
	color: #333;
	overflow: hidden;
	background-color: white;
	// border-bottom: 1px solid $uni-border-1;
	// scrollbar-width: none;
	// &::-webkit-scrollbar {
	// 	display:none
	// }
	.nav-wrap{
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		flex:1;
		position: relative;
		overflow: hidden;
	}
	.nav-item{
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		height:38px;
		font-size: 15px;
		padding: 0 5px;
		position: relative;
	}
	.adm-tabs-tab{
		white-space: nowrap;
		width: min-content;
		margin: 0 auto;
		position: relative;
		cursor: pointer;
	}
	.active{
		font-weight: 700;
		color: #da3838;
		&::after{
			display: block;
			content:'';		
			position: absolute;
			bottom:0;
			left:50%;
			width: 90%;
			height: 1px;
			margin-left: -45%;
			background-color: red;
		}
	}
}
</style>


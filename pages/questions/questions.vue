
<template>
	<view class="content-page flex-full-column questions-container">
		<uni-nav-bar left-icon="left" title="在线问答" @clickLeft="back" />
		
		<view class="main-page">
			<question-list></question-list>
		</view>
	</view>
</template>

<script>
	import QuestionList from './components/question-list.vue'
	export default {
		name: 'Questions',
		
		components: {
		  QuestionList
		},
		
		data() {
			return { };
		},
		
		methods:{
			back(){
				uni.navigateBack() // 默认delta:1
			}
		}
	}
</script>

<style lang="scss" scoped>
	.questions-container{
		height: calc(100% - 44px);
		overflow: hidden;
	}
	
	.main-page{
		flex:1;
		background-color: white;
		min-height: 0;
	}
</style>
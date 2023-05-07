
<template>
	<view class="comment-list-container">
		<!-- <empty-data v-if="!commentData.length"></empty-data> -->
		<view class="comment-list-wrap">
			<comment-card 
				v-for="comment in commentData" 
				:key="comment.id"  
				:comment-info="comment"
			></comment-card>
		</view>
	</view>
</template>

<script>
	import { getCommentListNew } from '@/api/home.js'
	import EmptyData from '@/components/empty-data/empty-data.vue'
	import CommentCard from './comment-card.vue'
	export default {
		name: 'CommentList',
		
		components: {
			EmptyData,
			CommentCard
		},
		
		data() {
			return {
				commentData: []
			};
		},
		
		// model: {
		//   prop: 'commentNum',
		//   event: 'change'
		// },
		
		// model: {
		//   prop: 'commentData',
		//   event: 'change'
		// },
		
		props:{
			// 评论列表
			commentListData:{
				required:true,
				type: Array,
				default:[]
			},
			
			informationId:{
				required:true,
				type: String,
				default:''
			},
			
			frontUid:{
				required:true,
				type: Number
			}
		},
		
		watch:{
			commentListData:{
				handler(newValue){
					console.log('watch', newValue)
					this.commentData = newValue
				},
				immediate:true,
				deep:true
			}
		},
		
		methods:{ }
	}
</script>

<style lang="scss" scoped>
	.comment-list-wrap{
		margin-top: 10px;
	}
</style>
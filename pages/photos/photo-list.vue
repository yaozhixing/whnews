
<template>
	<view class="photo-list-container" v-if="homeFlag">
		<photo-card 
			v-for="(item, index) in listData"
			:key="item.id"
			:photo-info="item"
		></photo-card>
	</view>
</template>

<script>
	import PhotoCard from './components/photo-card.vue'
	export default {
		name: 'PhotoList',
		
		components: {
			PhotoCard,
		},
		
		props:{
			photoList:{
				required:true,
				type: Array,
				default:[]
			},
			homeFlag:{
				required:true,
				type: Boolean,
				default:false
			}
		},
		
		data() {
			return {
				listData:[]
			};
		},
		
		watch:{
			photoList:{
				handler(newValue){
					this.listData = newValue
				},
				immediate:true,
				deep:true
			}
		},
		
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.photo-list-container{
		display: flex;
		flex-direction: column;
		padding: 0 14px;
	}
</style>
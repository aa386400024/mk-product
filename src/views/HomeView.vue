<template>
	<div class="main-content">
		<button @click="goToSubApp">Go to Sub App</button>
		
		<el-row :gutter="16">
			<el-col :span="8">
				<el-card class="box-card" :body-style="{ padding: '0px' }" shadow="hover">
					<img src="@/assets/images/home\ai-banner.png" alt="Coal Mine Banner" class="banner">
					<div style="padding: 14px">
						<span>应用</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card" shadow="hover">
					<template #header>
						<div class="card-header">
							<span>平台简介</span>
						</div>
					</template>
					<div class="text item">
					
					</div>
				</el-card>
			</el-col>
			<el-col :span="8">
				<el-card class="box-card" shadow="hover">
					<template #header>
						<div class="card-header">
							<span>系统公告</span>
						</div>
					</template>
					<div class="text item">
						
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top: 15px;">
			<el-col :span="24">
				<el-card class="box-card" shadow="hover">
					<template #header>
						<div class="card-header">
							<span>其他内容</span>
						</div>
					</template>
					<div class="text item">
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
  
<script setup lang="ts">
// 在这里导入需要的脚本或组件

import { useRouter } from 'vue-router';
const router = useRouter();

const goToSubApp = () => {
	router.push('/app1');
}

</script>
  
<style scoped lang="scss">
.main-content {
	// 主内容区域的样式

	.banner {
		width: 100%;
		height: auto;
		// 可以根据需要调整横幅的样式
	}

	::v-deep(.el-card__header) {
		padding: 12px 20px;
	}

	.card-header {
		height: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.el-col {
		display: flex;
	}

	.box-card {
		flex: 1; // 让卡片填充整个列空间
		min-height: 260px; // 这里可以设置一个合适的最小高度
	}
}
</style>
  
  
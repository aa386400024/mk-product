<template>
	<div class="main-content">
		<el-row :gutter="16">
			<el-col :span="8">
				<el-card class="box-card" :body-style="{ padding: '0px' }" shadow="hover">
					<img src="@/assets/images/banner.png" alt="Coal Mine Banner" class="banner">
					<div style="padding: 14px">
						<span>煤矿智能管理系统</span>
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
						在现代煤矿产业中，安全和效率是至关重要的两大支柱。为了应对这一挑战，我们引入了“xxxx”——一个先进的煤矿智能后台管理系统。该系统采用最新的智能技术，旨在提升煤矿的运营效率，同时确保作业的安全性。“xxxx”是煤矿企业向数字化转型的理想选择，它不仅强化了安全保障，还为煤矿的可持续发展提供了强大的技术支持。这是一个为现代煤矿量身打造的全面解决方案，旨在通过技术创新推动煤矿行业迈向更高效、更安全的未来。
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
						亲爱的用户，我们很高兴地通知您，“xxxx”煤矿智能后台管理系统将于2024年2月1日进行一次重要更新。此次更新旨在提高系统性能，增强用户体验，并引入一些新的安全特性。<br />感谢您对“xxxx”平台的持续关注与信赖。我们一直致力于为您提供更高效、更安全的服务。
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row style="margin-top: 15px;">
			<el-col :span="24">
				<el-card class="box-card" shadow="hover">
					<template #header>
						<div class="card-header">
							<span>安全管理</span>
						</div>
					</template>
					<div class="text item">
						<p>作为一家以安全和效率为核心的煤矿企业，我们始终将员工的健康和安全放在首位。请遵守以下安全管理规定：</p>
						<ul>
							<li>始终遵守安全操作规程，不违章作业。</li>
							<li>定期参加安全教育培训，提高安全意识。</li>
							<li>使用防护装备，确保作业时的个人安全。</li>
							<li>及时上报任何可能导致安全事故的隐患。</li>
							<li>遵守矿区内所有的交通和行走规则。</li>
						</ul>
						<p>记住，安全生产关系到每个人的生命安全和家庭幸福，让我们共同努力，打造零事故的工作环境。</p>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
  
<script setup lang="ts">
// 在这里导入需要的脚本或组件
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
  
  
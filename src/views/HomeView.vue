<template>
	<div class="main-content">
		<div class="filter-section">
			<MySelect
				v-model="selectedColumn"
				:options="columnOptions"
				placeholder="选择列"
			/>
			<el-input v-model="filterValue" placeholder="筛选值" />
			<el-button @click="applyFilter" type="primary">筛选</el-button>
  		</div>
		<el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
			<el-tab-pane label="软件注册总表" name="first">
				<MyTable 
					:tableData="tableData"
					:columns="columns"
					:totalRows="totalRows"
					:showIndex="true"
					:showPagination="true"
					:enableEdit="enableEdit"
					:enableDelete="enableDelete"
					@deleteRow="handleDeleteRow" 
					@update:pageSize="handleSizeChange"
					@update:currentPage="handleCurrentChange" 
				/>
			</el-tab-pane>
			<el-tab-pane label="信息平台矿名销售" name="second">Config</el-tab-pane>
			<el-tab-pane label="风控名单" name="third">Role</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { MyTable } from "@/components/table";
import { MySelect } from "@/components/select";

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
	console.log(tab, event)
}

// 表格行数据项类型定义
interface TableDataItem {
	registrationDate: string;
	endUser: string;
	salesManager: string;
	systemName: string;
	userMachineCode: string;
	registrationCode: string;
	registrationDays: string;
	expirationDate: string;
	softwareSerialName: string;
	softwareName: string;
	remark: string;
	editing?: boolean;
	[key: string]: any;
}

// 列配置类型定义
interface Column {
	prop: string;
	label: string;
	width?: number;
	minWidth?: number;
	tooltip? : boolean;
	maxTextLength?: number;
	tooltipTheme?: string;
}

// 示例数据
const tableData = ref<TableDataItem[]>([
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
	{
		registrationDate: '2021-01-01',
		endUser: '山西金晖万峰煤矿有限公司',
		salesManager: '杨希',
		systemName: 'System A',
		userMachineCode: 'BFEBFBFF000006FD-129820922',
		registrationCode: 'N0G7A-6J22K-M1EHH-41EJ5-601GB',
		registrationDays: '9999',
		expirationDate: '2041-01-07',
		softwareSerialName: '定位',
		softwareName: '主机',
		remark: 'Initial registration',
	},
])
const columns = ref<Column[]>([
	{ prop: 'registrationDate', label: '注册申请日期', minWidth: 120 },
	{ prop: 'endUser', label: '终端用户', minWidth: 200 },
	{ prop: 'salesManager', label: '销售经理', minWidth: 100 },
	{ prop: 'systemName', label: '系统名称', minWidth: 100 },
	{ prop: 'userMachineCode', label: '用户机器码', minWidth: 220 },
	{ prop: 'registrationCode', label: '注册码', minWidth: 260 },
	{ prop: 'registrationDays', label: '注册天数', minWidth: 90 },
	{ prop: 'expirationDate', label: '到期时间', minWidth: 100 },
	{ prop: 'softwareSerialName', label: '软件编号名称', minWidth: 120 },
	{ prop: 'softwareName', label: '软件名称', minWidth: 100 },
	{ prop: 'remark', label: '备注', minWidth: 100, tooltip: true, maxTextLength: 10, tooltipTheme: 'light' }
])

const totalRows = ref<number>(tableData.value.length) // 假设总行数
const enableEdit = ref<boolean>(true)
const enableDelete = ref<boolean>(true)

const selectedColumn = ref('')
const filterValue = ref('')

// 将表格列配置转换为el-select的options格式
const columnOptions = computed(() => {
  return columns.value.map(column => ({
    value: column.prop, // 列的prop作为value
    label: column.label // 列的label作为显示的文本
  }))
})

// 筛选逻辑
const applyFilter = () => {
  if (!selectedColumn.value || !filterValue.value) {
    console.warn('请选择一个列和输入一个筛选值')
    return
  }
  // 这里举一个简单的例子：根据选择的列和输入值进行过滤
  // 你可能需要根据实际情况调整，比如发起API请求进行服务器端筛选
  const filteredData = tableData.value.filter(item =>
    item[selectedColumn.value].toString().includes(filterValue.value)
  )
  console.log(filteredData) // 或者更新表格数据等
}

// 处理删除行事件
const handleDeleteRow = (index: number): void => {
	tableData.value.splice(index, 1)
	// 可能需要更新 totalRows 或触发其他更新
	totalRows.value = tableData.value.length
}

// 处理分页大小变化事件
const handleSizeChange = (newSize: number): void => {
	// 更新分页大小
	console.log('New page size:', newSize)
}

// 处理当前页码变化事件
const handleCurrentChange = (newPage: number): void => {
	// 更新当前页码
	console.log('New current page:', newPage)
}
</script>
<style scoped lang="scss">
.main-content {
	padding: 20px;

	.el-tabs {
		height: 100%;
		position: relative;
	}
	.filter-section {
		display: flex;
		align-items: center;
		position: absolute;
		right: 38px;
		top: 24px;
		gap: 10px; // 添加一些间隙
		z-index: 100;
		.el-input,
		.el-select {
			width: 150px;
			// flex-grow: 1;
		}
	}

}
</style>
  
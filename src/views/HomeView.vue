<template>
	<div class="main-content">
		<div class="filter-section">
			<MySelect v-model="selectedColumn" :options="columnOptions" placeholder="选择列" />
			<el-input v-model="filterValue" placeholder="筛选值" />
			<el-button @click="applyFilter" type="primary">筛选</el-button>
			<el-button @click="exportToExcel" type="success">导出Excel</el-button>
			<el-upload 
				ref="upload" 
				action="" 
				:auto-upload="false" 
				:limit="1" 
				:on-exceed="handleExceed"
				:on-change="handleImport" 
				:show-file-list="false" 
				accept=".xlsx, .xls"
			>
				<el-button type="success">上传Excel</el-button>
			</el-upload>
		</div>
		<el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
			<el-tab-pane v-for="tab in tabsData" :key="tab.name" :label="tab.label" :name="tab.name">
				<MyTable 
					:tableData="tab.tableData" 
					:columns="tab.columns" 
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
		</el-tabs>

	</div>
</template>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as XLSX from 'xlsx';
import { genFileId } from 'element-plus'
import type { TabsPaneContext, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
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
	tooltip?: boolean;
	maxTextLength?: number;
	tooltipTheme?: string;
}

interface TabData {
	name: string;
	label: string;
	tableData: TableDataItem[];
	columns: Column[];
}


const tabsData = ref<TabData[]>([
	{
		name: 'first',
		label: '软件注册总表',
		tableData: [
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
				registrationDate: '2021-01-02',
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
				registrationDate: '2021-01-03',
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
				registrationDate: '2021-01-04',
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
		], // 使用TableDataItem[]类型的数组
		columns: [
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
		], // 使用Column[]类型的数组
	},
	{
		name: 'second',
		label: '信息平台矿名销售',
		tableData: [], // 同上
		columns: [], // 同上
	},
	// 添加更多Tab配置...
]);

const totalRows = computed(() => {
	const currentTab = tabsData.value.find(tab => tab.name === activeName.value);
	return currentTab ? currentTab.tableData.length : 0;
});

const enableEdit = ref<boolean>(true)
const enableDelete = ref<boolean>(true)

const selectedColumn = ref('')
const filterValue = ref('')

// 将表格列配置转换为el-select的options格式
const columnOptions = computed(() => {
	// 找到当前激活的Tab
	const currentTab = tabsData.value.find(tab => tab.name === activeName.value);
	if (!currentTab) {
		return [];
	}
	// 根据当前Tab的列配置生成筛选选项
	return currentTab.columns.map(column => ({
		value: column.prop, // 列的prop作为value
		label: column.label // 列的label作为显示的文本
	}));
});


const currentTabData = computed(() => {
	return tabsData.value.find(tab => tab.name === activeName.value);
});

// 筛选逻辑
const applyFilter = () => {
	if (!selectedColumn.value || !filterValue.value) {
		console.warn('请选择一个列和输入一个筛选值');
		return;
	}
	// 使用TypeScript断言确保currentTabData非空
	const currentTab = tabsData.value.find(tab => tab.name === activeName.value)!;
	currentTab.tableData = currentTab.tableData.filter(item =>
		item[selectedColumn.value]?.toString().includes(filterValue.value)
	);
};

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
	upload.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	upload.value!.handleStart(file)
}

const exportToExcel = () => {
	// 获取当前Tab的数据和列配置
	const currentTab = tabsData.value.find(tab => tab.name === activeName.value);
	if (!currentTab) return;


	// 准备中文表头（基于列配置）
	const headers = currentTab.columns.map(column => column.label);

	// 准备与中文表头对应的数据
	const dataWithChineseHeaders = currentTab.tableData.map(item => {
		const dataItem: { [key: string]: any } = {};
		currentTab.columns.forEach(column => {
			dataItem[column.label] = item[column.prop];
		});
		return dataItem;
	});

	console.log(headers, 'headers'); // 检查表头是否正确
	console.log(dataWithChineseHeaders, 'dataWithChineseHeaders'); // 检查数据是否按预期格式化

	// 创建工作簿和工作表，使用准备好的中文表头和数据
	const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithChineseHeaders, {
		skipHeader: true, // 跳过自动生成的英文表头
	});
	console.log(ws, 'ws');
	// 手动添加中文表头行
	// 假设headers是你的表头行，dataWithChineseHeaders是包含所有数据的数组
	XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' }); // 添加表头
	XLSX.utils.sheet_add_json(ws, dataWithChineseHeaders, { origin: 'A2', skipHeader: true }); // 从'A2'开始添加数据，确保不覆盖表头


	const wb: XLSX.WorkBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(wb, ws, currentTab.label);

	// 导出Excel文件
	XLSX.writeFile(wb, `${currentTab.label}.xlsx`);
};

const handleImport = (fileChangeEvent: { raw: File }) => {
	const file = fileChangeEvent.raw; // 获取真正的文件对象
	if (!(file instanceof Blob)) {
		console.error('The provided value is not a Blob.');
		return;
	}

	const reader = new FileReader();
	reader.onload = (e: ProgressEvent<FileReader>) => {
		const data = e.target?.result;
		if (typeof data !== 'string') {
			console.error('Expected string from FileReader');
			return;
		}

		const workbook = XLSX.read(data, { type: 'binary' });
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];
		const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		const headers = json.shift();
		if (!Array.isArray(headers)) {
			console.error('Headers are not in array format.');
			return;
		}

		// 初始化maxLengths数组，用于存储每列的最大字符数
		const maxLengths: number[] = headers.map(header => header.toString().length);

		// 更新每列的最大字符数
		// 更新每列的最大字符数，考虑不同类型字符的宽度
		json.forEach((row: any[]) => {
			row.forEach((cell: any, index: number) => {
				let cellLength = cell ? cell.toString().length : 0;
				// 估算宽度：中文字符使用更大的乘数
				let estimatedWidth = cell ? [...cell.toString()].reduce((acc: number, char: string) => acc + (char.match(/[\u3400-\u9FBF]/) ? 18 : 9), 0) : 0;
				console.log(cell, cellLength, estimatedWidth, 'ssss');
				maxLengths[index] = Math.max(maxLengths[index], estimatedWidth);
			});
		});


		// 根据列最大长度动态设置minWidth
		const columns = headers.map((header: string, index: number) => {
			const baseWidth = maxLengths[index]; // 已经是估算后的宽度
			const minWidth = Math.max(baseWidth, header.length * 7, 110); // 确保最小宽度为100

			// 创建列定义
			const column: Column = {
				prop: header.replace(/\s+/g, ''),
				label: header,
				minWidth,
			};

			// 为“备注”列添加特殊属性
			if (header === "备注") {
				column.tooltip = true;
				column.maxTextLength = 10;
				column.tooltipTheme = 'light';
			}

			return column;
		});

		const tableData = json.map(row => row.reduce((acc: { [key: string]: any }, cell: any, index: number) => {
			const prop = headers[index].replace(/\s+/g, '');
			acc[prop] = cell;
			return acc;
		}, {}));

		const newTab: TabData = {
			name: `tab${tabsData.value.length + 1}`,
			label: worksheetName,
			tableData,
			columns,
		};

		tabsData.value.push(newTab);
	};

	reader.readAsBinaryString(file);
};


// 处理删除行事件
const handleDeleteRow = (index: number): void => {
	// 找到当前激活的Tab
	const currentTab = tabsData.value.find(tab => tab.name === activeName.value);
	if (!currentTab) return; // 如果没有找到当前Tab，直接返回

	// 删除指定索引的行
	currentTab.tableData.splice(index, 1);

	// 不需要再手动更新totalRows，因为现在每个Tab的行数可以直接通过currentTab.tableData.length获得
	// 但如果你在界面上需要显示每个Tab的总行数，你可以通过计算属性或者方法来动态获取
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
  
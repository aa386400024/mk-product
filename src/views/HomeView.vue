<template>
	<div class="swiper-view">
		<MySwiper :slides="slidesData" :navigationEnabled="true" :paginationEnabled="true" />
	</div>
	<div class="main-content" v-if="tabsData.length > 0">
		<div class="filter-section">
			<MySelect v-model="selectedColumn" :options="columnOptions" placeholder="选择列" />
			<el-input v-model="filterValue" placeholder="筛选值" />
			<el-button @click="applyFilter" type="primary">筛选</el-button>
			<el-button @click="exportToExcel" type="success">导出Excel</el-button>
			<!-- <el-upload 
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
			</el-upload> -->
		</div>
		<el-tabs v-model="activeName" @tab-change="tabChange" type="border-card">
			<el-tab-pane v-for="tab in tabsData" :key="tab.data_type" :label="tab.label" :name="tab.data_type">
				<MyTable 
					:tableData="tab.tableData" 
					:columns="tab.columns" 
					:totalRows="tab.total"
					:showPagination="true" 
					:enableEdit="enableEdit" 
					:enableDelete="enableDelete"
					:paginationPageSizes="[20, 50, 80, 100]"
					@saveEdit="handleSaveEdit"
					@deleteRow="handleDeleteRow"
					@update:pageSize="handleSizeChange"
					@update:currentPage="handleCurrentChange" 
				/>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import * as XLSX from 'xlsx';
import { genFileId, ElMessage, ElMessageBox } from 'element-plus'
import type { TabPaneName, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { MyTable } from "@/components/table";
import { MySelect } from "@/components/select";
import { GetAllTypeData, DelAllTypeData, DataImport, UpdateAllTypeData } from '@/api/ruanjian';

const activeName = ref(1)

// 表格行数据项类型定义，允许任意的字符串键和任意类型的值
interface TableDataItem extends Record<string, any> {}

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
	data_type: string | number;
	label: string;
	total: number;
	tableData: TableDataItem[];
	columns: Column[];
}


const tabsData = ref<TabData[]>([]);

const enableEdit = ref<boolean>(true)
const enableDelete = ref<boolean>(true)

const slidesData = ref([
    // { type: 'video', src: '/videos/winter.mp4' },
    { type: 'image', src: '/images/home/banner01.jpg', alt: 'banner' },
	{ type: 'image', src: '/images/home/banner02.jpg', alt: 'banner' },
	{ type: 'image', src: '/images/home/banner03.jpg', alt: 'banner' },
    // 可以根据需要添加更多的滑块数据
]);

const selectedColumn = ref('')
const filterValue = ref('')
const currentPageSize = ref<number>(20)

// 将表格列配置转换为el-select的options格式
const columnOptions = computed(() => {
	// 找到当前激活的Tab
	const currentTab = tabsData.value.find(tab => tab.data_type === activeName.value);
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
	return tabsData.value.find(tab => tab.data_type === activeName.value);
});

// 切换标签页
const tabChange = async (name: TabPaneName) => {
    console.log(name);
    // 当用户切换标签页时，获取新激活标签页的数据
    await getAllTypeDataAPI(name as string);
};

// 筛选逻辑
const applyFilter = async () => {
    if (!selectedColumn.value || !filterValue.value) {
        console.warn('请选择一个列和输入一个筛选值');
        return;
    }
    try {
        // 确保使用 await 等待异步操作完成
        await getAllTypeDataAPI(activeName.value, selectedColumn.value, filterValue.value);
    } catch (error) {
        console.error('筛选失败：', error);
    }
};

const upload = ref<UploadInstance>()

const DataImportAPI = async (tabData: any) => {
	// 调用API删除行
	// 返回更新后的数据或确认删除
	try {
		const response = await DataImport({
			tabData: tabData
		});
		const { code, data } = response.data || {};

		if (code === 1) {
			ElMessage.success('导入表格数据成功')
		} else {
			console.error('导入表格数据失败');
			ElMessage.error('导入表格数据失败')
		}
	} catch (error) {
		console.error('导入表格数据失败：', error);
	}
}

const handleExceed: UploadProps['onExceed'] = (files) => {
	upload.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	upload.value!.handleStart(file)
}

// 导出表格数据
const exportToExcel = () => {
	// 获取当前Tab的数据和列配置
	const currentTab = tabsData.value.find(tab => tab.data_type === activeName.value);
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

	// 创建工作簿和工作表，使用准备好的中文表头和数据
	const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataWithChineseHeaders, {
		skipHeader: true, // 跳过自动生成的英文表头
	});
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
		ElMessage.error('The provided value is not a Blob.')
		return;
	}

	const reader = new FileReader();
	reader.onload = (e: ProgressEvent<FileReader>) => {
		const data = e.target?.result;
		if (typeof data !== 'string') {
			console.error('Expected string from FileReader');
			ElMessage.error('Expected string from FileReader')
			return;
		}

		const workbook = XLSX.read(data, { type: 'binary' });
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];
		const json: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		const headers = json.shift();
		if (!Array.isArray(headers)) {
			console.error('Headers are not in array format.');
			ElMessage.error('Headers are not in array format.')
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
			data_type: `tab${tabsData.value.length + 1}`,
			label: worksheetName,
			total: tableData.length - 1,
			tableData,
			columns,
		};
		DataImportAPI(newTab)
		tabsData.value.push(newTab);
	};

	reader.readAsBinaryString(file);
};

// getTabsDataAPI支持筛选功能
const getAllTypeDataAPI = async (
	data_type: string | number = '',
	column: string = '',
	value: string = '',
	page: number = 1,
	pageSize: number = 20
): Promise<void> => {
	try {
		// 使用 Record<string, any> 以支持不同类型的值，包括数字
		const params: Record<string, any> = {
			page,
			pageSize,
		};
		
		// 当 column 和 value 都被提供时，添加它们到 params 对象
		if (column && value) {
			params[column] = value;
		}
		
		// 假设 GetAllTypeData 函数可以接受一个对象作为参数，
		// 其中包含了 tabName 以及任何其他可能的查询参数
		const response = await GetAllTypeData({
			data_type,
			...params,
		});

		const { code, res: data } = response.data || {};
		if (code === 1) {
			tabsData.value = data;
		} else {
			console.error('获取数据失败');
			ElMessage.error('获取数据失败')
		}
	} catch (error) {
		console.error('获取数据失败：', error);
	}
};

// 假设的API调用
const deleteRowAPI = async (row: any) => {
	// 调用API删除行
	// 返回更新后的数据或确认删除
	try {
		const response = await DelAllTypeData({
			data_type: activeName.value,
			id: row.id
		});
		const { code, data } = response.data || {};

		if (code === 1) {
			ElMessage.success('删除数据成功')
			getAllTypeDataAPI(activeName.value);
		} else {
			console.error('删除数据失败');
			ElMessage.error('删除数据失败')
		}
	} catch (error) {
		console.error('删除数据失败：', error);
	}
}

// 修改handleDeleteRow函数
const handleDeleteRow = async (row: any) => {
    try {
        // 等待异步删除操作完成
		try {
        // 显示确认对话框
        await ElMessageBox.confirm('确定删除当前行数据吗?', '警告', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			});
			await deleteRowAPI(row);
		} catch (error) {
			// 如果用户取消，捕获异常并停止执行
			ElMessage.info('已取消删除');
		}
    } catch (error) {
        console.error('删除数据失败：', error);
    }
};


// 假设的API调用
const updateRowAPI = async (row: any) => {
	// 调用API更新行
	// 返回更新后的数据或确认更新
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { editing, ...dataWithoutEditing } = row;
	try {
		const response = await UpdateAllTypeData({
			data_type: activeName.value,
			table_row: dataWithoutEditing
		});
		const { code } = response.data || {};

		if (code === 1) {
			getAllTypeDataAPI(activeName.value);
		} else {
			console.error('更新数据失败');
			ElMessage.error('更新数据失败')
		}
	} catch (error) {
		console.error('更新数据失败：', error);
	}
}

// 保存编辑
const handleSaveEdit = async (row: any) => {
    try {
        // 使用await直接等待异步操作完成
        await updateRowAPI(row);
    } catch (error) {
        console.error('更新失败：', error);
    }
};

// 处理分页大小变化事件
const handleSizeChange = async (newSize: number) => {
    // 假设我们保持当前的页码，但使用新的分页大小重新获取数据
    try {
		currentPageSize.value = newSize;
        await getAllTypeDataAPI(activeName.value, '', '', 1, newSize); // 假设getTabsDataAPI已经被更新以接收分页参数
    } catch (error) {
        console.error('获取数据失败：', error);
    }
};


// 处理当前页码变化事件
const handleCurrentChange = async (newPage: number) => {
    // 使用新的页码重新获取数据，这里假设分页大小保持不变
    try {
        await getAllTypeDataAPI(activeName.value, '', '', newPage, currentPageSize.value); // 同上，假设getTabsDataAPI可以接受分页参数
    } catch (error) {
        console.error('获取数据失败：', error);
    }
};


onMounted(async () => {
    // 调用 getAllTypeDataAPI 获取第一个标签页的数据，使用默认分页设置
    await getAllTypeDataAPI(activeName.value);
})

</script>

<style scoped lang="scss">
.swiper-view {
	margin-top: 50px;
}
.main-content {
	padding: 20px;
	position: relative;

	.el-tabs {
		height: 100%;
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
  
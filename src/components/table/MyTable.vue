<template>
    <el-config-provider :locale="zhCn">
        <el-table :data="tableData" stripe border style="width: 100%" :header-cell-style="{ background: '#666', color: '#fff' }">
            <el-table-column type="selection" width="55" v-if="showSelection"></el-table-column>
            <el-table-column type="index" width="55" label="序号" v-if="showIndex"></el-table-column>
            <el-table-column v-for="column in columns" :key="column.prop" :prop="column.prop" :label="column.label"
                :width="column.width" :min-width="column.minWidth">
                <template #default="{ row }">
                    <el-input v-if="row.editing && enableEdit" v-model="row[column.prop]" size="small"></el-input>
                    <!-- 根据列配置决定是否使用Tooltip -->
                    <template v-else>
                        <el-tooltip v-if="column.tooltip && row[column.prop].length > (column.maxTextLength || Infinity)" :effect="column.tooltipTheme" :content="row[column.prop]" placement="top">
                            <div class="text-truncate">{{ row[column.prop].length > (column.maxTextLength || 0) ? row[column.prop].substr(0, column.maxTextLength) + '...' : row[column.prop] }}</div>
                        </el-tooltip>
                        <div v-else>{{ row[column.prop] }}</div>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="actionColumnWidth" v-if="enableEdit || enableDelete">
                <template #default="{ row, $index }">
                    <el-button v-if="!row.editing && enableEdit" type="primary" size="small"
                        @click="startEdit(row)">编辑</el-button>
                    <el-button v-if="row.editing && enableEdit" type="success" size="small"
                        @click="saveEdit(row)">保存</el-button>
                    <el-button v-if="row.editing && enableEdit" type="info" size="small"
                        @click="cancelEdit(row, $index)">取消</el-button>
                    <el-button v-if="enableDelete" type="danger" size="small" @click="deleteRow($index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="custom-pagination" v-if="showPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage" :page-sizes="paginationPageSizes" :page-size="pageSize"
            :layout="paginationLayout" :total="totalRows">
        </el-pagination>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'
import { ElMessage } from 'element-plus'
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

// 定义一个泛型接口，这里 T 可以是任意类型的对象
interface TableDataItemGeneric<T> {
  [key: string]: T | boolean; // 允许任何属性，同时保留 editing 属性
}

const props = withDefaults(defineProps<{
    tableData: TableDataItemGeneric<any>[];
    columns: { prop: string; label: string; width?: number; minWidth?: number; tooltip?: boolean; maxTextLength?: number; tooltipTheme?: string; }[];
    totalRows?: number;
    showPagination?: boolean;
    enableEdit?: boolean;
    enableDelete?: boolean;
    showIndex?: boolean;
    showSelection?: boolean;
    actionColumnWidth?: string;
    paginationLayout?: string;
    paginationPageSizes?: number[];
}>(), {
    tableData: () => [],
    columns: () => [],
    totalRows: 0,
    showPagination: false,
    enableEdit: false,
    enableDelete: false,
    showSelection: false,
    showIndex: false,
    actionColumnWidth: '220px',
    paginationLayout: 'total, sizes, prev, pager, next, jumper',
    paginationPageSizes: () => [10, 20, 30, 40],
})

const currentPage = ref(1)
const pageSize = ref(10)

const emit = defineEmits(['deleteRow', 'update:pageSize', 'update:currentPage'])

const startEdit = (row: Record<string, any>) => {
    row.editing = true
}

const saveEdit = (row: Record<string, any>) => {
    row.editing = false
    ElMessage({
        message: '保存成功',
        type: 'success',
    })
}

const cancelEdit = (row: Record<string, any>, index: number) => {
    console.log(index)
    row.editing = false
}

const deleteRow = (index: number) => {
    emit('deleteRow', index);
}

const handleSizeChange = (newSize: number) => {
    pageSize.value = newSize
    // Emit event to parent
    emit('update:pageSize', newSize)
}

const handleCurrentChange = (newPage: number) => {
    currentPage.value = newPage
    // Emit event to parent
    emit('update:currentPage', newPage)
}

</script>

<style scoped lang="scss">
.custom-pagination {
  margin-top: 20px; /* 添加上边距 */
  display: flex;
  justify-content: flex-end; /* 使分页组件靠右对齐 */
}

</style>
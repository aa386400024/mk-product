<template>
    <el-config-provider :locale="zhCn">
        <el-table ref="tableRef" :data="tableData" stripe border style="width: 100%" :height="height" :max-height="maxHeight" :header-cell-style="{ background: '#666', color: '#fff' }">
            <el-table-column type="selection" width="55" align="center" v-if="showSelection"></el-table-column>
            <el-table-column type="index" width="55" align="center" label="序号" v-if="showIndex">
                <template #default="{ $index }">
                    {{ computeRowIndex($index) }}
                </template>
            </el-table-column>
            <el-table-column v-for="column in columns" :key="column.prop" :align="align" :prop="column.prop" :label="column.label"
                :width="column.width" :min-width="column.minWidth">
                <template #default="{ row }">
                    <el-input v-if="row.editing && enableEdit && (!row.isNew || !props.excludeInputOnNewRow.includes(column.prop))" 
                        v-model="row[column.prop]" size="small">
                    </el-input>
                    <!-- 根据列配置决定是否使用Tooltip -->
                    <template v-else>
                        <el-tooltip v-if="column.tooltip && row[column.prop].length > (column.maxTextLength || Infinity)" :effect="column.tooltipTheme" :content="row[column.prop]" placement="top">
                            <div class="text-truncate">{{ row[column.prop].length > (column.maxTextLength || 0) ? row[column.prop].substr(0, column.maxTextLength) + '...' : row[column.prop] }}</div>
                        </el-tooltip>
                        <div v-else>{{ row[column.prop] }}</div>
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :align="align" :width="actionColumnWidth" v-if="enableEdit || enableDelete">
                <template #default="{ row, $index }">
                    <el-button v-if="!row.editing && enableEdit" type="primary" size="small"
                        @click="startEdit(row)">编辑</el-button>
                    <el-button v-if="row.editing && enableEdit" type="success" size="small"
                        @click="saveEdit(row)">保存</el-button>
                    <el-button v-if="row.editing && enableEdit" type="info" size="small"
                        @click="cancelEdit(row, $index)">取消</el-button>
                    <el-button v-if="enableDelete && !row.isNew" type="danger" size="small" @click="deleteRow(row, $index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="tool-view">
            <div class="custom-right">
                <el-button class="add-btn" type="primary" v-if="enableAdd" @click="addNewRow" style="margin-top: 20px;">新增行</el-button>
                <el-pagination v-if="showPagination" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="currentPage" :page-sizes="paginationPageSizes" :page-size="pageSize"
                    :layout="paginationLayout" :total="totalRows">
                </el-pagination>
            </div>
        </div>
    </el-config-provider>
</template>

<script setup lang="ts">
import { ref, withDefaults, nextTick } from 'vue';
import type { Ref } from 'vue';
import { ElMessage } from 'element-plus';
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
    height?: number | string;
    maxHeight?: number | string;
    align?: string;
    enableAdd?: boolean;
    excludeInputOnNewRow: string[];
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
    height: '450px',
    maxHeight: '450px',
    align: 'center',
    enableAdd: false,
    excludeInputOnNewRow: () => []
})

const tableRef: Ref<any> = ref(null);

const currentPage = ref(1)
// 获取paginationPageSizes数组的第一个值作为pageSize的初始值
const pageSize = ref(props.paginationPageSizes[0]);

const emit = defineEmits(['saveEdit', 'deleteRow', 'addRow', 'update:pageSize', 'update:currentPage'])

const computeRowIndex = ($index: number) => {
    return (currentPage.value - 1) * pageSize.value + $index + 1;
};

const addNewRow = () => {
    emit('addRow');
    scrollToBottom()
}

const scrollToBottom = () => {
    nextTick(() => {
        // 现在我们假定 tableRef.value 是组件实例，可以安全地访问 $el
        const tableEl = tableRef.value?.$el;
        if (tableEl) {
            // 现在使用正确的选择器来获取 .el-scrollbar__wrap
            const scrollbarWrap = tableEl.querySelector('.el-scrollbar__wrap');
            if (scrollbarWrap) {
                scrollbarWrap.scrollTop = scrollbarWrap.scrollHeight;
            }
        }
    });
};

const startEdit = (row: Record<string, any>) => {
    row.editing = true
}

const saveEdit = (row: Record<string, any>) => {
    row.editing = false
    row.isNew = false
    emit('saveEdit', row);
}

const cancelEdit = (row: Record<string, any>, index: number) => {
    if (row.isNew) {
        // 如果是新添加的行，发出删除行的事件
        emit('deleteRow', row, index);
    } else {
        // 否则，只取消编辑状态
        row.editing = false;
    }
}

const deleteRow = (row: Record<string, any>, index: number) => {
    emit('deleteRow', row, index);
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
.tool-view {
    margin-top: 20px;
    .custom-right {
        display: flex;
        justify-content: flex-end; /* 使分页组件靠右对齐 */
        .add-btn {
            margin: 20px;
        }
    }
}
</style>
<template>
    <el-dialog v-model="dialogVisible" title="基站轨迹预览" width="70%" :close-on-click-modal="false">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="row-info">
                    <h1 class="title">员工信息</h1>
                    <div class="info">
                        <div class="info-row"><span class="label">工号：</span><span class="value">000001</span></div>
                        <div class="info-row"><span class="label">进站时间：</span><span class="value">{{
                            selectedRow?.in_station_time }}</span></div>
                        <div class="info-row"><span class="label">出站时间：</span><span class="value">{{
                            selectedRow?.out_station_time }}</span></div>
                        <div class="info-row"><span class="label">考勤开始时间：</span><span class="value">{{
                            selectedRow?.start_time }}</span></div>
                        <div class="info-row"><span class="label">考勤结束时间：</span><span class="value">{{ selectedRow?.end_time
                        }}</span></div>
                        <div class="info-row"><span class="label">站点名称：</span><span class="value">{{
                            selectedRow?.station_name }}</span></div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <el-table :data="reviewTableData" stripe border max-height="320" style="width: 100%; margin-bottom: 20px;"
                    :header-cell-style="{ background: '#304156', color: '#fff' }">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column prop="position" label="轨迹位置" />
                    <el-table-column prop="time" label="轨迹时间" />
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>

    <div>
        <el-upload ref="upload" class="upload-view" drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :before-upload="handleBeforeUpload"
            :on-change="handleFileChange" accept=".xlsx, .xls">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                <p>点击或将文件拖拽到这里上传</p>
                <p class="el-upload__tip">只能上传xlsx/xls文件</p>
            </div>
        </el-upload>

    </div>
    <div class="table-view" v-if="groupedData.length > 0">
        <el-button class="custom-submit-button" type="primary" @click="handleSubmitData">提交数据</el-button>
        <el-tabs v-model="activeTab.value" lazy>
            <el-tab-pane v-for="(group, index) in groupedData" :key="index" :label="`${index + 1}`">
                <div class="time-view">
                    <span class="time-span"><span class="label">考勤开始时间：</span><span class="value">{{ group.start_time
                    }}</span></span>
                    <span class="time-span"><span class="label">考勤结束时间：</span><span class="value">{{ group.end_time
                    }}</span></span>
                </div>
                <el-table :data="group.data" stripe border style="width: 100%; margin-bottom: 60px;" max-height="400"
                    :header-cell-style="{ background: '#304156', color: '#fff' }">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column v-for="column in group.columns" :key="column.prop" :prop="column.prop"
                        :label="column.label" />
                    <el-table-column label="方向">
                        <template #default="{ row }">
                            <el-radio-group v-model="row.left_or_right">
                                {{ row }}
                                <el-radio :label="1">左</el-radio>
                                <el-radio :label="2">右</el-radio>
                            </el-radio-group>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="140">
                        <template #default="{ row }">
                            <el-button plain type="primary" size="small"
                                @click="handleClickReviewTracks(row)">该基站轨迹预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
  
  
<script setup lang="ts">
import { ref, Ref, nextTick, watch } from 'vue';
import * as XLSX from 'xlsx';
import { UploadFilled } from '@element-plus/icons-vue'
import { ElUpload, UploadFile, ElMessage, ElMessageBox } from 'element-plus';
import { GenerateDataByStation, GenerateDataByMoreStation } from '@/api/func';

interface reviewTracksData {
    station_name: string;
    in_station_time: string;
    out_station_time: string;
    left_or_right: number;
}

interface DataRow {
    [key: string]: any; // 如果您知道具体的属性，可以在这里更详细地定义
}

interface SelectedRow {
    in_station_time: string;
    out_station_time: string;
    start_time: string;
    end_time: string;
    station_name: string;
    left_or_right: number;
}



// 列映射关系
interface ColumnMappings {
    [key: string]: string;
}

const columnMappings: ColumnMappings = {
    '进站时间': 'in_station_time',
    '出站时间': 'out_station_time',
    '考勤开始时间': 'start_time',
    '考勤结束时间': 'end_time',
    '途径基站': 'station_name',
    '方向': 'left_or_right',
    '是否结束': 'is_finished',
    '班次': 'shift_time_quantum_id',
    '工号': 'user_code'
};

// 首先定义 row 对象的类型
interface RowData {
    start_time: string;
    end_time: string;
    is_finished: number;
    // 可以根据需要添加其他属性
}

// 定义 Group 对象的类型
interface Group {
    start_time: string;
    end_time: string;
    data: RowData[];
    columns: { prop: string, label: string }[];
}

// 定义 groups 和 groupChanges 的类型
interface Groups {
    [key: string]: Group;
}

interface GroupChanges {
    [key: string]: boolean;
}

const upload: Ref<typeof ElUpload | null> = ref(null);
// 用于绑定到el-tabs的活动选项卡名称
const activeTab = ref(0);
// 分组后的数据，用于渲染标签页和表格
const groupedData: Ref<Group[]> = ref([]);
const reviewTableData = ref([]);

const selectedRow = ref<SelectedRow | null>(null);

const dialogVisible = ref(false)


const handleBeforeUpload = (file: File) => {
    const fileTypes = ['.xlsx', '.xls'];
    const extension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
    const isExcel = fileTypes.includes(extension);
    if (!isExcel) {
        alert('只能上传Excel文件!');
    }
    return isExcel && false; // 在这里返回 false 来阻止上传
};

const shiftMapping = {
    '零点班': 1,
    '八点班': 2,
    '四点班': 3
};


// 组装数据，以 start_time 和 end_time 为分组依据
const groupData = (data: RowData[]) => {
    const groups: Groups = {};

    data.forEach((row: RowData) => {
        // 判断行是否有效的逻辑，例如检查关键字段是否为空
        const isValidRow = row.start_time && row.end_time && row.shift_time_quantum_id && row.user_code;

        if (!isValidRow) return; // 跳过无效行

        const key = `${row.start_time}-${row.end_time}`;
        if (!groups[key]) {
            groups[key] = {
                start_time: row.start_time,
                end_time: row.end_time,
                shift_time_quantum_id: row.shift_time_quantum_id,
                user_code: row.user_code,
                data: [],
                columns: []
            };
        }

        groups[key].data.push(row);
    });

    const filteredGroups = Object.keys(groups).map(key => {
        const group = groups[key];
        group.columns = Object.keys(columnMappings).map((label) => ({
            prop: columnMappings[label],
            label,
        })).filter(column => !['start_time', 'end_time', 'is_finished', 'left_or_right', 'shift_time_quantum_id', 'user_code'].includes(column.prop));

        if (group.data.length > 0) {
            group.in_station = group.data[0].station_name;
            group.out_station = group.data[group.data.length - 1].station_name;
        }

        return group;
    });

    return filteredGroups;
};




const padZero = (num: number) => {
    return num < 10 ? '0' + num : num;
}


const handleFileChange = (uploadFile: UploadFile) => {
    const file = uploadFile.raw as File;
    if (!file) {
        console.error("没有提供文件");
        return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
        const data = e.target?.result;
        if (typeof data === 'string' || data instanceof ArrayBuffer) {
            // 读取并解析Excel文件
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            // 假设第一行是标题行
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[];
            jsonData.forEach((row) => {
                Object.keys(row).forEach((key) => {
                    const value = row[key];
                    // 检查值是否为数字，并且在一定范围内
                    if (typeof value === 'number' && value >= 30000 && value <= 50000) {
                        const date = XLSX.SSF.parse_date_code(value);
                        row[key] = `${date.y}-${padZero(date.m)}-${padZero(date.d)} ${padZero(date.H)}:${padZero(date.M)}:${padZero(date.S)}`;
                    }
                });
            });
            // 获取标题行
            const headers = jsonData[0];
            const dataRows = jsonData.slice(1);

            // 检查除了“方向”外的必要列是否都存在
            const requiredHeaders = Object.keys(columnMappings).filter(header => header !== '方向');
            const missingRequiredColumns = requiredHeaders.filter(header => !headers.includes(header));
            if (missingRequiredColumns.length > 0) {
                alert(`缺少必要的列: ${missingRequiredColumns.join(', ')}. 请补全后再次上传。`);
                return;
            }

            // 提取并映射必要的列，为每一行添加“方向”列
            const processedData = dataRows.map((row: DataRow) => {
                const processedRow: { [key: string]: any } = {}; // 使用键值对类型来定义processedRow
                headers.forEach((header: string, index: number) => {
                    if (requiredHeaders.includes(header)) {
                        const englishHeader = columnMappings[header];
                        let cellValue = row[index];

                        // 如果是班次字段，则进行映射转换
                        if (header === '班次' && cellValue in shiftMapping) {
                            cellValue = shiftMapping[cellValue];
                        }
                        processedRow[englishHeader] = cellValue;
                    }
                });
                // 设置“方向”列的默认值为0，即使它在Excel文件中不存在
                processedRow['left_or_right'] = 1;

                return processedRow;
            });

            // 根据开始时间和结束时间分组数据
            groupedData.value = groupData(processedData);
            console.log(groupedData.value, 'groupedData.value')
            activeTab.value = 0;
        }
    };

    reader.readAsArrayBuffer(file);
};

// 点击表格某行的查看轨迹
const handleClickReviewTracks = (rowData: any) => {
    selectedRow.value = rowData;
    rowData.station_id = '121212'
    GenerateDataByStationAPI(rowData)
}

// 提交表格数据
const handleSubmitData = async() => {
    try {
        // 显示确认对话框
        await ElMessageBox.confirm('确定提交数据吗?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        });
        GenerateDataByMoreStationAPI()
    } catch (error) {
        // 如果用户取消，捕获异常并停止执行
        ElMessage.info('已取消删除');
    }
}

const GenerateDataByMoreStationAPI = async () => {
    try {
        // 调用表格数据接口
        const response = await GenerateDataByMoreStation(groupedData.value);
        const { code, data } = response.data || {}
        if (code == 1) {
            ElMessage.success('数据提交成功');
        } else {
            ElMessage.error('数据提交失败，请重试');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('数据提交失败：', error);
        ElMessage.error('数据提交失败，请重试');
    }
}

const GenerateDataByStationAPI = async (params: reviewTracksData) => {
    try {
        // 调用删除数据接口
        const response = await GenerateDataByStation(params);
        dialogVisible.value = true;
        const { code, data } = response.data || {}
        if (code == 1) {
            reviewTableData.value = data.map((item: [string, string]) => ({
                position: item[0],  // 显示的文本
                time: item[1]   // 实际的值
            }));
        } else {
            ElMessage.error('查看轨迹数据失败，请重试');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('查看轨迹数据失败：', error);
        ElMessage.error('查看轨迹数据失败，请重试');
    }
}
</script>
  
<style scoped lang="scss">
::v-deep(.el-upload-dragger) {
    padding: 15px;
}

.row-info {

    border: 1px solid $border-color-light;

    .title {
        background-color: #304156; // 标题背景颜色
        color: #fff; // 标题文字颜色
        padding: 5px; // 标题内边距
        text-align: center;
    }

    .info {
        padding: 20px 40px;
        line-height: 40px;

        .info-row {
            display: flex;
            justify-content: space-between;

            .label {
                text-align: right;
                flex-basis: 50%;
                font-weight: 600;
            }

            .value {
                text-align: left;
                flex-basis: 50%;
            }
        }
    }
}

.el-upload__tip {
    color: $color-accent;
}

.table-view {
    position: relative;

    .custom-submit-button {
        position: absolute;
        right: 0;
        top: 0;
        z-index: 100;
    }
}

.time-view {
    margin-bottom: 10px;

    .label {
        color: #3c4049; // 深灰色标签
        font-weight: 400;
    }

    .value {
        color: #607d8b; // 蓝灰色值
    }

    .time-span {
        margin-right: 20px; // 调整这个值来改变间隔的大小
    }


}
</style>
  
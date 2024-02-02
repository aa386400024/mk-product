<template>
    <div class="employee-management">
        <el-card class="form-card" shadow="never">
            <template #header>
                <div class="header-flex">
                    <div class="card-header">员工信息</div>
                    <el-form :model="{ user_code }" :rules="rules" ref="userCodeRef" class="header-form" inline>
                        <el-form-item class="form-item-inline" label="工号" prop="user_code">
                            <el-input v-model="user_code" size="small"></el-input>
                        </el-form-item>
                        <el-form-item class="form-item-inline">
                            <el-button type="primary" size="small" @click="fetchUserinfoData(userCodeRef)">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </template>
            <div v-if="userInfoData" class="userinfo-view">
                <span class="userinfo-span">
                    <span class="label">姓名：</span>
                    <span class="value">{{ userInfoData.name }}</span>
                </span>
                <span class="userinfo-span">
                    <span class="label">队组：</span>
                    <span class="value">{{ userInfoData.team }}</span>
                </span>
                <span class="userinfo-span">
                    <span class="label">工号：</span>
                    <span class="value">{{ userInfoData.id }}</span>
                </span>
                <span class="userinfo-span">
                    <span class="label">定位卡号：</span>
                    <span class="value">{{ userInfoData.cardNumber }}</span>
                </span>
            </div>
            <div v-else class="text item">请输入工号查询员工信息</div>
        </el-card>

        <!-- 入井实时轨迹添加部分 -->
        <el-card class="form-card" shadow="never">
            <template #header>
                <div class="card-header">入井实时轨迹设置</div>
            </template>
            <el-form :model="tracksForm" :rules="rules" ref="tracksRef" size="large" label-width="100px" class="form-grid">
                <el-form-item label="入井时间" prop="in_station_time">
                    <el-date-picker v-model="tracksForm.in_station_time" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择入井时间"
                        :disabledDate="(time: Date) => time.getTime() < Date.now() - 8.64e7"></el-date-picker>
                </el-form-item>
                <el-form-item label="出井时间" prop="out_station_time">
                    <el-date-picker v-model="tracksForm.out_station_time" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                        value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择出井时间"
                        :disabledDate="disabledDate"></el-date-picker>
                </el-form-item>


                <el-form-item label="班次" prop="shift_time_quantum_id">
                    <el-select v-model="tracksForm.shift_time_quantum_id" placeholder="请选择班次">
                        <el-option label="8点班" value="8"></el-option>
                        <el-option label="4点班" value="4"></el-option>
                        <el-option label="0点班" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="途径点个数" prop="waypoint_count">
                    <el-input-number v-model="tracksForm.waypoint_count" :min="1" :max="10"></el-input-number>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="form-card" shadow="never">
            <template #header>
                <div class="card-header">下井目的地设置</div>
            </template>
            <el-table :data="tableData" border stripe style="width: 100%"
                :header-cell-style="{ background: '#304156', color: '#fff' }" max-height="400">
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column label="下井目的地">
                    <template #default="{ row }">
                        <el-select v-model="row.station_id" filterable placeholder="请选择下井目的地">
                            <el-option v-for="(item, index) in stationOptions" :key="index" :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="途径时间" sortable>
                    <template #default="{ row, $index }">
                        <el-input v-model="row.in_station_time" placeholder="YYYY-MM-DD HH:MM:SS" maxlength="19" :disabled="$index === 0 || $index === tableData.length - 1"
                            @blur="updateDateTime($event.target.value, row)"
                            @input="(event: any) => restrictInput(event, row)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="scope">
                        <el-button size="small" type="danger" @click="deleteRow(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="add-row-container" @click="addRow">
                <span>点击此处新增一行</span>
            </div>
            <template #footer>
                <div class="footer-view"><el-button class="submit-button" size="large" type="primary"
                        @click="submitForm(tracksRef)">添加入井实时轨迹</el-button></div>
            </template>
        </el-card>
    </div>
</template>
  
<script setup lang="ts">
import { ref, Ref, reactive, onMounted, watch } from 'vue';
import type { FormInstance } from 'element-plus';
import { ElMessage } from 'element-plus';
import { addMoreData, GetStationInfo } from "@/api/tracks/tracks";

interface StationOption {
    label: string;
    value: string | number;
}

// 表格行数据接口
interface TableRow {
    id: number;
    station_id: string;
    in_station_time: string;
}

const tracksForm = reactive({
    in_station_time: '',
    out_station_time: '',
    shift_time_quantum_id: '',
    waypoint_count: 1
})

const user_code: Ref<string> = ref('');
const userInfoData: Ref<any> = ref(null);
const tracksRef = ref<FormInstance>();
const userCodeRef = ref<FormInstance>();

// 目的地选择选项
const stationOptions = ref([
    { label: '目的地A', value: 'A' },
    { label: '目的地B', value: 'B' },
    { label: '目的地C', value: 'C' },
    // 可以根据需要添加更多选项
]);

watch([() => tracksForm.in_station_time, () => tracksForm.out_station_time, () => tracksForm.waypoint_count], () => {
    if (tracksForm.in_station_time && tracksForm.out_station_time) {
        const startTime = new Date(tracksForm.in_station_time).getTime();
        const endTime = new Date(tracksForm.out_station_time).getTime();
        const count = Math.max(1, tracksForm.waypoint_count); // 确保途径点至少为1
        tableData.value = [];

        if (count === 1) {
            // 如果只有一个途径点，直接使用入井和出井时间
            tableData.value.push({
                id: 1,
                station_id: '',
                in_station_time: tracksForm.in_station_time
            });
        } else {
            // 多个途径点时，计算每个途径点的时间
            const interval = (endTime - startTime) / (count - 1);
            for (let i = 0; i < count; i++) {
                let time = new Date(startTime + interval * i);
                // 对于第一个和最后一个途径点，直接使用入井和出井时间
                let formattedTime = formatTime(time);
                if (i === 0) formattedTime = tracksForm.in_station_time;
                if (i === count - 1) formattedTime = tracksForm.out_station_time;

                tableData.value.push({
                    id: i + 1,
                    station_id: '',
                    in_station_time: formattedTime
                });
            }
        }
    }
}, { deep: true });




// 表格数据
const tableData = ref<TableRow[]>([
    { id: 1, station_id: '', in_station_time: '' }
])

// 新增行的ID计数器
let nextId = 2

// 定义校验规则
const rules = reactive({
    user_code: [
        { required: true, message: '请输入工号', trigger: 'blur' },
        { pattern: /^\d+$/, message: '工号必须是数字', trigger: 'blur' }
    ],
    in_station_time: [
        { required: true, type: 'date', message: '请选择入井时间', trigger: 'blur' }
    ],
    out_station_time: [
        { required: true, type: 'date', message: '请选择出井时间', trigger: 'blur' }
    ],
    shift_time_quantum_id: [
        { required: true, message: '请选择班次', trigger: 'change' }
    ],
});

const formatTime = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const disabledDate = (time: Date) => {
    // 入井时间转换为时间戳
    const inTime = tracksForm.in_station_time ? new Date(tracksForm.in_station_time).getTime() : null;
    if (!inTime) {
        // 如果没有设置入井时间，则不禁用任何日期
        return false;
    }

    // 获取当前时间的0时0分0秒的时间戳
    const today = new Date().setHours(0, 0, 0, 0);

    // 如果选择的日期是今天之前的日期，则禁用
    if (time.getTime() < today) {
        return true;
    }

    // 如果选择的日期是入井日期当天，则只禁用入井时间之前的时间
    const inDate = new Date(inTime).setHours(0, 0, 0, 0);
    const selectedDate = new Date(time).setHours(0, 0, 0, 0);
    if (inDate === selectedDate) {
        return time.getTime() < inTime;
    }

    // 如果选择的日期早于入井日期，则禁用
    return selectedDate < inDate;
};



// 新增行
const addRow = () => {
    const newRow = { id: nextId++, station_id: '', in_station_time: '' };
    tableData.value.push(newRow);
    tracksForm.waypoint_count = tableData.value.length; // 同步更新计步器的值
}

// 删除行
const deleteRow = (row: TableRow) => {
    const index = tableData.value.findIndex(item => item.id === row.id);
    if (index !== -1) {
        tableData.value.splice(index, 1);
        tracksForm.waypoint_count = tableData.value.length; // 同步更新计步器的值
    }
}


// 更新日期时间格式验证
const updateDateTime = (value: string, row: TableRow) => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
    if (!regex.test(value)) {
        ElMessage.error('日期时间格式不正确，正确格式为YYYY-MM-DD HH:MM:SS')
        row.in_station_time = ''
        return false
    }
    const parts = value.split(/[- :]/g);
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);
    const second = parseInt(parts[5]);
    if (month < 1 || month > 12 || day < 1 || day > 31 || hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
        ElMessage.error('日期或时间不正确')
        row.in_station_time = ''
        return false
    }
    const maxDay = new Date(year, month, 0).getDate();
    if (day > maxDay) {
        ElMessage.error('日期不正确')
        row.in_station_time = ''
        return false
    }
    row.in_station_time = value
    return true
}


// 限制输入只能为数字和短横线，并且格式必须为YYYY-MM-DD HH:MM:SS
const restrictInput = (event: any, row: TableRow) => {
    const regex = /^(\d{0,4}|\d{4}-\d{0,2}|\d{4}-\d{2}-\d{0,2}|\d{4}-\d{2}-\d{2} \d{0,2}|\d{4}-\d{2}-\d{2} \d{2}:\d{0,2}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{0,2})$/
    if (!regex.test(event)) {
        row.in_station_time = row.in_station_time.slice(0, -1)
    }
}

const fetchUserinfoAPI = async () => {
    try {
        // 调用删除数据接口
        const response = await addMoreData({});
        const { code } = response.data || {}
        if (code == 1) {
            userInfoData.value = {
                name: '',
                team: '',
                user_code: '',
                card_number: ''
            };
        } else {
            ElMessage.error('查询用户信息失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('查询用户信息失败：', error);
        ElMessage.error('查询用户信息失败，请重试');
    }
};

const fetchUserinfoData = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            fetchUserinfoAPI()
        } else {
            console.error('校验失败');
            return false
        }
    })
}

// 基站编号下拉菜单数据
const GetStationInfoAPI = async () => {
    try {
        // 调用基站编号的数据接口
        const response = await GetStationInfo({});
        const { code, data } = response.data || {}
        if (code == 1) {
            stationOptions.value = data.map((item: [string, string]) => ({
                label: `${item[1]}(${item[0]})`,  // 显示的文本
                value: item[1]   // 实际的值
            }));
        } else {
            stationOptions.value = []
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('获取数据失败：', error);
    }
}

// 添加入井实时轨迹
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    // 检查是否已获取用户信息
    if (!userInfoData.value || !userInfoData.value.name) {
        ElMessage.error('请先查询并确认员工信息');
        return; // 提前退出函数，不执行表单提交
    }

    formEl.validate((valid) => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}

onMounted(async () => {
    GetStationInfoAPI()
});
</script>

<style scoped lang="scss">
.employee-management {

    :deep(.el-date-editor.el-input),
    :deep(.el-date-editor.el-input__wrapper) {
        --el-date-editor-width: 100%; // 设置日期编辑器的宽度为 100%
    }

    .form-card {
        margin-bottom: 15px;

        .add-row-container {
            margin-top: 10px;
            padding: 6px 0;
            text-align: center;
            border: 2px dashed $border-color-medium;
            cursor: pointer;
            color: $color-primary;
            font-size: 14px;
            border-radius: 4px;

            &:hover {
                background-color: #f5f7fa;
            }
        }


        .footer-view {
            display: flex;
            justify-content: center;

            .submit-button {
                width: 200px;
            }
        }


        .header-flex {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-header {
            font-size: 18px;
            font-weight: bold;
            margin-right: auto;
            color: $color-text-primary;
        }

        .userinfo-view {
            font-size: 16px;

            .label {
                color: #3c4049; // 深灰色标签
                font-weight: 400;
            }

            .value {
                color: #607d8b; // 蓝灰色值
            }

            .userinfo-span {
                margin-right: 40px; // 调整这个值来改变间隔的大小
            }
        }

        ::v-deep(.el-card__header) {
            padding: 10px 0 10px 20px;
        }

        .header-form {
            display: flex;
            align-items: center;

            .form-item-inline {
                margin-bottom: 0; // 移除 margin-bottom 减少额外空间
            }

            .el-form-item {
                margin-bottom: 0; // 确保 Form Item 不增加额外的底部空间
            }

            .el-input,
            .el-button {
                height: 32px; // 调整输入框和按钮的高度，确保它们不会过大
            }
        }

        .form-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;

            .el-form-item {
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;

                .el-input,
                .el-input-number,
                .el-select,
                .el-date-picker {
                    width: 100%; // 确保所有输入控件宽度一致
                }
            }
        }
    }


    .box-card {
        margin-top: 20px;
        border-radius: 8px;
    }

    .text.item {
        display: flex;
        justify-content: center;
    }
}
</style>

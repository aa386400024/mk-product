<template>
    <el-dialog v-model="dialogVisible" title="基站轨迹预览" width="70%" :close-on-click-modal="false">
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="row-info">
                    <h1 class="title">员工信息</h1>
                    <div class="info">
                        <div class="info-row">
                            <span class="label">工号：</span>
                            <span class="value">{{ userInfoData[0].name }}</span>
                        </div>

                        <div class="info-row">
                            <span class="label">进站时间：</span><span class="value">{{ selectedRow?.in_station_time }}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">出站时间：</span><span class="value">{{ selectedRow?.out_station_time }}</span>
                        </div>
                        <div class="info-row">
                            <span class="label">站点名称：</span><span class="value">{{ selectedRow?.selectedStation?.label }}</span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <el-table :data="reviewTableData" stripe border max-height="320" style="width: 100%; margin-bottom: 20px"
                    :header-cell-style="{ background: '#304156', color: '#fff' }">
                    <el-table-column type="index" label="序号" width="80" />
                    <el-table-column prop="position" label="轨迹位置" />
                    <el-table-column prop="time" label="轨迹时间" />
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>
    <div class="employee-management">
        <el-card class="form-card" shadow="never">
            <template #header>
                <div class="header-flex">
                    <div class="card-header">任务进度</div>
                    <div class="header-form refresh-progress">
                        <el-button type="primary" size="small" @click="handleRefreshProgressBtn">刷新进度</el-button>
                    </div>
                </div>
            </template>
            <el-table :data="taskProgressTableList" stripe border style="width: 100%"
            :header-cell-style="{ background: '#304156', color: '#fff' }">
                <el-table-column prop="user_code" label="工号" />
                <el-table-column prop="start_time" label="开始时间" />
                <el-table-column prop="end_time" label="结束时间" />
                <el-table-column label="进度">
                <template #default="{ row }">
                    <el-progress :percentage="row.progress"></el-progress>
                </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" />
                <el-table-column label="操作" width="100">
                    <template #default="{ row }">
                        <el-button size="small" type="danger" @click="handleDeleteTaskProgressRow(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
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
                <el-table :data="userInfoData" stripe border style="width: 100%"
                    :header-cell-style="{ background: '#304156', color: '#fff' }">
                    <el-table-column prop="name" label="姓名" />
                    <el-table-column prop="user_code" label="工号" />
                    <el-table-column prop="card_number" label="卡号" />
                </el-table>
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
                        <el-option label="零点班" :value="1"></el-option>
                        <el-option label="八点班" :value="2"></el-option>
                        <el-option label="四点班" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="途径点个数" prop="waypoint_count">
                    <el-input-number v-model="tracksForm.waypoint_count" :min="1" :max="10"></el-input-number>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="form-card" shadow="never">
            <template #header>
                <div class="card-header">下井途径点设置</div>
            </template>
            <el-table :data="tableData" border stripe style="width: 100%"
                :header-cell-style="{ background: '#304156', color: '#fff' }" max-height="400">
                <el-table-column type="index" label="序号" width="80" />
                <el-table-column label="途径点">
                    <template #default="{ row }">
                        <el-select v-model="row.selectedStation" filterable placeholder="请选择途径点"
                            @change="updateSelectedStation(row, $event)">
                            <el-option v-for="(item, index) in stationOptions" :key="index" :label="item.label"
                                :value="item">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>

                <el-table-column label="途径点开始时间">
                    <template #default="{ row, $index }">
                        <el-input v-model="row.in_station_time" placeholder="YYYY-MM-DD HH:MM:SS" maxlength="19"
                            :disabled="$index === 0" @blur="updateDateTime($event.target.value, row, 'in')"
                            @input="(event: any) => restrictInput(event, row)" />
                    </template>
                </el-table-column>
                <el-table-column label="途径点结束时间">
                    <template #default="{ row, $index }">
                        <el-input v-model="row.out_station_time" placeholder="YYYY-MM-DD HH:MM:SS" maxlength="19"
                            :disabled="$index === tableData.length - 1"
                            @blur="updateDateTime($event.target.value, row, 'out')"
                            @input="(event: any) => restrictInput(event, row)" />
                    </template>
                </el-table-column>
                <el-table-column label="方向">
                    <template #default="{ row }">
                        <el-radio-group v-model="row.left_or_right">
                            <el-radio :label="1">左</el-radio>
                            <el-radio :label="2">右</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="200">
                    <template #default="{ row }">
                        <el-button plain type="primary" size="small"
                            @click="handleClickReviewTracks(row)">该基站轨迹预览</el-button>
                        <el-button size="small" type="danger" @click="deleteRow(row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="add-row-container" @click="addRow">
                <span>点击此处新增一行</span>
            </div>
            <template #footer>
                <div class="footer-view">
                    <el-button class="submit-button" size="large" type="danger" @click="handleSubmitData(tracksRef)">
                        提交数据
                    </el-button>
                </div>
            </template>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, Ref, reactive, onMounted, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserInfo, saveDataByMoreStation, getAllJobs, delJobs } from '@/api/tracks/mining-real-time-tracking'
import { GetStationInfo, GenerateDataByStation } from '@/api/tracks/tracks'

interface StationOption {
    label: string
    value: string | number
}

interface SelectedStation {
    label: string
    value: string | number
}

// 表格行数据接口
interface TableRow {
    id: number;
    station_id: string;
    in_station_time: string;
    out_station_time: string;
    left_or_right: number;
    selectedStation?: SelectedStation;
}

interface UserInfoTableRow {
    card_number: string
    user_code: string
    name: string
}

interface SelectedRow {
    in_station_time: string
    out_station_time: string
    start_time: string
    end_time: string
    station_name: string
    left_or_right: number
    user_code: string
}

interface reviewTracksData {
    station_name: string
    in_station_time: string
    out_station_time: string
    left_or_right: number
}

const tracksForm = reactive({
    in_station_time: '',
    out_station_time: '',
    shift_time_quantum_id: 1,
    waypoint_count: 1
})

const user_code: Ref<string> = ref('')
const userInfoData = ref<UserInfoTableRow[]>([])
const tracksRef = ref<FormInstance>()
const userCodeRef = ref<FormInstance>()
const selectedRow = ref<SelectedRow | null>(null)
const dialogVisible = ref(false)
const reviewTableData = ref([])
const taskProgressTableList = ref([])

// 目的地选择选项
const stationOptions = ref([])

watch(
    [
        () => tracksForm.in_station_time,
        () => tracksForm.out_station_time,
        () => tracksForm.waypoint_count
    ],
    () => {
        if (tracksForm.in_station_time && tracksForm.out_station_time) {
            const startTime = new Date(tracksForm.in_station_time).getTime()
            const endTime = new Date(tracksForm.out_station_time).getTime()
            const totalTime = endTime - startTime
            const count = Math.max(1, tracksForm.waypoint_count)

            // 保存现有的 station_id 值
            // 保存现有的 station_id 和 left_or_right 值
            const existingRows = tableData.value.map((row) => ({
                selectedStation: row.selectedStation,
                leftOrRight: row.left_or_right
            }));

            tableData.value = [] // 清空数组前先保存station_id

            const timePerWaypoint = (totalTime - (count - 1) * 3 * 60 * 1000) / count

            for (let i = 0; i < count; i++) {
                let inTime, outTime

                if (i === 0) {
                    inTime = new Date(startTime)
                    outTime = new Date(startTime + timePerWaypoint)
                } else {
                    inTime = new Date(startTime + i * timePerWaypoint + i * 3 * 60 * 1000)
                    outTime = new Date(inTime.getTime() + timePerWaypoint)
                }

                if (i === count - 1 && outTime.getTime() > endTime) {
                    outTime = new Date(endTime)
                }

                // 在这里重新应用保存的 station_id 和 left_or_right
                const existingRow = existingRows[i];

                tableData.value.push({
                    id: i + 1,
                    station_id: existingRow?.selectedStation?.value ?? '',
                    selectedStation: existingRow?.selectedStation,
                    in_station_time: formatTime(inTime),
                    out_station_time: formatTime(outTime),
                    left_or_right: existingRow?.leftOrRight ?? 1 // 如果没有保存的值，默认设置为1
                });
            }
        }
    },
    { deep: true }
)

// 表格数据
const tableData = ref<TableRow[]>([
    { id: 1, station_id: '', in_station_time: '', out_station_time: '', left_or_right: 1 }
])

// 新增行的ID计数器
let nextId = 2

// 定义校验规则
const rules = reactive({
    user_code: [
        { required: true, message: '请输入工号', trigger: 'blur' },
        { pattern: /^\d+$/, message: '工号必须是数字', trigger: 'blur' }
    ],
    in_station_time: [{ required: true, type: 'date', message: '请选择入井时间', trigger: 'blur' }],
    out_station_time: [{ required: true, type: 'date', message: '请选择出井时间', trigger: 'blur' }],
    shift_time_quantum_id: [{ required: true, message: '请选择班次', trigger: 'change' }]
})

const formatTime = (date: Date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const disabledDate = (time: Date) => {
    // 入井时间转换为时间戳
    const inTime = tracksForm.in_station_time ? new Date(tracksForm.in_station_time).getTime() : null
    if (!inTime) {
        // 如果没有设置入井时间，则不禁用任何日期
        return false
    }

    // 获取当前时间的0时0分0秒的时间戳
    const today = new Date().setHours(0, 0, 0, 0)

    // 如果选择的日期是今天之前的日期，则禁用
    if (time.getTime() < today) {
        return true
    }

    // 如果选择的日期是入井日期当天，则只禁用入井时间之前的时间
    const inDate = new Date(inTime).setHours(0, 0, 0, 0)
    const selectedDate = new Date(time).setHours(0, 0, 0, 0)
    if (inDate === selectedDate) {
        return time.getTime() < inTime
    }

    // 如果选择的日期早于入井日期，则禁用
    return selectedDate < inDate
}

// 新增行
const addRow = () => {
    const newRow = { id: nextId++, station_id: '', in_station_time: '', out_station_time: '', left_or_right: 1 } // 确保新行的格式与其他行相匹配
    tableData.value.push(newRow)
    tracksForm.waypoint_count = tableData.value.length // 同步更新计步器的值
}

// 删除行
const deleteRow = (row: TableRow) => {
    const index = tableData.value.findIndex((item) => item.id === row.id)
    if (index !== -1) {
        tableData.value.splice(index, 1)
        tracksForm.waypoint_count = tableData.value.length // 同步更新计步器的值
    }
}

// 更新日期时间格式验证
const updateDateTime = (value: string, row: TableRow, type: 'in' | 'out') => {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
    if (!regex.test(value)) {
        ElMessage.error('日期时间格式不正确，正确格式为YYYY-MM-DD HH:MM:SS')
        if (type === 'in') {
            row.in_station_time = ''
        } else {
            row.out_station_time = ''
        }
        return false
    }
    const parts = value.split(/[- :]/g)
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)
    const hour = parseInt(parts[3], 10)
    const minute = parseInt(parts[4], 10)
    const second = parseInt(parts[5], 10)
    if (
        month < 1 ||
        month > 12 ||
        day < 1 ||
        day > 31 ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59 ||
        second < 0 ||
        second > 59
    ) {
        ElMessage.error('日期或时间不正确')
        if (type === 'in') {
            row.in_station_time = ''
        } else {
            row.out_station_time = ''
        }
        return false
    }
    const maxDay = new Date(year, month, 0).getDate()
    if (day > maxDay) {
        ElMessage.error('日期不正确')
        if (type === 'in') {
            row.in_station_time = ''
        } else {
            row.out_station_time = ''
        }
        return false
    }
    if (type === 'in') {
        row.in_station_time = value
    } else {
        row.out_station_time = value
    }
    return true
}

// 限制输入只能为数字和短横线，并且格式必须为YYYY-MM-DD HH:MM:SS
const restrictInput = (event: any, row: TableRow) => {
    const regex =
        /^(\d{0,4}|\d{4}-\d{0,2}|\d{4}-\d{2}-\d{0,2}|\d{4}-\d{2}-\d{2} \d{0,2}|\d{4}-\d{2}-\d{2} \d{2}:\d{0,2}|\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{0,2})$/
    if (!regex.test(event)) {
        row.in_station_time = row.in_station_time.slice(0, -1)
    }
}

// 更新选中的途径点
const updateSelectedStation = (row: any, selectedOption: any) => {
    // 假设row有一个属性叫selectedStation来存储选中的整个对象
    console
    row.selectedStation = selectedOption;
};

// 点击表格某行的查看轨迹
const handleClickReviewTracks = (rowData: any) => {
    selectedRow.value = rowData
    console.log(rowData, 'rowDatarowData')
    const params = {
        in_station_time: rowData.in_station_time,
        out_station_time: rowData.out_station_time,
        left_or_right: 1,
        station_name: rowData.selectedStation?.label || '未选择',
    }
    GenerateDataByStationAPI(params)
}

const GenerateDataByStationAPI = async (params: reviewTracksData) => {
    try {
        // 调用轨迹数据接口
        const response = await GenerateDataByStation(params)
        dialogVisible.value = true
        const { code, data } = response.data || {}
        if (code == 1) {
            reviewTableData.value = data.map((item: [string, string]) => ({
                position: item[0], // 显示的文本
                time: item[1] // 实际的值
            }))
        } else {
            ElMessage.error('查看轨迹数据失败，请重试')
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('查看轨迹数据失败：', error)
        ElMessage.error('查看轨迹数据失败，请重试')
    }
}

const fetchUserinfoAPI = async () => {
    try {
        const params = {
            user_code: user_code.value
        }
        // 调用用户信息数据接口
        const response = await getUserInfo(params)
        const { code, data } = response.data || {}
        if (code == 1) {
            userInfoData.value = [
                {
                    name: data[1],
                    user_code: data[0],
                    card_number: data[2]
                }
            ]
        } else {
            ElMessage.error('查询用户信息失败')
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('查询用户信息失败：', error)
        ElMessage.error('查询用户信息失败，请重试')
    }
}

const fetchUserinfoData = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            fetchUserinfoAPI()
        } else {
            console.error('校验失败')
            return false
        }
    })
}

// 基站编号下拉菜单数据
const GetStationInfoAPI = async () => {
    try {
        // 调用基站编号的数据接口
        const response = await GetStationInfo({})
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
        console.error('获取数据失败：', error)
    }
}

// 添加入井实时轨迹
const handleSubmitData = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;

    // 检查是否已获取用户信息
    if (!userInfoData.value || userInfoData.value.length === 0 || !userInfoData.value[0].name) {
        ElMessage.error('请先查询并确认员工信息');
        return; // 提前退出函数，不执行表单提交
    }

    // 检查 tableData 中的每一项
    for (const row of tableData.value) {
        // 检查途径点是否选择
        if (!row.selectedStation || !row.selectedStation.value) {
            ElMessage.error('每个途径点都必须选择');
            return; // 提前退出函数，不执行后续操作
        }

        // 检查途径点开始时间和结束时间是否填写
        if (!row.in_station_time || !row.out_station_time) {
            ElMessage.error('每个途径点的开始时间和结束时间都必须填写');
            return; // 提前退出函数，不执行后续操作
        }

        // 检查途径点结束时间是否大于开始时间
        const startTime = new Date(row.in_station_time).getTime();
        const endTime = new Date(row.out_station_time).getTime();
        if (endTime <= startTime) {
            ElMessage.error('途径点的结束时间必须大于开始时间');
            return; // 提前退出函数，不执行后续操作
        }

        // 检查方向是否选择
        if (row.left_or_right === undefined || row.left_or_right === null) {
            ElMessage.error('每个途径点的方向都必须选择');
            return; // 提前退出函数，不执行后续操作
        }
    }

    try {
        // 首先执行表单验证
        const valid = await formEl.validate();
        if (!valid) {
            console.log('error submit!');
            return false; // 如果表单验证失败，退出函数
        }

        // 表单验证通过后，显示确认对话框
        await ElMessageBox.confirm('确定提交数据吗?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        });

        // 用户确认后执行API调用
        saveDataByMoreStationAPI(); // 假设这是你的API调用函数
    } catch (error) {
        // 如果用户取消或者确认对话框出现错误，捕获异常
        if (error === 'cancel') {
            ElMessage.info('已取消提交');
        } else {
            // 可以根据实际需要处理其他类型的错误
            console.error('提交过程中出现错误:', error);
            ElMessage.error('提交失败');
        }
    }
};

const saveDataByMoreStationAPI = async () => {
    try {
        const params = {
            tableData: tableData.value,
            tracksForm: tracksForm,
            userInfoData: userInfoData.value
        }
        // 调用表格数据接口
        const response = await saveDataByMoreStation(params);
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

const handleRefreshProgressBtn = () => {
    fetchTaskProgressAPI()
}

// 点击删除任务进度表格里的某行数据
const handleDeleteTaskProgressRow = async (row: any) => {
    try {
        // 显示确认对话框
        await ElMessageBox.confirm('确定删除当前进度数据吗?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        });
        delJobsAPI(row)
    } catch (error) {
        // 如果用户取消，捕获异常并停止执行
        ElMessage.info('已取消删除');
    }
}

const delJobsAPI = async (row: any) => {
    try {
        const response = await delJobs(row);
        const { code } = response.data || {};
        if (code == 1) {
            ElMessage.success('任务进度数据删除成功');
        } else {
            ElMessage.error('任务进度数据删除失败，请重试');
        }
        fetchTaskProgressAPI()
    } catch (error) {
        console.error('任务进度数据删除失败: ', error);
        ElMessage.error('任务进度数据删除失败，请重试');
    }
}

const fetchTaskProgressAPI = async () => {
    try {
        const response = await getAllJobs({});
        const { code, data } = response.data || {};
        if (code == 1) {
            const now = Date.now();
            taskProgressTableList.value = data.map((item:any) => {
                const start_time = new Date(item[1]).getTime();
                const end_time = new Date(item[2]).getTime();
                let progress = 0;
                let status = '';

                if (now < start_time) {
                    status = '未开始';
                } else if (now >= start_time && now <= end_time) {
                    status = '运行中';
                    progress = ((now - start_time) / (end_time - start_time)) * 100;
                    // 保留两位小数并转换为数字
                    progress = parseFloat(progress.toFixed(2));
                } else {
                    status = '已完成';
                    progress = 100;
                }

                return {
                    user_code: item[0],
                    start_time: item[1],
                    end_time: item[2],
                    progress,
                    status,
                };
            });
        } else {
            taskProgressTableList.value = [];
            ElMessage.error('任务进度数据获取失败，请重试');
        }
    } catch (error) {
        console.error('任务进度数据获取失败: ', error);
        ElMessage.error('任务进度数据获取失败，请重试');
    }
};


onMounted(async () => {
    GetStationInfoAPI()
    fetchTaskProgressAPI()
})
</script>

<style scoped lang="scss">
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
            margin-bottom: 20px;

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
        
        .refresh-progress {
            margin-right: 30px;
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

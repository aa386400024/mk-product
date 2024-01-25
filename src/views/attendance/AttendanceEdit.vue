<template>
    <el-dialog v-model="dialogVisible" title="考勤偏移设置" width="70%" :close-on-click-modal="false">
        <div>
            <el-form :inline="true" label-width="120px">
                <el-form-item label="当前入井时间：">
                    <span>{{ selectedStartTime }}</span>
                </el-form-item>
                <el-form-item label="当前出井时间：">
                    <span>{{ selectedEndTime }}</span>
                </el-form-item>
                <el-form-item label="偏移小时数">
                    <el-input-number v-model="offsetTime" :min="-24" :max="24"></el-input-number>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleComputeDateRange">计算偏移</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table :data="reviewTableData" stripe border default-expand-all row-key="id" style="width: 100%">
                <el-table-column prop="id" label="工号" />
                <el-table-column prop="userInfoCode" label="员工编号" width="90" />
                <el-table-column prop="cardCode" label="员工卡号" width="90" />
                <el-table-column prop="userName" label="员工姓名" width="90" />
                <el-table-column prop="positionName" label="职务名称" width="90" />
                <el-table-column prop="dutyName" label="工种名称" width="90" />
                <el-table-column prop="userState" label="员工状态" width="90" />
                <el-table-column prop="userType" label="员工类型" width="90" />
                <el-table-column prop="inWellTime" label="入井时间" width="160" />
                <el-table-column prop="outWellTime" label="出井时间" width="160" />
                <el-table-column prop="downStopTime" label="井下停留时长" width="120" />
                <el-table-column prop="className" label="班次名称" width="90" />
            </el-table>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="danger" @click="submitAttendance">
                    确认偏移
                </el-button>
            </span>
        </template>
    </el-dialog>
    <div class="form-container">
        <el-form ref="formRef" :inline="true" :model="form" :rules="rules" size="large" class="custom-form">
            <el-form-item label="工号" prop="userInfoCode">
                <el-input v-model="form.userInfoCode" />
            </el-form-item>
            <el-form-item label="开始时间" prop="startDate">
                <el-date-picker v-model="form.startDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期和时间" />
            </el-form-item>
            <el-form-item label="结束时间" prop="endDate">
                <el-date-picker v-model="form.endDate" type="date" value-format="YYYY-MM-DD" placeholder="选择日期和时间" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询数据</el-button>
                <el-button @click="onReset">清空表单</el-button>
            </el-form-item>
        </el-form>
    </div>

    <el-table :data="tableData" stripe max-height="250" style="width: 100%">
        <el-table-column prop="id" label="工号" />
        <el-table-column prop="userInfoCode" label="员工编号" />
        <el-table-column prop="cardCode" label="员工卡号" />
        <el-table-column prop="userName" label="员工姓名" />
        <el-table-column prop="positionName" label="职务名称" />
        <el-table-column prop="dutyName" label="工种名称" />
        <el-table-column prop="userState" label="员工状态" />
        <el-table-column prop="userType" label="员工类型" />
        <el-table-column prop="inWellTime" label="入井时间" width="160" />
        <el-table-column prop="outWellTime" label="出井时间" width="160" />
        <el-table-column prop="downStopTime" label="井下停留时长" width="120" />
        <el-table-column prop="className" label="班次名称" />
        <el-table-column fixed="right" label="操作" width="120">
            <template #default="{ row }">
                <el-button plain type="primary" size="small" @click="handleClickEdit(row)">设置偏移</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted, Ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { HistoryInwellRecord, HistoryInwellRecordPreview, HistoryInwellRecordConfim } from '@/api/attendance';

interface FormData {
    userInfoCode: string;
    startDate: string;
    endDate: string;
}

interface offsetFormData {
    user_code: string;
    locHistoryId: number;
    offsetTime: number;
}

// 定义表格数据的类型
interface TableDataItem {
    id: number;
    userInfoCode: string;
    cardCode: string;
    userName: string;
    positionName: string;
    dutyName: string;
    userState: string;
    userType: string;
    inWellTime: string;
    outWellTime: string;
    downStopTime: string;
    className: string;
}

const formRef: Ref = ref(null);
const dialogVisible = ref(false)
const selectedRow = ref<TableDataItem | null>(null);
const offsetTime = ref(0);

const selectedStartTime = computed(() => selectedRow.value?.inWellTime);
const selectedEndTime = computed(() => selectedRow.value?.outWellTime);

const form: FormData = reactive({
    userInfoCode: '',
    startDate: '',
    endDate: '',
})

const tableData = ref<TableDataItem[]>([
    {
        id: 15,
        userInfoCode: '68483',
        cardCode: '56482',
        userName: '耿磊',
        positionName: '耿磊',
        dutyName: '管理人员',
        userState: '员工',
        userType: '普通员工',
        inWellTime: '2023-08-30 14:50:21',
        outWellTime: '2023-08-30 16:56:17',
        downStopTime: '2小时6分钟',
        className: '三班早班',
    }
]);

const reviewTableData = ref<TableDataItem[]>([
    {
        id: 15,
        userInfoCode: '68483',
        cardCode: '56482',
        userName: '耿磊',
        positionName: '耿磊',
        dutyName: '管理人员',
        userState: '员工',
        userType: '普通员工',
        inWellTime: '2023-08-30 14:50:21',
        outWellTime: '2023-08-30 16:56:17',
        downStopTime: '2小时6分钟',
        className: '三班早班',
    }
]);
const rules = {
    userInfoCode: [
        { required: true, message: '请输入工号', trigger: 'blur' }
    ],
    startDate: [
        { required: true, type: 'date', message: '请选择开始时间', trigger: 'blur' }
    ],
    endDate: [
        { required: true, type: 'date', message: '请选择结束时间', trigger: 'blur' }
    ]
};

// 点击表格某行的偏移设置
const handleClickEdit = (rowData: TableDataItem) => {
    selectedRow.value = rowData;
    dialogVisible.value = true
}

// 确认提交偏移量设置
const submitAttendance = () => {
    const params = {
        user_code: selectedRow.value?.userInfoCode,
        locHistoryId: selectedRow.value?.id,
        offsetTime: offsetTime.value
    }
    confirmHistoryInwellRecordAPI(params)
}

// 获取数据接口
const HistoryInwellRecordAPI = async (params: FormData) => {
    try {
        // 调用删除数据接口
        const response = await HistoryInwellRecord(params);
        const { code, data } = response.data || {}
        if (code == 1) {
            ElMessage.success('数据获取成功');
            // 在这里添加其他操作，如清空表单等

            tableData.value = data;
        } else {
            ElMessage.error('数据获取失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('获取数据失败：', error);
        ElMessage.error('获取数据失败，请重试');
    }
}

const HistoryInwellRecordPreviewAPI = async (params: offsetFormData) => {
    try {
        // 调用删除数据接口
        const response = await HistoryInwellRecordConfim(params);
        const { code, data } = response.data || {}
        if (code == 1) {
            ElMessage.success('获取数据成功');
            reviewTableData.value = data;
        } else {
            ElMessage.error('获取数据失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('获取数据失败：', error);
        ElMessage.error('获取数据失败，请重试');
    }
}

// 确定提交偏移
const confirmHistoryInwellRecordAPI = async (params: offsetFormData) => {
    try {
        // 调用删除数据接口
        const response = await HistoryInwellRecordPreview(params);
        const { code, data } = response.data || {}
        if (code == 1) {
            ElMessage.success('提交数据成功');
            dialogVisible.value = false
        } else {
            ElMessage.error('提交数据失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('提交数据失败：', error);
        ElMessage.error('提交数据失败，请重试');
    }
}

// 计算偏移时间返回表格数据
const handleComputeDateRange = () => {
    const params = {
        user_code: selectedRow.value?.userInfoCode,
        locHistoryId: selectedRow.value?.id,
        offsetTime: offsetTime.value
    }
    HistoryInwellRecordPreviewAPI(params)
}

// 检查日期范围是否超过7天的方法
const isDateRangeWithin7Days = (startDate: string | Date, endDate: string | Date): boolean => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
};

const handleSearch = () => {
    if (formRef.value) {
        formRef.value.validate((valid: boolean) => {
            if (valid) {
                // 使用 isDateRangeWithin7Days 方法来检查日期范围
                if (!isDateRangeWithin7Days(form.startDate, form.endDate)) {
                    ElMessage.error('开始时间和结束时间的区间不得超过7天');
                    return false;
                }
                HistoryInwellRecordAPI(form);
            } else {
                console.error('校验失败');
                return false;
            }
        });
    } else {
        console.error('表单引用未找到');
    }
};

const onReset = () => {
    if (formRef.value) {
        formRef.value.resetFields();
    } else {
        console.error('表单引用未找到');
    }
}
</script>

<style scoped lang="scss">
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5; // 背景颜色
    margin-bottom: 20px;

    .custom-form {
        width: 100%;
        margin: auto;
        padding: 20px;
        background-color: #ffffff; // 表单背景颜色
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        grid-gap: 30px; // 格子间距

    }
}
</style>

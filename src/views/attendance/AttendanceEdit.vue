<template>
    <div class="form-container">
        <el-form ref="formRef" :model="form" :rules="rules" size="large" label-width="150px" class="custom-form">
            <el-form-item label="工号" prop="user_code">
                <el-input v-model="form.user_code" />
            </el-form-item>
            <el-form-item label="基站编号" prop="station_id">
                <el-input v-model="form.station_id" />
            </el-form-item>
            <el-form-item label="左天线读卡距离" prop="left_read_distance">
                <el-input-number v-model="form.left_read_distance" :min="0" :max="500" />
            </el-form-item>
            <el-form-item label="右天线读卡距离" prop="right_read_distance">
                <el-input-number v-model="form.right_read_distance" :min="0" :max="500" />
            </el-form-item>
            <el-form-item label="左天线所占轨迹比例" prop="left_count_ratio">
                <el-input-number v-model="form.left_count_ratio" :min="1" :max="100" />
            </el-form-item>
            <el-form-item label="右天线所占轨迹比例" prop="right_count_ratio">
                <el-input-number v-model="form.right_count_ratio" :min="1" :max="100" />
            </el-form-item>
            <el-form-item label="进入该基站时间" prop="in_station_time">
                <el-date-picker v-model="form.in_station_time" type="datetime" placeholder="选择日期和时间" />
            </el-form-item>
            <el-form-item label="离开该基站时间" prop="out_station_time">
                <el-date-picker v-model="form.out_station_time" type="datetime" placeholder="选择日期和时间" />
            </el-form-item>
            <el-form-item label="方向" prop="left_or_right">
                <el-select v-model="form.left_or_right" placeholder="请选择">
                    <el-option label="左" :value="0"></el-option>
                    <el-option label="右" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">查询数据</el-button>
                <el-button type="success" @click="onSubmit">提交查询数据到数据库</el-button>
                <el-button @click="onReset">清空表单</el-button>
            </el-form-item>
        </el-form>
    </div>

    <el-table :data="tableData" stripe max-height="250" style="width: 100%">
        <el-table-column prop="user_code" label="工号" />
        <el-table-column prop="station_id" label="基站编号" />
        <el-table-column prop="left_or_right" label="方向" />
        <el-table-column prop="distance" label="距离(分米)" />
        <el-table-column prop="time" label="时间" />
    </el-table>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted, Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { generateData, addMoreData, GetStationInfo } from '@/api/func';

// 定义后端返回数据的类型
interface BackendDataItem {
    [key: string]: any; // 替换为具体的类型定义
}

interface FormData {
    user_code: string;
    station_id: string;
    left_read_distance: number;
    right_read_distance: number;
    left_count_ratio: number;
    right_count_ratio: number;
    in_station_time: string;
    out_station_time: string;
    left_or_right: number;
}

// 定义表格数据的类型
interface TableDataItem {
    user_code: string;
    station_id: string;
    left_or_right: string;
    distance: number;
    time: string;
}

const formRef: Ref = ref(null);

const form: FormData = reactive({
    user_code: 'test1',
    station_id: '001',
    left_read_distance: 50,
    right_read_distance: 100,
    left_count_ratio: 2,
    right_count_ratio: 3,
    in_station_time: '',
    out_station_time: '',
    left_or_right: 0
})

// 工具函数，将后端数据转换为表格数据
const transformData = (data: BackendDataItem[]): TableDataItem[] => {
    return data.map(item => ({
        user_code: item[0],
        station_id: item[1],
        left_or_right: item[2] === 0 ? '左' : '右',
        distance: item[3],
        time: item[4]
    }));
}

const tableData = ref<TableDataItem[]>([]);
const storedRawData = ref<BackendDataItem[] | null>(null);
const stationInfoSelectList = ref([]);

onMounted(async () => {
    GetStationInfoAPI()
});

const rules = {
    user_code: [
        { required: true, message: '请输入工号', trigger: 'blur' }
    ],
    station_id: [
        { required: true, message: '请输入基站编号', trigger: 'blur' }
    ],
    left_read_distance: [
        { required: true, type: 'number', message: '请输入左天线读卡距离', trigger: 'blur' },
        { min: 0, max: 500, type: 'number', message: '左天线读卡距离范围0-500', trigger: 'blur' }
    ],
    right_read_distance: [
        { required: true, type: 'number', message: '请输入右天线读卡距离', trigger: 'blur' },
        { min: 0, max: 500, type: 'number', message: '右天线读卡距离范围0-500', trigger: 'blur' }
    ],
    left_count_ratio: [
        { required: true, type: 'number', message: '请输入左天线所占轨迹比例', trigger: 'blur' },
        { min: 1, max: 100, type: 'number', message: '左天线轨迹比例范围1-100', trigger: 'blur' }
    ],
    right_count_ratio: [
        { required: true, type: 'number', message: '请输入右天线所占轨迹比例', trigger: 'blur' },
        { min: 1, max: 100, type: 'number', message: '右天线轨迹比例范围1-100', trigger: 'blur' }
    ],
    in_station_time: [
        { required: true, type: 'date', message: '请选择进入该基站时间', trigger: 'blur' }
    ],
    out_station_time: [
        { required: true, type: 'date', message: '请选择离开该基站时间', trigger: 'blur' }
    ],
    left_or_right: [
        { required: true, message: '请选择方向', trigger: 'change' }
    ]
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 获取数据接口
const generateDataAPI = async (params: FormData) => {
    try {
        const inStationTime = new Date(params.in_station_time); // 将ISO格式的日期字符串转换为Date对象
        const outStationTime = new Date(params.out_station_time);

        // 格式化日期为所需的格式
        const formattedInStationTime = formatDate(inStationTime);
        const formattedOutStationTime = formatDate(outStationTime);

        const newParams = {
            user_code: params.user_code,
            station_id: params.station_id,
            left_read_distance: params.left_read_distance,
            right_read_distance: params.right_read_distance,
            left_count_ratio: params.left_count_ratio,
            right_count_ratio: params.right_count_ratio,
            left_or_right: params.left_or_right,
            in_station_time: formattedInStationTime,
            out_station_time: formattedOutStationTime,
        }
        // 调用删除数据接口
        const response = await generateData(newParams);
        const { code, data } = response.data || {}
        if (code == 1) {
            ElMessage.success('数据获取成功');
            // 在这里添加其他操作，如清空表单等
            tableData.value = transformData(data);
            storedRawData.value = data; // 存储原始数据
        } else {
            ElMessage.error('数据获取失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('获取数据失败：', error);
        ElMessage.error('获取数据失败，请重试');
    }
}

const addMoreDataAPI = async (params: any) => {
    try {
        // 调用删除数据接口
        const response = await addMoreData(params);
        const { code } = response.data || {}
        if (code == 1) {
            ElMessage.success('新增数据成功');
        } else {
            ElMessage.error('新增数据失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('新增数据失败：', error);
        ElMessage.error('新增数据失败，请重试');
    }
}

// 基站编号下拉菜单数据
const GetStationInfoAPI = async () => {
    try {
        // 调用基站编号的数据接口
        const response = await GetStationInfo({});
        const { code, data } = response.data || {}
        if (code == 1) {
            stationInfoSelectList.value = data || []
        } else {
            stationInfoSelectList.value = []
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('获取数据失败：', error);
    }
}

const handleSearch = () => {
    if (formRef.value) {
        formRef.value.validate((valid: boolean) => {
            if (valid) {
                generateDataAPI(form);
            } else {
                console.error('校验失败');
                return false;
            }
        });
    } else {
        console.error('表单引用未找到');
    }
};

const onSubmit = async () => {
    if (storedRawData.value) {
        const params = {
            accuracy_data: storedRawData.value // 使用存储的原始数据
        };
        await addMoreDataAPI(params);
    } else {
        console.error('没有可用的原始数据');
    }
}

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

    :deep(.el-date-editor.el-input),
    :deep(.el-date-editor.el-input__wrapper) {
        --el-date-editor-width: 100%; // 设置日期编辑器的宽度为 100%
    }

    .custom-form {
        width: 100%;
        margin: auto;
        padding: 40px 20px;
        background-color: #ffffff; // 表单背景颜色
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        display: grid;
        grid-template-columns: repeat(3, 1fr); // 一行三列的布局
        grid-gap: 30px; // 格子间距

        .el-form-item {
            display: flex;
            align-items: center;

            &:last-child {
                grid-column: span 3; // 让按钮占据整行
                text-align: center;
            }

            .el-input,
            .el-input-number,
            .el-select,
            .el-date-picker {
                width: 100%; // 确保所有输入控件宽度一致
            }


        }
    }
}

.el-button {
    margin-right: 10px;
    flex: 1; // 按钮撑满宽度

    &:last-child {
        margin-right: 0;
    }
}
</style>

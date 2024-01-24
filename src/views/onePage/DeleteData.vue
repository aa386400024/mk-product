<template>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="用户" prop="user_code">
            <el-input v-model="form.user_code" />
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
            <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择日期和时间" />
        </el-form-item>
        <el-form-item label="结束时间" prop="end_time">
            <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择日期和时间" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="onReset">清空表单</el-button>
        </el-form-item>
    </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { delMoreData } from '@/api/func';

const formRef = ref(null)

const form = reactive({
    user_code: '',
    start_time: '',
    end_time: '',
})

const rules = {
    user_code: [
        { required: true, message: '请输入用户', trigger: 'blur' }
    ],
    start_time: [
        { required: true, type: 'date', message: '请选择开始时间', trigger: 'blur' }
    ],
    end_time: [
        { required: true, type: 'date', message: '请选择结束时间', trigger: 'blur' }
    ],
    // 这里可以添加其他字段的校验规则
}

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const delMoreDataAPI = async (params) => {
    try {
        const startDate = new Date(params.start_time); // 将ISO格式的日期字符串转换为Date对象
        const endDate = new Date(params.end_time);

        // 格式化日期为所需的格式
        const formattedStartTime = formatDate(startDate);
        const formattedEndTime = formatDate(endDate);

        const newParams = {
            user_code: params.user_code,
            start_time: formattedStartTime,
            end_time: formattedEndTime,
        }
        // 调用删除数据接口
        const response = await delMoreData(newParams);

        if (response.data) {
            ElMessage.success('数据删除成功');
            // 在这里添加其他操作，如清空表单等
        } else {
            ElMessage.error('数据删除失败');
        }
    } catch (error) {
        // 处理请求失败的逻辑
        console.error('删除数据失败：', error);
        ElMessage.error('删除数据失败，请重试');
    }
}

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            // 这里是整体表单校验失败的情况
            ElMessage.error('请检查表单字段');
            return false;
        }
        delMoreDataAPI(form);
    });
}

const onReset = () => {
    formRef.value.resetFields()
}
</script>
  
<style>
.text-center {
    text-align: center;
}

.text-gray-500 {
    color: #a0a0a0;
}
</style>
  
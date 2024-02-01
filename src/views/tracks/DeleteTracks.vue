<template>
    <div class="form-container">
        <el-form ref="formRef" :model="form" :rules="rules" size="large" label-width="120px">
            <el-form-item label="工号" prop="user_code">
                <el-input v-model="form.user_code" placeholder="请输入工号"/>
            </el-form-item>
            <el-form-item label="开始时间" prop="start_time">
                <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择日期和时间" />
            </el-form-item>
            <el-form-item label="结束时间" prop="end_time">
                <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择日期和时间" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">轨迹删除</el-button>
                <el-button @click="onReset">清空表单</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
  
<script lang="ts" setup>
import { reactive, ref, Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { delMoreData } from "@/api/tracks/tracks";
interface FormData {
    user_code: string;
    start_time: string;
    end_time: string;
}

const formRef: Ref = ref(null);

const form: FormData = reactive({
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

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const delMoreDataAPI = async (params: FormData) => {
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
    if (formRef.value) {
        formRef.value.validate(async (valid: boolean) => {
            if (!valid) {
                ElMessage.error('请检查表单字段');
                return false;
            }
            try {
                // 显示确认对话框
                await ElMessageBox.confirm('确定要删除这些数据吗?', '警告', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning',
                });
                // 如果用户确认，执行删除操作
                delMoreDataAPI(form);
            } catch (error) {
                // 如果用户取消，捕获异常并停止执行
                ElMessage.info('已取消删除');
            }
        });
    }
};

const onReset = () => {
    if (formRef.value) {
        formRef.value.resetFields();
    }
};
</script>
  
<style scoped lang="scss">
/* 确保整体页面居中 */
.form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    // min-height: 100vh;
}

.el-form {
    max-width: 600px;
    /* 控制表单的最大宽度 */
    margin: 100px;
    /* 确保在较大屏幕上居中 */
    padding: 30px 60px 30px 10px;
    /* 添加一些内边距 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    /* 轻微的阴影效果 */
    border-radius: 8px;
    /* 圆角边框 */
}

/* 调整表单项中按钮的布局 */
.el-form-item:last-child {
    display: flex;
    /* 使用 flex 布局 */
    justify-content: space-between;
    /* 两个按钮之间平均分配空间 */
}

.el-button {
    flex: 1;
    /* 每个按钮占据等量的空间 */
    margin-right: 10px;
    /* 按钮之间的间距 */
}

.el-button:last-child {
    margin-right: 0;
    /* 最后一个按钮不需要右边距 */
}
</style>@/api/tracks/trajectory
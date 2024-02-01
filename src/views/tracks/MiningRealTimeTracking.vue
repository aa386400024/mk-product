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
                    <el-date-picker v-model="tracksForm.in_station_time" type="datetime"
                        placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="出井时间" prop="out_station_time">
                    <el-date-picker v-model="tracksForm.out_station_time" type="datetime"
                        placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="班次" prop="shift_time_quantum_id">
                    <el-select v-model="tracksForm.shift_time_quantum_id" placeholder="请选择">
                        <el-option label="8点班" value="8"></el-option>
                        <el-option label="4点班" value="4"></el-option>
                        <el-option label="0点班" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下井目的地" prop="station_ids">
                    <el-select v-model="tracksForm.station_ids" filterable multiple placeholder="请选择下井目的地">
                        <el-option v-for="(item, index) in stationOptions" :key="index" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="form-card" shadow="never">
            <template #header>
                <div class="card-header">下井目的地排序</div>
            </template>
            <draggable v-model="sortedStations" class="drag-list" item-key="id">
                <template #item="{ element }">
                    <div>{{ element.name }}</div>
                </template>
            </draggable>
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
import draggable from 'vuedraggable';

interface StationOption {
    label: string;
    value: string | number;
}

interface SortedStation {
    id: string | number;
    name: string;
}

const tracksForm = reactive({
    in_station_time: '',
    out_station_time: '',
    shift_time_quantum_id: '',
    station_ids: []
})

const user_code: Ref<string> = ref('');
const userInfoData: Ref<any> = ref(null);
const tracksRef = ref<FormInstance>();
const userCodeRef = ref<FormInstance>();
const stationOptions: Ref<Array<StationOption>> = ref([]);
const sortedStations = ref<Array<SortedStation>>([
    { id: 1, name: '地点 A' },
    { id: 2, name: '地点 B' },
    { id: 3, name: '地点 C' },
    { id: 4, name: '地点 D' },
]);


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
    station_ids: [
        { required: true, message: '请选择下井目的地', trigger: 'change' }
    ],
});

// 监听tracksForm.station_id的变化，更新sortedStations
watch(() => tracksForm.station_ids, (newValue) => {
    // 使用类型断言确保 newValue 是一个数组
    const newValues = newValue as Array<string | number>;
    sortedStations.value = newValues.map(value => {
        const foundOption = stationOptions.value.find(option => option.value === value);
        return foundOption ? { id: value, name: foundOption.label } : { id: '', name: '' };
    });
}, { deep: true });


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

    .sort-title {
        margin-top: 20px; // 在标题和上一个表单项之间添加一些间距
        padding-left: 10px; // 与排序列表的内边距对齐
        font-size: 16px; // 根据需要调整字体大小
        font-weight: bold; // 加粗字体以突出显示
        color: #606266; // 标题颜色，可根据实际UI调整
    }

    .drag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px; // 根据需要调整间隙大小
        padding: 10px;
        border-radius: 4px; // 添加圆角

        > div {
            padding: 5px 10px;
            background-color: #fff;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
            cursor: grab; // 更改鼠标样式以指示这些项可以拖动
        }
    }

    .form-card {
        margin-bottom: 15px;

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
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;

            .el-form-item {
                display: flex;
                align-items: center;

                &:last-child {
                    grid-column: span 1; // 让提交按钮占据整行
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

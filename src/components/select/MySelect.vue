<template>
    <el-select v-model="selectedValue" :placeholder="placeholder" :size="size"
        @change="handleChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
</template>
  
<script setup lang="ts">
import { watch, ref, onMounted } from 'vue'

const props = defineProps<{
    modelValue: string;
    options: Array<{ value: string; label: string }>;
    size?: 'large' | 'small';
    placeholder?: string;
}>()

const emit = defineEmits(['update:modelValue'])

const selectedValue = ref('')

// 当组件挂载完成后，检查是否有传入modelValue
// 如果没有，则使用options数组的第一个元素作为默认值
onMounted(() => {
    if (props.modelValue) {
        selectedValue.value = props.modelValue
    } else if (props.options && props.options.length > 0) {
        selectedValue.value = props.options[0].value
        // 通知父组件更新默认选中的值
        emit('update:modelValue', selectedValue.value)
    }
})

// 监听props.modelValue的变化，以确保可以从外部更新
watch(() => props.modelValue, (newVal) => {
    selectedValue.value = newVal
})

// 当选中的值发生变化时，更新绑定值
const handleChange = (value: string) => {
    emit('update:modelValue', value)
}
</script>
  
<style scoped lang="scss">
/* 可以在这里添加一些特定样式 */
</style>
  
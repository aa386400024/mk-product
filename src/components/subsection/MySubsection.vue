<template>
    <div class="subsection-container">
        <div class="buttons">
            <div v-for="(item, index) in items" :key="index" class="button" :class="{ 'is-active': index === modelValue }"
                @click="setActive(index)">
                {{ item.label }}
            </div>
            <div class="indicator" :style="{ transform: `translateX(${modelValue * 100}%)` }"></div>
        </div>
    </div>
</template>

  
<script setup lang="ts">
import { withDefaults } from 'vue';

interface Item {
    label: string;
    slotName: string;
}

// 使用 withDefaults 来给 props 设置默认值
const props = withDefaults(defineProps<{
    items: Item[];
    modelValue: number;
}>(), {
    items: () => [] as Item[],
    modelValue: 0
});

// 定义 emit 函数来发射事件
const emit = defineEmits(['update:modelValue']);

// 定义 setActive 函数，当激活的索引被点击时调用
const setActive = (index: number) => {
    // 通过 emit 函数通知父组件更新 modelValue
    emit('update:modelValue', index);
};
</script>

<style scoped lang="scss">
.subsection-container {
    border: 1px solid $gray-600;
    margin: 10px;
    padding: 3px;
    border-radius: 5px;
    background-color: $gray-700;

    .buttons {
        display: flex;
        justify-content: center;
        width: 100%;
        .button {
            flex-grow: 1;
            display: flex; // 使按钮内的文本也能使用Flexbox的对齐方式
            justify-content: center; // 水平居中按钮内的文本
            align-items: center; // 垂直居中按钮内的文本
            text-align: center; // 确保文本在其容器中居中（对于多行文本有用）
            padding: 0.2rem 1rem;
            cursor: pointer;
            border-radius: 5px;
            transition: background-color 0.3s, color 0.3s;
            color: $gray-400;

            &.is-active {
                color: $color-theme; // Element Plus primary color for active state
                background-color: $gray-600;
            }
        }
    }
}
</style>

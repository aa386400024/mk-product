<template>
    <div class="subsection-container">
        <div class="buttons">
            <div v-for="(item, index) in items" :key="index"
                class="button" :class="{ 'is-active': index === modelValue }"
                @click="setActive(index)">
                {{ item.label }}
            </div>
        </div>
        <div class="content">
            <!-- 确保父组件传递的插槽可以在这里被正确显示 -->
            <slot :name="items[modelValue]?.slotName"></slot>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { withDefaults, defineProps, defineEmits } from 'vue';

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
    .buttons {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1rem;

        .button {
            padding: 0.5rem 1rem;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s, color 0.3s;

            &:hover {
                background-color: #f2f2f2;
            }

            &.is-active {
                color: #409EFF; // Element Plus primary color for active state
                background-color: #ecf5ff;
                border: 1px solid #409EFF;
            }
        }
    }

    .content {
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 0.25rem;
    }
}
</style>

<template>
    <div class="custom-collapse">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="item in items" :key="item.name" :name="`item-${item.name}`">
                <template #title>
                    <div class="title-wrapper">
                        <SvgIcon :name="item.icon" size="16" class="icon" />
                        <span>{{ item.title }}</span>
                    </div>
                </template>
                <!-- 插槽内容 -->
                <slot :name="`item-${item.name}`"></slot>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

const props = defineProps<{
    items: Array<{
        title: string;
        name: string;
        icon: string;
    }>;
}>();

const activeName = ref<string | null>(null);

// 使用watchEffect来响应items数组的变化
watchEffect(() => {
    // 当items数组有内容时，设置activeName为第一个元素的name属性
    if (props.items.length > 0) {
        activeName.value = `item-${props.items[0].name}`;
    }
});
</script>

<style scoped lang="scss">
.title-wrapper {
    display: flex;
    align-items: center;
    /* 确保图标和文字垂直居中对齐 */
    margin-left: 10px;
    .icon {
        display: flex;
        margin-right: 8px;
        /* 可根据需要调整图标和文字之间的间距 */
    }
}
</style>
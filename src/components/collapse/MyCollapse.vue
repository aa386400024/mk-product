<template>
    <div class="custom-collapse">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="item in items" :key="item.name" :name="`item-${item.name}`">
                <template #title>
                    <SvgIcon :name="item.icon" size="16" />
                    {{ item.title }}
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

const activeName = ref(null);

// 使用watchEffect来响应items数组的变化
watchEffect(() => {
    // 当items数组有内容时，设置activeName为第一个元素的name属性
    if (props.items.length > 0) {
        activeName.value = `item-${props.items[0].name}`;
    }
});
</script>

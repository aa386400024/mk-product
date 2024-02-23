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
import { ref } from 'vue';

const props = defineProps<{
    items: Array<{
        title: string;
        name: string;
        icon: string; // 这里假设icon是一个字符串，指向对应的图标组件
    }>;
}>();

const activeName = ref('1');
</script>
  
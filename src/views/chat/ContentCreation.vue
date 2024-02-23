<!-- 父组件 -->
<template>
    <div class="content-creation">
        <MyCollapse :items="collapseItems">
            <template #item-1>
                <p>这是第一个折叠项的内容</p>
            </template>
            <template #item-2>
                <!-- 这里可以是任意自定义的内容或组件 -->
                <p>这是第二个折叠项的内容</p>
            </template>
            <!-- 为其他折叠项定义更多插槽内容 -->
        </MyCollapse>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MyCollapse } from '@/components/collapse';

const collapseItems = ref([
    { title: "Item 1", name: "1", icon: '' },
    { title: "Item 2", name: "2", icon: '' },
    // 定义更多项...
]);
</script>
  
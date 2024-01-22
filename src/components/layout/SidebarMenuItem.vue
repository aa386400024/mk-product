<template>
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
        <template #title>
            <span>{{ item.title }}</span>
        </template>
        <sidebar-menu-item v-for="subItem in item.children" :key="subItem.path" :item="subItem" />
    </el-sub-menu>
    <router-link v-else :to="item.path" custom v-slot="{ navigate, href, isActive, isExactActive }">
        <li class="el-menu-item menu-item-link" :class="{ 'menu-item-active': isExactActive }" @click="navigate">
            {{ item.title }}
        </li>
    </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface MenuItem {
    path: string;
    title: string;
    children?: MenuItem[];
}

const props = defineProps<{
    item: MenuItem;
}>();
</script>
  
<style scoped lang="scss">
.menu-item-active {
    color: #ffd04b; // 激活状态的文本颜色
    background-color: #1f2d3d; // 激活状态的背景颜色
}

.menu-item-link {
    text-decoration: none; // 移除下划线

    &:hover {
        text-decoration: none; // 悬停时移除下划线
    }
}
</style>
  
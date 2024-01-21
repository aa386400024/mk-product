<template>
    <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
        <template #title>
            <span>{{ item.title }}</span>
        </template>
        <sidebar-menu-item v-for="subItem in item.children" :key="subItem.path" :item="subItem" />
    </el-sub-menu>
    <router-link v-else :to="item.path" tag="li" class="el-menu-item menu-item-link" exact-active-class="menu-item-active">
        {{ item.title }}
    </router-link>
</template>
  
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    item: Object
});
</script>
  
<style scoped lang="scss">
.el-menu-item {
    color: #fff; // 白色文本
    text-decoration: none; // 移除下划线

    &:hover {
        color: #fff; // 悬停时保持白色文本
        text-decoration: none; // 悬停时移除下划线
    }
}

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
  
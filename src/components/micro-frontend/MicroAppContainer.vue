<template>
    <div>
        <!-- <div v-for="app in microApps" :key="app.name" :id="app.container"></div> -->
    </div>
</template>
  
<script setup lang="ts">
// 你可以在这里定义一些子应用的配置
const microApps = [
    { name: 'app1', container: 'microAppContainer1' },
    { name: 'app2', container: 'microAppContainer2' },
    // 更多子应用...
];
</script>
  
<style scoped lang="scss">
/* 这里可以添加一些容器的基本样式 */
</style>
  
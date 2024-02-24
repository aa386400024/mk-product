<template>
    <el-container>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import { VerticalMenu } from '@/components/layout';

</script>

<style scoped lang="scss">
</style>
  
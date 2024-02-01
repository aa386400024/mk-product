<template>
    <RouterView />
    <MicroAppContainer />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import MicroAppContainer from '@/components/micro-frontend/MicroAppContainer.vue';
</script>

<style scoped lang="scss"></style>

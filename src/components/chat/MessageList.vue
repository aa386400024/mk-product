<template>
    <div class="message-list">
        <MessageItem v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
</template>
  
<script setup lang="ts">
import { defineProps } from 'vue';
import MessageItem from './MessageItem.vue';

const props = defineProps<{
    messages: Array<{
        text: string,
        time: string,
        isSent: boolean,
        avatar: string,
    }>
}>();
</script>
  
<style scoped lang="scss">
.message-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 10px;
    max-height: 500px; // Adjust according to your needs
}
</style>
  
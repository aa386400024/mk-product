<template>
    <div class="markdown-body" v-html="renderedMarkdown"></div>
</template>
  
<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // 使用Prism的Tomorrow主题

// Props
const props = defineProps<{
    markdown: string;
}>();

// 初始化markdown-it实例
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && Prism.languages[lang]) {
            try {
                return Prism.highlight(str, Prism.languages[lang], lang);
            } catch (_) {
                return ''; // 在出错时返回空字符串
            }
        }
        return ''; // 非代码块或未指定语言的处理
    }
});

const renderedMarkdown = ref('');

// 监听props.markdown的变化并重新渲染
watchEffect(() => {
    renderedMarkdown.value = md.render(props.markdown);
});
</script>
  
<style scoped lang="scss">
.markdown-body {
    // 这里可以添加一些基本的Markdown样式
    // 例如, 为了更好的视觉效果，可以考虑引入GitHub Markdown样式
    line-height: 1.6;
    font-size: 14px;
    color: #333;

    // 代码块样式
    pre {
        background-color: #f6f8fa;
        padding: 1em;
        border-radius: 5px;
        overflow-x: auto;
    }

    // 这里添加其他Markdown相关样式
}
</style>
  
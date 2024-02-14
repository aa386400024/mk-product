<template>
    <div :class="svgClass" v-bind="svgProps" ref="svgContainer"></div>
</template>
  
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

// 定义接收的属性
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        default: '24px', // 默认图标大小
    },
    color: {
        type: String,
        default: 'currentColor', // 默认图标颜色
    },
});

// 计算属性，用于设置 SVG 的 class 和其他属性
const svgClass = computed(() => ({
    'svg-icon': true,
    [`icon-${props.name}`]: true,
}));

const svgProps = computed(() => ({
    style: {
        width: props.size,
        height: props.size,
        fill: props.color,
    },
}));

const svgContainer = ref();

// 在组件挂载后动态导入 SVG 文件并插入到容器中
onMounted(async () => {
    try {
        const { default: svgContent } = await import(`../../assets/icons/${props.name}.svg?raw`);
        if (svgContainer.value) {
            svgContainer.value.innerHTML = svgContent;
            // 获取 SVG 元素
            const svgElement = svgContainer.value.querySelector('svg');
            if (svgElement) {
                // 动态修改 SVG 的 width、height 和 fill 属性
                svgElement.setAttribute('width', props.size);
                svgElement.setAttribute('height', props.size);
                svgElement.setAttribute('fill', props.color);
                // 获取并移除 path 元素的 fill 属性
                const pathElement = svgElement.querySelector('path');
                if (pathElement) {
                    pathElement.removeAttribute('fill');
                }
            }
        }
    } catch (e) {
        console.error(`SvgIcon: Error loading icon '${props.name}':`, e);
    }
});

</script>
  
<style lang="scss" scoped>
// .svg-icon {
//     display: inline-block;
// }

</style>
  
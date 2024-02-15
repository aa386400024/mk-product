<template>
    <div :class="svgClass" v-bind="svgProps" ref="svgContainer"></div>
  </template>
  
  <script setup lang="ts">
  import { computed, ref, watchEffect } from 'vue';
  
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
  
  // 动态导入 SVG 并更新 SVG 容器内容的函数
  const loadSvg = async (iconName) => {
    try {
      const { default: svgContent } = await import(`../../assets/icons/${iconName}.svg?raw`);
      if (svgContainer.value) {
        svgContainer.value.innerHTML = svgContent;
        const svgElement = svgContainer.value.querySelector('svg');
        if (svgElement) {
          svgElement.setAttribute('width', props.size);
          svgElement.setAttribute('height', props.size);
          svgElement.setAttribute('fill', props.color);
          const pathElement = svgElement.querySelector('path');
          if (pathElement) {
            pathElement.removeAttribute('fill');
          }
        }
      }
    } catch (e) {
      console.error(`SvgIcon: Error loading icon '${iconName}':`, e);
    }
  };
  
  // 使用 watchEffect 监听 props.name 的变化，并调用 loadSvg 函数
  watchEffect(() => {
    loadSvg(props.name);
  });
  </script>
  
  <style scoped>
  .svg-icon {
    display: inline-block;
  }
  </style>
  
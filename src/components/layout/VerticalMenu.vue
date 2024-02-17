<template>
    <!-- 自定义的工具提示容器 -->
    <div class="custom-tooltip-container"
        :style="{ '--activeColor': activeColor, '--inactiveColor': inactiveColor, '--scale': scale, '--backgroundColor': backgroundColor, '--hoverColor': hoverColor }">
        <!-- 菜单列表 -->
        <ul class="menu-list">
            <!-- 使用 v-for 指令遍历 menuItems 数组，为每个菜单项创建一个工具提示 -->
            <el-tooltip v-for="(item, index) in menuItems" :key="item.name" effect="customized" placement="right"
                :content="item.name">
                <!-- 使用插槽来自定义工具提示的内容 -->
                <template #default>
                    <!-- 菜单项，当菜单项被点击时，调用 selectItem 方法 -->
                    <li class="menu-item" :class="{ 'is-active': item.active }" @click="selectItem(item)"
                        :style="{ 'margin-top': index === 0 ? '20px' : '' }">
                        <!-- SvgIcon 组件用于显示图标，:name 指令将 item.icon 作为 prop 传递给 SvgIcon 组件 -->
                        <SvgIcon :name="item.icon" class="icon" />
                    </li>
                </template>
            </el-tooltip>
        </ul>
    </div>
</template>

<script setup lang="ts">
// 导入 Vue 3 的 API
import { onMounted } from 'vue';
// 导入 Vue Router
import { useRouter } from 'vue-router';

// 定义 MenuItem 接口
interface MenuItem {
    name: string;
    icon: string;
    active: boolean;
    path: string;
}

// 使用 defineProps 函数定义 props
const props = defineProps({
    // menuItems 是一个 MenuItem 类型的数组
    menuItems: {
        type: Array as () => MenuItem[],
        default: () => [] // 默认值为空数组
    },
    // activeColor 是活动状态下的颜色
    activeColor: {
        type: String,
        default: '#FFFFFF' // 默认值为白色
    },
    // inactiveColor 是非活动状态下的颜色
    inactiveColor: {
        type: String,
        default: '#B8B8B8'
    },
    // scale 是图标放大的比例
    scale: {
        type: Number,
        default: 1.2
    },
    // backgroundColor 是背景颜色
    backgroundColor: {
        type: String,
        default: '#929292'
    },
    // hoverColor 是鼠标悬停时的颜色
    hoverColor: {
        type: String,
        default: '#FFA500'
    }
});

const router = useRouter();

// 定义 selectItem 方法，当菜单项被点击时调用
const selectItem = (selectedItem: MenuItem) => {
    // 遍历 menuItems 数组，将被点击的菜单项的 active 属性设置为 true，其他菜单项的 active 属性设置为 false
    props.menuItems.forEach(item => {
        item.active = item === selectedItem;
    });
    // 将被点击的菜单项的 name 保存到 localStorage
    localStorage.setItem('selectedMenuItem', selectedItem.name);
    // 使用 Vue Router 进行路由跳转
    router.push(selectedItem.path);
};

// 在组件挂载后执行的操作
onMounted(() => {
    // 创建 style 元素，用于添加自定义的 CSS 样式
    const style = document.createElement('style');
    style.textContent = `
    .el-popper.is-customized {
      padding: 8px 12px;
      font-size: 14px;
      color: ${props.activeColor};
      background: ${props.hoverColor};
    }

    .el-popper.is-customized .el-popper__arrow::before {
      background: ${props.hoverColor};
      color: ${props.activeColor};
      right: 0;
    }
    `;
    // 将 style 元素添加到 head 中
    document.head.appendChild(style);
    
    // 从 localStorage 读取选中项的名称
    const selectedMenuItemName = localStorage.getItem('selectedMenuItem');
    // 如果存在选中项的名称
    if (selectedMenuItemName) {
        const selectedMenuItem = props.menuItems.find(item => item.name === selectedMenuItemName);
        if (selectedMenuItem) {
            // 设置选中项为 active
            selectItem(selectedMenuItem);
            // 自动跳转到选中项对应的路径
            router.push(selectedMenuItem.path);
        }
    }
});


</script>

<style lang="scss" scoped>
// 菜单列表的样式
.menu-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    min-width: max-content;
    max-width: 48px;
    flex-direction: column;
    align-items: center;
}

// 菜单项的样式
.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin: 4px 0;
    cursor: pointer;
    min-width: max-content;
    width: 48px;
    height: 48px;
    background-color: var(--backgroundColor);
    border-radius: 10px;

    // 当鼠标悬停在菜单项上时的样式
    &:hover {
        background-color: var(--hoverColor);

        // 图标的样式
        .icon {
            color: var(--activeColor);
            transform: scale(var(--scale));
        }
    }

    // 当菜单项处于活动状态时的样式
    &.is-active {
        background-color: var(--hoverColor);

        // 图标的样式
        .icon {
            color: var(--activeColor);
        }
    }

    // 图标的样式
    .icon {
        transition: transform 0.3s;
        color: var(--inactiveColor);
    }
}
</style>
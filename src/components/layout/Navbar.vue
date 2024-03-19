<template>
    <div>
        <el-dropdown ref="dropdownRef" v-for="item in navItems" :key="item.label" @command="handleCommand"
            :hide-on-click="!hasMultipleChildren(item)" class="nav-item"
            :class="{ 'active': activeItem === item.label }" :show-timeout="0" :hide-timeout="0" :trigger="trigger">
            <span class="el-dropdown-link" @click="() => handleClick(item)">
                {{ item.label }}
                <i v-if="hasMultipleChildren(item)" class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template v-if="hasMultipleChildren(item)" #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item v-for="child in item.children" :key="child.label" :command="child">
                        {{ child.label }}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
    defineProps<{
        navItems: NavItem[];
        trigger?: string;
    }>(),
    { trigger: 'click' } // 设置 trigger 的默认值
)

const emit = defineEmits(['navigate']);

const activeItem = ref<string>('');

const dropdownRef = ref<DropdownComponent[]>([]);

/**
 * 判断导航项是否拥有多个子项。
 * 
 * @param item - 一个包含导航项信息的对象，其中需要包含`children`属性，该属性为一个数组，包含导航项的子项。
 * @returns 返回一个布尔值，如果导航项拥有多个子项，则为`true`；否则为`false`。
 */
const hasMultipleChildren = (item: NavItem) => item.children && item.children.length > 1;

/**
 * 处理导航命令。
 * @param child - 一个Nav子项对象，包含导航的相关信息。
 * @returns void - 无返回值。
 */
const handleCommand = (child: NavItemChild): void => {
    // 发出导航事件，并更新激活的导航项
    emit('navigate', child.route);
    activeItem.value = child.label;
    // 关闭下拉菜单
    closeDropdown()
};

/**
 * 处理点击导航项的事件。
 * @param item {NavItem} 被点击的导航项对象。
 * 如果该导航项有且仅有一个子项，则触发对该子项的处理。
 * @returns {void}
 */
const handleClick = (item: NavItem): void => {
    // 当导航项有子项且子项数量为1时，处理其唯一子项
    if (item.children && item.children.length === 1) {
        handleCommand(item.children[0]);
    }
};

/**
 * 关闭下拉菜单。
 * 此函数没有参数。
 * 没有返回值。
 */
const closeDropdown = () => {
    // 如果dropdownRef有值，则遍历并尝试关闭每个下拉菜单
    if (dropdownRef.value) {
        dropdownRef.value.forEach(dropdown => {
            dropdown.handleClose(); // 调用每个下拉菜单的关闭处理函数
        });
    }
};
</script>

<style scoped>
.nav-item {
    margin-right: 20px;
    cursor: pointer;
}

.nav-item.active {
    border-bottom: 2px solid #409eff;
}
</style>
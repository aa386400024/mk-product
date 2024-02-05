<template>
    <ul class="menu-list">
        <li v-for="item in menuItems" :key="item.name" class="menu-item" :class="{ 'is-active': item.active }"
            @click="selectItem(item)">
            <SvgIcon :name="item.icon" :size="'18px'" class="icon" :color="item.active ? '#FFFFFF' : '#FFFFFF'" />
            <span class="menu-name">{{ item.name }}</span>
        </li>
    </ul>
</template>
  
<script setup lang="ts">
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface MenuItem {
    name: string;
    icon: string;
    active: boolean;
    path: string; // 路由路径
}

// 从父组件接收 menuItems
const props = defineProps<{
    menuItems: MenuItem[];
}>();

const router = useRouter();

const selectItem = (selectedItem: MenuItem) => {
    props.menuItems.forEach(item => {
        item.active = item === selectedItem;
    });
    localStorage.setItem('selectedMenuItem', selectedItem.name); // 保存选中项的名称到localStorage
    router.push(selectedItem.path); // 使用 Vue Router 进行路由跳转
};

onMounted(() => {
    const selectedMenuItemName = localStorage.getItem('selectedMenuItem'); // 从localStorage读取选中项的名称
    if (selectedMenuItemName) {
        props.menuItems.forEach(item => {
            item.active = item.name === selectedMenuItemName;
        });
    }
});

</script>
  
<style lang="scss" scoped>
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

.menu-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    margin: 4px 0;
    cursor: pointer;
    // min-width: max-content;
    width: 48px;
    background-color: rgb(146, 146, 146);
    border-radius: 10px;

    &:hover {
        background-color: #FFA500;

        .icon,
        .menu-name {
            color: #FFFFFF; /* 修改这里 */
        }
    }

    &.is-active {
        background-color: #FFA500;

        .icon,
        .menu-name {
            color: #FFFFFF; /* 修改这里 */
        }
    }

    .icon {
        transition: transform 0.3s;
        color: #B8B8B8;
    }

    .menu-name {
        width: 100%;
        text-align: center;
        font-size: 12px;
        color: #ffffff;
    }
}


</style>
  
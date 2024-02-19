<template>
    <div class="dropdown" v-click-outside="closeDropdown">
        <div class="dropdown-select" @click="toggleDropdown">
            <slot name="label">
                {{ selectedOption?.label || "请选择" }}
                <SvgIcon name="caret" class="icon" size="15" />
            </slot>
        </div>
        <transition name="fade">
            <div class="dropdown-menu" v-if="isOpen">
                <slot name="options" :options="options">
                    <template v-for="(item, index) in options" :key="index">
                        <div v-if="isOptionGroup(item)" class="dropdown-group">
                            <div class="dropdown-group-title">{{ item.name }}</div>
                            <div v-for="option in item.options" :key="option.value"
                                :class="{ 'is-selected': selectedOption?.value === option.value }" class="dropdown-item"
                                @click="() => handleSelect(option)">
                                <div class="item-content">
                                    <img v-if="option.avatar" :src="option.avatar" class="avatar">
                                    <div class="text-content">
                                        <div class="title">{{ option.title || option.label }}</div>
                                        <div class="description">{{ option.description }}</div>
                                    </div>
                                    <!-- 根据选中状态显示不同图标 -->
                                    <SvgIcon :name="selectedOption?.value === option.value ? 'selected' : 'not-selected'"
                                        class="status-icon" />
                                </div>
                            </div>
                        </div>
                        <div v-else :class="{ 'is-selected': selectedOption?.value === item.value }" class="dropdown-item"
                            @click="() => handleSelect(item)">
                            <div class="item-content">
                                <img v-if="item.avatar" :src="item.avatar" class="avatar">
                                <div class="text-content">
                                    <div class="title">{{ item.title || item.label }}</div>
                                    <div class="description">{{ item.description }}</div>
                                </div>
                                <!-- 根据选中状态显示不同图标 -->
                                <SvgIcon :name="selectedOption?.value === item.value ? 'selected' : 'not-selected'"
                                    class="status-icon" />
                            </div>
                        </div>
                    </template>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { clickOutside as vClickOutside } from "v-click-outside-vue3";

interface Option {
    value: string | number;
    label: string;
    title?: string; // 新增
    description?: string; // 新增
    avatar?: string; // 新增
}

interface OptionGroup {
    name: string;
    options: Option[];
}

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    options: Array<Option | OptionGroup>,
    modelValue: string | number
}>();

const isOpen = ref(false);
const selectedOption = ref<Option | null>(null);

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

const handleSelect = (option: Option) => {
    selectedOption.value = option;
    isOpen.value = false;
    emit('update:modelValue', option.value);
};

const closeDropdown = () => {
    if (isOpen.value) isOpen.value = false;
};

// Helper function to determine if an item is an OptionGroup
const isOptionGroup = (item: Option | OptionGroup): item is OptionGroup => {
    return (item as OptionGroup).options !== undefined;
};

// 初始化selectedOption为第一个选项
onMounted(() => {
    if (props.options.length > 0) {
        const firstOption = props.options[0];
        if (isOptionGroup(firstOption)) {
            // 如果第一个选项是OptionGroup，选取该组的第一个选项
            if (firstOption.options.length > 0) {
                selectedOption.value = firstOption.options[0];
                emit('update:modelValue', firstOption.options[0].value);
            }
        } else {
            // 如果第一个选项是单个Option
            selectedOption.value = firstOption;
            emit('update:modelValue', firstOption.value);
        }
    }
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/mixins.scss";

/* 自定义滚动条样式 */
.dropdown-menu::-webkit-scrollbar {
    width: 4px; /* 滚动条的宽度 */
}

/* 滚动条轨道的样式 */
.dropdown-menu::-webkit-scrollbar-track {
    background: rgba(130, 137, 145, 0);
    border-radius: 10px; /* 轨道的圆角 */
}

/* 滚动条滑块的样式 */
.dropdown-menu::-webkit-scrollbar-thumb {
    background: rgba(173, 181, 189, 0.5); /* 滑块的背景颜色 */
}
/* 当鼠标悬停在滑块上时的样式 */
.dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: rgba(130, 137, 145, 0.5); /* 滑块的背景颜色（悬停时） */
}
.dropdown {
    position: relative;
    user-select: none;

    &-select {
        padding: 10px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: $gray-900;
        font-size: 16px;

        .icon {
            display: flex;
            transition: transform 0.3s ease;
            margin-left: 6px;
        }
    }

    &-menu {
        position: absolute;
        top: 100%;
        left: 10px;
        max-height: 400px;
        overflow-y: auto;
        border: 1px solid $gray-300;
        background: white;
        box-shadow: var(--el-box-shadow);
        border-radius: 4px;
        z-index: 1000;

        .dropdown-group {
            &-title {
                margin: 10px;
                color: $gray-900;
                font-weight: bold;
            }

            // 直接在这个级别处理最后一个 .dropdown-item，无需重复声明.dropdown-group
            .dropdown-item:last-child {
                border-bottom: none; // 移除分组中最后一项的下边距
            }
        }

        .dropdown-item:last-child {
            border-bottom: none; // 移除作为单独选项时的最后一项的下边距
        }

        .dropdown-item {
            min-width: 290px;
            width: auto; // 或者根据需要设置具体的宽度
            max-width: 100%; // 确保不会超过其父容器的宽度
            overflow: hidden; // 防止内容溢出导致布局问题
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 20px;
            border-bottom: 1px solid #eee; // 分隔线
            cursor: pointer;

            &.is-selected {
                color: $color-theme;
                /* 选中项的字体颜色 */

                // .title, .description {
                //     color: $color-theme; /* 选中项的标题和描述的字体颜色 */
                // }
            }

            &:not(.is-selected) {
                color: $gray-400;
                // .title {
                //     color: $gray-800; /* 未选中项的标题颜色 */
                // } 
                // .description {
                //     color: #666; /* 未选中项的描述颜色 */
                // }
            }

            &:hover {
                background-color: #f2f2f2;
                /* 悬停时的背景颜色，根据需要调整 */
            }

            .item-content {
                display: flex;
                flex-wrap: nowrap; // 防止内容换行
                justify-content: space-between; // 分散对齐以给标题和描述更多空间
                align-items: center;

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin-right: 10px;
                    flex-shrink: 0;
                }

                .text-content {
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1; // 确保可以填充空间
                    min-width: 150px;
                    margin-right: 30px; // 保持与图标的距离
                }

                // 现在使用混合优化样式
                .title {
                    font-weight: 500;
                    color: $gray-800;
                    @include text-overflow-lines(1); // 仅显示一行
                    max-width: 150px; // 根据实际布局调整最大宽度
                }

                .description {
                    font-size: 0.9em;
                    color: $gray-500;
                    @include text-overflow-lines(2); // 最多显示两行
                    max-width: 150px; // 根据实际布局调整最大宽度
                    margin-top: 6px;
                }

                .status-icon {
                    // 根据需要调整图标样式
                    flex-shrink: 0; // 防止图标被压缩
                    margin-left: auto;
                }
            }

            &:hover {
                background-color: #f2f2f2;
            }
        }

    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}</style>

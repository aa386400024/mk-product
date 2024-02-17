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
                            <div v-for="option in item.options" :key="option.value" class="dropdown-item" @click="() => handleSelect(option)">
                                {{ option.label }}
                            </div>
                        </div>
                        <div v-else class="dropdown-item" :key="item.value" @click="() => handleSelect(item)">
                            {{ item.label }}
                        </div>
                    </template>
                </slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { clickOutside as vClickOutside } from "v-click-outside-vue3";

interface Option {
  value: string | number;
  label: string;
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
</script>


  
<style scoped lang="scss">
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
        left: 0;
        border: 1px solid #ccc;
        background: white;
        width: 100%;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        color: red;
        .dropdown-item {
            padding: 10px;
            cursor: pointer;

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
}
</style>

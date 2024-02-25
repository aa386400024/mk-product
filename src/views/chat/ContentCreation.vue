<template>
    <div class="content-creation">
        <div class="my-select">
            <MySelect
                v-model="selectedOption"
                :options="selectOptions"
                :filterable="true"
                :showIcons="true"
                placeholder="请选择运营场景"
            />
        </div>
        <MyCollapse :items="collapseItems">
            <template #item-1>
                <p>这是第一个折叠项的内容</p>
            </template>
            <template #item-2>
                <!-- 这里可以是任意自定义的内容或组件 -->
                <p>这是第二个折叠项的内容</p>
            </template>
            <!-- 为其他折叠项定义更多插槽内容 -->
        </MyCollapse>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { MyCollapse } from '@/components/collapse';
import { MySelect } from '@/components/select';

// 万彩生成后返回的数据
const wancai = [
    {
        "id": "240224850367475619353208",
        "scene_key": "10002",
        "param_config": {
            "A": "拼多多崛起的深度复盘",
            "B": "商业分析"
        },
        "new_time": 1708760193459,
        "detail": [
            {
                "id": "240224850367475619310013",
                "title": "",
                "answer": "大纲：\n\nI. 引言\n   A. 介绍拼多多崛起的背景和现状\n   B. 提出文章的写作目的和重要性\n\nII. 拼多多的商业模式分析\n   A. 拼多多的定位和目标用户群体\n   B. 分析拼多多的团购模式和社交电商特点\n   C. 探讨拼多多的优势和劣势\n\nIII. 拼多多的发展历程与成功要素\n   A. 分析拼多多的创始人及团队背景\n   B. 探讨拼多多的创新性和市场定位\n   C. 分析拼多多在商业模式上的突破和创新\n\nIV. 拼多多的市场竞争和发展前景\n   A. 分析拼多多与其他电商巨头的竞争关系\n   B. 探讨拼多多未来的发展方向和挑战\n   C. 分析拼多多在市场中的定位和策略调整\n\n写作建议和灵感：\n1. 多收集拼多多相关的资料和报告，包括其发展历程、财务数据、市场调研等，为文章提供充分的研究依据。\n2. 在写作过程中注意客观分析拼多多的优缺点，突出其商业模式的创新性和市场定位的准确性。\n3. 可以尝试采访拼多多的相关人士，包括创始人、员工、合作伙伴等，从第一手资料获取更多深度信息。\n4. 在文章结构上要清晰有序，逻辑严密，让读者能够清晰了解拼多多的崛起过程和商业模式。\n5. 在讨论拼多多未来发展前景时，可以有一定的预测性，激发读者对拼多多的关注和思考。",
                "status": 1,
                "like_type": 0,
                "return_code": "OK",
                "return_message": "",
                "new_time": 1708760193684,
                "update_time": 1708760204004
            }
        ]
    }
]

const selectedOption = ref('')

const collapseItems = ref([
    { title: "文章标题", name: "1", icon: 'home' },
    { title: "公众号创作", name: "2", icon: 'home' },
    { title: "今日头条", name: "3", icon: 'home' },
    { title: "百家号资讯", name: "4", icon: 'home' },
    { title: "文章热点选题", name: "5", icon: 'home' },
    { title: "内容大纲", name: "6", icon: 'home' },
    { title: "短文写作", name: "7", icon: 'home' },
    // 定义更多项...
]);

const selectOptions = ref([
  { value: 'Option1', label: '文章写作', icon: 'home' },
  { value: 'Option2', label: '营销推广', icon: 'home' },
  { value: 'Option3', label: '小红书', icon: 'home' },
  // 更多选项...
])
</script>

<style scoped lang="scss">
.content-creation {
    margin: 10px;
    border-radius: 10px;
    .my-select {
        margin-bottom: 10px;
    }
    :deep(.el-collapse-item__content) {
        margin: 10px;
    }
}
</style>
  
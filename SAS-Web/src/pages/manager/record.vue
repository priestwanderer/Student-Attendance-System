<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">考勤记录</h1>
        <div v-for="(record, index) in records" :key="index" class="space-y-6 bg-white p-6 rounded-lg shadow-lg mb-2">
            <div class="flex justify-between items-center">
                <p class="text-gray-500">{{ record.time }}</p>
            </div>
            <div class="grid grid-cols-4 gap-2">
                <div class="flex justify-center items-center">
                    <span>{{ record.college }}</span>
                </div>
                <div class="flex justify-center items-center">
                    <span>{{ record.grade }}</span>
                </div>
                <div class="flex justify-center items-center">
                    <span>{{ record.userClass }}</span>
                </div>
                <div>
                    <button class="btn btn-outline btn-primary">详情</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RecordPage',
    components: {}, // 用于注册子组件的地方
    data() {
        return {
            records: [],
        };
    },
    computed: {}, // 定义计算属性
    created() {
        // 获取考勤记录列表
        this.getRecordList();
    },
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {
        // 获取考勤记录列表
        async getRecordList() {
            const response = await this.$api.record.getRecordList();
            this.records = response;
        }
    },
};
</script>

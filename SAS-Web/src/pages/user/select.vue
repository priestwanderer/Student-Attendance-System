<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold text-center text-[#8c9eff] mb-6">选择访问模式</h1>
            <div class="space-y-6">
                <!-- 选择按钮 -->
                <div class="grid grid-cols-2 gap-4">
                    <button
                        @click="goToStudent"
                        class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        学生端
                    </button>
                    <button
                        @click="goToAdmin"
                        class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        考勤员端
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SelectPage',
    data() {
        return {};
    },
    methods: {
        goToStudent() {
            this.$router.push('/student');
        },
        goToAdmin() {
            this.$router.push('/head/arrangement');
        }
    }
};
</script>
<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold text-center text-[#8c9eff] mb-6">选择考勤班级</h1>
            <div class="space-y-6">
                <!-- 班级选择按钮 -->
                <div class="grid grid-cols-1 gap-4">
                    <button
                        @click="goToClass(1)"
                        class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {{ class1 }}
                    </button>
                    <button
                        @click="goToClass(2)"
                        class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {{ class2 }}
                    </button>
                </div>
                <!-- 返回按钮 -->
                <div class="mt-4">
                    <button 
                        @click="goBack" 
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        返回
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClassSelectPage',
    data() {
        return {
            class1: '',
            class2: ''
        };
    },
    created() {
        // 从状态管理中获取班级信息
        const classInfo = this.$store.arrangement.classInfo;
        if (classInfo) {
            this.class1 = classInfo.class1;
            this.class2 = classInfo.class2;
        } else {
            // 如果没有班级信息，返回考勤安排页面
            this.$router.push('/head/arrangement');
        }
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
                const response = await this.$api.user.getUserInfo({
                    class: this.$store.arrangement.selectedClass
                });
                // 筛选条件：状态管理中的 class 与接口中 userClass 相等
                const filteredUsers = response.filter(user => user.userClass == this.$store.arrangement.selectedClass);
                this.users = filteredUsers;
        },
        goToClass(classNumber) {
            // 将选择的班级信息存储到状态管理中
            const selectedClass = classNumber == 1 ? this.class1 : this.class2;
            this.$store.arrangement.setSelectedClass(selectedClass);
            
            // 根据选择的班级跳转到相应的考勤页面
            this.$router.push(`/head/classRate/${classNumber}`);
        },
        goBack() {
            this.$router.push('/head/arrangement');
        }
    }
};
</script>
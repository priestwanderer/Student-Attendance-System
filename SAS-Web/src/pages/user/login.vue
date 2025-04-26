<template>
    <div class="min-h-screen pb-10 flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 class="text-3xl font-bold text-center text-[#8c9eff]">校园考勤系统</h1>
            <form @submit.prevent="handleLogin" class="space-y-6">
                <!-- 学号输入框 -->
                <div>
                    <label for="studentId" class="block text-sm font-medium text-gray-700">学号</label>
                    <div class="mt-1">
                        <input id="studentId" v-model="form.studentId" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="请输入学号" />
                    </div>
                </div>

                <!-- 姓名输入框 -->
                <div>
                    <label for="userName" class="block text-sm font-medium text-gray-700">姓名</label>
                    <div class="mt-1">
                        <input id="userName" v-model="form.userName" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="请输入姓名" />
                    </div>
                </div>

                <!-- 登录按钮 -->
                <div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        登录
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import auth from '@/api/auth';
import { userStore } from '@/stores/user';

export default {
    name: 'LoginPage',
    data() {
        return {
            form: {
                studentId: '',
                userName: ''
            },
            store: userStore()
        };
    },
    methods: {
        async handleLogin() {
            this.loginError = '';
            const result = await auth.login(this.form);
            if (result) {
                // 根据用户身份跳转到不同页面
                userStore().decodeToken();
                console.log(userStore().isAdmin);  
                if (this.store.isAdmin == 1) {
                    // 管理员用户跳转到选择页面
                    this.$router.push('/select');
                } else {
                    // 普通学生跳转到学生信息页面
                    this.$router.push('/student');
                }
            } else {
                this.loginError = '登录失败，请检查学号和姓名';
            }
        }
    }
};
</script>
<template>
    <div class="drawer h-screen">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content h-screen flex flex-col">
            <!-- 导航栏 -->
            <div class="h-[6vh] w-full bg-white flex flex-row items-center">
                <div class="w-[15dvw] m-2 ml-4">
                    <label for="my-drawer" class="btn btn-circle swap swap-rotate">
                        <!-- hamburger icon -->
                        <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                            viewBox="0 0 512 512">
                            <path fill="#8c9eff"
                                d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                        </svg>
                    </label>
                </div>
                <div class="w-full mr-15 flex justify-center text-[#8c9eff] text-2xl">校园考勤网站</div>
            </div>
            <!-- 班级列表 -->
            <div class="h-[94vh] overflow-auto">
                <router-view></router-view>
            </div>
        </div>
        <!-- 侧边栏内容 -->
        <div class="drawer-side">
            <label for="my-drawer" class="drawer-overlay" aria-label="close sidebar"></label>
            <div class="bg-base-200 text-base-content min-h-full w-[60dvw] p-6 flex flex-col">
                <ul class="menu flex-grow w-full flex items-center">
                    <li
                        class="mb-5 w-full">
                        <a class="w-full text-xl text-[#8c9eff] border-2 flex justify-center" @click="goArrangement">安排</a>
                    </li>
                    <li
                        class="mb-5 w-full">
                        <a class="w-full text-xl text-[#8c9eff] border-2 flex justify-center" @click="goRota">考勤</a>
                    </li>
                    <li
                        class="mb-5 w-full">
                        <a class="w-full text-xl text-[#8c9eff] border-2 flex justify-center" @click="goRecord">记录</a>
                    </li>
                    <li
                        class="mb-5 w-full">
                        <a class="w-full text-xl text-[#8c9eff] border-2 flex justify-center" @click="goUpload">上传</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Directory from '@/assets/Directory.svg';
export default {
    name: 'HeadPage', // 组件的名称 (要使用驼峰命名法)
    components: {}, // 用于注册子组件的地方
    data() { // 定义组件的响应式数据
        return {
            Directory, // 目录图标
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {
        //  path 写的是路由里面定义的url路径，不是文件夹的相对路径
        goArrangement() {
            this.$router.push({ path: '/head/arrangement' });
        },
        goRota() {
            this.$router.push({ path: '/head/rota' });
        },
        goRecord() {
            this.$router.push({ path: '/head/record' });
        },
        goUpload() {
            this.$router.push({ path: '/head/upload' });
        },
    }, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
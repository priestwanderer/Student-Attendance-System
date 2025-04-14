<template>
    <div class="drawer h-screen">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content h-screen flex flex-col">
                <!-- 导航栏（包含年级选择、当前年级显示） -->
                <div class="h-[8vh] w-full flex flex-row fixed bg-white">
                    <div class="w-[15dvw] m-5 mb-0">
                        <!-- <img :src="Directory" alt="Directory" /> -->
                        <label for="my-drawer" class="btn btn-circle swap swap-rotate">
                            <!-- this hidden checkbox controls the state -->
                            <!-- hamburger icon -->
                            <svg class="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 512 512">
                                <path fill="#8c9eff"
                                    d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                            </svg>
                            <!-- close icon -->
                            <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 512 512">
                                <polygon fill="#8c9eff"
                                    points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                            </svg>
                        </label>
                    </div>
                    <!-- 专业与班级 -->
                    <div class="w-[60dvw] mt-4 text-2xl text-[#8c9eff] flex flex-row justify-center items-center">
                        <div>{{ major }}{{ classId }}</div>
                    </div>
                    <!-- 年级 (右侧) -->
                    <div class="w-[25dvw] mt-4 mr-10 font-thin text-2xl text-[#8c9eff] flex justify-end items-center">
                        {{ grade }}
                    </div>
                </div>
                <!-- 班级列表 -->
                <div class="h-[92vh] mt-[8vh] overflow-auto">
                    <router-view></router-view>
                </div>
        </div>
        <!-- 侧边栏内容 -->
        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label> <!-- 侧边栏遮罩 -->
            <div class="bg-base-200 text-base-content min-h-full w-[60dvw] p-6 flex flex-col">
                <div class="w-full mb-5 text-2xl text-[#8c9eff] flex justify-center items-center">考勤年级</div>
                <ul class="menu flex-grow w-full flex items-center">
                    <li
                        class="mb-5 w-full rounded-[5px] bg-[#e8e8e8] shadow-[7px_7px_10px_#d8d8d8,-7px_-7px_10px_#f8f8f8]">
                        <a class="w-full text-xl text-[#8c9eff] flex justify-center">24级</a></li>
                    <li
                        class="mb-5 w-full rounded-[5px] bg-[#e8e8e8] shadow-[7px_7px_10px_#d8d8d8,-7px_-7px_10px_#f8f8f8]">
                        <a class="w-full text-xl text-[#8c9eff] flex justify-center">23级</a></li>
                    <li
                        class="mb-5 w-full rounded-[5px] bg-[#e8e8e8] shadow-[7px_7px_10px_#d8d8d8,-7px_-7px_10px_#f8f8f8]">
                        <a class="w-full text-xl text-[#8c9eff] flex justify-center">22级</a></li>
                </ul>
                <div class="w-full h-[6dvh] mb-5 flex justify-center">
                    <img :src=add class="h-full w-[13dvw]">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import Directory from '@/assets/Directory.svg';
import add from '@/assets/add.svg';
export default {
    name: 'HeadPage', // 组件的名称 (要使用驼峰命名法)
    components: {}, // 用于注册子组件的地方
    data() { // 定义组件的响应式数据
        return {
            // Directory, // 目录图标
            add,
            major: '信管',
            classId: '1班',
            grade: '24级', // 年级
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {}, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
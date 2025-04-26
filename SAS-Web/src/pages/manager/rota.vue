<template>
    <!-- 考勤页导航栏（筛选学院、年级、班级） -->
    <div>
        <!-- 全勤提醒弹窗 -->
        <div v-if="PerfectAttendance" role="alert" class="alert alert-success fixed left-1/2 -translate-x-1/2 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg">班级全勤，无需导出名单。</span>
        </div>
        <!-- 花名册内容 -->
        <div class="w-full text-xl grid grid-cols-3 gap-4 my-5 px-3">
            <div v-for="(item, index) in items" :key="index" class="flex flex-col justify-center items-center">
                <!-- 学生证件照 -->
                <div class="flex justify-center items-center">
                    <img :src="item.image" class="w-full h-full" />
                </div>
                <!-- 学生姓名 -->
                <div class="mt-1">
                    <p>{{ item.name }}</p>
                </div>
                <!-- 到课状态 -->
                <div class="flex flex-row gap-1 mt-1">
                    <button class="btn btn-s btn-outline px-2"
                        :class="item.status === 'absent' ? 'btn-error' : 'btn-outline'"
                        @click="markStatus(index, 'absent')">缺勤</button>
                    <button class="btn btn-s btn-outline px-2"
                        :class="item.status === 'leave' ? 'btn-info' : 'btn-outline'"
                        @click="markStatus(index, 'leave')">请假</button>
                </div>
            </div>
        </div>
        <div class="w-full pb-10 flex justify-between px-13">
            <button class="w-[35dvw] btn btn-outline btn-primary btn-wide">保存考勤记录</button>
            <button class="w-[35dvw] btn btn-outline btn-primary btn-wide" @click="exportToExcel">导出考勤结果</button>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import img from '@/assets/rotaImg/img.png';
export default {
    name: 'RotaPage', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() { // 定义组件的响应式数据
        return {
            items: [
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
                {
                    name: '温迪',
                    image: img,
                    id: '24209010000',
                    status: '' // '' | 'absent' | 'leave'
                },
            ],
            PerfectAttendance: false, // 班级全勤情况下载弹出的提示框 (默认不显示)
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {
        // 独立控制每组按钮的状态
        markStatus(index, type) {
            const currentStatus = this.items[index].status;
            // 如果再次点击同一按钮，则取消状态
            this.items[index].status = currentStatus === type ? '' : type;
        },

        // 导出考勤结果为Excel文件
        exportToExcel() {
            const exportData = this.items
                .filter(item => item.status === 'absent' || item.status === 'leave') // filter 筛选出缺勤和请假的名单
                .map(item => ({ // map 循环遍历数据
                    姓名: item.name,
                    学号: item.id,
                    状态: item.status === 'absent' ? '缺勤' : '请假' // 如果status值为absent则显示缺勤，否则显示请假 (二元情况)
                }));
            if (exportData.length === 0) { // 如果没有缺勤或请假记录，则提示
                this.PerfectAttendance = true; // 显示班级全勤提示框
                setTimeout(() => {
                    this.PerfectAttendance = false; // 计时器，3秒后隐藏提示框
                }, 3000);
                return;
            }
            const worksheet = XLSX.utils.json_to_sheet(exportData); // 将JSON转为工作表
            const workbook = XLSX.utils.book_new(); // 创建工作簿
            const sheetName = `缺勤名单_${new Date().toLocaleDateString().replace(/\//g, '-')}`; // 定义工作表名称
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName); // 添加工作表
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, '缺勤名单.xlsx'); // 下载文件
        }
    }, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
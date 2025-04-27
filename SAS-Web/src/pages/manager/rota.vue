<template>
    <!-- 考勤页导航栏（显示当前班级信息） -->
    <div>
        <div class="h-[5vh] px-1 w-full bg-white flex flex-row">
            <div class="w-full flex justify-center items-center">
                <div class="text-[#8c9eff] text-lg flex items-center space-x-2">
                    <span>当前考勤班级：</span>
                    <span class="badge badge-lg">{{ userClass }}</span>
                </div>
            </div>
        </div>
        <!-- 全勤提醒弹窗 -->
        <div v-if="PerfectAttendance" role="alert" class="alert alert-success fixed left-1/2 -translate-x-1/2 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg">班级全勤，无需导出名单。</span>
        </div>
        <!-- 花名册内容 -->
        <div class="w-full text-xl grid grid-cols-3 gap-4 px-3">
            <div v-for="(item, index) in items" :key="index" class="flex flex-col justify-center items-center">
                <!-- 学生证件照 -->
                <div class="flex justify-center items-center">
                    <img :src="item.img" class="w-full h-full" />
                </div>
                <!-- 学生姓名 -->
                <div class="mt-1">
                    <p>{{ item.userName }}</p>
                </div>
                <!-- 到课状态 -->
                <div class="flex flex-row gap-1 mt-1">
                    <button class="btn btn-s btn-outline px-2" :class="item.status === '1' ? 'btn-error' : 'btn-outline'" @click="markStatus(index, '1')">缺勤</button>
                    <button class="btn btn-s btn-outline px-2" :class="item.status === '2' ? 'btn-info' : 'btn-outline'" @click="markStatus(index, '2')">请假</button>
                </div>
            </div>
        </div>
        <div class="w-full py-10 flex justify-between px-13">
            <button class="w-[35dvw] btn btn-outline btn-primary btn-wide" @click="addRecord">保存考勤记录</button>
            <button class="w-[35dvw] btn btn-outline btn-primary btn-wide" @click="exportToExcel">导出考勤结果</button>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import img from '@/assets/rotaImg/img.png';

export default {
    name: 'RotaPage',
    components: {},
    computed: {},
    created() {
        // 获取所有学生信息
        this.getUserList();
        // 获取考勤安排
        this.getArrangement();
    },
    mounted() { },
    updated() { },
    data() {
        return {
            items: [],
            PerfectAttendance: false,
            userClass: '生物医学工程学院2024级',
        };
    },
    methods: {
        // 获取所有学生信息
        async getUserList(){
            const response = await this.$api.user.getUserList();
            this.items = response.map(item => ({
                ...item,
                img: img // 假设每个学生都有一张默认的图片
            }));
        },
        // 获取考勤安排
        async getArrangement(){
            const response = await this.$api.arrangement.getArrangement();
            this.items = response
        },
        // 保存考勤记录
        async addRecord(){
            const response = await this.$api.record.addRecord(this.items);
            if (response.status === 200) {
                this.$message.success('考勤记录保存成功');
            } else {
                this.$message.error('考勤记录保存失败');
            }
        },
        markStatus(index, type) {
            const currentStatus = this.items[index].status;
            this.items[index].status = currentStatus === type ? '' : type;
        },
        exportToExcel() {
            const exportData = this.items
                .filter(item => item.status === '1' || item.status === '2')
                .map(item => ({
                    姓名: item.userName,
                    学号: item.studentId,
                    状态: item.status === '1' ? '缺勤' : '请假'
                }));

            if (exportData.length === 0) {
                this.PerfectAttendance = true;
                setTimeout(() => {
                    this.PerfectAttendance = false;
                }, 3000);
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            const sheetName = `缺勤名单_${new Date().toLocaleDateString().replace(/\//g, '-')}`;
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, '缺勤名单.xlsx');
        }
    }
};
</script>

<style scoped>
/* 添加自定义样式，根据需要调整 */
</style>
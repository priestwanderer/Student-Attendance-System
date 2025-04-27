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
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg">班级全勤，无需导出名单。</span>
        </div>
        <div v-if="isShowsuccess" role="alert" class="alert alert-success fixed left-1/2 -translate-x-1/2 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg">{{ message }}</span>
        </div>
        <div v-if="isShowerror" role="alert" class="alert alert-error fixed left-1/2 -translate-x-1/2 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span class="text-lg">{{ message }}</span>
        </div>
        <!-- 花名册内容 -->
        <div class="w-full text-xl grid grid-cols-3 gap-4 px-3">
            <div v-for="(item, index) in items" :key="index" class="flex flex-col justify-center items-center">
                <!-- 学生证件照 -->
                <div class="flex justify-center items-center">
                    <img :src="getItemImage(item)" class="w-full h-full" />
                </div>
                <!-- 学生姓名 -->
                <div class="mt-1">
                    <p>{{ item.userName }}</p>
                </div>
                <!-- 到课状态 -->
                <div class="flex flex-row gap-1 mt-1">
                    <button class="btn btn-s btn-outline px-2"
                        :class="item.status === '1' ? 'btn-error' : 'btn-outline'"
                        @click="item.status = '1'">缺勤</button>
                    <button class="btn btn-s btn-outline px-2" :class="item.status === '2' ? 'btn-info' : 'btn-outline'"
                        @click="item.status = '2'">请假</button>
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
import KaoQinClass from '../../utils/kaoqinClass'

export default {
    name: 'ClassRatePage',
    components: {},
    computed: {
        // 根据选择的班级筛选学生列表
    },
    created() {
        // 从状态管理中获取班级信息
        this.userClass = this.$store.arrangement.selectedClass || '未选择班级';
    },
    mounted() {
        // 获取所有学生信息
        this.getUserList();
        // 获取考勤安排
        this.getArrangement();
    },
    computed() {

    },
    updated() {
    },
    data() {
        return {
            items: [],
            PerfectAttendance: false,
            userClass: '',
            isShowerror:false,
            isShowsuccess:false,
            message:'',
            defaultImg: 'http://xierfloat.oss-cn-hongkong.aliyuncs.com/students/24209010028/1745696235639-3.jpg'
        };

    },
    methods: {
        // 获取所有学生信息
        getItemImage(item) {

            return item.img || this.defaultImg;
        },
        async getUserList() {
            // 从状态管理中获取选中的班级
            const selectedClass = this.$store.arrangement.selectedClass;
            this.userClass = selectedClass;
            let response;
            if (selectedClass) {
                // 调用API时传递班级参数
                const classCode = new KaoQinClass('2420901');
                let a;
                a = classCode.parseClassName(selectedClass)
                response = await this.$api.user.getUserList({
                    class: a
                });
            } else {
                response = await this.$api.user.getUserList();
            }
            // 映射响应数据
            this.items = response.map(item => ({ ...item, status: '0' }))
        },
        // 获取考勤安排
        async getArrangement() {
            const arrangementId = this.$store.arrangement.arrangementId;
            if (arrangementId) {
                const response = await this.$api.arrangement.getArrangement({
                    arrangementId: arrangementId
                });
                this.items = response;
            }
        },
        // 保存考勤记录
        async addRecord() {
            // 只保存筛选后的学生考勤记录
            const response = await this.$api.record.addRecord({
                arrangementId: this.$store.arrangement.arrangementId,
                data:this.items
            });
            if (response) {
                this.isShowsuccess = true;
                this.message='考勤记录保存成功';
                setTimeout(() => {
                    this.isShowsuccess = false;
                }, 1000);
            } else {
                this.isShowerror = true;
                this.message='考勤记录保存失败';
                this.message='考勤记录保存成功';
                setTimeout(() => {
                    this.isShowerror = false;
                }, 1000);
            }
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
                }, 2000);
                return;
            }

            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, '考勤结果');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${this.userClass}考勤结果.xlsx`);
        }
    }
};
</script>
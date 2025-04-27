<template>
    <div class="container mx-auto p-4">
        <button @click="backToList" class="mb-4 btn btn-outline btn-neutral">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回列表
        </button>
        
        <!-- 记录基本信息 -->
        <div class="bg-white p-6 rounded-lg shadow-lg mb-6">
            <h1 class="text-2xl font-bold mb-4">考勤记录详情</h1>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                    <p class="text-gray-500 text-sm">日期</p>
                    <p class="font-medium">{{ recordInfo.date }}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm">课程</p>
                    <p class="font-medium">{{ recordInfo.course }}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm">教室</p>
                    <p class="font-medium">{{ recordInfo.classroom }}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm">班级</p>
                    <p class="font-medium">{{ recordInfo.className }}</p>
                </div>
            </div>
        </div>
        
        <!-- 学生列表 -->
        <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-medium">学生考勤列表</h2>
                <div class="flex gap-2">
                    <input type="text" v-model="searchKeyword" placeholder="搜索学号或姓名" 
                        class="input input-bordered" />
                    <button @click="exportToExcel" class="btn btn-outline btn-primary">
                        导出Excel
                    </button>
                </div>
            </div>
            
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-50">
                            <th class="border p-3 text-left">学号</th>
                            <th class="border p-3 text-left">姓名</th>
                            <th class="border p-3 text-left">状态</th>
                            <th class="border p-3 text-left">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in filteredStudents" :key="index" class="hover:bg-gray-100">
                            <td class="border p-3">{{ item.studentId }}</td>
                            <td class="border p-3">{{ item.name }}</td>
                            <td class="border p-3">
                                <span :class="getStatusClass(item.status)">{{ getStatusText(item.status) }}</span>
                            </td>
                            <td class="border p-3">
                                <button @click="openEditDialog(index)" class="btn btn-sm btn-outline btn-info mr-2">
                                    修改状态
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        
        <!-- 编辑对话框 -->
        <div v-if="isEditDialogOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-96">
                <h2 class="text-xl font-bold mb-4">修改考勤状态</h2>
                <div class="mb-6">
                    <p class="mb-2">学生: {{ editingStudent.name }} ({{ editingStudent.studentId }})</p>
                    <div class="flex flex-col space-y-2">
                        <label class="flex items-center p-2 border rounded hover:bg-gray-50">
                            <input type="radio" value="present" v-model="selectedStatus" class="mr-2">
                            <span class="text-green-600 font-medium">出勤</span>
                        </label>
                        <label class="flex items-center p-2 border rounded hover:bg-gray-50">
                            <input type="radio" value="absent" v-model="selectedStatus" class="mr-2">
                            <span class="text-red-600 font-medium">缺勤</span>
                        </label>
                        <label class="flex items-center p-2 border rounded hover:bg-gray-50">
                            <input type="radio" value="leave" v-model="selectedStatus" class="mr-2">
                            <span class="text-blue-600 font-medium">请假</span>
                        </label>
                    </div>
                </div>
                <div class="flex justify-end space-x-2">
                    <button @click="closeEditDialog" class="btn btn-outline btn-neutral">
                        取消
                    </button>
                    <button @click="saveStatus" class="btn btn-outline btn-success">
                        保存
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { userStore } from '@/stores/user';

export default {
    name: 'RecordDetail',
    data() {
        return {
            store: userStore(),
            recordId: '',
            recordInfo: {
                id: '',
                date: '',
                course: '',
                classroom: '',
                className: '',
                totalCount: 0,
                presentCount: 0,
                absentCount: 0,
                leaveCount: 0
            },
            students: [],
            searchKeyword: '',
            isEditDialogOpen: false,
            editingStudent: {
                index: -1,
                studentId: '',
                name: '',
                status: ''
            },
            selectedStatus: ''
        };
    },
    computed: {
        // 根据搜索关键词筛选学生列表
        filteredStudents() {
            if (!this.searchKeyword) {
                return this.students;
            }
            
            const keyword = this.searchKeyword.toLowerCase();
            return this.students.filter(student => 
                student.studentId.toLowerCase().includes(keyword) || 
                student.name.toLowerCase().includes(keyword)
            );
        }
    },
    created() {
        // 获取路由参数中的记录id
        this.recordId = this.$route.query.id;
        // 获取考勤记录详情
        this.getRecordDetail();
    },
    methods: {
        // 返回列表页面
        backToList() {
            this.$router.push('/manager/record');
        },
        
        // 获取考勤记录详情
        async getRecordDetail() {
                // 实际项目中应该调用API获取考勤记录详情
                // const response = await this.$api.attendance.getRecordDetail({ id: this.recordId });
                // this.recordInfo = response.data.info;
                // this.students = response.data.students;
                
                // 模拟数据
                this.recordInfo = {
                    id: this.recordId,
                    date: '2023-10-15',
                    course: '高等数学',
                    classroom: 'A3-201',
                    className: '2022级信息管理1班',
                    totalCount: 35,
                    presentCount: 30,
                    absentCount: 3,
                    leaveCount: 2
                };
                
                this.students = [
                    { studentId: '22209010001', name: '张三', status: 'present' },
                    { studentId: '22209010002', name: '李四', status: 'present' },
                    { studentId: '22209010003', name: '王五', status: 'absent' },
                    { studentId: '22209010004', name: '赵六', status: 'leave' },
                    { studentId: '22209010005', name: '钱七', status: 'present' },
                    { studentId: '22209010006', name: '孙八', status: 'present' },
                    { studentId: '22209010007', name: '周九', status: 'absent' },
                    { studentId: '22209010008', name: '吴十', status: 'present' },
                    { studentId: '22209010009', name: '郑十一', status: 'present' },
                    { studentId: '22209010010', name: '王十二', status: 'leave' },
                ];
        },
        // 获取状态文本
        getStatusText(status) {
            const statusMap = {
                present: '出勤',
                absent: '缺勤',
                leave: '请假'
            };
            return statusMap[status] || '未知';
        },
        
        // 获取状态样式类
        getStatusClass(status) {
            const classMap = {
                present: 'text-green-600',
                absent: 'text-red-600',
                leave: 'text-blue-600'
            };
            return classMap[status] || '';
        },
        
        // 打开编辑对话框
        openEditDialog(index) {
            const student = this.filteredStudents[index];
            this.editingStudent = {
                index: index,
                studentId: student.studentId,
                name: student.name,
                status: student.status
            };
            this.selectedStatus = student.status;
            this.isEditDialogOpen = true;
        },
        
        // 关闭编辑对话框
        closeEditDialog() {
            this.isEditDialogOpen = false;
            this.editingStudent = {
                index: -1,
                studentId: '',
                name: '',
                status: ''
            };
            this.selectedStatus = '';
        },
        
        // 保存状态修改
        async saveStatus() {
            try {
                const studentIndex = this.students.findIndex(
                    student => student.studentId === this.editingStudent.studentId
                );
                
                if (studentIndex !== -1) {
                    // 更新学生状态
                    this.students[studentIndex].status = this.selectedStatus;
                    
                    // 更新统计数据
                    this.updateStatusCounts();
                    
                    // 实际项目中应该调用API保存状态修改
                    // await this.$api.attendance.updateRecord({
                    //     recordId: this.recordId,
                    //     studentId: this.editingStudent.studentId,
                    //     status: this.selectedStatus
                    // });
                    
                    console.log('状态修改成功');
                }
                
                // 关闭对话框
                this.closeEditDialog();
            } catch (error) {
                console.error('保存状态修改失败:', error);
            }
        },
        
        // 更新统计数据
        updateStatusCounts() {
            // 重新计算各状态人数
            const counts = this.students.reduce((acc, student) => {
                acc[student.status] = (acc[student.status] || 0) + 1;
                return acc;
            }, {});
            
            this.recordInfo.presentCount = counts.present || 0;
            this.recordInfo.absentCount = counts.absent || 0;
            this.recordInfo.leaveCount = counts.leave || 0;
        },
        
        // 导出Excel
        exportToExcel() {
            const exportData = this.students.map(student => ({
                学号: student.studentId,
                姓名: student.name,
                状态: this.getStatusText(student.status)
            }));
            
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            const sheetName = `考勤记录_${this.recordInfo.className}_${this.recordInfo.date}`;
            XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
            saveAs(blob, `${sheetName}.xlsx`);
        }
    }
};
</script>
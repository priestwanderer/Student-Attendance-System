<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">考勤安排</h1>
        <!-- 考勤安排列表 -->
        <div v-for="(schedule, index) in attendanceSchedules" :key="index"
            class="card bg-base-100 rounded-box shadow-md mb-4">
            <div class="card-body">
                <!-- 星期 -->
                <h2 class="card-title text-2xl text-[#8c9eff]">星期{{ schedule.whichDay }}</h2>
                <!-- 考勤班级 -->
                <div class="w-full flex flex-col mb-2">
                    <div class="text-lg">{{ schedule.class1 }}</div>
                    <div class="text-lg">{{ schedule.class2 }}</div>
                </div>
                <!-- 考勤信息 -->
                <div class="grid grid-cols-4 gap-2 p-1 rounded mb-4">
                    <div class="text-lg">课程</div>
                    <div class="text-lg">时间</div>
                    <div class="text-lg">教室</div>
                    <div class="text-lg">考勤员</div>

                    <div>{{ schedule.course }}</div>
                    <div>{{ schedule.time }}</div>
                    <div>{{ schedule.classroom }}</div>
                    <div class="w-full flex flex-col">
                        <div>{{ schedule.adminOne }}</div>
                        <div>{{ schedule.adminTwo }}</div>
                    </div>
                </div>
                <!-- 操作按钮 -->
                <div class="card-actions justify-end">
                    <button class="btn btn-outline btn-info mr-2"  @click="gotoRota(index)">
                        <svg t="1745704813459" class="icon w-8 h-8" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="3474" width="200" height="200">
                            <path
                                d="M226.592 896C167.616 896 128 850.48 128 782.736V241.264C128 173.52 167.616 128 226.592 128c20.176 0 41.136 5.536 62.288 16.464l542.864 280.432C887.648 453.792 896 491.872 896 512s-8.352 58.208-64.272 87.088L288.864 879.536C267.712 890.464 246.768 896 226.592 896z m0-704.304c-31.008 0-34.368 34.656-34.368 49.568v541.472c0 14.896 3.344 49.568 34.368 49.568 9.6 0 20.88-3.2 32.608-9.248l542.864-280.432c21.904-11.328 29.712-23.232 29.712-30.608s-7.808-19.28-29.712-30.592L259.2 200.96c-11.728-6.048-23.008-9.264-32.608-9.264z"
                                fill="#8c9eff" p-id="3475"></path>
                        </svg>
                    </button>
                    <button class="btn btn-outline btn-primary mr-2" @click="openEditDialog(index)">
                        <svg t="1745055947649" class="icon w-8 h-8" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1931" width="200" height="200">
                            <path
                                d="M723.862069 70.62069a105.931034 105.931034 0 0 1 105.931034 105.931034l0.017656 141.064828c4.025379 1.712552 7.768276 4.219586 11.052138 7.485793l99.87531 99.87531a35.310345 35.310345 0 0 1 0 49.928828L829.793103 585.851586V847.448276a105.931034 105.931034 0 0 1-105.931034 105.931034H211.862069a105.931034 105.931034 0 0 1-105.931035-105.931034V176.551724a105.931034 105.931034 0 0 1 105.931035-105.931034h512z m0 52.965517H211.862069a52.965517 52.965517 0 0 0-52.965517 52.965517v670.896552a52.965517 52.965517 0 0 0 52.965517 52.965517h512a52.965517 52.965517 0 0 0 52.965517-52.965517V638.817103l-89.017379 89.035035a35.310345 35.310345 0 0 1-22.245517 10.24l-128.741518 9.886896a17.655172 17.655172 0 0 1-18.961655-18.944L527.766069 600.275862a35.310345 35.310345 0 0 1 10.24-22.245517L776.827586 339.173517V176.551724a52.965517 52.965517 0 0 0-52.965517-52.965517z m92.036414 251.462621L580.078345 610.833655l-6.232276 81.160828 81.143172-6.232276 235.820138-235.820138-74.910896-74.893241z"
                                fill="#6850e9" p-id="1932"></path>
                        </svg>
                    </button>
                    <button class="btn btn-outline btn-error" @click="openDeleteDialog(index)">
                        <svg t="1745055845980" class="icon w-8 h-8" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="1541" width="200" height="200">
                            <path
                                d="M617.931034 70.62069a70.62069 70.62069 0 0 1 70.62069 70.620689v52.965518h264.827586v176.551724h-58.844689l-50.776276 456.968827A141.241379 141.241379 0 0 1 703.382069 953.37931H320.617931a141.241379 141.241379 0 0 1-140.358621-125.651862L129.447724 370.758621H70.62069V194.206897h264.827586V141.241379a70.62069 70.62069 0 0 1 70.62069-70.620689h211.862068z m223.302621 300.137931H182.74869l50.140689 451.124965a88.275862 88.275862 0 0 0 83.791449 78.441931l3.937103 0.088276h382.764138a88.275862 88.275862 0 0 0 87.746207-78.530207L841.216 370.758621zM388.413793 459.034483v353.103448h-52.965517V459.034483h52.965517z m264.827586 0v353.103448h-52.965517V459.034483h52.965517z m247.172414-211.862069H123.586207v70.620689h776.827586v-70.620689zM617.931034 123.586207H406.068966a17.655172 17.655172 0 0 0-17.655173 17.655172v52.965518h247.172414V141.241379a17.655172 17.655172 0 0 0-15.589517-17.531586L617.931034 123.586207z"
                                fill="#f35b48" p-id="1542"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- 新增按钮 -->
        <div class="pb-10 flex justify-center items-center">
            <button class="btn btn-outline btn-primary btn-wide text-lg" @click="openAddDialog">
                新增考勤安排
            </button>
        </div>
        <!-- 编辑对话框 -->
        <dialog id="editDialog" class="modal">
            <div class="modal-box w-11/12 max-w-2xl">
                <h3 class="font-bold text-lg mb-4">编辑考勤安排</h3>
                <form class="grid grid-cols-3 gap-4">
                    <div class="form-control">
                        <label class="label">年级一</label>
                        <select v-model="currentSchedule.grade1" class="select select-bordered w-full">
                            <option disabled selected>选择年级</option>
                            <option value="22">2022级</option>
                            <option value="23">2023级</option>
                            <option value="24">2024级</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">学院一</label>
                        <select v-model="currentSchedule.college1" class="select select-bordered w-full">
                            <option disabled selected>选择学院</option>
                            <option value="02">第二临床医学院</option>
                            <option value="03">医学技术学院</option>
                            <option value="04">护理学院</option>
                            <option value="05">公共卫生学院</option>
                            <option value="06">药学院</option>
                            <option value="07">人文与管理学院</option>
                            <option value="08">基础医学院</option>
                            <option value="09">生物医学工程学院</option>
                            <option value="11">外国语学院</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">班级一</label>
                        <select v-model="currentSchedule.class1" class="select select-bordered w-full">
                            <option disabled selected>选择班级</option>
                            <option value="01">1班</option>
                            <option value="02">2班</option>
                            <option value="03">3班</option>
                            <option value="04">4班</option>
                            <option value="05">5班</option>
                            <option value="06">6班</option>
                            <option value="07">7班</option>
                            <option value="08">8班</option>
                            <option value="09">9班</option>
                            <option value="10">10班</option>
                            <option value="11">11班</option>
                            <option value="12">12班</option>
                            <option value="13">13班</option>
                            <option value="14">14班</option>
                            <option value="15">15班</option>
                            <option value="16">16班</option>
                            <option value="17">17班</option>
                            <option value="18">18班</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">年级二</label>
                        <select v-model="currentSchedule.grade2" class="select select-bordered w-full">
                            <option disabled selected>选择年级</option>
                            <option value="22">2022级</option>
                            <option value="23">2023级</option>
                            <option value="24">2024级</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">学院二</label>
                        <select v-model="currentSchedule.college2" class="select select-bordered w-full">
                            <option disabled selected>选择学院</option>
                            <option value="02">第二临床医学院</option>
                            <option value="03">医学技术学院</option>
                            <option value="04">护理学院</option>
                            <option value="05">公共卫生学院</option>
                            <option value="06">药学院</option>
                            <option value="07">人文与管理学院</option>
                            <option value="08">基础医学院</option>
                            <option value="09">生物医学工程学院</option>
                            <option value="11">外国语学院</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">班级二</label>
                        <select v-model="currentSchedule.class2" class="select select-bordered w-full">
                            <option disabled selected>选择班级</option>
                            <option value="01">1班</option>
                            <option value="02">2班</option>
                            <option value="03">3班</option>
                            <option value="04">4班</option>
                            <option value="05">5班</option>
                            <option value="06">6班</option>
                            <option value="07">7班</option>
                            <option value="08">8班</option>
                            <option value="09">9班</option>
                            <option value="10">10班</option>
                            <option value="11">11班</option>
                            <option value="12">12班</option>
                            <option value="13">13班</option>
                            <option value="14">14班</option>
                            <option value="15">15班</option>
                            <option value="16">16班</option>
                            <option value="17">17班</option>
                            <option value="18">18班</option>
                        </select>
                    </div>
                </form>
                <form class="grid grid-cols-2 gap-2">
                    <!-- 第几节课下课 -->
                    <div class="form-control">
                        <label class="label">第几节</label>
                        <select v-model="currentSchedule.whichCourse" class="select input input-bordered w-full">
                            <option value="1">一</option>
                            <option value="2">二</option>
                            <option value="3">三</option>
                            <option value="4">四</option>
                            <option value="5">五</option>
                            <option value="6">六</option>
                            <option value="7">七</option>
                            <option value="8">八</option>
                        </select>
                    </div>
                    <!-- 时间 -->
                    <div class="form-control">
                        <label class="label">时间</label>
                        <input type="text" v-model="currentSchedule.time" placeholder="时间点"
                            class="input input-bordered w-full">
                    </div>
                    <!-- 课程 -->
                    <div class="form-control">
                        <label class="label">课程</label>
                        <input type="text" v-model="currentSchedule.course" placeholder="课程名称"
                            class="input input-bordered w-full">
                    </div>
                    <!-- 教室 -->
                    <div class="form-control">
                        <label class="label">教室</label>
                        <input type="text" v-model="currentSchedule.classroom" placeholder="教室"
                            class="input input-bordered w-full">
                    </div>
                    <!-- 考勤员1 -->
                    <div class="form-control">
                        <label class="label">考勤员1</label>
                        <input type="text" v-model="currentSchedule.adminOne" placeholder="考勤员1"
                            class="input input-bordered w-full">
                    </div>
                    <!-- 考勤员2 -->
                    <div class="form-control">
                        <label class="label">考勤员2</label>
                        <input type="text" v-model="currentSchedule.adminTwo" placeholder="考勤员2"
                            class="input input-bordered w-full">
                    </div>
                </form>
                <div class="modal-action">
                    <button class="btn btn-outline btn-warning" @click="closeEditDialog">取消</button>
                    <button class="btn btn-outline btn-success" @click="saveSchedule">保存</button>
                </div>
            </div>
        </dialog>
        <!-- 删除确认对话框 -->
        <div v-if="isConfirm" class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div class="bg-white p-6 rounded-lg w-80 text-center">
                <p class="text-lg mb-6">确定要删除这个考勤安排吗？</p>
                <div class="flex justify-center gap-4">
                    <button class="btn btn-outline" @click="handleDeleteCancel">取消</button>
                    <button class="btn btn-outline btn-error" @click="handleDeleteConfirm">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';
import kaoqinClass from '@/utils/kaoqinClass';
export default {
    name: 'AttendanceScheduler',
    components: {},
    computed: {},
    created() {
        // 获取考勤安排列表
        this.getArrangementList();
    },
    data() {
        return {
            attendanceSchedules: [], // 
            currentSchedule: {},
            currentIndex: -1,
            isAdding: false,
            isConfirm: false,
            deleteIndex: -1,
            filterClass: '',
            filteredSchedules: [],
            UserClass: [], // 用户班级信息
            isAdd: false // 是否是新增
        };
    },
    methods: {
        // 获取考勤安排列表
        async getArrangementList() {
            const response = await this.$api.arrangement.getArrangementList();
            this.attendanceSchedules = response;
            this.attendanceSchedules = this.attendanceSchedules.map(item => {
                const classes = item.userClass.split(',');
                const classOneObj = new kaoqinClass(classes[0]);
                const classTwoObj = new kaoqinClass(classes[1]);
                const class1 = classOneObj.className;
                const class2 = classTwoObj.className;
                return {
                    ...item,
                    class1: class1,
                    class2: class2
                };
            });
            this.attendanceSchedules.map(item => {
                if (item.whichCourse == 1) {
                    item.whichCourse = '一';
                } else if (item.whichCourse == 2) {
                    item.whichCourse = '二';
                } else if (item.whichCourse == 3) {
                    item.whichCourse = '三';
                } else if (item.whichCourse == 4) {
                    item.whichCourse = '四';
                } else if (item.whichCourse == 5) {
                    item.whichCourse = '五';
                } else if (item.whichCourse == 6) {
                    item.whichCourse = '六';
                } else if (item.whichCourse == 7) {
                    item.whichCourse = '七';
                } else if (item.whichCourse == 8) {
                    item.whichCourse = '八';
                }
            });
            this.attendanceSchedules.map(item => {
                if (item.whichDay == 1) {
                    item.whichDay = '一';
                } else if (item.whichDay == 2) {
                    item.whichDay = '二';
                } else if (item.whichDay == 3) {
                    item.whichDay = '三';
                } else if (item.whichDay == 4) {
                    item.whichDay = '四';
                } else if (item.whichDay == 5) {
                    item.whichDay = '五';
                } else if (item.whichDay == 6) {
                    item.whichDay = '六';
                } else if (item.whichDay == 7) {
                    item.whichDay = '日';
                }
            });
            // 格式化时间和班级编码
            this.attendanceSchedules.forEach(schedule => {
                if (schedule.time) {
                    schedule.time = this.formatDate(schedule.time, 'YYYY-MM-DD');
                }
            });
        },
        // 格式化日期
        formatDate(timestamp, format = 'YYYY-MM-DD') {
            if (!timestamp) return '';
            return dayjs(timestamp).format(format);
        },
        // 新增考勤安排
        async addArrangement() {
            const response = await this.$api.arrangement.addArrangement({
                userClass: `${this.currentSchedule.grade1}2${this.currentSchedule.college1}${this.currentSchedule.class1},${this.currentSchedule.grade2}2${this.currentSchedule.college2}${this.currentSchedule.class2}`,
                course: this.currentSchedule.course,
                time: this.currentSchedule.time,
                whichCourse: this.currentSchedule.whichCourse,
                classroom: this.currentSchedule.classroom,
                adminOne: this.currentSchedule.adminOne,
                adminTwo: this.currentSchedule.adminTwo,
            });
            this.currentSchedule = response;
            this.getArrangementList();
        },
        // 修改考勤安排
        async updateArrangement() {
            const response = await this.$api.arrangement.updateArrangement(this.currentSchedule);
            if (response.success) {
                // 转换班级编码
                if (this.currentSchedule.class1) {
                    const classInfo1 = new kaoqinClass(this.currentSchedule.class1);
                    this.currentSchedule.class1 = classInfo1.getClassName();
                }
                if (this.currentSchedule.class2) {
                    const classInfo2 = new kaoqinClass(this.currentSchedule.class2);
                    this.currentSchedule.class2 = classInfo2.getClassName();
                }
                this.attendanceSchedules[this.currentIndex] = this.currentSchedule;
                this.currentSchedule = {};
            }
        },
        // 删除考勤安排
        async deleteArrangement() {
            const response = await this.$api.arrangement.deleteArrangement({
                arrangementId: this.attendanceSchedules[this.deleteIndex].arrangementId

            });
            if (response.success) {
                this.attendanceSchedules.splice(this.deleteIndex, 1);
                this.deleteIndex = -1;
            }
        },
        // 打开编辑对话框
        openEditDialog(index) {
            this.currentIndex = index;
            this.currentSchedule = { ...this.attendanceSchedules[index] };
            this.isAdding = false;
            document.getElementById('editDialog').showModal();
            this.isAdd = false;
        },
        // 应用班级筛选
        applyFilter() {
            if (this.filterClass) {
                this.filteredSchedules = this.attendanceSchedules.filter(schedule =>
                    schedule.class1.includes(this.filterClass) || schedule.class2.includes(this.filterClass)
                );
            } else {
                this.filteredSchedules = [...this.attendanceSchedules];
            }
        },
        // 关闭编辑对话框
        closeEditDialog() {
            document.getElementById('editDialog').close();
        },
        // 保存考勤安排
        saveSchedule() {
            if (this.currentIndex !== -1) {
                this.attendanceSchedules[this.currentIndex] = { ...this.currentSchedule };
            } else if (this.isAdding) {
                this.attendanceSchedules.push({ ...this.currentSchedule });
            }
            this.closeEditDialog();
            this.currentIndex = -1;
            this.isAdding = false;
            if (this.isAdd) {
                this.addArrangement();
            } else if (this.isAdd === false) {
                this.updateArrangement();
            }
        },
        // 打开删除对话框
        openDeleteDialog(index) {
            this.deleteIndex = index;
            this.isConfirm = true;
        },
        // 处理删除确认
        handleDeleteConfirm() {
            if (this.deleteIndex !== -1) {
                this.deleteArrangement();
                this.isConfirm = false;
            }
        },
        // 处理删除取消
        handleDeleteCancel() {
            this.deleteIndex = -1;
            this.isConfirm = false;
        },
        // 打开新增对话框
        openAddDialog() {
            this.currentSchedule = {};
            this.isAdding = true;
            document.getElementById('editDialog').showModal();
            this.isAdd = true;
        },
        // 跳转到考勤安排详情
        gotoRota(index) {
            // 设置当前索引
            this.currentIndex = index !== undefined ? index : this.currentIndex;
            
            // 存储考勤安排ID和班级信息到状态管理
            const currentSchedule = this.attendanceSchedules[this.currentIndex];
            this.$store.arrangement.userClass = currentSchedule.userClass;
            this.$store.arrangement.arrangementId = currentSchedule.arrangementId;
            
            // 解析班级信息并存储到状态管理
            const class1 = currentSchedule.class1;
            const class2 = currentSchedule.class2;
            
            // 设置班级信息到状态管理
            this.$store.arrangement.setClassInfo(class1, class2);
            
            // 跳转到班级选择页面
            this.$router.push({ path: '/head/classSelect' });
        }
    }
};
</script>

<style scoped></style>
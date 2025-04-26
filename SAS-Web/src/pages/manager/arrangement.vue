<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">考勤安排</h1>
        <!-- 考勤安排列表 -->
        <div v-for="(schedule, index) in attendanceSchedules" :key="index"
            class="card bg-base-100 rounded-box shadow-md mb-4">
            <div class="card-body">
                <!-- 星期 -->
                <h2 class="card-title text-2xl text-[#8c9eff]">星期{{ schedule.day }}</h2>
                <!-- 考勤班级 -->
                <div class="grid grid-cols-2 mb-2">
                    <div class="text-lg">{{ schedule.college1 }}{{ schedule.grade1 }}{{ schedule.class1 }}</div>
                    <div class="text-lg">{{ schedule.college2 }}{{ schedule.grade2 }}{{ schedule.class2 }}</div>
                </div>
                <!-- 考勤信息 -->
                <div class="grid grid-cols-4 gap-4 p-2 rounded mb-4">
                    <div class="text-lg">课程</div>
                    <div class="text-lg">时间</div>
                    <div class="text-lg">教室</div>
                    <div class="text-lg">考勤员</div>

                    <div>{{ schedule.course }}</div>
                    <div>{{ schedule.time }}</div>
                    <div>{{ schedule.classroom }}</div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>{{ schedule.admin1 }}</div>
                        <div>{{ schedule.admin2 }}</div>
                    </div>
                </div>
                <!-- 操作按钮 -->
                <div class="card-actions justify-end">
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
                        <label class="label">学院一</label>
                        <select v-model="currentSchedule.college1" class="select select-bordered w-full">
                            <option disabled selected>选择学院</option>
                            <option value="2">第二临床医学院</option>
                            <option value="3">医学技术学院</option>
                            <option value="4">护理学院</option>
                            <option value="5">公共卫生学院</option>
                            <option value="6">药学院</option>
                            <option value="7">人文与管理学院</option>
                            <option value="8">基础医学院</option>
                            <option value="9">生物医学工程学院</option>
                            <option value="11">外国语学院</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">年级一</label>
                        <select v-model="currentSchedule.grade1" class="select select-bordered w-full">
                            <option disabled selected>选择年级</option>
                            <option value="2021">2021级</option>
                            <option value="2022">2022级</option>
                            <option value="2023">2023级</option>
                            <option value="2024">2024级</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">班级一</label>
                        <select v-model="currentSchedule.class1" class="select select-bordered w-full">
                            <option disabled selected>选择班级</option>
                            <option value="1">1班</option>
                            <option value="2">2班</option>
                            <option value="3">3班</option>
                            <option value="4">4班</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">学院二</label>
                        <select v-model="currentSchedule.college2" class="select select-bordered w-full">
                            <option disabled selected>选择学院</option>
                            <option value="2">第二临床医学院</option>
                            <option value="3">医学技术学院</option>
                            <option value="4">护理学院</option>
                            <option value="5">公共卫生学院</option>
                            <option value="6">药学院</option>
                            <option value="7">人文与管理学院</option>
                            <option value="8">基础医学院</option>
                            <option value="9">生物医学工程学院</option>
                            <option value="11">外国语学院</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">年级二</label>
                        <select v-model="currentSchedule.grade2" class="select select-bordered w-full">
                            <option disabled selected>选择年级</option>
                            <option value="2021">2021级</option>
                            <option value="2022">2022级</option>
                            <option value="2023">2023级</option>
                            <option value="2024">2024级</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label">班级二</label>
                        <select v-model="currentSchedule.class2" class="select select-bordered w-full">
                            <option disabled selected>选择班级</option>
                            <option value="1">1班</option>
                            <option value="2">2班</option>
                            <option value="3">3班</option>
                            <option value="4">4班</option>
                        </select>
                    </div>
                </form>
                <form class="grid grid-cols-2 gap-4">
                    <!-- 星期 -->
                    <div class="form-control">
                        <label class="label">星期</label>
                        <select v-model="currentSchedule.day" class="select input input-bordered w-full">
                            <option value="一">一</option>
                            <option value="二">二</option>
                            <option value="三">三</option>
                            <option value="四">四</option>
                            <option value="五">五</option>
                            <option value="六">六</option>
                            <option value="日">日</option>
                        </select>
                    </div>
                    <!-- 课程 -->
                    <div class="form-control">
                        <label class="label">课程</label>
                        <input type="text" v-model="currentSchedule.course" placeholder="课程名称"
                            class="input input-bordered w-full">
                    </div>
                    <!-- 时间 -->
                    <div class="form-control">
                        <label class="label">时间</label>
                        <input type="text" v-model="currentSchedule.time" placeholder="时间点"
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
                        <input type="text" v-model="currentSchedule.admin1" placeholder="考勤员1"
                            class="input input-bordered w-full">
                    </div>
                    <!-- 考勤员2 -->
                    <div class="form-control">
                        <label class="label">考勤员2</label>
                        <input type="text" v-model="currentSchedule.admin2" placeholder="考勤员2"
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
export default {
    name: 'AttendanceScheduler',
    data() {
        return {
            attendanceSchedules: [
                {
                    class1: "24信管1班",
                    class2: "24信管2班",
                    day: "一",
                    course: "数学分析",
                    time: "上午第四节下课",
                    classroom: "A3-2",
                    admin1: "龙",
                    admin2: "刘"
                }
            ],
            currentSchedule: {
                day: "一",
                course: "数学分析",
                time: "上午第四节下课",
                classroom: "A3-2",
                admin1: "龙",
                admin2: "刘"
            },
            currentIndex: -1,
            isAdding: false,
            isConfirm: false,
            deleteIndex: -1
        };
    },
    methods: {
        // 打开编辑对话框
        openEditDialog(index) {
            this.currentIndex = index;
            this.currentSchedule = { ...this.attendanceSchedules[index] };
            this.isAdding = false;
            document.getElementById('editDialog').showModal();
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
        },

        // 打开删除对话框
        openDeleteDialog(index) {
            this.deleteIndex = index;
            this.isConfirm = true;
        },

        // 处理删除确认
        handleDeleteConfirm() {
            if (this.deleteIndex !== -1) {
                this.attendanceSchedules.splice(this.deleteIndex, 1);
                this.deleteIndex = -1;
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
            this.currentSchedule = {
                class1: "",
                class2: "",
                day: "",
                course: "",
                time: "",
                classroom: "",
                admin1: "",
                admin2: ""
            };
            this.isAdding = true;
            document.getElementById('editDialog').showModal();
        }
    }
};
</script>

<style scoped></style>
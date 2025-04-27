<template>
    <div class="container mx-auto p-4">
        <div class="drawer-content h-screen flex flex-col">
            <!-- 导航栏 -->
            <div class="h-[6vh] mb-1 w-full flex flex-row items-center">
                <div class="w-[15dvw] m-2 ml-4" @click="$router.push('/login')">
                    <svg t="1745637780176" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2610" width="32" height="32">
                        <path
                            d="M192.608008 1023.936a192 192 0 0 1-192-192v-640a192 192 0 0 1 192-192h383.296a64 64 0 0 1 0 128H192.608008a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h383.296a64 64 0 0 1 0 128z m544.896-289.6a64 64 0 0 1 0-90.432L805.280008 576H384.352008a64 64 0 1 1 0-128h420.928l-82.688-82.816a64 64 0 0 1 90.368-90.496l192 192a64.576 64.576 0 0 1 13.76 69.824 65.6 65.6 0 0 1-13.76 20.672l-176.896 177.152a64 64 0 0 1-90.368 0z"
                            fill="#8c9eff" p-id="2611"></path>
                    </svg>
                </div>
                <div class="w-full mr-15 flex justify-center text-[#8c9eff] text-2xl">校园考勤网站</div>
            </div>

            <!-- 个人信息卡片 -->
            <div v-if="userInfo && Object.keys(userInfo).length !== 0" class="card bg-base-100 shadow-xl mb-8">
                <div class="card-body">
                    <h1 class="card-title text-2xl font-bold">用户个人信息</h1>
                    <div class="flex flex-col items-center p-4">
                        <!-- 个人照片区域 -->
                        <div class="placeholder">
                            <div class="w-32 rounded-full">
                                <!-- 点击图片触发上传 -->
                                <img :src="profileImage || userInfo[0].img"
                                    alt="Profile Photo" @click="clickUpload" />
                            </div>
                            <label class="btn btn-sm btn-primary mb-4 flex justify-center" for="profile-photo">
                                更换照片
                            </label>
                            <input type="file" id="profile-photo" class="hidden" accept="image/*"
                                @change="handlePhotoUpload" ref="fileInput" />
                        </div>

                        <!-- 个人信息区域 -->
                        <div class="form-control w-full">
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="label">姓名</label>
                                    <input type="text" readonly class="input input-sm input-bordered"
                                        :value="userInfo[0].userName" />
                                </div>
                                <div>
                                    <label class="label">学号</label>
                                    <input type="text" readonly class="input input-sm input-bordered"
                                        :value="userInfo[0].studentId" />
                                </div>
                                <div>
                                    <label class="label">学院</label>
                                    <input type="text" readonly class="input input-sm input-bordered"
                                        :value="userCollege" />
                                </div>
                                <div>
                                    <label class="label">年级</label>
                                    <input type="text" readonly class="input input-sm input-bordered"
                                        :value="userInfo[0].grade" />
                                </div>
                                <div>
                                    <label class="label">班级</label>
                                    <input type="text" readonly class="input input-sm input-bordered"
                                        :value="userInfo[0].userClass" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 成功提示 -->
            <div v-if="uploadSuccess" role="alert"
                class="alert alert-success fixed top-[6vh] left-1/2 -translate-x-1/2 z-50 border-green-500 text-green-700 bg-white p-3">
                <p>上传成功！</p>
            </div>

            <!-- 考勤记录表格 -->
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h1 class="card-title text-2xl font-bold">缺勤与请假记录</h1>

                    <div class="overflow-x-auto">
                        <table class="table w-full">
                            <!-- 表头 -->
                            <thead>
                                <tr>
                                    <th>日期</th>
                                    <th>课程</th>
                                    <th>考勤结果</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- 表格内容 -->
                                <tr v-for="(record, index) in attendanceRecords" :key="index">
                                    <td>{{ record.time }}</td>
                                    <td>{{ record.course }}</td>
                                    <td :class="{
                                        'text-green-600': record.status === '0',
                                        'text-red-600': record.status === '1',
                                        'text-yellow-600': record.status === '2',
                                    }">
                                        {{ record.status }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserClass from '../../utils/UserClass';
export default {
    name: 'StudentProfilePage',
    data() {
        return {
            profileImage: null,
            rawFile: null,          // 原始 File 对象，用于上传
            uploadSuccess: false,
            userInfo: {},
            attendanceRecords: [],
            userCollege: ''
        };
    },
    created() {
        this.getUserInfo();
        this.getRecordInfo();
    },
    methods: {
        // 获取用户信息
        async getUserInfo() {
            const response = await this.$api.user.getUserInfo();
            this.userInfo = response;
            if (this.userInfo[0].college) {
                this.userCollege = UserClass.getCollege(this.userInfo[0].college.toString());
                console.log(this.userCollege);
            }

        },
        // 获取个人考勤结果
        async getRecordInfo() {
            const response = await this.$api.record.getRecordInfo();
            this.attendanceRecords = response;
            this.attendanceRecords.map(record => {
                if (record.status == 0) {
                    record.status = '正常';
                } else if (record.status == 1) {
                    record.status = '缺勤';
                } else if (record.status == 2) {
                    record.status = '请假';
                }
            });
        },
        // 上传照片
        async uploadImg() {
            if (!this.rawFile) return;
            const formData = new FormData();
            formData.append('img', this.rawFile); // 图片文件
            const response = await this.$api.user.uploadImg(formData);
            if (response) {
                this.profileImage = this.convertBufferToDataURL(response[0].img);
                console.log(this.profileImage);
                this.uploadSuccess = true;
                setTimeout(() => {
                    this.uploadSuccess = false;
                }, 3000);
            } else {
                alert('上传失败，请重试');
            }

        },

        // 处理照片上传
        handlePhotoUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.rawFile = file; // 保存原始文件

            const reader = new FileReader();
            reader.onload = (e) => {
                this.profileImage = e.target.result; // 显示用的 base64
                this.uploadImg(); // 上传
            };
            reader.readAsDataURL(file);
        },
        convertBufferToDataURL(buffer) {
            console.log('buffer', buffer);
            // 将Buffer数据转换为Uint8Array
            const uint8Array = new Uint8Array(buffer.data);
            // 将Uint8Array转换为Base64字符串
            const base64String = btoa(String.fromCharCode.apply(null, uint8Array));
            // 设置正确的MIME类型
            const mimeType = 'image/png'; // 根据实际情况设置正确的MIME类型
            return `data:${mimeType};base64,${base64String}`;
        }

    }
};
</script>

<style scoped>
/* 添加自定义样式，根据需要调整 */
</style>
<template>
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">照片上传</h1>
        <form @submit.prevent="submitForm">
            <div class="space-y-6 bg-white p-6 rounded-lg shadow-lg">
                <!-- 学号输入框 -->
                <div>
                    <label for="student-id" class="block text-lg font-medium">学号</label>
                    <div class="mt-1">
                        <input type="text" id="student-id" v-model.number="form.studentId"
                            class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="请输入学号"
                            required />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.studentId">{{ errors.studentId }}
                    </p>
                </div>
                <!-- 姓名输入框 -->
                <div>
                    <label for="name" class="block text-lg font-medium text-gray-700">姓名</label>
                    <div class="mt-1">
                        <input type="text" id="name" v-model="form.name"
                            class="form-input w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="请输入姓名"
                            required />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.name">{{ errors.name }}</p>
                </div>
                <!-- 照片上传区域 -->
                <div>
                    <label class="block text-lg font-medium text-gray-700">上传照片</label>
                    <div
                        class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                        <div class="space-y-1 text-center">
                            <div class="flex text-sm text-gray-600">
                                <label for="file-upload"
                                    class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>上传照片</span>
                                    <input id="file-upload" name="file-upload" type="file" class="sr-only"
                                        accept="image/*" @change="handleFileChange" required />
                                </label>
                                <p class="pl-1">或拖拽文件到此处</p>
                            </div>
                            <p class="text-xs text-gray-500">支持 JPG、PNG 格式，大小不超过2MB</p>
                        </div>
                    </div>
                    <div class="flex justify-center mt-4">
                        <img :src="imageUrl" alt="预览图" class="w-64 h-64 object-cover rounded-lg" v-if="imageUrl" />
                    </div>
                    <p class="mt-2 text-sm text-red-600" v-if="errors.image">{{ errors.image }}</p>
                </div>
                <!-- 提交按钮 -->
                <div class="flex justify-center">
                    <button type="submit" class="btn btn-outline btn-primary btn-wide text-lg">提交</button>
                </div>
            </div>
        </form>
        <!-- 成功提示 -->
        <div v-if="uploadSuccess" role="alert"
            class="alert alert-success fixed top-[6vh] left-1/2 -translate-x-1/2 z-50 border-green-500 text-green-700 bg-white p-3">
            <p>上传成功！</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'uploadPage', // 组件的名称
    components: {}, // 用于注册子组件的地方
    data() {
        return {
            form: {
                studentId: '',
                name: '',
                file: null,
            },
            imageUrl: '',
            uploadSuccess: false,
            errors: {
                studentId: '',
                name: '',
                image: '',
            },
        };
    },
    computed: {}, // 定义计算属性
    created() { }, // 组件的生命周期钩子，创建时调用
    mounted() { }, // 组件的生命周期钩子，挂载时调用
    updated() { }, // 组件的生命周期钩子，更新时调用
    methods: {
        // 处理文件选择
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                // 验证文件类型
                if (!['image/jpeg', 'image/png'].includes(file.type)) {
                    this.errors.image = '只支持 JPG 和 PNG 格式';
                    return;
                }
                // 验证文件大小
                if (file.size > 2 * 1024 * 1024) {
                    this.errors.image = '照片大小不能超过2MB';
                    return;
                }
                this.form.file = file;
                this.imageUrl = URL.createObjectURL(file);
                this.errors.image = '';
            }
        },
        // 提交表单
        submitForm() {
            // 验证表单
            let isValid = true;
            // 验证学号
            if (!this.form.studentId) {
                this.errors.studentId = '学号不能为空';
                isValid = false;
            } else if (!/^\d{8}$/.test(this.form.studentId)) {
                this.errors.studentId = '学号必须为8位数字';
                isValid = false;
            } else {
                this.errors.studentId = '';
            }
            // 验证姓名
            if (!this.form.name) {
                this.errors.name = '姓名不能为空';
                isValid = false;
            } else if (this.form.name.length < 2 || this.form.name.length > 10) {
                this.errors.name = '姓名长度应在2到10个字符之间';
                isValid = false;
            } else {
                this.errors.name = '';
            }
            // 验证照片
            if (!this.form.file) {
                this.errors.image = '请上传照片';
                isValid = false;
            } else {
                this.errors.image = '';
            }
            if (!isValid) {
                return;
            }
            // 提交表单数据
            const formData = new FormData();
            formData.append('studentId', this.form.studentId);
            formData.append('name', this.form.name);
            formData.append('file', this.form.file);
            // 这里可以添加调用后端接口的逻辑
            console.log('表单数据已提交', {
                studentId: this.form.studentId,
                name: this.form.name,
                file: this.form.file.name,
            });
            this.uploadSuccess = true;
            setTimeout(() => {
                this.uploadSuccess = false;
                this.form = {
                    studentId: '',
                    name: '',
                    file: null,
                };
                this.imageUrl = '';
            }, 3000);
        },
    }, // 定义组件的方法
};
</script>
<!-- css样式 -->
<style scoped></style>
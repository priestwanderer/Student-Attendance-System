<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 class="text-2xl font-bold text-center text-[#8c9eff] mb-6">选择考勤班级</h1>
            <div class="space-y-6">
                <!-- 选择按钮 -->
                <div class="grid grid-cols-2 gap-4">
                    <button
                        @click="goRotaOne()"
                        class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {{ class1 }}
                    </button>
                    <button
                        @click="goRotaTwo()"
                        class="flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8c9eff] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {{ class2 }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { arrangementStore } from '@/stores/arrangement';
import kaoqinClass from '@/utils/kaoqinClass';

export default defineComponent({
    name: 'SelectPage',
    setup() {
        const arrangementStore = arrangementStore();
        return { arrangementStore };
    },
    computed: {
        userClass() {
            return this.arrangementStore.userClass;
        },
        arrangementId() {
            return this.arrangementStore.arrangementId;
        },
        class1() {
            if (this.userClass) {
                const classes = this.userClass.split(',');
                if (classes.length >= 1) {
                    const classOneObj = new kaoqinClass(classes[0]);
                    return classOneObj.getClassName();
                }
            }
            return '';
        },
        class2() {
            if (this.userClass) {
                const classes = this.userClass.split(',');
                if (classes.length >= 2) {
                    const classTwoObj = new kaoqinClass(classes[1]);
                    return classTwoObj.getClassName();
                }
            }
            return '';
        }
    },
    methods: {
        goRotaOne() {
            this.$router.push('/arrangement/RotaOne');
        },
        goRotaTwo() {
            this.$router.push('/arrangement/RotaTwo');
        }
    }
});
</script>
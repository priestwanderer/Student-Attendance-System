import { defineStore } from 'pinia';

export const arrangementStore = defineStore('arrangementStore', {
    state: () => ({
        userClass: null,
        arrangementId: null,
        classInfo: null,
        selectedClass: null
    }),
    actions: {
        // 设置考勤班级信息
        setClassInfo(class1, class2) {
            this.classInfo = { class1, class2 };
        },
        // 设置选中的班级
        setSelectedClass(className) {
            this.selectedClass = className;
        },
        // 清除考勤信息
        clearAttendanceInfo() {
            this.userClass = null;
            this.arrangementId = null;
            this.classInfo = null;
            this.selectedClass = null;
        }
    }
});

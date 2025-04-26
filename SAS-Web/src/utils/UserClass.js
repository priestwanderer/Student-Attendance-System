// UserClass 用户班级工具类
class UserClass {
    // 班级编码构成 - 第1-2位年级 第3位校区 第4-5位学院 第6-7位班级
    constructor(classId) {
        this.classId = classId;
        this.grade = this.getGrade(classId);
        this.campus = this.getCampus(classId);
        this.college = this.getCollege(classId);
        this.classNumber = this.getClassNumber(classId);
        this.className = this.getClassName(classId);
    }

    /**
     * 获取班级编码对应的年级
     * @param {string} classId - 班级编码
     * @returns {string} 年级
     */
    getGrade(classId) {
        // 年级编码为班级编码的前两位
        return `20${classId.substring(0, 2)}`;
    }

    /**
     * 获取班级编码对应的校区
     * @param {string} classId - 班级编码
     * @returns {string} 校区
     */
    getCampus(classId) {
        // 校区编码为班级编码的第三位
        const campusMap = {
            1: '湛江校区',
            2: '东莞校区'
        };
        return campusMap[classId.charAt(2)] || '未知校区';
    }

    /**
     * 获取班级编码对应的学院
     * @param {string} classId - 班级编码
     * @returns {string} 学院
     */
    getCollege(classId) {
        // 学院编码为班级编码的第四、五位
        const collegeMap = {
            '01': '第一临床医学院',
            '02': '第二临床医学院',
            '03': '医学技术学院',
            '04': '护理学院',
            '05': '公共卫生学院',
            '06': '药学院',
            '07': '人文与管理学院',
            '08': '基础医学院',
            '09': '生物医学工程学院',
            '11': '外国语学院'
        };
        return collegeMap[classId.substring(3, 5)] || '未知学院';
    }

    /**
     * 获取班级编码对应的班级号
     * @param {string} classId - 班级编码
     * @returns {string} 班级号
     */
    getClassNumber(classId) {
        // 班级号编码为班级编码的第六、七位
        return Number(classId.substring(5, 7));
    }

    /**
     * 获取班级编码对应的班级名称
     * @param {string} classId - 班级编码
     * @returns {string} 班级名称
     */
    getClassName(classId) {
        // 班级名称构成 - xxxx级xx学院xx班
        const grade = this.getGrade(classId);
        const college = this.getCollege(classId);
        const classNumber = this.getClassNumber(classId);
        return `${grade}级${college}${classNumber}班`;
    }
}

module.exports = UserClass;

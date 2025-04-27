// 定义工具类来处理班级编码的逆推
class KaoQinClass {
    // 班级编码构成 - 第1-2位年级 第3位校区 第4-5位学院 第6-7位班级
    constructor(classId) {
        this.classId = classId;
        this.grade = this.getGrade(classId);
        this.campus = this.getCampus(classId);
        this.college = this.getCollege(classId);
        this.classNumber = this.getClassNumber(classId);
        this.className = this.getClassName(classId);
    }

    // 获取班级编码对应的年级
    getGrade(classId) {
        return `20${classId.substring(0, 2)}`;
    }

    // 获取班级编码对应的校区
    getCampus(classId) {
        const campusMap = {
            1: '湛江校区',
            2: '东莞校区'
        };
        return campusMap[classId.charAt(2)] || '未知校区';
    }

    // 获取班级编码对应的学院
    getCollege(classId) {
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

    // 获取班级编码对应的班级号
    getClassNumber(classId) {
        return Number(classId.substring(5, 7));
    }

    // 获取班级编码对应的班级名称
    getClassName(classId) {
        const grade = this.getGrade(classId);
        const college = this.getCollege(classId);
        const classNumber = this.getClassNumber(classId);
        return `${grade}级${college}${classNumber}班`;
    }

    // 解析班级名称并生成班级编码
    parseClassName(className) {
        // 正则表达式匹配班级名称中的关键信息
        const regex = /(\d{4})级(.+?)(\d+)班/;
        const match = className.match(regex);
        if (!match || match.length < 4) {
            throw new Error('班级名称格式不正确');
        }

        // 提取年级、学院、班级号
        const year = match[1];
        const collegeName = match[2];
        const classNumber = match[3];

        // 确定校区（这里假设为湛江校区，可以根据实际情况调整）
        const campusCode = "2"; // 湛江校区

        // 查找学院代码
        const collegeMap = {
            '第一临床医学院': '01',
            '第二临床医学院': '02',
            '医学技术学院': '03',
            '护理学院': '04',
            '公共卫生学院': '05',
            '药学院': '06',
            '人文与管理学院': '07',
            '基础医学院': '08',
            '生物医学工程学院': '09',
            '外国语学院': '11'
        };
        const collegeCode = collegeMap[collegeName];

        // 年级的后两位
        const yearCode = year.substring(2, 4);

        // 班级号，确保为两位数
        const classCode = classNumber.padStart(2, '0');

        // 组合班级编码
        const classId = `${yearCode}${collegeCode}${classCode}`;

        return classId;
    }
}

export default KaoQinClass;

// // 测试逆推逻辑
// const kaoQinClass = new KaoQinClass('2420901');
// console.log(kaoQinClass.parseClassName('2024级生物医学工程学院1班')); // 应该输出 '2420901'
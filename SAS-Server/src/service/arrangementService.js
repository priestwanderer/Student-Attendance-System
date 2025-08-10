const arrangementDao = require('../dao/arrangementDao');

// 获取所有考勤安排
exports.getArrangementList = async () => {
    const arrangementList = await arrangementDao.getArrangementList();
    return arrangementList;
};

// 获取单周考勤安排
exports.getArrangement = async (whichWeek) => {
    const arrangementInfo = await arrangementDao.getArrangement(whichWeek);
    return arrangementInfo[0];
};

// 新增考勤安排
exports.addArrangement = async (userClass, course, time, whichCourse, classroom, adminOne, adminTwo) => {
    const result = await arrangementDao.addArrangement(userClass, course, time, whichCourse, classroom, adminOne, adminTwo);
    return result;
};

// 更新考勤安排
exports.updateArrangement = async (arrangementId, userClass, course, time, whichCourse, classroom, adminOne, adminTwo) => {
    const result = await arrangementDao.updateArrangement(arrangementId, userClass, course, time, whichCourse, classroom, adminOne, adminTwo);
    return result;
};

// 删除考勤安排
exports.deleteArrangement = async (arrangementId) => {
    const result = await arrangementDao.deleteArrangement(arrangementId);
    return result;
};

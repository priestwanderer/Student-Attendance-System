const recordDao = require('../dao/recordDao');

// 获取考勤记录列表
exports.getRecordList = async () => {
    const recordList = await recordDao.getRecordList();
    return recordList;
};

// 获取单条考勤记录
exports.getRecordInfo = async (studentId) => {
    const recordInfo = await recordDao.getRecordInfo(studentId);
    return recordInfo[0];
};

// 新增考勤记录
exports.addRecord = async (arrangementId, data) => {
    const result = await recordDao.addRecord(arrangementId, data);
    return result;
};

// 更新考勤记录
exports.updateRecord = async (recordId, status) => {
    const result = await recordDao.updateRecord(recordId, status);
    return result;
};

// 删除考勤记录
exports.deleteRecord = async (recordId) => {
    const result = await recordDao.deleteRecord(recordId);
    return result;
};

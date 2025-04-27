const recordDao = require('../dao/recordDao');

exports.getRecordList = async () => {
    const recordList = await recordDao.getRecordList();
    return recordList;
};

exports.getRecordInfo = async (studentId) => {
    const recordInfo = await recordDao.getRecordInfo(studentId);
    return recordInfo;
};

exports.addRecord = async (arrangementId, data) => {
    const result = await recordDao.addRecord(arrangementId, data);
    return result;
};

exports.updateRecord = async (recordId, status) => {
    const result = await recordDao.updateRecord(recordId, status);
    return result;
};

exports.deleteRecord = async (recordId) => {
    const result = await recordDao.deleteRecord(recordId);
    return result;
};

import request from '../utils/request';

const moduleUrl = '/record';

const record = {
    // 获取考勤记录列表
    getRecordList(data) {
        return request.get(`${moduleUrl}/getRecordList`, data);
    },
    // 获取考勤记录详细信息
    getRecordInfo(data){
        return request.get(`${moduleUrl}/getRecordInfo`, data);
    },
    // 新增考勤记录
    addRecord(data) {
        return request.post(`${moduleUrl}/addRecord`, data);
    },
    // 修改考勤记录
    updateRecord(data) {
        return request.put(`${moduleUrl}/updateRecord`, data);
    },
    // 删除考勤记录
    deleteRecord(data) {
        return request.put(`${moduleUrl}/deleteRecord`, data);
    }
};

export default record;
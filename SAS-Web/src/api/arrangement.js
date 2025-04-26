import request from '../utils/request';

const moduleUrl = '/arrangement';

const arrangement = {
    // 获取所有考勤安排
    getArrangementList(data) {
        return request.get(`${moduleUrl}/getArrangementList`, data);
    },
    // 获取单周考勤安排
    getArrangement(data){
        return request.get(`${moduleUrl}/getArrangement`, data);
    },
    // 新增考勤安排
    addArrangement(data) {
        return request.post(`${moduleUrl}/addArrangement`, data);
    },
    // 修改考勤安排
    updateArrangement(data) {
        return request.put(`${moduleUrl}/updateArrangement`, data);
    },
    // 删除考勤安排
    deleteArrangement(data) {
        return request.put(`${moduleUrl}/deleteArrangement`, data);
    }
};

export default arrangement;
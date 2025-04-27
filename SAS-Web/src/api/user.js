import request from '../utils/request';

const moduleUrl = '/user';

const user = {
    // 获取用户列表
    getUserList(data) {
        return request.get(`${moduleUrl}/getUserList`, data);
    },
    // 获取用户详细信息
    getUserInfo(data){
        return request.get(`${moduleUrl}/getUserInfo`, data);
    },
    // 新增用户信息
    addUser(data) {
        return request.post(`${moduleUrl}/addUser`, data);
    },
    // 修改用户信息
    updateUser(data) {
        return request.put(`${moduleUrl}/updateUser`, data);
    },
    //上传用户照片
    uploadImg(data) {
        return request.upload(`${moduleUrl}/uploadImg`, data);
    },
    // 删除用户信息
    deleteUser(data) {
        return request.put(`${moduleUrl}/deleteUser`, data);
    }
};

export default user;



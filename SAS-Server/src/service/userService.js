const userDao = require('../dao/userDao');

exports.getUserList = async () => {
    const userList = await userDao.getUserList();
    return userList;
};

exports.getUserInfo = async (studentId) => {
    const userInfo = await userDao.getUserInfo(studentId);
    return userInfo;
};

exports.addUser = async (studentId, userName, college, grade, major, userClass) => {
    const result = await userDao.addUser(studentId, userName, college, grade, major, userClass);
    return result;
};

exports.updateUser = async (studentId, userName, college, grade, major, userClass) => {
    const result = await userDao.updateUser(studentId, userName, college, grade, major, userClass);
    return result;
};

exports.uploadImg = async (img, studentId) => {
    // 参数验证
    if (!img) {
        throw new Error('图片数据不能为空');
    }
    if (!studentId) {
        throw new Error('学生ID不能为空');
    }
    try {
        // 调用DAO层上传图片
        const result = await userDao.uploadImg(img, studentId);
        // 验证返回结果
        if (!result || result.length === 0) {
            throw new Error('图片上传失败，未能获取上传结果');
        }
        return result;
    } catch (error) {
        // 记录错误日志
        console.error(`图片上传服务错误: ${error.message}`);
        // 重新抛出错误，让控制器处理
        throw error;
    }
};

exports.deleteUser = async (studentId) => {
    const result = await userDao.deleteUser(studentId);
    return result;
};

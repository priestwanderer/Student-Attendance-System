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

exports.deleteUser = async (studentId) => {
    const result = await userDao.deleteUser(studentId);
    return result;
};

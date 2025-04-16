const userDao = require('../dao/userDao');

exports.getHistoryList = async (userId) => {
    const historyList = await userDao.getHistoryList(userId);
    return historyList;
};

exports.getUserInfo = async (userId) => {
    const userInfo = await userDao.getUserInfo(userId);
    return userInfo;
};

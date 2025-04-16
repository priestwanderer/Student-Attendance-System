const sessionDao = require('../dao/sessionDao');

//保存会话
exports.saveSession = async (userId, title, history) => {
    return await sessionDao.saveSession(userId, title, history);
};
//获取历史会话
exports.getHistory = async (userId) => {
    return await sessionDao.getHistory(userId);
};
//获取详细记录
exports.getSessionDetail = async (sessionId) => {
    return await sessionDao.getSessionDetail(sessionId);
};
//是否存在会话
exports.hasSession = async (sessionId) => {
    return await sessionDao.hasSession(sessionId);
};
//更新会话
exports.updateSession = async (sessionId, history) => {
    return await sessionDao.updateSession(sessionId, history);
};

const db = require('../utils/dbConnPool/db');
const { uuidv7 } = require('uuidv7');
//保存会话信息
exports.saveSession = async (userId, title, history) => {
    const sessionId = uuidv7();
    const sql = `
    INSERT INTO 
        session 
            (id,user_id,title,content,create_time,update_time) 
        VALUES 
            (?,?,?,?,datetime('now', 'localtime'),datetime('now', 'localtime'))
    `;
    const values = [sessionId, userId, title, JSON.stringify(history)];
    await db.query(sql, values);
    return true;
};
//获取会话信息
exports.getHistory = async (userId) => {
    const sql = `
    SELECT 
        id AS sessionId,
        title,
        update_time AS updateTime
    FROM
        session
    WHERE user_id=? AND content IS NOT NULL
    ORDER
        BY update_time DESC
    `;
    const values = [userId];
    const result = await db.query(sql, values);
    return result;
};
//是否存在会话
exports.hasSession = async (sessionId) => {
    const sql = `
    SELECT 
        COUNT(*) AS count
    FROM
        session
    WHERE id= ? AND is_delete = 0 `;
    const values = [sessionId];
    const result = await db.query(sql, values);
    return result[0].count;
};
//获取详细记录
exports.getSessionDetail = async (sessionId) => {
    const sql = `
    SELECT 
        id AS sessionId,
        content AS history
    FROM
        session
    WHERE id=? `;
    const values = [sessionId];
    const result = await db.query(sql, values);
    return result[0];
};
//更新会话
exports.updateSession = async (sessionId, history) => {
    const sql = `
    UPDATE 
        session 
    SET 
        content = ?,
        update_time = datetime('now', 'localtime')
    WHERE 
        id = ?
    `;
    const values = [JSON.stringify(history), sessionId];
    await db.query(sql, values);
    return true;
};

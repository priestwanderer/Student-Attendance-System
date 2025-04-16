const db = require('../utils/dbConnPool/db');

exports.getHistoryList = async (userId) => {
    const sql = `
        SELECT
            id AS sessionId,
            created_time AS createdTime
        FROM
            session
        WHERE
            user_id = ? AND is_delete = 0
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

exports.getUserInfo = async (userId) => {
    const sql = `
        SELECT
            id AS userId,
            name AS userName
        FROM
            user
        WHERE
            id = ?
    `;
    const sqlParams = [userId];
    return await db.query(sql, sqlParams);
};

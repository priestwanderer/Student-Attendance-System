const db = require('../utils/dbConnPool/db');
const { uuidv7 } = require('uuidv7');

// 用户注册
exports.register = async (studentId, name, passwordHash) => {
    const id = uuidv7();
    const sql = `
        INSERT INTO
            user (id, student_id, name,password_hash,created_time)
        VALUES
            (?, ?, ?,?,datetime('now'))
    `;
    const sqlParams = [id, studentId, name, passwordHash];
    const result = await db.query(sql, sqlParams);
    return result;
};

// 用户登录
exports.login = async (studentId) => {
    const sql = `SELECT id AS userId,student_id AS studentId, name AS userName, password_hash AS passwordHash FROM user WHERE student_id = ?`;
    const sqlParams = [studentId];
    return await db.query(sql, sqlParams);
};

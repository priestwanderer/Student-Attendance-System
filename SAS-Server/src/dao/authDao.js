const e = require('express');
const db = require('../utils/dbConnPool/db');
const { uuidv7 } = require('uuidv7');

// 用户注册
exports.register = async (studentId, userName, passwordHash) => {
    const id = uuidv7();
    const sql = `
        INSERT INTO
            user (id, student_id, userName,password_hash,created_time)
        VALUES
            (?, ?, ?,?,datetime('now'))
    `;
    const sqlParams = [id, studentId, userName, passwordHash];
    const result = await db.query(sql, sqlParams);
    return result;
};

// 用户登录
exports.login = async (studentId) => {
    const sql = `
        SELECT
            student_id AS studentId,
            name AS userName,
            is_admin AS isAdmin
        FROM
            admin
        WHERE
            student_id = ? AND valid_flag = 1
    `;
    const sqlParams = [studentId];
    const user = await db.query(sql, sqlParams);
    if (user.length === 0) {
        const sql = `
            SELECT
                student_id AS studentId,
                name AS userName
            FROM
                user
            WHERE
                student_id = ? AND valid_flag = 1
        `;
        const sqlParams = [studentId];
        const user = await db.query(sql, sqlParams);
        console.log('user:', user);
        return user;
    } else {
        return user;
    }
};

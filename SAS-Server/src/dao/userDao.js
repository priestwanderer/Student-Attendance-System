const db = require(`../utils/dbConnPool/db`);
const { uuidv7 } = require('uuidv7');

// 获取所有student列表
exports.getUserList = async () => {
    const sql = `
        SELECT
            id AS userId,
            student_id AS studentId,
            name AS userName,
            college AS college,
            grade AS grade,
            major AS major,
            class AS userClass
        FROM
            user
    `;
    return await db.query(sql);
};

// 获取单个student信息
exports.getUserInfo = async (studentId) => {
    const sql = `
        SELECT
            id AS userId,
            student_id AS studentId,
            name AS userName,
            college AS college,
            grade AS grade,
            major AS major,
            class AS userClass
        FROM
            user
        WHERE
            student_id = ?
    `;
    const sqlParams = [studentId];
    return await db.query(sql, sqlParams);
};

// 新增student
exports.addUser = async (studentId, userName, college, grade, major, userClass) => {
    const sql = `
        INSERT INTO user
        (student_id, name, college, grade, major, class, created_at)
        VALUES (?, ?, ?, ?, ?, ?, now())
    `;
    const sqlParams = [studentId, userName, college, grade, major, userClass];
    return await db.query(sql, sqlParams);
};

// 修改student
exports.updateUser = async (studentId, userName, college, grade, major, userClass) => {
    const sql = `
        UPDATE user
        SET name = ?, college = ?, grade = ?, major = ?, class = ?
        WHERE student_id = ?
    `;
    const sqlParams = [userName, college, grade, major, userClass, studentId];
    return await db.query(sql, sqlParams);
};

// 删除student
exports.deleteUser = async (studentId) => {
    const sql = `
        UPDATE user
        SET valid_flag = 0
        WHERE student_id = ?
    `;
    const sqlParams = [studentId];
    return await db.query(sql, sqlParams);
};

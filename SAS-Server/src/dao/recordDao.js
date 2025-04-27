const db = require(`../utils/dbConnPool/db`);
const { uuidv7 } = require('uuidv7');

// 获取考勤记录列表
exports.getRecordList = async () => {
    const sql = `
        SELECT
            record.id AS recordId,
            record.status AS status,
            user.student_id AS studentId,
            user.name AS userName,
            user.college AS college,
            user.grade AS grade,
            user.major AS major,
            user.class AS userClass,
            arrangement.id AS arrangementId,
            arrangement.course AS course,
            arrangement.time AS time
        FROM
            record
        INNER JOIN
            user ON record.user_id = user.student_id
        INNER JOIN
            arrangement ON record.arrangement_id = arrangement.id
        WHERE
            record.valid_flag = 1
            AND user.valid_flag = 1
            AND arrangement.valid_flag = 1
    `;
    return await db.query(sql);
};

// 获取单条考勤记录
exports.getRecordInfo = async (studentId) => {
    const sql = `
        SELECT
            record.id AS recordId,
            user.student_id AS studentId,
            user.name AS userName,
            user.college AS college,
            user.grade AS grade,
            user.major AS major,
            user.class AS userClass,
            arrangement.id AS arrangementId,
            arrangement.course AS course,
            record.status AS status,
            arrangement.time AS time
        FROM
            record
        INNER JOIN
            user ON record.user_id = user.student_id
        INNER JOIN
            arrangement ON record.arrangement_id = arrangement.id
        WHERE
            user.student_id = ?
    `;
    const sqlParams = [studentId];
    return await db.query(sql, sqlParams);
};

// 新增考勤记录
exports.addRecord = async (arrangementId, data) => {
    data.forEach(async (item) => {
        const sql = `
        INSERT INTO 
            record
        (arrangement_id, id, user_id, status, created_at)
        VALUES (?, ?, ?, ?, NOW())
    `;
        const sqlParams = [arrangementId, uuidv7(), item.studentId, item.status];
        await db.query(sql, sqlParams);
    });
    return true;
};

// 修改考勤记录
exports.updateRecord = async (recordId, status) => {
    const sql = `
        UPDATE 
            record
        SET 
            status = ?
        WHERE 
            id = ?
    `;
    const sqlParams = [status, recordId];
    return await db.query(sql, sqlParams);
};

// 删除考勤记录
exports.deleteRecord = async (recordId) => {
    const sql = `
        UPDATE 
            record
        SET 
            valid_flag = 0
        WHERE 
            id = ?
    `;
    const sqlParams = [recordId];
    return await db.query(sql, sqlParams);
};

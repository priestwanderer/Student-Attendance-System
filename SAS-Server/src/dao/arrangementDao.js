const db = require(`../utils/dbConnPool/db`);
const { uuidv7 } = require('uuidv7');

// 获取所有考勤安排
exports.getArrangementList = async () => {
    const sql = `
        SELECT
            arrangement.id AS arrangementId,
            arrangement.class AS userClass,
            arrangement.course AS course,
            arrangement.time AS time,
            a.name AS adminOne,
            b.name AS adminTwo,
            arrangement.which_course AS whichCourse,
            arrangement.classroom AS classroom,
            school_calendar.academic_year AS academicYear,
            school_calendar.semester AS semester,
            school_calendar.which_week AS whichWeek,
            school_calendar.which_day AS whichDay,
            school_calendar.day_type AS dayType
        FROM
            arrangement
        INNER JOIN
            school_calendar ON arrangement.time = school_calendar.date
        INNER JOIN
            admin a ON arrangement.adminOne = a.student_id
        INNER JOIN
            admin b ON arrangement.adminTwo = b.student_id
        WHERE
            arrangement.valid_flag = 1
    `;
    return await db.query(sql);
};

// 获取单周考勤安排
exports.getArrangement = async (whichWeek) => {
    const sql = `
    SELECT
        arrangement.id AS arrangementId,
        arrangement.class AS userClass,
        arrangement.course AS course,
        arrangement.time AS time,
        a.name AS adminOne,
        b.name AS adminTwo,
        arrangement.which_course AS whichCourse,
        arrangement.classroom AS classroom,
        school_calendar.academic_year AS academicYear,
        school_calendar.semester AS semester,
        school_calendar.which_week AS whichWeek,
        school_calendar.which_day AS whichDay,
        school_calendar.day_type AS dayType
    FROM
        arrangement
    INNER JOIN
        school_calendar ON arrangement.time = school_calendar.date
    INNER JOIN
        admin a ON arrangement.adminOne = a.student_id
    INNER JOIN
        admin b ON arrangement.adminTwo = b.student_id
    WHERE
        school_calendar.which_week = ?
    `;
    const sqlParams = [whichWeek];
    return await db.query(sql, sqlParams);
};

// 新增考勤安排
exports.addArrangement = async (userClass, course, time, whichCourse, classroom, adminOne, adminTwo) => {
    const sql = `
        INSERT INTO arrangement (id, class, course, time, which_course, classroom, adminOne, adminTwo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const sqlParams = [uuidv7(), userClass, course, time, whichCourse, classroom, adminOne, adminTwo];
    return await db.query(sql, sqlParams);
};

// 修改考勤安排
exports.updateArrangement = async (arrangementId, userClass, course, time, whichCourse, classroom) => {
    const sql = `
        UPDATE 
            arrangement
        SET 
            class = ?, 
            course = ?, 
            time = ?, 
            which_course = ?, 
            classroom = ?
        WHERE 
            id = ?
    `;
    const sqlParams = [userClass, course, time, whichCourse, classroom, arrangementId];
    return await db.query(sql, sqlParams);
};

// 删除考勤安排
exports.deleteArrangement = async (arrangementId) => {
    const sql = `
        UPDATE 
            arrangement
        SET 
            valid_flag = 0
        WHERE 
            id = ?
    `;
    const sqlParams = [arrangementId];
    return await db.query(sql, sqlParams);
};

const router = require('express').Router();
module.exports = router;

const arrangementService = require('../service/arrangementService');

/**
 * 获取所有考勤安排
 * @name getArrangementList 获取所有考勤安排
 * @description GET /api/arrangement/getArrangementList
 * @response {Array<Object>} getArrangementList - 考勤安排列表
 * @response {string} getArrangementList[].arrangementId - 考勤安排ID
 * @response {string} getArrangementList[].userClass - 班级
 * @response {string} getArrangementList[].course - 课程名称
 * @response {string} getArrangementList[].time - 考勤安排时间
 * @response {string} getArrangementList[].adminOne - 管理员1
 * @response {string} getArrangementList[].adminTwo - 管理员2
 * @response {string} getArrangementList[].whichCourse - 哪节课下课
 * @response {string} getArrangementList[].classroom - 教室
 * @response {string} getArrangementList[].academicYear - 学年
 * @response {string} getArrangementList[].semester - 学期
 * @response {string} getArrangementList[].whichWeek - 第几周
 * @response {string} getArrangementList[].whichDay - 星期几
 * @response {string} getArrangementList[].dayType - 日子类型
 */
router.get('/getArrangementList', async (req, res, next) => {
    const result = await arrangementService.getArrangementList();
    res.ResultVO(0, '成功', result);
});

/**
 * 获取单周考勤安排
 * @name getArrangement 获取单周考勤安排
 * @description GET /api/arrangement/getArrangement
 * @query {string} whichWeek - 第几周
 * @response {Object} getArrangement - 考勤安排列表
 * @response {string} getArrangement.arrangementId - 考勤安排ID
 * @response {string} getArrangement.userClass - 班级
 * @response {string} getArrangement.course - 课程名称
 * @response {string} getArrangement.time - 考勤安排时间
 * @response {string} getArrangement.adminOne - 管理员1
 * @response {string} getArrangement.adminTwo - 管理员2
 * @response {string} getArrangement.whichCourse - 哪节课下课
 * @response {string} getArrangement.classroom - 教室
 * @response {string} getArrangement.academicYear - 学年
 * @response {string} getArrangement.semester - 学期
 * @response {string} getArrangement.whichWeek - 第几周
 * @response {string} getArrangement.whichDay - 星期几
 * @response {string} getArrangement.dayType - 日子类型
 */
router.get('/getArrangement', async (req, res, next) => {
    const { whichWeek } = req.query;
    const result = await arrangementService.getArrangement(whichWeek);
    res.ResultVO(0, '成功', result);
});

/**
 * 新增考勤安排
 * @name addArrangement
 * @description 新增考勤安排
 * @body {string} userClass - 班级
 * @body {string} course - 课程名称
 * @body {string} time - 考勤安排时间
 * @body {string} whichCourse - 哪节课下课
 * @body {string} classroom - 教室
 * @body {string} adminOne - 管理员1
 * @body {string} adminTwo - 管理员2
 * @response {Object} result - 新增的考勤安排
 */
router.post('/addArrangement', async (req, res, next) => {
    const { userClass, course, time, whichCourse, classroom, adminOne, adminTwo } = req.body;
    const result = await arrangementService.addArrangement(userClass, course, time, whichCourse, classroom, adminOne, adminTwo);
    res.ResultVO(0, '成功', result);
});

/**
 * 更新考勤安排
 * @name updateArrangement 更新考勤安排
 * @description 更新考勤安排
 * @body {string} arrangementId - 考勤安排ID
 * @body {string} userClass - 班级
 * @body {string} course - 课程名称
 * @body {string} time - 考勤安排时间
 * @body {string} whichCourse - 哪节课下课
 * @body {string} classroom - 教室
 * @body {string} adminOne - 管理员1
 * @body {string} adminTwo - 管理员2
 * @response {Object} result - 更新后的考勤安排
 */
router.put('/updateArrangement', async (req, res, next) => {
    const { arrangementId, userClass, course, time, whichCourse, classroom, adminOne, adminTwo } = req.body;
    const result = await arrangementService.updateArrangement(arrangementId, userClass, course, time, whichCourse, classroom, adminOne, adminTwo);
    res.ResultVO(0, '成功', result);
});

/**
 * 删除考勤安排
 * @name deleteArrangement 删除考勤安排
 * @description 删除考勤安排
 * @body {string} arrangementId - 考勤安排ID
 * @response {Object} result - 删除结果
 */
router.put('/deleteArrangement', async (req, res, next) => {
    const { arrangementId } = req.body;
    const result = await arrangementService.deleteArrangement(arrangementId);
    res.ResultVO(0, '成功', result);
});

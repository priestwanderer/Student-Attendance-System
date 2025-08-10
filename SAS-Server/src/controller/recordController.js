const router = require('express').Router();
module.exports = router;

const recordService = require('../service/recordService');

/**
 * 获取所有考勤记录
 * @name getRecordList 获取所有考勤记录
 * @description GET /api/record/getRecordList
 * @response {Array<Object>} getRecordList - 考勤记录列表
 * @response {string} getRecordList[].recordId - 考勤记录ID
 * @response {string} getRecordList[].status - 考勤状态
 * @response {string} getRecordList[].studentId - 学号
 * @response {string} getRecordList[].userName - 姓名
 * @response {string} getRecordList[].college - 学院
 * @response {string} getRecordList[].grade - 年级
 * @response {string} getRecordList[].major - 专业
 * @response {string} getRecordList[].userClass - 班级
 * @response {string} getRecordList[].arrangementId - 课程安排ID
 * @response {string} getRecordList[].course - 课程名称
 * @response {string} getRecordList[].time - 上课时间
 */
router.get('/getRecordList', async (req, res, next) => {
    const result = await recordService.getRecordList();
    res.ResultVO(0, '成功', result);
});

/**
 * 获取单次班级考勤记录
 * @name getClassRecordInfo
 * @description GET /api/record/getClassRecordInfo
 * @query {string} arrangementId - 课程安排ID
 * @response {Object} getClassRecordInfo - 考勤记录
 */

/**
 * 获取单条考勤记录
 * @name getRecordInfo
 * @description GET /api/record/getRecordInfo
 * @param {string} studentId - 学号
 * @param {string} userName - 姓名
 * @response {Object} getRecordInfo - 考勤记录
 * @response {string} getRecordInfo.recordId - 考勤记录ID
 * @response {string} getRecordInfo.status - 考勤状态
 * @response {string} getRecordInfo.college - 学院
 * @response {string} getRecordInfo.grade - 年级
 * @response {string} getRecordInfo.major - 专业
 * @response {string} getRecordInfo.userClass - 班级
 * @response {string} getRecordInfo.arrangementId - 课程安排ID
 * @response {string} getRecordInfo.course - 课程名称
 * @response {string} getRecordInfo.time - 考勤时间
 */
router.get('/getRecordInfo', async (req, res, next) => {
    const { studentId } = req.payload;
    const result = await recordService.getRecordInfo(studentId);
    res.ResultVO(0, '成功', result);
});

/**
 * 新增考勤记录
 * @name addRecord
 * @description 新增考勤记录
 * @body {string} arrangementId - 课程安排ID
 * @body {Object} data - 考勤记录数据
 * @body {string} data.studentId - 学号
 * @body {string} data.status - 考勤状态
 * @response {Object} result - 新增的考勤记录
 */
router.post('/addRecord', async (req, res, next) => {
    const { arrangementId, data } = req.body;
    const result = await recordService.addRecord(arrangementId, data);
    res.ResultVO(0, '成功', result);
});

/**
 * 更新考勤记录
 * @name updateRecord
 * @description 更新考勤记录
 * @body {string} status - 考勤状态
 * @response {Object} result - 更新后的考勤记录
 */
router.put('/updateRecord', async (req, res, next) => {
    const { recordId, status } = req.body;
    const result = await recordService.updateRecord(recordId, status);
    res.ResultVO(0, '成功', result);
});

/**
 * 删除考勤记录
 * @name deleteRecord
 * @description 删除考勤记录
 * @query {string} recordId - 考勤记录ID
 * @response {Object} result - 删除结果
 */
router.put('/deleteRecord', async (req, res, next) => {
    const { recordId } = req.body;
    const result = await recordService.deleteRecord(recordId);
    res.ResultVO(0, '成功', result);
});

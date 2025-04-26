const router = require('express').Router();
module.exports = router;

const recordService = require('../service/recordService');

router.get('/getRecordList', async (req, res, next) => {
    const result = await recordService.getRecordList();
    res.ResultVO(0, '成功', result);
});

router.get('/getRecordInfo', async (req, res, next) => {
    const { studentId } = req.query;
    const result = await recordService.getRecordInfo(studentId);
    res.ResultVO(0, '成功', result);
});

router.post('/addRecord', async (req, res, next) => {
    const { arrangementId, studentId, status, time } = req.body;
    const result = await recordService.addRecord(arrangementId, studentId, status, time);
    res.ResultVO(0, '成功', result);
});

router.put('/updateRecord', async (req, res, next) => {
    const { recordId, status } = req.body;
    const result = await recordService.updateRecord(recordId, status);
    res.ResultVO(0, '成功', result);
});

router.put('/deleteRecord', async (req, res, next) => {
    const { recordId } = req.body;
    const result = await recordService.deleteRecord(recordId);
    res.ResultVO(0, '成功', result);
});

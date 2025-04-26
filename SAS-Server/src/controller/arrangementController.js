const router = require('express').Router();
module.exports = router;

const arrangementService = require('../service/arrangementService');

router.get('/getArrangementList', async (req, res, next) => {
    const result = await arrangementService.getArrangementList();
    res.ResultVO(0, '成功', result);
});

router.get('/getArrangement', async (req, res, next) => {
    const { whichWeek } = req.query;
    const result = await arrangementService.getArrangement(whichWeek);
    res.ResultVO(0, '成功', result);
});

router.post('/addArrangement', async (req, res, next) => {
    const { userClass, course, time, whichCourse, classroom, adminOne, adminTwo } = req.body;
    const result = await arrangementService.addArrangement(userClass, course, time, whichCourse, classroom, adminOne, adminTwo);
    res.ResultVO(0, '成功', result);
});

router.put('/updateArrangement', async (req, res, next) => {
    const { arrangementId, userClass, course, time, whichCourse, classroom, adminOne, adminTwo } = req.body;
    const result = await arrangementService.updateArrangement(arrangementId, userClass, course, time, whichCourse, classroom, adminOne, adminTwo);
    res.ResultVO(0, '成功', result);
});

router.put('/deleteArrangement', async (req, res, next) => {
    const { arrangementId } = req.body;
    const result = await arrangementService.deleteArrangement(arrangementId);
    res.ResultVO(0, '成功', result);
});

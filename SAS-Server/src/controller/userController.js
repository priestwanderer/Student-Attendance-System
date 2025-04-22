const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');

router.get('/getUserList', async (req, res, next) => {
    const result = await userService.getUserList();
    res.ResultVO(0, '成功', result);
});

router.get('/getUserInfo', async (req, res, next) => {
    const { studentId } = req.query;
    const result = await userService.getUserInfo(studentId);
    res.ResultVO(0, '成功', result);
});

router.post('/addUser', async (req, res, next) => {
    const { studentId, userName, college, grade, major, userClass } = req.body;
    const result = await userService.addUser(studentId, userName, college, grade, major, userClass);
    res.ResultVO(0, '成功', result);
});

router.put('/updateUser', async (req, res, next) => {
    const { studentId, userName, college, grade, major, userClass } = req.body;
    const result = await userService.updateUser(studentId, userName, college, grade, major, userClass);
    res.ResultVO(0, '成功', result);
});

router.put('/deleteUser', async (req, res, next) => {
    const { studentId } = req.body;
    const result = await userService.deleteUser(studentId);
    res.ResultVO(0, '成功', result);
});

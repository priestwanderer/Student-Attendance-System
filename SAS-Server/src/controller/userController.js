const router = require('express').Router();
module.exports = router;

const userService = require('../service/userService');
//获取历史列表
router.get('/getHistoryList', async (req, res, next) => {
    const userId = req.query.userId;
    const result = await userService.getHistoryList(userId);
    res.ResultVO(0, '成功', result);
});

//获取详细信息

router.get('/getUserInfo', async (req, res, next) => {
    const { userId } = req.query;
    const result = await userService.getUserInfo(userId);
    res.ResultVO(0, '成功', result);
});

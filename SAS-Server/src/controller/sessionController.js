const router = require('express').Router();
const { uuidv7 } = require('uuidv7');
module.exports = router;

const sessionService = require('../service/sessionService');
/**
 * @name newSession 创建新会话
 * @description POST /session/newSession
 * @response {string} sessionId 会话ID
 */
router.post('/newSession', async (req, res) => {
    const userId = req.payload.userId;
    if (!userId) {
        res.ResultVO(1, '不存在');
        return;
    }
    const sessionId = uuidv7();
    res.ResultVO(0, '成功', sessionId);
});
/**
 * @name saveSession 保存会话
 * @description POST /session/saveSession
 * @response {boolean} success 是否成功
 */
router.post('/saveSession', async (req, res) => {
    const { sessionId, title, history } = req.body;
    const userId = req.payload.userId;
    if (!sessionId || !history || !title) {
        res.ResultVO(1, '参数错误');
        return;
    }
    const session = await sessionService.hasSession(sessionId);
    if (session) {
        const success = await sessionService.updateSession(sessionId, history);
        console.log(success);
        res.ResultVO(0, '成功', success);
        return;
    }
    const success = await sessionService.saveSession(userId, title, history);
    res.ResultVO(0, '成功', success);
});
/**
 * @name getHistory 获取历史记录
 * @description GET /session/getHistory
 * @response {object} history 历史记录
 */
router.get('/getHistory', async (req, res) => {
    const userId = req.payload.userId;
    const history = await sessionService.getHistory(userId);
    res.ResultVO(0, '成功', history);
});
/**
 * @name getSessionDetail 获取详细记录
 * @description GET /session/getSessionDetail
 * @response {object} session 详细记录
 */
router.get('/getSessionDetail', async (req, res) => {
    const { sessionId } = req.query;
    if (!sessionId) {
        res.ResultVO(1, '参数错误');
        return;
    }
    const session = await sessionService.getSessionDetail(sessionId);
    res.ResultVO(0, '成功', session);
});

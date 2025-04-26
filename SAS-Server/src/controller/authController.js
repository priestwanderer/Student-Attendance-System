const router = require('express').Router();
module.exports = router;

const authService = require('../service/authService');

/**
 * @name login 学生登录
 * @description POST /auth/login
 * @body {string} studentId 用户ID
 * @body {string}  userName 用户名称
 * @response {string} token 登录凭证
 */
router.post('/login', async (req, res, next) => {
    const { studentId, userName } = req.body;
    const token = await authService.login(studentId, userName);
    if (token) {
        res.ResultVO(0, '登录成功', token);
    } else {
        res.ResultVO(1, '登录失败');
    }
});

/**
 * @name register 学生注册
 * @description POST /auth/register
 * @body {string} name 学生姓名
 * @body {string} studentId 学生学号
 * @body {blob} img 学生照片
 * @body {string} college 学院
 * @body {string} major 专业
 * @body {string} classId 班级
 * @body {string} grade 年级
 * @body {string} password 用户密码
 * @response {string} token 登录凭证
 */
router.post('/register', async (req, res, next) => {
    const { name, studentId, img, college, major, classId, grade, password } = req.body;
    const token = await authService.register(name, studentId, img, college, major, classId, grade, password);
    if (token) {
        res.ResultVO(0, '注册成功', token);
    } else {
        res.ResultVO(1, '注册失败');
    }
});

/**
 * @name tokenVerify 凭证校验
 * @description POST /auth/tokenVerify
 * @header {string} Authorization 用户凭证
 * @response {Object} payload 凭证负载
 * @response {string} payload.studentId 用户ID
 * @response {string} payload.name 用户名称
 */
router.post('/tokenVerify', async (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const payload = await authService.tokenVerify(token);
    if (payload) {
        res.ResultVO(0, '凭证有效', payload);
    } else {
        res.ResultVO(1, '凭证无效');
    }
});

const router = require('express').Router();
const multer = require('multer');
const path = require('path');
module.exports = router;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 图片存储路径
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage });

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

router.put('/uploadImg', upload.single('img'), async (req, res, next) => {
    const studentId = req.body.studentId;
    const filePath = req.file ? req.file.path : null;

    if (!studentId || !filePath) {
        return res.status(400).json({ code: 1, msg: '参数不完整' });
    }

    const result = await userService.uploadImg(filePath, studentId);
    res.ResultVO(0, '上传成功', result);
});

router.put('/deleteUser', async (req, res, next) => {
    const { studentId } = req.body;
    const result = await userService.deleteUser(studentId);
    res.ResultVO(0, '成功', result);
});

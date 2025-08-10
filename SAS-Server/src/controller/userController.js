const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const OSS = require('ali-oss');
const config = require('config');

// 从配置文件获取OSS配置
const ossConfig = config.get('ossConfig');

// 初始化OSS客户端
const ossClient = new OSS({
    region: ossConfig.region,
    accessKeyId: ossConfig.accessKeyId,
    accessKeySecret: ossConfig.accessKeySecret,
    bucket: ossConfig.bucket
});

module.exports = router;
// 确保上传目录存在（用于临时存储）
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('创建上传目录:', uploadDir);
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // 临时存储路径
    },
    filename: (req, file, cb) => {
        // 生成更安全的文件名
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 10)}`;
        const ext = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        cb(null, filename);
    }
});

const userService = require('../service/userService');

/**
 * @name getUserList
 * @description 获取用户列表
 * @query {string} studentId - 学号
 * @query {string} userName - 姓名
 * @query {string} college - 学院
 * @query {string} grade - 年级
 * @query {string} major - 专业
 * @query {string} userClass - 班级
 */
router.get('/getUserList', async (req, res, next) => {
    // 获取请求中的班级参数
    const { class: className } = req.query;
    let result;
    if (className) {
        // 如果提供了班级参数，则按班级筛选用户
        // 班级编码格式可能是 '24 09 01'，需要在服务层处理
        result = await userService.getUserListByClass(className);
    } else {
        // 否则获取所有用户
        result = await userService.getUserList();
    }
    res.ResultVO(0, '成功', result);
});

router.get('/getUserInfo', async (req, res, next) => {
    const { studentId } = req.payload;
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

router.put('/uploadImg', async (req, res, next) => {
    // 配置上传限制
    const uploadConfig = multer({
        storage: storage,
        limits: {
            fileSize: 5 * 1024 * 1024 // 限制5MB
        },
        fileFilter: (req, file, cb) => {
            // 验证文件类型
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.mimetype)) {
                return cb(new Error('只允许上传JPG、PNG、GIF或WEBP格式的图片'), false);
            }
            cb(null, true);
        }
    }).single('img');
    // 处理上传
    uploadConfig(req, res, async (err) => {
        const studentId = req.payload.studentId;
        // 处理上传错误
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ code: 1, msg: '图片大小不能超过5MB' });
            }
            console.error('图片上传错误:', err);
            return res.status(400).json({ code: 1, msg: err.message || '图片上传失败' });
        }
        // 验证请求参数
        if (!studentId) {
            return res.status(400).json({ code: 1, msg: '未提供学生ID' });
        }
        const filePath = req.file ? req.file.path : null;
        if (!filePath) {
            return res.status(400).json({ code: 1, msg: '未上传图片文件' });
        }
        try {
            // 生成OSS存储路径
            const ossPath = `students/${studentId}/${path.basename(filePath)}`;
            // 上传文件到OSS
            const result = await ossClient.put(ossPath, filePath);
            // 获取OSS文件URL
            const imageUrl = result.url || `https://${ossClient.options.bucket}.${ossClient.options.region}.aliyuncs.com/${ossPath}`;
            // 调用服务层保存图片URL到数据库
            const dbResult = await userService.uploadImg(imageUrl, studentId);
            // 上传成功后删除临时文件
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('删除临时文件失败:', unlinkErr);
                }
            });

            res.ResultVO(0, '上传成功', dbResult);
        } catch (error) {
            console.error('处理图片上传时发生错误:', error);
            // 尝试删除临时文件
            if (filePath && fs.existsSync(filePath)) {
                fs.unlink(filePath, () => {});
            }
            // 返回更具体的错误信息
            if (error.message.includes('未找到学生ID')) {
                return res.status(404).json({ code: 1, msg: error.message });
            }
            return res.status(500).json({ code: 1, msg: '服务器处理图片时出错' });
        }
    });
});

router.put('/deleteUser', async (req, res, next) => {
    const { studentId } = req.body;
    const result = await userService.deleteUser(studentId);
    res.ResultVO(0, '成功', result);
});

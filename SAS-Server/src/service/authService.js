const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwt_conf = require('config').get('jwtConfig');

const authDao = require('../dao/authDao');

// 用户注册
exports.register = async (name, studentId, img, college, major, classId, grade, password) => {
    // 加密密码
    console.log(name, studentId, img, college, major, classId, grade, password);
    const salt = await bcrypt.genSalt(10); //盐值
    const passwordHash = await bcrypt.hash(password, salt);
    // 保存用户信息
    const result = await authDao.register(name, studentId, img, college, major, classId, grade, passwordHash);
    return result;
};

// 用户登录
exports.login = async (studentId, password) => {
    // 获取用户实体
    const user = await authDao.login(studentId);
    if (!user || user.length === 0) {
        return;
    }
    // 生成 token
    const token = jwt.sign(
        {
            studentId: user[0].studentId,
            userName: user[0].userName,
            isAdmin: user[0].isAdmin
        },
        jwt_conf.secret,
        {
            expiresIn: jwt_conf.expiresIn
        }
    );
    console.log('token:', token);
    return token;
};

// 凭证校验
exports.tokenVerify = async (token) => {
    try {
        return await jwt.verify(token, jwt_conf.secret);
    } catch (err) {
        return;
    }
};

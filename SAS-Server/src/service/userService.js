const { list } = require('ali-oss/lib/object');
const userDao = require('../dao/userDao');

exports.getUserList = async () => {
    const userList = await userDao.getUserList();
    return userList;
};

// 根据班级编码获取用户列表
exports.getUserListByClass = async (classCode) => {
    // 获取所有用户
    const userList = await userDao.getUserList();
    // 如果没有提供班级编码，返回所有用户
    if (!classCode) {
        return userList;
    }
    let year;
    let collegeCode;
    let theclassCode;
    // 如果班级编码包含空格，可能是需要处理的格式
    const parts = classCode.split('');
    if (parts.length === 6) {
        // 假设格式为 'YY MM DD'，转换为 '20YY MM DD'
        year = '20' + `${parts[0]}` + `${parts[1]}`;
        collegeCode = `${parts[3]}`; // 去除前导零
        if (parts[4] === '0') {
            theclassCode = `${parts[5]}`;
        } else {
            theclassCode = `${parts[4]}${parts[5]}`;
        }
    }
    console.log(year, collegeCode, theclassCode);
    // 筛选匹配班级编码的用户
    const filteredUsers = userList.filter((user) => {
        // 用户的班级编码可能存储在 userClass 字段中
        return user.grade == year && user.college == collegeCode && user.userClass == theclassCode;
    });
    console.log(filteredUsers);
    return filteredUsers;
};

exports.getUserInfo = async (studentId) => {
    const userInfo = await userDao.getUserInfo(studentId);
    return userInfo;
};

exports.addUser = async (studentId, userName, college, grade, major, userClass) => {
    const result = await userDao.addUser(studentId, userName, college, grade, major, userClass);
    return result;
};

exports.updateUser = async (studentId, userName, college, grade, major, userClass) => {
    const result = await userDao.updateUser(studentId, userName, college, grade, major, userClass);
    return result;
};

exports.uploadImg = async (img, studentId) => {
    // 参数验证
    if (!img) {
        throw new Error('图片数据不能为空');
    }
    if (!studentId) {
        throw new Error('学生ID不能为空');
    }
    try {
        // 调用DAO层上传图片
        const result = await userDao.uploadImg(img, studentId);
        // 验证返回结果
        if (!result || result.length === 0) {
            throw new Error('图片上传失败，未能获取上传结果');
        }
        return result;
    } catch (error) {
        // 记录错误日志
        console.error(`图片上传服务错误: ${error.message}`);
        // 重新抛出错误，让控制器处理
        throw error;
    }
};

exports.deleteUser = async (studentId) => {
    const result = await userDao.deleteUser(studentId);
    return result;
};

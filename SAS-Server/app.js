// 定义 Node Express 服务器
const express = require('express');
const app = express();

// 设置允许跨域访问
const cors = require('cors');
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);
// 将请求体解析为 JSON
app.use(express.json());
// 响应格式化
app.use(require('./src/middleware/responseFormat'));
// API 鉴权
app.use(require('./src/middleware/apiProtected'));
// 错误处理
app.use(require('./src/middleware/errorHandler'));

// 导入服务器配置
const server_conf = require('config').get('serverConfig');

// 路由规则
const baseUrl = server_conf.baseUrl || '/api';
app.use(`${baseUrl}/auth`, require('./src/controller/authController'));
app.use(`${baseUrl}/user`, require('./src/controller/userController'));
app.use(`${baseUrl}/record`, require('./src/controller/recordController'));
app.use(`${baseUrl}/arrangement`, require('./src/controller/arrangementController'));

// 启动服务器
const server = app.listen(server_conf.port || 33001, server_conf.host || '127.0.0.1', () => {
    console.log('Server running at http://%s:%s', server_conf.host, server_conf.port);
    console.log('Environment=%s', process.env.NODE_ENV);
});

// 暴露图片静态访问路径
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

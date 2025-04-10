import { MidwayConfig } from '@midwayjs/core';
import { createRedisStore } from '@midwayjs/cache-manager';
import { tmpdir } from 'os';
import { join } from 'path';


export default {
  // 用于Cookie标志密钥，应更改为自己的密钥并确保其安全性。
  keys: '',
  //代码染色配置
  codeDye: {
    matchHeaderKey: 'codeDye',
  },
  //示例http://127.0.0.1:7001/api/auth/tokenVerify?codeDye=html
  //示例http://127.0.0.1:7001/api/user/getUser?userId=135&codeDye=html
 // 应用配置
koa: {
  port: 7001, // 设置 Koa 服务器的端口
  hostname: '0.0.0.0', // 设置 Koa 服务器的主机名
  globalPrefix: 'api', // 设置全局路由前缀，默认为 api
},
// 数据库配置
databaseConfig: {
  host: '', // 数据库主机名
  port: 3306, // 数据库端口，默认3306
  user: '', // 数据库用户名
  password: '', // 数据库密码
  database: '', // 数据库名称
},
// 缓存配置，使用 Redis 作为缓存存储
cacheManager: {
  clients: {
    redis: {
      store: createRedisStore('redis'), // 使用 createRedisStore 方法创建 Redis 存储
      options: {
        ttl: 86400000, // 设置缓存过期时间为 1 天
        refreshThreshold: 43200000, // 设置刷新阈值为 12 小时
      },
    },
  },
},
redis: {
  clients: {
  // 定义 Redis 客户端实例
    redis: {
      host: '', // Redis 主机名
      port: 6379, // Redis 端口
      password: '', // Redis 密码
      db: 0, // Redis 数据库
      keepAlive: 10000, // Redis 连接保持时间
    },
  },
},
//OSS对象存储配置
oss: {
  client: {
    accessKeyId: '', // 阿里云访问密钥ID
    accessKeySecret: '', // 阿里云访问密钥Secret
    bucket: '', // 阿里云OSS Bucket名称
    endpoint: '', // 阿里云OSS Endpoint
    timeout: '', // 超时时间
  },
},
// 文件上传配置
busboy: {
  mode: 'file',
  tmpdir: join(tmpdir(), 'midway-busboy-files'),
  cleanTimeout: 5 * 60 * 1000,
  mimeTypeWhiteList: {
    '.jpg': 'image/jpeg',
    // 也可以设置多个 MIME type，比如下面的允许 .jpeg 后缀的文件是 jpg 或者是 png 两种类型
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    // 其他类型
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.wbmp': 'image/vnd.wap.wbmp',
    '.webp': 'image/webp',
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 最大上传文件大小为10M
  }
},
//jwt配置
jwtConfig: {
  secret: '',// JWT 密钥,自定义
  expiresIn: '24h',
},
//允许跨域
cors: {
  origin: '*',
},
} as MidwayConfig;

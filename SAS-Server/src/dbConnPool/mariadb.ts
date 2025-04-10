import { Pool, PoolConnection } from 'mariadb';
import { Config } from '../dto/config'; // 引入类型
import { httpError } from '@midwayjs/core';
import dbConfig from '../config/config.production'; // 引入数据库配置
const mariadb = require('mariadb');
const config = dbConfig as Config; // dbConfig 已经是正确的类型

const pool: Pool = mariadb.createPool({
  host: config.databaseConfig.host, // 这里使用修改后的属性名
  port: config.databaseConfig.port,
  user: config.databaseConfig.user,
  password: config.databaseConfig.password,
  database: config.databaseConfig.database,
  connectionLimit: 10, // 限制最大连接数
});

// 封装事务操作
export const transaction = async (
  callback: (conn: PoolConnection) => Promise<any>
): Promise<any> => {
  let conn: PoolConnection | null = null;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction(); // 开启事务
    const result = await callback(conn); // 执行回调函数中的操作

    await conn.commit(); // 提交事务
    return result;
  } catch (err) {
    if (conn) {
      await conn.rollback(); // 回滚事务
    }
    console.error('Database transaction error:', err);
    throw err;
  } finally {
    if (conn) {
      conn.release(); // 释放连接
    }
  }
};
// 封装数据库查询方法
export const query = async (
  sql: string,
  sqlParams: any[],
  throwOnEmptyResult = true,
  conn?: PoolConnection
): Promise<any> => {
  let connFromPool: PoolConnection | null = null;
  try {
    // 如果没有传入 conn，则从连接池中获取一个新的连接
    if (!conn) {
      connFromPool = await pool.getConnection();
      conn = connFromPool;
    }
    // 仅在开发环境下打印 SQL 查询语句
    if (process.env.NODE_ENV === 'local') {
      console.log(`Executing SQL query: ${sql}`);
      console.log(`With parameters: ${JSON.stringify(sqlParams)}`);
    }
    const rows = await conn.query(sql, sqlParams);
    if (throwOnEmptyResult && (!rows || rows.length === 0)) {
      throw new httpError.ForbiddenError('Query result is empty');
    }
    return rows.length > 0 ? rows : []; // 返回查询结果或 null
  } catch (err) {
    console.error('Database query error:', err);
    console.error('SQL:', sql); // 输出出错的 SQL 查询
    if (err.sqlMessage) {
      console.error('SQL Error Message:', err.sqlMessage); // MySQL 错误消息
    }
    throw err; // 抛出错误，便于调用者捕获
  } finally {
    // 如果连接是从连接池中获取的，则释放连接
    if (connFromPool) {
      connFromPool.release();
    }
  }
};
// 过滤 SQL 语句中的空参数
export const conditionReplace = (condition: string, param: any): string => {
  if (param != null && param !== undefined && param !== '') {
    return condition;
  } else {
    return '1 = 1'; // 返还一个永远为真的条件，避免查询条件为空
  }
};
// 替换 SQL 语句中的 `key = ?` 条件部分
export const keyReplace = (
  keyName: string,
  dbParamName: string,
  endFlag = false
): string => {
  if (dbParamName != null && dbParamName !== undefined && dbParamName !== '') {
    return `${keyName} = ?${endFlag ? '' : ','}`;
  } else {
    return '';
  }
};
// 过滤 SQL 语句中的无效参数（如 null、undefined 或空字符串）
export const paramsReplace = (params: any[]): any[] => {
  return params.filter(
    item => item != null && item !== undefined && item !== ''
  );
};

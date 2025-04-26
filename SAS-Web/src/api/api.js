import auth from '@/api/auth';
import user from '@/api/user';
import arrangement from '@/api/arrangement';
import record from '@/api/record';

// 注入所有 api 模块到 Vue 实例
export default {
    install(app) {
        app.config.globalProperties.$api = {
            auth,
            user,
            arrangement,
            record
        };
    }
};

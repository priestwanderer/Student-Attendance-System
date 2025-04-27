import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';


export const userStore = defineStore('userStore', {
    state: () => ({
        studentId: null,
        usernName: null,
        isAdmin:0,
    }),
    actions: {
        // 解密 token 并填充用户信息
        decodeToken() {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token); // 解密 token
                this.studentId = decodedToken.studentId;
                this.usernName = decodedToken.usernName;
                this.isAdmin = decodedToken.isAdmin;
            }
        },
        //清除用户信息
        clearUserInfo() {
            this.studentId = null;
            this.usernName = null;
            this.isAdmin = 0;
        }
    }
});

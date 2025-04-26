import { defineStore } from 'pinia';

export const arrangementStore = defineStore('arrangementStore', {
    state: () => ({
        userClass: null,
        arrangementId: null,
    })
});

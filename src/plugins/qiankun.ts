// src/qiankun.ts

import { registerMicroApps, start } from 'qiankun';

export function setupQiankun() {
    registerMicroApps([
        {
            name: 'app1',
            entry: '//localhost:5174',
            container: '#microAppContainer1',
            activeRule: '/app1',
        },
        // 其他子应用配置...
    ]);

    start();
}

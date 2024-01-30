// src/services/loadingService.ts
import { ElLoading } from 'element-plus';

let loadingInstance;
let requestCount = 0;

function startLoading() {
    if (requestCount === 0) {
        loadingInstance = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.7)',
        });
    }
    requestCount++;
}

function endLoading() {
    requestCount--;
    if (requestCount === 0 && loadingInstance) {
        loadingInstance.close();
    }
}

export { startLoading, endLoading };
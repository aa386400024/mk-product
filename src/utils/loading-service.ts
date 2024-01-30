import { ElLoading } from 'element-plus';

let loadingInstance: any;
let requestCount = 0;
const whiteList = ['/api/user/info', '/api/check/update']; // 不需要loading的接口

function startLoading(config) {
    if (whiteList.includes(config.url)) {
        return;
    }
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

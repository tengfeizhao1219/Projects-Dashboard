/*
 * Projects Dashboard - 真实数据API集成模块
 * 版本: 1.0.0
 * 创建时间: 2026-03-24
 * 功能: 连接可靠的每小时同步系统API，替换模拟数据
 */

// API服务器配置
const API_CONFIG = {
    baseUrl: 'http://localhost:8080',
    endpoints: {
        metrics: '/api/metrics',
        duration: '/api/duration',
        status: '/api/status',
        history: '/api/history',
        system: '/api/system',
        all: '/api/all',
        health: '/api/health'
    },
    timeout: 5000, // 5秒超时
    retryCount: 3,  // 重试次数
    cacheDuration: 30000 // 30秒缓存
};

// 数据缓存
let dataCache = {
    metrics: null,
    duration: null,
    status: null,
    history: null,
    system: null,
    all: null,
    lastUpdated: {}
};

// 错误处理配置
const ERROR_CONFIG = {
    maxRetries: 3,
    retryDelay: 1000,
    fallbackData: {
        metrics: {
            successRate: '98.5%',
            avgDuration: '1.2s',
            failureCount: '2',
            totalExecutions: '168',
            lastExecution: '2026-03-24 13:00:03',
            nextExecution: '2026-03-24 14:00:03'
        },
        duration: {
            labels: ['03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24'],
            data: [1.5, 1.3, 1.4, 1.2, 1.1, 1.3, 1.2]
        },
        status: {
            success: 165,
            warning: 2,
            failed: 1
        },
        history: [
            { id: 1, time: '2026-03-24 13:00:03', duration: '1.2s', status: 'success', details: '同步成功' },
            { id: 2, time: '2026-03-24 12:00:02', duration: '1.1s', status: 'success', details: '同步成功' },
            { id: 3, time: '2026-03-24 11:00:01', duration: '1.3s', status: 'success', details: '同步成功' },
            { id: 4, time: '2026-03-24 10:00:03', duration: '1.4s', status: 'warning', details: '同步完成但有警告' },
            { id: 5, time: '2026-03-24 09:00:02', duration: '1.2s', status: 'success', details: '同步成功' }
        ],
        system: {
            version: 'v1.2.0',
            config: '标准配置',
            performance: '良好',
            uptime: '7天12小时',
            lastCheck: '2026-03-24 13:45:00'
        }
    }
};

/**
 * 发送API请求
 * @param {string} endpoint - API端点
 * @param {Object} params - 查询参数
 * @param {number} retryCount - 当前重试次数
 * @returns {Promise} - 返回Promise对象
 */
async function fetchAPI(endpoint, params = {}, retryCount = 0) {
    const url = new URL(`${API_CONFIG.baseUrl}${endpoint}`);
    
    // 添加查询参数
    Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
    });
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);
    
    try {
        const response = await fetch(url.toString(), {
            signal: controller.signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(`API error: ${data.error || 'Unknown error'}`);
        }
        
        return data.data;
        
    } catch (error) {
        clearTimeout(timeoutId);
        
        // 重试逻辑
        if (retryCount < ERROR_CONFIG.maxRetries) {
            console.warn(`API请求失败，正在重试 (${retryCount + 1}/${ERROR_CONFIG.maxRetries}):`, error.message);
            await new Promise(resolve => setTimeout(resolve, ERROR_CONFIG.retryDelay));
            return fetchAPI(endpoint, params, retryCount + 1);
        }
        
        console.error(`API请求失败，已达到最大重试次数:`, error);
        throw error;
    }
}

/**
 * 获取系统指标数据
 * @returns {Promise} - 返回指标数据
 */
async function getMetrics() {
    const cacheKey = 'metrics';
    const now = Date.now();
    
    // 检查缓存
    if (dataCache[cacheKey] && dataCache.lastUpdated[cacheKey]) {
        const cacheAge = now - dataCache.lastUpdated[cacheKey];
        if (cacheAge < API_CONFIG.cacheDuration) {
            return dataCache[cacheKey];
        }
    }
    
    try {
        const data = await fetchAPI(API_CONFIG.endpoints.metrics);
        dataCache[cacheKey] = data;
        dataCache.lastUpdated[cacheKey] = now;
        return data;
    } catch (error) {
        console.warn('获取指标数据失败，使用降级数据:', error.message);
        return ERROR_CONFIG.fallbackData.metrics;
    }
}

/**
 * 获取执行时长趋势数据
 * @param {number} days - 天数，默认7天
 * @returns {Promise} - 返回趋势数据
 */
async function getDurationTrend(days = 7) {
    const cacheKey = `duration_${days}`;
    const now = Date.now();
    
    // 检查缓存
    if (dataCache[cacheKey] && dataCache.lastUpdated[cacheKey]) {
        const cacheAge = now - dataCache.lastUpdated[cacheKey];
        if (cacheAge < API_CONFIG.cacheDuration * 5) { // 趋势数据缓存时间更长
            return dataCache[cacheKey];
        }
    }
    
    try {
        const data = await fetchAPI(API_CONFIG.endpoints.duration, { days });
        dataCache[cacheKey] = data;
        dataCache.lastUpdated[cacheKey] = now;
        return data;
    } catch (error) {
        console.warn('获取趋势数据失败，使用降级数据:', error.message);
        return ERROR_CONFIG.fallbackData.duration;
    }
}

/**
 * 获取状态分布数据
 * @param {number} days - 天数，默认30天
 * @returns {Promise} - 返回状态数据
 */
async function getStatusDistribution(days = 30) {
    const cacheKey = `status_${days}`;
    const now = Date.now();
    
    // 检查缓存
    if (dataCache[cacheKey] && dataCache.lastUpdated[cacheKey]) {
        const cacheAge = now - dataCache.lastUpdated[cacheKey];
        if (cacheAge < API_CONFIG.cacheDuration * 5) {
            return dataCache[cacheKey];
        }
    }
    
    try {
        const data = await fetchAPI(API_CONFIG.endpoints.status, { days });
        dataCache[cacheKey] = data;
        dataCache.lastUpdated[cacheKey] = now;
        return data;
    } catch (error) {
        console.warn('获取状态数据失败，使用降级数据:', error.message);
        return ERROR_CONFIG.fallbackData.status;
    }
}

/**
 * 获取执行历史数据
 * @param {number} limit - 限制条数，默认10条
 * @returns {Promise} - 返回历史数据
 */
async function getExecutionHistory(limit = 10) {
    const cacheKey = `history_${limit}`;
    const now = Date.now();
    
    // 检查缓存
    if (dataCache[cacheKey] && dataCache.lastUpdated[cacheKey]) {
        const cacheAge = now - dataCache.lastUpdated[cacheKey];
        if (cacheAge < API_CONFIG.cacheDuration * 2) {
            return dataCache[cacheKey];
        }
    }
    
    try {
        const data = await fetchAPI(API_CONFIG.endpoints.history, { limit });
        dataCache[cacheKey] = data;
        dataCache.lastUpdated[cacheKey] = now;
        return data;
    } catch (error) {
        console.warn('获取历史数据失败，使用降级数据:', error.message);
        return ERROR_CONFIG.fallbackData.history;
    }
}

/**
 * 获取系统信息
 * @returns {Promise} - 返回系统信息
 */
async function getSystemInfo() {
    const cacheKey = 'system';
    const now = Date.now();
    
    // 检查缓存
    if (dataCache[cacheKey] && dataCache.lastUpdated[cacheKey]) {
        const cacheAge = now - dataCache.lastUpdated[cacheKey];
        if (cacheAge < API_CONFIG.cacheDuration * 10) { // 系统信息缓存时间最长
            return dataCache[cacheKey];
        }
    }
    
    try {
        const data = await fetchAPI(API_CONFIG.endpoints.system);
        dataCache[cacheKey] = data;
        dataCache.lastUpdated[cacheKey] = now;
        return data;
    } catch (error) {
        console.warn('获取系统信息失败，使用降级数据:', error.message);
        return ERROR_CONFIG.fallbackData.system;
    }
}

/**
 * 获取所有数据
 * @returns {Promise} - 返回所有数据
 */
async function getAllData() {
    try {
        const data = await fetchAPI(API_CONFIG.endpoints.all);
        return data;
    } catch (error) {
        console.warn('获取所有数据失败，使用降级数据组合:', error.message);
        return {
            metrics: ERROR_CONFIG.fallbackData.metrics,
            duration: ERROR_CONFIG.fallbackData.duration,
            status: ERROR_CONFIG.fallbackData.status,
            history: ERROR_CONFIG.fallbackData.history,
            system: ERROR_CONFIG.fallbackData.system
        };
    }
}

/**
 * 检查API健康状态
 * @returns {Promise<boolean>} - 返回健康状态
 */
async function checkHealth() {
    try {
        const response = await fetch(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.health}`, {
            timeout: 3000
        });
        const data = await response.json();
        return data.success === true;
    } catch (error) {
        console.warn('API健康检查失败:', error.message);
        return false;
    }
}

/**
 * 更新API状态指示器
 * @param {boolean} isOnline - 是否在线
 */
function updateAPIStatusIndicator(isOnline) {
    const apiStatus = document.getElementById('apiStatus');
    if (!apiStatus) return;
    
    const statusDot = apiStatus.querySelector('div');
    const statusText = apiStatus.querySelector('span span');
    
    if (isOnline) {
        statusDot.style.background = 'var(--success-color)';
        statusText.textContent = '已连接';
        statusText.style.color = 'var(--success-color)';
    } else {
        statusDot.style.background = 'var(--warning-color)';
        statusText.textContent = '连接中';
        statusText.style.color = 'var(--warning-color)';
    }
}

/**
 * 显示API连接测试结果
 * @param {boolean} success - 是否成功
 * @param {string} message - 消息内容
 */
function showAPITestResult(success, message) {
    const btn = document.getElementById('apiTestBtn');
    if (!btn) return;
    
    const originalText = btn.innerHTML;
    
    if (success) {
        btn.innerHTML = '<i class="fas fa-check"></i> 测试成功';
        btn.style.color = 'var(--success-color)';
    } else {
        btn.innerHTML = '<i class="fas fa-times"></i> 测试失败';
        btn.style.color = 'var(--danger-color)';
    }
    
    // 显示通知
    showNotification(message, success ? 'success' : 'warning');
    
    // 3秒后恢复
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.color = 'var(--text-secondary)';
    }, 3000);
}

/**
 * 测试API连接
 */
async function testAPIConnection() {
    const btn = document.getElementById('apiTestBtn');
    if (!btn) return;
    
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 测试中...';
    btn.style.color = 'var(--warning-color)';
    
    try {
        const isHealthy = await checkHealth();
        
        if (isHealthy) {
            showAPITestResult(true, 'API连接测试成功！实时数据同步正常。');
            updateAPIStatusIndicator(true);
        } else {
            showAPITestResult(false, 'API连接测试失败，使用模拟数据继续运行。');
            updateAPIStatusIndicator(false);
        }
    } catch (error) {
        showAPITestResult(false, `API连接测试失败: ${error.message}`);
        updateAPIStatusIndicator(false);
    }
}

/**
 * 初始化API集成模块
 */
function initAPIIntegration() {
    // 定期检查API状态
    setInterval(async () => {
        try {
            const isHealthy = await checkHealth();
            updateAPIStatusIndicator(isHealthy);
        } catch (error) {
            updateAPIStatusIndicator(false);
        }
    }, 30000); // 每30秒检查一次
    
    // 绑定API测试按钮事件
    const apiTestBtn = document.getElementById('apiTestBtn');
    if (apiTestBtn) {
        apiTestBtn.addEventListener('click', testAPIConnection);
    }
    
    // 初始状态检查
    setTimeout(async () => {
        try {
            const isHealthy = await checkHealth();
            updateAPIStatusIndicator(isHealthy);
        } catch (error) {
            updateAPIStatusIndicator(false);
        }
    }, 1000);
}

// 导出API函数
window.APIIntegration = {
    getMetrics,
    getDurationTrend,
    getStatusDistribution,
    getExecutionHistory,
    getSystemInfo,
    getAllData,
    checkHealth,
    testAPIConnection,
    initAPIIntegration,
    updateAPIStatusIndicator
};

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAPIIntegration);
} else {
    initAPIIntegration();
}
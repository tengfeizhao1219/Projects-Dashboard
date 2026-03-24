    return;
    
    const record = historyData[index];
    showNotification(`查看日志: ${record.time} - ${record.details}`, 'info');
    
    // 在实际实现中，这里应该打开一个模态框显示完整的日志详情
    // 目前只是显示一个通知
}

/**
 * 刷新系统信息
 */
async function refreshSystemInfo() {
    console.log('刷新系统信息...');
    
    try {
        if (!window.APIIntegration) {
            throw new Error('API集成模块未加载');
        }
        
        const systemData = await window.APIIntegration.getSystemInfo();
        cachedData.system = systemData;
        
        renderSystemInfo();
        
        console.log('系统信息刷新完成');
        return true;
        
    } catch (error) {
        console.error('刷新系统信息失败:', error);
        return false;
    }
}

/**
 * 渲染系统信息
 */
function renderSystemInfo() {
    const container = document.getElementById('systemInfoContainer');
    if (!container) return;
    
    const systemData = cachedData.system;
    if (!systemData) {
        container.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>系统信息加载失败</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="info-item">
            <span class="info-label">系统版本</span>
            <span class="info-value">${systemData.version || 'v1.2.0'}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">运行配置</span>
            <span class="info-value">${systemData.config || '标准配置'}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">性能状态</span>
            <span class="info-value">${systemData.performance || '良好'}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">运行时间</span>
            <span class="info-value">${systemData.uptime || '7天12小时'}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">最后检查</span>
            <span class="info-value">${systemData.lastCheck || '2026-03-24 13:45:00'}</span>
        </div>
        
        <div class="info-item">
            <span class="info-label">数据源</span>
            <span class="info-value">可靠的每小时同步系统</span>
        </div>
    `;
}

/**
 * 更新页面显示
 */
function updatePageDisplay() {
    console.log('更新页面显示...');
    
    // 渲染指标卡片
    renderMetricsCards();
    
    // 渲染历史记录表格
    renderHistoryTable();
    
    // 渲染系统信息
    renderSystemInfo();
    
    console.log('页面显示更新完成');
}

/**
 * 显示通知
 */
function showNotification(message, type = 'info') {
    // 移除现有的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        animation: slideIn 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // 设置背景颜色
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, var(--success-color), #34d399)';
    } else if (type === 'warning') {
        notification.style.background = 'linear-gradient(135deg, var(--warning-color), #fbbf24)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, var(--danger-color), #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))';
    }
    
    // 设置图标
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'warning') icon = 'exclamation-triangle';
    if (type === 'error') icon = 'times-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后自动移除
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 导出函数
window.SyncMonitor = {
    initSyncMonitor,
    updateMetrics,
    updateDurationChart,
    updateStatusChart,
    updateHistoryTable,
    refreshSystemInfo,
    renderMetricsCards,
    renderHistoryTable,
    renderSystemInfo,
    updatePageDisplay,
    showNotification
};

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
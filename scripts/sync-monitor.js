/*
 * 同步系统监控 - JavaScript文件
 * 集成到Projects Dashboard的可视化监控模块
 * 版本: 2.0.0
 * 创建时间: 2026-03-24
 */

// 全局变量
let chartInstances = {};
let currentTheme = 'dark';

// 模拟数据 - 实际使用时应该从API获取
const mockData = {
    metrics: {
        successRate: '98.5%',
        avgDuration: '1.2s',
        failureCount: '2',
        totalExecutions: '168'
    },
    
    durationData: {
        labels: ['03-18', '03-19', '03-20', '03-21', '03-22', '03-23', '03-24'],
        data: [1.5, 1.3, 1.8, 1.2, 1.1, 1.0, 1.2]
    },
    
    statusData: {
        labels: ['成功', '警告', '失败'],
        data: [165, 3, 2],
        colors: ['#10b981', '#f59e0b', '#ef4444'] // 使用现有主题颜色
    },
    
    history: [
        { time: '2026-03-24 08:00:00', duration: '1.1s', status: 'success', log: '20260324_080000.log', git: true, next: '09:00:00' },
        { time: '2026-03-24 07:00:00', duration: '1.0s', status: 'success', log: '20260324_070000.log', git: true, next: '08:00:00' },
        { time: '2026-03-24 06:00:00', duration: '1.3s', status: 'warning', log: '20260324_060000.log', git: false, next: '07:00:00' },
        { time: '2026-03-24 05:00:00', duration: '1.2s', status: 'success', log: '20260324_050000.log', git: true, next: '06:00:00' },
        { time: '2026-03-24 04:00:00', duration: '1.5s', status: 'success', log: '20260324_040000.log', git: true, next: '05:00:00' },
        { time: '2026-03-24 03:00:00', duration: '1.1s', status: 'success', log: '20260324_030000.log', git: true, next: '04:00:00' },
        { time: '2026-03-24 02:00:00', duration: '1.8s', status: 'success', log: '20260324_020000.log', git: true, next: '03:00:00' },
        { time: '2026-03-24 01:00:00', duration: '1.0s', status: 'success', log: '20260324_010000.log', git: true, next: '02:00:00' },
        { time: '2026-03-24 00:00:00', duration: '1.2s', status: 'success', log: '20260324_000000.log', git: true, next: '01:00:00' },
        { time: '2026-03-23 23:00:00', duration: '1.3s', status: 'success', log: '20260323_230000.log', git: true, next: '00:00:00' }
    ],
    
    systemInfo: {
        version: '可靠的每小时同步系统 v2.0',
        deployTime: '2026-03-24 07:52',
        uptime: '2小时15分钟',
        logDir: '/home/admin/.openclaw/workspace/logs/hourly_sync',
        logSize: '2.3 MB'
    }
};

// 初始化函数
function initSyncMonitor() {
    updateMetrics();
    initCharts();
    updateHistoryTable();
    updateSystemInfo();
    updateTimestamps();
    setupEventListeners();
    
    // 自动刷新（每30秒）
    setInterval(refreshData, 30000);
}

// 更新指标数据
function updateMetrics() {
    document.getElementById('successRate').textContent = mockData.metrics.successRate;
    document.getElementById('avgDuration').textContent = mockData.metrics.avgDuration;
    document.getElementById('failureCount').textContent = mockData.metrics.failureCount;
    document.getElementById('totalExecutions').textContent = mockData.metrics.totalExecutions;
}

// 初始化图表
function initCharts() {
    // 执行时长趋势图
    const durationCtx = document.getElementById('durationChart').getContext('2d');
    chartInstances.durationChart = new Chart(durationCtx, {
        type: 'line',
        data: {
            labels: mockData.durationData.labels,
            datasets: [{
                label: '执行时长 (秒)',
                data: mockData.durationData.data,
                borderColor: 'var(--primary-color)',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: 'var(--primary-color)',
                pointBorderColor: 'var(--text-color)',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14
                        },
                        color: 'var(--text-color)'
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    borderColor: 'var(--primary-color)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'var(--border-color)'
                    },
                    ticks: {
                        color: 'var(--text-secondary)'
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'var(--border-color)'
                    },
                    ticks: {
                        color: 'var(--text-secondary)',
                        callback: function(value) {
                            return value + 's';
                        }
                    }
                }
            }
        }
    });
    
    // 执行状态分布图
    const statusCtx = document.getElementById('statusChart').getContext('2d');
    chartInstances.statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
            labels: mockData.statusData.labels,
            datasets: [{
                data: mockData.statusData.data,
                backgroundColor: mockData.statusData.colors,
                borderColor: 'var(--card-bg)',
                borderWidth: 2,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        font: {
                            size: 14
                        },
                        color: 'var(--text-color)',
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: 'var(--card-bg)',
                    titleColor: 'var(--text-color)',
                    bodyColor: 'var(--text-color)',
                    borderColor: 'var(--primary-color)',
                    borderWidth: 1,
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} 次 (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// 更新历史表格
function updateHistoryTable() {
    const tbody = document.getElementById('historyTableBody');
    tbody.innerHTML = '';
    
    mockData.history.forEach(item => {
        const row = document.createElement('tr');
        
        // 状态徽章
        let statusBadge = '';
        if (item.status === 'success') {
            statusBadge = '<span class="status-badge status-success">成功</span>';
        } else if (item.status === 'warning') {
            statusBadge = '<span class="status-badge status-warning">警告</span>';
        } else {
            statusBadge = '<span class="status-badge status-error">失败</span>';
        }
        
        // Git状态
        const gitStatus = item.git ? 
            '<i class="fas fa-check-circle" style="color: var(--success-color);"></i>' : 
            '<i class="fas fa-times-circle" style="color: var(--danger-color);"></i>';
        
        row.innerHTML = `
            <td>${item.time}</td>
            <td>${item.duration}</td>
            <td>${statusBadge}</td>
            <td><a href="#" onclick="viewLog('${item.log}')" class="log-link">${item.log}</a></td>
            <td>${gitStatus}</td>
            <td>${item.next}</td>
        `;
        
        tbody.appendChild(row);
    });
    
    // 更新记录数量
    document.getElementById('historyCount').textContent = `共 ${mockData.history.length} 条记录`;
}

// 更新系统信息
function updateSystemInfo() {
    document.getElementById('systemVersion').textContent = mockData.systemInfo.version;
    document.getElementById('deployTime').textContent = mockData.systemInfo.deployTime;
    document.getElementById('uptime').textContent = mockData.systemInfo.uptime;
    document.getElementById('logDir').textContent = mockData.systemInfo.logDir;
    document.getElementById('logSize').textContent = mockData.systemInfo.logSize;
}

// 更新时间戳
function updateTimestamps() {
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN');
    
    document.getElementById('lastUpdateTime').textContent = timeStr;
}

// 设置事件监听器
function setupEventListeners() {
    // 刷新按钮
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
    
    // 手动同步按钮
    document.getElementById('manualSyncBtn').addEventListener('click', manualSync);
    
    // 导出按钮
    document.getElementById('exportBtn').addEventListener('click', exportReport);
    
    // 主题切换按钮
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // 图表范围选择器
    document.getElementById('durationChartRange').addEventListener('change', updateChartRange);
    document.getElementById('statusChartRange').addEventListener('change', updateChartRange);
}

// 刷新数据
function refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    const originalText = refreshBtn.innerHTML;
    
    // 显示刷新中状态
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 刷新中...';
    refreshBtn.disabled = true;
    
    // 模拟API调用延迟
    setTimeout(() => {
        // 在实际实现中，这里应该调用API获取最新数据
        updateTimestamps();
        
        // 模拟数据更新
        mockData.metrics.totalExecutions = (parseInt(mockData.metrics.totalExecutions) + 1).toString();
        updateMetrics();
        updateHistoryTable();
        
        // 恢复按钮状态
        refreshBtn.innerHTML = originalText;
        refreshBtn.disabled = false;
        
        // 显示成功提示
        showNotification('数据已刷新！', 'success');
    }, 1000);
}

// 手动触发同步
function manualSync() {
    const syncBtn = document.getElementById('manualSyncBtn');
    const originalText = syncBtn.innerHTML;
    
    // 显示同步中状态
    syncBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 同步中...';
    syncBtn.disabled = true;
    
    // 模拟同步过程
    setTimeout(() => {
        // 在实际实现中，这里应该调用同步API
        const success = Math.random() > 0.2; // 80%成功率
        
        if (success) {
            showNotification('手动同步成功！新数据将在下次刷新时显示。', 'success');
            
            // 模拟添加新的执行记录
            const now = new Date();
            const newRecord = {
                time: now.toLocaleString('zh-CN'),
                duration: (0.8 + Math.random() * 1.2).toFixed(1) + 's',
                status: 'success',
                log: `manual_sync_${now.getTime()}.log`,
                git: true,
                next: new Date(now.getTime() + 60 * 60 * 1000).toLocaleTimeString('zh-CN', { 
                    hour: '2-digit', 
                    minute: '2-digit', 
                    second: '2-digit' 
                })
            };
            
            mockData.history.unshift(newRecord);
            if (mockData.history.length > 15) {
                mockData.history.pop();
            }
            
            updateHistoryTable();
        } else {
            showNotification('手动同步失败，请检查系统状态。', 'error');
        }
        
        // 恢复按钮状态
        syncBtn.innerHTML = originalText;
        syncBtn.disabled = false;
    }, 2000);
}

// 导出报告
function exportReport() {
    const exportBtn = document.getElementById('exportBtn');
    const originalText = exportBtn.innerHTML;
    
    // 显示导出中状态
    exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 导出中...';
    exportBtn.disabled = true;
    
    // 模拟导出过程
    setTimeout(() => {
        // 创建报告内容
        const reportContent = `
可靠的每小时同步系统 - 监控报告
生成时间: ${new Date().toLocaleString('zh-CN')}

系统指标:
- 成功率: ${mockData.metrics.successRate}
- 平均执行时长: ${mockData.metrics.avgDuration}
- 失败次数: ${mockData.metrics.failureCount}
- 总执行次数: ${mockData.metrics.totalExecutions}

最近执行记录:
${mockData.history.slice(0, 5).map(item => `  • ${item.time} - ${item.duration} - ${item.status}`).join('\n')}

系统信息:
- 版本: ${mockData.systemInfo.version}
- 部署时间: ${mockData.systemInfo.deployTime}
- 运行时长: ${mockData.systemInfo.uptime}
- 日志目录: ${mockData.systemInfo.logDir}
        `.trim();
        
        // 创建下载链接
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sync_system_report_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // 恢复按钮状态
        exportBtn.innerHTML = originalText;
        exportBtn.disabled = false;
        
        // 显示成功提示
        showNotification('报告已导出成功！', 'success');
    }, 1500);
}

// 切换主题
function toggleTheme() {
    // 这里可以扩展为主题切换功能
    // 目前只是显示一个提示
    showNotification('主题切换功能将在未来版本中实现！', 'info');
}

// 更新图表范围
function updateChartRange(event) {
    const range = event.target.value;
    
    // 在实际实现中，这里应该根据范围重新获取数据
    // 这里只是模拟数据更新
    showNotification(`已切换到最近${range}天数据`, 'info');
}

// 查看日志
function viewLog(logFile) {
    // 在实际实现中，这里应该打开日志文件
    // 这里只是显示一个提示
    showNotification(`查看日志: ${logFile}`, 'info');
    return false;
}

// 显示通知
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
        notification.style.background = 'linear-gradient(135deg,
    const now = new Date();
    const timeStr = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // 计算下次更新时间（2分钟后）
    const nextUpdate = new Date(now.getTime() + 2 * 60 * 1000);
    const nextUpdateStr = nextUpdate.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    document.getElementById('updateTime').textContent = timeStr;
    document.getElementById('syncTime').textContent = timeStr;
    document.getElementById('nextUpdate').textContent = nextUpdateStr;
}

// 设置事件监听器
function setupEventListeners() {
    // 项目卡片点击事件
    document.addEventListener('click', function(event) {
        const card = event.target.closest('.project-card-enhanced');
        if (card) {
            card.classList.toggle('card-active');
        }
    });
}

// 切换任务完成状态
function toggleTask(projectId, taskId) {
    const project = enhancedProjects.find(p => p.id === projectId);
    if (!project) return;
    
    const task = project.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    task.completed = !task.completed;
    
    // 更新项目进度
    const completedTasks = project.tasks.filter(t => t.completed).length;
    const totalTasks = project.tasks.length;
    const newProgress = Math.round((completedTasks / totalTasks) * 100);
    
    // 记录旧进度
    const oldProgress = project.progress;
    project.previousProgress = oldProgress;
    project.progress = newProgress;
    
    // 更新显示
    updateEnhancedStats();
    renderEnhancedProjects();
    
    // 显示通知
    const action = task.completed ? '完成' : '取消完成';
    showNotification(`已${action}任务: ${task.text}`, task.completed ? 'success' : 'info');
}

// 切换展开状态
function toggleExpand(projectId) {
    const expandContent = document.getElementById(`expand-${projectId}`);
    const expandIcon = document.querySelector(`#expand-${projectId}`).previousElementSibling.querySelector('.expand-icon');
    
    expandContent.classList.toggle('expanded');
    expandIcon.classList.toggle('expanded');
    
    // 更新按钮文本
    const button = expandContent.previousElementSibling;
    const span = button.querySelector('span:first-child');
    span.textContent = expandContent.classList.contains('expanded') ? '收起项目详情' : '查看项目详情';
}

// 刷新单个项目
function refreshProject(projectId) {
    const project = enhancedProjects.find(p => p.id === projectId);
    if (!project) return;
    
    showNotification(`正在刷新 ${project.name} 数据...`, 'info');
    
    // 模拟API调用
    setTimeout(() => {
        // 随机更新进度
        const oldProgress = project.progress;
        const increment = Math.floor(Math.random() * 5) + 1;
        project.previousProgress = oldProgress;
        project.progress = Math.min(oldProgress + increment, 100);
        
        // 添加增量更新
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        
        project.incrementalUpdates.unshift({
            time: timeStr,
            text: `进度更新: ${oldProgress}% → ${project.progress}% (+${increment}%)`
        });
        
        // 保持最多3条更新记录
        if (project.incrementalUpdates.length > 3) {
            project.incrementalUpdates.pop();
        }
        
        // 更新显示
        updateEnhancedStats();
        renderEnhancedProjects();
        
        showNotification(`${project.name} 数据刷新完成！进度: ${project.progress}%`, 'success');
    }, 1000);
}

// 导出项目数据
function exportProject(projectId) {
    const project = enhancedProjects.find(p => p.id === projectId);
    if (!project) return;
    
    showNotification(`正在准备导出 ${project.name} 数据...`, 'info');
    
    // 模拟导出过程
    setTimeout(() => {
        const exportData = {
            project: {
                id: project.id,
                name: project.name,
                description: project.description,
                progress: project.progress,
                status: project.status,
                lastUpdate: project.lastUpdate,
                team: project.team,
                priority: project.priority
            },
            tasks: project.tasks,
            blockers: project.blockers,
            incrementalUpdates: project.incrementalUpdates,
            nextSteps: project.nextSteps,
            exportTime: new Date().toISOString(),
            exportFormat: 'JSON'
        };
        
        // 创建下载链接
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `project-${project.name}-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(`${project.name} 数据导出成功！`, 'success');
    }, 1500);
}

// 切换主题/视图
function toggleTheme(projectId) {
    const project = enhancedProjects.find(p => p.id === projectId);
    if (!project) return;
    
    showNotification(`切换 ${project.name} 视图模式...`, 'info');
    
    // 在实际实现中，这里应该切换不同的视图模式
    // 目前只是显示一个提示
    setTimeout(() => {
        showNotification('视图切换功能将在下一个版本中实现！', 'info');
    }, 500);
}

// 模拟数据更新
function simulateDataUpdate() {
    // 随机更新一个项目的进度
    const randomIndex = Math.floor(Math.random() * enhancedProjects.length);
    const project = enhancedProjects[randomIndex];
    
    if (project.progress < 100 && project.status !== 'blocked') {
        const oldProgress = project.progress;
        const increment = Math.floor(Math.random() * 3) + 1;
        project.previousProgress = oldProgress;
        project.progress = Math.min(project.progress + increment, 100);
        
        // 添加增量更新
        const now = new Date();
        const timeStr = now.toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        });
        
        project.incrementalUpdates.unshift({
            time: timeStr,
            text: `自动更新: 进度从 ${oldProgress}% 增加到 ${project.progress}%`
        });
        
        // 保持最多3条更新记录
        if (project.incrementalUpdates.length > 3) {
            project.incrementalUpdates.pop();
        }
        
        // 如果进度达到100%，标记为活跃
        if (project.progress === 100 && project.status !== 'active') {
            project.status = 'active';
        }
        
        updateEnhancedStats();
        renderEnhancedProjects();
        
        // 显示通知
        showNotification(`${project.name} 自动更新: ${oldProgress}% → ${project.progress}%`, 'info');
    }
}

// 检查API状态
function checkAPIStatus() {
    const apiStatus = document.getElementById('apiStatus');
    const statusDot = apiStatus.querySelector('div');
    const statusText = apiStatus.querySelector('span span');
    
    // 模拟API状态检查
    const isOnline = Math.random() > 0.2; // 80%在线率
    
    if (isOnline) {
        statusDot.style.background = 'var(--success-color)';
        statusText.textContent = '已连接';
        statusText.style.color = 'var(--success-color)';
    } else {
        statusDot.style.background = 'var(--warning-color)';
        statusText.textContent = '连接中';
        statusText.style.color = 'var(--warning-color)';
        
        // 显示警告通知
        showNotification('API连接不稳定，正在尝试重新连接...', 'warning');
    }
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initEnhancedDashboard);
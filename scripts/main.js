/*
 * Projects Dashboard - 主JavaScript文件
 * 从原有 index.html 中提取并优化
 * 版本: 2.0.0
 * 创建时间: 2026-03-24
 */

// 项目数据
const projects = [
    {
        id: 1,
        name: "单词本学习系统",
        description: "微信小程序 + 腾讯云，单词记忆管理",
        progress: 85,
        status: "active",
        lastUpdate: "2026-03-22 22:50",
        team: "协作项目",
        priority: "高"
    },
    {
        id: 2,
        name: "飞书工资表系统",
        description: "飞书集成，自动化工资计算与发放",
        progress: 30,
        status: "blocked",
        lastUpdate: "2026-03-22 18:30",
        team: "协作项目",
        priority: "中"
    },
    {
        id: 3,
        name: "AI记忆优化系统",
        description: "减少30-50% token消耗的记忆管理系统",
        progress: 50,
        status: "in-progress",
        lastUpdate: "2026-03-22 20:15",
        team: "独立项目",
        priority: "高"
    },
    {
        id: 4,
        name: "智能网页总结插件",
        description: "Chrome浏览器扩展，AI自动分析网页内容",
        progress: 20,
        status: "in-progress",
        lastUpdate: "2026-03-22 16:45",
        team: "独立项目",
        priority: "中"
    },
    {
        id: 5,
        name: "可视化汇报系统",
        description: "GitHub Pages，每天08:00自动推送",
        progress: 90,
        status: "active",
        lastUpdate: "2026-03-22 22:45",
        team: "支持系统",
        priority: "高"
    },
    {
        id: 6,
        name: "自动化脚本集",
        description: "Python自动化脚本，支持系统运行",
        progress: 40,
        status: "in-progress",
        lastUpdate: "2026-03-22 14:20",
        team: "支持系统",
        priority: "低"
    }
];

// 时间线数据
const timelineEvents = [
    {
        date: "2026-03-22 22:45",
        text: "单词本学习系统：腾讯云基础设施部署完成，word-list函数待修复"
    },
    {
        date: "2026-03-22 21:30",
        text: "GitHub仓库清理完成，推送保护问题解决"
    },
    {
        date: "2026-03-22 20:15",
        text: "WordMemeray风格首页部署到GitHub Pages"
    },
    {
        date: "2026-03-22 18:00",
        text: "项目管理系统架构确认，分工明确"
    },
    {
        date: "2026-03-22 14:30",
        text: "飞书群聊身份确认，用户映射完成"
    }
];

// 初始化函数
function initDashboard() {
    updateStats();
    renderProjects();
    renderTimeline();
    updateTime();
    
    // 每30秒更新一次时间
    setInterval(updateTime, 30000);
    
    // 每5分钟模拟数据更新
    setInterval(simulateDataUpdate, 300000);
}

// 更新统计数据
function updateStats() {
    const total = projects.length;
    const completed = projects.filter(p => p.progress >= 100).length;
    const inProgress = projects.filter(p => p.progress > 0 && p.progress < 100).length;
    const blocked = projects.filter(p => p.status === 'blocked').length;
    
    document.getElementById('totalProjects').textContent = total;
    document.getElementById('completedProjects').textContent = completed;
    document.getElementById('inProgressProjects').textContent = inProgress;
    document.getElementById('blockedProjects').textContent = blocked;
}

// 渲染项目卡片
function renderProjects() {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    projects.forEach(project => {
        const statusClass = `status-${project.status}`;
        const statusText = getStatusText(project.status);
        
        const card = document.createElement('div');
        card.className = 'project-card card';
        card.innerHTML = `
            <div class="project-header">
                <div class="project-title">${project.name}</div>
                <div class="project-status ${statusClass}">${statusText}</div>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 15px;">
                ${project.description}
            </p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${project.progress}%"></div>
            </div>
            <div class="project-meta">
                <span><i class="fas fa-users"></i> ${project.team}</span>
                <span><i class="fas fa-flag"></i> ${project.priority}优先级</span>
                <span><i class="fas fa-clock"></i> ${project.lastUpdate}</span>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// 渲染时间线
function renderTimeline() {
    const container = document.getElementById('timelineContainer');
    container.innerHTML = '';
    
    timelineEvents.forEach(event => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${event.date}</div>
                <div class="timeline-text">${event.text}</div>
            </div>
        `;
        container.appendChild(item);
    });
}

// 获取状态文本
function getStatusText(status) {
    const statusMap = {
        'active': '活跃',
        'in-progress': '进行中',
        'blocked': '受阻',
        'completed': '已完成'
    };
    return statusMap[status] || status;
}

// 更新时间显示
function updateTime() {
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
    
    document.getElementById('updateTime').textContent = timeStr;
    document.getElementById('syncTime').textContent = timeStr;
}

// 模拟数据更新
function simulateDataUpdate() {
    // 随机更新一个项目的进度
    const randomIndex = Math.floor(Math.random() * projects.length);
    const project = projects[randomIndex];
    
    if (project.progress < 100 && project.status !== 'blocked') {
        const increment = Math.floor(Math.random() * 5) + 1;
        project.progress = Math.min(project.progress + increment, 100);
        
        if (project.progress === 100) {
            project.status = 'active';
        }
        
        project.lastUpdate = new Date().toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        updateStats();
        renderProjects();
        
        // 添加时间线事件
        timelineEvents.unshift({
            date: new Date().toLocaleString('zh-CN', {
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }),
            text: `${project.name}：进度更新至 ${project.progress}%`
        });
        
        if (timelineEvents.length > 10) {
            timelineEvents.pop();
        }
        
        renderTimeline();
        
        // 显示通知
        showNotification(`已更新 ${project.name} 的进度至 ${project.progress}%`, 'success');
    }
}

// 显示通知
function showNotification(message, type = 'info') {
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
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    `;
    
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initDashboard);
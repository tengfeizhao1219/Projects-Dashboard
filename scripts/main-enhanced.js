// 增强版Dashboard主页面逻辑
// 版本: 2.1.0
// 功能: 项目卡片动态生成、实时数据更新、交互功能

// 初始化增强版Dashboard
function initEnhancedDashboard() {
    console.log('🚀 初始化增强版Dashboard...');
    
    // 生成项目卡片
    generateProjectCards();
    
    // 生成近期任务时间线
    generateRecentTasks();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 初始化时间显示
    updateTimeDisplay();
    
    // 开始自动更新
    startAutoUpdates();
    
    console.log('✅ 增强版Dashboard初始化完成');
}

// 生成项目卡片
function generateProjectCards() {
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    // 清空现有内容
    projectsContainer.innerHTML = '';
    
    // 项目数据
    const projects = [
        {
            id: 1,
            title: '可靠的每小时同步系统',
            subtitle: '自动化任务进度同步和监控',
            progress: 95,
            progressDelta: 5,
            priority: '高',
            team: '自动化团队',
            time: '3天前更新',
            updates: [
                { time: '2026-03-24 13:45', content: 'API服务器集成完成' },
                { time: '2026-03-24 13:30', content: '实时数据API支持添加' },
                { time: '2026-03-24 12:15', content: '错误处理机制优化' }
            ],
            blockers: [
                { id: 1, content: 'API服务器稳定性测试', status: '进行中' },
                { id: 2, content: '监控告警配置', status: '待处理' }
            ],
            tasks: [
                { id: 1, content: '完成API集成测试', completed: true },
                { id: 2, content: '优化错误处理机制', completed: true },
                { id: 3, content: '添加实时状态监控', completed: false },
                { id: 4, content: '完善文档和部署指南', completed: false }
            ]
        },
        {
            id: 2,
            title: 'Projects Dashboard 增强版',
            subtitle: '可视化项目管理和监控平台',
            progress: 100,
            progressDelta: 15,
            priority: '高',
            team: '前端团队',
            time: '刚刚更新',
            updates: [
                { time: '2026-03-24 14:25', content: '真实数据API集成完成' },
                { time: '2026-03-24 13:34', content: '增强版优化功能完成' },
                { time: '2026-03-24 11:30', content: '同步监控模块整合' }
            ],
            blockers: [],
            tasks: [
                { id: 1, content: '主页面增强优化', completed: true },
                { id: 2, content: '实时数据API集成', completed: true },
                { id: 3, content: '移动端体验优化', completed: true },
                { id: 4, content: 'GitHub部署验证', completed: true }
            ]
        },
        {
            id: 3,
            title: '单词本学习系统',
            subtitle: '智能单词记忆和复习平台',
            progress: 75,
            progressDelta: -5,
            priority: '中',
            team: '后端团队',
            time: '2天前更新',
            updates: [
                { time: '2026-03-22 21:25', content: '云函数修复完成' },
                { time: '2026-03-22 20:45', content: '数据库初始化优化' },
                { time: '2026-03-22 19:42', content: '部署文档完善' }
            ],
            blockers: [
                { id: 1, content: 'word-list函数异常修复', status: '阻塞中' }
            ],
            tasks: [
                { id: 1, content: '修复word-list函数', completed: false },
                { id: 2, content: '测试用户登录功能', completed: true },
                { id: 3, content: '优化翻译服务', completed: true },
                { id: 4, content: '完善前端界面', completed: false }
            ]
        },
        {
            id: 4,
            title: '超强记忆系统',
            subtitle: '减少对话token消耗的记忆系统',
            progress: 85,
            progressDelta: 10,
            priority: '中',
            team: 'AI团队',
            time: '5天前更新',
            updates: [
                { time: '2026-03-19 15:30', content: 'WAL协议实现完成' },
                { time: '2026-03-19 14:45', content: '工作缓冲区协议添加' },
                { time: '2026-03-19 13:20', content: '三层记忆架构设计' }
            ],
            blockers: [],
            tasks: [
                { id: 1, content: '实现WAL协议', completed: true },
                { id: 2, content: '添加工作缓冲区', completed: true },
                { id: 3, content: '优化记忆检索', completed: false },
                { id: 4, content: '性能测试和优化', completed: false }
            ]
        },
        {
            id: 5,
            title: 'Scrapling 爬取系统',
            subtitle: '自适应网页数据采集工具',
            progress: 90,
            progressDelta: 20,
            priority: '低',
            team: '数据团队',
            time: '4天前更新',
            updates: [
                { time: '2026-03-20 16:15', content: '基础爬取器完成' },
                { time: '2026-03-20 15:30', content: '实用爬取器添加' },
                { time: '2026-03-20 14:45', content: '示例代码编写' }
            ],
            blockers: [],
            tasks: [
                { id: 1, content: '创建基础爬取器', completed: true },
                { id: 2, content: '添加实用功能', completed: true },
                { id: 3, content: '编写使用文档', completed: true },
                { id: 4, content: '测试实际应用场景', completed: false }
            ]
        },
        {
            id: 6,
            title: '健康检查系统',
            subtitle: '主机安全硬化和风险配置',
            progress: 70,
            progressDelta: 15,
            priority: '中',
            team: '安全团队',
            time: '1周前更新',
            updates: [
                { time: '2026-03-17 11:20', content: '安全审计功能完成' },
                { time: '2026-03-17 10:45', content: '防火墙配置优化' },
                { time: '2026-03-17 09:30', content: 'SSH安全加固' }
            ],
            blockers: [
                { id: 1, content: '定期检查自动化', status: '进行中' }
            ],
            tasks: [
                { id: 1, content: '安全审计功能', completed: true },
                { id: 2, content: '防火墙配置', completed: true },
                { id: 3, content: 'SSH加固', completed: true },
                { id: 4, content: '自动化检查', completed: false }
            ]
        }
    ];
    
    // 生成每个项目的卡片
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsContainer.appendChild(projectCard);
    });
    
    // 更新统计信息
    updateStats(projects);
}

// 创建项目卡片
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card-enhanced card';
    card.dataset.projectId = project.id;
    
    // 计算任务完成率
    const totalTasks = project.tasks.length;
    const completedTasks = project.tasks.filter(task => task.completed).length;
    const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    // 进度增量样式
    const progressDeltaClass = project.progressDelta >= 0 ? 'positive' : 'negative';
    const progressDeltaSign = project.progressDelta >= 0 ? '+' : '';
    
    card.innerHTML = `
        <div class="project-header-enhanced">
            <div class="project-title-section">
                <div class="project-title-main">
                    <i class="fas fa-project-diagram"></i>
                    ${project.title}
                </div>
                <div class="project-subtitle">${project.subtitle}</div>
                <div class="project-meta-badges">
                    <span class="meta-badge meta-priority">
                        <i class="fas fa-flag"></i> ${project.priority}优先级
                    </span>
                    <span class="meta-badge meta-team">
                        <i class="fas fa-users"></i> ${project.team}
                    </span>
                    <span class="meta-badge meta-time">
                        <i class="fas fa-clock"></i> ${project.time}
                    </span>
                </div>
            </div>
            <div class="hidden-actions">
                <button class="hidden-action-btn" title="刷新项目">
                    <i class="fas fa-redo"></i>
                </button>
                <button class="hidden-action-btn" title="导出数据">
                    <i class="fas fa-download"></i>
                </button>
                <button class="hidden-action-btn" title="查看详情">
                    <i class="fas fa-info-circle"></i>
                </button>
            </div>
        </div>
        
        <div class="progress-section">
            <div class="progress-header">
                <div class="progress-label">项目进度</div>
                <div class="progress-value">
                    ${project.progress}%
                    <span class="progress-delta ${progressDeltaClass}">
                        ${progressDeltaSign}${project.progressDelta}%
                    </span>
                </div>
            </div>
            <div class="progress-bar-enhanced">
                <div class="progress-fill-enhanced" style="width: ${project.progress}%"></div>
            </div>
        </div>
        
        <div class="expandable-section">
            <button class="expand-toggle" onclick="toggleExpand(this)">
                <span>查看项目详情</span>
                <i class="fas fa-chevron-down expand-icon"></i>
            </button>
            <div class="expand-content">
                <div class="project-details">
                    <!-- 更新记录 -->
                    <div class="detail-section">
                        <h4><i class="fas fa-history"></i> 最近更新</h4>
                        <ul class="update-list">
                            ${project.updates.map(update => `
                                <li>
                                    <span class="update-time">${update.time}</span>
                                    <span class="update-content">${update.content}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    
                    <!-- 卡点列表 -->
                    ${project.blockers.length > 0 ? `
                    <div class="detail-section">
                        <h4><i class="fas fa-exclamation-triangle" style="color: var(--danger-color);"></i> 当前卡点</h4>
                        <ul class="blocker-list">
                            ${project.blockers.map(blocker => `
                                <li>
                                    <span class="blocker-content">${blocker.content}</span>
                                    <span class="blocker-status">${blocker.status}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <!-- 任务列表 -->
                    <div class="detail-section">
                        <h4><i class="fas fa-tasks"></i> 任务列表 (${completedTasks}/${totalTasks} 完成)</h4>
                        <div class="task-progress-bar">
                            <div class="task-progress-fill" style="width: ${taskCompletionRate}%"></div>
                        </div>
                        <ul class="task-list">
                            ${project.tasks.map(task => `
                                <li class="${task.completed ? 'completed' : ''}">
                                    <label>
                                        <input type="checkbox" ${task.completed ? 'checked' : ''} 
                                               onchange="toggleTask(${project.id}, ${task.id}, this)">
                                        <span class="task-content">${task.content}</span>
                                    </label>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

// 生成近期任务时间线
function generateRecentTasks() {
    const tasksContainer = document.getElementById('recentTasksContainer');
    if (!tasksContainer) return;
    
    // 清空现有内容
    tasksContainer.innerHTML = '';
    
    // 近期任务数据
    const recentTasks = [
        {
            date: '2026-03-24 14:25',
            content: 'Dashboard真实数据API集成完成，已推送到GitHub'
        },
        {
            date: '2026-03-24 13:34',
            content: 'Projects Dashboard增强版优化完成，新增项目详情页面'
        },
        {
            date: '2026-03-24 11:30',
            content: '同步系统监控模块整合到Projects Dashboard'
        },
        {
            date: '2026-03-24 07:52',
            content: '可靠的每小时同步系统首次执行成功'
        },
        {
            date: '2026-03-22 21:25',
            content: '单词本学习系统云函数修复完成'
        }
    ];
    
    // 生成时间线项目
    recentTasks.forEach(task => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${task.date}</div>
                <div class="timeline-text">${task.content}</div>
            </div>
        `;
        
        tasksContainer.appendChild(timelineItem);
    });
}

// 更新统计信息
function updateStats(projects) {
    // 计算活跃项目数
    const activeProjects = projects.length;
    
    // 计算平均进度
    const totalProgress = projects.reduce((sum, project) => sum + project.progress, 0);
    const avgProgress = Math.round(totalProgress / projects.length);
    
    // 计算待完成任务
    const pendingTasks = projects.reduce((sum, project) => {
        return sum + project.tasks.filter(task => !task.completed).length;
    }, 0);
    
    // 计算当前卡点
    const activeBlockers = projects.reduce((sum, project) => sum + project.blockers.length, 0);
    
    // 更新DOM
    document.getElementById('activeProjects').textContent = activeProjects;
    document.getElementById('avgProgress').textContent = `${avgProgress}%`;
    document.getElementById('pendingTasks').textContent = pendingTasks;
    document.getElementById('activeBlockers').textContent = activeBlockers;
}

// 更新时间显示
function updateTimeDisplay() {
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
            // 处理卡片点击
            console.log('点击项目卡片:', card.dataset.projectId);
        }
    });
    
    // 隐藏操作按钮点击事件
    document.addEventListener('click', function(event) {
        const actionBtn = event.target.closest('.hidden-action-btn');
        if (actionBtn) {
            event.stopPropagation();
            const action = actionBtn.querySelector('i').className;
            
            if (action.includes('fa-redo')) {
                showNotification('正在刷新项目数据...', 'info');
            } else if (action.includes('fa-download')) {
                showNotification('正在导出项目数据...', 'info');
            } else if (action.includes('fa-info-circle')) {
                showNotification('正在打开项目详情...', 'info');
            }
        }
    });
}

// 开始自动更新
function startAutoUpdates() {
    // 每5分钟更新一次时间显示
    setInterval(updateTimeDisplay, 5 * 60 * 1000);
    
    // 每10分钟模拟一次数据更新
    setInterval(simulateDataUpdate, 10 * 60 * 1000);
}

// 模拟数据更新
function simulateDataUpdate() {
    console.log('🔄 模拟数据更新...');
    
    // 随机更新一个项目的进度
    const projectsContainer = document.getElementById('projectsContainer');
    if (!projectsContainer) return;
    
    const projectCards = projectsContainer.querySelectorAll('.project-card-enhanced');
    if (projectCards.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * projectCards.length);
    const randomCard = projectCards[randomIndex];
    
    // 随机增加或减少进度
    const currentProgress = parseInt(randomCard.querySelector('.progress-value').textContent);
    const delta = Math.random() > 0.5 ? 1 : -1;
    const newProgress = Math.max(0, Math.min(100, currentProgress + delta));
    
    // 更新进度显示
    const progressValue = randomCard.querySelector('.progress-value');
    const progressDelta = randomCard.querySelector('.progress-delta');
    const progressFill = randomCard.querySelector('.progress-fill-enhanced');
    
    if (progressValue && progressDelta && progressFill) {
        progressValue.innerHTML = `${newProgress}% <span class="progress-delta ${delta >= 0 ? 'positive' : 'negative'}">${delta >= 0 ? '+' : ''}${delta}%</span>`;
        progressFill.style.width = `${newProgress}%`;
        
        // 添加更新记录
        const now = new Date();
        const updateTime = now.toLocaleString('zh-CN', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        
        const updateList = randomCard.querySelector('.update-list');
        if (updateList) {
            const newUpdate = document.createElement('li');
            newUpdate.innerHTML = `
                <span class="update-time">${updateTime}</span>
                <span class="update-content">进度更新: ${currentProgress}% → ${newProgress}%</span>
            `;
            updateList.insertBefore(newUpdate, updateList.firstChild);
            
            // 保持最多3条更新记录
            if (updateList.children.length > 3) {
                updateList.removeChild(updateList.lastChild);
            }
        }
    }
}

// 切换展开/收起
function toggleExpand(button) {
    const expandIcon = button.querySelector('.expand-icon');
    const expandContent = button.nextElementSibling;
    
    if (expandContent.classList.contains('expanded')) {
        expandContent.classList.remove('expanded');
        expandIcon.classList.remove('expanded');
        button.querySelector('span').textContent = '查看项目详情';
    } else {
        expandContent.classList.add('expanded');
        expandIcon.classList.add('expanded');
        button.querySelector('span').textContent = '收起项目详情';
    }
}

// 切换任务状态
function toggleTask(projectId, taskId, checkbox) {
    const taskItem = checkbox.closest('li');
    const taskContent = taskItem.querySelector('.task-content');
    
    if (checkbox.checked) {
        taskItem.classList.add('completed');
        taskContent.style.textDecoration = 'line-through';
        taskContent.style.opacity = '0.7';
        showNotification(`任务完成: ${taskContent.textContent}`, 'success');
    } else {
        taskItem.classList.remove('completed');
        taskContent.style.textDecoration = 'none';
        taskContent.style.opacity = '1';
    }
    
    // 更新任务进度条
    updateTaskProgressBar(taskItem.closest('.detail-section'));
}

// 更新任务进度条
function updateTaskProgressBar(detailSection) {
    const taskList = detailSection.querySelector('.task-list');
    const taskProgressFill = detailSection.querySelector('.task-progress-fill');
    
    if (!taskList || !taskProgressFill) return;
    
    const totalTasks = taskList.querySelectorAll('li').length;
    const completedTasks = taskList.querySelectorAll('li.completed').length;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    taskProgressFill.style.width = `${completionRate}%`;
    
    // 更新标题中的完成数
    const title = detailSection.querySelector('h4');
    if (title) {
        title.innerHTML = `<i class="fas fa-tasks"></i> 任务列表 (${completedTasks}/${totalTasks} 完成)`;
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

// 全局函数导出
window.initEnhancedDashboard = initEnhancedDashboard;
window.toggleExpand = toggleExpand;
window.toggleTask = toggleTask;
window.showNotification = showNotification;
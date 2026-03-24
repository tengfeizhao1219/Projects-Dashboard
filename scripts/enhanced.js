// 增强版JavaScript - 最小化版本

// 初始化增强版主页面
function initEnhancedDashboard() {
    console.log("增强版主页面初始化...");
    
    // 创建英雄统计区域
    createHeroStats();
    
    // 创建项目卡片
    createProjectCards();
    
    // 创建时间线
    createTimeline();
    
    // 初始化API状态
    initAPIStatus();
    
    // 更新时间
    updateTime();
    
    console.log("增强版主页面初始化完成");
}

// 创建英雄统计区域
function createHeroStats() {
    const statsHTML = `
        <div class="hero-stats-enhanced">
            <div class="stat-card-enhanced card">
                <div class="stat-icon-enhanced"><i class="fas fa-project-diagram"></i></div>
                <div class="stat-value-enhanced">6</div>
                <div class="stat-label-enhanced">活跃项目</div>
                <div class="stat-trend-enhanced"><i class="fas fa-arrow-up trend-up-enhanced"></i><span>较上月 +2</span></div>
            </div>
            <div class="stat-card-enhanced card">
                <div class="stat-icon-enhanced"><i class="fas fa-chart-line"></i></div>
                <div class="stat-value-enhanced">68%</div>
                <div class="stat-label-enhanced">平均进度</div>
                <div class="stat-trend-enhanced"><i class="fas fa-arrow-up trend-up-enhanced"></i><span>较上周 +5%</span></div>
            </div>
            <div class="stat-card-enhanced card">
                <div class="stat-icon-enhanced"><i class="fas fa-tasks"></i></div>
                <div class="stat-value-enhanced">14</div>
                <div class="stat-label-enhanced">待完成任务</div>
                <div class="stat-trend-enhanced"><i class="fas fa-arrow-down trend-down-enhanced"></i><span>较上周 -3</span></div>
            </div>
            <div class="stat-card-enhanced card">
                <div class="stat-icon-enhanced"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-value-enhanced">3</div>
                <div class="stat-label-enhanced">当前卡点</div>
                <div class="stat-trend-enhanced"><i class="fas fa-minus"></i><span>与上周持平</span></div>
            </div>
        </div>
    `;
    
    const container = document.getElementById('heroStatsContainer');
    if (container) container.innerHTML = statsHTML;
}

// 创建项目卡片
function createProjectCards() {
    const projects = [
        { title: "可靠的每小时同步系统", progress: 95, icon: "fas fa-sync-alt" },
        { title: "项目管理系统增强版", progress: 85, icon: "fas fa-tasks" },
        { title: "超强记忆系统", progress: 75, icon: "fas fa-brain" },
        { title: "Scrapling数据采集系统", progress: 70, icon: "fas fa-spider" },
        { title: "SearXNG隐私搜索集成", progress: 65, icon: "fas fa-search" },
        { title: "技能审查系统", progress: 60, icon: "fas fa-shield-alt" }
    ];
    
    let projectsHTML = '<div class="projects-grid">';
    projects.forEach(project => {
        projectsHTML += `
            <div class="project-card-enhanced card">
                <div class="project-header-enhanced">
                    <div class="project-title-section">
                        <div class="project-title-main">
                            <i class="${project.icon}"></i> ${project.title}
                        </div>
                        <div class="project-subtitle">项目进度跟踪和管理</div>
                    </div>
                </div>
                <div class="progress-section">
                    <div class="progress-header">
                        <div class="progress-label">项目进度</div>
                        <div class="progress-value">${project.progress}%</div>
                    </div>
                    <div class="progress-bar-enhanced">
                        <div class="progress-fill-enhanced" style="width: ${project.progress}%"></div>
                    </div>
                </div>
            </div>
        `;
    });
    projectsHTML += '</div>';
    
    const container = document.getElementById('projectsContainer');
    if (container) container.innerHTML = projectsHTML;
}

// 创建时间线
function createTimeline() {
    const timelineHTML = `
        <div class="timeline-container">
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">今天 17:00</div>
                    <div class="timeline-text">测试主页面增强功能</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">今天 18:00</div>
                    <div class="timeline-text">验证API服务器稳定性</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-content">
                    <div class="timeline-date">明天 09:00</div>
                    <div class="timeline-text">优化移动端响应式设计</div>
                </div>
            </div>
        </div>
    `;
    
    const container = document.getElementById('recentTasksContainer');
    if (container) container.innerHTML = timelineHTML;
}

// 初始化API状态
function initAPIStatus() {
    const apiHTML = `
        <div class="api-status-card">
            <div class="api-status-indicator-main">
                <div class="api-status-dot-main"></div>
                <div class="api-status-text-main">实时数据API: <strong>已连接</strong></div>
            </div>
            <button class="api-test-btn" onclick="testAPI()">
                <i class="fas fa-bolt"></i> 测试连接
            </button>
        </div>
        <div class="data-source-info">
            <i class="fas fa-database"></i> 数据源: 可靠的每小时同步系统API
        </div>
    `;
    
    const container = document.getElementById('apiStatusContainer');
    if (container) container.innerHTML = apiHTML;
}

// 测试API
function testAPI() {
    alert('API连接测试功能');
}

// 更新时间
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
    
    const timeElement = document.getElementById('updateTime');
    if (timeElement) timeElement.textContent = timeStr;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initEnhancedDashboard);

// 导出函数
window.initEnhancedDashboard = initEnhancedDashboard;
window.testAPI = testAPI;

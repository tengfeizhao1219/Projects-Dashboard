#!/bin/bash
# 批量更新所有页面的导航栏

echo "开始批量更新导航栏..."

# 定义正确的导航栏HTML模板
get_navbar() {
    local active_page="$1"
    
    cat << NAVBAR
        <!-- 导航栏 -->
        <nav class="navbar">
            <div class="nav-brand">
                <i class="fas fa-rocket"></i>
                <span>项目管理系统</span>
                <span class="version-badge">v2.4</span>
            </div>
            <div class="nav-links">
                <a href="index.html" class="nav-link $( [ "$active_page" = "index" ] && echo "active" )">
                    <i class="fas fa-home"></i> 项目总览
                </a>
                <a href="sync-monitor-enhanced.html" class="nav-link $( [ "$active_page" = "sync-monitor" ] && echo "active" )">
                    <i class="fas fa-sync-alt"></i> 同步监控
                </a>
                <a href="project-details.html" class="nav-link $( [ "$active_page" = "project-details" ] && echo "active" )">
                    <i class="fas fa-info-circle"></i> 项目详情
                </a>
                <a href="sync-history.html" class="nav-link $( [ "$active_page" = "sync-history" ] && echo "active" )">
                    <i class="fas fa-history"></i> 同步历史
                </a>
                <a href="sync-control.html" class="nav-link $( [ "$active_page" = "sync-control" ] && echo "active" )">
                    <i class="fas fa-play-circle"></i> 手动触发
                </a>
                <a href="system-config.html" class="nav-link $( [ "$active_page" = "system-config" ] && echo "active" )">
                    <i class="fas fa-cog"></i> 系统配置
                </a>
                <a href="https://github.com/tengfeizhao1219/Projects-Dashboard" class="nav-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        </nav>
NAVBAR
}

# 更新文件函数
update_file_navbar() {
    local file="$1"
    local active_page="$2"
    
    if [ ! -f "$file" ]; then
        echo "⚠️ 文件不存在: $file"
        return
    fi
    
    echo "更新: $file (激活: $active_page)"
    
    # 获取正确的导航栏
    local navbar=$(get_navbar "$active_page")
    
    # 创建临时文件
    local temp_file="${file}.temp"
    
    # 复制文件开头到导航栏之前
    head -n 15 "$file" > "$temp_file"
    
    # 添加导航栏
    echo "$navbar" >> "$temp_file"
    
    # 跳过原导航栏部分，添加剩余内容
    # 找到导航栏结束位置
    local nav_end_line=$(grep -n '</nav>' "$file" | head -1 | cut -d: -f1)
    if [ -n "$nav_end_line" ]; then
        tail -n +$((nav_end_line + 1)) "$file" >> "$temp_file"
    else
        # 如果没有找到</nav>，从第30行开始（跳过原内容）
        tail -n +30 "$file" >> "$temp_file"
    fi
    
    # 替换原文件
    mv "$temp_file" "$file"
    
    echo "  ✅ $file 更新完成"
}

# 更新所有文件
update_file_navbar "index.html" "index"
update_file_navbar "sync-monitor-enhanced.html" "sync-monitor"
update_file_navbar "project-details.html" "project-details"
update_file_navbar "sync-history.html" "sync-history"
update_file_navbar "sync-control.html" "sync-control"
update_file_navbar "system-config.html" "system-config"

echo "所有页面导航栏更新完成！"

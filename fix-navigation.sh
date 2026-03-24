#!/bin/bash
# 修复导航栏顺序

echo "修复导航栏顺序..."

# 正确的导航栏HTML
NAVBAR_HTML='        <!-- 导航栏 -->
        <nav class="navbar">
            <div class="nav-brand">
                <i class="fas fa-rocket"></i>
                <span>项目管理系统</span>
                <span class="version-badge">v2.4</span>
            </div>
            <div class="nav-links">
                <a href="index.html" class="nav-link REPLACE_ACTIVE_1">
                    <i class="fas fa-home"></i> 项目总览
                </a>
                <a href="sync-monitor-enhanced.html" class="nav-link REPLACE_ACTIVE_2">
                    <i class="fas fa-sync-alt"></i> 同步监控
                </a>
                <a href="project-details.html" class="nav-link REPLACE_ACTIVE_3">
                    <i class="fas fa-info-circle"></i> 项目详情
                </a>
                <a href="sync-history.html" class="nav-link REPLACE_ACTIVE_4">
                    <i class="fas fa-history"></i> 同步历史
                </a>
                <a href="sync-control.html" class="nav-link REPLACE_ACTIVE_5">
                    <i class="fas fa-play-circle"></i> 手动触发
                </a>
                <a href="system-config.html" class="nav-link REPLACE_ACTIVE_6">
                    <i class="fas fa-cog"></i> 系统配置
                </a>
                <a href="https://github.com/tengfeizhao1219/Projects-Dashboard" class="nav-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        </nav>'

# 更新每个文件的导航栏
update_navbar() {
    local file="$1"
    local active_num="$2"
    
    echo "更新文件: $file (激活: $active_num)"
    
    # 备份
    cp "$file" "${file}.backup2"
    
    # 生成正确的导航栏HTML
    local navbar="$NAVBAR_HTML"
    
    # 设置正确的active状态
    for i in {1..6}; do
        if [ "$i" = "$active_num" ]; then
            navbar="${navbar//REPLACE_ACTIVE_$i/active}"
        else
            navbar="${navbar//REPLACE_ACTIVE_$i/}"
        fi
    done
    
    # 替换导航栏部分
    sed -i '/<nav class="navbar">/,/<\/nav>/c\'"$navbar" "$file"
    
    echo "  ✅ $file 更新完成"
}

# 更新所有文件
update_navbar "index.html" "1"
update_navbar "sync-monitor-enhanced.html" "2"
update_navbar "project-details.html" "3"
update_navbar "sync-history.html" "4"
update_navbar "sync-control.html" "5"
update_navbar "system-config.html" "6"

echo "导航栏修复完成！"

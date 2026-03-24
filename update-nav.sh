#!/bin/bash
# 更新导航栏脚本

# 备份原文件
cp index.html index-nav-updated.html

# 更新导航栏部分
sed -i '/<nav class="navbar">/,/<\/nav>/c\
        <!-- 导航栏 -->\
        <nav class="navbar">\
            <div class="nav-brand">\
                <i class="fas fa-rocket"></i>\
                <span>项目管理系统</span>\
                <span class="version-badge">v2.4</span>\
            </div>\
            <div class="nav-links">\
                <a href="index.html" class="nav-link active">\
                    <i class="fas fa-home"></i> 项目总览\
                </a>\
                <a href="sync-monitor-enhanced.html" class="nav-link">\
                    <i class="fas fa-sync-alt"></i> 同步监控\
                </a>\
                <a href="sync-history.html" class="nav-link">\
                    <i class="fas fa-history"></i> 同步历史\
                </a>\
                <a href="sync-control.html" class="nav-link">\
                    <i class="fas fa-play-circle"></i> 手动触发\
                </a>\
                <a href="system-config.html" class="nav-link">\
                    <i class="fas fa-cog"></i> 系统配置\
                </a>\
                <a href="https://github.com/tengfeizhao1219/Projects-Dashboard" class="nav-link" target="_blank">\
                    <i class="fab fa-github"></i> GitHub\
                </a>\
            </div>\
        </nav>' index-nav-updated.html

echo "导航栏更新完成"

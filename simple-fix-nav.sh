#!/bin/bash
# 简单修复导航栏

echo "简单修复导航栏..."

# 恢复备份文件
for file in index.html sync-monitor-enhanced.html project-details.html sync-history.html sync-control.html system-config.html; do
    if [ -f "${file}.backup" ]; then
        echo "恢复备份: $file"
        cp "${file}.backup" "$file"
    fi
done

# 现在手动修复index.html的导航栏
cat > index-fixed.html << 'HTMLEND'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>项目管理系统 - 增强版 v2.4</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/enhanced.css">
</head>
<body>
    <div class="container container-wide">
        <!-- 导航栏 -->
        <nav class="navbar">
            <div class="nav-brand">
                <i class="fas fa-rocket"></i>
                <span>项目管理系统</span>
                <span class="version-badge">v2.4</span>
            </div>
            <div class="nav-links">
                <a href="index.html" class="nav-link active">
                    <i class="fas fa-home"></i> 项目总览
                </a>
                <a href="sync-monitor-enhanced.html" class="nav-link">
                    <i class="fas fa-sync-alt"></i> 同步监控
                </a>
                <a href="project-details.html" class="nav-link">
                    <i class="fas fa-info-circle"></i> 项目详情
                </a>
                <a href="sync-history.html" class="nav-link">
                    <i class="fas fa-history"></i> 同步历史
                </a>
                <a href="sync-control.html" class="nav-link">
                    <i class="fas fa-play-circle"></i> 手动触发
                </a>
                <a href="system-config.html" class="nav-link">
                    <i class="fas fa-cog"></i> 系统配置
                </a>
                <a href="https://github.com/tengfeizhao1219/Projects-Dashboard" class="nav-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        </nav>
HTMLEND

# 添加index.html的剩余内容（从导航栏之后）
tail -n +30 index.html | head -n 1000 >> index-fixed.html

# 替换原文件
mv index-fixed.html index.html

echo "index.html导航栏修复完成"

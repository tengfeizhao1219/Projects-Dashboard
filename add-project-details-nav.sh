#!/bin/bash
# 添加项目详情页到导航栏

echo "开始更新导航栏，添加项目详情页链接..."

# 需要更新的文件列表
FILES="index.html sync-monitor-enhanced.html sync-history.html sync-control.html system-config.html project-details.html"

for file in $FILES; do
    if [ -f "$file" ]; then
        echo "更新文件: $file"
        
        # 备份原文件
        cp "$file" "${file}.backup"
        
        # 更新导航栏中的项目详情链接
        # 找到同步监控链接后面的位置，插入项目详情链接
        sed -i 's|<a href="sync-monitor-enhanced.html" class="nav-link">|<a href="sync-monitor-enhanced.html" class="nav-link">|' "$file"
        
        # 在同步监控后面添加项目详情链接
        sed -i '/<a href="sync-monitor-enhanced.html"/a\                <a href="project-details.html" class="nav-link">\
                    <i class="fas fa-info-circle"></i> 项目详情\
                </a>' "$file"
        
        # 更新当前页面的active状态
        if [[ "$file" == "project-details.html" ]]; then
            sed -i 's|<a href="project-details.html" class="nav-link">|<a href="project-details.html" class="nav-link active">|' "$file"
        else
            sed -i 's|<a href="project-details.html" class="nav-link active">|<a href="project-details.html" class="nav-link">|' "$file"
        fi
        
        echo "  ✅ $file 更新完成"
    else
        echo "  ⚠️ 文件不存在: $file"
    fi
done

echo "导航栏更新完成！"

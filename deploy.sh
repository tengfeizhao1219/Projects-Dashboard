#!/bin/bash

# 项目管理系统部署脚本
# 将项目部署到GitHub Pages

echo "🚀 开始部署项目管理系统到GitHub Pages..."

# 检查是否在正确的目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

# 初始化Git仓库（如果不存在）
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    git branch -M main
fi

# 添加远程仓库（如果不存在）
REMOTE_URL="https://github.com/tengfeizhao1219/projects-dashboard.git"
if ! git remote | grep -q origin; then
    echo "🔗 添加远程仓库: $REMOTE_URL"
    git remote add origin "$REMOTE_URL"
fi

# 拉取最新更改（如果仓库已存在）
echo "📥 拉取最新更改..."
git pull origin main --allow-unrelated-histories 2>/dev/null || echo "首次提交，跳过拉取"

# 添加所有文件
echo "📁 添加文件到Git..."
git add .

# 提交更改
COMMIT_MSG="更新项目管理系统 - $(date '+%Y年%m月%d日 %H:%M:%S')"
echo "💾 提交更改: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 推送到GitHub
echo "🚀 推送到GitHub..."
git push -u origin main

echo ""
echo "✅ 部署完成！"
echo ""
echo "📊 访问地址: https://tengfeizhao1219.github.io/projects-dashboard/"
echo ""
echo "🔧 后续操作:"
echo "1. 访问 https://github.com/tengfeizhao1219/projects-dashboard"
echo "2. 进入 Settings → Pages"
echo "3. 确保分支设置为 'main'，文件夹为 '/'"
echo "4. 保存设置，等待部署完成（约1-2分钟）"
echo ""
echo "🔄 自动更新: 此页面会自动更新时间和模拟数据更新"
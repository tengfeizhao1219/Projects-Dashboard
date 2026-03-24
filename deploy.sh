#!/bin/bash
# Projects Dashboard 部署脚本

echo "🚀 Projects Dashboard 部署脚本"
echo "================================"

# 检查当前目录
if [ ! -f "index.html" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    exit 1
fi

echo "✅ 项目文件检查通过"

# 添加所有文件
echo "📝 添加文件到Git..."
git add .

# 提交更改
COMMIT_MSG="自动更新: $(date '+%Y-%m-%d %H:%M:%S')"
if [ $# -eq 1 ]; then
    COMMIT_MSG="$1"
fi

echo "💾 提交更改: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 推送到GitHub
echo "🚀 推送到GitHub..."
git push origin main

echo ""
echo "✅ 部署完成！"
echo ""
echo "🌐 访问地址:"
echo "   1. GitHub仓库: https://github.com/tengfeizhao1219/Projects-Dashboard"
echo "   2. GitHub Pages: https://tengfeizhao1219.github.io/Projects-Dashboard/"
echo ""
echo "📊 页面导航:"
echo "   • 项目总览: index.html"
echo "   • 同步监控: sync-monitor.html"
echo ""
echo "🔧 GitHub Pages配置:"
echo "   如果页面无法访问，请检查:"
echo "   Settings → Pages → Branch: main → Folder: / (root)"
echo "   然后点击 Save，等待部署完成（约1-2分钟）"

# 检查GitHub Pages状态
echo ""
echo "🔄 检查GitHub Pages状态..."
sleep 3
curl -s "https://tengfeizhao1219.github.io/Projects-Dashboard/" | grep -q "<title>" && echo "✅ GitHub Pages 已可访问" || echo "⚠️  GitHub Pages 可能还未部署完成，请稍后访问"
# 日历应用项目文档

## 项目概述

这是一个基于Next.js框架开发的简单日历应用，允许用户查看日历、添加和删除事件。应用采用了现代化的React技术栈，使用TypeScript进行类型检查，并使用TailwindCSS进行样式设计。

### 技术栈

- **前端框架**: Next.js 15.3.1
- **UI库**: React 19.0.0
- **语言**: TypeScript
- **样式**: TailwindCSS 4
- **数据存储**: 本地存储 (localStorage)

## 项目结构

```
calendar-app/
├── app/                    # Next.js应用目录
│   ├── favicon.ico         # 网站图标
│   ├── globals.css         # 全局CSS样式
│   ├── layout.tsx          # 应用布局组件
│   └── page.tsx            # 主页面组件
├── components/             # React组件
│   ├── Calendar.tsx        # 日历组件
│   └── EventModal.tsx      # 事件模态框组件
├── public/                 # 静态资源
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── utils/                  # 工具函数
│   └── date.ts             # 日期相关工具函数
├── .gitignore              # Git忽略文件
├── next.config.ts          # Next.js配置
├── package.json            # 项目依赖
├── postcss.config.mjs      # PostCSS配置
├── README.md               # 项目说明
└── tsconfig.json           # TypeScript配置
```

## 核心功能

1. **日历视图**: 显示月历视图，可以前后切换月份
2. **事件管理**: 添加和删除日历事件
3. **本地存储**: 使用浏览器localStorage保存事件数据
4. **响应式设计**: 适配不同屏幕尺寸

## 组件详解

### 1. 主页面 (app/page.tsx)

主页面是应用的入口点，包含以下功能：

- 初始化和管理事件状态
- 从localStorage加载和保存事件数据
- 处理日期点击事件
- 管理事件模态框的显示状态
- 提供事件的添加和删除功能

```typescript
// 事件接口定义
export interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
}
```

### 2. 日历组件 (components/Calendar.tsx)

日历组件负责显示月历视图，具有以下功能：

- 显示当前月份的日历
- 支持月份切换
- 高亮显示今天的日期
- 标记有事件的日期
- 处理日期点击事件

关键实现：
- 使用`getDaysInMonth`函数获取当月所有日期
- 计算月份第一天是星期几，以正确对齐日历网格
- 使用网格布局(grid)显示日历

### 3. 事件模态框 (components/EventModal.tsx)

事件模态框用于添加和管理特定日期的事件，功能包括：

- 显示选定日期的所有事件
- 提供添加新事件的表单
- 支持删除现有事件
- 模态框的打开和关闭

### 4. 日期工具函数 (utils/date.ts)

提供日期相关的工具函数：

- `getDaysInMonth`: 获取指定年月的所有日期
- `getToday`: 获取当前日期的年、月、日
- `isSameDay`: 判断两个日期是否为同一天

## 数据流

1. 用户打开应用 → 从localStorage加载事件数据
2. 用户点击日期 → 打开事件模态框
3. 用户添加/删除事件 → 更新状态 → 保存到localStorage
4. 用户切换月份 → 更新日历视图

## 样式设计

应用使用TailwindCSS进行样式设计，主要特点：

- 使用Geist字体作为默认字体
- 支持亮色/暗色模式切换
- 使用响应式设计适配不同屏幕尺寸
- 简洁现代的UI设计

## 项目依赖

主要依赖包括：

```json
"dependencies": {
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "next": "15.3.1"
},
"devDependencies": {
  "typescript": "^5",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@tailwindcss/postcss": "^4",
  "tailwindcss": "^4"
}
```

## 未来改进方向

1. **添加用户认证**: 实现多用户支持，每个用户有自己的事件数据
2. **云端存储**: 将事件数据存储在云端，支持跨设备同步
3. **事件分类**: 支持不同类型的事件，使用不同颜色标记
4. **重复事件**: 支持创建重复性事件(每日、每周、每月等)
5. **提醒功能**: 添加事件提醒功能
6. **拖拽支持**: 允许通过拖拽调整事件日期
7. **日/周/月视图**: 增加不同的日历视图模式
8. **国际化支持**: 添加多语言支持

## 总结

这个日历应用是一个功能简洁但完整的Web应用，展示了现代前端技术栈的使用。它使用Next.js框架提供良好的开发体验和性能优化，使用TypeScript确保代码质量，并通过TailwindCSS实现美观的UI设计。

应用的核心功能围绕日历事件的管理，通过localStorage实现了简单的数据持久化。虽然功能相对基础，但提供了良好的用户体验和清晰的代码结构，为未来的功能扩展奠定了基础。

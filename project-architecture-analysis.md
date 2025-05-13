# 日历应用项目架构分析

## 1. 技术栈:

- **核心框架**: Next.js 15.3.1 (利用其 App Router 进行页面路由和布局)
- **UI 库**: React 19.0.0 (用于构建可复用的用户界面组件)
- **编程语言**: TypeScript (提供静态类型检查，增强代码健壮性)
- **样式方案**: Tailwind CSS 4 (一个工具优先的 CSS 框架，用于快速构建自定义界面)
- **构建工具**: Turbopack (在开发模式下 `next dev --turbopack` 使用，旨在提高构建速度)
- **数据存储**: 浏览器 `localStorage` (用于在客户端持久化用户的日历事件数据)

## 2. 项目结构与核心组件:

项目遵循 Next.js 的标准项目结构，主要包含以下几个部分：

- **`app/` 目录**: Next.js App Router 的核心目录。
  - `layout.tsx`: 定义应用的全局布局，可能包含通用的导航栏、页脚等。
  - `page.tsx`: 应用的主页面/入口点。根据文档，它负责：
    - 管理事件相关的状态。
    - 从 `localStorage` 加载和保存事件数据。
    - 处理日期点击事件，并管理事件模态框的显示。
    - 提供事件的添加和删除逻辑。
  - `globals.css`: 全局 CSS 样式。
- **`components/` 目录**: 存放可复用的 React 组件。
  - `Calendar.tsx`: 核心日历组件，负责：
    - 显示月历视图。
    - 支持月份切换（上个月/下个月）。
    - 高亮显示当前日期。
    - 标记包含事件的日期。
    - 响应用户的日期点击操作。
  - `EventModal.tsx`: 事件模态框组件，用于：
    - 显示特定日期的事件列表。
    - 提供添加新事件的表单。
    - 允许用户删除已存在的事件。
    - 控制模态框的打开与关闭。
- **`utils/` 目录**: 存放工具函数。
  - `date.ts`: 包含日期处理相关的辅助函数，例如：
    - `getDaysInMonth`: 获取指定月份的天数。
    - `getToday`: 获取当前日期。
    - `isSameDay`: 判断两个日期是否为同一天。
- **`public/` 目录**: 存放静态资源，如图片、SVG 图标等。

## 3. 数据流:

应用的数据流相对简单，主要围绕用户交互和 `localStorage`：

1.  **初始化**: 用户打开应用时，`app/page.tsx` 从 `localStorage` 加载已保存的事件数据到应用状态中。
2.  **用户交互 (查看日历)**:
    - `Calendar.tsx` 组件根据当前月份和从 `app/page.tsx` 传入的事件数据渲染日历视图。
    - 用户可以切换月份，`Calendar.tsx` 会重新渲染。
3.  **用户交互 (管理事件)**:
    - 用户点击 `Calendar.tsx` 中的某个日期。
    - `app/page.tsx` 接收到日期点击事件，打开 `EventModal.tsx` 并传入选定日期和相关事件。
    - 用户在 `EventModal.tsx` 中添加或删除事件。
    - 这些操作会更新 `app/page.tsx` 中的应用状态。
    - 状态更新后，`app/page.tsx` 将最新的事件数据保存回 `localStorage`。
4.  **视图更新**: 状态的改变会触发 React 组件的重新渲染，从而更新用户界面。

## 4. 整体架构图 (概念性):

```mermaid
graph TD
    subgraph Browser
        localStorage[("localStorage (事件数据)")]
    end

    subgraph Next.js App
        A[app/page.tsx (主页面)] --> B[components/Calendar.tsx (日历组件)]
        A --> C[components/EventModal.tsx (事件模态框)]
        B -- 日期点击 --> A
        C -- 添加/删除事件 --> A
        A -- 加载/保存事件 --> localStorage
        U[utils/date.ts (日期工具)] --> B
        U --> A
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#ccf,stroke:#333,stroke-width:2px
    style C fill:#cfc,stroke:#333,stroke-width:2px
    style U fill:#ff9,stroke:#333,stroke-width:2px
    style localStorage fill:#ddd,stroke:#333,stroke-width:2px
```

## 总结:

该项目是一个结构清晰、功能简洁的客户端日历应用。它利用 Next.js 的 App Router 进行页面组织，通过 React 组件化构建用户界面，使用 TypeScript 保证代码质量，并借助 Tailwind CSS 实现样式。事件数据通过 `localStorage` 进行本地持久化。核心逻辑集中在 `app/page.tsx`，它作为协调者管理状态和与 `localStorage` 的交互，并将数据和功能传递给 `Calendar` 和 `EventModal` 这两个主要的功能组件。`utils/date.ts` 提供日期相关的辅助功能。

这个架构对于小型到中型的单用户日历应用是合适的。文档中也提到了未来的改进方向，如用户认证和云端存储，这些将会使架构变得更加复杂。

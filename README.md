# 💊 AI 药品比价管家

> 拍照处方单，AI 识别药品并跨平台比价，推荐最优购药方案

## 🎯 解决的问题

药品价格不透明，消费者无法快速比较线上线下渠道价格差异。慢性病患者、家庭用药管理者需要一个便捷工具来管理用药和比价。

## ✨ 核心功能

- **📷 处方识别** - 拍照上传处方单，AI 自动识别药品名称、规格、用法
- **💰 多平台比价** - 美团买药、京东健康、阿里健康、线下药房一键比价
- **⏰ 用药提醒** - 设置定时提醒，不忘每一次用药

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动服务
npm start

# 访问
open http://localhost:3000
```

## 📡 API 接口

### 处方识别
```
POST /api/ocr/prescription
Body: { "image": "<base64>" }
Response: { "success": true, "data": { "drugs": [...], "confidence": 0.95 } }
```

### 药品比价
```
POST /api/compare
Body: { "drugs": ["阿莫西林胶囊", "布洛芬缓释胶囊"] }
Response: { "success": true, "data": { "drugs": [...], "summary": {...} } }
```

### 用药提醒 CRUD
```
GET    /api/reminders          - 获取所有提醒
POST   /api/reminders          - 创建提醒
PUT    /api/reminders/:id      - 更新提醒
DELETE /api/reminders/:id      - 删除提醒
```

## 🏗️ 技术栈

- **后端**: Node.js + Express
- **数据库**: SQLite (better-sqlite3)
- **前端**: HTML + Tailwind CSS (单页应用)
- **OCR**: 腾讯云 OCR API (当前为 Mock 模式)
- **比价**: 多平台爬虫 (当前为 Mock 模式)

## 📁 项目结构

```
├── src/
│   ├── index.js              # 入口文件
│   ├── db/
│   │   └── init.js           # 数据库初始化
│   ├── routes/
│   │   ├── ocr.js            # 处方识别路由
│   │   ├── compare.js        # 比价路由
│   │   └── reminders.js      # 提醒 CRUD 路由
│   └── services/
│       ├── ocr.js            # OCR 服务 (Mock)
│       └── priceCompare.js   # 比价服务 (Mock)
├── public/
│   └── index.html            # 前端单页应用
├── data/                     # SQLite 数据库文件
├── package.json
└── README.md
```

## 💡 商业化方向

- 药房 CPS 佣金
- 会员订阅（家庭健康档案）
- 保险导流

## 🌊 为什么是现在

国务院刚发布药品价格透明14条新政，美团推出AI健康管家，政策+市场双顺风。

---

> ⚠️ 当前为 MVP Demo，所有数据为模拟数据。生产部署需接入真实 OCR API 和比价数据源。

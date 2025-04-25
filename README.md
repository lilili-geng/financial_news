# 项目名称

此项目使用 TypeScript 构建，并通过 Playwright 进行数据抓取。

## 项目安装与启动

### 1. 克隆项目

首先，克隆项目到本地：

```bash
git clone https://github.com/lilili-geng/financial_news.git
```

### 2. 进入项目目录

```bash
cd financial_news
yarn install
yarn dev
```

### 3.项目结构

```bash
financial_news/
├── src/                # 项目源码目录
│   ├─config
    ├─controller
    ├─grab
    ├─interface
    ├─log
    ├─model
    ├─router
    └─utils   
    └─index.ts          # 项目入口文件       
├── package.json        # 项目配置文件
├── yarn.lock           # 依赖锁定文件
└── README.md           # 项目说明文件
```

#### 4.使用 Playwright 进行数据抓取

#### Playwright 文档地址:https://playwright.nodejs.cn/docs/intro#google_vignette

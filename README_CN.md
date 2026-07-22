<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 macOS 桌面客户端</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-macOS-blue?style=flat-square&logo=apple" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-1.1.3-green?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/Electron-36-47848F?style=flat-square&logo=electron" alt="Electron" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License" />
  </p>
</div>

---

## 📖 简介

PaperPhonePlus Desktop 是 [Paperphone-plus](https://github.com/619dev/Paperphone-plus) 的 macOS 桌面客户端版本，基于 Electron 构建。它将原项目的 React 前端封装为原生桌面应用，提供完整的即时通讯功能，并内置网络代理支持。

## ✨ 功能特性

### 💬 即时通讯
- 私聊 & 群聊，支持文字、图片、视频、文件、语音消息
- 一对一视频/语音通话
- 基于 LiveKit SFU 的群组视频会议，支持最高 100 人
- 视频网格、参会者列表、发言状态及摄像头/静音状态显示
- 主席全员静音，以及讲课模式与自由讨论模式
- 朋友圈（Moments）动态发布与浏览
- 联系人管理、扫码添加好友

### 🔐 端对端加密
- **E2EE（端对端加密）**：所有消息在发送前加密，服务器无法读取
- **前向保密（Forward Secrecy）**：基于 Double Ratchet 算法，每条消息使用不同密钥
- **抗量子加密**：集成 CRYSTALS-Kyber 后量子密钥封装，抵御量子计算攻击
- **加密库**：libsodium (X25519, XSalsa20-Poly1305, Ed25519)

### 🌐 网络代理
- 支持 **SOCKS5**、**HTTP**、**HTTPS** 代理协议
- 系统级透明代理 — 所有 HTTP 和 WebSocket 流量自动走代理
- 多代理配置管理，一键切换
- 代理延迟测试
- 配置持久化，重启自动恢复

### 🖥️ 桌面特性
- macOS Universal Binary（同时支持 Intel 和 Apple Silicon）
- Telegram 风格桌面横屏布局（左侧边栏 + 右侧主面板）
- 侧边栏宽度可拖拽调整（280px–480px）
- 窗口位置 & 大小记忆
- 外部链接自动在系统浏览器中打开
- 暗色模式支持

## 📦 安装

### 从 Release 下载

前往 [Releases](../../releases) 页面下载安装包：

| 文件 | 说明 |
|------|------|
| `PaperPhonePlus-1.1.3-macOS.dmg` | 推荐：DMG 安装镜像（Universal） |
| `PaperPhonePlus-1.1.3-universal-mac.zip` | ZIP 压缩包 |

当前安装包同时支持 Intel 和 Apple Silicon Mac，并使用 Developer ID 签名。由于 1.1.3 尚未进行 Apple 公证，如果 Gatekeeper 阻止首次启动，请在 Finder 中按住 Control 点击应用，选择“打开”，再确认启动。

## 🎥 视频会议

1. 进入群聊，点击语音会议或视频会议按钮。
2. 首次使用时，按 macOS 提示授予麦克风和摄像头权限。
3. 群主作为会议主席，可以执行全员静音，并在讲课模式与自由讨论模式之间切换。
4. 讲课模式下，普通参会者默认保持静音；切回自由讨论模式后可自行解除静音。

群组会议使用 LiveKit SFU。Mac 客户端必须连接到包含 `/api/calls/meeting-token` 接口的新版 Paperphone-plus 服务端。服务端生产环境需配置：

```text
LIVEKIT_URL=wss://meeting.example.com
LIVEKIT_API_KEY=<API key>
LIVEKIT_API_SECRET=<至少 32 字节的 secret>
```

LiveKit 与 Paperphone-plus 服务端必须使用相同的 key 和 secret。生产环境还需开放 TCP 7881 和 UDP 7882；复杂网络环境建议配置 TURN/TLS。

### 从源码构建

#### 环境要求

- Node.js >= 18
- npm >= 9
- macOS 系统

#### 步骤

```bash
# 克隆仓库
git clone https://github.com/619dev/ppp-mac.git
cd ppp-mac

# 安装依赖
npm install

# 开发模式（Vite 热重载 + Electron）
npm run dev:electron

# 构建生产版本
npm run build

# 打包 macOS 安装包
npm run build:mac
```

## 🔧 代理配置

1. 打开应用，进入登录页面
2. 点击代理设置图标
3. 添加代理节点（支持 SOCKS5 / HTTP / HTTPS）
4. 填写主机、端口、用户名（可选）、密码（可选）
5. 激活代理并测试连接

代理通过 Electron 的 `session.setProxy()` API 实现，对所有网络请求（包括 WebSocket）透明生效。

## 🏗️ 技术架构

```
┌─────────────────────────────────────────┐
│            Electron Main Process         │
│  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│  │  Proxy  │  │  Window  │  │  IPC   │ │
│  │ Manager │  │ Manager  │  │Handler │ │
│  └─────────┘  └──────────┘  └────────┘ │
│       ↕ session.setProxy()    ↕ IPC     │
├─────────────────────────────────────────┤
│          Preload (contextBridge)         │
├─────────────────────────────────────────┤
│          Renderer (React 19 + Vite)      │
│  ┌──────┐ ┌───────┐ ┌──────┐ ┌──────┐ │
│  │Login │ │ Chats │ │Calls │ │Moments│ │
│  └──────┘ └───────┘ └──────┘ └──────┘ │
│  ┌─────────────────────────────────┐   │
│  │  Crypto (libsodium + Kyber)     │   │
│  │  Double Ratchet + E2EE          │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### 技术栈

| 层级 | 技术 |
|------|------|
| 桌面框架 | Electron 36 |
| 前端框架 | React 19 + TypeScript 5.7 |
| 构建工具 | Vite 6 |
| 状态管理 | Zustand 5 |
| 视频会议 | LiveKit Client 2.20（SFU） |
| 加密 | libsodium-wrappers-sumo + crystals-kyber-js |
| 打包 | electron-builder |
| 持久化 | electron-store |

## 📁 项目结构

```
├── electron/
│   ├── main.ts          # 主进程：窗口、代理、IPC
│   └── preload.ts       # 预加载：安全 API 桥接
├── src/
│   ├── api/             # HTTP、WebSocket、代理桥接
│   ├── components/      # UI 组件
│   ├── contexts/        # React Context（通话等）
│   ├── crypto/          # E2EE 加密模块
│   ├── hooks/           # 自定义 Hooks
│   ├── i18n/            # 国际化
│   ├── pages/           # 页面组件
│   ├── store/           # Zustand 状态管理
│   ├── utils/           # 工具函数
│   ├── App.tsx          # React 根组件
│   ├── electron.d.ts    # Electron API 类型声明
│   ├── index.css        # 全局样式
│   ├── main.tsx         # React 入口
│   └── vite-env.d.ts    # Vite 类型声明
├── build/               # 应用图标资源
├── electron-builder.yml # 打包配置
├── tsconfig.electron.json # Electron TypeScript 配置
├── vite.config.ts       # Vite 构建配置
└── package.json         # 项目配置
```

## 📄 许可证

本项目基于 [Paperphone-plus](https://github.com/619dev/Paperphone-plus) 开发，采用 [AGPL-3.0](LICENSE) 许可证发布。

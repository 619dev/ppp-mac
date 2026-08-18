<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 macOS 桌面客户端</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-macOS-blue?style=flat-square&logo=apple" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-.4.7-green?style=flat-square" alt="Version" />
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

### 🆕 2.4.6 更新

- 文本外观现已明确定位为原有端对端加密之上的额外保险：消息正文先由共享额外密码加密并转换为所选外观，再进入私聊 E2EE（X25519 / ML-KEM-768）或群聊 Sender Key 加密链路。
- 私聊双方或群内所有成员需要自行约定并设置相同的额外密码；密码不会上传服务器或自动同步。
- 密码不一致时，原有 E2EE 和消息送达仍正常，但接收方只能看到文本外观密文，无法查看原文。
- 该功能不会替代、绕过或降级原有 E2EE；个人信息 > 消息隐私页面的 8 种语言说明已同步更新。

### 🆕 2.4.5 更新

- 修复 macOS 桌面端“个人信息 > 消息隐私”中“开启额外加密”按钮点击无反应的问题
- 启用、解锁和关闭额外加密现统一使用应用内密码弹窗，不再依赖 Electron 不支持的原生 `prompt()`

### 2.4.4 更新

- 修复额外加密锁定状态下错误显示“设置密码”的问题；现在显示“输入解锁密码”，并同步全部 8 种语言。

- 修复关闭额外文本外观加密时未验证密码的安全问题；现在即使已解锁，也必须重新输入正确的额外密码才能关闭。
- 文本外观现已隐藏协议元数据，发送中的本地缓存不再保留消息原文。
- 额外聊天记录加密已移至个人信息 > 消息隐私，并全局应用于所有聊天。

- 加密失败时停止发送且不再回退明文，消息显示实际协议版本
- 新增额外聊天记录密码、8 种文本外观编码及 5/15/30/60 分钟后台自动锁定
- 未正确解锁时仅显示外观密文；私钥与 Sender Key 使用 macOS 安全存储保护，8 种语言文案完整同步

### 🆕 2.4.0 更新
- 修复历史单向好友记录导致“已是好友”但联系人不可见的问题；再次添加时会自动刷新联系人列表

### 🆕 2.3.8 更新
- 修复首次安装或保留登录态升级后缺少本地身份密钥时无法启动的问题
- 修复安全存储迁移中断留下无效数据后反复启动失败的问题
- 关闭二维码扫描器时可靠释放摄像头，并修复返回按钮的点击层级
- 好友搜索结果会标记已有好友，避免重复发送好友申请

### 2.3.5 更新
- 使用 macOS 系统安全存储保护设备密钥、身份私钥和群聊 Sender Keys
- 本地聊天记录使用账户与用途绑定的认证加密，密文保存至独立 IndexedDB
- 聊天明文仅保留在运行内存中，持久化前移除解密字段
- 自动迁移并删除旧版 localStorage、sessionStorage 和 IndexedDB 中的明文密钥及聊天缓存
- 清理旧版未加密媒体缓存；损坏或遭篡改的缓存会被安全丢弃

### 2.3.1 更新
- 新增刷新令牌持久化与访问令牌自动续期，减少短期令牌过期导致的重复登录
- 增强 WebSocket 鉴权、心跳检测与指数退避重连，并在网络恢复、页面唤醒或应用回到前台时主动恢复连接
- 重连成功后自动同步漏收消息，按服务端序列号去重并更新本地同步游标
- 新增持久化发送队列、客户端消息 ID 和送达确认，离线消息可在恢复连接后可靠重发

### 2.2.9 更新
- 新增贴纸包列表及内容的本地持久化缓存，服务异常或离线时仍可加载已缓存贴纸
- 新增独立的贴纸媒体缓存，按稳定的 `file_id` 复用静态、动态及视频贴纸
- 发送贴纸前完成本地缓存，并统一聊天消息与贴纸面板的缓存渲染逻辑
- 清理离线缓存时同步移除贴纸媒体缓存

### 2.2.8 更新
- 新增消息引用回复，可在私聊和群聊中查看被引用消息
- 一对一语音及视频通话全面迁移至 LiveKit SFU
- 优化通话响铃、接听、重连、挂断和媒体轨道生命周期处理
- 补充消息引用相关的多语言文案，并完善资料页的推送权限提示

### 1.1.8 更新
- 优化聊天输入区布局，支持输入框随多行内容自动扩展
- 调整语音、表情、更多附件和发送按钮的交互与排列
- 修复一对一语音及视频通话中远端音频可能无法播放的问题
- 修复通话期间切换正常、慢速和快速变声模式不生效的问题
- 优化视频通话中的联系人信息显示，避免遮挡远端画面

### 1.1.7 更新
- 修复重连后离线缓存消息重复推送导致未读数字反复增加的问题
- 仅在新消息真正写入本地缓存时增加未读数并触发通知
- 修复从通知或深链接直接进入聊天时未读数字未清除的问题

### 1.1.6 更新
- 修复一对一视频通话中本地及远端画面未正确挂载的问题
- 修复中文输入法组合输入时用户名搜索失效或使用旧文本的问题
- 优化登录会话处理，临时网络或鉴权异常不再错误清除本地登录状态
- 新增好友、群组、消息、朋友圈和时间线的离线缓存
- 新增设置页面缓存清理入口

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

## 🔐 额外加密文本外观：工作原理与安全边界

这项功能是**建立在原有端到端加密（E2EE）之上的额外保险**，不是用文本外观代替 E2EE，也不会绕过或降低原有加密。私聊仍由 X25519 / ML-KEM-768 密钥协商及原有消息加密链路保护；群聊仍使用 Sender Key 协议。身份私钥和群聊 Sender Key 继续由 macOS 系统安全存储保护。

启用后，每条消息按以下顺序处理：

1. 发送方先用双方或群内全员约定的额外密码处理消息正文。密码通过 PBKDF2-SHA-256（210,000 次迭代及随机盐）派生 AES-256-GCM 密钥；每条消息使用独立随机 IV，并通过认证标签校验完整性。
2. 额外加密后的完整数据帧（版本、盐、IV 和密文）再转换成所选的 8 种文本外观之一。这不是单纯替换字符的装饰效果，外观字符实际承载的是额外加密密文。
3. 该外观密文随后才进入项目原有加密链路：私聊使用 E2EE，群聊使用 Sender Key；服务器接收到的仍是原有 E2EE／Sender Key 密文及投递所需元数据。
4. 接收端执行相反流程：先用原有 E2EE／Sender Key 解密消息，再还原文本外观数据，并用额外密码解密出正文。

额外密码不会上传、自动同步或由服务器分发。私聊双方必须设置相同密码；群聊中希望阅读正文的所有成员也必须设置相同密码。文本外观不需要一致：每条消息都会携带自己的外观类型标记，接收端会自动识别并还原发送方选择的外观。例如一方发送“与佛论禅”、另一方发送“韩文”，只要额外密码相同，双方都能正常解密；每个人的外观设置只决定自己发出的密文样式。密码缺失、仍处于锁定状态或密码不一致时，消息依然能够正常发送、接收并完成原有 E2EE 解密，但应用只能显示文本外观密文，无法显示原文。

应用不会持久保存额外密码：解锁后密码只保留在当前运行内存中，本地仅保存随机盐和用于验证密码是否正确的 AES-GCM 验证数据。用户可以立即锁定，也可在应用离开前台 5、15、30 或 60 分钟后自动锁定。此额外层用于在原有 E2EE 之外增加一个独立的共享秘密；它不能替代强密码、设备锁、系统安全存储，也不能在设备已被完全控制且密码仍驻留内存时提供绝对保护。

## 📦 安装

### 从 Release 下载

前往 [Releases](../../releases) 页面下载安装包：

| 文件 | 说明 |
|------|------|
| `PaperPhonePlus-2.4.5-macOS.dmg` | 推荐：DMG 安装镜像（Universal） |
| `PaperPhonePlus-2.4.5-universal-mac.zip` | ZIP 压缩包 |

当前安装包同时支持 Intel 和 Apple Silicon Mac，并已使用 Apple Developer ID 证书签名；当前构建尚未装订 Apple 公证票据。如果 Gatekeeper 阻止首次启动，请在 Finder 中按住 Control 点击应用，选择“打开”，再确认启动。

## 🎥 视频会议

1. 进入群聊，点击语音会议或视频会议按钮。
2. 首次使用时，按 macOS 提示授予麦克风和摄像头权限。
3. 群主作为会议主席，可以执行全员静音，并在讲课模式与自由讨论模式之间切换。
4. 讲课模式下，普通参会者默认保持静音；切回自由讨论模式后可自行解除静音。

群组会议及一对一通话均使用 LiveKit SFU。Mac 客户端必须连接到包含 `/api/calls/meeting-token` 和 `/api/calls/direct-token` 接口的新版 Paperphone-plus 服务端。服务端生产环境需配置：

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

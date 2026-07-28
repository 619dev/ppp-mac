<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>End-to-End Encrypted Messaging macOS Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-macOS-blue?style=flat-square&logo=apple" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.2.9-green?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/Electron-36-47848F?style=flat-square&logo=electron" alt="Electron" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License" />
  </p>
</div>

---

## 📖 Introduction

PaperPhonePlus Desktop is the macOS desktop client of [Paperphone-plus](https://github.com/619dev/Paperphone-plus), built with Electron. It wraps the original React frontend into a native desktop application with full instant messaging capabilities and built-in network proxy support.

## ✨ Features

### 🆕 What's New in 2.2.9
- Added persistent local caching for sticker-pack lists and contents, retaining cached stickers during server failures or offline sessions
- Added a dedicated media cache that reuses static, animated, and video stickers by stable `file_id`
- Stickers are cached before sending, with shared cached rendering in messages and the sticker picker
- Clearing offline data now also removes the sticker media cache

### What's New in 2.2.8
- Added quoted-message replies in private and group chats
- Migrated one-on-one voice and video calls to the LiveKit SFU
- Improved ringing, answering, reconnection, hang-up, and media-track lifecycle handling
- Added localized quoted-message text and improved push-permission guidance in Profile

### What's New in 1.1.8
- Improved the chat composer layout with automatic multiline expansion
- Refined the voice, emoji, attachment, and send-button interactions
- Fixed missing remote audio in one-on-one voice and video calls
- Fixed switching between normal, slow, and fast voice effects during a call
- Made contact information less intrusive over remote video

### What's New in 1.1.7
- Fixed unread counters increasing repeatedly when cached offline messages are replayed after reconnecting
- Unread counts and notifications now trigger only when a message is actually added to the local cache
- Fixed unread counters not clearing when opening a chat directly from a notification or deep link

### What's New in 1.1.6
- Fixed local and remote video attachment in one-on-one calls
- Fixed username searches while composing Chinese text with an IME
- Improved session handling so temporary network or authorization failures do not incorrectly clear local login state
- Added offline caching for contacts, groups, messages, Moments, and Timeline
- Added a cache cleanup option to Settings

### 💬 Instant Messaging
- Private & group chat with text, images, videos, files, and voice messages
- One-on-one video and voice calls
- LiveKit SFU group video meetings for up to 100 participants
- Video grid, participant panel, active-speaker and media-state indicators
- Host controls for mute-all, lecture mode, and open discussion
- Moments (timeline) posting and browsing
- Contact management, QR code friend requests

### 🔐 End-to-End Encryption
- **E2EE**: All messages encrypted before sending; the server cannot read them
- **Forward Secrecy**: Based on the Double Ratchet algorithm, each message uses a unique key
- **Post-Quantum Encryption**: Integrated CRYSTALS-Kyber for resistance against quantum computing attacks
- **Crypto Library**: libsodium (X25519, XSalsa20-Poly1305, Ed25519)

### 🌐 Network Proxy
- Supports **SOCKS5**, **HTTP**, and **HTTPS** proxy protocols
- System-level transparent proxy — all HTTP and WebSocket traffic automatically routed through proxy
- Multiple proxy profile management with one-click switching
- Proxy latency testing
- Persistent configuration, auto-restored on restart

### 🖥️ Desktop Features
- macOS Universal Binary (Intel + Apple Silicon)
- Telegram-style desktop layout (left sidebar + right main panel)
- Draggable sidebar width (280px–480px)
- Window position & size persistence
- External links open in system browser
- Dark mode support

## 📦 Installation

### Download from Releases

Go to the [Releases](../../releases) page and download the installer:

| File | Description |
|------|-------------|
| `PaperPhonePlus-2.2.9-macOS.dmg` | Recommended Universal DMG installer |
| `PaperPhonePlus-2.2.9-universal-mac.zip` | ZIP archive |

The installer supports both Intel and Apple Silicon Macs and is signed with an Apple Developer ID certificate. This build does not yet have an Apple notarization ticket stapled to it. If Gatekeeper blocks the first launch, Control-click the app in Finder, select **Open**, and confirm.

## 🎥 Video Meetings

1. Open a group chat and select the voice- or video-meeting button.
2. On first use, grant microphone and camera access when prompted by macOS.
3. The group owner is the meeting host and can mute everyone or switch between lecture and discussion modes.
4. In lecture mode, regular participants remain muted; they can unmute after the host returns the room to discussion mode.

Group meetings and one-on-one calls use a LiveKit SFU. The Mac client requires an updated Paperphone-plus server exposing `/api/calls/meeting-token` and `/api/calls/direct-token`. Configure these production environment variables on the server:

```text
LIVEKIT_URL=wss://meeting.example.com
LIVEKIT_API_KEY=<API key>
LIVEKIT_API_SECRET=<secret of at least 32 bytes>
```

LiveKit and the Paperphone-plus server must use the same key and secret. Production deployments should also expose TCP 7881 and UDP 7882; TURN/TLS is recommended for restrictive networks.

### Build from Source

#### Prerequisites

- Node.js >= 18
- npm >= 9
- macOS system

#### Steps

```bash
# Clone the repository
git clone https://github.com/619dev/ppp-mac.git
cd ppp-mac

# Install dependencies
npm install

# Development mode (Vite HMR + Electron)
npm run dev:electron

# Production build
npm run build

# Package for macOS
npm run build:mac
```

## 🔧 Proxy Configuration

1. Open the app and go to the login page
2. Tap the proxy settings icon
3. Add a proxy node (SOCKS5 / HTTP / HTTPS)
4. Enter host, port, username (optional), and password (optional)
5. Activate the proxy and test the connection

The proxy is implemented via Electron's `session.setProxy()` API, transparently covering all network requests including WebSocket connections.

## 🏗️ Architecture

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

### Tech Stack

| Layer | Technology |
|-------|-----------:|
| Desktop Framework | Electron 36 |
| Frontend | React 19 + TypeScript 5.7 |
| Build Tool | Vite 6 |
| State Management | Zustand 5 |
| Video Meetings | LiveKit Client 2.20 (SFU) |
| Encryption | libsodium-wrappers-sumo + crystals-kyber-js |
| Packaging | electron-builder |
| Persistence | electron-store |

## 📁 Project Structure

```
├── electron/
│   ├── main.ts          # Main process: window, proxy, IPC
│   └── preload.ts       # Preload: secure API bridge
├── src/
│   ├── api/             # HTTP, WebSocket, proxy bridge
│   ├── components/      # UI components
│   ├── contexts/        # React Context (calls, etc.)
│   ├── crypto/          # E2EE encryption modules
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Internationalization
│   ├── pages/           # Page components
│   ├── store/           # Zustand state management
│   ├── utils/           # Utility functions
│   ├── App.tsx          # React root component
│   ├── electron.d.ts    # Electron API type declarations
│   ├── index.css        # Global styles
│   ├── main.tsx         # React entry point
│   └── vite-env.d.ts    # Vite type declarations
├── build/               # App icon assets
├── electron-builder.yml # Packaging configuration
├── tsconfig.electron.json # Electron TypeScript config
├── vite.config.ts       # Vite build configuration
└── package.json         # Project configuration
```

## 📄 License

This project is built upon [Paperphone-plus](https://github.com/619dev/Paperphone-plus) and is licensed under the [AGPL-3.0](LICENSE).

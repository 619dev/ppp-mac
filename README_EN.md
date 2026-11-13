<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>End-to-End Encrypted Messaging macOS Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-macOS-blue?style=flat-square&logo=apple" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-2.6.5-green?style=flat-square" alt="Version" />
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

### Changelog

The complete release history has moved to [changelog.md](changelog.md).

#### 2.6.5 Release Notes

- Syncs upstream friendship fixes. Add or remove friends from their profiles, and refresh contacts on relationship changes and reconnect. Group chat verifies signatures against server-published member keys and encrypts with Sender Keys, which rotate on membership changes. Extra text encryption applies to private chats.
- Friendship repair requires a server with the upstream friendship fixes. Group participants need clients compatible with the updated group mode. See [test coverage](tests/README.md).


---

### 💬 Instant Messaging
- Private & group chat with text, images, videos, files, and voice messages
- Batch download for up to 20 chat attachments at a time
- One-on-one video and voice calls
- LiveKit SFU group video meetings for up to 100 participants
- Video grid, participant panel, active-speaker and media-state indicators
- Host controls for mute-all, lecture mode, and open discussion
- Moments (timeline) posting and browsing
- Contact management, QR code friend requests

### 🔐 End-to-End Encryption
- **E2EE**: All messages encrypted before sending; the server cannot read them
- **Authenticated messages**: Ed25519 signatures bind sender identity and message context; group sender keys rotate by epoch
- **Protocol scope**: The signed messaging path uses X25519; real ML-KEM key registration is not implemented
- **Crypto Library**: libsodium (X25519, XSalsa20-Poly1305, Ed25519)

### 🌐 Network Proxy
- Supports **SOCKS5**, **HTTP**, and **HTTPS** proxy protocols
- System-level transparent proxy — all HTTP and WebSocket traffic automatically routed through proxy
- Multiple proxy profile management with one-click switching
- Proxy latency testing
- Persistent configuration, auto-restored on restart

### 🖥️ Desktop Features
- Default packaging generates Apple Silicon (arm64) installers only
- Telegram-style desktop layout (left sidebar + right main panel)
- Draggable sidebar width (280px–480px)
- Window position & size persistence
- External links open in system browser
- Dark mode support

## 🔐 Extra-encrypted text appearance: design and security boundary

Extra text encryption adds a layer of protection to private chats, which use X25519 key agreement and Ed25519 signatures. Group chat uses Sender Keys and server-published member keys. macOS secure storage protects identity private keys and group Sender Keys.

When enabled, each private message is processed in this order:

1. The sender first protects the message body with the extra password shared by both participants. PBKDF2-SHA-256 (210,000 iterations and a random salt) derives an AES-256-GCM key; every message has an independent random IV and an authentication tag for integrity.
2. The complete extra-encryption frame (version, salt, IV, and ciphertext) is then encoded with one of eight selectable text appearances. This is not merely decorative character substitution: the visible characters carry the extra encrypted ciphertext.
3. That appearance ciphertext then enters the project's original encryption path: private-chat E2EE. The server still receives the original E2EE ciphertext plus metadata required for delivery.
4. The recipient reverses the order: first decrypt the original E2EE layer, then decode the text-appearance frame and decrypt the body with the extra password.

The extra password is never uploaded, synchronized automatically, or distributed by the server. Both people in a private chat must set the same password. Text appearances do not need to match: every message carries its own appearance identifier, so the recipient automatically detects and decodes the sender's choice. For example, one person may send Buddhist text while another sends Hangul; if the extra password matches, both decrypt normally. A user's appearance setting controls only the ciphertext appearance of messages they send. If the password is missing, locked, or different, messages are still sent and received normally and the original E2EE layer still decrypts successfully, but the app can display only the appearance ciphertext—not the original text.

The app does not persist the extra password. While unlocked it exists only in the current process memory; locally, the app stores only a random salt and AES-GCM verification data used to check whether an entered password is correct. Users can lock immediately or automatically 5, 15, 30, or 60 minutes after the app leaves the foreground. This layer adds an independent shared secret beyond E2EE; it does not replace a strong password, device lock, or system secure storage, and it cannot provide absolute protection on a fully compromised device while the password remains in memory.

## 2.6.5 identity verification and compatibility

After both clients upgrade, use the agreed extra password in the contact profile to complete mutual verification. The green identity badge requires verified challenges and receipts. Changed identity keys revoke trust and require a fresh check. Group chat uses server-published member keys without requiring private verification for each member. Group membership changes rotate the epoch and offline recovery retrieves historical key distributions. Cached signature results are never trusted.

Use a server with the upstream friendship fixes and compatible clients. Older clients cannot parse signed envelopes; unsigned private history is also refused after pinning. Message signatures do not end-to-end encrypt attachment bytes, and upgrades cannot recover previously lost group keys.

## 📦 Installation

### Download from Releases

Download the 2.6.5 Apple Silicon DMG from [Releases](../../releases).

| File | Description |
|------|-------------|
| `PaperPhonePlus-2.6.5-arm64.dmg` | Recommended Apple Silicon DMG installer |
| `SHA256SUMS.txt` | SHA-256 checksums for the downloads |

The current installer supports Apple Silicon Macs and is signed with an Apple Developer ID certificate. It does not yet have an Apple notarization ticket stapled to it. The default configuration does not generate Intel or Universal installers. If Gatekeeper blocks the first launch, Control-click the app in Finder, select **Open**, and confirm.

To batch-download attachments, open a chat, select the download button in its header, choose up to 20 downloadable messages, and confirm. Requests include the current authentication token; duplicate filenames receive a numeric suffix, and partial failures report the number of files that could not be downloaded.

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

# Type checking and regression suites
npx tsc --noEmit
npm run test:security
npm run test:attachments
npm run test:i18n

# Package for macOS
npm run build:mac
```

Packaging requires a Developer ID identity. Notarization is enabled by default and requires Apple credentials. See [tests/README.md](tests/README.md) for verification and manual acceptance.


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
│  │  Crypto (libsodium)             │   │
│  │  Signed messages + E2EE          │   │
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

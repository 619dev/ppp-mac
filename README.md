<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 macOS 桌面客户端</strong></p>
  <p><strong>End-to-End Encrypted Messaging macOS Desktop Client</strong></p>

  <p>
    <img src="https://img.shields.io/badge/Platform-macOS-blue?style=flat-square&logo=apple" alt="Platform" />
    <img src="https://img.shields.io/badge/Version-1.1.7-green?style=flat-square" alt="Version" />
    <img src="https://img.shields.io/badge/Electron-36-47848F?style=flat-square&logo=electron" alt="Electron" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite" alt="Vite" />
    <img src="https://img.shields.io/badge/License-AGPL--3.0-blue?style=flat-square" alt="License" />
  </p>
</div>

---

## 📖 Documentation / 文档

- [中文文档 (Chinese)](README_CN.md)
- [English Documentation](README_EN.md)

## ✨ Version 1.1.7 / 版本 1.1.7

Fixes unread message counters being incremented repeatedly when cached offline messages are replayed after reconnecting, and reliably clears the counter when a chat is opened from a notification or deep link.

修复重连后离线缓存消息重复推送导致未读数字反复增加的问题，并确保从通知或深链接进入聊天时正确清除未读数字。

## Version 1.1.6 / 版本 1.1.6

Improves one-on-one video calls and session handling, fixes Chinese username search with IMEs, and adds deeper offline caching with a user-accessible cache cleanup option.

改进一对一视频通话和会话状态处理，修复中文输入法下的用户名搜索，并新增更完整的离线缓存及用户可操作的缓存清理功能。

## Version 1.1.5 / 版本 1.1.5

Adds LiveKit SFU group video meetings for up to 100 participants, including a video grid, participant panel, mute-all controls, and lecture/discussion modes.

新增基于 LiveKit SFU 的百人群组视频会议，包括视频网格、参会者面板、全员静音及讲课/自由讨论模式。

## 📄 License / 许可证

This project is built upon [Paperphone-plus](https://github.com/619dev/Paperphone-plus) and is licensed under the [AGPL-3.0](LICENSE).

本项目基于 [Paperphone-plus](https://github.com/619dev/Paperphone-plus) 开发，采用 [AGPL-3.0](LICENSE) 许可证发布。

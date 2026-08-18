<div align="center">
  <img src="public/icons/icon-512.png" width="128" height="128" alt="PaperPhonePlus" style="border-radius: 24px;" />
  <h1>PaperPhonePlus Desktop</h1>
  <p><strong>端对端加密即时通讯 macOS 桌面客户端</strong></p>
  <p><strong>End-to-End Encrypted Messaging macOS Desktop Client</strong></p>

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

## 📖 Documentation / 文档

- [中文文档 (Chinese)](README_CN.md)
- [English Documentation](README_EN.md)

## ✨ Version 2.4.6 / 版本 2.4.6

- Text appearance is extra insurance above the existing E2EE: the shared extra password encrypts the body first, followed by private-chat E2EE or group Sender Key encryption. Both private-chat participants, or every group member, need the same password. Different passwords still allow delivery but show only styled ciphertext. / 文本外观是原有 E2EE 之上的额外保险：正文先由共享额外密码加密，再由私聊 E2EE 或群聊 Sender Key 加密。私聊双方或群内所有成员需使用相同密码；密码不一致时消息仍会送达，但只能看到文本外观密文。
- The password is never uploaded or synchronized, and this feature never replaces, bypasses, or downgrades E2EE. / 密码不会上传或自动同步；该功能不替代、不绕过也不降级原有 E2EE。

## ✨ Version 2.4.5 / 版本 2.4.5

- Fixed the unresponsive “Enable extra encryption” control in the desktop app by replacing the unsupported native password prompt with an in-app password dialog. / 修复桌面端“开启额外加密”按钮点击无反应的问题，使用应用内密码弹窗替代 Electron 不支持的原生密码提示框。

## ✨ Version 2.4.4 / 版本 2.4.4

- 修复额外加密锁定状态下的解锁密码提示，并同步全部 8 种语言。 / Fixed the locked extra-encryption password prompt across all eight languages.

Extra text-appearance encryption now always requires the correct extra password before it can be disabled, even while unlocked.

关闭额外文本外观加密时现在始终要求重新输入正确的额外密码，即使当前已解锁也不能绕过验证。

- 文本外观现已隐藏协议元数据，发送中的本地缓存不再保留消息原文。
- 额外聊天记录加密已移至个人信息 > 消息隐私，并全局应用于所有聊天。

Encrypted sends now fail closed and display their actual protocol. This release adds an optional chat-history password, eight presentation codecs, background auto-lock after 5/15/30/60 minutes, protected native key storage, and complete UI copy in eight languages.

加密失败时停止发送且不再回退明文，并显示实际协议版本。本版新增额外聊天记录密码、8 种文本外观编码、离开前台 5/15/30/60 分钟自动锁定、原生密钥安全存储及完整的 8 语言文案。

## ✨ Version 2.4.0 / 版本 2.4.0

Repairs legacy one-way friendship records when adding an existing friend and immediately refreshes the contact list.

修复历史单向好友记录导致“已是好友”但联系人不可见的问题；再次添加时会自动刷新联系人列表。

## ✨ Version 2.3.8 / 版本 2.3.8

Fixes fresh-install startup and interrupted secure-storage migration, reliably releases the camera when closing the QR scanner, and prevents duplicate friend requests from search results.

修复首次安装启动及安全存储迁移中断问题；关闭二维码扫描器时会可靠释放摄像头；好友搜索结果会识别已有好友，避免重复发送申请。

## Version 2.3.5 / 版本 2.3.5

Adds OS-protected local keys and authenticated encryption at rest for cached chat history. Legacy plaintext keys, message caches, and media caches are migrated or securely removed.

新增由 macOS 系统安全存储保护的本地密钥，以及带完整性校验的聊天记录静态加密；旧版明文密钥、消息缓存和媒体缓存会被迁移或安全清理。

## Version 2.3.1 / 版本 2.3.1

Adds durable refresh-token sessions, automatic access-token renewal, stronger WebSocket heartbeat and reconnection recovery, missed-message synchronization, and a persistent outbound queue with delivery acknowledgements.

新增持久化刷新令牌会话、访问令牌自动续期、增强的 WebSocket 心跳与重连恢复、漏收消息补同步，以及带送达确认的持久化发送队列。

## Version 2.2.9 / 版本 2.2.9

Adds persistent sticker caching for sticker-pack metadata and media, enabling faster loading and reliable reuse during server failures or offline sessions.

新增贴纸包元数据及贴纸媒体的持久化缓存，加快贴纸加载，并在服务异常或离线时可靠复用已缓存内容。

## Version 2.2.8 / 版本 2.2.8

Adds quoted-message replies, moves one-on-one voice and video calls to the LiveKit SFU, and improves call lifecycle handling and localized UI text.

新增消息引用回复，将一对一语音和视频通话全面迁移至 LiveKit SFU，并优化通话生命周期处理及多语言界面文案。

## Version 1.1.8 / 版本 1.1.8

Improves the chat composer layout and multiline editing, fixes remote audio playback in one-on-one calls, and makes voice effects switch reliably during a call.

优化聊天输入区布局和多行编辑体验，修复一对一通话的远端音频播放，并提升通话中变声模式切换的可靠性。

## Version 1.1.7 / 版本 1.1.7

Fixes unread message counters being incremented repeatedly when cached offline messages are replayed after reconnecting, and reliably clears the counter when a chat is opened from a notification or deep link.

修复重连后离线缓存消息重复推送导致未读数字反复增加的问题，并确保从通知或深链接进入聊天时正确清除未读数字。

## Version 1.1.6 / 版本 1.1.6

Improves one-on-one video calls and session handling, fixes Chinese username search with IMEs, and adds deeper offline caching with a user-accessible cache cleanup option.

改进一对一视频通话和会话状态处理，修复中文输入法下的用户名搜索，并新增更完整的离线缓存及用户可操作的缓存清理功能。

## Version 1.1.5 / 版本 1.1.5

Adds LiveKit SFU group video meetings for up to 100 participants, including a video grid, participant panel, mute-all controls, and lecture/discussion modes.

新增基于 LiveKit SFU 的百人群组视频会议，包括视频网格、参会者面板、全员静音及讲课/自由讨论模式。

## 🔐 Extra-encrypted text appearance: design and security boundary

This feature is **extra insurance on top of the existing end-to-end encryption (E2EE)**. It does not replace E2EE with a visual encoding, and it never bypasses or weakens the original encryption. Private chats remain protected by the existing X25519 / ML-KEM-768 key agreement and message-encryption path; group chats continue to use the Sender Key protocol. Identity private keys and group Sender Keys remain protected by macOS secure storage.

When enabled, every message is processed in this order:

1. The sender first protects the message body with the extra password shared by both participants or by all group members. PBKDF2-SHA-256 (210,000 iterations and a random salt) derives an AES-256-GCM key; every message has an independent random IV and an authentication tag for integrity.
2. The complete extra-encryption frame (version, salt, IV, and ciphertext) is then encoded with one of eight selectable text appearances. This is not merely decorative character substitution: the visible characters carry the extra encrypted ciphertext.
3. That appearance ciphertext then enters the project's original encryption path: private-chat E2EE or group Sender Key encryption. The server still receives the original E2EE/Sender-Key ciphertext plus metadata required for delivery.
4. The recipient reverses the order: first decrypt the original E2EE/Sender-Key layer, then decode the text-appearance frame and decrypt the body with the extra password.

The extra password is never uploaded, synchronized automatically, or distributed by the server. Both people in a private chat must set the same password; every group member who needs to read the plaintext must also set that same password. Text appearances do not need to match: every message carries its own appearance identifier, so the recipient automatically detects and decodes the sender's choice. For example, one person may send Buddhist text while another sends Hangul; if the extra password matches, both decrypt normally. A user's appearance setting controls only the ciphertext appearance of messages they send. If the password is missing, locked, or different, messages are still sent and received normally and the original E2EE layer still decrypts successfully, but the app can display only the appearance ciphertext—not the original text.

The app does not persist the extra password. While unlocked it exists only in the current process memory; locally, the app stores only a random salt and AES-GCM verification data used to check whether an entered password is correct. Users can lock immediately or automatically 5, 15, 30, or 60 minutes after the app leaves the foreground. This layer adds an independent shared secret beyond E2EE; it does not replace a strong password, device lock, or system secure storage, and it cannot provide absolute protection on a fully compromised device while the password remains in memory.

## 🔐 额外加密文本外观：工作原理与安全边界

这项功能是**建立在原有端到端加密（E2EE）之上的额外保险**，不是用文本外观代替 E2EE，也不会绕过或降低原有加密。私聊仍由 X25519 / ML-KEM-768 密钥协商及原有消息加密链路保护；群聊仍使用 Sender Key 协议。身份私钥和群聊 Sender Key 继续由 macOS 系统安全存储保护。

启用后，每条消息按以下顺序处理：

1. 发送方先用双方或群内全员约定的额外密码处理消息正文。密码通过 PBKDF2-SHA-256（210,000 次迭代及随机盐）派生 AES-256-GCM 密钥；每条消息使用独立随机 IV，并通过认证标签校验完整性。
2. 额外加密后的完整数据帧（版本、盐、IV 和密文）再转换成所选的 8 种文本外观之一。这不是单纯替换字符的装饰效果，外观字符实际承载的是额外加密密文。
3. 该外观密文随后才进入项目原有加密链路：私聊使用 E2EE，群聊使用 Sender Key；服务器接收到的仍是原有 E2EE／Sender Key 密文及投递所需元数据。
4. 接收端执行相反流程：先用原有 E2EE／Sender Key 解密消息，再还原文本外观数据，并用额外密码解密出正文。

额外密码不会上传、自动同步或由服务器分发。私聊双方必须设置相同密码；群聊中希望阅读正文的所有成员也必须设置相同密码。文本外观不需要一致：每条消息都会携带自己的外观类型标记，接收端会自动识别并还原发送方选择的外观。例如一方发送“与佛论禅”、另一方发送“韩文”，只要额外密码相同，双方都能正常解密；每个人的外观设置只决定自己发出的密文样式。密码缺失、仍处于锁定状态或密码不一致时，消息依然能够正常发送、接收并完成原有 E2EE 解密，但应用只能显示文本外观密文，无法显示原文。

应用不会持久保存额外密码：解锁后密码只保留在当前运行内存中，本地仅保存随机盐和用于验证密码是否正确的 AES-GCM 验证数据。用户可以立即锁定，也可在应用离开前台 5、15、30 或 60 分钟后自动锁定。此额外层用于在原有 E2EE 之外增加一个独立的共享秘密；它不能替代强密码、设备锁、系统安全存储，也不能在设备已被完全控制且密码仍驻留内存时提供绝对保护。

## 📄 License / 许可证

This project is built upon [Paperphone-plus](https://github.com/619dev/Paperphone-plus) and is licensed under the [AGPL-3.0](LICENSE).

本项目基于 [Paperphone-plus](https://github.com/619dev/Paperphone-plus) 开发，采用 [AGPL-3.0](LICENSE) 许可证发布。

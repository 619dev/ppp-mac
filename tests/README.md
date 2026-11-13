# Mac 2.6.5 verification

```sh
npx tsc --noEmit
npm run test:security
npm run test:attachments
npm run test:i18n
npm run build
```

The suites use real cryptography with mocked transport and secret storage. They cover signed message tampering, mutual verification, identity replacement, group epochs and membership, offline catch-up, cache-before-cursor ordering, attachment authorization and 92 security keys in eight languages. They do not exercise the native Electron secure-storage bridge or replace two-client acceptance.

Use a server with the upstream friendship fixes and compatible clients. Verify friendship repair, profile add/remove, reconnect refresh, and group messaging between members who have yet to verify each other privately. Verify both directions of the password handshake, profile focus refresh, changed-key rejection, group leave/kick and offline recovery manually. Trust records use the existing macOS secure-storage bridge. A green identity badge requires the mutual password handshake. Cached signature flags are never trusted. Legacy unsigned private history is refused after pinning. Group signatures are checked against server-published keys.

The signed path uses X25519 and Ed25519. Real ML-KEM registration is not implemented. Signatures do not encrypt uploaded attachment bytes; previously lost group keys cannot be recovered by upgrading.

应用版本、锁文件根包版本及个人信息页底部均为 **2.6.5**。安装包仅支持 arm64。主说明见 [中文文档](../README_CN.md) 和 [English guide](../README_EN.md)。

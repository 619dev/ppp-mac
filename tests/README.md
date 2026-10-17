# Mac 2.6.0 verification

```sh
npx tsc --noEmit
npm run test:security
npm run test:attachments
npm run test:i18n
npm run build
```

The suites use real cryptography with mocked transport and secret storage. They cover signed message tampering, mutual verification, identity replacement, group epochs and membership, offline catch-up, cache-before-cursor ordering, attachment authorization and 92 security keys in eight languages. They do not exercise the native Electron secure-storage bridge or replace two-client acceptance.

Use a compatible 2.6.0 server and clients. Verify both directions of the password handshake, profile focus refresh, changed-key rejection, group leave/kick and offline recovery manually. Trust records use the existing macOS secure-storage bridge. A green identity badge requires the mutual password handshake. Cached signature flags are never trusted. Legacy unsigned private history is refused after pinning. Unknown group identities block sending until verified.

The signed path uses X25519 and Ed25519. Real ML-KEM registration is not implemented. Signatures do not encrypt uploaded attachment bytes; previously lost group keys cannot be recovered by upgrading.

应用版本、package-lock 根包版本与个人信息页底部均为 **2.6.0**。自动化检查已通过；已清理构建缓存并生成 Developer ID 签名的 arm64 DMG/ZIP，未完成 Apple 公证；尚未完成原生双客户端手工验收。主说明见 [中文文档](../README_CN.md) 和 [English guide](../README_EN.md)。

# Mac 2.6.7 verification

```sh
npx tsc --noEmit
npm run test:security
npm run test:attachments
npm run test:i18n
npm run test:media-cache
npm run build
```

The suites use real cryptography with mocked transport and secret storage. They cover signed message tampering, mutual verification, identity replacement, group epochs and membership, offline catch-up, cache-before-cursor ordering, attachment authorization, persistent media cache and eight-language coverage for security, account deletion and password recovery. They do not exercise the native Electron secure-storage bridge or replace two-client acceptance.

Use a server with the upstream friendship fixes and compatible clients. Verify friendship repair, profile add/remove, reconnect refresh, and group messaging between members who have yet to verify each other privately. Verify both directions of the password handshake, profile focus refresh, changed-key rejection, group leave/kick and offline recovery manually. Trust records use the existing macOS secure-storage bridge. A green identity badge requires the mutual password handshake. Cached signature flags are never trusted. Legacy unsigned private history is refused after pinning. Group signatures are checked against server-published keys.

The signed path uses X25519 and Ed25519. Real ML-KEM registration is not implemented. Signatures do not encrypt uploaded attachment bytes; previously lost group keys cannot be recovered by upgrading.

应用版本、锁文件根包版本及个人信息页底部均为 **2.6.7**。安装包仅支持 arm64。主说明见 [中文文档](../README_CN.md) 和 [English guide](../README_EN.md)。


## 2.6.7 desktop acceptance

- Open the packaged app and view avatars, Timeline or Moments media, and chat attachments. Reload offline to verify cached copies, reconnect to verify revalidation, and use Profile → Clear cache to verify removal. Verify account and server isolation.
- Upload multiple Timeline images and a video. Check the filename, progress bar, percentage, disabled controls, and recovery from upload failure. Open a post and verify the list returns to its previous position.
- With an isolated 2.6.7 server, check all five inactivity periods, the default of 12 months, successful login timestamp updates, the expiry sweep, and session termination after immediate or automatic deletion.
- Recover a test account with an enrolled authenticator and verify sign-in with the new password. Check handling of invalid or expired codes, disabled enrollment, and revocation of existing sessions.
- Run `npm run verify:mac` to check the signed arm64 app and its notarization, or use `npm run verify:mac -- --allow-unnotarized` to verify architecture and Developer ID signing for a build without a notarization ticket.

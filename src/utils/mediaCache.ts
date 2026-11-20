import { fetchServerAttachmentBlob, normalizeFileUrl } from '../api/http'
import { mediaCacheTransaction } from './mediaCacheDb'

export const MEDIA_CACHE_NAME = 'paperphone-media-v3'
const pending = new Map<string, Promise<Blob>>()
const refreshed = new Set<string>()
let cacheGeneration = 0
window.addEventListener?.('online', () => refreshed.clear())

function mediaUrl(raw: string) {
  const url = new URL(normalizeFileUrl(raw), window.location.href || window.location.origin)
  url.hash = ''
  return url
}

export function mediaCacheKey(raw: string): string {
  const url = mediaUrl(raw)
  let account = 'anonymous'
  try { account = JSON.parse(localStorage.getItem('user') || 'null')?.id || account } catch { /* Invalid stored profile. */ }
  url.searchParams.append('__pp_account', account)
  url.searchParams.append('__pp_server', localStorage.getItem('serverUrl') || import.meta.env.VITE_API_URL || '')
  return url.href
}

export async function clearMediaCache(): Promise<void> {
  cacheGeneration++
  refreshed.clear()
  pending.clear()
  if (window.location.protocol === 'file:') {
    await mediaCacheTransaction(MEDIA_CACHE_NAME, 'readwrite', store => store.clear())
  }
  if ('caches' in window) await caches.delete(MEDIA_CACHE_NAME)
}

/** Cache original bytes, including encrypted attachments, never decrypted chat data. */
export async function cachedMediaBlob(raw: string): Promise<Blob> {
  const url = mediaUrl(raw)
  const id = mediaCacheKey(raw)
  const generation = cacheGeneration
  const desktop = window.location.protocol === 'file:'
  const existing = pending.get(id)
  if (existing) return existing
  const task = (async () => {
    let cache: Cache | undefined
    let cached: Blob | undefined
    try {
      if (desktop) {
        cached = await mediaCacheTransaction(MEDIA_CACHE_NAME, 'readonly', store => store.get(id))
      } else {
        cache = await caches.open(MEDIA_CACHE_NAME)
        cached = await (await cache.match(new Request(id)))?.blob()
      }
    } catch { /* Storage unavailable. */ }
    const fetchBlob = async () => {
      if (mediaCacheKey(raw) !== id) throw new Error('Media account changed')
      const locationUrl = window.location.href || window.location.origin
      const base = new URL(localStorage.getItem('serverUrl') || import.meta.env.VITE_API_URL || locationUrl, locationUrl)
      if (base.origin === url.origin && url.pathname.startsWith('/api/files/')) {
        return fetchServerAttachmentBlob(url)
      }
      const response = await fetch(url.href)
      if (!response.ok) throw new Error(`Media download failed: ${response.status}`)
      return response.blob()
    }
    const update = async (notify: boolean) => {
      const blob = await fetchBlob()
      if (generation !== cacheGeneration) return blob
      try {
        if (desktop) {
          await mediaCacheTransaction(MEDIA_CACHE_NAME, 'readwrite', store => {
            if (generation !== cacheGeneration) return undefined
            return store.put(blob, id)
          })
        } else {
          await cache?.put(new Request(id), new Response(blob))
        }
      } catch { /* Quota failure must not prevent display. */ }
      if (generation !== cacheGeneration) return blob
      refreshed.add(id)
      if (notify && window.dispatchEvent) window.dispatchEvent(new CustomEvent('pp-media-updated', { detail: { key: id, blob } }))
      return blob
    }
    if (cached) {
      // Revalidate once per session/reconnect. Navigation itself never downloads again.
      if (!refreshed.has(id)) {
        refreshed.add(id)
        void update(true).catch(() => { if (generation === cacheGeneration) refreshed.delete(id) })
      }
      return cached
    }
    return update(false)
  })()
  pending.set(id, task)
  try { return await task } finally { if (pending.get(id) === task) pending.delete(id) }
}

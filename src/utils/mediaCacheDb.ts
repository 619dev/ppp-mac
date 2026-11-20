// The packaged Electron renderer runs from file:, where Cache Storage may be unavailable.
export function openMediaCacheDb(name: string): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, 1)
    request.onupgradeneeded = () => request.result.createObjectStore('blobs')
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function mediaCacheTransaction<T>(
  name: string,
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T> | undefined,
): Promise<T> {
  const db = await openMediaCacheDb(name)
  try {
    return await new Promise<T>((resolve, reject) => {
      const transaction = db.transaction('blobs', mode)
      const request = operation(transaction.objectStore('blobs'))
      if (!request) { resolve(undefined as T); return }
      transaction.oncomplete = () => resolve(request.result)
      transaction.onabort = () => reject(transaction.error)
    })
  } finally {
    db.close()
  }
}

export function addCookie(key: string, value: string) {
  window.document.cookie = `${key}=${value}; path=/; max-age=86400; samesite=strict`
}

export function removeCookie(key: string) {
  window.document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}

export function getCookie(key: string): string | null {
  const cookies = window.document.cookie.split("; ")
  for (const cookie of cookies) {
    const [k, v] = cookie.split("=")
    if (k === key) return decodeURIComponent(v)
  }
  return null
}
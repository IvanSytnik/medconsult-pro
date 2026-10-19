const KEY = 'utm'
const PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const

/** Remembers the UTM parameters of the landing URL for this browser tab, so a form on a later page still sends them. */
export function rememberUtm(search: string): void {
  const query = new URLSearchParams(search)
  const utm = Object.fromEntries(PARAMS.flatMap((p) => (query.get(p) ? [[p, query.get(p)!.slice(0, 200)]] : [])))
  if (Object.keys(utm).length === 0) return
  try {
    sessionStorage.setItem(KEY, JSON.stringify(utm))
  } catch {
    // Storage blocked: the lead is simply saved without UTM.
  }
}

export function storedUtm(): Record<string, string> {
  try {
    const value: unknown = JSON.parse(sessionStorage.getItem(KEY) || '{}')
    return value && typeof value === 'object' ? (value as Record<string, string>) : {}
  } catch {
    return {}
  }
}

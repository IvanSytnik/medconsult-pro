import 'server-only'

type Bucket = { count: number; resetAt: number }

/**
 * Fixed-window, in-memory rate limiter. Each serverless instance keeps its own counters,
 * so this only stops bursts from a single client; it is not a global quota.
 */
export function createRateLimiter({ windowMs, max }: { windowMs: number; max: number }) {
  const buckets = new Map<string, Bucket>()

  return function limit(key: string): { ok: boolean; retryAfter: number } {
    const now = Date.now()
    if (buckets.size > 10_000) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k)
    }

    const bucket = buckets.get(key)
    if (!bucket || bucket.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs })
      return { ok: true, retryAfter: 0 }
    }

    bucket.count += 1
    return { ok: bucket.count <= max, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }
}

export function clientIp(headers: Headers): string {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || headers.get('x-real-ip') || 'unknown'
}

// Runs before `next build` on Vercel: applies pending Payload migrations so code and schema match, then fills a
// fresh database with the original site content so a new deployment is not empty. Existing content is never touched.
// Local builds skip this: local databases are kept in sync by Payload's dev-mode schema push.
import { execSync } from 'node:child_process'

if (process.env.VERCEL && process.env.DATABASE_URL) {
  execSync('npx payload migrate', { stdio: 'inherit' })
  execSync('npx payload run src/seed/index.ts', {
    stdio: 'inherit',
    env: { ...process.env, SEED_IF_EMPTY: '1', SEED_SKIP_OWNER: '1' },
  })
} else if (process.env.VERCEL) {
  console.warn('DATABASE_URL is not set; skipping migrations and seed.')
}

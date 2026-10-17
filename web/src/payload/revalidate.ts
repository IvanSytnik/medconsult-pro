import { revalidatePath } from 'next/cache'
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

/**
 * Every page shares the navigation, footer and site settings, and the site has only a handful of pages,
 * so any content change revalidates the whole site instead of tracking which page uses what.
 */
function revalidateSite(context: Record<string, unknown>, log: (msg: string) => void) {
  if (context.disableRevalidate) return
  try {
    revalidatePath('/', 'layout')
    log('Revalidated site')
  } catch {
    // Outside a Next.js request (seed script, CLI) there is nothing to revalidate.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context, (m) => req.payload.logger.info(m))
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateSite(req.context, (m) => req.payload.logger.info(m))
  return doc
}

export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateSite(req.context, (m) => req.payload.logger.info(m))
  return doc
}

export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
}

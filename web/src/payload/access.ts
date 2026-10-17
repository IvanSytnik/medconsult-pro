import type { Access, FieldAccess, PayloadRequest } from 'payload'

export type Role = 'owner' | 'coordinator'

const role = (req: PayloadRequest): Role | undefined => (req.user as { role?: Role } | null)?.role

export const isOwner: Access = ({ req }) => role(req) === 'owner'
export const isStaff = ({ req }: { req: PayloadRequest }): boolean => Boolean(role(req))
export const anyone: Access = () => true
export const ownerField: FieldAccess = ({ req }) => role(req) === 'owner'

/** Owners manage every account; anyone else may only see and edit their own. */
export const ownerOrSelf: Access = ({ req }) => {
  if (role(req) === 'owner') return true
  if (!req.user) return false
  return { id: { equals: req.user.id } }
}

/** Public website content: everyone reads, only the owner edits (coordinators get read-only admin access). */
export const contentAccess = {
  read: anyone,
  create: isOwner,
  update: isOwner,
  delete: isOwner,
}

'use client'

import { useEffect } from 'react'
import { rememberUtm } from '@/lib/utm'

/** Renders nothing; stores UTM parameters of the landing page for the contact form. */
export default function UtmCapture() {
  useEffect(() => rememberUtm(window.location.search), [])
  return null
}

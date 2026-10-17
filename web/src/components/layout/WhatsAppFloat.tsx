import WhatsAppGlyph from '@/components/ui/WhatsAppGlyph'

export default function WhatsAppFloat({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-[#25d366] rounded-full flex items-center justify-center text-white shadow-lg z-50 hover:scale-110 hover:bg-[#1da851] transition-all"
      aria-label="WhatsApp"
    >
      <WhatsAppGlyph className="w-7 h-7" />
    </a>
  )
}

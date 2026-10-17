import { CheckCircle2 } from 'lucide-react'

export function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-16">
      <span className="section-tag">{tag}</span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && <p className="text-secondary-500 text-lg">{subtitle}</p>}
    </div>
  )
}

export function ProcessSteps({ steps }: { steps: { title: string; desc: string }[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
      <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-secondary-200" />
      {steps.map(({ title, desc }, index) => (
        <div key={title} className="text-center relative">
          <div className="w-20 h-20 mx-auto mb-6 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-2xl font-bold text-primary-600 relative z-10">
            {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-secondary-600">{desc}</p>
        </div>
      ))}
    </div>
  )
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-center gap-3 p-3 bg-secondary-50 rounded-lg">
          <CheckCircle2 className="w-5 h-5 text-primary-600 flex-shrink-0" />
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </div>
  )
}

import type { ReactNode } from 'react'

export function CardRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="py-6">
      <h2 className="mb-4 text-lg font-bold text-gray-900">{title}</h2>
      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">{children}</div>
    </section>
  )
}

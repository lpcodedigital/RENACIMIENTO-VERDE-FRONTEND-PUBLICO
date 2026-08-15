import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:inline-flex focus:min-h-[44px] focus:min-w-[44px] focus:items-center focus:rounded focus:bg-brand-700 focus:px-4 focus:text-white focus:no-underline"
      >
        Saltar al contenido principal
      </a>

      <Header />

      <main id="contenido" className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}

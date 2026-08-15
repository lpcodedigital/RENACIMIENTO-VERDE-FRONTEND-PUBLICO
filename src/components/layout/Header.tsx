import logo from '../../assets/planta.png'
import { institution, navLinks } from '../../data/site-content'

export function Header() {
  return (
    <header className="w-full border-b border-brand-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a href="#inicio" className="flex min-h-[44px] items-center gap-3 no-underline">
          <img src={logo} alt="" width={40} height={40} className="h-10 w-10 shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-normal text-brand-700">{institution.state}</span>
            <span className="font-bold text-brand-800">{institution.name}</span>
            <span className="text-sm font-medium text-brand-700">{institution.programName}</span>
          </div>
        </a>

        <nav aria-label="Navegación principal" className="w-full sm:w-auto">
          <ul className="flex flex-wrap items-center gap-1 sm:justify-end">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-3 text-sm font-medium no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

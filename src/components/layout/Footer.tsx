import { contact, footer, accessibilityLinks } from '../../data/site-content'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-brand-200 bg-white">
      <div className="mx-auto item-center text-center flex max-w-6xl flex-col gap-6 px-4 py-6 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex flex-col gap-1">
          <span className="font-bold text-brand-800">{contact.name}</span>
          {contact.department && (
            <span className="text-sm text-brand-700">{contact.department}</span>
          )}
        </div>

        <nav aria-label="Enlaces de accesibilidad y privacidad">
          <ul className="flex flex-col gap-1 sm:items-end">
            {accessibilityLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] min-w-[44px] items-center text-sm font-medium no-underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-100">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <p className=" text-center text-sm text-brand-700">
            © {currentYear} {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
